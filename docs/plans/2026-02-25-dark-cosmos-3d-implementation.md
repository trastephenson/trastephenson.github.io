# Dark Cosmos 3D Portfolio — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio from a flat fade-in/out overlay into an immersive dark cosmos experience with 12 scroll stops, CSS transform3d spatial transitions synchronized to the Three.js camera, and a new dark cyan aesthetic.

**Architecture:** Three-layer hybrid (Three.js canvas → CSS transform3d content panels → UI overlay). Virtual scroll drives both camera Z-position and per-section CSS transform3d transitions via 5 profiles (center-zoom, slide-right, slide-left, rise-up, materialize). Content is split into 12 cinematic stops.

**Tech Stack:** React 17, Three.js (raw — no R3F due to React 17), styled-components, CSS custom properties, EmailJS.

**Design Doc:** `docs/plans/2026-02-25-dark-cosmos-3d-redesign.md`

---

## Task 1: Update Virtual Scroll Engine (12 sections + soft snap + momentum)

**Files:**
- Modify: `src/hooks/useVirtualScroll.js`

**Step 1: Update constants and add soft snap + momentum**

Replace the entire file with:

```jsx
import { useRef, useCallback, useEffect, useState } from 'react';

const SECTION_HEIGHT = 10;
const TOTAL_SECTIONS = 12;
const MAX_SCROLL = (TOTAL_SECTIONS - 1) * SECTION_HEIGHT; // 110
const WHEEL_MULTIPLIER = 0.01;
const TOUCH_MULTIPLIER = 0.05;
const DEFAULT_DAMPING = 0.08;
const REDUCED_MOTION_DAMPING = 1.0;
const KEYBOARD_SCROLL_SPEED = SECTION_HEIGHT;
const KEYBOARD_FAST_SCROLL_SPEED = SECTION_HEIGHT * 3;
const SNAP_IDLE_MS = 800;
const SNAP_STRENGTH = 0.02;
const MOMENTUM_DECAY = 0.95;
const MOMENTUM_MIN = 0.1;

export const SCROLL_CONFIG = {
  SECTION_HEIGHT,
  TOTAL_SECTIONS,
  MAX_SCROLL,
};

export default function useVirtualScroll() {
  const scrollTargetRef = useRef(0);
  const scrollCurrentRef = useRef(0);
  const lastTouchYRef = useRef(0);
  const subscribersRef = useRef(new Set());
  const rafIdRef = useRef(null);
  const lastInputTimeRef = useRef(0);
  const momentumRef = useRef(0);

  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const damping = prefersReducedMotion ? REDUCED_MOTION_DAMPING : DEFAULT_DAMPING;

  const subscribe = useCallback((callback) => {
    subscribersRef.current.add(callback);
    return () => subscribersRef.current.delete(callback);
  }, []);

  const scrollTo = useCallback((sectionIndex) => {
    scrollTargetRef.current = Math.max(
      0,
      Math.min(MAX_SCROLL, sectionIndex * SECTION_HEIGHT)
    );
    momentumRef.current = 0;
  }, []);

  const setScrollTarget = useCallback((value) => {
    scrollTargetRef.current = Math.max(0, Math.min(MAX_SCROLL, value));
  }, []);

  // Animation loop
  useEffect(() => {
    let lastSection = -1;

    function animate() {
      rafIdRef.current = requestAnimationFrame(animate);
      const now = performance.now();

      // Apply momentum decay to scrollTarget
      if (Math.abs(momentumRef.current) > MOMENTUM_MIN) {
        scrollTargetRef.current += momentumRef.current;
        scrollTargetRef.current = Math.max(0, Math.min(MAX_SCROLL, scrollTargetRef.current));
        momentumRef.current *= MOMENTUM_DECAY;
      } else {
        momentumRef.current = 0;
      }

      // Soft snap: after idle, gently nudge toward nearest section center
      const idleTime = now - lastInputTimeRef.current;
      if (idleTime > SNAP_IDLE_MS && momentumRef.current === 0) {
        const nearestSection = Math.round(scrollTargetRef.current / SECTION_HEIGHT);
        const snapTarget = Math.max(0, Math.min(MAX_SCROLL, nearestSection * SECTION_HEIGHT));
        const snapDelta = snapTarget - scrollTargetRef.current;
        if (Math.abs(snapDelta) > 0.05) {
          scrollTargetRef.current += snapDelta * SNAP_STRENGTH;
        } else {
          scrollTargetRef.current = snapTarget;
        }
      }

      // Damped interpolation
      scrollCurrentRef.current +=
        (scrollTargetRef.current - scrollCurrentRef.current) * damping;

      if (Math.abs(scrollTargetRef.current - scrollCurrentRef.current) < 0.001) {
        scrollCurrentRef.current = scrollTargetRef.current;
      }

      const newSection = Math.round(scrollCurrentRef.current / SECTION_HEIGHT);
      const clampedSection = Math.max(0, Math.min(TOTAL_SECTIONS - 1, newSection));
      if (clampedSection !== lastSection) {
        lastSection = clampedSection;
        setCurrentSection(clampedSection);
      }

      const newProgress = scrollCurrentRef.current / MAX_SCROLL;
      setProgress(newProgress);

      subscribersRef.current.forEach((cb) =>
        cb(scrollCurrentRef.current, scrollTargetRef.current)
      );
    }

    animate();
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [damping]);

  // Wheel
  useEffect(() => {
    function handleWheel(e) {
      e.preventDefault();
      lastInputTimeRef.current = performance.now();
      momentumRef.current = 0;
      scrollTargetRef.current += e.deltaY * WHEEL_MULTIPLIER;
      scrollTargetRef.current = Math.max(0, Math.min(MAX_SCROLL, scrollTargetRef.current));
    }
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Touch with momentum
  useEffect(() => {
    let lastTouchTime = 0;
    let lastDelta = 0;

    function handleTouchStart(e) {
      lastTouchYRef.current = e.touches[0].clientY;
      lastInputTimeRef.current = performance.now();
      momentumRef.current = 0;
      lastTouchTime = performance.now();
      lastDelta = 0;
    }

    function handleTouchMove(e) {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchYRef.current - touchY;
      lastInputTimeRef.current = performance.now();

      scrollTargetRef.current += deltaY * TOUCH_MULTIPLIER;
      scrollTargetRef.current = Math.max(0, Math.min(MAX_SCROLL, scrollTargetRef.current));
      lastTouchYRef.current = touchY;

      const now = performance.now();
      const dt = now - lastTouchTime;
      if (dt > 0) {
        lastDelta = (deltaY * TOUCH_MULTIPLIER) / (dt / 16);
      }
      lastTouchTime = now;
    }

    function handleTouchEnd() {
      // Apply momentum from last touch velocity
      momentumRef.current = lastDelta * 0.5;
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Keyboard
  useEffect(() => {
    function handleKeyDown(e) {
      let handled = true;
      lastInputTimeRef.current = performance.now();
      momentumRef.current = 0;

      switch (e.key) {
        case 'ArrowDown':
          scrollTargetRef.current = Math.min(MAX_SCROLL, scrollTargetRef.current + KEYBOARD_SCROLL_SPEED);
          break;
        case 'ArrowUp':
          scrollTargetRef.current = Math.max(0, scrollTargetRef.current - KEYBOARD_SCROLL_SPEED);
          break;
        case 'PageDown':
          scrollTargetRef.current = Math.min(MAX_SCROLL, scrollTargetRef.current + KEYBOARD_FAST_SCROLL_SPEED);
          break;
        case 'PageUp':
          scrollTargetRef.current = Math.max(0, scrollTargetRef.current - KEYBOARD_FAST_SCROLL_SPEED);
          break;
        case 'Home':
          scrollTargetRef.current = 0;
          break;
        case 'End':
          scrollTargetRef.current = MAX_SCROLL;
          break;
        default:
          handled = false;
          break;
      }

      if (handled) e.preventDefault();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    scrollCurrentRef,
    scrollTargetRef,
    currentSection,
    progress,
    totalSections: TOTAL_SECTIONS,
    maxScroll: MAX_SCROLL,
    scrollTo,
    setScrollTarget,
    subscribe,
  };
}
```

