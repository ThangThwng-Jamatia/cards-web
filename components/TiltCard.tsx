'use client';

import { useRef, ReactNode, CSSProperties } from 'react';

interface TiltCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  /** Rotation divisor — higher = subtler tilt. Default: 18 */
  intensity?: number;
  /** How many px the card lifts on hover. Default: 20 */
  translateZ?: number;
  /** Accent glow color. Default: purple */
  glowColor?: string;
  /** Whether to shift background/border on hover. Default: true */
  hoverAccent?: boolean;
  onMouseEnterExtra?: () => void;
  onMouseLeaveExtra?: () => void;
}

export default function TiltCard({
  children,
  style,
  className,
  intensity = 18,
  translateZ = 20,
  glowColor = 'rgba(194, 164, 255, 0.08)',
  hoverAccent = true,
  onMouseEnterExtra,
  onMouseLeaveExtra,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / intensity;
    const rotateY = (rect.width / 2 - x) / intensity;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverAccent) {
      e.currentTarget.style.background = 'rgba(194, 164, 255, 0.05)';
      e.currentTarget.style.borderColor = 'rgba(194, 164, 255, 0.25)';
    }
    onMouseEnterExtra?.();
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    if (hoverAccent) {
      e.currentTarget.style.background = (style?.background as string) ?? 'rgba(255,255,255,0.02)';
      e.currentTarget.style.borderColor = (style?.borderColor as string) ?? 'var(--borderColor)';
    }
    onMouseLeaveExtra?.();
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.15s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Radial glow blob — follows top-right corner */}
      <div
        style={{
          position: 'absolute',
          top: '-40%',
          right: '-20%',
          width: '280px',
          height: '280px',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          pointerEvents: 'none',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
