import { useRef, useLayoutEffect } from 'react';
import { useScroll } from '../../context/ScrollContext';
import { ACCENT_COLORS, SECTION_LABELS } from '../../utils/cardLayout';

// Outer wrapper — position:fixed, centred, transitions in/out
const wrapperBase = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 10,
  width: '90vw',
  maxWidth: '900px',
  // ~40% opacity — clear glass, 3D scene visible behind
  background: 'linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(247,242,235,0.7) 100%)',
  backdropFilter: 'blur(28px) saturate(170%)',
  WebkitBackdropFilter: 'blur(28px) saturate(170%)',
  // Bright top edge + right/bottom depth edges → physical 3D slab feel
  border: '1px solid rgba(255,255,255,0.82)',
  borderTop: '1px solid rgba(255,255,255,0.96)',
  borderRight: '1px solid rgba(18,25,34,0.05)',
  borderBottom: '1px solid rgba(18,25,34,0.08)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  boxShadow: [
    // Deep cast shadow — physical depth below the card
    '0 24px 70px rgba(18,25,34,0.14)',
    '0 16px 38px rgba(18,25,34,0.1)',
    '0 6px 18px rgba(18,25,34,0.06)',
    // inset specular facets — light catching each glass rim
    'inset 0 1px 0 rgba(255,255,255,0.94)',
    'inset 0 -1px 0 rgba(255,255,255,0.24)',
  ].join(', '),
  maxHeight: '84vh',
  display: 'flex',
  flexDirection: 'column',
  transition: 'opacity var(--motion-slow) var(--ease-standard), transform var(--motion-slow) var(--ease-standard)',
};

// Hero (noPanel) — transparent passthrough, no glass card
const heroPanelBase = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 10,
  width: '90vw',
  maxWidth: '1100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity var(--motion-slow) var(--ease-standard), transform var(--motion-slow) var(--ease-standard)',
};

export default function SectionOverlay({ sectionIndex, children, noPanel }) {
  const ref = useRef();
  const { activeSection, zoomOut } = useScroll();
  const isActive = activeSection === sectionIndex;

  const accentColor = ACCENT_COLORS[sectionIndex] ?? '#888';
  const sectionTitle = SECTION_LABELS[sectionIndex] ?? '';

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isActive) {
      el.style.opacity = '1';
      el.style.transform = 'translate(-50%, -50%) scale(1)';
      el.style.pointerEvents = 'auto';
    } else {
      el.style.opacity = '0';
      el.style.transform = 'translate(-50%, -50%) scale(0.93)';
      el.style.pointerEvents = 'none';
    }
  }, [isActive]);

  const baseStyle = {
    ...(noPanel ? heroPanelBase : wrapperBase),
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.93)',
    pointerEvents: 'none',
  };

  if (noPanel) {
    return (
      <div ref={ref} style={baseStyle}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} style={baseStyle}>
      {/* ── Card header — matches the 3D card accent stripe ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0 1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        flexShrink: 0,
      }}>
        {/* Accent colour dot matching the card stripe */}
        <span style={{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: accentColor,
          flexShrink: 0,
        }} />
        {/* Section title matching the 3D card label */}
        <h2 style={{
          margin: 0,
          padding: '0.9rem 0',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.01em',
          flex: 1,
        }}>
          {sectionTitle}
        </h2>
        {/* Back / close button */}
        <button
          onClick={zoomOut}
          aria-label="Back to overview"
          title="Back (Esc)"
          style={{
            background: 'rgba(255,255,255,0.66)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '1.9rem',
            height: '1.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      </div>

      {/* Coloured stripe — 5 px, full width, echoes the card top stripe */}
      <div style={{
        height: '5px',
        background: accentColor,
        flexShrink: 0,
      }} />

      {/* ── Scrollable content area ── */}
      <div style={{
        overflowY: 'auto',
        padding: 'clamp(1.2rem, 3.5vw, 2.5rem)',
        flex: 1,
      }}>
        {children}
      </div>
    </div>
  );
}
