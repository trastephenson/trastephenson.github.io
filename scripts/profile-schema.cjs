function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getPath(value, path) {
  return path.split('.').reduce((current, key) => {
    if (!current || typeof current !== 'object') {
      return undefined;
    }
    return current[key];
  }, value);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateProfile(profile) {
  const errors = [];
  const requiredStrings = [
    'name',
    'headlineText',
    'links.linkedin',
    'availability.summary',
  ];
  const requiredArrays = [
    'headlineDisplayLines',
    'about.paragraphs',
    'stats',
    'capabilityGroups',
    'toolGroups',
  ];
  const requiredObjects = [
    'links',
    'about',
    'availability',
    'spatialCards',
  ];

  requiredStrings.forEach((path) => {
    if (!isNonEmptyString(getPath(profile, path))) {
      errors.push(`${path} must be a non-empty string`);
    }
  });

  requiredArrays.forEach((path) => {
    const value = getPath(profile, path);
    if (!Array.isArray(value) || value.length === 0) {
      errors.push(`${path} must be a non-empty array`);
    }
  });

  requiredObjects.forEach((path) => {
    if (!isPlainObject(getPath(profile, path))) {
      errors.push(`${path} must be an object`);
    }
  });

  if (Array.isArray(profile.stats)) {
    profile.stats.forEach((stat, index) => {
      if (!isNonEmptyString(stat?.num) || !isNonEmptyString(stat?.label) || !isNonEmptyString(stat?.sub)) {
        errors.push(`stats[${index}] must include num, label, and sub`);
      }
    });
  }

  if (Array.isArray(profile.capabilityGroups)) {
    profile.capabilityGroups.forEach((group, index) => {
      if (!isNonEmptyString(group?.category) || !Array.isArray(group?.skills) || group.skills.length === 0) {
        errors.push(`capabilityGroups[${index}] must include category and skills`);
      }
    });
  }

  if (Array.isArray(profile.toolGroups)) {
    profile.toolGroups.forEach((group, index) => {
      if (!isNonEmptyString(group?.category) || !Array.isArray(group?.tools) || group.tools.length === 0) {
        errors.push(`toolGroups[${index}] must include category and tools`);
      }
    });
  }

  if (errors.length > 0) {
    throw new Error(`Profile validation failed:\n- ${errors.join('\n- ')}`);
  }

  return profile;
}

module.exports = {
  isPlainObject,
  validateProfile,
};
