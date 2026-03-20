'use client';

export default function GlobalBackground() {
  return (
    <>
      {/* Fixed dark base — always behind everything */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#0b080c' }} />

      {/* Grid overlay */}
      <div
        className="grid-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
