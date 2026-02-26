import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

// Shows on every first load (both 3D and Classic modes).
// Guaranteed minimum 1.5s so users actually see the splash.
export default function LoadingScreen() {
  const { active } = useProgress();
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMinTimeDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Fade only after both min time and R3F loading are complete
  const shouldFade = minTimeDone && !active;

  useEffect(() => {
    if (!shouldFade) return;
    const t = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(t);
  }, [shouldFade]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(160deg, #ffffff 0%, #f4f4fb 100%)',
      opacity: shouldFade ? 0 : 1,
      transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)',
      pointerEvents: shouldFade ? 'none' : 'auto',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Name */}
      <div style={{
        fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        color: '#0f0f1a',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        Travis Stephenson
      </div>

      {/* Title */}
      <div style={{
        fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#7c6ff7',
        marginBottom: '3rem',
      }}>
        Director of Engineering Operations
      </div>

      {/* Progress bar track */}
      <div style={{
        width: 'clamp(140px, 28vw, 220px)',
        height: '3px',
        background: 'rgba(124,111,247,0.15)',
        borderRadius: '99px',
        overflow: 'hidden',
      }}>
        {/* Animated fill — runs for 1.4s matching the min display time */}
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #7c6ff7, #9c6df7)',
          borderRadius: '99px',
          animation: 'ts-bar 1.4s cubic-bezier(0.4,0,0.6,1) forwards',
        }} />
      </div>

      <style>{`
        @keyframes ts-bar {
          0%   { width: 0%; }
          60%  { width: 72%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
