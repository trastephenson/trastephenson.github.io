const test = require('node:test');
const assert = require('node:assert/strict');
const {
  mergeProfileSources,
  normalizeHeadlineText,
  splitHeadlineLines,
} = require('./profile-model.cjs');

test('normalizes ASCII arrows and balances headline lines', () => {
  const headline = normalizeHeadlineText('Senior PM | AI Platform | 0 -> 1 Mobile');

  assert.equal(headline, 'Senior PM | AI Platform | 0\u21921 Mobile');
  assert.deepEqual(splitHeadlineLines(headline), ['Senior PM | AI Platform', '0\u21921 Mobile']);
});

test('overrides win over generated LinkedIn fields', () => {
  const merged = mergeProfileSources(
    { name: 'Travis', about: { metaTitle: 'Generated title' } },
    { about: { metaTitle: 'Curated title' } }
  );

  assert.equal(merged.about.metaTitle, 'Curated title');
});
