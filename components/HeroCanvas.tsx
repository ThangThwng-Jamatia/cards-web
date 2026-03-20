'use client';

import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

export default function HeroCanvas() {
  return (
    <>
      {/* 3D Scene — absolutely positioned, clipped by parent overflow:hidden */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <HeroScene />
      </div>

      {/* Vignette gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(11,8,12,0.7) 70%, rgba(11,8,12,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
