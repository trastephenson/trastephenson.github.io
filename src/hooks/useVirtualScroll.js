import { useCallback, useEffect, useState } from 'react';
import { TOTAL_SECTIONS } from '../utils/cardLayout';

// Keep SCROLL_CONFIG exported so any remaining imports don't break
export { SCROLL_CONFIG } from '../utils/cardLayout';

/**
 * Click-to-zoom spatial navigation model.
 * Overview: camera shows all 12 section cards.
 * Detail:   camera zooms to the selected section card; content overlay appears.
 */
export default function useVirtualScroll() {
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

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        zoomOut();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [zoomOut]);

  // Scroll wheel: when zoomed in, wheel cycles to next/prev section
  useEffect(() => {
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
  }, []);

  // Legacy compat: scrollTo = zoomToSection (used by Nav)
  const scrollTo = zoomToSection;

  // progress for ScrollProgress bar
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
  };
}