**Step 2: Verify**

Run: `npm start`
Expected: App loads without errors. Scroll behavior continues working with 12 total sections.

**Step 3: Commit**

```bash
git add src/hooks/useVirtualScroll.js
git commit -m "feat: update virtual scroll to 12 sections with soft snap and touch momentum"
```

---

## Task 2: Rewrite Global CSS with Dark Cosmos Tokens

**Files:**
- Rewrite: `src/index.css`

**Step 1: Replace entire file**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

:root {
  /* Dark Cosmos Palette */
  --bg-void: #050510;
  --bg-surface: rgba(8, 12, 28, 0.75);
  --text-primary: #f0f0f0;
  --text-secondary: rgba(180, 200, 220, 0.8);
  --accent: #00f0ff;
  --accent-glow: rgba(0, 240, 255, 0.4);
  --ring-near: #00d4ff;
  --ring-far: #0066aa;
  --particle: #00b8d4;
  --danger: #ff3366;

  /* Layout */
  --container-width-lg: 75%;
  --container-width-md: 86%;
  --container-width-sm: 90%;
  --transition: all 400ms ease;
}

html {
  font-size: 16px;
}

::-webkit-scrollbar {
  display: none;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  background: var(--bg-void);
  font-family: 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.7;
  color: var(--text-secondary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ============== GENERAL STYLES ============== */
.container {
  position: relative;
  width: 100%;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: var(--text-primary);
}

h1 {
  font-size: clamp(2rem, 5vw, 2.5rem);
}

section {
  margin: 0;
  padding: 0.5rem;
  background: none;
  border-radius: 0;
}

section > h2 {
  text-align: center;
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

section > h5 {
  text-align: center;
  color: var(--text-secondary);
}

.text-light {
  color: var(--text-secondary);
}

a {
  color: var(--accent);
  transition: var(--transition);
}

a:hover {
  text-decoration: underline;
  text-shadow: 0 0 8px var(--accent-glow);
}

.btn {
  width: max-content;
  display: inline-block;
  padding: 0.75rem 1.2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: var(--transition);
  color: var(--accent);
  border: 1px solid var(--accent);
}

.btn:hover {
  background-color: var(--accent);
  color: var(--bg-void);
  border-color: transparent;
  box-shadow: 0 0 20px var(--accent-glow);
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-void);
}

img {
  display: block;
  width: 100%;
  object-fit: cover;
}

/* Touch device optimization */
@media (hover: none) and (pointer: coarse) {
  .btn:hover {
    background-color: transparent;
    color: var(--accent);
    border-color: var(--accent);
  }

  .btn:active {
    background-color: var(--accent);
    color: var(--bg-void);
    border-color: transparent;
  }
}

/* ================ MEDIA QUERIES (LARGE DEVICES) ================= */
@media screen and (max-width: 1200px) {
  .container:not(.main-container) {
    width: var(--container-width-md);
  }
}

/* ================ MEDIA QUERIES (MEDIUM DEVICES) ================= */
@media screen and (max-width: 1024px) {
  .container:not(.main-container) {
    width: var(--container-width-md);
  }

  section {
    margin-top: 0;
    padding: 0.5rem;
  }

  h1 {
    font-size: clamp(1.8rem, 4vw, 2.2rem);
  }
}

/* ================ MEDIA QUERIES (SMALL DEVICES) ================= */
@media screen and (max-width: 600px) {
  .container:not(.main-container) {
    width: var(--container-width-sm);
  }

  section {
    margin-top: 0;
    padding: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  section > h2 {
    margin-bottom: 2rem;
    font-size: clamp(1.5rem, 4vw, 2rem);
  }

  h1 {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
  }

  .btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

/* ================ MEDIA QUERIES (EXTRA SMALL DEVICES) ================= */
@media screen and (max-width: 480px) {
  .container:not(.main-container) {
    width: 95%;
  }

  section {
    margin-top: 0;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  section > h2 {
    margin-bottom: 1.5rem;
    font-size: clamp(1.3rem, 3vw, 1.8rem);
  }

  h1 {
    font-size: clamp(1.3rem, 3vw, 1.8rem);
  }

  .btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
}
```

**Step 2: Verify**

Run: `npm start`
Expected: Background is deep dark (#050510), text is light, cyan accents visible.

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: rewrite global CSS with dark cosmos palette tokens"
```

---

## Task 3: Rewrite Three.js Scene (Dark Cosmos Tunnel)

**Files:**
- Rewrite: `src/components/three/Scene.jsx`

**Step 1: Replace entire file**

```jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScroll } from '../../context/ScrollContext';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const { SECTION_HEIGHT, TOTAL_SECTIONS } = SCROLL_CONFIG;

const TORUS_COUNT = 60;
const TORUS_SPACING = (TOTAL_SECTIONS * SECTION_HEIGHT) / TORUS_COUNT;
const TUNNEL_RADIUS = 6;
const TUBE_RADIUS = 0.12;
const PARTICLE_COUNT = 1200;
const PARTICLE_SPREAD = 14;

export default function Scene() {
  const containerRef = useRef(null);
  const { subscribe } = useScroll();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.setAttribute('role', 'img');
    renderer.domElement.setAttribute(
      'aria-label',
      'Interactive 3D tunnel visualization with glowing cyan rings. Use arrow keys or scroll to navigate.'
    );
    container.appendChild(renderer.domElement);

    // --- Scene ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.03);

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 5);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x0066aa, 0.15);
    scene.add(ambientLight);

    // Cyan point light near camera
    const pointLight1 = new THREE.PointLight(0x00f0ff, 1.8, 50);
    pointLight1.position.set(0, 0, 0);
    scene.add(pointLight1);

    // Deep blue point light ahead
    const pointLight2 = new THREE.PointLight(0x0066aa, 1.4, 50);
    pointLight2.position.set(0, 0, -20);
    scene.add(pointLight2);

    // --- Torus Tunnel ---
    const torusGroup = new THREE.Group();
    const toruses = [];

    for (let i = 0; i < TORUS_COUNT; i++) {
      const t = i / TORUS_COUNT;
      // Cyan-to-deep-blue gradient along depth
      const color = new THREE.Color().lerpColors(
        new THREE.Color(0x00d4ff), // ring near
        new THREE.Color(0x0066aa), // ring far
        t
      );

      const geometry = new THREE.TorusGeometry(
        TUNNEL_RADIUS,
        TUBE_RADIUS,
        16,
        48
      );
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });

      const torus = new THREE.Mesh(geometry, material);
      torus.position.z = -i * TORUS_SPACING;
      torus.rotation.x = Math.PI / 2;
      torus.rotation.y = (i % 3) * 0.15;

      toruses.push({
        mesh: torus,
        baseZ: torus.position.z,
        rotationSpeed: 0.002 + (i % 5) * 0.001,
        index: i,
      });

      torusGroup.add(torus);
    }
    scene.add(torusGroup);

    // --- Particles ---
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);
    const totalDepth = TORUS_COUNT * TORUS_SPACING + 20;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = TUNNEL_RADIUS * 0.3 + Math.random() * PARTICLE_SPREAD;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -Math.random() * totalDepth;

      // Cyan particle color with slight variation
      const col = new THREE.Color(0x00b8d4);
      const variation = 0.8 + Math.random() * 0.4;
      col.multiplyScalar(variation);
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Animation ---
    const clock = new THREE.Clock();
    let scrollValue = 0;

    const unsubscribe = subscribe((scrollCurrent) => {
      scrollValue = scrollCurrent;
    });

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Move camera along Z-axis based on scroll
      camera.position.z = 5 - scrollValue;

      // Subtle camera sway
      if (!prefersReducedMotion) {
        camera.position.x = Math.sin(elapsed * 0.3) * 0.25;
        camera.position.y = Math.cos(elapsed * 0.4) * 0.15;
      }

      // Move lights with camera
      pointLight1.position.z = camera.position.z;
      pointLight2.position.z = camera.position.z - 15;

      // Section-reactive: shift light color per zone
      const scrollProgress = scrollValue / SCROLL_CONFIG.MAX_SCROLL;
      const hueShift = scrollProgress * 0.08;
      // Cyan base (hue ~0.52) with subtle shift
      pointLight1.color.setHSL(0.52 + hueShift, 0.9, 0.55);
      pointLight2.color.setHSL(0.58 + hueShift, 0.8, 0.4);

      // Animate toruses
      if (!prefersReducedMotion) {
        toruses.forEach((obj) => {
          obj.mesh.rotation.z += obj.rotationSpeed;

          const dist = Math.abs(obj.mesh.position.z - camera.position.z);
          // Ring pulse: rings near camera glow brighter
          const opacity = dist < 2 ? 0.9 : Math.max(0.15, 0.9 - dist * 0.015);
          obj.mesh.material.opacity = opacity;

          // Emissive intensity varies with proximity
          obj.mesh.material.emissiveIntensity = dist < 3 ? 0.7 : Math.max(0.2, 0.7 - dist * 0.01);

          const scale = dist < 3 ? 1.0 : Math.max(0.6, 1.0 - dist * 0.008);
          obj.mesh.scale.setScalar(scale);
        });
      }

      renderer.render(scene, camera);
    }

    animate();

    // --- Resize ---
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();

      toruses.forEach((obj) => {
        obj.mesh.geometry.dispose();
        obj.mesh.material.dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [subscribe]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
```

**Step 2: Verify**

Run: `npm start`
Expected: Dark background with cyan wireframe torus rings and cyan particles visible. Scrolling moves camera through tunnel.

**Step 3: Commit**

```bash
git add src/components/three/Scene.jsx
git commit -m "feat: rewrite 3D scene with dark cosmos cyan tunnel and particles"
```

---

## Task 4: Rewrite SectionWrapper with 5 Transition Profiles

**Files:**
- Rewrite: `src/components/scroll/SectionWrapper.jsx`

**Step 1: Replace entire file**

This is the core of the "3D feel" — each section has a `transition` prop that drives CSS transform3d based on scroll delta.

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useScroll } from '../../context/ScrollContext';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const { SECTION_HEIGHT } = SCROLL_CONFIG;

const PerspectiveContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  will-change: transform, opacity;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 240, 255, 0.2);
    border-radius: 2px;
  }
`;

const GlassPanel = styled.div`
  width: 90%;
  max-width: 1200px;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--bg-surface, rgba(8, 12, 28, 0.75));
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 20px;
  padding: clamp(1.5rem, 4vw, 3rem);
  box-shadow:
    0 0 40px rgba(0, 240, 255, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.4);

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 240, 255, 0.2);
    border-radius: 2px;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
    max-height: 80vh;
    border-radius: 16px;
    padding: 1.2rem;
  }
