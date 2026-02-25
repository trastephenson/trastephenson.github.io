import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
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
  const htmlRef = useRef();
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

    if (htmlRef.current) {
      htmlRef.current.style.opacity = opacity;
      htmlRef.current.style.pointerEvents = isNear ? 'auto' : 'none';
    }
  });

  return (
    <group position={[positionX, 0, sectionZ]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
        <holoCardMaterial
          uTexture={texture}
          uOpacity={1}
          uActive={0}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <Html
        position={[0, -(CARD_HEIGHT / 2 + 0.4), 0]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div
          ref={htmlRef}
          style={{
            width: '260px',
            textAlign: 'center',
            color: '#f0f0f0',
            fontFamily: "'Inter', sans-serif",
            opacity: 0,
          }}
        >
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            margin: '0 0 0.3rem',
            color: '#00f0ff',
          }}>
            {item.title}
          </h3>
          <p style={{
            fontSize: '0.8rem',
            lineHeight: 1.5,
            margin: '0 0 0.6rem',
            color: 'rgba(180, 200, 220, 0.8)',
          }}>
            {item.summary}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {item.primaryUrl && item.primaryUrl !== '#contact' && (
              <a
                href={item.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#00f0ff',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                }}
              >
                {item.primaryCta}
              </a>
            )}
            {item.secondaryUrl && item.secondaryUrl !== '#contact' && (
              <a
                href={item.secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(180, 200, 220, 0.8)',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  border: '1px solid rgba(0, 240, 255, 0.1)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                }}
              >
                {item.secondaryCta}
              </a>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function WorkCard3D({ items, sectionIndex, title }) {
  const sectionZ = -(sectionIndex * SCROLL_CONFIG.SECTION_HEIGHT);
  const { camera } = useThree();
  const titleRef = useRef();

  const totalWidth = items.length * CARD_WIDTH + (items.length - 1) * CARD_GAP;
  const startX = -totalWidth / 2 + CARD_WIDTH / 2;

  useFrame(() => {
    if (!titleRef.current) return;
    const dist = Math.abs(camera.position.z - sectionZ);
    const opacity = Math.max(0, 1 - dist / FADE_RANGE);
    titleRef.current.style.opacity = opacity;
  });

  return (
    <group>
      <Html position={[0, CARD_HEIGHT / 2 + 1.2, sectionZ]} center>
        <h2
          ref={titleRef}
          style={{
            color: '#00f0ff',
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
            whiteSpace: 'nowrap',
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          {title}
        </h2>
      </Html>

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
