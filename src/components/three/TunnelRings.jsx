import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const TORUS_COUNT = 60;
const TUNNEL_RADIUS = 6;
const TUBE_RADIUS = 0.12;
const TOTAL_DEPTH = SCROLL_CONFIG.TOTAL_SECTIONS * SCROLL_CONFIG.SECTION_HEIGHT;
const TORUS_SPACING = TOTAL_DEPTH / TORUS_COUNT;

export default function TunnelRings() {
  const groupRef = useRef();
  const { camera } = useThree();

  const ringsData = useMemo(() => {
    return Array.from({ length: TORUS_COUNT }, (_, i) => ({
      baseZ: -i * TORUS_SPACING,
      rotationSpeed: 0.002 + (i % 5) * 0.001,
      color: new THREE.Color().lerpColors(
        new THREE.Color(0x00d4ff),
        new THREE.Color(0x0066aa),
        i / TORUS_COUNT
      ),
      initialRotY: (i % 3) * 0.15,
    }));
  }, []);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame(() => {
    if (!groupRef.current || prefersReducedMotion) return;

    groupRef.current.children.forEach((mesh, i) => {
      const data = ringsData[i];
      if (!data) return;

      mesh.rotation.z += data.rotationSpeed;

      const dist = Math.abs(mesh.position.z - camera.position.z);
      mesh.material.opacity = dist < 2 ? 0.9 : Math.max(0.15, 0.9 - dist * 0.015);
      mesh.material.emissiveIntensity = dist < 3 ? 0.7 : Math.max(0.2, 0.7 - dist * 0.01);

      const scale = dist < 3 ? 1.0 : Math.max(0.6, 1.0 - dist * 0.008);
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group ref={groupRef}>
      {ringsData.map((data, i) => (
        <mesh
          key={i}
          position={[0, 0, data.baseZ]}
          rotation={[Math.PI / 2, data.initialRotY, 0]}
        >
          <torusGeometry args={[TUNNEL_RADIUS, TUBE_RADIUS, 16, 48]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}
