import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useScroll } from '../../context/ScrollContext';
import { getCardPosition, OVERVIEW_Z, DETAIL_Z_OFFSET } from '../../utils/cardLayout';

const DAMP = 0.1;

export default function CameraRig() {
  const { activeSection, isOverview } = useScroll();
  // Mirror React state into a ref so useFrame always sees the latest values
  const stateRef = useRef({ activeSection: null, isOverview: true });
  stateRef.current = { activeSection, isOverview };

  useFrame(({ camera }, delta) => {
    const { activeSection: idx, isOverview: overview } = stateRef.current;

    if (overview || idx === null) {
      // Pull back to the overview position to see all cards
      easing.damp(camera.position, 'x', 0, DAMP, delta);
      easing.damp(camera.position, 'y', 0, DAMP, delta);
      easing.damp(camera.position, 'z', OVERVIEW_Z, DAMP, delta);
    } else {
      // Zoom into the selected card's position
      const [cx, cy, cz] = getCardPosition(idx);
      easing.damp(camera.position, 'x', cx, DAMP, delta);
      easing.damp(camera.position, 'y', cy, DAMP, delta);
      easing.damp(camera.position, 'z', cz + DETAIL_Z_OFFSET, DAMP, delta);
    }
  });

  return null;
}
