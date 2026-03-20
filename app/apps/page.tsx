'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppCard from '@/components/AppCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechMarquee from '@/components/TechMarquee';
import HeroCanvas from '@/components/HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

const apps = [
  {
    name: 'Minor Challenges',
    description: 'Transform Your Life With Small Micro Daily Challenges. Boost Productivity, Build Habits, and Enhance Well-being One Step at a Time.',
    category: 'Focus & Productivity',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.minor.challenges&pcampaignid=web_share',
  },
  {
    name: 'Minor Builds: Habit Tracker',
    description: 'Build and Track Custom Habits Seamlessly. A Minimalistic Habit Tracker for Effortless Habit Building and Tracking.',
    category: 'Habits & Productivity',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.minorbuilds.app&pcampaignid=web_share',
  },
];

export default function Apps() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allChars = [
      ...Array.from(line1Ref.current?.querySelectorAll('.hero-char') ?? []),
      ...Array.from(line2Ref.current?.querySelectorAll('.hero-char') ?? []),
    ];

    const onMouse = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(line1Ref.current, { x: x * -24, y: y * -14, duration: 1.4, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(line2Ref.current, { x: x * 30,  y: y * 18,  duration: 1.0, ease: 'power2.out', overwrite: 'auto' });
    };

    const anim = gsap.fromTo(
      allChars,
      { opacity: 0, y: 60, rotateX: -80, transformPerspective: 600 },
      {
        opacity: 1, y: 0, rotateX: 0,
        stagger: 0.05, duration: 0.85, ease: 'power4.out', delay: 0.2,
        onComplete: () => {
          gsap.set(allChars, { clearProps: 'transform,opacity' });
          window.addEventListener('mousemove', onMouse);
        },
      }
    );

    return () => {
      anim.kill();
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* ZONE 1: HERO */}
      <div style={{ background: 'transparent', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {/* Header */}
        <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {/* Canvas — clipped to hero bounds */}
          <HeroCanvas />
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              {/* OUR — far layer */}
              <div ref={line1Ref} style={{ lineHeight: 0.95, transformOrigin: 'left center' }}>
                {'OUR'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-char depth-text-dark"
                    style={{
                      fontSize: 'clamp(3rem, 8vw, 7rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      color: 'var(--textColor)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
              {/* APPS — close layer, breathing glow */}
              <div ref={line2Ref} style={{ lineHeight: 0.95, transformOrigin: 'left center' }}>
                {'APPS'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-char depth-text-accent"
                    style={{
                      fontSize: 'clamp(3rem, 8vw, 7rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      color: 'var(--accentColor)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--textMuted)', maxWidth: '400px', lineHeight: 1.7 }}
            >
              Built and Designed with Care, Minimalism and Beauty with Purpose.
            </motion.p>
          </div>
        </section>
      </div>

      {/* DIVIDER: TECH MARQUEE */}
      <TechMarquee />

      {/* ZONE 2: CONTENT */}
      <div style={{ background: '#080810', position: 'relative', zIndex: 2 }}>
        {/* Apps grid */}
        <section style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '2rem',
          }}>
            {apps.map((app, index) => (
              <AppCard key={app.name} {...app} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              marginTop: '6rem',
              textAlign: 'center',
              padding: '3rem',
              border: '1px dashed var(--borderColor)',
              borderRadius: '20px',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✦</div>
            <p style={{ fontSize: '0.875rem', fontWeight: 300, color: 'var(--textMuted)', letterSpacing: '0.1em' }}>
              More Apps Launching Soon...
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
