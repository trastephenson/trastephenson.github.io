import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, PresentationControls } from '@react-three/drei';
import { easing } from 'maath';
import { useScroll } from '../../context/ScrollContext';
import {
  getCardPosition,
  CARD_W,
  CARD_H,
  TOTAL_SECTIONS,
} from '../../utils/cardLayout';
import CardPreview from './CardPreview';

// CardPreview container: 840 × 540 px; scale maps px → world units
const CONTAINER_W = 840;
const HTML_SCALE  = CARD_W / CONTAINER_W;   // ≈ 0.003333 world-units per px

const DEPTH  = 0.12;  // card thickness
const RADIUS = 0.05;  // rounded-corner radius

// border-radius in preview-px that matches the 3D card corner radius
const CORNER_PX = Math.round(RADIUS / HTML_SCALE); // ≈ 15 px

function SectionCard({ index, onSelect }) {
  const innerRef = useRef();
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => getCardPosition(index), [index]);

  useFrame((_, delta) => {
    if (!innerRef.current) return;
    easing.damp(innerRef.current.position, 'z', hovered ? 0.22 : 0, 0.12, delta);
    const sc = hovered ? 1.04 : 1.0;
    easing.damp(innerRef.current.scale, 'x', sc, 0.10, delta);
    easing.damp(innerRef.current.scale, 'y', sc, 0.10, delta);
  });

  return (
    <group position={pos}>
      <group ref={innerRef}>

        {/* ── 3D card body — handles pointer events ── */}
        <RoundedBox
          args={[CARD_W, CARD_H, DEPTH]}
          radius={RADIUS}
          smoothness={3}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
        >
          <meshStandardMaterial color="#f7f8ff" roughness={0.06} metalness={0.03} />
        </RoundedBox>

        {/* ── HTML content preview on the card face ── */}
        <Html
          transform
          position={[0, 0, DEPTH / 2 + 0.004]}
          scale={HTML_SCALE}
          style={{
            width: `${CONTAINER_W}px`,
            height: `${Math.round(CARD_H / HTML_SCALE)}px`,
            overflow: 'hidden',
            borderRadius: `${CORNER_PX}px`,
            pointerEvents: 'none',
            background: 'transparent',
          }}
          zIndexRange={[2, 3]}
        >
          <CardPreview index={index} />
        </Html>

      </group>
    </group>
  );
}

export default function SpatialGrid() {
  const { zoomToSection, isOverview } = useScroll();

  return (
    <PresentationControls
      enabled={isOverview}
      global={false}
      polar={[-Math.PI / 10, Math.PI / 10]}
      azimuth={[-Math.PI / 6, Math.PI / 6]}
      speed={1.4}
      zoom={1}
      snap={{ mass: 4, tension: 400 }}
    >
      <group>
        {Array.from({ length: TOTAL_SECTIONS }, (_, i) => (
          <SectionCard key={i} index={i} onSelect={zoomToSection} />
        ))}
      </group>
    </PresentationControls>
  );
}
