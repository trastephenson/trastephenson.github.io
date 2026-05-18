# LinkedIn Profile Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make relevant 2D and 3D portfolio content align with Travis Stephenson's LinkedIn profile and update automatically wherever LinkedIn can be used as a compliant source.

**Architecture:** Keep React components importing `src/content/profile.json`, but turn that file into the generated canonical profile contract for the whole portfolio. Add LinkedIn source adapters that normalize either official LinkedIn API data or an owner-downloaded LinkedIn data export into the same profile model, merge it with curated portfolio overrides, then update the 2D and 3D sections from that model. Run the sync in local development, CI, and deploy workflows; never fetch LinkedIn from the browser and never store LinkedIn secrets client-side.

**Tech Stack:** React 18, Create React App, styled-components, React Three Fiber, Node.js scripts, `node:test`, GitHub Actions, Render auto-deploy, official LinkedIn API where approved, LinkedIn account data export fallback.

---

## Decision Summary

| Decision | Direction | Reason |
|---|---|---|
| LinkedIn source | Use official API if approved; use LinkedIn data export fallback otherwise | LinkedIn restricts profile API access and prohibits crawler/browser automation for profile data. |
| Runtime model | Static generated JSON, not client-side LinkedIn fetches | The portfolio is a static React app and cannot safely hold OAuth credentials. |
| Canonical file | Preserve `src/content/profile.json` as the component-facing contract | Current 2D header and 3D hero already read this file. |
| Manual curation | Add `src/content/profile.overrides.json` | Some site language, project framing, case-study links, and availability copy should stay portfolio-specific. |
| Automation | Scheduled/manual GitHub Action commits generated changes | A static site only updates after a build/deploy trigger; a daily sync commit gives Render and GitHub Pages a deploy event. |
| Scraping | Do not implement LinkedIn scraping, cookie automation, browser bots, or Voyager/internal API calls | It is brittle, account-risky, and conflicts with LinkedIn policy. |

## Compliance Notes

| Source | Relevant Finding | Plan Impact |
|---|---|---|
| LinkedIn Profile API docs | Profile API access is restricted to approved developers and data is subject to permissions and member privacy. | Add API support, but make access verification the first execution gate. |
| LinkedIn API access help | LinkedIn API access is via self-service products or enterprise programs. | Treat API enablement as an external dependency Travis must approve/provide. |
| LinkedIn prohibited software help | LinkedIn prohibits crawlers, bots, browser plug-ins, and automation that scrape profile data. | Exclude scraping from the architecture. |
| LinkedIn account data export help | Members can request their own profile, positions, skills, projects, certifications, recommendations, and other data. | Provide a compliant fallback that imports an extracted owner data archive. |

## Current Repo Findings

| Area | Current State | Migration Target |
|---|---|---|
| Existing sync | `package.json` already runs `npm run sync:profile` before `start` and `build`. | Extend this into `sync:linkedin` plus profile merge/validation. |
| Profile contract | `src/content/profile.json` has name, headline, preview/meta fields. | Expand schema to cover bio, stats, skills, tools, availability, and 3D card copy. |
| 2D hero | `src/components/header/Header.jsx` reads `profile.name` and `profile.headlineDisplayLines`. | Keep as-is after schema expansion. |
| 3D hero | `src/components/three/SpatialGrid.jsx` reads profile name/headline but hardcodes other cards. | Replace hardcoded 3D copy with `profile.spatialCards`. |
| 2D sections | `About.jsx`, `Experience.jsx`, `Services.jsx`, `HomePortfolioPage.jsx`, and `Portfolio.jsx` hardcode relevant profile facts. | Read relevant facts from `profile.json` or small local mappers. |
| Links | LinkedIn URL is repeated in `CTA.jsx`, `Nav.jsx`, `Contact.jsx`, `Footer.jsx`, and portfolio secondary CTAs. | Centralize to `profile.links.linkedin`. |

## LinkedIn Field Mapping