`;

const SECTION_NAMES = [
  'Hero',
  'Tagline',
  'About',
  'Strengths',
  'Skills',
  'Tools',
  'Work — Mobile Apps',
  'Work — Platforms',
  'Work — AI',
  'Testimonials',
  'Contact',
  'Footer',
];

// Transition profiles: compute CSS transform string from normalized delta
// delta: -1 = fully approaching, 0 = active center, +1 = fully passed
const MOBILE_AMPLITUDE = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.5 : 1;

function getTransitionStyle(profile, delta, amplitude) {
  const a = amplitude;
  const absDelta = Math.abs(delta);
  const opacity = Math.max(0, 1 - absDelta * 1.5);

  if (absDelta > 0.95) {
    return { opacity: 0, transform: 'translateZ(-800px) scale(0.3)', filter: 'blur(0px)' };
  }

  switch (profile) {
    case 'center-zoom': {
      const tz = delta < 0
        ? THREE_LERP(-800 * a, 0, 1 - absDelta)
        : THREE_LERP(0, 200 * a, absDelta);
      const sc = delta < 0
        ? THREE_LERP(0.3, 1, 1 - absDelta)
        : THREE_LERP(1, 1.1, absDelta);
      return {
        opacity,
        transform: `translateZ(${tz}px) scale(${sc})`,
        filter: 'blur(0px)',
      };
    }
    case 'slide-right': {
      const tx = delta < 0
        ? THREE_LERP(100 * a, 0, 1 - absDelta)
        : THREE_LERP(0, -60 * a, absDelta);
      const ry = delta < 0
        ? THREE_LERP(-15 * a, 0, 1 - absDelta)
        : THREE_LERP(0, 10 * a, absDelta);
      return {
        opacity,
        transform: `translateX(${tx}vw) rotateY(${ry}deg)`,
        filter: 'blur(0px)',
      };
    }
    case 'slide-left': {
      const tx = delta < 0
        ? THREE_LERP(-100 * a, 0, 1 - absDelta)
        : THREE_LERP(0, 60 * a, absDelta);
      const ry = delta < 0
        ? THREE_LERP(15 * a, 0, 1 - absDelta)
        : THREE_LERP(0, -10 * a, absDelta);
      return {
        opacity,
        transform: `translateX(${tx}vw) rotateY(${ry}deg)`,
        filter: 'blur(0px)',
      };
    }
    case 'rise-up': {
      const ty = delta < 0
        ? THREE_LERP(80 * a, 0, 1 - absDelta)
        : THREE_LERP(0, -40 * a, absDelta);
      const rx = delta < 0
        ? THREE_LERP(20 * a, 0, 1 - absDelta)
        : THREE_LERP(0, -10 * a, absDelta);
      return {
        opacity,
        transform: `translateY(${ty}vh) rotateX(${rx}deg)`,
        filter: 'blur(0px)',
      };
    }
    case 'materialize': {
      const sc = THREE_LERP(0, 1, 1 - absDelta);
      const blur = absDelta * 20;
      const tz = delta > 0 ? absDelta * 100 * a : 0;
      return {
        opacity: Math.max(0, 1 - absDelta * 2),
        transform: `scale(${sc}) translateZ(${tz}px)`,
        filter: `blur(${blur}px)`,
      };
    }
    default:
      return { opacity, transform: 'none', filter: 'blur(0px)' };
  }
}

function THREE_LERP(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export default function SectionWrapper({ sectionIndex, children, noPanel, transition = 'center-zoom' }) {
  const { subscribe } = useScroll();
  const [style, setStyle] = useState({ opacity: 0, transform: 'translateZ(-800px) scale(0.3)', filter: 'blur(0px)' });
  const [isActive, setIsActive] = useState(false);

  const amplitude = useMemo(() => MOBILE_AMPLITUDE, []);

  useEffect(() => {
    const unsubscribe = subscribe((scrollCurrent) => {
      const sectionCenter = sectionIndex * SECTION_HEIGHT;
      const rawDelta = scrollCurrent - sectionCenter;
      const halfRange = SECTION_HEIGHT * 0.7;

      // Normalize delta to -1..+1 range
      const delta = Math.max(-1, Math.min(1, rawDelta / halfRange));
      const absDelta = Math.abs(delta);

      if (absDelta < 1) {
        const transitionStyle = getTransitionStyle(transition, delta, amplitude);
        setStyle(transitionStyle);
        setIsActive(transitionStyle.opacity > 0.2);
      } else {
        setStyle({ opacity: 0, transform: 'translateZ(-800px) scale(0.3)', filter: 'blur(0px)' });
        setIsActive(false);
      }
    });

    return unsubscribe;
  }, [sectionIndex, subscribe, transition, amplitude]);

  return (
    <PerspectiveContainer
      style={{
        ...style,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      aria-hidden={!isActive}
      role="region"
      aria-label={SECTION_NAMES[sectionIndex] || `Section ${sectionIndex + 1}`}
    >
      {noPanel ? children : <GlassPanel>{children}</GlassPanel>}
    </PerspectiveContainer>
  );
}
```

**Step 2: Verify**

Run: `npm start`
Expected: Scrolling through sections shows directional 3D transitions — panels slide from sides, zoom in/out of depth, and materialize with blur.

**Step 3: Commit**

```bash
git add src/components/scroll/SectionWrapper.jsx
git commit -m "feat: rewrite SectionWrapper with 5 CSS transform3d transition profiles"
```

---

