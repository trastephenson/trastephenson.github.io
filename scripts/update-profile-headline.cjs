const {
  loadOverridesProfile,
  normalizeHeadlineText,
  saveOverridesProfile,
  splitHeadlineLines,
} = require('./profile-utils.cjs');

const inputHeadline = process.argv.slice(2).join(' ').trim();

if (!inputHeadline) {
  console.error('Usage: npm run set-headline -- "Headline text"');
  process.exit(1);
}

const profile = loadOverridesProfile();
const normalizedHeadline = normalizeHeadlineText(inputHeadline);

profile.headlineText = normalizedHeadline;
profile.headlineDisplayLines = splitHeadlineLines(normalizedHeadline);
profile.headlineLastUpdated = new Date().toISOString();

saveOverridesProfile(profile);

process.stdout.write(
  `Updated headline to: ${profile.headlineText}\nLast updated: ${profile.headlineLastUpdated}\n`
);
