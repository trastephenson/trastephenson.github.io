# Travis Stephenson — Portfolio

**AI Platform Product Manager · Senior PM · Principal PM**

[![Live Site](https://img.shields.io/badge/Live%20Site-travis--stephenson.cv-7c6ff7?style=for-the-badge&logo=googlechrome)](https://www.travis-stephenson.cv/)
[![GitHub Pages](https://img.shields.io/badge/Mirror-trastephenson.github.io-333?style=for-the-badge&logo=github)](https://trastephenson.github.io)

---

## 🔗 Live

| URL | Platform |
|-----|----------|
| [travis-stephenson.cv](https://www.travis-stephenson.cv/) | Primary — custom domain (Render.com) |
| [trastephenson.github.io](https://trastephenson.github.io) | Mirror — GitHub Pages (`master` branch) |

---

## Overview

An interactive portfolio built with React 18 and React Three Fiber, featuring a spatial 3D card grid on desktop and a responsive classic scrollable layout on mobile.

- **3D Mode (desktop/tablet)** — 12 glass-morphism section cards in a bowl-shaped spatial grid. Click any card to zoom in; swipe horizontally to navigate between sections; Escape or the ✕ button to return to overview.
- **Classic Mode (mobile / fallback)** — Full scrollable single-page layout with IntersectionObserver-driven nav highlighting.

---

## Stack

| Layer | Tech |
|-------|------|
| UI | React 18, styled-components |
| 3D | Three.js, React Three Fiber, @react-three/drei |
| Animation | maath (easing), GLSL shaders |
| Deployment | `travis-stephenson.cv` (Render.com, auto-deploys `main`), GitHub Pages mirror (`master`) |

---

## Local Development

```bash
npm install
npm start        # dev server at localhost:3000
npm run build    # production build
npm run deploy   # build + push to master (GitHub Pages)
```

---

## LinkedIn Profile Sync

The portfolio renders profile-backed copy from `src/content/profile.json`. That file is generated from `src/content/profile.generated.json` plus curated portfolio overrides in `src/content/profile.overrides.json`.

| Command | Purpose |
|---------|---------|
| `npm run sync:linkedin` | Pulls the configured LinkedIn source into `src/content/profile.generated.json`. |
| `npm run sync:profile` | Merges generated LinkedIn data with curated overrides and updates `src/content/profile.json` plus public meta tags. |
| `npm run sync:profile:validate` | Validates the profile contract consumed by React and Three.js. |
| `npm run test:profile` | Runs profile model and LinkedIn mapper tests. |

Official LinkedIn API mode uses repository or local environment values:

| Secret / Env Var | Required For |
|------------------|--------------|
| `LINKEDIN_CLIENT_ID` | API mode |
| `LINKEDIN_CLIENT_SECRET` | API mode |
| `LINKEDIN_REFRESH_TOKEN` | API mode |

Export fallback mode uses a LinkedIn account data export extracted outside git. By default, place the extracted CSV files under `data/linkedin/raw/latest/`:

```bash
npm run sync:linkedin
npm run sync:profile
npm run build
```

You can also point at another extracted archive folder:

```bash
npm run sync:linkedin -- --export-dir data/linkedin/raw/<extracted-archive-folder>
```

Raw exports are ignored under `data/linkedin/raw/`.

---

## Project Structure

```
src/
├── components/
│   ├── three/          # 3D scene — SpatialGrid, CameraRig, TunnelRings shader
│   ├── scroll/         # SectionOverlay, ScrollProgress, BackButton
│   ├── nav/            # Floating bottom nav bar
│   └── common/         # LoadingScreen
├── hooks/
│   └── useVirtualScroll.js   # Click-to-zoom + touch swipe navigation
├── context/
│   └── ScrollContext.js
└── utils/
    └── cardLayout.js   # Grid geometry, accent colours, section labels
```

---

## Contact

- LinkedIn: [linkedin.com/in/mrtravisstephenson](https://www.linkedin.com/in/mrtravisstephenson)
- Email: stephenson.tra@gmail.com
