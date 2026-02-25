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
