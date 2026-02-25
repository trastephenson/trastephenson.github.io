import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import { useScroll } from '../../context/ScrollContext';
import {
  getCardPosition,
  CARD_W,
  CARD_H,
  SECTION_LABELS,
  ACCENT_COLORS,
  TOTAL_SECTIONS,
} from '../../utils/cardLayout';

// Short descriptor line under each section label
const SUBTITLES = [
  'Portfolio', 'What I do', 'Background', 'Core skills',
  'Career', 'Offerings', 'Apps', 'Platforms',
  'AI & ML', 'Reviews', 'Get in touch', '',
];

const DEPTH = 0.12;   // card thickness
const RADIUS = 0.05;  // rounded corner radius
const STRIPE_H = 0.16; // accent stripe height

function SectionCard({ index, onSelect }) {
  const innerRef = useRef();
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => getCardPosition(index), [index]);
  const accentColor = useMemo(() => new THREE.Color(ACCENT_COLORS[index]), [index]);

  useFrame((_, delta) => {
    if (!innerRef.current) return;
    // Lift card toward camera + subtle scale on hover
    easing.damp(innerRef.current.position, 'z', hovered ? 0.22 : 0, 0.12, delta);
    const sc = hovered ? 1.04 : 1.0;
    easing.damp(innerRef.current.scale, 'x', sc, 0.10, delta);
    easing.damp(innerRef.current.scale, 'y', sc, 0.10, delta);
  });

  return (
    // Outer group anchors the card at its grid position (never changes)
    <group position={pos}>
      {/* Inner group handles hover animation (lift + scale) */}
      <group ref={innerRef}>

        {/* ── 3D card body ──────────────────────────────── */}
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
          <meshStandardMaterial
            color="#f7f8ff"
            roughness={0.06}
            metalness={0.03}
          />
        </RoundedBox>

        {/* ── Accent colour stripe at top ───────────────── */}
        <mesh
          position={[0, CARD_H / 2 - STRIPE_H / 2 - 0.01, DEPTH / 2 + 0.003]}
          raycast={() => null}
        >
          <planeGeometry args={[CARD_W - 0.26, STRIPE_H]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>

        {/* ── Section title ─────────────────────────────── */}
        <Text
          position={[0, 0.10, DEPTH / 2 + 0.012]}
          fontSize={CARD_H * 0.135}
          color="#111122"
          anchorX="center"
          anchorY="middle"
          maxWidth={CARD_W * 0.80}
          font={undefined}
        >
          {SECTION_LABELS[index]}
        </Text>

        {/* ── Short subtitle ────────────────────────────── */}
        <Text
          position={[0, -0.26, DEPTH / 2 + 0.012]}
          fontSize={CARD_H * 0.074}
          color="#555577"
          anchorX="center"
          anchorY="middle"
          maxWidth={CARD_W * 0.76}
          font={undefined}
        >
          {SUBTITLES[index]}
        </Text>

        {/* ── Card index number (bottom-right) ──────────── */}
        <Text
          position={[CARD_W / 2 - 0.18, -CARD_H / 2 + 0.17, DEPTH / 2 + 0.012]}
          fontSize={CARD_H * 0.068}
          color="#aaaacc"
          anchorX="right"
          anchorY="bottom"
        >
          {String(index + 1).padStart(2, '0')}
        </Text>

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
