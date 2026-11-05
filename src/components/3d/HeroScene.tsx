import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface HeroSceneProps {
  scrollProgress?: number; // Optional 0 to 1 normalized scroll value
}

export const HeroScene: React.FC<HeroSceneProps> = ({ scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const prefersReduced = useReducedMotionPreference();
  const scrollValueRef = useRef<number>(0);

  // Sync ref with prop if provided without re-triggering WebGL scene setup
  useEffect(() => {
    if (scrollProgress !== undefined) {
      scrollValueRef.current = scrollProgress;
    }
  }, [scrollProgress]);

  useEffect(() => {
    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL() || prefersReduced) {
      setWebglSupported(false);
      return;
    }
    setWebglSupported(true);

    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05090d, 0.035);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    // Optimized pixel ratio: 1.5 is crisp while cutting fill-rate load by over 50% on Retina displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Particle texture generator with soft optical falloff
    const createCircleTexture = (sharpness: number = 0.4) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(sharpness, 'rgba(215, 195, 255, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const sharpTexture = createCircleTexture(0.3);
    const softTexture = createCircleTexture(0.7);

    // Color Palette
    const palette = [
      new THREE.Color('#06d6d9'),
      new THREE.Color('#214cff'),
      new THREE.Color('#ff6657'),
      new THREE.Color('#d8ffff'),
      new THREE.Color('#7cfff0')
    ];

    // 2. LAYER 1: Background Distant Particles (Tuned count for buttery 60-120 FPS performance)
    const bgCount = 200;
    const bgPos = new Float32Array(bgCount * 3);
    const bgColors = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 34;     // Spanning full viewport width
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      bgPos[i * 3 + 2] = -5 - Math.random() * 10;    // Far in atmospheric depth

      const c = palette[Math.floor(Math.random() * palette.length)];
      bgColors[i * 3] = c.r;
      bgColors[i * 3 + 1] = c.g;
      bgColors[i * 3 + 2] = c.b;
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    bgGeo.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));
    const bgMat = new THREE.PointsMaterial({
      size: 0.1,
      map: softTexture,
      transparent: true,
      opacity: 0.45,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const bgPoints = new THREE.Points(bgGeo, bgMat);
    rootGroup.add(bgPoints);

    // 3. LAYER 2: Midground Particles (120 particles with medium focus)
    const midCount = 120;
    const midPos = new Float32Array(midCount * 3);
    const midColors = new Float32Array(midCount * 3);
    for (let i = 0; i < midCount; i++) {
      midPos[i * 3] = (Math.random() - 0.5) * 24;
      midPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      midPos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const c = palette[Math.floor(Math.random() * palette.length)];
      midColors[i * 3] = c.r;
      midColors[i * 3 + 1] = c.g;
      midColors[i * 3 + 2] = c.b;
    }
    const midGeo = new THREE.BufferGeometry();
    midGeo.setAttribute('position', new THREE.BufferAttribute(midPos, 3));
    midGeo.setAttribute('color', new THREE.BufferAttribute(midColors, 3));
    const midMat = new THREE.PointsMaterial({
      size: 0.18,
      map: sharpTexture,
      transparent: true,
      opacity: 0.75,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const midPoints = new THREE.Points(midGeo, midMat);
    rootGroup.add(midPoints);

    // 4. LAYER 3: Foreground Floating Particles (Crisp, larger particles with noticeable parallax)
    const fgCount = 24;
    const fgPos = new Float32Array(fgCount * 3);
    const fgColors = new Float32Array(fgCount * 3);
    for (let i = 0; i < fgCount; i++) {
      fgPos[i * 3] = (Math.random() - 0.5) * 18;
      fgPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      fgPos[i * 3 + 2] = 2.5 + Math.random() * 4.0;  // Close to camera lens

      const c = palette[i % palette.length];
      fgColors[i * 3] = c.r;
      fgColors[i * 3 + 1] = c.g;
      fgColors[i * 3 + 2] = c.b;
    }
    const fgGeo = new THREE.BufferGeometry();
    fgGeo.setAttribute('position', new THREE.BufferAttribute(fgPos, 3));
    fgGeo.setAttribute('color', new THREE.BufferAttribute(fgColors, 3));
    const fgMat = new THREE.PointsMaterial({
      size: 0.28,
      map: sharpTexture,
      transparent: true,
      opacity: 0.65,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const fgPoints = new THREE.Points(fgGeo, fgMat);
    rootGroup.add(fgPoints);

    // 5. Central 3D Sculpture Group
    const sculptureGroup = new THREE.Group();
    rootGroup.add(sculptureGroup);

    // Desktop vs Mobile positioning
    const updateSculpturePosition = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
      sculptureGroup.position.set(0.15, 0, 0);
      sculptureGroup.scale.set(1.12, 1.12, 1.12);
      } else {
      sculptureGroup.position.set(0, 0, 0);
        sculptureGroup.scale.set(0.85, 0.85, 0.85);
      }
    };
    updateSculpturePosition();

    // Dark Faceted Polyhedron Core
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x091a1c,
      metalness: 0.92,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      transmission: 0.5,
      ior: 1.55
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    const knotGeo = new THREE.TorusKnotGeometry(1.04, 0.29, 240, 28, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x08dce0,
      metalness: 0.72,
      roughness: 0.14,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      emissive: 0x003f43,
      emissiveIntensity: 0.7
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    sculptureGroup.add(knotMesh);

    // Wireframe glowing shell
    const wireGeo = new THREE.IcosahedronGeometry(1.68, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8ffff7,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sculptureGroup.add(wireMesh);

    // Intersecting orbital rings (efficient geometry)
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.018, 12, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x06d6d9,
      roughness: 0.2,
      metalness: 0.85
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.014, 12, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff6657,
      transparent: true,
      opacity: 0.4
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    sculptureGroup.add(ring2);

    // Orbital marker nodes
    const nodeGeo = new THREE.OctahedronGeometry(0.08, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x8ffff7 });
    for (let i = 0; i < 6; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / 6) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3 * 0.5, Math.sin(angle) * 1.2);
      sculptureGroup.add(node);
    }

    // 6. Lighting with dynamic chromatic shift capability
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const violetLight = new THREE.DirectionalLight(0x06d6d9, 4.0);
    violetLight.position.set(5, 5, 5);
    scene.add(violetLight);

    const magentaLight = new THREE.DirectionalLight(0xff6657, 3.0);
    magentaLight.position.set(-4, -4, 4);
    scene.add(magentaLight);

    const cyanLight = new THREE.DirectionalLight(0x214cff, 2.0);
    cyanLight.position.set(0, -6, -2);
    scene.add(cyanLight);

    // Pointer Interactivity (interpolated across entire window)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = x * 0.4;
      mouse.targetY = y * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Passive Window Scroll Listener directly updates ref without triggering React re-renders
    const handleWindowScroll = () => {
      if (scrollProgress === undefined) {
        const scrolled = window.scrollY / Math.max(window.innerHeight, 1);
        scrollValueRef.current = Math.min(Math.max(scrolled, 0), 2);
      }
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateSculpturePosition();
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number | null = null;
    const startTime = performance.now();
    let smoothedScroll = 0;
    let isVisible = false;
    let animate: () => void;
    const scheduleFrame = () => {
      if (animationFrameId === null) animationFrameId = requestAnimationFrame(animate);
    };

    animate = () => {
      animationFrameId = null;
      if (!isVisible || document.hidden) return;

      // Performance Optimization: If scrolled past hero section, pause WebGL draw calls completely
      if (window.scrollY > window.innerHeight * 2.3) {
        return;
      }

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Scroll smoothing
      smoothedScroll += (scrollValueRef.current - smoothedScroll) * 0.08;

      // Camera push-in and subtle tilt through scroll progress
      camera.position.z = 9 - smoothedScroll * 2.8;
      camera.position.y = -smoothedScroll * 0.8;
      camera.position.x = mouse.x * 0.4;

      // Rotate central sculpture driven by time + scroll scrub
      sculptureGroup.rotation.y = elapsedTime * 0.22 + smoothedScroll * 1.8 + mouse.x * 0.5;
      sculptureGroup.rotation.x = elapsedTime * 0.12 + smoothedScroll * 0.9 - mouse.y * 0.5;
      sculptureGroup.rotation.z = smoothedScroll * 0.4;
      knotMesh.rotation.z = -elapsedTime * 0.18 + mouse.y * 0.35;

      wireMesh.rotation.y = -elapsedTime * 0.16 - smoothedScroll * 1.2;
      ring1.rotation.z = elapsedTime * 0.12 + smoothedScroll * 2.2;
      ring2.rotation.x = -elapsedTime * 0.09 - smoothedScroll * 1.5;

      // Multi-layer particle drift & parallax with depth differentiation
      bgPoints.rotation.y = elapsedTime * 0.015 + mouse.x * 0.1 + smoothedScroll * 0.2;
      midPoints.rotation.y = -elapsedTime * 0.025 + mouse.x * 0.25 + smoothedScroll * 0.5;
      fgPoints.rotation.y = elapsedTime * 0.045 + mouse.x * 0.45 + smoothedScroll * 0.9;

      bgPoints.rotation.x = -mouse.y * 0.05;
      midPoints.rotation.x = -mouse.y * 0.15 + smoothedScroll * 0.15;
      fgPoints.rotation.x = -mouse.y * 0.3 + smoothedScroll * 0.3;

      // Foreground particles drift forward as user scrolls
      fgPoints.position.z = smoothedScroll * 1.5;

      // Dynamic lighting chromatic shifts
      violetLight.intensity = 4.0 + Math.sin(elapsedTime + smoothedScroll * 2) * 0.5;
      magentaLight.intensity = 3.0 + Math.cos(elapsedTime + smoothedScroll * 2) * 0.5;

      // Gentle breathing scale
      const breathe = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
      coreMesh.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
      scheduleFrame();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !document.hidden) scheduleFrame();
    });
    observer.observe(container);
    const handleVisibility = () => {
      if (document.hidden && animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (isVisible) scheduleFrame();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    scheduleFrame();

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      bgGeo.dispose();
      bgMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      fgGeo.dispose();
      fgMat.dispose();
      sharpTexture.dispose();
      softTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
    };
  }, [prefersReduced]); // CRITICAL: Only mounts once; does not recreate scene on scroll!

  if (!webglSupported || prefersReduced) {
    return (
      <div className="hero-scene-fallback" aria-hidden="true" />
    );
  }

  return (
    <div
      ref={mountRef}
      className="hero-scene-canvas"
      role="img"
      aria-label="Interactive BackSpace 3D sculpture with animated orbiting light trails"
    />
  );
};
