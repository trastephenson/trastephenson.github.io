import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uActive;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Breathing animation - only when active
    float breath = sin(uTime * 2.0) * 0.015 * uActive;
    float scale = 1.0 + breath;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos * scale, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  uniform float uActive;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    vec3 baseColor = texColor.rgb;

    // Skip sweep when inactive
    if (uActive < 0.01) {
      gl_FragColor = vec4(baseColor, texColor.a * uOpacity);
      return;
    }

    // Diagonal light sweep
    float diagonal = (vUv.x * 0.8) + vUv.y;
    float sheenPos = uActive * 2.5;
    float sheenWidth = 0.5;

    float dist = abs(diagonal - sheenPos);
    float intensity = 1.0 - smoothstep(0.0, sheenWidth, dist);
    intensity = pow(intensity, 3.0);

    // Fade sheen as uActive approaches 1
    float sheenFade = 1.0 - smoothstep(0.7, 1.0, uActive);

    // Cyan-white sheen color matching portfolio accent
    vec3 sheenColor = vec3(0.0, 0.94, 1.0) * intensity * 0.7 * sheenFade;
    vec3 finalColor = baseColor + sheenColor * texColor.a;

    gl_FragColor = vec4(finalColor, texColor.a * uOpacity);
  }
`;

const HoloCardMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uOpacity: 1,
    uActive: 0,
  },
  vertexShader,
  fragmentShader
);

// Register for JSX usage as <holoCardMaterial />
extend({ HoloCardMaterial: HoloCardMaterialImpl });

export default HoloCardMaterialImpl;