## Task 5: Rewrite Header (Stop 0 — Hero)

**Files:**
- Rewrite: `src/components/header/Header.jsx`

The hero stop is just the name and title, centered large, with cyan glow. No glass panel (noPanel).

**Step 1: Replace entire file**

```jsx
import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const HeroName = styled.h1`
  color: var(--text-primary);
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 900;
  font-family: 'Inter', sans-serif;
  text-shadow:
    0 0 30px var(--accent-glow),
    0 0 60px rgba(0, 240, 255, 0.3),
    0 0 90px rgba(0, 240, 255, 0.15);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.1;
  margin: 0;
`;

const HeroTitle = styled.h2`
  color: var(--text-secondary);
  font-size: clamp(1rem, 3vw, 1.4rem);
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 1rem;
  opacity: 0.9;
`;

const Header = () => {
  return (
    <HeroContainer>
      <HeroName>Travis Stephenson</HeroName>
      <HeroTitle>Principal Solutions Architect</HeroTitle>
    </HeroContainer>
  );
};

export default Header;
```

**Step 2: Commit**

```bash
git add src/components/header/Header.jsx
git commit -m "feat: rewrite Header as minimal hero (stop 0) with dark cosmos styling"
```

---

## Task 6: Rewrite CTA (Stop 1 — Tagline)

**Files:**
- Rewrite: `src/components/header/CTA.jsx`

Stop 1 shows the subtitle text and 3 CTA buttons.

**Step 1: Replace entire file**

```jsx
import React from 'react';
import styled from 'styled-components';
import CV from '../../assets/cv.pdf';
import SleekButton from '../common/SleekButton';
import { FaLinkedinIn } from 'react-icons/fa';
import { useScroll } from '../../context/ScrollContext';

const TaglineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
  max-width: 600px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const CTA = () => {
  const { scrollTo } = useScroll();

  return (
    <TaglineContainer>
      <Subtitle>
        Technical Product &amp; Platform Leader | AI Engineering (MS)
        <br />
        Cloud-native platforms &bull; AI-enabled automation &bull; Client-facing architecture &amp; delivery ownership
      </Subtitle>

      <ButtonRow>
        <SleekButton>
          <a href={CV} download style={{ color: 'inherit', textDecoration: 'none' }}>
            Download Resume
          </a>
        </SleekButton>

        <SleekButton>
          <a
            href="https://www.linkedin.com/in/trastephenson/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FaLinkedinIn style={{ fontSize: '1.2em' }} />
            LinkedIn
          </a>
        </SleekButton>

        <SleekButton>
          <button
            onClick={(e) => { e.preventDefault(); scrollTo(10); }}
            style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Let's Talk
          </button>
        </SleekButton>
      </ButtonRow>
    </TaglineContainer>
  );
};

export default CTA;
```

**Step 2: Commit**

```bash
git add src/components/header/CTA.jsx
git commit -m "feat: rewrite CTA as tagline stop with subtitle and 3 CTA buttons"
```

---

## Task 7: Rewrite About (Stop 2 — Photo + Short Bio)

**Files:**
- Rewrite: `src/components/about/About.jsx`

Stop 2 is condensed: just the photo and a 2-sentence bio.

**Step 1: Replace entire file**

```jsx
import React from 'react';
import styled from 'styled-components';
import ME from '../../assets/me-about.png';

const AboutGrid = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PhotoWrapper = styled.div`
  flex-shrink: 0;
  width: clamp(120px, 20vw, 200px);
  height: clamp(120px, 20vw, 200px);
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 240, 255, 0.15);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BioText = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;

  p {
    margin-bottom: 0.75rem;
  }

  strong {
    color: var(--text-primary);
  }
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const About = () => {
  return (
    <section>
      <SectionTitle>About Me</SectionTitle>
      <AboutGrid>
        <PhotoWrapper>
          <img src={ME} alt="Travis Stephenson" />
        </PhotoWrapper>
        <BioText>
          <p>
            I'm a <strong>Principal-level Solutions Architect</strong> and Technical Product Leader with 10+ years of experience delivering cloud-scale platforms across mobile, backend, and AI-enabled systems.
          </p>
          <p>
            My work bridges solution architecture, product strategy, and delivery governance — helping organizations translate complex business goals into scalable, production-ready systems.
          </p>
        </BioText>
      </AboutGrid>
    </section>
  );
};

export default About;
```

**Step 2: Commit**

```bash
git add src/components/about/About.jsx
git commit -m "feat: rewrite About as condensed photo + bio (stop 2)"
```

---

## Task 8: Create Strengths Component (Stop 3)

**Files:**
- Create: `src/components/about/Strengths.jsx`

Stop 3 shows the "What I do best" bullets and "Open to" line.

**Step 1: Create the file**

```jsx
import React from 'react';
import styled from 'styled-components';

const StrengthsContainer = styled.section`
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

const BulletList = styled.ul`
  text-align: left;
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-secondary);
  line-height: 2;
  font-size: 1rem;

  li {
    padding-left: 0.5rem;
    position: relative;

    &::before {
      content: '\\25B8';
      color: var(--accent);
      position: absolute;
      left: -1rem;
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    line-height: 1.8;
  }
`;

const OpenTo = styled.p`
  color: var(--text-secondary);
  margin-top: 1.5rem;
  font-size: 0.95rem;

  strong {
    color: var(--accent);
  }
`;

const Strengths = () => {
  return (
    <StrengthsContainer>
      <SectionTitle>What I Do Best</SectionTitle>
      <BulletList>
        <li>Own solution architecture from discovery through delivery and production readiness</li>
        <li>Define cloud standards across AWS/Azure (APIs, data models, reliability practices)</li>
        <li>Lead cross-functional execution across engineering, product, design, and QA</li>
        <li>Integrate GenAI/LLM workflows for automation, search, summarization, and decision support</li>
      </BulletList>
      <OpenTo>
        <strong>Open to:</strong> Principal Solutions Architect and Director / Principal Technical Product roles (platform-scale and AI-enabled systems)
      </OpenTo>
    </StrengthsContainer>
  );
};

export default Strengths;
```

**Step 2: Commit**

```bash
git add src/components/about/Strengths.jsx
git commit -m "feat: create Strengths component for stop 3"
```

---

## Task 9: Rewrite Experience (Stop 4 — All Skills Merged)

**Files:**
- Modify: `src/components/experience/Experience.jsx`

Stop 4 merges all skill tags into a single flat tag cloud.

**Step 1: Replace entire file**

```jsx
import React from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.section`
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Tag = styled.span`
  display: inline-block;
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  background: rgba(0, 240, 255, 0.06);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  border: 1px solid rgba(0, 240, 255, 0.12);
  cursor: default;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: rgba(0, 240, 255, 0.15);
    border-color: rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const ALL_SKILLS = [
  // Frontend
  'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js',
  'Vue.js', 'Angular', 'Tailwind CSS', 'Sass', 'Bootstrap', 'Ruby on Rails',
  // Backend
  'Node.js', 'Python', 'PHP', 'Elixir', 'Express.js',
  'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'GraphQL', 'Docker', 'AWS',
  // Architecture
  'System Design', 'Microservices', 'API Design', 'Cloud Architecture',
  'Database Design', 'Security Architecture', 'Scalability Planning',
  'Integration Patterns', 'DevOps Practices', 'Performance Optimization',
  'Data Modeling', 'Enterprise Architecture',
  // Certifications
  'CompTIA Project+', 'ITIL Foundations', 'Lean Six Sigma Yellow Belt',
  'AWS Cloud Practitioner', 'PMP Certification',
];

const Experience = () => {
  return (
    <SkillsContainer>
      <SectionTitle>Skills</SectionTitle>
      <TagCloud>
        {ALL_SKILLS.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </TagCloud>
    </SkillsContainer>
  );
};

export default Experience;
```

**Step 2: Commit**

```bash
git add src/components/experience/Experience.jsx
git commit -m "feat: rewrite Experience as merged skills tag cloud (stop 4)"
```

---

## Task 10: Rewrite Services (Stop 5 — All Tools Merged)

**Files:**
- Modify: `src/components/services/Services.jsx`

Stop 5 shows all tool tags merged with a slightly different color zone.

**Step 1: Replace entire file**

```jsx
import React from 'react';
import styled from 'styled-components';

const ToolsContainer = styled.section`
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Tag = styled.span`
  display: inline-block;
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  background: rgba(0, 180, 212, 0.08);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  border: 1px solid rgba(0, 180, 212, 0.15);
  cursor: default;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: rgba(0, 180, 212, 0.2);
    border-color: rgba(0, 180, 212, 0.35);
    box-shadow: 0 0 15px rgba(0, 180, 212, 0.2);
    transform: translateY(-2px);
  }
`;

const ALL_TOOLS = [
  // UI/UX
  'Figma', 'Adobe XD', 'Blender', 'Adalo', 'Sketch', 'InVision',
  'Adobe Creative Suite', 'Prototyping', 'Wireframing', 'User Research',
  // Dev Tools
  'AWS', 'Azure', 'GitHub/GitLab', 'Docker', 'Kubernetes', 'Jenkins',
  'Terraform', 'Ansible', 'Vagrant', 'VSCode', 'IntelliJ', 'Postman',
  // PM Tools
  'Jira', 'DevOps', 'Lean Six Sigma', 'OpenProject', 'Confluence',
  'Trello', 'Asana', 'Monday.com', 'Slack', 'Microsoft Teams',
];

const Services = () => {
  return (
    <ToolsContainer>
      <SectionTitle>Tools</SectionTitle>
      <TagCloud>
        {ALL_TOOLS.map((tool) => (
          <Tag key={tool}>{tool}</Tag>
        ))}
      </TagCloud>
    </ToolsContainer>
  );
};

export default Services;
```

**Step 2: Commit**

```bash
git add src/components/services/Services.jsx
git commit -m "feat: rewrite Services as merged tools tag cloud (stop 5)"
```

---

## Task 11: Create WorkHighlight + Rewrite Portfolio (Stops 6-8)

**Files:**
- Create: `src/components/portfolio/WorkHighlight.jsx`
- Rewrite: `src/components/portfolio/Portfolio.jsx`

The design splits 5 portfolio items across 3 stops:
- Stop 6: Seeds of Thyme + Essential Life (mobile apps)
- Stop 7: CAMS + Safety Wallet (platforms)
- Stop 8: GenAI / LLM Workflows (AI spotlight)

WorkHighlight is a reusable card component. Portfolio.jsx exports 3 components (Work1, Work2, Work3).

**Step 1: Create WorkHighlight**

```jsx
import React from 'react';
import styled from 'styled-components';
import SleekButton from '../common/SleekButton';
import { useScroll } from '../../context/ScrollContext';

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  width: 100%;
`;

const Card = styled.div`
  flex: 1 1 280px;
  max-width: 480px;
  background: rgba(0, 240, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 240, 255, 0.2);
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.08);
    transform: translateY(-4px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }

  @media screen and (max-width: 600px) {
    height: 140px;
  }
