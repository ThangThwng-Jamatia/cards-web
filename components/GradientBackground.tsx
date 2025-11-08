'use client';

import { useEffect, useRef } from 'react';

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    const animate = () => {
      time += 0.002;

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const offset1 = Math.sin(time) * 0.5 + 0.5;
      const offset2 = Math.cos(time * 0.7) * 0.5 + 0.5;
      const offset3 = Math.sin(time * 1.3) * 0.5 + 0.5;

      gradient.addColorStop(0, `rgba(0, 0, 0, 1)`);
      gradient.addColorStop(offset1 * 0.3, `rgba(20, 20, 20, 1)`);
      gradient.addColorStop(offset2 * 0.6, `rgba(40, 40, 40, 1)`);
      gradient.addColorStop(offset3 * 0.8, `rgba(25, 25, 25, 1)`);
      gradient.addColorStop(1, `rgba(0, 0, 0, 1)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ willChange: 'transform' }}
    />
  );
}