| LinkedIn Source | Portfolio Field | Used In |
|---|---|---|
| Profile name | `name` | 2D hero, 3D hello card, meta tags |
| Profile headline | `headlineText`, `headlineDisplayLines` | 2D hero, 3D hello/tagline cards, page title, meta description |
| Vanity name/public URL | `links.linkedin` | CTA, nav, contact, footer, AI work secondary link |
| About/summary | `about.paragraphs`, `previewBodyText`, `previewBodyLines` | About section, SEO/social preview |
| Current position | `about.metaTitle`, `availability.roleTargets`, `stats` | About photo meta, connect card, 2D stats |
| Positions | `experienceHighlights`, `stats`, `about.paragraphs` | About, 3D experience card, proof language |
| Skills | `capabilityGroups`, `toolGroups`, `spatialCards.skills` | Experience accordion, tools section, 3D strengths/tools cards |
| Projects | `featuredWork.*[].summary` where IDs match existing case studies | Portfolio panels and 3D project captions |
| Certifications | `capabilityGroups` certifications group | Experience accordion |
| Recommendations received | `testimonials` only when text and attribution are available | Testimonials carousel and 3D testimonial card |

## RACI

| Workstream | Travis | Codex/Implementer | LinkedIn | Render/GitHub |
|---|---|---|---|---|
| Decide approved field mapping | A/R | C | I | I |
| Provide LinkedIn API app access or export archive | A/R | C | C | I |
| Build sync scripts and schema | A | R | I | I |
| Validate profile copy quality | A/R | C | I | I |
| Configure CI secrets | A/R | C | I | C |
| Deploy automation | A | R | I | R |

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/content/profile.json` | Modify generated shape | Canonical runtime profile consumed by React. |
| `src/content/profile.overrides.json` | Create | Curated portfolio-specific overrides that should not be overwritten by LinkedIn. |
| `src/content/profile.generated.json` | Create | Normalized LinkedIn-derived profile output committed for deterministic builds. |
| `scripts/profile-schema.cjs` | Create | Runtime validation for the profile contract. |
| `scripts/profile-model.cjs` | Create | Merge, normalize, line-splitting, skill grouping, and spatial card derivation. |
| `scripts/profile-model.test.cjs` | Create | Unit coverage for merging, headline splitting, and field derivation. |
| `scripts/linkedin/map-linkedin-profile.cjs` | Create | Converts LinkedIn API/export records into the portfolio profile model. |
| `scripts/linkedin/read-export.cjs` | Create | Reads an extracted LinkedIn data export folder. |
| `scripts/linkedin/fetch-api-profile.cjs` | Create | Fetches LinkedIn `/v2/me` after server-side OAuth token refresh. |
| `scripts/linkedin/sync-linkedin-profile.cjs` | Create | Main source adapter command for API or export modes. |
| `scripts/sync-profile-content.cjs` | Modify | Validate and render `public/index.html` from the expanded profile contract. |
| `scripts/profile-utils.cjs` | Modify | Load merged profile sources and save generated profile output. |
| `package.json` | Modify | Add `sync:linkedin`, `sync:profile:validate`, and `test:profile` scripts. |
| `.gitignore` | Modify | Ignore raw LinkedIn exports and local token files. |
| `.github/workflows/sync-linkedin-profile.yml` | Create | Scheduled/manual sync job that commits generated profile changes. |
| `src/components/about/About.jsx` | Modify | Consume `profile.about` and photo meta fields. |
| `src/components/experience/Experience.jsx` | Modify | Consume `profile.capabilityGroups`. |
| `src/components/services/Services.jsx` | Modify | Consume `profile.toolGroups`. |
| `src/pages/HomePortfolioPage.jsx` | Modify | Consume `profile.stats` and `profile.availability`. |
| `src/components/portfolio/Portfolio.jsx` | Modify | Merge LinkedIn-derived project summaries with local image/route assets. |
| `src/components/three/SpatialGrid.jsx` | Modify | Consume `profile.spatialCards` and centralized project captions. |
| `src/components/header/CTA.jsx` | Modify | Consume centralized LinkedIn URL. |
| `src/components/nav/Nav.jsx` | Modify | Consume centralized LinkedIn URL. |
| `src/components/contact/Contact.jsx` | Modify | Consume centralized LinkedIn URL. |
| `src/components/footer/Footer.jsx` | Modify | Consume centralized LinkedIn URL. |

## Target Profile Contract

```json
{
  "name": "Travis Stephenson",
  "headlineText": "Senior Product Manager | AI Product & Platform | 0\\u21921 Mobile + Enterprise | Scaled to 500k DAU",
  "headlineDisplayLines": [
    "Senior Product Manager | AI Product & Platform",
    "0\\u21921 Mobile + Enterprise | Scaled to 500k DAU"
  ],
  "headlineLastUpdated": "2026-05-14T00:00:00.000Z",
  "links": {
    "linkedin": "https://www.linkedin.com/in/trastephenson/",
    "email": "mailto:stephenson.tra@gmail.com",
    "website": "https://www.travis-stephenson.cv/"
  },
  "about": {
    "metaEyebrow": "Product & platform",
    "metaTitle": "Senior Technical Product Manager",
    "metaNote": "AI platforms, enterprise systems, and high-scale delivery - systems serving 500,000+ daily users.",
    "paragraphs": [
      "Senior Technical Product Manager focused on AI platforms, enterprise systems, and high-scale software delivery."
    ]
  },
  "stats": [
    { "num": "10+", "label": "Years", "sub": "Enterprise and AI delivery" },
    { "num": "5+", "label": "Platforms", "sub": "Shipped into production" },
    { "num": "LLM", "label": "Systems", "sub": "Multi-agent and RAG architecture" },
    { "num": "AWS", "label": "Cloud", "sub": "Platform and DevOps strategy" }
  ],
  "capabilityGroups": [
    { "category": "AI Systems", "skills": ["Multi-Agent LLM Systems", "RAG Architecture"] }
  ],
  "toolGroups": [
    { "category": "Cloud and Infrastructure", "tools": ["AWS", "Docker", "Kubernetes"] }
  ],
  "availability": {
    "summary": "Open to Director of Engineering, AI Platform Architecture, and Principal Architect roles in enterprise SaaS and AI-enabled platform delivery.",
    "roleTargets": ["Director of Engineering", "AI Platform Architecture", "Principal Architect"]
  },
  "spatialCards": {
    "aboutPrimary": "AI platforms · enterprise\\n500,000+ DAU",
    "aboutSecondary": "26+ platforms at Appstango\\nLLM · document AI · execution",
    "strengths": "AI product platforms · RAG · LLM\\nMobile · backend · cloud · launch\\nAPIs · infra · data at scale",
    "experience": "Engineering Operations\\nAI Platform Architecture\\nDelivery Governance · LLM Systems",
    "tools": "Figma · AWS · Docker · Kubernetes\\nTerraform · Jira · Confluence\\nGitHub · Postman · CI/CD",
    "contact": "Architecture consulting\\nAdvisory & senior product leadership",
    "connect": "Director of Engineering\\nAI Platform · Principal Architect"
  }
}
```

## Implementation Tasks

### Task 1: Add Profile Contract Validation

**Files:**
- Create: `scripts/profile-schema.cjs`
- Create: `scripts/profile-model.cjs`
- Create: `scripts/profile-model.test.cjs`
- Modify: `package.json`

- [ ] **Step 1: Write failing model tests**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeHeadlineText, splitHeadlineLines, mergeProfileSources } = require('./profile-model.cjs');

test('normalizes ASCII arrows and balances headline lines', () => {
  const headline = normalizeHeadlineText('Senior PM | AI Platform | 0 -> 1 Mobile');
  assert.equal(headline, 'Senior PM | AI Platform | 0→1 Mobile');
  assert.deepEqual(splitHeadlineLines(headline), ['Senior PM | AI Platform', '0→1 Mobile']);
});

test('overrides win over generated LinkedIn fields', () => {
  const merged = mergeProfileSources(
    { name: 'Travis', about: { metaTitle: 'Generated title' } },
    { about: { metaTitle: 'Curated title' } }
  );
  assert.equal(merged.about.metaTitle, 'Curated title');
});
```

