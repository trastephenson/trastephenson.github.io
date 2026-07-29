import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SleekButton from '../common/SleekButton';

const headingStyle = {
  color: 'var(--accent)',
  fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontFamily: 'var(--font-body)',
  marginBottom: '1.5rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
  gap: '1.5rem',
};

const cardStyle = {
  background:
    'linear-gradient(145deg, rgba(255,255,255,0.76) 0%, rgba(247,242,235,0.7) 100%)',
  backdropFilter: 'blur(24px) saturate(170%)',
  WebkitBackdropFilter: 'blur(24px) saturate(170%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderTop: '1px solid rgba(255,255,255,0.94)',
  borderRadius: 'var(--radius-md)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'var(--shadow-md)',
};

const imgStyle = {
  width: '100%',
  height: '176px',
  objectFit: 'cover',
};

const reelLinkStyle = {
  display: 'block',
  position: 'relative',
  height: '176px',
  overflow: 'hidden',
  background: '#07131c',
};

const reelBadgeStyle = {
  position: 'absolute',
  top: '0.75rem',
  right: '0.75rem',
  zIndex: 1,
  padding: '0.38rem 0.58rem',
  border: '1px solid rgba(255,255,255,0.24)',
  borderRadius: '999px',
  background: 'rgba(8,17,25,0.72)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  color: '#ffffff',
  fontFamily: 'var(--font-body)',
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  lineHeight: 1,
  textTransform: 'uppercase',
  pointerEvents: 'none',
};

const bodyStyle = {
  padding: 'var(--space-5)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.65rem',
  flex: 1,
};

const titleStyle = {
  color: 'var(--text-primary)',
  fontWeight: 700,
  fontSize: '1.02rem',
  fontFamily: 'var(--font-display)',
  lineHeight: 1.1,
  margin: 0,
};

const summaryStyle = {
  color: 'var(--text-secondary)',
  fontSize: '0.88rem',
  lineHeight: 1.6,
  margin: 0,
  flex: 1,
  fontFamily: 'var(--font-body)',
};

const btnRowStyle = {
  display: 'flex',
  gap: '0.65rem',
  flexWrap: 'wrap',
  marginTop: '0.35rem',
};

const deepBlue = 'color-mix(in srgb, var(--accent-secondary) 58%, #0f3658)';
const neutralOutline = 'rgba(18, 25, 34, 0.44)';

const primaryButton = {
  '--btn-text': '#ffffff',
  '--btn-hover-text': '#ffffff',
  '--btn-surface': deepBlue,
  '--btn-fill': 'var(--accent)',
  '--btn-border': neutralOutline,
  '--btn-hover-border': neutralOutline,
  '--btn-shadow': '0 10px 22px rgba(18, 25, 34, 0.12)',
  '--btn-hover-shadow':
    '0 14px 28px rgba(18, 25, 34, 0.16)',
  '--btn-pad-y': '0.62rem',
  '--btn-pad-x': '1.05rem',
  '--btn-font-size': '0.76rem',
};

const secondaryButton = {
  '--btn-text': '#ffffff',
  '--btn-hover-text': '#ffffff',
  '--btn-surface': 'var(--accent)',
  '--btn-fill': deepBlue,
  '--btn-border': neutralOutline,
  '--btn-hover-border': neutralOutline,
  '--btn-shadow': '0 10px 22px rgba(18, 25, 34, 0.12)',
  '--btn-hover-shadow': '0 14px 28px rgba(18, 25, 34, 0.16)',
  '--btn-pad-y': '0.62rem',
  '--btn-pad-x': '1.05rem',
  '--btn-font-size': '0.76rem',
};

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReducedMotion(event.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  return reducedMotion;
}

function PortfolioReel({ item }) {
  const videoRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const saveData = navigator.connection?.saveData;
    if (reducedMotion || saveData) {
      video.pause();
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      video.play().catch(() => {});
      return () => video.pause();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [item.video, reducedMotion]);

  const reel = (
    <div style={reelLinkStyle}>
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay={!reducedMotion}
        disablePictureInPicture
        loop
        muted
        playsInline
        poster={item.videoPoster || item.image}
        preload="metadata"
        src={item.video}
        style={{ ...imgStyle, display: 'block', pointerEvents: 'none' }}
      />
      <span style={reelBadgeStyle}>{item.videoBadge || 'Reel'}</span>
    </div>
  );

  if (!item.routeUrl) {
    return reel;
  }

  return (
    <Link
      aria-label={`Open ${item.title} case study`}
      style={{ color: 'inherit', textDecoration: 'none' }}
      to={item.routeUrl}
    >
      {reel}
    </Link>
  );
}

export default function WorkPanel({ items, title }) {
  return (
    <div>
      <h2 style={headingStyle}>{title}</h2>
      <div style={gridStyle}>
        {items.map((item) => (
          <div key={item.id} style={cardStyle}>
            {item.video ? (
              <PortfolioReel item={item} />
            ) : item.imageComponent ? (
              <div style={{ padding: '0.9rem 0.9rem 0' }}>
                <item.imageComponent />
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.imageAlt || item.title}
                style={imgStyle}
                loading="lazy"
                decoding="async"
              />
            )}
            <div style={bodyStyle}>
              <h3 style={titleStyle}>{item.title}</h3>
              <p style={summaryStyle}>{item.summary}</p>
              <div style={btnRowStyle}>
                {item.routeUrl ? (
                  <SleekButton as={Link} to={item.routeUrl} style={primaryButton}>
                    {item.primaryCta}
                  </SleekButton>
                ) : item.primaryUrl && item.primaryUrl !== '#contact' ? (
                  <SleekButton
                    as="a"
                    href={item.primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={primaryButton}
                  >
                    {item.primaryCta}
                  </SleekButton>
                ) : null}
                {item.secondaryUrl && item.secondaryUrl !== '#contact' && (
                  <SleekButton
                    as="a"
                    href={item.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={secondaryButton}
                  >
                    {item.secondaryCta}
                  </SleekButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
