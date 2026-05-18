const { isPlainObject, validateProfile } = require('./profile-schema.cjs');

const SPATIAL_CARD_KEYS = [
  'aboutPrimary',
  'aboutSecondary',
  'strengths',
  'experience',
  'tools',
  'contact',
  'connect',
];

function normalizeHeadlineText(headlineText = '') {
  return String(headlineText)
    .replace(/(\d)\s*->\s*(\d)/g, '$1\u2192$2')
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' | ');
}

function splitHeadlineLines(headlineText = '') {
  const segments = normalizeHeadlineText(headlineText)
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);

  if (segments.length <= 1) {
    return segments.length ? segments : [''];
  }

  let bestIndex = 1;
  let bestDelta = Number.POSITIVE_INFINITY;

  for (let i = 1; i < segments.length; i += 1) {
    const left = segments.slice(0, i).join(' | ');
    const right = segments.slice(i).join(' | ');
    const delta = Math.abs(left.length - right.length);

    if (delta < bestDelta) {
      bestDelta = delta;
      bestIndex = i;
    }
  }

  return [
    segments.slice(0, bestIndex).join(' | '),
    segments.slice(bestIndex).join(' | '),
  ].filter(Boolean);
}

function mergeProfileSources(...sources) {
  return sources.reduce((merged, source) => deepMerge(merged, source || {}), {});
}

function deepMerge(base, override) {
  if (Array.isArray(override)) {
    return [...override];
  }

  if (!isPlainObject(override)) {
    return override;
  }

  const output = isPlainObject(base) ? { ...base } : {};

  Object.entries(override).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    if (isPlainObject(value) && isPlainObject(output[key])) {
      output[key] = deepMerge(output[key], value);
      return;
    }

    output[key] = Array.isArray(value) ? [...value] : value;
  });

  return output;
}

function firstItems(groups, property, limit) {
  return (groups || [])
    .flatMap((group) => (Array.isArray(group?.[property]) ? group[property] : []))
    .filter(Boolean)
    .slice(0, limit);
}

function toLines(items, lineSize = 3) {
  const lines = [];
  for (let i = 0; i < items.length; i += lineSize) {
    lines.push(items.slice(i, i + lineSize).join(' · '));
  }
  return lines.join('\n');
}

function deriveSpatialCards(profile) {
  const skills = firstItems(profile.capabilityGroups, 'skills', 9);
  const tools = firstItems(profile.toolGroups, 'tools', 12);
  const roles = profile.availability?.roleTargets || [];
  const existing = profile.spatialCards || {};
  const derived = {
    aboutPrimary:
      profile.about?.metaTitle ||
      profile.headlineDisplayLines?.[0] ||
      profile.headlineText ||
      '',
    aboutSecondary:
      profile.about?.metaNote ||
      profile.headlineDisplayLines?.slice(1).join('\n') ||
      '',
    strengths: toLines(skills, 3),
    experience: profile.experienceHighlights?.slice(0, 3).join('\n') || toLines(skills.slice(0, 6), 2),
    tools: toLines(tools, 4),
    contact: profile.availability?.summary || '',
    connect: toLines(roles, 1),
  };

  return SPATIAL_CARD_KEYS.reduce((cards, key) => {
    cards[key] = existing[key] || derived[key] || '';
    return cards;
  }, {});
}

function derivePreviewBodyLines(text, maxLineLength = 48) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLineLength && current) {
      lines.push(current);
      current = word;
      return;
    }
    current = candidate;
  });

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 4);
}

function normalizeProfile(profile) {
  const normalized = { ...profile };

  normalized.links = {
    ...(normalized.links || {}),
  };

  if (!normalized.links.linkedin && normalized.linkedinUrl) {
    normalized.links.linkedin = normalized.linkedinUrl;
  }

  if (!normalized.links.website && normalized.canonicalUrl) {
    normalized.links.website = normalized.canonicalUrl;
  }

  if (!normalized.links.email && normalized.email) {
    normalized.links.email = normalized.email.startsWith('mailto:')
      ? normalized.email
      : `mailto:${normalized.email}`;
  }

  normalized.headlineText = normalizeHeadlineText(normalized.headlineText);
  normalized.headlineDisplayLines = splitHeadlineLines(normalized.headlineText);

  if (!normalized.canonicalUrl && normalized.links.website) {
    normalized.canonicalUrl = normalized.links.website;
  }

  if (!normalized.websiteLabel && normalized.links.website) {
    normalized.websiteLabel = normalized.links.website
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');
  }

  if (!normalized.previewBodyText && Array.isArray(normalized.about?.paragraphs)) {
    normalized.previewBodyText = normalized.about.paragraphs[0];
  }

  if (!Array.isArray(normalized.previewBodyLines) && normalized.previewBodyText) {
    normalized.previewBodyLines = derivePreviewBodyLines(normalized.previewBodyText);
  }

  normalized.spatialCards = deriveSpatialCards(normalized);

  return normalized;
}

function buildProfile(generatedProfile, overridesProfile) {
  const merged = mergeProfileSources(generatedProfile, overridesProfile);
  return validateProfile(normalizeProfile(merged));
}

module.exports = {
  buildProfile,
  derivePreviewBodyLines,
  deriveSpatialCards,
  mergeProfileSources,
  normalizeHeadlineText,
  normalizeProfile,
  splitHeadlineLines,
  validateProfile,
};
