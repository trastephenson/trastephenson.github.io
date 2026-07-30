import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  RoundedBox,
  PresentationControls,
  Text,
  useTexture,
  useVideoTexture,
} from '@react-three/drei';
import { easing } from 'maath';
import { useScroll } from '../../context/ScrollContext';
import profile from '../../content/profile.json';
import {
  getCardPosition,
  CARD_W,
  CARD_H,
  TOTAL_SECTIONS,
  ACCENT_COLORS,
  SECTION_LABELS,
} from '../../utils/cardLayout';

// Asset imports — used as WebGL textures (no HTML/CSS involved)
import ME         from '../../assets/me.png';
import ME_ABOUT   from '../../assets/me-about.png';
import IMG_SOT    from '../../assets/sot.png';
import IMG_CAMS   from '../../assets/CAMS.png';
import IMG_BERT   from '../../assets/bert.jpg';
import IMG_MAGESH from '../../assets/magesh.jpg';
import IMG_ARYAN  from '../../assets/aryan.jpg';
import IMG_SAM    from '../../assets/sam.jpg';
import IMG_ANIRBAN from '../../assets/anirban.jpg';

// ── Testimonials data (compact, fits 3D card preview) ──────────────────────────
const T_SRCS   = [IMG_MAGESH, IMG_BERT,      IMG_ARYAN,              IMG_SAM,                    IMG_ANIRBAN];
const T_NAMES  = ['Magesh',  'Bert Curtis',  'Aryan Basak',          'Sammuel Syphrett',         'Anirban Dutta'];
const T_ROLES  = ['QA Lead, Fidelity', 'Senior SDET', 'PM @ Utah Tech Labs', 'Supervisor',     'Python Data Engineer'];
const T_QUOTES = [
  '"highly skilled, dedicated professional - problem-solving sets them apart"',
  '"consistently demonstrates a passion for learning and problem-solving"',
  '"drives projects to successful completion - truly impressive"',
  '"exceptional leadership and humility - invaluable asset"',
  '"great team player, always keeps the team spirit high"',
];

const DEPTH  = 0.12;
const RADIUS = 0.05;
const FACE_Z = DEPTH / 2 + 0.003; // just in front of the card face
const HERO_NAME_STACK = profile.name.split(' ').join('\n');
const HERO_HEADLINE_STACK_CARD = profile.headlineDisplayLines.slice(0, 2).join('\n');
const VIDEO_STUDIO_POSTER =
  `${process.env.PUBLIC_URL || ''}/video-studio/video-studio-showcase-poster.png`;
const VIDEO_STUDIO_REEL =
  `${process.env.PUBLIC_URL || ''}/video-studio/video-studio-sizzle-39s.mp4`;

function asMultilineText(value, fallback = '') {
  return Array.isArray(value) ? value.join('\n') : String(value || fallback);
}

const STRIPE_H = 0.07;
const STRIPE_Y = CARD_H / 2 - STRIPE_H / 2;    // ≈ 0.865
const LABEL_Y  = CARD_H / 2 - STRIPE_H - 0.11; // ≈ 0.72

// ── Texture plane helper — circle or rect ──────────────────────────────────────
function PhotoPlane({ src, pos, w, h, circle }) {
  const tex = useTexture(src);
  return (
    <mesh position={pos}>
      {circle
        ? <circleGeometry args={[w / 2, 48]} />
        : <planeGeometry args={[w, h]} />}
      <meshBasicMaterial map={tex} transparent />
    </mesh>
  );
}

function VideoPlane({ src, poster, pos, w, h }) {
  const texture = useVideoTexture(src, {
    muted: true,
    loop: true,
    playsInline: true,
    poster,
    preload: 'metadata',
    unsuspend: 'loadeddata',
  });

  useEffect(() => () => {
    texture.image.pause();
    texture.dispose();
  }, [texture]);

  return (
    <mesh position={pos}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReducedMotion(event.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  return reducedMotion;
}

function VideoStudioPlane(props) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <PhotoPlane src={VIDEO_STUDIO_POSTER} {...props} />;
  }

  return (
    <VideoPlane
      src={VIDEO_STUDIO_REEL}
      poster={VIDEO_STUDIO_POSTER}
      {...props}
    />
  );
}

