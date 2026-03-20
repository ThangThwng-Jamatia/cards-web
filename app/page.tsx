'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechMarquee from '@/components/TechMarquee';
import TiltCard from '@/components/TiltCard';
import HeroCanvas from '@/components/HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allChars = [
      ...(line1Ref.current?.querySelectorAll('.hero-char') ?? []),
      ...(line2Ref.current?.querySelectorAll('.hero-char') ?? []),
      ...(line3Ref.current?.querySelectorAll('.hero-char') ?? []),
    ];

    const onMouse = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(line1Ref.current, { x: x * -32, y: y * -20, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(line2Ref.current, { x: x * 40,  y: y * 25,  duration: 1.0, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(line3Ref.current, { x: x * -16, y: y * -10, duration: 1.8, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(subtitleRef.current, { x: x * 18, y: y * 10, duration: 1.3, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(badgeRef.current,    { x: x * -12, y: y * -8, duration: 2.0, ease: 'power2.out', overwrite: 'auto' });
    };

    const tl = gsap.timeline({
      delay: 2.2,
      onComplete: () => {
        gsap.set(allChars, { clearProps: 'transform,opacity' });
        window.addEventListener('mousemove', onMouse);
      },
    });

    tl
      .fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(
        allChars,
        { opacity: 0, y: 70, rotateX: -90, transformPerspective: 700 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.038, duration: 0.85, ease: 'power4.out' },
        '-=0.2'
      )
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.35')
      .fromTo(ctaRef.current,      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    return () => {
      tl.kill();
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* ZONE 1: HERO */}
      <div style={{ background: 'transparent', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {/* HERO SECTION */}
        <section
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Canvas — clipped to hero bounds */}
          <HeroCanvas />

          {/* Bottom fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '200px',
              zIndex: 3,
              background: 'linear-gradient(to top, var(--backgroundColor), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* Hero content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 2rem',
              paddingTop: '6rem',
              width: '100%',
            }}
          >
            {/* Badge */}
            <div
              ref={badgeRef}
              style={{
                opacity: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '100px',
                border: '1px solid rgba(194, 164, 255, 0.2)',
                background: 'rgba(194, 164, 255, 0.05)',
                marginBottom: '2.5rem',
              }}
            >
              <Smartphone size={14} style={{ color: 'var(--accentColor)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accentColor)' }}>
                Solo Developer Studio
              </span>
            </div>

            {/* Main heading */}
            <div style={{ marginBottom: '2rem' }}>
              <div ref={line1Ref} style={{ lineHeight: 0.9, transformOrigin: 'left center' }}>
                {'MINOR'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-char depth-text-dark"
                    style={{
                      fontSize: 'clamp(4rem, 12vw, 10rem)',
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

              <div ref={line2Ref} style={{ lineHeight: 0.9, transformOrigin: 'left center' }}>
                {'DEVS'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-char depth-text-accent"
                    style={{
                      fontSize: 'clamp(4rem, 12vw, 10rem)',
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

              <div ref={line3Ref} style={{ transformOrigin: 'left center', marginTop: '0.5rem' }}>
                {'STUDIOS'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-char"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                      fontWeight: 300,
                      letterSpacing: '0.4em',
                      lineHeight: 1.5,
                      color: 'rgba(234, 229, 236, 0.4)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              style={{
                opacity: 0,
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: 300,
                color: 'rgba(234, 229, 236, 0.5)',
                maxWidth: '500px',
                lineHeight: 1.8,
                marginBottom: '3rem',
              }}
            >
              Building helpful and minimal apps to improve the Young Stars.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              style={{
                opacity: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <Link href="/apps">
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(194, 164, 255, 0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 2rem',
                    background: 'var(--accentColor)',
                    color: '#0b080c',
                    borderRadius: '100px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    cursor: 'none',
                  }}
                >
                  Explore Apps
                  <ArrowRight size={16} />
                </motion.div>
              </Link>
              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.04, borderColor: 'rgba(194, 164, 255, 0.5)', color: 'var(--accentColor)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 2rem',
                    background: 'transparent',
                    color: 'rgba(234, 229, 236, 0.6)',
                    borderRadius: '100px',
                    border: '1px solid var(--borderColor)',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    cursor: 'none',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  About the Developer
                </motion.div>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* DIVIDER: TECH MARQUEE */}
      <TechMarquee />

      {/* ZONE 2: CONTENT */}
      <div style={{ background: '#080810', position: 'relative', zIndex: 2 }}>
        {/* STATS SECTION */}
        <section
          style={{
            padding: '8rem 2rem',
            maxWidth: '1280px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              border: '1px solid var(--borderColor)',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            {[
              { label: 'Apps Published', value: '2+' },
              { label: 'Years Building', value: '2+' },
              { label: 'Downloads', value: '100+' },
              { label: 'Lines of Code', value: '∞' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard
                  intensity={22}
                  translateZ={14}
                  hoverAccent={false}
                  style={{
                    padding: '3rem 2rem',
                    background: 'rgba(255,255,255,0.01)',
                    borderRight: i < 3 ? '1px solid var(--borderColor)' : 'none',
                    textAlign: 'center',
                    borderRadius: '0',
                    overflow: 'visible',
                  }}
                >
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: 'var(--accentColor)',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--textMuted)', fontWeight: 300 }}>
                    {stat.label}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURED SECTION */}
        <section style={{ padding: '4rem 2rem 10rem', maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '4rem' }}
          >
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accentColor)', marginBottom: '1rem', opacity: 0.7 }}>
              ✦ Philosophy
            </div>
            <h2
              className="section-title-depth"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: 'var(--textColor)',
                maxWidth: '600px',
              }}
            >
              Build Clean.<br />
              <span className="section-title-accent" style={{ color: 'var(--accentColor)' }}>Ship Minimal.</span><br />
              Inspire Young.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: '◈',
                title: 'Minimal by Design',
                desc: 'Every feature is intentional. No bloat, no noise — just what you need to level up your life.',
              },
              {
                icon: '◇',
                title: 'Built for Focus',
                desc: 'Apps designed to reduce friction and maximize the time you spend on what actually matters.',
              },
              {
                icon: '◆',
                title: 'Made to Last',
                desc: 'Quality over quantity. Each release is polished, tested, and built for long-term value.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard
                  style={{
                    padding: '2rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--borderColor)',
                    borderRadius: '16px',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', color: 'var(--accentColor)', marginBottom: '1rem' }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--textColor)', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', fontWeight: 300, color: 'var(--textMuted)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
