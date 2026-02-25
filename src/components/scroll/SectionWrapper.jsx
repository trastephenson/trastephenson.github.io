import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useScroll } from '../../context/ScrollContext';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const { SECTION_HEIGHT } = SCROLL_CONFIG;

const PerspectiveContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  perspective: 1200px;
  perspective-origin: 50% 50%;
  will-change: transform, opacity;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 240, 255, 0.2);
    border-radius: 2px;
  }
`;

const GlassPanel = styled.div`
  width: 90%;
  max-width: 1200px;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--bg-surface, rgba(8, 12, 28, 0.75));
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 20px;
  padding: clamp(1.5rem, 4vw, 3rem);
  box-shadow:
    0 0 40px rgba(0, 240, 255, 0.05),
    0 8px 32px rgba(0, 0, 0, 0.4);

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 240, 255, 0.2);
    border-radius: 2px;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
    max-height: 80vh;
    border-radius: 16px;
    padding: 1.2rem;
  }
`;

const SECTION_NAMES = [
  'Hero',
  'Tagline',
  'About',
  'Strengths',
  'Skills',
  'Tools',
  'Work — Mobile Apps',
  'Work — Platforms',
  'Work — AI',
  'Testimonials',
  'Contact',
  'Footer',
];

const MOBILE_AMPLITUDE = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.5 : 1;

function THREE_LERP(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function getTransitionStyle(profile, delta, amplitude) {
  const a = amplitude;
  const absDelta = Math.abs(delta);
  const opacity = Math.max(0, 1 - absDelta * 1.5);

  if (absDelta > 0.95) {
    return { opacity: 0, transform: 'translateZ(-800px) scale(0.3)', filter: 'blur(0px)' };
  }

  switch (profile) {
    case 'center-zoom': {
      const tz = delta < 0
        ? THREE_LERP(-800 * a, 0, 1 - absDelta)
        : THREE_LERP(0, 200 * a, absDelta);
      const sc = delta < 0
        ? THREE_LERP(0.3, 1, 1 - absDelta)
        : THREE_LERP(1, 1.1, absDelta);
      return {
        opacity,
        transform: `translateZ(${tz}px) scale(${sc})`,
        filter: 'blur(0px)',
      };
    }
    case 'slide-right': {
      const tx = delta < 0
        ? THREE_LERP(100 * a, 0, 1 - absDelta)
        : THREE_LERP(0, -60 * a, absDelta);
      const ry = delta < 0
        ? THREE_LERP(-15 * a, 0, 1 - absDelta)
        : THREE_LERP(0, 10 * a, absDelta);
      return {
        opacity,
        transform: `translateX(${tx}vw) rotateY(${ry}deg)`,
        filter: 'blur(0px)',
      };
    }
    case 'slide-left': {
      const tx = delta < 0
        ? THREE_LERP(-100 * a, 0, 1 - absDelta)
        : THREE_LERP(0, 60 * a, absDelta);
      const ry = delta < 0
        ? THREE_LERP(15 * a, 0, 1 - absDelta)
        : THREE_LERP(0, -10 * a, absDelta);
      return {
        opacity,
        transform: `translateX(${tx}vw) rotateY(${ry}deg)`,
        filter: 'blur(0px)',
      };
    }
    case 'rise-up': {
      const ty = delta < 0
        ? THREE_LERP(80 * a, 0, 1 - absDelta)
        : THREE_LERP(0, -40 * a, absDelta);
      const rx = delta < 0
        ? THREE_LERP(20 * a, 0, 1 - absDelta)
        : THREE_LERP(0, -10 * a, absDelta);
      return {
        opacity,
        transform: `translateY(${ty}vh) rotateX(${rx}deg)`,
        filter: 'blur(0px)',
      };
    }
    case 'materialize': {
      const sc = THREE_LERP(0, 1, 1 - absDelta);
      const blur = absDelta * 20;
      const tz = delta > 0 ? absDelta * 100 * a : 0;
      return {
        opacity: Math.max(0, 1 - absDelta * 2),
        transform: `scale(${sc}) translateZ(${tz}px)`,
        filter: `blur(${blur}px)`,
      };
    }
    default:
      return { opacity, transform: 'none', filter: 'blur(0px)' };
  }
}

export default function SectionWrapper({ sectionIndex, children, noPanel, transition = 'center-zoom' }) {
  const { subscribe } = useScroll();
  const [style, setStyle] = useState({ opacity: 0, transform: 'translateZ(-800px) scale(0.3)', filter: 'blur(0px)' });
  const [isActive, setIsActive] = useState(false);

  const amplitude = useMemo(() => MOBILE_AMPLITUDE, []);

  useEffect(() => {
    const unsubscribe = subscribe((scrollCurrent) => {
      const sectionCenter = sectionIndex * SECTION_HEIGHT;
      const rawDelta = scrollCurrent - sectionCenter;
      const halfRange = SECTION_HEIGHT * 0.7;

      const delta = Math.max(-1, Math.min(1, rawDelta / halfRange));
      const absDelta = Math.abs(delta);

      if (absDelta < 1) {
        const transitionStyle = getTransitionStyle(transition, delta, amplitude);
        setStyle(transitionStyle);
        setIsActive(transitionStyle.opacity > 0.2);
      } else {
        setStyle({ opacity: 0, transform: 'translateZ(-800px) scale(0.3)', filter: 'blur(0px)' });
        setIsActive(false);
      }
    });

    return unsubscribe;
  }, [sectionIndex, subscribe, transition, amplitude]);

  return (
    <PerspectiveContainer
      style={{
        ...style,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      aria-hidden={!isActive}
      role="region"
      aria-label={SECTION_NAMES[sectionIndex] || `Section ${sectionIndex + 1}`}
    >
      {noPanel ? children : <GlassPanel>{children}</GlassPanel>}
    </PerspectiveContainer>
  );
}
