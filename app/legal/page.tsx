'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import TiltCard from '@/components/TiltCard';
import HeroCanvas from '@/components/HeroCanvas';

const sections = [
  {
    id: 'privacy',
    label: '01',
    title: 'Privacy Policy',
    subsections: [
      {
        heading: 'Apps Covered',
        content: 'This policy applies to all apps published by Minor Devs Studios, including all published apps and any future apps unless a separate policy is provided.',
      },
      {
        heading: 'Information We Collect',
        content: 'App data is saved on your device locally. Deleting the app removes it. We may use privacy-friendly analytics or crash reports to improve performance. These do not include personal information like your name or contact details unless you provide them in a support message.',
      },
      {
        heading: 'Permissions',
        content: 'Some apps may request permissions (e.g., camera, photos, storage) only to deliver features you choose. Denying a permission may limit that feature but the rest of the app will continue to work.',
      },
      {
        heading: 'How We Use Your Information',
        list: [
          'Provide and improve features',
          'Keep the services secure and reliable',
          'Respond to support requests',
          'Comply with law and store required records',
        ],
      },
      {
        heading: "What We Don't Do",
        list: [
          'We do not sell your personal data to third parties',
          'We do not collect more than needed for the feature to work',
          'We do not track you across unrelated apps or websites',
        ],
      },
      {
        heading: 'Data Security',
        content: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing.',
      },
      {
        heading: 'Third-Party Services',
        content: 'Some apps may integrate trusted SDKs/services (e.g., Google Play Services, Firebase Analytics, AdMob). Their use is limited to app functionality, analytics, or diagnostics. See their privacy policies for details.',
      },
    ],
  },
  {
    id: 'terms',
    label: '02',
    title: 'Terms of Use',
    subsections: [
      {
        heading: 'Agreement',
        content: 'By installing or using any Minor Devs Studios app or website, you agree to these Terms.',
      },
      {
        heading: 'License to Use',
        content: 'We grant you a limited, non-exclusive, non-transferable license to use our applications for personal, non-commercial purposes, subject to these terms. You may not modify, distribute, or create derivative works based on our applications without prior written consent.',
      },
      {
        heading: 'User Responsibilities',
        content: 'You own the content you create. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to use our services only for lawful purposes.',
      },
      {
        heading: 'Intellectual Property',
        content: 'All content, features, and functionality of our applications are owned by Minor Devs Studios and are protected by international copyright, trademark, and other intellectual property laws.',
      },
      {
        heading: 'In-App Purchases & Subscriptions',
        content: 'Minor Devs Studios may offer in-app purchases and subscriptions. Purchases are handled by the app store.',
        warning: 'All In-App Purchases are final. No refunds will be issued after the purchase.',
      },
      {
        heading: 'Limitation of Liability',
        content: 'Minor Devs Studios is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.',
      },
      {
        heading: 'Changes to Terms',
        content: 'We reserve the right to modify these terms at any time. Continued use of our applications following any changes constitutes acceptance of those changes.',
      },
    ],
  },
  {
    id: 'contact',
    label: '03',
    title: 'Contact',
    subsections: [],
  },
];

