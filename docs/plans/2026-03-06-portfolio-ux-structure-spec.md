# Portfolio UX Structure Spec

Date: 2026-03-06
Phase: 2
Status: Ready for Checkpoint 2 approval

## Approved Direction Summary

Checkpoint 1 selections:

- Hero posture: recommended option approved
- Navigation: recommended option approved
- Showcase structure: recommended option approved
- Case-study format: recommended option approved
- Typography tone: recommended option approved
- Motion style: recommended option approved
- Proof placement: recommended option approved

Assumption recorded:

- Color tone: approved as the previously recommended direction
  - primary mode: warm editorial-light
  - secondary mode: dark technical treatment for systems-heavy case studies and archive-like sections

## Core Experience Model

The portfolio should behave like a guided product narrative with a parallel browsing mode.

- `Explore` is the guided mode
  - cinematic but restrained
  - flagship case first
  - motion used for entry, preview, and chapter pacing
- `Browse` is the fast mode
  - reduced chrome
  - direct access to grouped work, proof, and case studies
  - optimized for scanning and comparison

Both modes should express the same content hierarchy and design language. They are different reading modes, not two different brands.

## Site Hierarchy

### Top level

- `/`
  - portfolio home with `Explore` and `Browse` modes
- `/projects/seeds-of-thyme`
  - flagship case study
- `/projects/essential-life`
  - supporting mobile case study
- `/projects/cams-atm`
  - supporting enterprise platform case study
- `/projects/safety-wallet`
  - supporting compliance platform case study
- `/projects/llm-rag-pipelines`
  - supporting AI systems case study
- `/projects/movie-vault`
  - experimental lab case study
- `/movies.html`
  - standalone project experience for Movie Vault

### Content grouping

- Flagship lane
  - Seeds of Thyme
- Supporting proof lanes
  - mobile product work
  - enterprise and platform work
  - AI systems work
- Experimental lane
  - Movie Vault

## Home Page Structure

### Section order

1. Flagship hero
2. Proof strip
3. Flagship case preview
4. Supporting work lanes
5. Leadership and systems capability
6. Selected testimonials or trust points
7. Contact and role alignment

### Section rules

#### 1. Flagship hero

- open with thesis, not biography
- one dominant headline
- one primary CTA to the flagship case
- one secondary CTA to browse all work
- support with a compact proof strip or stat cluster

#### 2. Proof strip

- include ratings, shipped scale, platform breadth, and architecture scope
- keep proof close to the first case preview
- avoid isolated vanity-metric sections

#### 3. Flagship case preview

- show one featured project with a larger visual footprint
- frame the project through role, product challenge, and outcome
- include at least one direct trust or outcome signal beside the preview

#### 4. Supporting work lanes

- group by product type or systems context
- keep card styles consistent, but weight them below the flagship
- preserve one clearly separated experimental lane for Movie Vault

#### 5. Leadership and systems capability

- summarize architecture, delivery, AI, and cross-functional leadership
- keep this concise and evidence-backed
- use it to reinforce the case studies, not replace them

#### 6. Trust layer

- use short testimonials, client-facing proof, or delivery signals
- prioritize credibility over quantity

#### 7. Contact and role alignment

- state target roles plainly
- keep CTA choices focused
- avoid a long closing section

## Explore Mode Structure

Explore should feel paced, but not overdesigned.

- stable message area with controlled scene changes
- motion supports orientation and sequencing
- flagship preview appears before the full project grid
- chapter transitions should be short and consistent
- reduced-motion fallback must preserve all content order and emphasis

## Browse Mode Structure

Browse should feel like a portfolio dossier.

- fast scan of flagship, proof, grouped work, and case-study links
- minimal decorative motion
- denser presentation of supporting work
- persistent access to case-study routes

## Case-Study Template

### Default case-study pattern

1. Opening thesis
2. Scope and role rail
3. Problem framing
4. Key decisions
5. Artifact chapters
6. Outcome and proof blocks
7. Reflection or operating lessons

### Pattern rules

- each case study opens with a product-level summary
- keep a persistent orientation rail for role, scope, stack, and outcome
- artifacts must be labeled by decision or workflow relevance
- put proof beside the claim it supports
- use the dark technical mode only when the case needs diagram-heavy or archive-heavy treatment

## Typography Structure

- display typography reserved for hero headlines, case-study thesis statements, and selected section openers
- utility typography used for body copy, labels, stats, metadata, and dense artifact notes
- do not let display typography dominate repeated card content

## Motion Structure

Approved motion jobs:

- scene entry
- chapter progress
- hover emphasis

Motion guardrails:

- no ambient motion without informational value
- no competing animations inside the same viewport region
- reduced-motion path must preserve hierarchy and readability

## Proof Structure

Proof should be distributed through the experience.

- hero-level proof
- flagship-preview proof
- chapter-level proof in case studies
- architecture and delivery proof in enterprise and AI work

Preferred proof types:

- ratings
- shipped platforms
- scale indicators
- architecture and implementation scope
- operational complexity

## Content Priorities

Primary messages:

- product architecture and systems thinking
- UX direction tied to delivery quality
- range across consumer, enterprise, and AI work

Secondary messages:

- motion and frontend craft
- experimental solo builds
- hiring alignment

## Checkpoint 2 Approval Questions

Approve or revise:

- homepage section order
- flagship and supporting lane model
- Explore versus Browse behavior split
- default case-study chapter structure
- proof distribution model

Do not move to token lock until this structure is approved.
