# Dark Cosmos 3D Portfolio Redesign

## Summary

Complete visual and architectural redesign of the portfolio from a "3D background + flat overlay" approach to a hybrid immersive experience where content panels exist in 3D space with synchronized CSS transform3d transitions driven by virtual scroll position. New dark cosmos aesthetic (deep black + electric cyan/teal).

## Decisions

- **Approach:** Hybrid immersive — hero is full 3D flythrough, content sections emerge organically from the 3D environment with spatial transitions
- **Palette:** Dark cosmos — `#050510` void background, `#00f0ff` cyan accent, `#00d4ff` ring near, `#0066aa` ring far
- **Content strategy:** Split into 12 scroll stops (up from 8) for cinematic pacing — each stop is a short, punchy beat
- **3D technique:** Synchronized DOM overlay with CSS transform3d — panels get `perspective`, `rotateY/X`, `translateZ`, `scale` driven frame-by-frame by scroll delta to match Three.js camera position

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-void` | `#050510` | Body/canvas background |
| `--bg-surface` | `rgba(8, 12, 28, 0.75)` | Glass panel backgrounds |
| `--text-primary` | `#f0f0f0` | Headings, primary text |
| `--text-secondary` | `rgba(180, 200, 220, 0.8)` | Body text, subtitles |
| `--accent` | `#00f0ff` | Interactive elements, hover states |
| `--accent-glow` | `rgba(0, 240, 255, 0.4)` | Glow/shadow effects |
| `--ring-near` | `#00d4ff` | Torus rings close to camera |
| `--ring-far` | `#0066aa` | Torus rings in distance |
| `--particle` | `#00b8d4` | Floating particles |
| `--danger` | `#ff3366` | Sparse emphasis accent |

## Typography

- Font family: `Inter` (unchanged)
- Hero name: `clamp(3rem, 10vw, 7rem)`, weight 900, cyan text-shadow glow
- Section titles: `clamp(1.5rem, 4vw, 2.5rem)`, weight 700, uppercase, letter-spacing 0.1em
- Body text: `1rem`, weight 400, `--text-secondary`, line-height 1.7
- Tags: `0.85rem`, weight 500, letter-spacing 0.05em

## 12 Scroll Stops

| # | Stop | Content | Transition | 3D Event |
|---|------|---------|------------|----------|
| 0 | Hero | Name + title | center-zoom | Camera inside tunnel entrance |
| 1 | Tagline | Subtitle + CTA buttons | center-zoom | Camera advances, rings pulse |
| 2 | About Intro | Photo + 2-sentence bio | slide-right | Panel slides in from right |
| 3 | Strengths | 4 bullets + "Open to" | slide-left | Panel rotates from left |
| 4 | Skills | All skill tags merged | rise-up | Tags float around content |
| 5 | Tools | All tool tags merged | rise-up | Different color zone |
| 6 | Work 1 | Seeds of Thyme + Essential Life | slide-right | Cards materialize from particles |
| 7 | Work 2 | CAMS + Safety Wallet | slide-left | Cards swap with depth |
| 8 | Work 3 | GenAI / LLM Workflows | slide-right | Single spotlight, rings glow hot |
| 9 | Testimonials | Auto-rotating slider | materialize | Calm zone, ambient drift |
| 10 | Contact | Form + contact cards | materialize | Tunnel opens up |
| 11 | Footer | Nav links + copyright | center-zoom | Particles settle |

## Transition Profiles

Each section has a transition profile driving CSS transform3d from scroll delta.

**delta = scrollCurrent - sectionCenter**: negative = approaching, zero = active, positive = passed.

| Profile | Entry (approaching) | Active | Exit (passing) |
|---------|-------------------|--------|----------------|
| center-zoom | `translateZ(-800px) scale(0.3) opacity(0)` | `translateZ(0) scale(1) opacity(1)` | `translateZ(200px) scale(1.1) opacity(0)` |
| slide-right | `translateX(100vw) rotateY(-15deg)` | `translateX(0) rotateY(0)` | `translateX(-60vw) rotateY(10deg) opacity(0)` |
| slide-left | `translateX(-100vw) rotateY(15deg)` | `translateX(0) rotateY(0)` | `translateX(60vw) rotateY(-10deg) opacity(0)` |
| rise-up | `translateY(80vh) rotateX(20deg)` | `translateY(0) rotateX(0)` | `translateY(-40vh) rotateX(-10deg) opacity(0)` |
| materialize | `scale(0) opacity(0) blur(20px)` | `scale(1) opacity(1) blur(0)` | `scale(0.8) opacity(0) translateZ(100px)` |

Perspective container: `perspective: 1200px`, `perspective-origin: 50% 50%`.

Mobile: transition amplitudes halved to reduce motion sickness.

## 3D Scene

- Background: solid `#050510`
- Torus rings: ~60 wireframe, cyan-to-deep-blue gradient along depth, emissive glow
- Particles: ~1200 points, `#00b8d4`, additive blending
- Fog: `FogExp2(0x050510, 0.03)`
- Lighting: 2 point lights (cyan near camera, deep blue ahead), ambient at 0.15
- Camera sway: 0.25 amplitude
- Section-reactive: ring pulse speed varies, light color shifts per zone

## Scroll Behavior

- Soft snap: after 800ms idle, gently nudge to nearest section center
- Touch momentum: flick gestures get momentum decay
- Keyboard: ArrowUp/Down = 1 section, PageUp/Down = 3, Home/End = start/end
- prefers-reduced-motion: damping=1 (instant), no camera sway, halved transition amplitudes

## Glass Panel Styling

```css
background: rgba(8, 12, 28, 0.75);
backdrop-filter: blur(24px) saturate(120%);
border: 1px solid rgba(0, 240, 255, 0.08);
border-radius: 20px;
box-shadow: 0 0 40px rgba(0, 240, 255, 0.05), 0 8px 32px rgba(0,0,0,0.4);
```

## File Changes

### Rewrite completely
- `src/components/three/Scene.jsx`
- `src/components/scroll/SectionWrapper.jsx`
- `src/index.css`
- `src/components/header/Header.jsx`
- `src/components/header/CTA.jsx`
- `src/components/about/About.jsx`
- `src/components/experience/Experience.jsx`
- `src/components/services/Services.jsx`
- `src/components/testimonials/Testimonials.jsx`
- `src/components/contact/Contact.jsx`
- `src/components/footer/Footer.jsx`
- `src/components/footer/footer.css`

### New files
- `src/components/about/Strengths.jsx`
- `src/components/portfolio/WorkHighlight.jsx`

### Update (minor)
- `src/App.jsx` — 12 SectionWrappers with transition props
- `src/hooks/useVirtualScroll.js` — TOTAL_SECTIONS=12, soft snap, momentum
- `src/components/nav/Nav.jsx` — 12 sections, keep 5 icon buttons
- `src/components/scroll/ScrollProgress.jsx` — 12 dots, cyan accent
- `src/components/scroll/ScreenReaderStatus.jsx` — Update section names

### Delete
- `src/components/header/HeaderSocials.jsx`
- `src/components/header/NewHeaderCard.jsx`
- `src/components/header/header.css`
- `src/components/about/about.css`
- `src/components/about/InteractiveCard.jsx`

### Unchanged
- `src/context/ScrollContext.js`
- `src/components/common/SleekButton.jsx` (restyle colors only)
- All assets