// ── Shared card header (accent stripe + section label) ─────────────────────────
function CardHeader({ label, c }) {
  return (
    <>
      <mesh position={[0, STRIPE_Y, FACE_Z - 0.001]}>
        <planeGeometry args={[CARD_W, STRIPE_H]} />
        <meshBasicMaterial color={c} />
      </mesh>
      <Text
        position={[0, LABEL_Y, FACE_Z]}
        fontSize={0.1}
        color={c}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {label.toUpperCase()}
      </Text>
    </>
  );
}

// ── Testimonials carousel (3D card) ───────────────────────────────────────────
// Inner: uses useTexture (needs Suspense above it) + cycling state
function TestimonialsInner({ c }) {
  const textures = useTexture(T_SRCS);   // preloads all 5 photos at once
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % T_SRCS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Photo — key forces material recreate so texture swap is immediate */}
      <mesh position={[-0.88, 0.08, FACE_Z]}>
        <circleGeometry args={[0.22, 48]} />
        <meshBasicMaterial key={idx} map={textures[idx]} transparent />
      </mesh>
      <Text position={[-0.54, 0.30, FACE_Z]} fontSize={0.12} color="#111"
            anchorX="left" anchorY="middle" maxWidth={1.82}>
        {T_NAMES[idx]}
      </Text>
      <Text position={[-0.54, 0.11, FACE_Z]} fontSize={0.09} color="#888"
            anchorX="left" anchorY="middle" maxWidth={1.82}>
        {T_ROLES[idx]}
      </Text>
      <Text position={[0, -0.18, FACE_Z]} fontSize={0.1} color="#444"
            anchorX="center" anchorY="top" maxWidth={2.55} textAlign="center" lineHeight={1.55}>
        {T_QUOTES[idx]}
      </Text>
      {/* Dot indicators */}
      {T_SRCS.map((_, i) => (
        <mesh key={i} position={[-0.28 + i * 0.14, -0.73, FACE_Z]}>
          <circleGeometry args={[i === idx ? 0.052 : 0.035, 16]} />
          <meshBasicMaterial color={i === idx ? c : '#cccccc'} />
        </mesh>
      ))}
    </>
  );
}

function TestimonialsCard3D({ c }) {
  return (
    <>
      <CardHeader label={SECTION_LABELS[9]} c={c} />
      <Suspense fallback={null}>
        <TestimonialsInner c={c} />
      </Suspense>
    </>
  );
}

