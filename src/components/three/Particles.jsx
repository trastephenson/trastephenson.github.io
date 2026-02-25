import { useMemo } from 'react';
import * as THREE from 'three';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const PARTICLE_COUNT = 1200;
const PARTICLE_SPREAD = 14;
const TUNNEL_RADIUS = 6;
const TOTAL_DEPTH = SCROLL_CONFIG.TOTAL_SECTIONS * SCROLL_CONFIG.SECTION_HEIGHT + 20;

export default function Particles() {
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = TUNNEL_RADIUS * 0.3 + Math.random() * PARTICLE_SPREAD;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = -Math.random() * TOTAL_DEPTH;

      const c = new THREE.Color(0x00b8d4);
      const variation = 0.8 + Math.random() * 0.4;
      c.multiplyScalar(variation);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
