import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

let hasShownInitialLoadOverlay = false;

export default function LoadingScreen({
  variant = 'initial',
  playToken = 0,
  minDurationMs = 1500,
  fadeDurationMs = 800,
  waitForProgress = variant === 'initial',
  title = 'Explore the portfolio',
  showName = true,
  blockPointerEvents = true,
}) {
  const { active: assetsLoading } = useProgress();
  const [visible, setVisible] = useState(() =>
    variant === 'initial' ? !hasShownInitialLoadOverlay : false
  );
  const [holdDone, setHoldDone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (variant !== 'initial' || !visible) {
      return undefined;
    }

    hasShownInitialLoadOverlay = true;

    const holdTimer = window.setTimeout(() => {
      setHoldDone(true);
    }, minDurationMs);

    return () => {
      window.clearTimeout(holdTimer);
    };
  }, [minDurationMs, variant, visible]);

  useEffect(() => {
    if (
      variant !== 'initial' ||
      !visible ||
      !holdDone ||
      (waitForProgress && assetsLoading)
    ) {
      return undefined;
    }

    setFading(true);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, fadeDurationMs);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [assetsLoading, fadeDurationMs, holdDone, visible, variant, waitForProgress]);

  useEffect(() => {
    if (variant !== 'transition' || !playToken) {
      return undefined;
    }

    setVisible(true);
    setHoldDone(false);
    setFading(false);

    const holdTimer = window.setTimeout(() => {
      setHoldDone(true);
      setFading(true);
    }, minDurationMs);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, minDurationMs + fadeDurationMs);

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(hideTimer);
    };
  }, [fadeDurationMs, minDurationMs, playToken, variant]);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top left, rgba(102, 212, 239, 0.14), transparent 24%), radial-gradient(circle at top right, rgba(183, 112, 69, 0.12), transparent 24%), linear-gradient(180deg, #f7f3ec 0%, #ebe4d8 100%)',
        opacity: fading ? 0 : 1,
        transition: `opacity ${fadeDurationMs}ms var(--ease-standard)`,
        pointerEvents: blockPointerEvents && !fading ? 'auto' : 'none',
        fontFamily: 'var(--font-body)',
      }}
    >
      {showName ? (
        <div
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            lineHeight: 1,
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-display)',
          }}
        >
          Travis Stephenson
        </div>
      ) : null}

      <div
        style={{
          fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '3rem',
        }}
      >
        {title}
      </div>

      <div
        style={{
          width: 'clamp(140px, 28vw, 220px)',
          height: '3px',
          background: 'rgba(18,25,34,0.08)',
          borderRadius: '99px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
            borderRadius: '99px',
            animation: `ts-bar ${Math.max(minDurationMs - 60, 320)}ms cubic-bezier(0.4,0,0.6,1) forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes ts-bar {
          0% { width: 0%; }
          60% { width: 72%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
