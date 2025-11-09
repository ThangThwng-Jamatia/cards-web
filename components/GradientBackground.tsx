'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Enhanced parallax - more pronounced movement
  const x = useTransform(mouseX, [0, 1], [-15, 15]);
  const y = useTransform(mouseY, [0, 1], [-15, 15]);

  // Parallax for overlay layers
  const shineX = useTransform(mouseX, [0, 1], [-30, 30]);
  const shineY = useTransform(mouseY, [0, 1], [-30, 30]);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      time += 0.001; // Slower, more cinematic

      // Diagonal gradient that flows
      const angle = (time * 0.5) % (Math.PI * 2);
      const gradientX = Math.cos(angle) * canvas.width;
      const gradientY = Math.sin(angle) * canvas.height;

      const gradient = ctx.createLinearGradient(
        canvas.width / 2 - gradientX,
        canvas.height / 2 - gradientY,
        canvas.width / 2 + gradientX,
        canvas.height / 2 + gradientY
      );

      // Deep black to gray gradient (luxury feel)
      const offset1 = Math.sin(time * 0.8) * 0.5 + 0.5;
      const offset2 = Math.cos(time * 0.5) * 0.5 + 0.5;
      const offset3 = Math.sin(time * 1.2) * 0.5 + 0.5;

      gradient.addColorStop(0, `rgba(0, 0, 0, 1)`);
      gradient.addColorStop(offset1 * 0.25, `rgba(26, 26, 26, 1)`);
      gradient.addColorStop(offset2 * 0.5, `rgba(42, 42, 42, 1)`);
      gradient.addColorStop(offset3 * 0.75, `rgba(30, 30, 30, 1)`);
      gradient.addColorStop(1, `rgba(0, 0, 0, 1)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add radial glow that breathes (center spotlight)
      const glowOpacity = (Math.sin(time * 0.4) * 0.5 + 0.5) * 0.12;
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
      );

      radialGradient.addColorStop(0, `rgba(255, 255, 255, ${glowOpacity})`);
      radialGradient.addColorStop(0.4, `rgba(200, 200, 200, ${glowOpacity * 0.4})`);
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add sweeping spotlight effect
      const spotlightX = (Math.sin(time * 0.3) * 0.5 + 0.5) * canvas.width;
      const spotlightY = (Math.cos(time * 0.2) * 0.5 + 0.5) * canvas.height;
      const spotlightOpacity = (Math.sin(time * 0.35) * 0.5 + 0.5) * 0.08;

      const spotlightGradient = ctx.createRadialGradient(
        spotlightX,
        spotlightY,
        0,
        spotlightX,
        spotlightY,
        canvas.width * 0.4
      );

      spotlightGradient.addColorStop(0, `rgba(255, 255, 255, ${spotlightOpacity})`);
      spotlightGradient.addColorStop(0.6, `rgba(180, 180, 180, ${spotlightOpacity * 0.3})`);
      spotlightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = spotlightGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, isMobile]);

  return (
    <>
      {/* Main canvas with parallax */}
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          willChange: 'transform',
          x: isMobile ? 0 : x,
          y: isMobile ? 0 : y
        }}
      />

      {/* Moving shine/reflection effect */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
        style={{
          x: isMobile ? 0 : shineX,
          y: isMobile ? 0 : shineY
        }}
      >
        <div
          className="absolute w-[200%] h-[200%] opacity-20"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 55%, transparent 100%)',
            animation: 'shineMove 15s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            animationDelay: '0s'
          }}
        />
      </motion.div>

      {/* Diagonal shimmer waves */}
      {!isMobile && (
        <>
          <div
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden opacity-40"
            style={{
              background: 'linear-gradient(-45deg, transparent 0%, transparent 48%, rgba(255,255,255,0.03) 50%, transparent 52%, transparent 100%)',
              backgroundSize: '200% 200%',
              animation: 'shimmerWave 20s ease-in-out infinite',
              animationDelay: '0s'
            }}
          />
          <div
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden opacity-30"
            style={{
              background: 'linear-gradient(-45deg, transparent 0%, transparent 48%, rgba(255,255,255,0.02) 50%, transparent 52%, transparent 100%)',
              backgroundSize: '200% 200%',
              animation: 'shimmerWave 25s ease-in-out infinite',
              animationDelay: '5s'
            }}
          />
        </>
      )}

      {/* Subtle floating particles (silvery dots) */}
      {!isMobile && (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full blur-[1px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticle ${8 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
