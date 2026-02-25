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
  // Opaque liquid glass — matches the 3D card material (f7f8ff, roughness 0.06)
  background: 'linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(247,248,255,0.96) 55%, rgba(242,245,255,0.95) 100%)',
  backdropFilter: 'blur(80px) saturate(280%) brightness(120%)',
  WebkitBackdropFilter: 'blur(80px) saturate(280%) brightness(120%)',
  // Bright top edge = specular light catching the glass rim
  border: '1.5px solid rgba(255,255,255,0.88)',
  borderTop: '2px solid rgba(255,255,255,1)',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: [
    '0 48px 120px rgba(0,0,0,0.20)',
    '0 16px 48px rgba(0,0,0,0.11)',
    '0 4px 16px rgba(0,0,0,0.06)',
    // inset specular facets — simulate the glassy surface reflections
    'inset 0 2px 0 rgba(255,255,255,1)',
    'inset 0 1px 1px rgba(255,255,255,0.85)',
    'inset 0 -1px 0 rgba(255,255,255,0.42)',
    'inset 1px 0 0 rgba(255,255,255,0.68)',
    'inset -1px 0 0 rgba(255,255,255,0.34)',
  ].join(', '),
  maxHeight: '84vh',
  display: 'flex',
  flexDirection: 'column',
  transition: 'opacity 0.36s cubic-bezier(0.4,0,0.2,1), transform 0.36s cubic-bezier(0.4,0,0.2,1)',
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
  transition: 'opacity 0.36s cubic-bezier(0.4,0,0.2,1), transform 0.36s cubic-bezier(0.4,0,0.2,1)',
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
        borderBottom: '1px solid rgba(0,0,0,0.055)',
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
          color: '#111',
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
            background: 'rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '50%',
            width: '1.9rem',
            height: '1.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '0.8rem',
            color: '#444',
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
