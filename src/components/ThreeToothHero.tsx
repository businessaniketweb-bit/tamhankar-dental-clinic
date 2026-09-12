/**
 * Premium Interactive 3D Dental Experience
 * Renders an anatomical luxury dental crown with realistic studio lighting,
 * subtle particles, PBR materials, mouse parallax, and graceful WebGL fallback.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Layers, Sparkles, RotateCw, ShieldCheck } from 'lucide-react';

type MaterialMode = 'enamel' | 'champagne_gold' | 'cad_wireframe';

export const ThreeToothHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [materialMode, setMaterialMode] = useState<MaterialMode>('enamel');
  const [isRotating, setIsRotating] = useState(true);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Keep rotation state accessible in loop without re-triggering scene mount
  const isRotatingRef = useRef(isRotating);
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // References to three.js scene objects for dynamic updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{
    enamel: THREE.MeshPhysicalMaterial;
    gold: THREE.MeshPhysicalMaterial;
    wireframe: THREE.MeshBasicMaterial;
    accentRing: THREE.MeshStandardMaterial;
  } | null>(null);
  const toothMeshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Safe WebGL Renderer Initialization
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: true,
        stencil: false,
        depth: true,
        powerPreference: isMobile ? 'default' : 'high-performance',
        failIfMajorPerformanceCaveat: false,
      });
    } catch (e) {
      console.warn('WebGL context could not be initialized:', e);
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      isMobile
        ? Math.min(window.devicePixelRatio || 1, 1)
        : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    // 2. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0b0d11, 0.04);

    // 3. Camera Setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.8);

    // 4. Lighting Setup (Luxury Medical Studio 3-Point Light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Warm champagne key light
    const keyLight = new THREE.DirectionalLight(0xfff3dc, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Cool dental rim light
    const rimLight = new THREE.DirectionalLight(0x7ec8e3, 3.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Soft warm bounce light from below
    const bounceLight = new THREE.PointLight(0xc5a059, 1.8, 10);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // Top precision spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 2.2, 12, Math.PI / 6, 0.4);
    spotLight.position.set(0, 6, 2);
    scene.add(spotLight);

    // 5. Materials Setup
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
      accentRing: accentRingMaterial,
    };

    // 6. Sculpted Anatomical Tooth Model
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;
    const meshes: THREE.Mesh[] = [];

    // --- Crown Body: Smooth molar crown with anatomically inspired sculpted curvature
    const crownGeo = new THREE.CylinderGeometry(0.92, 0.72, 1.05, 32, 16);
    // Deform vertices to model anatomical molar grooves and cusps
    const pos = crownGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Cusp ridges on top
      if (y > 0.2) {
        const cuspFactor = Math.sin(x * 3.8) * Math.sin(z * 3.8) * 0.16;
        const valley = (Math.pow(x, 2) + Math.pow(z, 2)) * -0.08;
        pos.setY(i, y + cuspFactor + valley);
      }
      // Natural barrel contour
      const angle = Math.atan2(z, x);
      const bulge = Math.sin(angle * 4) * 0.08;
      pos.setX(i, x * (1 + bulge));
      pos.setZ(i, z * (1 + bulge));
    }
    crownGeo.computeVertexNormals();

    const crownMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    crownMesh.position.y = 0.45;
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    toothGroup.add(crownMesh);
    meshes.push(crownMesh);

    // --- Crown Cap (Glossy Occlusal Surface)
    const occlusalGeo = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.32);
    const occlusalMesh = new THREE.Mesh(occlusalGeo, enamelMaterial);
    occlusalMesh.position.y = 0.88;
    occlusalMesh.scale.set(1.08, 0.45, 1.08);
    toothGroup.add(occlusalMesh);
    meshes.push(occlusalMesh);

    // --- Cervical Margin Collar (Precision Finish Line)
    const collarGeo = new THREE.TorusGeometry(0.72, 0.065, 16, 48);
    const collarMesh = new THREE.Mesh(collarGeo, accentRingMaterial);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = -0.08;
    toothGroup.add(collarMesh);

    // --- Mesial & Distal Roots (Bi-rooted anatomical molar form)
    // Root 1 (Mesial root)
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

    // Root 2 (Distal root)
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

    // Store references to the dynamic material meshes
    toothMeshesRef.current = meshes;

    // --- Precision Studio Aura / Orbital Ring
    const orbitGeo = new THREE.TorusGeometry(1.6, 0.012, 16, 80);
    const orbitMesh = new THREE.Mesh(orbitGeo, accentRingMaterial);
    orbitMesh.rotation.x = Math.PI / 2.3;
    orbitMesh.position.y = 0.15;
    toothGroup.add(orbitMesh);

    const orbitGeo2 = new THREE.TorusGeometry(1.85, 0.008, 16, 80);
    const orbitMesh2 = new THREE.Mesh(orbitGeo2, new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      transparent: true,
      opacity: 0.25,
    }));
    orbitMesh2.rotation.x = -Math.PI / 2.6;
    orbitMesh2.position.y = 0.1;
    toothGroup.add(orbitMesh2);

    scene.add(toothGroup);

    // 7. Ambient Micro Floating Luxury Particles
    const particlesCount = 75;
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
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    setIsLoaded(true);

    // 8. Interaction: Mouse Parallax & Touch Tracking
    let targetRotationX = 0.15;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.4;
      mouseY = y * 0.3;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseX = x * 0.5;
        mouseY = y * 0.35;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 9b. Visibility gating — stop competing with the scroll compositor
    // for GPU time while the canvas is off-screen or the tab is hidden.
    // (Deliberately not toggling canvas.style.visibility on every scroll
    // tick — that combo has been known to leave stale/garbage frames on
    // some mobile GPUs. Skipping the render() call is enough.)
    let isPageVisible = !document.hidden;
    let isInViewport = true;

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInViewport = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isPageVisible || !isInViewport) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Slow floating levitation
      if (toothGroupRef.current) {
        toothGroupRef.current.position.y = Math.sin(time * 1.2) * 0.08;

        // Auto-rotation
        if (isRotatingRef.current) {
          targetRotationY += 0.35 * delta;
        }

        // Parallax damping
        toothGroupRef.current.rotation.y += (targetRotationY + mouseX - toothGroupRef.current.rotation.y) * 0.06;
        toothGroupRef.current.rotation.x += (targetRotationX - mouseY - toothGroupRef.current.rotation.x) * 0.06;

        // Orbital rings counter-rotation
        orbitMesh.rotation.z = time * 0.4;
        orbitMesh2.rotation.z = -time * 0.25;
      }

      // Slowly drift particles
      particles.rotation.y = time * 0.04;

      renderer.render(scene, camera);
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationFrameId);
    };
    const handleContextRestored = () => {
      animationFrameId = requestAnimationFrame(animate);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
      renderer.dispose();
      crownGeo.dispose();
      root1Geo.dispose();
      root2Geo.dispose();
      enamelMaterial.dispose();
      goldMaterial.dispose();
      wireframeMaterial.dispose();
      accentRingMaterial.dispose();
    };
  }, []);

  // Update materials when materialMode changes
  useEffect(() => {
    if (!materialsRef.current || toothMeshesRef.current.length === 0) return;
    const mats = materialsRef.current;
    let selectedMat: THREE.Material = mats.enamel;

    if (materialMode === 'champagne_gold') {
      selectedMat = mats.gold;
    } else if (materialMode === 'cad_wireframe') {
      selectedMat = mats.wireframe;
    }

    toothMeshesRef.current.forEach((mesh) => {
      mesh.material = selectedMat;
    });
  }, [materialMode]);

  return (
    <div className="relative w-full h-[480px] lg:h-[580px] flex items-center justify-center select-none overflow-hidden">
      {/* Studio Radial Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#C5A059]/10 via-[#C5A059]/5 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* WebGL Canvas or Fallback */}
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
        /* Graceful Fallback for non-WebGL environments */
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#12151B]/60 rounded-3xl border border-white/5">
          <div className="w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-[#C5A059]/20 to-transparent flex items-center justify-center border border-[#C5A059]/30">
            <ShieldCheck className="w-10 h-10 text-[#C5A059]" />
          </div>
          <p className="font-serif text-xl text-white font-medium">Precision Architectural Dentistry</p>
          <p className="text-sm text-slate-400 mt-1 max-w-xs">Hospital-grade sterilization & digital clinical protocols in Panvel.</p>
        </div>
      )}

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 flex flex-wrap items-center justify-center sm:justify-end gap-2 text-xs z-10">
        <div className="inline-flex items-center bg-[#12151B]/85 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 shadow-xl space-x-1">
          <button
            id="view-enamel-btn"
            type="button"
            onClick={() => setMaterialMode('enamel')}
            className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${
              materialMode === 'enamel'
                ? 'bg-[#C5A059] text-[#0B0D11]'
                : 'text-slate-300 hover:text-white'
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
              materialMode === 'champagne_gold'
                ? 'bg-[#C5A059] text-[#0B0D11]'
                : 'text-slate-300 hover:text-white'
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
              materialMode === 'cad_wireframe'
                ? 'bg-[#C5A059] text-[#0B0D11]'
                : 'text-slate-300 hover:text-white'
            }`}
            title="CAD Wireframe Diagnostics"
          >
            CAD
          </button>

          <div className="w-[1px] h-3.5 bg-white/10 mx-1" />

          <button
            id="toggle-rotation-btn"
            type="button"
            onClick={() => setIsRotating(!isRotating)}
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

      {/* Subtle Spatial Annotation Badges */}
      <div className="absolute top-6 left-6 hidden sm:flex items-center space-x-2 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]/80 font-mono">
          Interactive 3D Molar Anatomy • Real-time PBR
        </span>
      </div>
    </div>
  );
};