// ── Per-section face content ───────────────────────────────────────────────────
function CardFace({ index, c }) {
  const label = SECTION_LABELS[index];
  const CY = 0.1; // vertical center of the content area

  switch (index) {
    // ── 0: Hello ──────────────────────────────────────────────────────────────
    case 0:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Suspense fallback={null}>
            <PhotoPlane src={ME} pos={[-0.7, CY + 0.05, FACE_Z]} w={0.72} h={0.72} circle />
          </Suspense>
          <Text position={[0.3, CY + 0.36, FACE_Z]} fontSize={0.17} color="#111"
                anchorX="center" anchorY="middle" maxWidth={1.4} textAlign="center">
            {HERO_NAME_STACK}
          </Text>
          <Text position={[0.3, CY - 0.08, FACE_Z]} fontSize={0.074} color="#666"
                anchorX="center" anchorY="middle" maxWidth={1.4} textAlign="center" lineHeight={1.5}>
            {HERO_HEADLINE_STACK_CARD}
          </Text>
        </>
      );

    // ── 1: Tagline ─────────────────────────────────────────────────────────────
    case 1:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Text position={[0, CY + 0.08, FACE_Z]} fontSize={0.14} color="#111"
                anchorX="center" anchorY="middle" maxWidth={2.55} textAlign="center" lineHeight={1.45}>
            {HERO_HEADLINE_STACK_CARD}
          </Text>
        </>
      );

    // ── 2: About Me ────────────────────────────────────────────────────────────
    case 2:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Suspense fallback={null}>
            <PhotoPlane src={ME_ABOUT} pos={[-0.7, CY + 0.05, FACE_Z]} w={0.72} h={0.72} circle />
          </Suspense>
          <Text position={[0.3, CY + 0.28, FACE_Z]} fontSize={0.14} color="#111"
                anchorX="center" anchorY="middle" maxWidth={1.45} textAlign="center" lineHeight={1.35}>
            {asMultilineText(profile.spatialCards.aboutPrimary)}
          </Text>
          <Text position={[0.3, CY - 0.24, FACE_Z]} fontSize={0.085} color="#555"
                anchorX="center" anchorY="middle" maxWidth={1.45} textAlign="center" lineHeight={1.45}>
            {asMultilineText(profile.spatialCards.aboutSecondary)}
          </Text>
        </>
      );

    // ── 3: Strengths ───────────────────────────────────────────────────────────
    case 3:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Text position={[0, CY + 0.08, FACE_Z]} fontSize={0.11} color="#333"
                anchorX="center" anchorY="middle" maxWidth={2.55} textAlign="center" lineHeight={1.65}>
            {asMultilineText(profile.spatialCards.strengths)}
          </Text>
        </>
      );

    // ── 4: Experience ──────────────────────────────────────────────────────────
    case 4:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Text position={[0, CY + 0.1, FACE_Z]} fontSize={0.13} color="#333"
                anchorX="center" anchorY="middle" maxWidth={2.5} textAlign="center" lineHeight={1.8}>
            {asMultilineText(profile.spatialCards.experience)}
          </Text>
        </>
      );

    // ── 5: Services / Tools ────────────────────────────────────────────────────
    case 5:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Text position={[0, CY + 0.1, FACE_Z]} fontSize={0.13} color="#333"
                anchorX="center" anchorY="middle" maxWidth={2.5} textAlign="center" lineHeight={1.8}>
            {asMultilineText(profile.spatialCards.tools)}
          </Text>
        </>
      );

    // ── 6: Mobile Apps ─────────────────────────────────────────────────────────
    case 6:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Suspense fallback={null}>
            <PhotoPlane src={IMG_SOT} pos={[0, CY - 0.04, FACE_Z]} w={2.42} h={1.12} />
          </Suspense>
          <Text position={[0, -0.77, FACE_Z]} fontSize={0.1} color="#333"
                anchorX="center" anchorY="middle">
            Seeds of Thyme · Essential Life
          </Text>
        </>
      );

    // ── 7: Platforms ───────────────────────────────────────────────────────────
    case 7:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Suspense fallback={null}>
            <PhotoPlane src={IMG_CAMS} pos={[0, CY - 0.04, FACE_Z]} w={2.42} h={1.12} />
          </Suspense>
          <Text position={[0, -0.77, FACE_Z]} fontSize={0.1} color="#333"
                anchorX="center" anchorY="middle">
            CAMS ATM · Safety Wallet
          </Text>
        </>
      );

    // ── 8: AI Work ─────────────────────────────────────────────────────────────
    case 8:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Suspense fallback={null}>
            <VideoStudioPlane
              pos={[0, CY - 0.04, FACE_Z]}
              w={2.42}
              h={1.12}
            />
          </Suspense>
          <Text position={[0, -0.77, FACE_Z]} fontSize={0.1} color="#333"
                anchorX="center" anchorY="middle">
            Video Studio · Vega · LLM/RAG
          </Text>
        </>
      );

    // ── 9: Testimonials — live cycling carousel ────────────────────────────────
    case 9:
      return <TestimonialsCard3D c={c} />;

    // ── 10: Contact ────────────────────────────────────────────────────────────
    case 10:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Text position={[0, CY + 0.24, FACE_Z]} fontSize={0.25} color="#111"
                anchorX="center" anchorY="middle" textAlign="center">
            {"Let's Connect"}
          </Text>
          <Text position={[0, CY - 0.22, FACE_Z]} fontSize={0.11} color="#777"
                anchorX="center" anchorY="middle" maxWidth={2.3} textAlign="center">
            {asMultilineText(profile.spatialCards.contact)}
          </Text>
        </>
      );

    // ── 11: Connect ────────────────────────────────────────────────────────────
    case 11:
      return (
        <>
          <CardHeader label={label} c={c} />
          <Text position={[0, CY + 0.28, FACE_Z]} fontSize={0.2} color="#111"
                anchorX="center" anchorY="middle" textAlign="center">
            {"Let's Work\nTogether"}
          </Text>
          <Text position={[0, CY - 0.24, FACE_Z]} fontSize={0.1} color="#666"
                anchorX="center" anchorY="middle" maxWidth={2.3} textAlign="center">
            {asMultilineText(profile.spatialCards.connect)}
          </Text>
        </>
      );

    default:
      return <CardHeader label={label} c={c} />;
  }
}

