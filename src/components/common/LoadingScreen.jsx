import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const { active } = useProgress();
  const [visible, setVisible] = useState(true);

  // Keep mounted for the fade-out, then remove from DOM
  useEffect(() => {
    if (!active) {
      const t = setTimeout(() => setVisible(false), 700);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#eaeaea',
      opacity: active ? 1 : 0,
      transition: 'opacity 0.7s ease',
      pointerEvents: active ? 'auto' : 'none',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        fontSize: 'clamp(2rem, 5vw, 2.8rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: '#111',
        marginBottom: '0.6rem',
      }}>
        Travis Stephenson
      </div>
      <div style={{
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#999',
      }}>
        Director of Engineering Operations
      </div>
      <div style={{
        marginTop: '2.5rem',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: '#7c6ff7',
        animation: 'ts-pulse 1.1s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes ts-pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.75); }
          50%       { opacity: 1;    transform: scale(1.4);  }
        }
      `}</style>
    </div>
  );
}
