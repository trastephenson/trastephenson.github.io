const fs = require('fs');
const path = require('path');
const { fetchLinkedInApiProfile } = require('./fetch-api-profile.cjs');
const { mapLinkedInProfile } = require('./map-linkedin-profile.cjs');
const { readLinkedInExport } = require('./read-export.cjs');
const {
  generatedProfilePath,
  loadGeneratedProfile,
  repoRoot,
  saveGeneratedProfile,
} = require('../profile-utils.cjs');

const DEFAULT_EXPORT_DIR = path.join(repoRoot, 'data', 'linkedin', 'raw', 'latest');

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (value === '--export-dir') {
      args.exportDir = argv[i + 1];
      i += 1;
    }
  }

  return args;
}

function hasApiConfig(env = process.env) {
  return Boolean(
    env.LINKEDIN_ACCESS_TOKEN ||
      (env.LINKEDIN_CLIENT_ID && env.LINKEDIN_CLIENT_SECRET && env.LINKEDIN_REFRESH_TOKEN)
  );
}

async function syncLinkedInProfile({ argv = process.argv.slice(2), env = process.env } = {}) {
  const args = parseArgs(argv);
  const exportDir = args.exportDir || env.LINKEDIN_EXPORT_DIR || DEFAULT_EXPORT_DIR;
  const resolvedExportDir = exportDir ? path.resolve(repoRoot, exportDir) : '';
  const existingProfile = loadGeneratedProfile();
  let apiProfile = {};
  let exportRecords = {};
  let sourceMode = '';

  if (hasApiConfig(env)) {
    apiProfile = await fetchLinkedInApiProfile(env);
    sourceMode = 'api';

    if (resolvedExportDir && fs.existsSync(resolvedExportDir)) {
      exportRecords = readLinkedInExport(resolvedExportDir);
      sourceMode = 'api+export';
    }
  } else if (resolvedExportDir && fs.existsSync(resolvedExportDir)) {
    exportRecords = readLinkedInExport(resolvedExportDir);
    sourceMode = 'export';
  } else {
    process.stdout.write(
      `No LinkedIn source configured. Keeping ${path.relative(repoRoot, generatedProfilePath)} unchanged.\n`
    );
    return { changed: false, sourceMode: 'none' };
  }

  const generatedProfile = mapLinkedInProfile({
    apiProfile,
    exportRecords,
    existingProfile,
  });

  saveGeneratedProfile(generatedProfile);
  process.stdout.write(
    `Synced LinkedIn profile from ${sourceMode} into ${path.relative(repoRoot, generatedProfilePath)}.\n`
  );

  return { changed: true, sourceMode };
}

if (require.main === module) {
  syncLinkedInProfile().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = {
  DEFAULT_EXPORT_DIR,
  hasApiConfig,
  parseArgs,
  syncLinkedInProfile,
};
