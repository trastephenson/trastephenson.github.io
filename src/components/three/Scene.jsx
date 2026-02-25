import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScroll } from '../../context/ScrollContext';
import { SCROLL_CONFIG } from '../../hooks/useVirtualScroll';

const { SECTION_HEIGHT, TOTAL_SECTIONS } = SCROLL_CONFIG;

const TORUS_COUNT = 60;
const TORUS_SPACING = (TOTAL_SECTIONS * SECTION_HEIGHT) / TORUS_COUNT;
const TUNNEL_RADIUS = 6;
const TUBE_RADIUS = 0.12;
const PARTICLE_COUNT = 1200;
const PARTICLE_SPREAD = 14;

export default function Scene() {
  const containerRef = useRef(null);
  const { subscribe } = useScroll();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.setAttribute('role', 'img');
    renderer.domElement.setAttribute(
      'aria-label',
      'Interactive 3D tunnel visualization with glowing cyan rings. Use arrow keys or scroll to navigate.'
    );
    container.appendChild(renderer.domElement);

    // --- Scene ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.03);

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 5);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x0066aa, 0.15);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 1.8, 50);
    pointLight1.position.set(0, 0, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0066aa, 1.4, 50);
    pointLight2.position.set(0, 0, -20);
    scene.add(pointLight2);

    // --- Torus Tunnel ---
    const torusGroup = new THREE.Group();
    const toruses = [];

    for (let i = 0; i < TORUS_COUNT; i++) {
      const t = i / TORUS_COUNT;
      const color = new THREE.Color().lerpColors(
        new THREE.Color(0x00d4ff),
        new THREE.Color(0x0066aa),
        t
      );

      const geometry = new THREE.TorusGeometry(
        TUNNEL_RADIUS,
        TUBE_RADIUS,
        16,
        48
      );
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });

      const torus = new THREE.Mesh(geometry, material);
      torus.position.z = -i * TORUS_SPACING;
      torus.rotation.x = Math.PI / 2;
      torus.rotation.y = (i % 3) * 0.15;

      toruses.push({
        mesh: torus,
        baseZ: torus.position.z,
        rotationSpeed: 0.002 + (i % 5) * 0.001,
        index: i,
      });

      torusGroup.add(torus);
    }
    scene.add(torusGroup);

    // --- Particles ---
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);
    const totalDepth = TORUS_COUNT * TORUS_SPACING + 20;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = TUNNEL_RADIUS * 0.3 + Math.random() * PARTICLE_SPREAD;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -Math.random() * totalDepth;

      const col = new THREE.Color(0x00b8d4);
      const variation = 0.8 + Math.random() * 0.4;
      col.multiplyScalar(variation);
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Animation ---
    const clock = new THREE.Clock();
    let scrollValue = 0;

    const unsubscribe = subscribe((scrollCurrent) => {
      scrollValue = scrollCurrent;
    });

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      camera.position.z = 5 - scrollValue;

      if (!prefersReducedMotion) {
        camera.position.x = Math.sin(elapsed * 0.3) * 0.25;
        camera.position.y = Math.cos(elapsed * 0.4) * 0.15;
      }

      pointLight1.position.z = camera.position.z;
      pointLight2.position.z = camera.position.z - 15;

      const scrollProgress = scrollValue / SCROLL_CONFIG.MAX_SCROLL;
      const hueShift = scrollProgress * 0.08;
      pointLight1.color.setHSL(0.52 + hueShift, 0.9, 0.55);
      pointLight2.color.setHSL(0.58 + hueShift, 0.8, 0.4);

      if (!prefersReducedMotion) {
        toruses.forEach((obj) => {
          obj.mesh.rotation.z += obj.rotationSpeed;

          const dist = Math.abs(obj.mesh.position.z - camera.position.z);
          const opacity = dist < 2 ? 0.9 : Math.max(0.15, 0.9 - dist * 0.015);
          obj.mesh.material.opacity = opacity;

          obj.mesh.material.emissiveIntensity = dist < 3 ? 0.7 : Math.max(0.2, 0.7 - dist * 0.01);

          const scale = dist < 3 ? 1.0 : Math.max(0.6, 1.0 - dist * 0.008);
          obj.mesh.scale.setScalar(scale);
        });
      }

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();

      toruses.forEach((obj) => {
        obj.mesh.geometry.dispose();
        obj.mesh.material.dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [subscribe]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
