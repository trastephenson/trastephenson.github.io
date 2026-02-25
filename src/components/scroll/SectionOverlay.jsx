import { useRef, useLayoutEffect } from 'react';
import { useScroll } from '../../context/ScrollContext';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const FADE_RANGE = SCROLL_CONFIG.SECTION_HEIGHT * 0.7;
const ACTIVE_THRESHOLD = 0.2;

const panelBase = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.85)',
  opacity: 0,
  pointerEvents: 'none',
  zIndex: 10,
  width: '90vw',
  maxWidth: '1200px',
};

const glassExtra = {
  maxHeight: '85vh',
  overflowY: 'auto',
  background: 'rgba(255, 255, 255, 0.92)',
  backdropFilter: 'blur(24px) saturate(140%)',
  WebkitBackdropFilter: 'blur(24px) saturate(140%)',
  border: '1px solid rgba(0, 100, 180, 0.14)',
  borderRadius: '20px',
  padding: 'clamp(1.5rem, 4vw, 3rem)',
  boxShadow:
    '0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
};

const noPanelExtra = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Positions an HTML section panel in the viewport center.
 * Opacity / scale are driven by direct DOM mutation from the scroll RAF loop —
 * no React state updates, no re-renders at 60 fps.
 */
export default function SectionOverlay({ sectionIndex, children, noPanel }) {
  const ref = useRef();
  const { subscribe } = useScroll();
  const scrollTarget = sectionIndex * SCROLL_CONFIG.SECTION_HEIGHT;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unsubscribe = subscribe((scrollCurrent) => {
      const dist = Math.abs(scrollCurrent - scrollTarget);
      const opacity = Math.max(0, 1 - dist / FADE_RANGE);
      const scale = 0.85 + opacity * 0.15;
      el.style.opacity = opacity;
      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      el.style.pointerEvents = opacity > ACTIVE_THRESHOLD ? 'auto' : 'none';
    });

    return unsubscribe;
  }, [subscribe, scrollTarget]);

  const style = noPanel
    ? { ...panelBase, ...noPanelExtra }
    : { ...panelBase, ...glassExtra };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}