- [ ] **Step 2: Run failing tests**

Run: `node --test scripts/profile-model.test.cjs`

Expected: FAIL because `scripts/profile-model.cjs` does not exist.

- [ ] **Step 3: Implement profile model utilities**

Implement `normalizeHeadlineText`, `splitHeadlineLines`, `mergeProfileSources`, `deriveSpatialCards`, and `validateProfile`. Keep the merge recursive for plain objects, replace arrays wholesale, and throw explicit validation errors for missing `name`, `headlineText`, `links.linkedin`, `about.paragraphs`, `capabilityGroups`, `toolGroups`, `stats`, `availability.summary`, and `spatialCards`.

- [ ] **Step 4: Add script command**

Add to `package.json`:

```json
"test:profile": "node --test scripts/*.test.cjs"
```

- [ ] **Step 5: Verify**

Run: `npm run test:profile`

Expected: PASS.

### Task 2: Split Generated LinkedIn Data From Curated Portfolio Overrides

**Files:**
- Create: `src/content/profile.generated.json`
- Create: `src/content/profile.overrides.json`
- Modify: `src/content/profile.json`
- Modify: `scripts/profile-utils.cjs`
- Modify: `scripts/sync-profile-content.cjs`

- [ ] **Step 1: Create source files from current profile**

