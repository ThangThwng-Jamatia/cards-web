'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function AnimatedBackground() {
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Subtle parallax movement for the blobs based on mouse position
  const parallaxX = useTransform(mouseX, [0, 1], [-10, 10]);
  const parallaxY = useTransform(mouseY, [0, 1], [-10, 10]);

  useEffect(() => {
    // Check if mobile
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

  // Liquid blob configurations
  const blobs = [
    {
      size: 'w-[600px] h-[600px]',
      animation: 'liquidFloat1',
      duration: '20s',
      position: 'top-[10%] left-[15%]',
      gradient: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)',
    },
    {
      size: 'w-[500px] h-[500px]',
      animation: 'liquidFloat2',
      duration: '16s',
      position: 'top-[40%] right-[10%]',
      gradient: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
    },
    {
      size: 'w-[450px] h-[450px]',
      animation: 'liquidFloat3',
      duration: '14s',
      position: 'bottom-[20%] left-[25%]',
      gradient: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
    },
    {
      size: 'w-[550px] h-[550px]',
      animation: 'liquidFloat4',
      duration: '18s',
      position: 'bottom-[15%] right-[20%]',
      gradient: 'radial-gradient(circle at center, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
    },
  ];

  // Mobile-optimized blobs (smaller and fewer)
  const mobileBlobsConfig = [
    {
      size: 'w-[300px] h-[300px]',
      animation: 'liquidFloat1',
      duration: '20s',
      position: 'top-[15%] left-[10%]',
      gradient: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
    },
    {
      size: 'w-[250px] h-[250px]',
      animation: 'liquidFloat3',
      duration: '14s',
      position: 'bottom-[25%] right-[15%]',
      gradient: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
    },
  ];

  const activeBlobsConfig = isMobile ? mobileBlobsConfig : blobs;

  return (
    <>
      {/* Solid black base */}
      <div className="fixed inset-0 bg-black -z-50" />

      {/* Animated liquid blobs container */}
      <motion.div
        className="fixed inset-0 -z-40 overflow-hidden"
        style={{
          x: isMobile ? 0 : parallaxX,
          y: isMobile ? 0 : parallaxY,
        }}
      >
        {/* Organic liquid blobs */}
        {activeBlobsConfig.map((blob, index) => (
          <motion.div
            key={index}
            className={`absolute ${blob.size} ${blob.position} rounded-full blur-3xl`}
            style={{
              background: blob.gradient,
              animation: `${blob.animation} ${blob.duration} cubic-bezier(0.45, 0, 0.55, 1) infinite`,
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Additional overlay blobs with Framer Motion for extra fluidity */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-[30%] left-[50%] w-[400px] h-[400px] rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, transparent 70%)',
              }}
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -25, 20, 0],
                scale: [1, 1.1, 0.95, 1],
                opacity: [0.05, 0.1, 0.08, 0.05],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="absolute bottom-[35%] right-[40%] w-[350px] h-[350px] rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
              }}
              animate={{
                x: [0, -35, 25, 0],
                y: [0, 30, -15, 0],
                scale: [1, 0.9, 1.15, 1],
                opacity: [0.06, 0.12, 0.07, 0.06],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
          </>
        )}
      </motion.div>

      {/* Subtle noise texture overlay for depth */}
      <div
        className="fixed inset-0 -z-30 pointer-events-none opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle vignette for focus */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  );
}
