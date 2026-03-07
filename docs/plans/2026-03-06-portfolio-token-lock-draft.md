# Portfolio Token Lock Draft

Date: 2026-03-06
Phase: 3
Status: Approved
Skills: `design-system-generator`, `motion-pattern-library`

## Intent

Translate the approved portfolio structure into explicit visual constraints before high-fidelity design or implementation changes continue.

## Selection Model

Each token category includes:

- options
- recommended option
- proposed locked choice

The proposed locked choice follows the approved direction unless revised.

## 1. Typography

### Option A — Recommended

- display: `Space Grotesk`
- body: `Manrope`
- tone: editorial but modern
- best for: flagship headlines, concise proof labels, dense case-study copy

### Option B

- display: `Montserrat`
- body: `Lato`
- tone: close to the current token file
- best for: low-risk migration, lower visual change

### Option C

- display and body: `Inter`
- tone: neutral product UI
- best for: maximum consistency, minimum distinctiveness

Proposed locked choice:

- Typography = Option A

## 2. Spacing

### Option A — Recommended

- scale: `4, 8, 12, 16, 24, 32, 48, 64, 96`
- density: balanced
- best for: spacious hero and case-study layouts with compact supporting cards

### Option B

- scale: `4, 8, 16, 24, 32, 48, 72, 96`
- density: slightly looser
- best for: large editorial pages with fewer dense surfaces

### Option C

- scale: `6, 12, 18, 24, 36, 48, 72, 96`
- density: more custom, less systematic
- best for: highly bespoke compositions

Proposed locked choice:

- Spacing = Option A

## 3. Colors

### Option A — Recommended

- primary background: warm editorial-light
- primary text: near-black ink
- accents: copper plus signal cyan
- secondary mode: dark technical for system-heavy surfaces

### Option B

- primary background: cool blue gradient
- primary text: charcoal
- accents: blue only
- secondary mode: none

### Option C

- primary background: dark cosmos
- primary text: off-white
- accents: neon cyan and hot orange
- secondary mode: brighter glow treatment

Proposed locked choice:

- Color system = Option A

## 4. Radius

### Option A — Recommended

- card radius: `24px`
- large panel radius: `32px`
- compact controls: `16px`
- pill controls: `999px`

### Option B

- card radius: `16px`
- large panel radius: `24px`
- compact controls: `10px`
- pill controls: `999px`

### Option C

- card radius: `12px`
- large panel radius: `20px`
- compact controls: `8px`
- pill controls: `999px`

Proposed locked choice:

- Radius = Option A

## 5. Shadows

### Option A — Recommended

- soft editorial shadows
- subtle glass depth
- low contrast, broad blur

### Option B

- crisp product shadows
- flatter UI emphasis
- lower atmosphere, more utility

### Option C

- strong glow and layered elevation
- cinematic but more visually aggressive

Proposed locked choice:

- Shadow system = Option A

## 6. Motion

### Option A — Recommended

- fast: `120ms`
- normal: `220ms`
- slow: `360ms`
- easing: restrained standard curves
- motion jobs: scene entry, chapter progress, hover emphasis

### Option B

- fast: `100ms`
- normal: `200ms`
- slow: `350ms`
- easing: current repo values
- motion jobs: generic UI motion only

### Option C

- fast: `180ms`
- normal: `320ms`
- slow: `500ms`
- easing: more cinematic and slower
- motion jobs: scene-heavy transitions

Proposed locked choice:

- Motion = Option A

## 7. Density

### Option A — Recommended

- roomy flagship sections
- medium-density supporting cards
- compact metadata and proof chips

### Option B

- uniformly dense across all sections

### Option C

- uniformly airy across all sections

Proposed locked choice:

- Density = Option A

## Look-Lock Summary

- The site should feel like a warm editorial product portfolio, not a generic SaaS page and not a return to the older dark cosmos system.
- Large surfaces remain soft, rounded, and lightly elevated.
- The flagship story gets the most space.
- Supporting work compresses cleanly without losing clarity.
- Motion stays purposeful and limited to orientation, preview, and emphasis.
- The dark technical mode exists, but only where the content demands more diagrammatic or systems-heavy treatment.

## Proposed Developer Token Block

```css
:root {
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Manrope", sans-serif;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 4.5rem;

  --leading-body: 1.65;
  --leading-heading: 1.04;
  --measure: 66ch;

  --bg-page: linear-gradient(180deg, #f7f3ec 0%, #ebe4d8 100%);
  --bg-surface: rgba(255, 255, 255, 0.78);
  --bg-surface-strong: rgba(255, 255, 255, 0.9);
  --bg-technical: #101923;

  --text-primary: #121922;
  --text-secondary: rgba(18, 25, 34, 0.72);
  --text-muted: rgba(18, 25, 34, 0.5);
  --text-on-dark: rgba(247, 244, 239, 0.92);

  --accent-primary: #b77045;
  --accent-secondary: #66d4ef;
  --accent-primary-soft: rgba(183, 112, 69, 0.14);
  --accent-secondary-soft: rgba(102, 212, 239, 0.18);

  --border-subtle: rgba(18, 25, 34, 0.08);
  --border-medium: rgba(18, 25, 34, 0.14);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  --radius-sm: 16px;
  --radius-md: 24px;
  --radius-lg: 32px;
  --radius-pill: 999px;

  --shadow-sm: 0 8px 20px rgba(18, 25, 34, 0.06);
  --shadow-md: 0 16px 38px rgba(18, 25, 34, 0.1);
  --shadow-lg: 0 24px 70px rgba(18, 25, 34, 0.14);

  --motion-fast: 120ms;
  --motion-normal: 220ms;
  --motion-slow: 360ms;

  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasis: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-soft-out: cubic-bezier(0, 0, 0.2, 1);
}
```

## Proposed Motion Pattern Block

- Hover lift
  - translateY: `-4px`
  - scale: `1.01`
  - duration: `var(--motion-fast)`
- Section reveal
  - opacity from `0` to `1`
  - translateY from `16px` to `0`
  - duration: `var(--motion-normal)`
- Hero scene entry
  - opacity from `0` to `1`
  - translateY from `24px` to `0`
  - duration: `var(--motion-slow)`
- Reduced motion
  - no parallax or ambient drift
  - keep opacity-only or instant state changes

## Migration Notes

Current repo token files still reflect the older cool-blue and mixed-font direction.

Primary token changes if this draft is approved:

- switch display and body fonts away from `Montserrat`, `Lato`, and `Inter`
- replace blue-first accenting with copper plus signal cyan
- replace cool gradient page background with a warm editorial-light field
- expand radius and shadow softness for flagship surfaces
- move motion timings from `100/200/350` to `120/220/360`

## Checkpoint 3 Approval Questions

Approve or revise:

- typography option
- spacing option
- color option
- radius option
- shadow option
- motion option
- density option

Do not move to high-fidelity design or token implementation until these are approved.

## Checkpoint 3 Approval Summary

Approved by user:

- typography: Option A
- spacing: Option A
- colors: Option A
- radius: Option A
- shadows: Option A
- motion: Option A
- density: Option A

Implementation started locally in:

- [tokens.css](D:/Projects/trastephenson.github.io/src/styles/tokens.css)
- [motionTokens.js](D:/Projects/trastephenson.github.io/src/styles/motionTokens.js)
- [index.css](D:/Projects/trastephenson.github.io/src/index.css)
- [SleekButton.jsx](D:/Projects/trastephenson.github.io/src/components/common/SleekButton.jsx)