Move LinkedIn-like fields into `profile.generated.json`: `name`, `headlineText`, `headlineDisplayLines`, `headlineLastUpdated`, `links.linkedin`.

Move site-specific fields into `profile.overrides.json`: `previewBadge`, `previewBodyText`, `previewBodyLines`, `canonicalUrl`, `shareImageUrl`, curated bio paragraphs, stats, capability groups, tool groups, availability, and spatial card copy.

- [ ] **Step 2: Update `profile-utils.cjs` loading**

Make `loadProfile()` read `profile.generated.json`, deep-merge `profile.overrides.json`, derive any missing display fields, validate the result, and return the merged object. Make `saveProfile()` write the canonical merged result to `src/content/profile.json`.

- [ ] **Step 3: Keep existing scripts compatible**

Update `set-headline` and `update-profile-headline` behavior so manual headline changes update `profile.overrides.json` or a local generated field intentionally, then call `sync-profile-content.cjs`.

- [ ] **Step 4: Verify generated output**

Run: `npm run sync:profile && git diff -- src/content/profile.json public/index.html`

Expected: only intentional schema expansion and meta-content updates appear.

### Task 3: Build LinkedIn Source Adapters

**Files:**
- Create: `scripts/linkedin/map-linkedin-profile.cjs`
- Create: `scripts/linkedin/read-export.cjs`
- Create: `scripts/linkedin/fetch-api-profile.cjs`
- Create: `scripts/linkedin/sync-linkedin-profile.cjs`
- Create: `scripts/linkedin/map-linkedin-profile.test.cjs`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Write mapper tests**

Create test fixtures for API-style profile data and extracted export records:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { mapLinkedInProfile } = require('./map-linkedin-profile.cjs');

test('maps LinkedIn profile headline into portfolio headline fields', () => {
  const profile = mapLinkedInProfile({
    apiProfile: {
      localizedFirstName: 'Travis',
      localizedLastName: 'Stephenson',
      localizedHeadline: 'Senior Product Manager | AI Product & Platform',
      vanityName: 'trastephenson'
    },
    exportRecords: {}
  });

  assert.equal(profile.name, 'Travis Stephenson');
  assert.equal(profile.headlineText, 'Senior Product Manager | AI Product & Platform');
  assert.equal(profile.links.linkedin, 'https://www.linkedin.com/in/trastephenson/');
});
```

- [ ] **Step 2: Implement export reader**

Read an extracted folder path passed as `--export-dir`. Support these files when present: `Profile.csv`, `Positions.csv`, `Skills.csv`, `Projects.csv`, `Certifications.csv`, `Recommendations Received.csv`, and `Rich Media.csv`. Parse quoted CSV values correctly, including commas and line breaks inside quoted cells.

- [ ] **Step 3: Implement API fetcher**

Fetch a server-side access token using `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, and `LINKEDIN_REFRESH_TOKEN` when a refresh token is available. Then call `GET https://api.linkedin.com/v2/me` with `Authorization: Bearer <token>` and `X-RestLi-Protocol-Version: 2.0.0`. Fail closed with a clear message if the app lacks required LinkedIn permission.

- [ ] **Step 4: Implement main sync command**

Add `scripts/linkedin/sync-linkedin-profile.cjs` with this priority:

| Priority | Mode | Required Input | Output |
|---|---|---|---|
| 1 | API | `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_REFRESH_TOKEN` | `src/content/profile.generated.json` |
| 2 | Export | `--export-dir data/linkedin/raw/<archive-folder>` | `src/content/profile.generated.json` |
| 3 | No source | Existing generated file | Exit 0 with "No LinkedIn source configured" for local dev |

- [ ] **Step 5: Add commands and ignores**

Add to `package.json`:

```json
"sync:linkedin": "node scripts/linkedin/sync-linkedin-profile.cjs",
"sync:profile:validate": "node -e \"require('./scripts/profile-utils.cjs').loadProfile(); console.log('Profile valid')\""
```

