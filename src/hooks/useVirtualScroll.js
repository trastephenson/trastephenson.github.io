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