// ── Individual card — hover pop + click to zoom ────────────────────────────────
function SectionCard({ index, onSelect }) {
  const innerRef = useRef();
  const matRef   = useRef();
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => getCardPosition(index), [index]);
  const c   = ACCENT_COLORS[index] ?? '#888';

  useFrame((state, delta) => {
    if (!innerRef.current) return;
    // Bigger pop: more z-push and scale on hover
    easing.damp(innerRef.current.position, 'z', hovered ? 0.55 : 0, 0.12, delta);
    const sc = hovered ? 1.10 : 1.0;
    easing.damp(innerRef.current.scale, 'x', sc, 0.10, delta);
    easing.damp(innerRef.current.scale, 'y', sc, 0.10, delta);
    // Idle breathing glow — each card phase-shifted so they pulse out of sync
    if (matRef.current) {
      const phase = state.clock.getElapsedTime() * 0.7 + index * 0.55;
      const idle = (Math.sin(phase) * 0.5 + 0.5) * 0.10;
      const target = hovered ? 0.70 : idle;
      easing.damp(matRef.current, 'emissiveIntensity', target, 0.10, delta);
    }
  });

  return (
    <group position={pos}>
      <group ref={innerRef}>

        {/* ── 3D card body — white glass slab ── */}
        <RoundedBox
          args={[CARD_W, CARD_H, DEPTH]}
          radius={RADIUS}
          smoothness={3}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
        >
          <meshStandardMaterial
            ref={matRef}
            color="#f7f8ff"
            roughness={0.06}
            metalness={0.03}
            transparent
            opacity={0.69}
            emissive={c}
            emissiveIntensity={0}
          />
        </RoundedBox>

        {/* ── Three.js-native face content (Text + textures) ── */}
        <CardFace index={index} c={c} />

      </group>
    </group>
  );
}

// ── Grid root ──────────────────────────────────────────────────────────────────
export default function SpatialGrid() {
  const { zoomToSection, isOverview } = useScroll();

  return (
    <PresentationControls
      enabled={isOverview}
      global={false}
      polar={[-Math.PI / 10, Math.PI / 10]}
      azimuth={[-Math.PI / 6, Math.PI / 6]}
      speed={1.4}
      zoom={1}
      snap={{ mass: 4, tension: 400 }}
    >
      <group>
        {Array.from({ length: TOTAL_SECTIONS }, (_, i) => (
          <SectionCard key={i} index={i} onSelect={zoomToSection} />
        ))}
      </group>
    </PresentationControls>
  );
}