`;

const CardBody = styled.div`
  padding: 1.2rem;
`;

const CardTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CardSummary = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const WorkLink = ({ url, children }) => {
  const { scrollTo } = useScroll();

  if (url === '#contact') {
    return (
      <button
        onClick={() => scrollTo(10)}
        style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
      {children}
    </a>
  );
};

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const WorkHighlight = ({ title, items }) => {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <CardGrid>
        {items.map((item) => (
          <Card key={item.id}>
            <CardImage>
              <img src={item.image} alt={item.title} />
            </CardImage>
            <CardBody>
              <CardTitle>{item.title}</CardTitle>
              <CardSummary>{item.summary}</CardSummary>
              <ButtonRow>
                <WorkLink url={item.primaryUrl}>
                  <SleekButton>{item.primaryCta}</SleekButton>
                </WorkLink>
                <WorkLink url={item.secondaryUrl}>
                  <SleekButton>{item.secondaryCta}</SleekButton>
                </WorkLink>
              </ButtonRow>
            </CardBody>
          </Card>
        ))}
      </CardGrid>
    </section>
  );
};

export default WorkHighlight;
```

**Step 2: Rewrite Portfolio.jsx to export Work1, Work2, Work3**

```jsx
import React from 'react';
import WorkHighlight from './WorkHighlight';
import IMG1 from '../../assets/sot.png';
import IMG2 from '../../assets/portfolio3.gif';
import IMG3 from '../../assets/CAMS.png';
import IMG4 from '../../assets/Safety.png';
import IMG5 from '../../assets/portfolio5.png';

const mobileApps = [
  {
    id: 1,
    image: IMG1,
    title: 'Seeds of Thyme',
    summary: 'Mobile app with UX/UI ownership — shipped to production on iOS.',
    primaryCta: 'Product Site',
    primaryUrl: 'https://www.seedsofthyme.com/pages/app-seedsofthyme',
    secondaryCta: 'App Store',
    secondaryUrl: 'https://apps.apple.com/us/app/seeds-of-thyme/id6450909951',
  },
  {
    id: 2,
    image: IMG2,
    title: 'The Essential Life App',
    summary: 'Scalable Flutter platform delivery and modernization for production customer experience.',
    primaryCta: 'Product Site',
    primaryUrl: 'https://www.oillife.com/pages/essential-life-app',
    secondaryCta: 'App Store',
    secondaryUrl: 'https://apps.apple.com/us/app/the-essential-life-oil-guide/id1434661865',
  },
];

const platforms = [
  {
    id: 3,
    image: IMG3,
    title: 'CAMS ATM Management',
    summary: 'Operational platform with reliable workflows and scalable delivery.',
    primaryCta: 'Company Site',
    primaryUrl: 'https://camscompanion.com/',
    secondaryCta: 'Learn More',
    secondaryUrl: 'https://camscompanion.com/',
  },
  {
    id: 4,
    image: IMG4,
    title: 'Safety Wallet',
    summary: 'App delivery with reliable workflows and document generation capabilities.',
    primaryCta: 'Company Site',
    primaryUrl: 'https://safetywallet.org/',
    secondaryCta: 'Contact Me',
    secondaryUrl: '#contact',
  },
];

const aiWork = [
  {
    id: 5,
    image: IMG5,
    title: 'GenAI / LLM Workflows',
    summary: 'AI-enabled workflows for faster insight extraction and decision support using OpenAI, Gemini, and DeepSeek.',
    primaryCta: "Let's Talk",
    primaryUrl: '#contact',
    secondaryCta: 'LinkedIn',
    secondaryUrl: 'https://www.linkedin.com/in/trastephenson/',
  },
];

export const Work1 = () => <WorkHighlight title="Featured Work — Mobile Apps" items={mobileApps} />;
export const Work2 = () => <WorkHighlight title="Featured Work — Platforms" items={platforms} />;
export const Work3 = () => <WorkHighlight title="Featured Work — AI" items={aiWork} />;

// Default export for backwards compat
const Portfolio = Work1;
export default Portfolio;
```

**Step 3: Commit**

```bash
git add src/components/portfolio/WorkHighlight.jsx src/components/portfolio/Portfolio.jsx
git commit -m "feat: create WorkHighlight card and split portfolio across 3 stops (6-8)"
```

---

## Task 12: Rewrite Testimonials (Stop 9)

**Files:**
- Rewrite: `src/components/testimonials/Testimonials.jsx`

Keep auto-rotating slider, but restyle for dark cosmos.

**Step 1: Replace entire file**

```jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MAGESH from '../../assets/magesh.jpg';
import BERT from '../../assets/bert.jpg';
import ARYAN from '../../assets/aryan.jpg';
import SAM from '../../assets/sam.jpg';
import ANIRBAN from '../../assets/anirban.jpg';

const TestimonialsContainer = styled.section`
  text-align: center;
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  overflow: hidden;
`;

const Slide = styled.div`
  opacity: ${props => props.$active ? 1 : 0};
  transform: ${props => props.$active ? 'scale(1) translateX(0)' : 'scale(0.95) translateX(20px)'};
  transition: all 0.6s ease;
  position: ${props => props.$active ? 'relative' : 'absolute'};
  top: 0;
  left: 0;
  width: 100%;
