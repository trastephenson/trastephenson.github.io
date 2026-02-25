import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import './HoloCardMaterial';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const CARD_WIDTH = 3.5;
const CARD_HEIGHT = 2.2;
const CARD_GAP = 0.6;
const FADE_RANGE = SCROLL_CONFIG.SECTION_HEIGHT * 0.7;

function SingleCard({ item, positionX, sectionZ }) {
  const meshRef = useRef();
  const { camera } = useThree();
  const texture = useTexture(item.image);

  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;

  const activeRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const dist = Math.abs(camera.position.z - sectionZ);
    const opacity = Math.max(0, 1 - dist / FADE_RANGE);
    const isNear = opacity > 0.3;

    const targetActive = isNear ? 1 : 0;
    easing.damp(activeRef, 'current', targetActive, 0.3, delta);

    const mat = meshRef.current.material;
    if (mat.uniforms) {
      mat.uniforms.uTime.value = state.clock.getElapsedTime();
      mat.uniforms.uActive.value = activeRef.current;
      mat.uniforms.uOpacity.value = opacity;
    }

    const targetScale = isNear ? 1 : 0.8;
    easing.damp(meshRef.current.scale, 'x', targetScale, 0.2, delta);
    easing.damp(meshRef.current.scale, 'y', targetScale, 0.2, delta);
  });

  return (
    <mesh ref={meshRef} position={[positionX, 0, sectionZ]}>
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
      <holoCardMaterial
        uTexture={texture}
        uOpacity={1}
        uActive={0}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function WorkCard3D({ items, sectionIndex }) {
  const sectionZ = -(sectionIndex * SCROLL_CONFIG.SECTION_HEIGHT);
  const totalWidth = items.length * CARD_WIDTH + (items.length - 1) * CARD_GAP;
  const startX = -totalWidth / 2 + CARD_WIDTH / 2;

  return (
    <group>
      {items.map((item, i) => (
        <SingleCard
          key={item.id}
          item={item}
          positionX={startX + i * (CARD_WIDTH + CARD_GAP)}
          sectionZ={sectionZ}
        />
      ))}
    </group>
  );
}
