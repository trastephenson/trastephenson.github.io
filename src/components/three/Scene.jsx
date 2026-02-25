import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '../../context/ScrollContext';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';
import CameraRig from './CameraRig';
import TunnelRings from './TunnelRings';
import Particles from './Particles';

function DynamicLights() {
  const light1Ref = useRef();
  const light2Ref = useRef();
  const { camera } = useThree();
  const { subscribe } = useScroll();
  const scrollRef = useRef(0);

  useEffect(() => {
    const unsub = subscribe((val) => { scrollRef.current = val; });
    return unsub;
  }, [subscribe]);

  useFrame(() => {
    if (!light1Ref.current || !light2Ref.current) return;

    light1Ref.current.position.z = camera.position.z;
    light2Ref.current.position.z = camera.position.z - 15;

    const progress = scrollRef.current / SCROLL_CONFIG.MAX_SCROLL;
    const hueShift = progress * 0.08;
    light1Ref.current.color.setHSL(0.52 + hueShift, 0.9, 0.55);
    light2Ref.current.color.setHSL(0.58 + hueShift, 0.8, 0.4);
  });

  return (
    <>
      <ambientLight intensity={0.8} color={0xffffff} />
      <pointLight ref={light1Ref} color={0x0088cc} intensity={1.5} distance={60} />
      <pointLight ref={light2Ref} color={0x004488} intensity={1.0} distance={60} />
    </>
  );
}

export default function Scene({ children }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 0.5], fov: 75, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        style={{ background: 'transparent' }}
      >
        <fogExp2 attach="fog" args={[0xe8eef5, 0.018]} />

        <CameraRig />
        <DynamicLights />
        <TunnelRings />
        <Particles />

        {children}
      </Canvas>
    </div>
  );
}