`;

const TestimonialCard = styled.div`
  background: rgba(8, 12, 28, 0.6);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  text-align: left;

  @media (max-width: 600px) {
    padding: 1.2rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 240, 255, 0.15);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.p`
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
`;

const JobTitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 0.15rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.15rem;
  color: var(--accent);
  margin-bottom: 0.25rem;

  svg {
    width: 0.9rem;
    height: 0.9rem;
  }
`;

const ReviewText = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  max-height: 160px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 240, 255, 0.15);
    border-radius: 2px;
  }
`;

const DotRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const DotButton = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${props => props.$active ? 'var(--accent)' : 'rgba(0, 240, 255, 0.2)'};
  box-shadow: ${props => props.$active ? '0 0 8px var(--accent-glow)' : 'none'};
  transition: all 0.3s ease;
  padding: 0;
`;

const data = [
  {
    avatar: MAGESH,
    name: 'Magesh',
    jobTitle: 'QA Lead at Fidelity',
    review: '"I\'ve had a pleasure of working with Travis and can confidently say they are a highly skilled, dedicated professional. Their ability to manage projects efficiently, communicate effectively, and solve problems proactively sets them apart."',
    rating: 5,
  },
  {
    avatar: BERT,
    name: 'Bert Curtis',
    jobTitle: 'Senior SDET',
    review: '"It has been a pleasure to see Travis as he develops his full stack software development skills. He consistently demonstrates a passion for learning and problem-solving, with a strong grasp of both front-end and back-end technologies."',
    rating: 5,
  },
  {
    avatar: ARYAN,
    name: 'Aryan Basak',
    jobTitle: 'Project Manager @ Utah Tech Labs',
    review: '"Travis excels at managing complex projects with a keen eye for detail and a strong commitment to Agile principles. His ability to foster collaboration within the team and drive projects to successful completion is truly impressive."',
    rating: 5,
  },
  {
    avatar: SAM,
    name: 'Sammuel Syphrett',
    jobTitle: 'Concrete Paving Estimator',
    review: '"As a supervisor, Travis has consistently demonstrated exceptional leadership and humility. His ability to explain complex concepts clearly and effectively makes him an invaluable asset to any team."',
    rating: 5,
  },
  {
    avatar: ANIRBAN,
    name: 'Anirban Dutta',
    jobTitle: 'Python Data Engineer',
    review: '"Travis is a well organised Project Manager who has lots of experience in handling clients. He is a great team player and always keeps the team spirit high."',
    rating: 5,
  },
];

const renderStars = (count) =>
  Array.from({ length: count }, (_, i) => (
    <svg key={i} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TestimonialsContainer>
      <SectionTitle>Recommendations</SectionTitle>
      <SliderWrapper>
        {data.map((item, index) => (
          <Slide key={index} $active={activeIndex === index}>
            <TestimonialCard>
              <CardHeader>
                <Avatar>
                  <img src={item.avatar} alt={item.name} />
                </Avatar>
                <div>
                  <Stars>{renderStars(item.rating)}</Stars>
                  <Name>{item.name}</Name>
                  <JobTitle>{item.jobTitle}</JobTitle>
                </div>
              </CardHeader>
              <ReviewText>{item.review}</ReviewText>
            </TestimonialCard>
          </Slide>
        ))}
      </SliderWrapper>
      <DotRow>
        {data.map((_, i) => (
          <DotButton
            key={i}
            $active={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            aria-label={`View testimonial ${i + 1}`}
          />
        ))}
      </DotRow>
    </TestimonialsContainer>
  );
};

export default Testimonials;
```

**Step 2: Commit**

```bash
git add src/components/testimonials/Testimonials.jsx
git commit -m "feat: rewrite Testimonials with custom dark cosmos slider (stop 9)"
```

---

## Task 13: Rewrite Contact (Stop 10)

**Files:**
- Rewrite: `src/components/contact/Contact.jsx`

Keep form + contact cards but restyle for dark cosmos.

**Step 1: Replace entire file**

```jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdOutlineEmail } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import SleekButton from '../common/SleekButton';

const ContactSection = styled.section`
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContactOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactCard = styled.article`
  background: rgba(0, 240, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 240, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.06);
  }

  svg {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  h4 {
    color: var(--text-primary);
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  h5 {
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 400;
    margin-bottom: 0.75rem;
  }
`;

const FormWrapper = styled.div`
  background: rgba(8, 12, 28, 0.5);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
`;

const FormTitle = styled.p`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

const FormField = styled.div`
  background: rgba(0, 240, 255, 0.03);
  border-radius: 10px;
  padding: 0.6rem;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;

  &:focus-within {
    background: rgba(0, 240, 255, 0.06);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.08);
  }
`;

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const TextArea = styled.textarea`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  resize: vertical;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    emailjs.init('NDbWMvRzAqmh3g5Dj');
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_77o3efy', 'template_1kwjnyx', form.current, 'NDbWMvRzAqmh3g5Dj')
      .then(() => {
        alert('Message sent successfully!');
        e.target.reset();
      }, () => {
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <ContactSection>
      <SectionTitle>Contact Me</SectionTitle>
      <Subtitle>
        Open to Principal Solutions Architect and Director / Principal Technical Product roles — especially platform and AI-enabled products.
      </Subtitle>

      <Grid>
        <ContactOptions>
          <ContactCard>
            <MdOutlineEmail />
            <h4>Email</h4>
            <h5>stephenson.tra@gmail.com</h5>
            <a href="mailto:stephenson.tra@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              <SleekButton>Send a message</SleekButton>
            </a>
          </ContactCard>

          <ContactCard>
            <RiMessengerLine />
            <h4>Messenger</h4>
            <h5>Travis Stephenson</h5>
            <a href="https://m.me/travis.stephenson.9887" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              <SleekButton>Send a message</SleekButton>
            </a>
          </ContactCard>

          <ContactCard>
            <FaLinkedinIn />
            <h4>LinkedIn</h4>
            <h5>Connect on LinkedIn</h5>
            <a
              href="https://www.linkedin.com/in/trastephenson/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <SleekButton>Message me</SleekButton>
            </a>
          </ContactCard>
        </ContactOptions>

        <FormWrapper>
          <form ref={form} onSubmit={sendEmail}>
            <FormTitle>Get In Touch</FormTitle>
            <FormField>
              <Input required placeholder="Name" type="text" name="name" />
            </FormField>
            <FormField>
              <Input required placeholder="Email" type="email" name="email" />
            </FormField>
            <FormField>
              <Input required placeholder="Subject" type="text" name="subject" />
            </FormField>
            <FormField>
              <TextArea required placeholder="Message" cols="30" rows="3" name="message" />
            </FormField>
            <SleekButton type="submit">Send Message</SleekButton>
          </form>
        </FormWrapper>
      </Grid>
    </ContactSection>
  );
};

export default Contact;
```

**Step 2: Commit**

```bash
git add src/components/contact/Contact.jsx
git commit -m "feat: rewrite Contact with dark cosmos styling (stop 10)"
```

---

## Task 14: Rewrite Footer + footer.css (Stop 11)

**Files:**
- Rewrite: `src/components/footer/Footer.jsx`
- Rewrite: `src/components/footer/footer.css`

Minimal footer — nav links + copyright. No heavy effects.

**Step 1: Replace Footer.jsx**

```jsx
import React from 'react';
import styled from 'styled-components';
import { FaLinkedinIn } from 'react-icons/fa';
import { useScroll } from '../../context/ScrollContext';

const FOOTER_LINKS = [
  { label: 'Home', sectionIndex: 0 },
  { label: 'About', sectionIndex: 2 },
  { label: 'Skills', sectionIndex: 4 },
  { label: 'Work', sectionIndex: 6 },
  { label: 'Testimonials', sectionIndex: 9 },
  { label: 'Contact', sectionIndex: 10 },
];

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  width: 100%;
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  display: inline-block;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px var(--accent-glow);

  &:hover {
    text-shadow: 0 0 20px var(--accent-glow);
    transform: translateY(-2px);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto 1rem;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    color: var(--accent);
    text-shadow: 0 0 8px var(--accent-glow);
  }
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  a {
    background: rgba(0, 240, 255, 0.06);
    color: var(--text-primary);
    padding: 0.6rem;
    border-radius: 0.5rem;
    display: flex;
    border: 1px solid rgba(0, 240, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 240, 255, 0.15);
      border-color: rgba(0, 240, 255, 0.3);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
      transform: translateY(-2px);
    }
  }
