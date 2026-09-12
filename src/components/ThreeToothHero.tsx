/**
 * Premium Interactive 3D Dental Experience
 * Same WebGL experience on desktop and mobile, with mobile-safe rendering lifecycle.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ShieldCheck } from 'lucide-react';

type MaterialMode = 'enamel' | 'champagne_gold' | 'cad_wireframe';

export const ThreeToothHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [materialMode, setMaterialMode] = useState<MaterialMode>('enamel');
  const [isRotating, setIsRotating] = useState(true);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const isRotatingRef = useRef(isRotating);
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  const materialsRef = useRef<{
    enamel: THREE.MeshPhysicalMaterial;
    gold: THREE.MeshPhysicalMaterial;
    wireframe: THREE.MeshBasicMaterial;
  } | null>(null);
  const toothMeshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? 'default' : 'high-performance',
        preserveDrawingBuffer: false,
        depth: true,
        stencil: false,
      });
    } catch (error) {
      console.warn('WebGL context could not be initialized:', error);
      setWebGlSupported(false);
      return;
    }

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);
    const pixelRatio = isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.25)
      : Math.min(window.devicePixelRatio || 1, 2);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.touchAction = 'pan-y';
    canvas.style.transform = 'translateZ(0)';
    canvas.style.backfaceVisibility = 'hidden';
    container.style.isolation = 'isolate';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d11, 0.04);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.8);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff3dc, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7ec8e3, 3.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const bounceLight = new THREE.PointLight(0xc5a059, 1.8, 10);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2.2, 12, Math.PI / 6, 0.4);
    spotLight.position.set(0, 6, 2);
    scene.add(spotLight);

    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfdfaf4,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.12,
      transmission: 0.12,
      ior: 1.54,
      reflectivity: 0.8,
      sheen: 0.35,
      sheenColor: new THREE.Color(0xf1e4c3),
    });

    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      roughness: 0.24,
      metalness: 0.88,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
      reflectivity: 0.95,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

    const accentRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x473815,
      emissiveIntensity: 0.3,
    });

    materialsRef.current = {
      enamel: enamelMaterial,
      gold: goldMaterial,
      wireframe: wireframeMaterial,
    };

    const toothGroup = new THREE.Group();
    const meshes: THREE.Mesh[] = [];

    const crownGeo = new THREE.CylinderGeometry(0.92, 0.72, 1.05, 32, 16);
    const pos = crownGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      if (y > 0.2) {
        const cuspFactor = Math.sin(x * 3.8) * Math.sin(z * 3.8) * 0.16;
        const valley = (Math.pow(x, 2) + Math.pow(z, 2)) * -0.08;
        pos.setY(i, y + cuspFactor + valley);
      }

      const angle = Math.atan2(z, x);
      const bulge = Math.sin(angle * 4) * 0.08;
      pos.setX(i, x * (1 + bulge));
      pos.setZ(i, z * (1 + bulge));
    }
    crownGeo.computeVertexNormals();

    const crownMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    crownMesh.position.y = 0.45;
    toothGroup.add(crownMesh);
    meshes.push(crownMesh);

    const occlusalGeo = new THREE.SphereGeometry(
      0.85,
      32,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.32,
    );
    const occlusalMesh = new THREE.Mesh(occlusalGeo, enamelMaterial);
    occlusalMesh.position.y = 0.88;
    occlusalMesh.scale.set(1.08, 0.45, 1.08);
    toothGroup.add(occlusalMesh);
    meshes.push(occlusalMesh);

    const collarGeo = new THREE.TorusGeometry(0.72, 0.065, 16, 48);
    const collarMesh = new THREE.Mesh(collarGeo, accentRingMaterial);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = -0.08;
    toothGroup.add(collarMesh);

    const root1Geo = new THREE.ConeGeometry(0.38, 1.45, 24, 16);
    const rPos1 = root1Geo.attributes.position;
    for (let i = 0; i < rPos1.count; i++) {
      const y = rPos1.getY(i);
      const curve = Math.sin((y + 0.7) * 1.5) * 0.12;
      rPos1.setX(i, rPos1.getX(i) + curve);
    }
    root1Geo.computeVertexNormals();

    const root1Mesh = new THREE.Mesh(root1Geo, enamelMaterial);
    root1Mesh.rotation.z = Math.PI - 0.14;
    root1Mesh.rotation.x = 0.08;
    root1Mesh.position.set(-0.32, -0.85, 0.05);
    toothGroup.add(root1Mesh);
    meshes.push(root1Mesh);

    const root2Geo = new THREE.ConeGeometry(0.36, 1.4, 24, 16);
    const rPos2 = root2Geo.attributes.position;
    for (let i = 0; i < rPos2.count; i++) {
      const y = rPos2.getY(i);
      const curve = -Math.sin((y + 0.7) * 1.6) * 0.14;
      rPos2.setX(i, rPos2.getX(i) + curve);
    }
    root2Geo.computeVertexNormals();

    const root2Mesh = new THREE.Mesh(root2Geo, enamelMaterial);
    root2Mesh.rotation.z = Math.PI + 0.15;
    root2Mesh.rotation.x = -0.06;
    root2Mesh.position.set(0.34, -0.82, -0.05);
    toothGroup.add(root2Mesh);
    meshes.push(root2Mesh);

    toothMeshesRef.current = meshes;

    const orbitGeo = new THREE.TorusGeometry(1.6, 0.012, 16, 80);
    const orbitMesh = new THREE.Mesh(orbitGeo, accentRingMaterial);
    orbitMesh.rotation.x = Math.PI / 2.3;
    orbitMesh.position.y = 0.15;
    toothGroup.add(orbitMesh);

    const orbitMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      transparent: true,
      opacity: 0.25,
    });
    const orbitGeo2 = new THREE.TorusGeometry(1.85, 0.008, 16, 80);
    const orbitMesh2 = new THREE.Mesh(orbitGeo2, orbitMaterial2);
    orbitMesh2.rotation.x = -Math.PI / 2.6;
    orbitMesh2.position.y = 0.1;
    toothGroup.add(orbitMesh2);

    scene.add(toothGroup);

    const particlesCount = isMobile ? 40 : 75;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe6c875,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    setIsLoaded(true);

    let targetRotationX = 0.15;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.3;
    };

    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) handlePointerMove(touch.clientX, touch.clientY);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resizeObserver.observe(container);

    let isPageVisible = !document.hidden;
    let isInViewport = true;
    let isScrolling = false;
    let scrollStopTimer = 0;
    let animationFrameId = 0;
    let lastFrameTime = performance.now();
    let elapsed = 0;

    const shouldRender = () => isPageVisible && isInViewport && !isScrolling;

    const renderFrame = () => {
      if (!shouldRender()) return;
      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      if (!shouldRender()) return;

      elapsed += delta;

      if (isRotatingRef.current) {
        targetRotationY += 0.35 * delta;
      }

      toothGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;
      toothGroup.rotation.y +=
        (targetRotationY + mouseX - toothGroup.rotation.y) * 0.06;
      toothGroup.rotation.x +=
        (targetRotationX - mouseY - toothGroup.rotation.x) * 0.06;

      orbitMesh.rotation.z = elapsed * 0.4;
      orbitMesh2.rotation.z = -elapsed * 0.25;
      particles.rotation.y = elapsed * 0.04;

      renderer.render(scene, camera);
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      lastFrameTime = performance.now();
      if (isPageVisible) renderFrame();
    };

    const handleScroll = () => {
      if (!isMobile) return;
      isScrolling = true;
      window.clearTimeout(scrollStopTimer);
      scrollStopTimer = window.setTimeout(() => {
        isScrolling = false;
        lastFrameTime = performance.now();
        renderFrame();
      }, 120);
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInViewport = Boolean(entry?.isIntersecting);
        lastFrameTime = performance.now();
        if (isInViewport) renderFrame();
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(container);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationFrameId);
    };

    const handleContextRestored = () => {
      lastFrameTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (isMobile) window.addEventListener('scroll', handleScroll, { passive: true });

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.clearTimeout(scrollStopTimer);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (isMobile) window.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      if (canvas.parentNode === container) container.removeChild(canvas);

      crownGeo.dispose();
      occlusalGeo.dispose();
      collarGeo.dispose();
      root1Geo.dispose();
      root2Geo.dispose();
      orbitGeo.dispose();
      orbitGeo2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      enamelMaterial.dispose();
      goldMaterial.dispose();
      wireframeMaterial.dispose();
      accentRingMaterial.dispose();
      orbitMaterial2.dispose();
      renderer.dispose();

      materialsRef.current = null;
      toothMeshesRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!materialsRef.current || toothMeshesRef.current.length === 0) return;

    const mats = materialsRef.current;
    let selectedMat: THREE.Material = mats.enamel;

    if (materialMode === 'champagne_gold') selectedMat = mats.gold;
    if (materialMode === 'cad_wireframe') selectedMat = mats.wireframe;

    toothMeshesRef.current.forEach((mesh) => {
      mesh.material = selectedMat;
    });
  }, [materialMode]);

  return (
    <div className="relative w-full h-[480px] lg:h-[580px] flex items-center justify-center select-none overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#C5A059]/10 via-[#C5A059]/5 to-transparent blur-3xl pointer-events-none" />
      </div>

      {webGlSupported ? (
        <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A059]">
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
                <span>Calibrating 3D Diagnostics...</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#12151B]/60 rounded-3xl border border-white/5">
          <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-[#C5A059]/20 to-transparent flex items-center justify-center border border-[#C5A059]/30">
            <ShieldCheck className="w-10 h-10 text-[#C5A059]" />
          </div>
          <p className="font-serif text-xl text-white font-medium">Precision Architectural Dentistry</p>
          <p className="text-sm text-slate-400 mt-1 max-w-xs">Hospital-grade sterilization & digital clinical protocols in Panvel.</p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 flex flex-wrap items-center justify-center sm:justify-end gap-2 text-xs z-10">
        <div className="inline-flex items-center bg-[#12151B]/85 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 shadow-xl space-x-1">
          <button
            id="view-enamel-btn"
            type="button"
            onClick={() => setMaterialMode('enamel')}
            className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${
              materialMode === 'enamel' ? 'bg-[#C5A059] text-[#0B0D11]' : 'text-slate-300 hover:text-white'
            }`}
            title="Ceramic Enamel Rendering"
          >
            Enamel
          </button>
          <button
            id="view-gold-btn"
            type="button"
            onClick={() => setMaterialMode('champagne_gold')}
            className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${
              materialMode === 'champagne_gold' ? 'bg-[#C5A059] text-[#0B0D11]' : 'text-slate-300 hover:text-white'
            }`}
            title="Noble Alloy Restoration"
          >
            Gold Alloy
          </button>
          <button
            id="view-cad-btn"
            type="button"
            onClick={() => setMaterialMode('cad_wireframe')}
            className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${
              materialMode === 'cad_wireframe' ? 'bg-[#C5A059] text-[#0B0D11]' : 'text-slate-300 hover:text-white'
            }`}
            title="CAD Wireframe Diagnostics"
          >
            CAD
          </button>

          <div className="w-[1px] h-3.5 bg-white/10 mx-1" />

          <button
            id="toggle-rotation-btn"
            type="button"
            onClick={() => setIsRotating((value) => !value)}
            className={`p-1 rounded-full transition-all ${
              isRotating ? 'text-[#C5A059]' : 'text-slate-400 hover:text-white'
            }`}
            title={isRotating ? 'Pause Rotation' : 'Resume Auto Rotation'}
            aria-label="Toggle 3D Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>

      <div className="absolute top-6 left-6 hidden sm:flex items-center space-x-2 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]/80 font-mono">
          Interactive 3D Molar Anatomy • Real-time PBR
        </span>
      </div>
    </div>
  );
};
