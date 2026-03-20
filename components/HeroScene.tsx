'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 10;

    // Particles
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 25;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: '#c2a4ff',
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Torus knot
    const torusGeo = new THREE.TorusKnotGeometry(2.2, 0.6, 128, 32, 2, 3);
    const torusMat = new THREE.MeshStandardMaterial({
      color: '#c2a4ff',
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      emissive: new THREE.Color('#7c3aed'),
      emissiveIntensity: 0.8,
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.position.set(2.5, 0, -1);
    scene.add(torusKnot);

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: '#9b7fe8',
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      emissive: new THREE.Color('#c2a4ff'),
      emissiveIntensity: 0.4,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-3, 1, -2);
    scene.add(ico);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const light1 = new THREE.PointLight('#c2a4ff', 3, 50);
    light1.position.set(8, 8, 8);
    scene.add(light1);
    const light2 = new THREE.PointLight('#7c3aed', 1.5, 50);
    light2.position.set(-8, -8, 4);
    scene.add(light2);

    // Resize handler
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    const clock = new THREE.Clock();
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      particles.rotation.x = t * 0.015;
      particles.rotation.y = t * 0.025;
      torusKnot.rotation.x += 0.0007;
      torusKnot.rotation.y += 0.0011;
      ico.rotation.x -= 0.0005;
      ico.rotation.y -= 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
}
