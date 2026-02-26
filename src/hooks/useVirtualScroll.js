import { useCallback, useEffect, useState } from 'react';
import { TOTAL_SECTIONS } from '../utils/cardLayout';

// Keep SCROLL_CONFIG exported so any remaining imports don't break
export { SCROLL_CONFIG } from '../utils/cardLayout';

// Section anchor IDs for DOM scroll in classic mode (index → element id)
const SECTION_IDS = [
  'home', 'home',
  'about', 'about',
  'experience', 'services',
  'portfolio', 'portfolio', 'portfolio',
  'testimonials',
  'contact', 'contact',
];

/**
 * Click-to-zoom spatial navigation model.
 * When enabled=true  → 3D virtual scroll (intercepts wheel, zooms camera).
 * When enabled=false → classic mode (native scroll; scrollTo does scrollIntoView).
 */
export default function useVirtualScroll({ enabled = true } = {}) {
  const [activeSection, setActiveSection] = useState(null);
  const [isOverview, setIsOverview] = useState(true);
  const [currentSection, setCurrentSection] = useState(null);

  const zoomToSection = useCallback((index) => {
    const i = Math.max(0, Math.min(TOTAL_SECTIONS - 1, index));
    setActiveSection(i);
    setCurrentSection(i);
    setIsOverview(false);
  }, []);

  const zoomOut = useCallback(() => {
    setActiveSection(null);
    setIsOverview(true);
  }, []);

  // Reset to overview when switching back into 3D mode
  useEffect(() => {
    if (enabled) zoomOut();
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key — only intercept in 3D mode
  useEffect(() => {
    if (!enabled) return;
    function handleKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        zoomOut();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomOut, enabled]);

  // Wheel scroll intercept — only in 3D mode
  useEffect(() => {
    if (!enabled) return;
    let lastWheel = 0;
    function handleWheel(e) {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel < 500) return; // debounce
      lastWheel = now;

      setActiveSection((prev) => {
        if (prev === null) return prev;
        const next = e.deltaY > 0
          ? Math.min(TOTAL_SECTIONS - 1, prev + 1)
          : Math.max(0, prev - 1);
        setCurrentSection(next);
        setIsOverview(false);
        return next;
      });
    }
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [enabled]);

  // Touch swipe — horizontal swipe cycles sections in 3D mode
  useEffect(() => {
    if (!enabled) return;
    let startX = 0;
    let startY = 0;
    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      // Require at least 50px and more horizontal than vertical
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      setActiveSection((prev) => {
        if (prev === null) return prev;
        const next = dx < 0
          ? Math.min(TOTAL_SECTIONS - 1, prev + 1)
          : Math.max(0, prev - 1);
        setCurrentSection(next);
        setIsOverview(false);
        return next;
      });
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [enabled]);

  // Classic mode: IntersectionObserver keeps nav in sync with scroll position
  useEffect(() => {
    if (enabled) return;
    const ID_MAP = [
      ['home', 0], ['about', 2], ['strengths', 3],
      ['experience', 4], ['services', 5],
      ['portfolio', 6], ['testimonials', 9], ['contact', 10],
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = ID_MAP.find(([id]) => id === entry.target.id);
            if (match) setCurrentSection(match[1]);
          }
        });
      },
      { threshold: 0.25 }
    );
    ID_MAP.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [enabled]);

  // scrollTo: DOM scrollIntoView in classic mode, zoom in 3D mode
  const scrollTo = useCallback((index) => {
    if (!enabled) {
      const id = SECTION_IDS[index] ?? 'home';
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    zoomToSection(index);
  }, [enabled, zoomToSection]);

  // Legacy compat: progress for ScrollProgress bar
  const progress = currentSection !== null
    ? currentSection / (TOTAL_SECTIONS - 1)
    : 0;

  return {
    activeSection,
    isOverview,
    currentSection,
    zoomToSection,
    zoomOut,
    scrollTo,
    totalSections: TOTAL_SECTIONS,
    progress,
    enabled,
  };
}