`;

const Copyright = styled.small`
  color: var(--text-secondary);
  opacity: 0.6;
  font-size: 0.8rem;
`;

const Footer = () => {
  const { scrollTo } = useScroll();

  return (
    <FooterContainer>
      <LogoButton onClick={() => scrollTo(0)}>
        Travis Stephenson
      </LogoButton>

      <NavLinks>
        {FOOTER_LINKS.map(({ label, sectionIndex }) => (
          <li key={label}>
            <NavButton onClick={() => scrollTo(sectionIndex)}>
              {label}
            </NavButton>
          </li>
        ))}
      </NavLinks>

      <Socials>
        <a href="https://www.linkedin.com/in/trastephenson/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      </Socials>

      <Copyright>&copy; Travis Stephenson. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
```

**Step 2: Replace footer.css with empty file (all styles moved to styled-components)**

```css
/* Footer styles are now in styled-components within Footer.jsx */
```

**Step 3: Commit**

```bash
git add src/components/footer/Footer.jsx src/components/footer/footer.css
git commit -m "feat: rewrite Footer with dark cosmos styled-components (stop 11)"
```

---

## Task 15: Wire Up App.jsx with 12 Sections + Transition Props

**Files:**
- Rewrite: `src/App.jsx`

**Step 1: Replace entire file**

```jsx
import React from 'react'
import { ScrollProvider } from './context/ScrollContext'
import Scene from './components/three/Scene'
import SectionWrapper from './components/scroll/SectionWrapper'
import ScrollProgress from './components/scroll/ScrollProgress'
import ScreenReaderStatus from './components/scroll/ScreenReaderStatus'
import Header from './components/header/Header'
import CTA from './components/header/CTA'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Strengths from './components/about/Strengths'
import Experience from './components/experience/Experience'
import Services from './components/services/Services'
import { Work1, Work2, Work3 } from './components/portfolio/Portfolio'
import Testimonials from './components/testimonials/Testimonials'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <ScrollProvider>
      {/* Layer 1: 3D Background */}
      <Scene />

      {/* Layer 2: Content Sections (12 stops) */}
      <SectionWrapper sectionIndex={0} transition="center-zoom" noPanel>
        <Header />
      </SectionWrapper>
      <SectionWrapper sectionIndex={1} transition="center-zoom">
        <CTA />
      </SectionWrapper>
      <SectionWrapper sectionIndex={2} transition="slide-right">
        <About />
      </SectionWrapper>
      <SectionWrapper sectionIndex={3} transition="slide-left">
        <Strengths />
      </SectionWrapper>
      <SectionWrapper sectionIndex={4} transition="rise-up">
        <Experience />
      </SectionWrapper>
      <SectionWrapper sectionIndex={5} transition="rise-up">
        <Services />
      </SectionWrapper>
      <SectionWrapper sectionIndex={6} transition="slide-right">
        <Work1 />
      </SectionWrapper>
      <SectionWrapper sectionIndex={7} transition="slide-left">
        <Work2 />
      </SectionWrapper>
      <SectionWrapper sectionIndex={8} transition="slide-right">
        <Work3 />
      </SectionWrapper>
      <SectionWrapper sectionIndex={9} transition="materialize">
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper sectionIndex={10} transition="materialize">
        <Contact />
      </SectionWrapper>
      <SectionWrapper sectionIndex={11} transition="center-zoom">
        <Footer />
      </SectionWrapper>

      {/* Layer 3: UI Overlay */}
      <Nav />
      <ScrollProgress />
      <ScreenReaderStatus />
    </ScrollProvider>
  )
}

export default App
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire App.jsx with 12 section stops and transition profiles"
```

---

## Task 16: Update Nav for 12 Sections

**Files:**
- Modify: `src/components/nav/Nav.jsx`

Keep 5 icon buttons, update section indices for new 12-stop layout.

**Step 1: Update NAV_ITEMS indices and restyle for dark cosmos**

Update the `NAV_ITEMS` array and styled-component colors:

- Home → 0
- About → 2
- Experience → 4
- Tools → 5 (was 3)
- Contact → 10 (was 6)

Restyle: replace white-based glows with cyan accent.

```jsx
import React from 'react'
import styled from 'styled-components'
import {ImHome} from 'react-icons/im'
import {ImProfile} from 'react-icons/im'
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'
import {FaToolbox} from 'react-icons/fa'
import {BiMessageSquareDetail} from 'react-icons/bi'
import { useScroll } from '../../context/ScrollContext'

const StyledNav = styled.nav`
  background: rgba(5, 5, 16, 0.6);
  width: max-content;
  display: flex;
  padding: 0.7rem 1.7rem;
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2rem;
  gap: 0.8rem;
  border-radius: 3rem;
  backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid rgba(0, 240, 255, 0.08);

  @media screen and (max-width: 600px) {
    padding: 0.5rem 1.2rem;
    gap: 0.5rem;
    bottom: 1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.4rem 1rem;
    gap: 0.4rem;
  }
`;

const StyledNavButton = styled.button`
  background: transparent;
  padding: 0.9rem;
  border-radius: 50%;
  display: flex;
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;

  @media screen and (max-width: 600px) {
    padding: 0.7rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  &:hover {
    color: var(--accent);
    background: rgba(0, 240, 255, 0.08);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
    transform: scale(1.1);
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      box-shadow: none;
    }
    &:active {
      color: var(--accent);
      background: rgba(0, 240, 255, 0.1);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
      transform: scale(1.05);
    }
  }

  &.active {
    background: rgba(0, 240, 255, 0.12);
    color: var(--accent);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
  }

  &.active:hover {
    background: rgba(0, 240, 255, 0.18);
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.25);
  }
`;

const NAV_ITEMS = [
  { icon: ImHome, label: 'Home', sectionIndex: 0 },
  { icon: ImProfile, label: 'About', sectionIndex: 2 },
  { icon: GiDiceTwentyFacesTwenty, label: 'Skills', sectionIndex: 4 },
  { icon: FaToolbox, label: 'Work', sectionIndex: 6 },
  { icon: BiMessageSquareDetail, label: 'Contact', sectionIndex: 10 },
];

// Map section ranges to nav items for active state
const SECTION_TO_NAV = {
  0: 0, 1: 0,       // Home, Tagline → Home
  2: 2, 3: 2,       // About, Strengths → About
  4: 4, 5: 4,       // Skills, Tools → Skills
  6: 6, 7: 6, 8: 6, // Work 1-3 → Work
  9: 10,             // Testimonials → (no nav, closest is Contact)
  10: 10,            // Contact → Contact
  11: 10,            // Footer → Contact
};

const Nav = () => {
  const { currentSection, scrollTo } = useScroll();
  const activeMapped = SECTION_TO_NAV[currentSection];

  return (
    <StyledNav aria-label="Section navigation">
      {NAV_ITEMS.map(({ icon: Icon, label, sectionIndex }) => (
        <StyledNavButton
          key={label}
          onClick={() => scrollTo(sectionIndex)}
          className={activeMapped === sectionIndex ? 'active' : ''}
          aria-label={`Navigate to ${label}`}
          aria-current={activeMapped === sectionIndex ? 'true' : undefined}
          title={label}
        >
          <Icon />
        </StyledNavButton>
      ))}
    </StyledNav>
  )
}

export default Nav
```

**Step 2: Commit**

```bash
git add src/components/nav/Nav.jsx
git commit -m "feat: update Nav for 12 sections with dark cosmos styling"
```

---

## Task 17: Update ScrollProgress (12 dots, cyan accent)

**Files:**
- Modify: `src/components/scroll/ScrollProgress.jsx`

**Step 1: Replace file — change colors to cyan**

