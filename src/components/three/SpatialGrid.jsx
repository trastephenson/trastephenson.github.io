import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import { useScroll } from '../../context/ScrollContext';
import {
  getCardPosition,
  CARD_W,
  CARD_H,
  SECTION_LABELS,
  TOTAL_SECTIONS,
} from '../../utils/cardLayout';

// ── Liquid glass shader ────────────────────────────────────────────────────
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uHovered;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // Frosted glass base tint
    vec3 base = vec3(0.97, 0.975, 0.99);

    // Top-edge specular band — bright white highlight like glass catching light
    float topSpec = smoothstep(0.88, 1.0, vUv.y);
    base += vec3(topSpec * 0.45);

    // Left-edge iridescence (subtle blue-white shimmer)
    float leftEdge = (1.0 - smoothstep(0.0, 0.06, vUv.x)) * 0.35;
    base += vec3(leftEdge * 0.1, leftEdge * 0.2, leftEdge * 0.5);

    // Animated diagonal sweep when hovered
    float diag = vUv.x - vUv.y + uTime * 0.18;
    float sweep = smoothstep(0.0, 0.04, mod(diag, 1.8)) *
                  smoothstep(0.04, 0.0, mod(diag, 1.8) - 0.07);
    base += vec3(sweep * 0.22 * uHovered);

    // Bottom shadow gradient — grounds the card
    float bottomShadow = 1.0 - smoothstep(0.0, 0.14, vUv.y);
    base -= vec3(bottomShadow * 0.04);

    // Thin border on all edges
    float borderX = min(smoothstep(0.0, 0.02, vUv.x), smoothstep(1.0, 0.98, vUv.x));
    float borderY = min(smoothstep(0.0, 0.02, vUv.y), smoothstep(1.0, 0.98, vUv.y));
    float border  = 1.0 - min(borderX, borderY);
    base = mix(base, vec3(1.0), border * 0.6);

    // Alpha: mostly opaque with slight inner translucency
    float alpha = mix(0.78, 0.92, uHovered);

    gl_FragColor = vec4(base, alpha);
  }
`;
// ──────────────────────────────────────────────────────────────────────────

function SectionCard({ index, onSelect }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => getCardPosition(index), [index]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHovered: { value: 0 },
  }), []);

  useFrame(({ clock }, delta) => {
    uniforms.uTime.value = clock.getElapsedTime();
    easing.damp(uniforms.uHovered, 'value', hovered ? 1 : 0, 0.12, delta);

    if (meshRef.current) {
      const targetScale = hovered ? 1.03 : 1.0;
      easing.damp(meshRef.current.scale, 'x', targetScale, 0.1, delta);
      easing.damp(meshRef.current.scale, 'y', targetScale, 0.1, delta);
    }
  });

  return (
    <group position={pos}>
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        onClick={(e) => { e.stopPropagation(); onSelect(index); }}
      >
        <planeGeometry args={[CARD_W, CARD_H]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Section label */}
      <Text
        position={[0, 0, 0.02]}
        fontSize={CARD_H * 0.13}
        color="#111111"
        anchorX="center"
        anchorY="middle"
        maxWidth={CARD_W * 0.78}
        font={undefined}
      >
        {SECTION_LABELS[index]}
      </Text>

      {/* Section number (small, bottom-right) */}
      <Text
        position={[CARD_W / 2 - 0.22, -CARD_H / 2 + 0.2, 0.02]}
        fontSize={CARD_H * 0.07}
        color="rgba(80,80,90,0.5)"
        anchorX="right"
        anchorY="bottom"
      >
        {String(index + 1).padStart(2, '0')}
      </Text>
    </group>
  );
}

export default function SpatialGrid() {
  const { zoomToSection } = useScroll();

  return (
    <group>
      {Array.from({ length: TOTAL_SECTIONS }, (_, i) => (
        <SectionCard key={i} index={i} onSelect={zoomToSection} />
      ))}
    </group>
  );
}
