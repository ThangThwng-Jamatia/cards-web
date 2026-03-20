'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from '@/components/HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allChars = [
      ...(line1Ref.current?.querySelectorAll('.hero-char') ?? []),
      ...(line2Ref.current?.querySelectorAll('.hero-char') ?? []),
    ];

    const onMouse = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(line1Ref.current, { x: x * -22, y: y * -14, duration: 1.4, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(line2Ref.current, { x: x * 28,  y: y * 18,  duration: 1.0, ease: 'power2.out', overwrite: 'auto' });
    };

    const anim = gsap.fromTo(
      allChars,
      { opacity: 0, y: 60, rotateX: -80, transformPerspective: 600 },
      {
        opacity: 1, y: 0, rotateX: 0,
        stagger: 0.035, duration: 0.85, ease: 'power4.out', delay: 0.3,
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

  const values = [
    { label: 'Focus', desc: 'Relentlessly prioritizing what matters' },
    { label: 'Discipline', desc: 'Showing up every day, no matter what' },
    { label: 'Craft', desc: 'Caring deeply about quality' },
    { label: 'Impact', desc: 'Building things that genuinely help' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* ZONE 1: HERO */}
      <div style={{ background: 'transparent', position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {/* Canvas — clipped to hero bounds */}
          <HeroCanvas />
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accentColor)', marginBottom: '2rem', opacity: 0.7 }}
            >
              ✦ About
            </motion.div>

            <div>
              {/* "The Studio" — far layer */}
              <div ref={line1Ref} style={{ lineHeight: 1, transformOrigin: 'left center' }}>
                {'The Studio'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-char depth-text-dark"
                    style={{
                      fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: 'var(--textColor)',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
              {/* "& Founder" — close layer, moves with cursor */}
              <div ref={line2Ref} style={{ lineHeight: 1, transformOrigin: 'left center' }}>
                {'& Founder'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-char depth-text-accent"
                    style={{
                      fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: 'var(--accentColor)',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* DIVIDER */}
      <div style={{ position: 'relative', zIndex: 2, height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* ZONE 2: CONTENT */}
      <div style={{ background: '#080810', position: 'relative', zIndex: 2 }}>
        {/* Bio section */}
        <section style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem 8rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            <div>
              {[
                'Minor Devs Studios is a one-person developer studio created by a young solopreneur who believes in turning ideas into real, useful apps.',
                "I'm a solo developer and creator — also a calisthenics athlete — who loves building things that help people grow and improve their lives.",
                'Every app I create is designed to be clean, minimal, and meaningful. My goal is to prove that even a young teenager, with discipline, vision and ambition, can build something that makes a difference.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    color: i === 0 ? 'rgba(234, 229, 236, 0.8)' : 'rgba(234, 229, 236, 0.55)',
                    lineHeight: 1.8,
                    marginBottom: '1.5rem',
                    borderLeft: i === 0 ? '2px solid var(--accentColor)' : 'none',
                    paddingLeft: i === 0 ? '1.5rem' : '0',
                  }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Connect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ marginTop: '3rem' }}
              >
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--textMuted)', marginBottom: '1.5rem' }}>
                  Connect
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <motion.a
                    href="mailto:minordevsbusiness@gmail.com"
                    whileHover={{ scale: 1.04, borderColor: 'rgba(194, 164, 255, 0.4)', color: 'var(--accentColor)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      border: '1px solid var(--borderColor)',
                      borderRadius: '100px',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'rgba(234, 229, 236, 0.6)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Mail size={15} />
                    Email
                  </motion.a>
                  <motion.a
                    href="https://github.com/ThangThwng-Jamatia"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, borderColor: 'rgba(194, 164, 255, 0.4)', color: 'var(--accentColor)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      border: '1px solid var(--borderColor)',
                      borderRadius: '100px',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'rgba(234, 229, 236, 0.6)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Github size={15} />
                    GitHub
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Values */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '2rem', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--textMuted)' }}
              >
                Core Values
              </motion.div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {values.map((v, i) => (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TiltCard
                      intensity={20}
                      translateZ={18}
                      style={{
                        padding: '1.25rem 1.5rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--borderColor)',
                        borderRadius: '14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '2rem',
                      }}
                    >
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--textColor)' }}>
                        <span style={{ color: 'var(--accentColor)', marginRight: '0.5rem', fontSize: '0.8rem' }}>
                          {String(i + 1).padStart(2, '0')}.
                        </span>
                        {v.label}
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 300, color: 'var(--textMuted)', textAlign: 'right', maxWidth: '200px' }}>
                        {v.desc}
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
