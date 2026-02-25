import { useScroll } from '../../context/ScrollContext';

/**
 * Floating minus button — always in DOM, fades in/out based on zoom state.
 * Mirrors the shoe-demo pattern: overview mode = hidden, zoomed = visible.
 */
export default function BackButton() {
  const { isOverview, zoomOut } = useScroll();

  return (
    <button
      onClick={zoomOut}
      aria-label="Back to overview"
      title="Back (Esc)"
      style={{
        position: 'fixed',
        bottom: '6.2rem',          // sits above the nav bar
        left: '50%',
        transform: `translateX(-50%) scale(${isOverview ? 0.6 : 1})`,
        zIndex: 200,
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: [
          '0 8px 32px rgba(0,0,0,0.14)',
          '0 2px 8px rgba(0,0,0,0.08)',
          'inset 0 1px 0 rgba(255,255,255,0.95)',
        ].join(', '),
        cursor: 'pointer',
        fontSize: '1.7rem',
        lineHeight: 1,
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isOverview ? 0 : 1,
        pointerEvents: isOverview ? 'none' : 'auto',
        transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        userSelect: 'none',
      }}
    >
      −
    </button>
  );
}
