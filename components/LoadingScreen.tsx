'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const obj = useRef({ value: 0 });

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(screenRef.current, {
          opacity: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.inOut',
          onComplete: () => setVisible(false),
        });
      },
    });

    tl.to(obj.current, {
      value: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(obj.current.value).toString().padStart(2, '0');
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${obj.current.value / 100})`;
        }
      },
    });
  }, []);

  if (!visible) return null;

  return (
    <div ref={screenRef} className="loading-screen">
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 300,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '1rem',
        }}>
          Minor Devs Studios
        </div>
        <div style={{
          fontSize: '4rem',
          fontWeight: 700,
          color: '#c2a4ff',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          fontFamily: 'Geist, sans-serif',
        }}>
          <span ref={counterRef}>00</span>
          <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)' }}>%</span>
        </div>
      </div>
      <div className="loading-bar-track">
        <div ref={barRef} className="loading-bar-fill" />
      </div>
    </div>
  );
}