```jsx
import React from 'react';
import styled from 'styled-components';
import { useScroll } from '../../context/ScrollContext';

const ProgressContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 240px;
  background: rgba(0, 240, 255, 0.08);
  border-radius: 2px;
  z-index: 100;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    right: 12px;
    height: 180px;
    width: 2px;
  }
`;

const ProgressFill = styled.div`
  width: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: height 0.15s ease-out;
  box-shadow: 0 0 8px var(--accent-glow);
`;

const SectionDots = styled.div`
  position: fixed;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  pointer-events: none;

  @media screen and (max-width: 600px) {
    right: 7px;
    height: 180px;
  }
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => props.$active ? 'var(--accent)' : 'rgba(0, 240, 255, 0.15)'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? '0 0 8px var(--accent-glow)' : 'none'};
  transform: ${props => props.$active ? 'scale(1.3)' : 'scale(1)'};

  @media screen and (max-width: 600px) {
    width: 5px;
    height: 5px;
  }
`;

export default function ScrollProgress() {
  const { progress, currentSection, totalSections } = useScroll();
  const heightPercent = Math.max(0, Math.min(100, progress * 100));

  return (
    <>
      <ProgressContainer aria-hidden="true">
        <ProgressFill style={{ height: `${heightPercent}%` }} />
      </ProgressContainer>
      <SectionDots aria-hidden="true">
        {Array.from({ length: totalSections }, (_, i) => (
          <Dot key={i} $active={i === currentSection} />
        ))}
      </SectionDots>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/scroll/ScrollProgress.jsx
git commit -m "feat: update ScrollProgress for 12 dots with cyan accent"
```

---

## Task 18: Update ScreenReaderStatus (12 section names)

**Files:**
- Modify: `src/components/scroll/ScreenReaderStatus.jsx`

**Step 1: Update SECTION_NAMES array**

```jsx
import React from 'react';
import { useScroll } from '../../context/ScrollContext';

const SECTION_NAMES = [
  'Hero',
  'Tagline',
  'About',
  'Strengths',
  'Skills',
  'Tools',
  'Work — Mobile Apps',
  'Work — Platforms',
  'Work — AI',
  'Testimonials',
  'Contact',
  'Footer',
];

const srOnlyStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export default function ScreenReaderStatus() {
  const { currentSection, totalSections } = useScroll();
  const sectionName = SECTION_NAMES[currentSection] || `Section ${currentSection + 1}`;

  return (
    <div
      id="scroll-status"
      style={srOnlyStyle}
      aria-live="polite"
      aria-atomic="true"
    >
      Viewing {sectionName}, section {currentSection + 1} of {totalSections}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/scroll/ScreenReaderStatus.jsx
git commit -m "feat: update ScreenReaderStatus with 12 section names"
```

---

## Task 19: Restyle SleekButton for Dark Cosmos

**Files:**
- Modify: `src/components/common/SleekButton.jsx`

**Step 1: Update the button colors from black/white to void/cyan**

Change these CSS values in the styled-component:
- `.btn-31` background: `#000` → `var(--bg-void, #050510)`
- `.btn-31` color: `#fff` → `var(--accent, #00f0ff)`
- `.btn-31:before` background: `#fff` → `var(--accent, #00f0ff)`
- `.btn-31` border-width: add `border-color: rgba(0, 240, 255, 0.15)`

These are exact search-and-replace edits in the styled-component string.

**Step 2: Commit**

```bash
git add src/components/common/SleekButton.jsx
git commit -m "feat: restyle SleekButton with dark cosmos cyan accent"
```

---

## Task 20: Delete Obsolete Files

**Files to delete:**
- `src/components/header/HeaderSocials.jsx`
- `src/components/header/NewHeaderCard.jsx`
- `src/components/header/header.css`
- `src/components/about/about.css`
- `src/components/about/InteractiveCard.jsx`

Also remove imports of `react-awesome-slider` from Testimonials (already done in Task 12).

Clean up CSS files no longer imported:
- `src/components/experience/experience.css` (if Experience no longer imports it)
- `src/components/services/services.css` (if Services no longer imports it)
- `src/components/contact/contact.css` (if Contact no longer imports it)
- `src/components/testimonials/testimonials.css` (if Testimonials no longer imports it)
- `src/components/portfolio/portfolio.css` (if Portfolio no longer imports it)
- `src/components/nav/nav.css` (if Nav no longer imports it)

**Step 1: Delete files**

```bash
rm src/components/header/HeaderSocials.jsx
rm src/components/header/NewHeaderCard.jsx
rm src/components/header/header.css
rm src/components/about/about.css
rm src/components/about/InteractiveCard.jsx
rm src/components/experience/experience.css
rm src/components/services/services.css
rm src/components/contact/contact.css
rm src/components/testimonials/testimonials.css
rm src/components/portfolio/portfolio.css
rm src/components/nav/nav.css
```

**Step 2: Verify no dangling imports**

Search all `.jsx` files for imports referencing deleted files. Remove any `import './xxx.css'` or `import Xxx from './DeletedComponent'` lines.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: delete obsolete files (old header components, CSS, InteractiveCard)"
```

---

## Task 21: Build and Verify

**Step 1: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Warnings about unused vars are OK to fix.

**Step 2: Fix any build errors**

If build errors occur, fix them (likely missing imports or unused variable warnings).

**Step 3: Run dev server and visual check**

```bash
npm start
```

Verify:
1. Dark background (#050510) with cyan tunnel rings
2. Scrolling moves camera smoothly through tunnel
3. Hero (stop 0) shows large name with cyan glow, center-zoom transition
4. Tagline (stop 1) center-zooms in with subtitle and 3 buttons
5. About (stop 2) slides from right with photo + bio
6. Strengths (stop 3) slides from left with bullets
7. Skills (stop 4) rises up with merged tag cloud
8. Tools (stop 5) rises up with tool tags
9. Work 1/2/3 (stops 6-8) alternate slide directions
10. Testimonials (stop 9) materializes with auto-rotating slider
11. Contact (stop 10) materializes with form + cards
12. Footer (stop 11) center-zooms in with nav links
13. Nav bar shows cyan active state, jumps to correct sections
14. Progress bar has 12 cyan dots
15. Arrow keys, Page Up/Down, Home/End navigate correctly
16. Soft snap nudges to nearest section after idle
17. Touch scrolling works with momentum

**Step 4: Final commit**

```bash
git add -A
git commit -m "fix: resolve build issues from dark cosmos redesign"
```

---

## Summary

| Task | What | Key Files |
|------|------|-----------|
| 1 | Virtual scroll: 12 sections, soft snap, momentum | `useVirtualScroll.js` |
| 2 | Global CSS: dark cosmos tokens | `index.css` |
| 3 | 3D scene: cyan tunnel, 60 rings, 1200 particles | `Scene.jsx` |
| 4 | SectionWrapper: 5 transform3d profiles | `SectionWrapper.jsx` |
| 5 | Header: hero name + title | `Header.jsx` |
| 6 | CTA: tagline + buttons | `CTA.jsx` |
| 7 | About: photo + short bio | `About.jsx` |
| 8 | Strengths: bullets + "Open to" | `Strengths.jsx` (new) |
| 9 | Experience: merged skills cloud | `Experience.jsx` |
| 10 | Services: merged tools cloud | `Services.jsx` |
| 11 | Portfolio: 3 work stops | `WorkHighlight.jsx` (new), `Portfolio.jsx` |
| 12 | Testimonials: custom dark slider | `Testimonials.jsx` |
| 13 | Contact: dark cosmos form | `Contact.jsx` |
| 14 | Footer: minimal styled-components | `Footer.jsx`, `footer.css` |
| 15 | App.jsx: 12 stops with transition props | `App.jsx` |
| 16 | Nav: updated indices, cyan styling | `Nav.jsx` |
| 17 | ScrollProgress: 12 dots, cyan | `ScrollProgress.jsx` |
| 18 | ScreenReaderStatus: 12 names | `ScreenReaderStatus.jsx` |
| 19 | SleekButton: cyan restyle | `SleekButton.jsx` |
| 20 | Delete obsolete files | Multiple |
| 21 | Build + verify | — |