Add to `.gitignore`:

```gitignore
data/linkedin/raw/
.env.linkedin
```

- [ ] **Step 6: Verify**

Run: `npm run sync:linkedin && npm run sync:profile:validate && npm run test:profile`

Expected: PASS with API/export source configured, or a clean no-source message in local development.

### Task 4: Wire 2D Sections To The Expanded Profile Contract

**Files:**
- Modify: `src/components/about/About.jsx`
- Modify: `src/components/experience/Experience.jsx`
- Modify: `src/components/services/Services.jsx`
- Modify: `src/pages/HomePortfolioPage.jsx`
- Modify: `src/components/header/CTA.jsx`
- Modify: `src/components/nav/Nav.jsx`
- Modify: `src/components/contact/Contact.jsx`
- Modify: `src/components/footer/Footer.jsx`

- [ ] **Step 1: Replace hardcoded about copy**

Import `profile` in `About.jsx`. Render `profile.about.metaEyebrow`, `profile.about.metaTitle`, `profile.about.metaNote`, and `profile.about.paragraphs`. Preserve the current layout and portrait assets.

- [ ] **Step 2: Replace hardcoded capabilities**

Import `profile` in `Experience.jsx`. Replace `SKILL_GROUPS` with `profile.capabilityGroups`. Keep `openGroup` initialized to `profile.capabilityGroups[0]?.category || null`.

- [ ] **Step 3: Replace hardcoded tools**

Import `profile` in `Services.jsx`. Replace `TOOL_GROUPS` with `profile.toolGroups`.

- [ ] **Step 4: Replace hardcoded stats and availability**

Import `profile` in `HomePortfolioPage.jsx`. Replace `statItems` with `profile.stats`. Replace the 3D connect overlay paragraph with `profile.availability.summary`. Replace repeated email/LinkedIn links with `profile.links`.

- [ ] **Step 5: Centralize LinkedIn links**

Update `CTA.jsx`, `Nav.jsx`, `Contact.jsx`, and `Footer.jsx` to use `profile.links.linkedin`.

- [ ] **Step 6: Verify 2D mode**

Run: `npm run build`

Expected: PASS. Then run `npm start`, open the classic layout, and verify hero, about, capabilities, tools, contact, and footer all show profile-driven copy.

### Task 5: Wire 3D Cards To The Expanded Profile Contract

**Files:**
- Modify: `src/components/three/SpatialGrid.jsx`
- Modify: `src/utils/cardLayout.js`

- [ ] **Step 1: Replace 3D hardcoded profile copy**

In `SpatialGrid.jsx`, replace these string literals with profile fields:

| Card Index | Current Content | New Source |
|---|---|---|
| 2 | About primary/secondary text | `profile.spatialCards.aboutPrimary`, `profile.spatialCards.aboutSecondary` |
| 3 | Strengths text | `profile.spatialCards.strengths` |
| 4 | Experience text | `profile.spatialCards.experience` |
| 5 | Tools text | `profile.spatialCards.tools` |
| 10 | Contact subtitle | `profile.spatialCards.contact` |
| 11 | Connect subtitle | `profile.spatialCards.connect` |

- [ ] **Step 2: Keep 3D text bounded**

Create a small helper:

```js
function asMultilineText(value, fallback = '') {
  return Array.isArray(value) ? value.join('\n') : String(value || fallback);
}
```

Use it before passing text to Drei `<Text>` so missing optional data cannot crash the scene.

- [ ] **Step 3: Verify 3D mode**

Run: `npm start`. In the browser, open Explore Mode and verify all 12 cards render. Use a Playwright or browser screenshot check for desktop and mobile widths, and confirm the canvas is nonblank and card text does not overlap.

### Task 6: Make Featured Work Safely Profile-Aware

**Files:**
- Modify: `src/components/portfolio/Portfolio.jsx`
- Modify: `src/components/portfolio/WorkPanel.jsx`
- Modify: `src/content/profile.overrides.json`

- [ ] **Step 1: Preserve local assets and routes**

Keep image imports and route URLs local in `Portfolio.jsx`. Add a small mapper that overlays LinkedIn-derived `featuredWork` summaries by stable key, not by array position.

```js
const localWorkByKey = {
  seedsOfThyme: { image: IMG1, routeUrl: '/projects/seeds-of-thyme' },
  essentialLife: { image: IMG2, routeUrl: '/projects/essential-life' }
};
```

