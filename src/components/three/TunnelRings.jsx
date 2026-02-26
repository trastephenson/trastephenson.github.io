import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

// Fullscreen quad with a topographic contour-line shader,
// matching the shoe-finder demo's BG Shader aesthetic.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;

  // Simple smooth noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;
    uv *= 3.0; // scale — matches demo's "Scale: 3.0"

    float t = uTime * 0.07; // slightly faster drift for ambient life
    float h = fbm(uv + t);

    // Contour lines: thin bands at regular intervals (thickness ~0.03)
    float contour = abs(fract(h * 9.0) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.03, contour);

    // Very slow warm-to-cool pulse (~63s cycle) — barely perceptible but alive
    float pulse = sin(uTime * 0.1) * 0.5 + 0.5;
    vec3 bgColor   = mix(vec3(0.918, 0.918, 0.918), vec3(0.912, 0.912, 0.924), pulse);
    vec3 lineColor = mix(vec3(0.820, 0.820, 0.820), vec3(0.800, 0.800, 0.840), pulse);

    vec3 color = mix(bgColor, lineColor, line * 0.62);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function TunnelRings() {
  const meshRef = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uAspect: { value: window.innerWidth / window.innerHeight },
  }), []);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame(({ clock }) => {
    if (!meshRef.current || prefersReducedMotion) return;
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} raycast={() => null}>
      {/* Fullscreen quad rendered in clip space — excluded from raycasting */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
