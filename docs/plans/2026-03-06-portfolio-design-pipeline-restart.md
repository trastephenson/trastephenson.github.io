# Portfolio Design Pipeline Restart

Date: 2026-03-06
Status: Checkpoint 3 approved, foundation implementation started
Pipeline skill: `ux-figma-code-pipeline`

## Scope

Restart the portfolio UX to Figma to code pipeline from the beginning for the current local portfolio, not the older dark-cosmos concept. The active site now includes:

- a dual-mode home experience with `3d` and `classic` views
- case-study routes for six projects
- a standalone `movies.html` page and a Movie Vault case study
- a new Figma concept file with homepage and case-study direction frames

## Existing Artifacts To Reuse

- Research and idea board: [portfolio update ideas](https://www.figma.com/online-whiteboard/create-diagram/3aa9cd75-03e4-45d5-b41f-48afd5f49f6b?utm_source=other&utm_content=edit_in_figjam&oai_id=&request_id=6cde1b35-a8f7-4c50-9cc0-351e4a1de02e)
- Concept design file: [Portfolio Update Ideas Concepts](https://www.figma.com/design/37yLkveMLegVaeEUaOpsLa)
- Visual decision board source: [portfolio-decision-visual-board.html](D:/Projects/trastephenson.github.io/public/portfolio-decision-visual-board.html)
- Local concept source: [portfolio-homepage-concept.html](D:/Projects/trastephenson.github.io/public/portfolio-homepage-concept.html)
- Local concept source: [portfolio-case-study-concept.html](D:/Projects/trastephenson.github.io/public/portfolio-case-study-concept.html)

## Installed Skills Used In This Restart

- `ux-figma-code-pipeline`
- `mobbin-ux-research`
- `figma`

## Missing Pipeline Helpers And Fallback

The pipeline skill references helper skills that are not installed in this workspace:

- `design-decision-board`
- `figma-auto-board-builder`
- `codepen-ingest`
- `stitch-prompt-optimizer`
- `stitch-prototype-generator`
- `style-guide-generator`
- `design-drift-guard`

Fallback for this restart:

- use `mobbin-ux-research` for Phase 1
- use Figma MCP directly for the decision board
- use markdown specs for approval checkpoints when helper board-builder skills are unavailable

## Phase 1 Research Summary

### Current portfolio problem

The site has strong range and ambitious interaction work, but the narrative is still split across multiple presentation modes. The strongest work exists, yet the portfolio still reads like a collection before it reads like a point of view.

### Reference pool

Mobbin references used during the restart:

- Site of the Year finalists: Air, Koto, Jitter, Shopify Editions, Phantom Studios, Savor
- Animation of the Year finalists: Airbnb, Luma AI, Cosmos, mymind, Duolingo, pillowtalk

Reference links:

- `https://mobbin.com/awards/category/site-of-the-year`
- `https://mobbin.com/awards/category/animation-of-the-year`
- `https://mobbin.com/awards/app/b5d172f6-2add-4df9-8bc4-c0c72a59e6da`
- `https://mobbin.com/awards/app/dc1c4519-a08e-4e11-a5c7-1ef979110f69`

### Decision areas and recommendations

#### 1. Hero posture

Examples:

- Koto: disciplined headline and calm hierarchy
- Jitter: showreel rhythm and direct value statement
- Air: immediate entry into the work rather than a long introduction

Recommendation:

- lead with a flagship thesis and one featured case
- keep biography secondary

Why:

- the portfolio needs a point of view immediately
- flagship-first framing makes the range feel curated rather than scattered

#### 2. Navigation and browsing model

Examples:

- Air: browseable gallery logic
- Koto: restrained navigation that stays out of the way
- current site: `3d` and `classic` mode toggle

Recommendation:

- reframe the homepage control as `Explore` versus `Browse`
- keep navigation minimal and make the work the center of gravity

Why:

- the current toggle is functional but not yet narratively meaningful
- the new framing turns the mode switch into a product choice instead of a utility

#### 3. Showcase structure

Examples:

- Air: work-first scanning
- Shopify Editions: strong pacing and clear grouping
- current portfolio cards: good project breadth but uneven emphasis

Recommendation:

- promote one flagship case, group the rest as supporting proof, and reserve one lane for experimental work like Movie Vault

Why:

- not every project should carry equal visual weight
- clearer grouping improves scan speed and hierarchy

#### 4. Case-study format

Examples:

- Koto: crisp framing and clean content hierarchy
- current new concept frames: sticky rail plus chaptered artifacts
- enterprise work in the portfolio: needs more room for reasoning and outcomes

Recommendation:

- use story-led case studies with a persistent proof rail, chaptered artifacts, and outcome cards placed beside claims

Why:

- the strongest portfolio value is decision quality, not just screen polish
- artifacts need labels and context to read as evidence

#### 5. Typography tone

Examples:

- Koto: restrained, editorial, highly legible
- Jitter: expressive display moments with disciplined body copy
- current site: energetic but still somewhat mixed between modes

Recommendation:

- use one expressive display voice for major headlines and one calm utility face for supporting content

Why:

- this keeps the site distinctive without making every section compete for attention

#### 6. Color tone

Examples:

- Koto: controlled contrast and restraint
- Jitter: minimal palette letting motion carry personality
- current portfolio: bright surfaces and dark-cosmos residue in the 3D mode

Recommendation:

- converge on a warm editorial-light base with one accent family and one darker technical mode for systems-heavy case studies

Why:

- the portfolio needs one primary visual language, not two separate identities
- a darker mode can still exist, but as an intentional content mode rather than the default atmosphere

#### 7. Motion style

Examples:

- Jitter: motion with restraint and clarity
- Airbnb and Luma AI finalists: strong sequencing without overwhelming the page
- current site: ambitious motion, but occasionally stronger than the content hierarchy

Recommendation:

- use motion to guide reading, chapter transitions, and project previews
- keep reduced-motion fallbacks first-class

Why:

- the site should feel deliberate, not merely animated
- motion works best when it supports narrative pacing and orientation

#### 8. Trust and proof

Examples:

- portfolio already has ratings, shipped products, and enterprise delivery claims
- current homepage underuses that proof near the featured work
- the new concept frames place proof beside the story

Recommendation:

- move ratings, platform scale, architecture scope, and release outcomes closer to featured work and case-study chapters

Why:

- evidence should support claims in real time
- this increases credibility without adding more sections

## Restarted Pipeline State

### Phase 1

Completed:

- research references collected
- portfolio-specific recommendations documented
- restart scope anchored to the current repo and Figma concepts

### Phase 1B

Completed:

- create a fresh Figma decision board for Checkpoint 1
- collect approval on hero, navigation, showcase, case-study, typography, motion, and proof directions

### Checkpoint 1 Approval Summary

Approved by user:

- hero posture: recommended option
- navigation: recommended option
- showcase structure: recommended option
- case-study format: recommended option
- typography tone: recommended option
- motion style: recommended option
- proof placement: recommended option

Assumed from prior recommendation:

- color tone: warm editorial-light primary, dark technical secondary

### Phase 2

Completed:

- create the UX structure specification
- prepare Checkpoint 2 for approval before token lock

### Checkpoint 2 Approval Summary

Approved by user:

- homepage section order
- flagship and supporting lane model
- Explore versus Browse behavior split
- default case-study chapter structure
- proof distribution model

### Phase 3

Completed:

- create the token lock draft
- prepare Checkpoint 3 approval before high-fidelity design

### Checkpoint 3 Approval Summary

Approved by user:

- typography option
- spacing option
- color option
- radius option
- shadow option
- motion option
- density option

### Foundation implementation

Started locally:

- shared token CSS updated
- shared motion tokens updated
- global font and background hooks aligned to approved tokens
- shared button accents aligned to approved token colors

## Next Gate

Next:

- extend approved tokens into the remaining shared components and routes
- create or refine the high-fidelity homepage and case-study designs against the locked system
