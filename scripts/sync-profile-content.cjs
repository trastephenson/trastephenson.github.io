const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const {
  buildMetaDescription,
  buildPageTitle,
  escapeHtml,
  loadProfile,
  repoRoot,
} = require('./profile-utils.cjs');

const profile = loadProfile();
const templatePath = path.join(repoRoot, 'public', 'index.template.html');
const outputPath = path.join(repoRoot, 'public', 'index.html');

const pageTitle = buildPageTitle(profile);
const metaDescription = buildMetaDescription(profile);
const replacements = {
  PROFILE_PAGE_TITLE: escapeHtml(pageTitle),
  PROFILE_META_DESCRIPTION: escapeHtml(metaDescription),
  PROFILE_CANONICAL_URL: escapeHtml(profile.canonicalUrl),
  PROFILE_OG_TITLE: escapeHtml(pageTitle),
  PROFILE_OG_DESCRIPTION: escapeHtml(metaDescription),
  PROFILE_OG_URL: escapeHtml(profile.canonicalUrl),
  PROFILE_OG_SITE_NAME: escapeHtml(profile.name),
  PROFILE_OG_IMAGE_URL: escapeHtml(profile.shareImageUrl),
  PROFILE_OG_IMAGE_ALT: escapeHtml(`Preview card for ${profile.name}'s portfolio website.`),
  PROFILE_TWITTER_TITLE: escapeHtml(pageTitle),
  PROFILE_TWITTER_DESCRIPTION: escapeHtml(metaDescription),
  PROFILE_TWITTER_IMAGE_URL: escapeHtml(profile.shareImageUrl),
  PROFILE_TWITTER_IMAGE_ALT: escapeHtml(`Preview card for ${profile.name}'s portfolio website.`),
};

let html = fs.readFileSync(templatePath, 'utf8');
for (const [token, value] of Object.entries(replacements)) {
  html = html.replace(new RegExp(`%${token}%`, 'g'), value);
}

fs.writeFileSync(outputPath, html, 'utf8');

if (process.platform === 'win32') {
  const generatorPath = path.join(repoRoot, 'scripts', 'generate-social-preview.ps1');
  const result = spawnSync(
    'powershell',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', generatorPath],
    {
      cwd: repoRoot,
      stdio: 'pipe',
      encoding: 'utf8',
    }
  );

  if (result.status !== 0) {
    const stderr = result.stderr?.trim();
    throw new Error(stderr || 'Social preview generation failed.');
  }
}
