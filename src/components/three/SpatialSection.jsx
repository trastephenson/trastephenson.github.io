import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const FADE_RANGE = SCROLL_CONFIG.SECTION_HEIGHT * 0.7;
const ACTIVE_THRESHOLD = 0.2;

const glassStyle = {
  width: '90vw',
  maxWidth: '1200px',
  maxHeight: '85vh',
  overflowY: 'auto',
  background: 'rgba(8, 12, 28, 0.75)',
  backdropFilter: 'blur(24px) saturate(120%)',
  WebkitBackdropFilter: 'blur(24px) saturate(120%)',
  border: '1px solid rgba(0, 240, 255, 0.08)',
  borderRadius: '20px',
  padding: 'clamp(1.5rem, 4vw, 3rem)',
  boxShadow: '0 0 40px rgba(0, 240, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)',
};

const noPanelStyle = {
  width: '90vw',
  maxWidth: '1200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const SECTION_NAMES = [
  'Hero', 'Tagline', 'About', 'Strengths', 'Skills', 'Tools',
  'Work — Mobile Apps', 'Work — Platforms', 'Work — AI',
  'Testimonials', 'Contact', 'Footer',
];

export default function SpatialSection({ sectionIndex, children, noPanel }) {
  const { camera } = useThree();
  const containerRef = useRef();
  const sectionZ = -(sectionIndex * SCROLL_CONFIG.SECTION_HEIGHT);

  useFrame(() => {
    if (!containerRef.current) return;

    const distance = camera.position.z - sectionZ;
    const absDist = Math.abs(distance);
    const opacity = Math.max(0, 1 - absDist / FADE_RANGE);
    const isActive = opacity > ACTIVE_THRESHOLD;

    containerRef.current.style.opacity = opacity;
    containerRef.current.style.pointerEvents = isActive ? 'auto' : 'none';

    const scale = 0.85 + opacity * 0.15;
    containerRef.current.style.transform = `scale(${scale})`;
  });

  return (
    <Html
      center
      position={[0, 0, sectionZ]}
      style={{ pointerEvents: 'none' }}
      role="region"
      aria-label={SECTION_NAMES[sectionIndex] || `Section ${sectionIndex + 1}`}
    >
      <div ref={containerRef} style={noPanel ? noPanelStyle : glassStyle}>
        {children}
      </div>
    </Html>
  );
}
