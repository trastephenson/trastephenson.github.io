const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const profilePath = path.join(repoRoot, 'src', 'content', 'profile.json');

function loadProfile() {
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}

function saveProfile(profile) {
  const serialized = JSON.stringify(profile, null, 2).replace(/→/g, '\\u2192');
  fs.writeFileSync(profilePath, `${serialized}\n`, 'utf8');
}

function normalizeHeadlineText(headlineText) {
  return headlineText
    .replace(/(\d)\s*->\s*(\d)/g, '$1→$2')
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' | ');
}

function splitHeadlineLines(headlineText) {
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildPageTitle(profile) {
  const firstSegment = normalizeHeadlineText(profile.headlineText).split('|')[0]?.trim() || 'Portfolio';
  return `${profile.name} | ${firstSegment}`;
}

function buildMetaDescription(profile) {
  return normalizeHeadlineText(profile.headlineText);
}

module.exports = {
  buildMetaDescription,
  buildPageTitle,
  escapeHtml,
  loadProfile,
  normalizeHeadlineText,
  profilePath,
  repoRoot,
  saveProfile,
  splitHeadlineLines,
};
