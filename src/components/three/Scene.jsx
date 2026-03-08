import { Canvas } from '@react-three/fiber';
import CameraRig from './CameraRig';
import TunnelRings from './TunnelRings';
import Particles from './Particles';

export default function Scene({ children, style }) {
  const isCompactViewport = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: !isCompactViewport, powerPreference: 'high-performance' }}
        dpr={isCompactViewport ? [1, 1.15] : [1, 1.5]}
      >
        {/* Background shader — unaffected by lights (depthTest:false) */}
        <TunnelRings />
        <Particles />
        {/* Studio lighting for the 3D card surfaces */}
        <ambientLight intensity={2.4} color="#ffffff" />
        <directionalLight position={[4, 6, 14]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-6, 2, 6]} intensity={0.45} color="#eef2ff" />
        <CameraRig />
        {children}
      </Canvas>
    </div>
  );
}
