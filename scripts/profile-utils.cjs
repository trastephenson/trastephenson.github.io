const fs = require('fs');
const path = require('path');
const {
  buildProfile,
  normalizeHeadlineText,
  splitHeadlineLines,
} = require('./profile-model.cjs');

const repoRoot = path.resolve(__dirname, '..');
const profilePath = path.join(repoRoot, 'src', 'content', 'profile.json');
const generatedProfilePath = path.join(repoRoot, 'src', 'content', 'profile.generated.json');
const overridesProfilePath = path.join(repoRoot, 'src', 'content', 'profile.overrides.json');

function readJsonIfExists(filePath, fallback = {}) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  const serialized = JSON.stringify(value, null, 2).replace(/→/g, '\\u2192');
  fs.writeFileSync(filePath, `${serialized}\n`, 'utf8');
}

function loadGeneratedProfile() {
  return readJsonIfExists(generatedProfilePath);
}

function saveGeneratedProfile(profile) {
  writeJson(generatedProfilePath, profile);
}

function loadOverridesProfile() {
  return readJsonIfExists(overridesProfilePath);
}

function saveOverridesProfile(profile) {
  writeJson(overridesProfilePath, profile);
}

function loadProfile() {
  return buildProfile(loadGeneratedProfile(), loadOverridesProfile());
}

function saveProfile(profile) {
  writeJson(profilePath, profile);
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
  generatedProfilePath,
  loadGeneratedProfile,
  loadOverridesProfile,
  loadProfile,
  normalizeHeadlineText,
  overridesProfilePath,
  profilePath,
  readJsonIfExists,
  repoRoot,
  saveGeneratedProfile,
  saveOverridesProfile,
  saveProfile,
  splitHeadlineLines,
  writeJson,
};
