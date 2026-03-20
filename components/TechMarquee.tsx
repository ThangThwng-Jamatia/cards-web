'use client';

import Marquee from 'react-fast-marquee';

const items = [
  'React Native',
  'Android',
  'TypeScript',
  'Next.js',
  'Three.js',
  'GSAP',
  'Kotlin',
  'Firebase',
  'Supabase',
  'Tailwind CSS',
  'Framer Motion',
  'Node.js',
];

export default function TechMarquee() {
  return (
    <div
      className="py-8 border-y"
      style={{
        borderColor: 'var(--borderColor)',
        background: '#0a0a14',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Marquee gradient={false} speed={40} pauseOnHover>
        {items.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-separator">✦</span>
            <span>{item}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
