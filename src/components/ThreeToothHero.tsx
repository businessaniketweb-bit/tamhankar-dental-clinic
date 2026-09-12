import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ShieldCheck } from 'lucide-react';

type MaterialMode = 'enamel' | 'champagne_gold' | 'cad_wireframe';

/**
 * Premium dental hero.
 * Desktop/tablet: lightweight Three.js model.
 * Mobile: GPU-safe SVG/CSS presentation with zero WebGL rendering.
 */
export const ThreeToothHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [materialMode, setMaterialMode] = useState<MaterialMode>('enamel');
  const [isRotating, setIsRotating] = useState(true);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isRotatingRef = useRef(isRotating);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsLoaded(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (error) {
      console.warn('WebGL context could not be initialized:', error);
      setWebGlSupported(false);
      return;
    }

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    renderer.setSize(width, height, false);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.touchAction = 'pan-y';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d11, 0.035);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 4.8);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const keyLight = new THREE.DirectionalLight(0xfff3dc, 2.4);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7ec8e3, 2.4);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const bounceLight = new THREE.PointLight(0xc5a059, 1.4, 10);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    const enamelMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfaf4,
      roughness: 0.2,
      metalness: 0.03,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.88,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

    const accentRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.85,
      roughness: 0.28,
      emissive: 0x33270f,
      emissiveIntensity: 0.25,
    });

    const toothGroup = new THREE.Group();
    const meshes: THREE.Mesh[] = [];

    const crownGeo = new THREE.CylinderGeometry(0.92, 0.72, 1.05, 24, 10);
    const pos = crownGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      if (y > 0.2) {
        const cuspFactor = Math.sin(x * 3.8) * Math.sin(z * 3.8) * 0.14;
        const valley = (x * x + z * z) * -0.07;
        pos.setY(i, y + cuspFactor + valley);
      }
      const angle = Math.atan2(z, x);
      const bulge = Math.sin(angle * 4) * 0.06;
      pos.setX(i, x * (1 + bulge));
      pos.setZ(i, z * (1 + bulge));
    }
    crownGeo.computeVertexNormals();

    const crownMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    crownMesh.position.y = 0.45;
    toothGroup.add(crownMesh);
    meshes.push(crownMesh);

    const occlusalGeo = new THREE.SphereGeometry(0.85, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.32);
    const occlusalMesh = new THREE.Mesh(occlusalGeo, enamelMaterial);
    occlusalMesh.position.y = 0.88;
    occlusalMesh.scale.set(1.08, 0.45, 1.08);
    toothGroup.add(occlusalMesh);
    meshes.push(occlusalMesh);

    const collarGeo = new THREE.TorusGeometry(0.72, 0.065, 10, 32);
    const collarMesh = new THREE.Mesh(collarGeo, accentRingMaterial);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = -0.08;
    toothGroup.add(collarMesh);

    const root1Geo = new THREE.ConeGeometry(0.38, 1.45, 16, 10);
    const rPos1 = root1Geo.attributes.position;
    for (let i = 0; i < rPos1.count; i++) {
      const y = rPos1.getY(i);
      rPos1.setX(i, rPos1.getX(i) + Math.sin((y + 0.7) * 1.5) * 0.1);
    }
    root1Geo.computeVertexNormals();
    const root1Mesh = new THREE.Mesh(root1Geo, enamelMaterial);
    root1Mesh.rotation.z = Math.PI - 0.14;
    root1Mesh.rotation.x = 0.08;
    root1Mesh.position.set(-0.32, -0.85, 0.05);
    toothGroup.add(root1Mesh);
    meshes.push(root1Mesh);

    const root2Geo = new THREE.ConeGeometry(0.36, 1.4, 16, 10);
    const rPos2 = root2Geo.attributes.position;
    for (let i = 0; i < rPos2.count; i++) {
      const y = rPos2.getY(i);
      rPos2.setX(i, rPos2.getX(i) - Math.sin((y + 0.7) * 1.6) * 0.11);
    }
    root2Geo.computeVertexNormals();
    const root2Mesh = new THREE.Mesh(root2Geo, enamelMaterial);
    root2Mesh.rotation.z = Math.PI + 0.15;
    root2Mesh.rotation.x = -0.06;
    root2Mesh.position.set(0.34, -0.82, -0.05);
    toothGroup.add(root2Mesh);
    meshes.push(root2Mesh);

    const orbitGeo = new THREE.TorusGeometry(1.6, 0.012, 8, 48);
    const orbitMesh = new THREE.Mesh(orbitGeo, accentRingMaterial);
    orbitMesh.rotation.x = Math.PI / 2.3;
    orbitMesh.position.y = 0.15;
    toothGroup.add(orbitMesh);

    const orbitMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      transparent: true,
      opacity: 0.2,
    });
    const orbitGeo2 = new THREE.TorusGeometry(1.85, 0.008, 8, 48);
    const orbitMesh2 = new THREE.Mesh(orbitGeo2, orbitMaterial2);
    orbitMesh2.rotation.x = -Math.PI / 2.6;
    orbitMesh2.position.y = 0.1;
    toothGroup.add(orbitMesh2);

    scene.add(toothGroup);

    const particlesCount = 35;
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
      size: 0.03,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    setIsLoaded(true);

    let targetRotationX = 0.15;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.35;
      mouseY = (-(((e.clientY - rect.top) / rect.height) * 2 - 1)) * 0.25;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

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

    let animationFrameId = 0;
    let lastFrameTime = performance.now();
    let elapsed = 0;

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;
      elapsed += delta;

      if (isRotatingRef.current) targetRotationY += 0.3 * delta;

      toothGroup.position.y = Math.sin(elapsed * 1.1) * 0.07;
      toothGroup.rotation.y += (targetRotationY + mouseX - toothGroup.rotation.y) * 0.055;
      toothGroup.rotation.x += (targetRotationX - mouseY - toothGroup.rotation.x) * 0.055;
      orbitMesh.rotation.z = elapsed * 0.35;
      orbitMesh2.rotation.z = -elapsed * 0.22;
      particles.rotation.y = elapsed * 0.035;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      if (canvas.parentNode === container) container.removeChild(canvas);

      crownGeo.dispose();
      occlusalGeo.dispose();
      collarGeo.dispose();
      root1Geo.dispose();
      root2Geo.dispose();
      orbitGeo.dispose();
      orbitGeo2.dispose();
      particleGeo.dispose();
      enamelMaterial.dispose();
      goldMaterial.dispose();
      wireframeMaterial.dispose();
      accentRingMaterial.dispose();
      orbitMaterial2.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  const setMode = (mode: MaterialMode) => setMaterialMode(mode);

  return (
    <div className="relative w-full h-[430px] sm:h-[480px] lg:h-[580px] flex items-center justify-center select-none overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#C5A059]/10 via-[#C5A059]/5 to-transparent blur-3xl" />
      </div>

      {isMobile ? (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute w-[270px] h-[270px] rounded-full border border-[#C5A059]/10" />
          <div className="absolute w-[215px] h-[215px] rounded-full border border-[#C5A059]/10 rotate-12" />
          <div className="absolute w-[170px] h-[170px] rounded-full bg-[#C5A059]/5 blur-2xl" />

          <div className={`relative transition-transform duration-700 ${isRotating ? 'animate-[toothFloat_4s_ease-in-out_infinite]' : ''}`}>
            <svg width="190" height="245" viewBox="0 0 190 245" aria-label="Premium dental crown illustration" role="img">
              <defs>
                <linearGradient id="mobileTooth" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={materialMode === 'champagne_gold' ? '#F3DC9B' : '#FFFFFF'} />
                  <stop offset="48%" stopColor={materialMode === 'champagne_gold' ? '#C5A059' : '#F7F4EC'} />
                  <stop offset="100%" stopColor={materialMode === 'champagne_gold' ? '#7E6125' : '#BFC4C8'} />
                </linearGradient>
                <filter id="toothGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <ellipse cx="95" cy="226" rx="48" ry="8" fill="#C5A059" opacity=".12" />
              <path
                d="M43 65 C47 34 67 20 95 20 C123 20 143 34 147 65 L151 104 C153 121 142 139 129 148 L122 205 C120 220 109 229 95 229 C81 229 70 220 68 205 L61 148 C48 139 37 121 39 104 Z"
                fill="url(#mobileTooth)"
                stroke="#C5A059"
                strokeOpacity=".45"
                strokeWidth="1.5"
                filter="url(#toothGlow)"
              />
              <path d="M51 72 C66 59 79 64 95 77 C111 64 124 59 139 72" fill="none" stroke="#C5A059" strokeOpacity=".35" strokeWidth="2" />
              <path d="M61 105 C74 93 83 98 95 110 C107 98 116 93 129 105" fill="none" stroke="#C5A059" strokeOpacity=".28" strokeWidth="2" />
              <ellipse cx="95" cy="78" rx="43" ry="18" fill="none" stroke="#C5A059" strokeOpacity=".3" strokeWidth="2" />
              {materialMode === 'cad_wireframe' && (
                <g fill="none" stroke="#C5A059" strokeOpacity=".55" strokeWidth="1">
                  <path d="M43 65 C70 82 120 82 147 65" />
                  <path d="M39 104 C68 116 122 116 151 104" />
                  <path d="M61 148 C82 158 108 158 129 148" />
                  <path d="M68 205 C82 195 108 195 122 205" />
                </g>
              )}
            </svg>
          </div>

          <div className="absolute top-7 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.22em] text-[#C5A059]/80 whitespace-nowrap">
            Precision Dental Anatomy
          </div>
        </div>
      ) : webGlSupported ? (
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

      <div className="absolute bottom-4 left-3 right-3 sm:left-auto sm:right-6 flex flex-wrap items-center justify-center sm:justify-end gap-2 text-xs z-10">
        <div className="inline-flex items-center bg-[#12151B]/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 shadow-xl space-x-1">
          <button type="button" onClick={() => setMode('enamel')} className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${materialMode === 'enamel' ? 'bg-[#C5A059] text-[#0B0D11]' : 'text-slate-300 hover:text-white'}`}>Enamel</button>
          <button type="button" onClick={() => setMode('champagne_gold')} className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${materialMode === 'champagne_gold' ? 'bg-[#C5A059] text-[#0B0D11]' : 'text-slate-300 hover:text-white'}`}>Gold Alloy</button>
          <button type="button" onClick={() => setMode('cad_wireframe')} className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium ${materialMode === 'cad_wireframe' ? 'bg-[#C5A059] text-[#0B0D11]' : 'text-slate-300 hover:text-white'}`}>CAD</button>
          <div className="w-px h-3.5 bg-white/10 mx-1" />
          <button type="button" onClick={() => setIsRotating((value) => !value)} className={`p-1 rounded-full transition-all ${isRotating ? 'text-[#C5A059]' : 'text-slate-400 hover:text-white'}`} title={isRotating ? 'Pause Rotation' : 'Resume Auto Rotation'} aria-label="Toggle 3D Rotation">
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>

      <style>{`@keyframes toothFloat { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-8px) rotate(1deg); } }`}</style>
    </div>
  );
};
