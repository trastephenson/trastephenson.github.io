import { Canvas } from '@react-three/fiber';
import CameraRig from './CameraRig';
import TunnelRings from './TunnelRings';
import Particles from './Particles';

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
        camera={{ position: [0, 0, 20], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: true }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        {/* TunnelRings renders the fullscreen animated contour-line BG shader */}
        <TunnelRings />
        <Particles />
        <CameraRig />
        {children}
      </Canvas>
    </div>
  );
}
