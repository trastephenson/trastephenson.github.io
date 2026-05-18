const { normalizeHeadlineText, splitHeadlineLines } = require('../profile-model.cjs');

function normalizeKey(key) {
  return String(key || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function pick(record, names) {
  if (!record) {
    return '';
  }

  const lookup = Object.entries(record).reduce((acc, [key, value]) => {
    acc[normalizeKey(key)] = value;
    return acc;
  }, {});

  for (const name of names) {
    const value = lookup[normalizeKey(name)];
    if (value !== undefined && String(value).trim()) {
      return String(value).trim();
    }
  }

  return '';
}

function unique(values) {
  const seen = new Set();
  return values
    .map((value) => String(value || '').trim())
    .filter(Boolean)
    .filter((value) => {
      const key = value.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function profileUrlFromVanityName(vanityName) {
  const cleanName = String(vanityName || '').trim().replace(/^\/+|\/+$/g, '');
  if (!cleanName) {
    return '';
  }
  return `https://www.linkedin.com/in/${cleanName}/`;
}

function ensureLinkedInUrl(url) {
  const value = String(url || '').trim();
  if (!value) {
    return '';
  }
  return value.endsWith('/') ? value : `${value}/`;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapSkills(exportRecords) {
  return unique((exportRecords.skills || []).map((record) => pick(record, ['Name', 'Skill', 'Skill Name'])));
}

function mapCertifications(exportRecords) {
  return unique((exportRecords.certifications || []).map((record) => pick(record, ['Name', 'Certification', 'Title'])));
}

function mapExperienceHighlights(exportRecords) {
  return unique(
    (exportRecords.positions || []).map((record) => {
      const title = pick(record, ['Title', 'Position', 'Role']);
      const company = pick(record, ['Company Name', 'Company', 'Organization']);
      return [title, company].filter(Boolean).join(' - ');
    })
  ).slice(0, 8);
}

function mapFeaturedWork(exportRecords) {
  return (exportRecords.projects || [])
    .map((record) => {
      const title = pick(record, ['Title', 'Name', 'Project Name']);
      const summary = pick(record, ['Description', 'Summary']);
      const secondaryUrl = pick(record, ['URL', 'Url', 'Project URL']);

      if (!title) {
        return null;
      }

      return {
        key: slugify(title),
        title,
        summary,
        secondaryCta: secondaryUrl ? 'LinkedIn' : undefined,
        secondaryUrl: secondaryUrl || undefined,
      };
    })
    .filter(Boolean);
}

function mapTestimonials(exportRecords) {
  return (exportRecords.recommendationsReceived || [])
    .map((record) => {
      const quote = pick(record, ['Text', 'Recommendation', 'Content', 'Body']);
      const firstName = pick(record, ['First Name', 'Recommender First Name']);
      const lastName = pick(record, ['Last Name', 'Recommender Last Name']);
      const name = pick(record, ['Name', 'Recommender']) || [firstName, lastName].filter(Boolean).join(' ');
      const role = pick(record, ['Job Title', 'Title', 'Occupation']);

      if (!quote || !name) {
        return null;
      }

      return { name, role, quote };
    })
    .filter(Boolean);
}

function mapLinkedInProfile({ apiProfile = {}, exportRecords = {}, existingProfile = {} } = {}) {
  const exportProfile = (exportRecords.profile || [])[0] || {};
  const firstName = apiProfile.localizedFirstName || pick(exportProfile, ['First Name', 'FirstName']);
  const lastName = apiProfile.localizedLastName || pick(exportProfile, ['Last Name', 'LastName']);
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim() || existingProfile.name || '';
  const headline = normalizeHeadlineText(
    apiProfile.localizedHeadline ||
      pick(exportProfile, ['Headline', 'Professional Headline', 'Title']) ||
      existingProfile.headlineText ||
      ''
  );
  const linkedInUrl =
    profileUrlFromVanityName(apiProfile.vanityName) ||
    ensureLinkedInUrl(pick(exportProfile, ['Profile URL', 'Public Profile URL', 'LinkedIn Profile'])) ||
    existingProfile.links?.linkedin ||
    '';
  const summary = pick(exportProfile, ['Summary', 'About', 'About Me']);
  const skills = mapSkills(exportRecords);
  const certifications = mapCertifications(exportRecords);
  const experienceHighlights = mapExperienceHighlights(exportRecords);
  const featuredWork = mapFeaturedWork(exportRecords);
  const testimonials = mapTestimonials(exportRecords);
  const capabilityGroups = [];

  if (skills.length > 0) {
    capabilityGroups.push({
      category: 'LinkedIn Skills',
      skills,
    });
  }

  if (certifications.length > 0) {
    capabilityGroups.push({
      category: 'Certifications',
      skills: certifications,
    });
  }

  const nextProfile = {
    source: 'linkedin',
    name: fullName,
    headlineText: headline,
    headlineDisplayLines: splitHeadlineLines(headline),
    headlineLastUpdated:
      existingProfile.headlineText === headline && existingProfile.headlineLastUpdated
        ? existingProfile.headlineLastUpdated
        : new Date().toISOString(),
    links: {
      linkedin: linkedInUrl,
    },
  };

  if (summary) {
    nextProfile.about = {
      paragraphs: [summary],
    };
  }

  if (capabilityGroups.length > 0) {
    nextProfile.capabilityGroups = capabilityGroups;
  }

  if (experienceHighlights.length > 0) {
    nextProfile.experienceHighlights = experienceHighlights;
  }

  if (featuredWork.length > 0) {
    nextProfile.featuredWork = featuredWork;
  }

  if (testimonials.length > 0) {
    nextProfile.testimonials = testimonials;
  }

  return nextProfile;
}

module.exports = {
  mapLinkedInProfile,
  pick,
  slugify,
};
