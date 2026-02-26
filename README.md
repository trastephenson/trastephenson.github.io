# Travis Stephenson — Portfolio

**Director of Engineering Operations · AI Platform Architecture · Principal Architect**

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