export default function Legal() {
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
      gsap.to(line1Ref.current, { x: x * -20, y: y * -12, duration: 1.4, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(line2Ref.current, { x: x * 26,  y: y * 16,  duration: 1.0, ease: 'power2.out', overwrite: 'auto' });
    };

    const anim = gsap.fromTo(
      allChars,
      { opacity: 0, y: 60, rotateX: -80, transformPerspective: 600 },
      {
        opacity: 1, y: 0, rotateX: 0,
        stagger: 0.045, duration: 0.85, ease: 'power4.out', delay: 0.2,
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
              {/* LEGAL — far layer */}
              <div ref={line1Ref} style={{ lineHeight: 0.95, transformOrigin: 'left center' }}>
                {'LEGAL'.split('').map((char, i) => (
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
              {/* INFO — close layer, breathing glow */}
              <div ref={line2Ref} style={{ lineHeight: 0.95, transformOrigin: 'left center' }}>
                {'INFO'.split('').map((char, i) => (
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
              Privacy Policy, Terms of Use, and Contact Information for Minor Devs Studios.
            </motion.p>

            {/* Last updated */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{
                marginTop: '2rem',
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '100px',
                border: '1px solid var(--borderColor)',
                fontSize: '0.7rem',
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--textMuted)',
              }}
            >
              <span style={{ color: 'var(--accentColor)' }}>✦</span>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </motion.div>
          </div>
        </section>
      </div>

      {/* DIVIDER */}
      <div style={{ position: 'relative', zIndex: 2, height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* ZONE 2: CONTENT */}
      <div style={{ background: '#080810', position: 'relative', zIndex: 2 }}>
        {/* Content */}
        <section style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem 8rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '6rem', alignItems: 'start' }}>

            {/* Sidebar nav */}
            <div style={{ position: 'sticky', top: '6rem' }} className="hidden md:block">
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--textMuted)', marginBottom: '1.5rem' }}>
                Sections
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.875rem 0',
                      borderBottom: '1px solid var(--borderColor)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'var(--textMuted)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accentColor)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--textMuted)'; }}
                  >
                    <span style={{ fontSize: '0.65rem', color: 'var(--accentColor)', fontWeight: 600 }}>{s.label}</span>
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>

              {/* Privacy Policy */}
              <motion.div
                id="privacy"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--borderColor)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accentColor)', fontWeight: 600, letterSpacing: '0.1em' }}>01</span>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--textColor)', letterSpacing: '-0.02em' }}>
                    Privacy Policy
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {sections[0].subsections.map((sub, i) => (
                    <motion.div
                      key={sub.heading}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.6 }}
                    >
                      <TiltCard
                        intensity={22}
                        translateZ={16}
                        style={{
                          padding: '1.5rem',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--borderColor)',
                          borderRadius: '12px',
                        }}
                      >
                        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accentColor)', marginBottom: '0.75rem' }}>
                          {sub.heading}
                        </h3>
                        {sub.content && (
                          <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(234,229,236,0.6)', lineHeight: 1.8 }}>
                            {sub.content}
                          </p>
                        )}
                        {sub.list && (
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {sub.list.map((item, j) => (
                              <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(234,229,236,0.6)', lineHeight: 1.7 }}>
                                <span style={{ color: 'var(--accentColor)', marginTop: '0.15rem', flexShrink: 0 }}>✦</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Terms of Use */}
              <motion.div
                id="terms"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--borderColor)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accentColor)', fontWeight: 600, letterSpacing: '0.1em' }}>02</span>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--textColor)', letterSpacing: '-0.02em' }}>
                    Terms of Use
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {sections[1].subsections.map((sub, i) => (
                    <motion.div
                      key={sub.heading}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.6 }}
                    >
                      <TiltCard
                        intensity={22}
                        translateZ={16}
                        glowColor={sub.warning ? 'rgba(239,68,68,0.06)' : 'rgba(194, 164, 255, 0.08)'}
                        style={{
                          padding: '1.5rem',
                          background: sub.warning ? 'rgba(239,68,68,0.04)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${sub.warning ? 'rgba(239,68,68,0.2)' : 'var(--borderColor)'}`,
                          borderRadius: '12px',
                        }}
                      >
                        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: sub.warning ? '#ef4444' : 'var(--accentColor)', marginBottom: '0.75rem' }}>
                          {sub.heading}
                        </h3>
                        {sub.content && (
                          <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(234,229,236,0.6)', lineHeight: 1.8, marginBottom: sub.warning ? '0.75rem' : '0' }}>
                            {sub.content}
                          </p>
                        )}
                        {sub.warning && (
                          <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#ef4444', lineHeight: 1.6 }}>
                            ⚠ {sub.warning}
                          </p>
                        )}
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                id="contact"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--borderColor)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accentColor)', fontWeight: 600, letterSpacing: '0.1em' }}>03</span>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--textColor)', letterSpacing: '-0.02em' }}>
                    Contact
                  </h2>
                </div>

                <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(234,229,236,0.6)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  If you have any questions about our Privacy Policy, Terms of Use, or any of our applications, please reach out.
                </p>

                <TiltCard
                  intensity={16}
                  translateZ={22}
                  glowColor='rgba(194,164,255,0.1)'
                  style={{
                    padding: '2rem',
                    background: 'rgba(194,164,255,0.04)',
                    border: '1px solid rgba(194,164,255,0.15)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accentColor)', fontWeight: 400 }}>
                    Minor Devs Studios
                  </div>
                  <a
                    href="mailto:minordevsbusiness@gmail.com"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 400,
                      color: 'var(--textColor)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accentColor)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--textColor)'; }}
                  >
                    minordevsbusiness@gmail.com
                  </a>
                </TiltCard>
              </motion.div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
