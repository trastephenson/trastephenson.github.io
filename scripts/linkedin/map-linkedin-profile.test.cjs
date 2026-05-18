const test = require('node:test');
const assert = require('node:assert/strict');
const { mapLinkedInProfile } = require('./map-linkedin-profile.cjs');

test('maps LinkedIn profile headline into portfolio headline fields', () => {
  const profile = mapLinkedInProfile({
    apiProfile: {
      localizedFirstName: 'Travis',
      localizedLastName: 'Stephenson',
      localizedHeadline: 'Senior Product Manager | AI Product & Platform',
      vanityName: 'trastephenson',
    },
    exportRecords: {},
  });

  assert.equal(profile.name, 'Travis Stephenson');
  assert.equal(profile.headlineText, 'Senior Product Manager | AI Product & Platform');
  assert.deepEqual(profile.headlineDisplayLines, ['Senior Product Manager', 'AI Product & Platform']);
  assert.equal(profile.links.linkedin, 'https://www.linkedin.com/in/trastephenson/');
});

test('maps export skills and profile summary when present', () => {
  const profile = mapLinkedInProfile({
    apiProfile: {},
    exportRecords: {
      profile: [
        {
          'First Name': 'Travis',
          'Last Name': 'Stephenson',
          Headline: 'Security Architect | AI Product',
          Summary: 'Builds security and AI product systems.',
          'Profile URL': 'https://www.linkedin.com/in/trastephenson/',
        },
      ],
      skills: [
        { Name: 'AWS' },
        { Name: 'Content Moderation' },
        { Name: 'RAG Architecture' },
      ],
      certifications: [
        { Name: 'AWS Cloud Practitioner' },
      ],
    },
  });

  assert.equal(profile.about.paragraphs[0], 'Builds security and AI product systems.');
  assert.equal(profile.capabilityGroups[0].category, 'LinkedIn Skills');
  assert.deepEqual(profile.capabilityGroups[0].skills, ['AWS', 'Content Moderation', 'RAG Architecture']);
  assert.equal(profile.capabilityGroups[1].category, 'Certifications');
  assert.deepEqual(profile.capabilityGroups[1].skills, ['AWS Cloud Practitioner']);
});

test('keeps existing canonical LinkedIn URL when export is stale', () => {
  const profile = mapLinkedInProfile({
    existingProfile: {
      links: {
        linkedin: 'https://www.linkedin.com/in/trastephenson/',
      },
    },
    exportRecords: {
      profile: [
        {
          'Profile URL': 'https://www.linkedin.com/in/old-handle/',
        },
      ],
    },
  });

  assert.equal(profile.links.linkedin, 'https://www.linkedin.com/in/trastephenson/');
});