- [ ] **Step 2: Avoid destructive LinkedIn overwrite**

Only allow LinkedIn/project data to update `title`, `summary`, `secondaryUrl`, and `secondaryCta` when a matching key exists in curated overrides. Do not let imported LinkedIn project text remove case-study routes or local images.

- [ ] **Step 3: Verify portfolio panels**

Run: `npm run build`. Then inspect 2D and 3D Featured Work sections and confirm project images, case-study links, and app links still work.

### Task 7: Add Scheduled Sync Automation

**Files:**
- Create: `.github/workflows/sync-linkedin-profile.yml`
- Modify: `README.md`

- [ ] **Step 1: Add workflow**

Create a GitHub Actions workflow with:

| Trigger | Purpose |
|---|---|
| `workflow_dispatch` | Manual sync after a known LinkedIn profile update. |
| `schedule` daily | Automatic drift correction. |

The workflow should:

1. Check out `main`.
2. Install dependencies with `npm ci`.
3. Run `npm run sync:linkedin`.
4. Run `npm run sync:profile`.
5. Run `npm run test:profile`.
6. Run `npm run build`.
7. Commit and push `src/content/profile.generated.json`, `src/content/profile.json`, `public/index.html`, and any generated preview assets if changed.

- [ ] **Step 2: Configure secrets**

Use repository secrets:

| Secret | Required For |
|---|---|
| `LINKEDIN_CLIENT_ID` | API mode |
| `LINKEDIN_CLIENT_SECRET` | API mode |
| `LINKEDIN_REFRESH_TOKEN` | API mode |

- [ ] **Step 3: Document fallback**

Add README instructions for export mode:

```bash
npm run sync:linkedin -- --export-dir data/linkedin/raw/<extracted-archive-folder>
npm run sync:profile
npm run build
```

- [ ] **Step 4: Verify deployment trigger**

Run workflow manually. Expected result: if profile output changes, the workflow commits to `main`, Render auto-deploys the primary site, and the GitHub Pages mirror is updated through the existing deploy path or a follow-up Pages workflow.

### Task 8: Acceptance Verification

**Files:**
- No new implementation files.

- [ ] **Step 1: Run local checks**

```bash
npm run sync:linkedin
npm run sync:profile
npm run sync:profile:validate
npm run test:profile
npm run build
```

Expected: all commands pass.

- [ ] **Step 2: Visual check 2D**

Start the app with `npm start`. In Browse Mode, verify:

| Section | Expected |
|---|---|
| Hero | Name and headline match generated profile. |
| About | LinkedIn-derived/about-approved copy appears. |
| Capabilities | Skills match generated capability groups. |
| Tools | Tools match generated tool groups. |
| Featured Work | Local assets/routes remain intact; summaries are updated only where mapped. |
| Contact/Footer/Nav | LinkedIn URL comes from one source. |

- [ ] **Step 3: Visual check 3D**

In Explore Mode, verify:

| Card | Expected |
|---|---|
| Hello/Tagline | Name/headline match 2D hero. |
| About/Strengths/Experience/Tools | Text comes from `profile.spatialCards`. |
| Mobile/Platforms/AI | Project captions still match portfolio panels. |
| Contact/Connect | Availability and role targets match 2D contact section. |

- [ ] **Step 4: Change simulation**

Edit `src/content/profile.generated.json` headline in a throwaway branch, run `npm run sync:profile && npm run build`, and confirm both 2D and 3D hero copy update without component edits.

## Execution Gates

| Gate | Required Outcome | Owner |
|---|---|---|
| LinkedIn access | Confirm API access exists or choose export fallback | Travis |
| Field mapping | Approve which LinkedIn fields can update portfolio copy automatically | Travis |
| Sync mode | Choose API-first automation or export-assisted automation | Travis |
| Implementation | Build tasks 1-8 in order | Codex/Implementer |
| Final approval | Review live site copy after first generated update | Travis |

## Known Limitation

True automatic updates immediately after a LinkedIn profile edit require a compliant programmatic LinkedIn source and a deploy trigger. If LinkedIn API approval/permissions are not available, the fallback is compliant but not fully automatic: Travis must periodically download/extract the LinkedIn data archive or provide an approved alternative source. The portfolio automation can still make every downstream update automatic after that source file is available.
