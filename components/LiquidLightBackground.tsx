'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function LiquidLightBackground() {
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Subtle parallax movement
  const parallaxX = useTransform(mouseX, [0, 1], [-20, 20]);
  const parallaxY = useTransform(mouseY, [0, 1], [-20, 20]);

  // Parallax for square shine overlay
  const shineX = useTransform(mouseX, [0, 1], [-30, 30]);
  const shineY = useTransform(mouseY, [0, 1], [-30, 30]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, isMobile]);

  // Premium liquid light blobs - High visibility, cinematic feel
  const liquidLights = [
    {
      id: 1,
      size: 'w-[800px] h-[800px]',
      position: { x: '10%', y: '15%' },
      color: 'rgba(255, 255, 255, 0.35)',
      blur: isMobile ? 'blur-2xl' : 'blur-[150px]',
      animation: {
        x: [0, 80, -60, 0],
        y: [0, -70, 60, 0],
        scale: [1, 1.2, 0.9, 1],
        opacity: [0.25, 0.4, 0.3, 0.25],
        rotate: [0, 90, 180, 270, 360],
      },
      duration: 20,
    },
    {
      id: 2,
      size: 'w-[700px] h-[700px]',
      position: { x: '65%', y: '10%' },
      color: 'rgba(245, 245, 245, 0.3)',
      blur: isMobile ? 'blur-xl' : 'blur-[140px]',
      animation: {
        x: [0, -70, 80, 0],
        y: [0, 80, -50, 0],
        scale: [1, 0.85, 1.25, 1],
        opacity: [0.2, 0.35, 0.25, 0.2],
        rotate: [360, 270, 180, 90, 0],
      },
      duration: 16,
    },
    {
      id: 3,
      size: 'w-[600px] h-[600px]',
      position: { x: '20%', y: '55%' },
      color: 'rgba(255, 255, 255, 0.38)',
      blur: isMobile ? 'blur-2xl' : 'blur-[160px]',
      animation: {
        x: [0, 60, -70, 0],
        y: [0, -60, 70, 0],
        scale: [1, 1.15, 0.88, 1],
        opacity: [0.28, 0.42, 0.32, 0.28],
        rotate: [0, 120, 240, 360],
      },
      duration: 14,
    },
    {
      id: 4,
      size: 'w-[750px] h-[750px]',
      position: { x: '60%', y: '50%' },
      color: 'rgba(235, 235, 235, 0.32)',
      blur: isMobile ? 'blur-xl' : 'blur-[145px]',
      animation: {
        x: [0, -90, 70, 0],
        y: [0, 70, -80, 0],
        scale: [1, 0.9, 1.3, 1],
        opacity: [0.22, 0.38, 0.28, 0.22],
        rotate: [0, -90, -180, -270, -360],
      },
      duration: 18,
    },
    {
      id: 5,
      size: 'w-[550px] h-[550px]',
      position: { x: '40%', y: '30%' },
      color: 'rgba(255, 255, 255, 0.36)',
      blur: isMobile ? 'blur-2xl' : 'blur-[155px]',
      animation: {
        x: [0, 75, -65, 0],
        y: [0, -75, 65, 0],
        scale: [1, 1.18, 0.92, 1],
        opacity: [0.26, 0.4, 0.3, 0.26],
        rotate: [0, 180, 360],
      },
      duration: 12,
    },
  ];

  // Mobile-optimized configuration (3 blobs, reduced intensity)
  const mobileLights = [
    {
      ...liquidLights[0],
      size: 'w-[400px] h-[400px]',
      color: 'rgba(255, 255, 255, 0.25)',
      animation: {
        ...liquidLights[0].animation,
        opacity: [0.18, 0.28, 0.22, 0.18],
      },
    },
    {
      ...liquidLights[2],
      size: 'w-[350px] h-[350px]',
      color: 'rgba(255, 255, 255, 0.28)',
      animation: {
        ...liquidLights[2].animation,
        opacity: [0.2, 0.32, 0.24, 0.2],
      },
    },
    {
      ...liquidLights[4],
      size: 'w-[300px] h-[300px]',
      color: 'rgba(255, 255, 255, 0.26)',
      animation: {
        ...liquidLights[4].animation,
        opacity: [0.19, 0.3, 0.23, 0.19],
      },
    },
  ];

  const activeLights = isMobile ? mobileLights : liquidLights;

  return (
    <>
      {/* Pure black base - #000000 */}
      <div className="fixed inset-0 bg-black -z-50" />

      {/* Liquid light blobs container with parallax */}
      <motion.div
        className="fixed inset-0 -z-40 overflow-hidden"
        style={{
          x: isMobile ? 0 : parallaxX,
          y: isMobile ? 0 : parallaxY,
        }}
      >
        {activeLights.map((light) => (
          <motion.div
            key={light.id}
            className={`absolute ${light.size} ${light.blur} rounded-full`}
            style={{
              left: light.position.x,
              top: light.position.y,
              background: `radial-gradient(circle at center, ${light.color} 0%, rgba(255,255,255,0.15) 35%, transparent 70%)`,
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={light.animation}
            transition={{
              duration: light.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Moving White Square Shine Effect - Enhanced with blur */}
      <motion.div
        className="fixed inset-0 -z-35 pointer-events-none overflow-hidden"
        style={{
          x: isMobile ? 0 : shineX,
          y: isMobile ? 0 : shineY
        }}
      >
        <div
          className={`absolute w-[200%] h-[200%] ${isMobile ? 'blur-md' : 'blur-xl'}`}
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.15) 55%, transparent 100%)',
            animation: 'shineMove 15s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            animationDelay: '0s'
          }}
        />
      </motion.div>

      {/* Subtle noise texture for organic feel */}
      <div
        className="fixed inset-0 -z-30 pointer-events-none opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Light vignette for focus (reduced for better light visibility) */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 65%, rgba(0,0,0,0.25) 100%)',
        }}
      />
    </>
  );
}
