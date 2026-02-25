import { useRef, useLayoutEffect } from 'react';
import { useScroll } from '../../context/ScrollContext';

// Apple-style liquid glass: translucent, blurred, bright specular top edge
const panelBase = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 10,
  width: '90vw',
  maxWidth: '1100px',
  background: 'linear-gradient(145deg, rgba(255,255,255,0.72) 0%, rgba(242,244,255,0.68) 100%)',
  backdropFilter: 'blur(48px) saturate(200%) brightness(110%)',
  WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(110%)',
  border: '1px solid rgba(255,255,255,0.55)',
  borderTop: '1px solid rgba(255,255,255,0.92)',
  borderLeft: '1px solid rgba(255,255,255,0.75)',
  borderRadius: '22px',
  padding: 'clamp(1.5rem, 4vw, 3rem)',
  boxShadow: [
    '0 8px 48px rgba(0,0,0,0.10)',
    '0 2px 8px rgba(0,0,0,0.06)',
    'inset 0 1px 0 rgba(255,255,255,0.96)',
    'inset 0 -1px 0 rgba(255,255,255,0.35)',
    'inset 1px 0 0 rgba(255,255,255,0.6)',
    'inset -1px 0 0 rgba(255,255,255,0.3)',
  ].join(', '),
  maxHeight: '82vh',
  overflowY: 'auto',
  transition: 'opacity 0.38s cubic-bezier(0.4,0,0.2,1), transform 0.38s cubic-bezier(0.4,0,0.2,1)',
};

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
  transition: 'opacity 0.38s cubic-bezier(0.4,0,0.2,1), transform 0.38s cubic-bezier(0.4,0,0.2,1)',
};

const backBtnStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1.1rem',
  background: 'rgba(0,0,0,0.06)',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: '50%',
  width: '2rem',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '0.85rem',
  color: '#444',
  lineHeight: 1,
  transition: 'background 0.2s',
};

export default function SectionOverlay({ sectionIndex, children, noPanel }) {
  const ref = useRef();
  const { activeSection, zoomOut } = useScroll();
  const isActive = activeSection === sectionIndex;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isActive) {
      el.style.opacity = '1';
      el.style.transform = 'translate(-50%, -50%) scale(1)';
      el.style.pointerEvents = 'auto';
    } else {
      el.style.opacity = '0';
      el.style.transform = 'translate(-50%, -50%) scale(0.94)';
      el.style.pointerEvents = 'none';
    }
  }, [isActive]);

  const baseStyle = {
    ...(noPanel ? heroPanelBase : panelBase),
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.94)',
    pointerEvents: 'none',
  };

  return (
    <div ref={ref} style={baseStyle}>
      {!noPanel && (
        <button
          style={backBtnStyle}
          onClick={zoomOut}
          aria-label="Back to overview"
          title="Back (Esc)"
        >
          ✕
        </button>
      )}
      {children}
    </div>
  );
}
