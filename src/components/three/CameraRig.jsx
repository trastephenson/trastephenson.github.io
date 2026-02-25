import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import { useScroll } from '../../context/ScrollContext';

const CAMERA_START_Z = 0;
const DAMP_FACTOR = 0.15;
const TILT_FACTOR = 0.3;
const TILT_DAMP = 0.2;
const SWAY_SPEED_X = 0.3;
const SWAY_SPEED_Y = 0.4;
const SWAY_AMPLITUDE_X = 0.25;
const SWAY_AMPLITUDE_Y = 0.15;

export default function CameraRig() {
  const { camera } = useThree();
  const { subscribe } = useScroll();
  const scrollRef = useRef(0);
  const prevZ = useRef(0);
  const velocityZ = useRef(0);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const unsubscribe = subscribe((scrollCurrent) => {
      scrollRef.current = scrollCurrent;
    });
    return unsubscribe;
  }, [subscribe]);

  useFrame((state, delta) => {
    const targetZ = CAMERA_START_Z - scrollRef.current;

    const dampFactor = prefersReducedMotion ? 1.0 : DAMP_FACTOR;
    easing.damp(camera.position, 'z', targetZ, dampFactor, delta);

    velocityZ.current = camera.position.z - prevZ.current;
    prevZ.current = camera.position.z;

    if (!prefersReducedMotion) {
      const elapsed = state.clock.getElapsedTime();
      camera.position.x = Math.sin(elapsed * SWAY_SPEED_X) * SWAY_AMPLITUDE_X;
      camera.position.y = Math.cos(elapsed * SWAY_SPEED_Y) * SWAY_AMPLITUDE_Y;

      const tiltX = velocityZ.current * TILT_FACTOR * 0.5;
      easing.damp(camera.rotation, 'x', tiltX, TILT_DAMP, delta);
    }
  });

  return null;
}
