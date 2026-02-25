import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';
import { useScroll } from '../../context/ScrollContext';
import { getCardPosition, OVERVIEW_Z, DETAIL_Z_OFFSET } from '../../utils/cardLayout';

const DAMP = 0.1;

export default function CameraRig() {
  const { activeSection, isOverview } = useScroll();
  // Mirror React state into a ref so useFrame always sees the latest values
  const stateRef = useRef({ activeSection: null, isOverview: true });
  stateRef.current = { activeSection, isOverview };

  // Damped look-at target
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }, delta) => {
    const { activeSection: idx, isOverview: overview } = stateRef.current;

    if (overview || idx === null) {
      easing.damp(camera.position, 'x', 0, DAMP, delta);
      easing.damp(camera.position, 'y', 0, DAMP, delta);
      easing.damp(camera.position, 'z', OVERVIEW_Z, DAMP, delta);
      easing.damp3(lookAt.current, [0, 0, 0], DAMP, delta);
    } else {
      const [cx, cy, cz] = getCardPosition(idx);
      easing.damp(camera.position, 'x', cx, DAMP, delta);
      easing.damp(camera.position, 'y', cy, DAMP, delta);
      easing.damp(camera.position, 'z', cz + DETAIL_Z_OFFSET, DAMP, delta);
      // Damp the look-at target toward the card center
      easing.damp3(lookAt.current, [cx, cy, cz], DAMP, delta);
    }

    camera.lookAt(lookAt.current);
  });

  return null;
}
