'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Apps', href: '/apps' },
    { name: 'Legal', href: '/legal' },
  ];

  return (
    <footer
      style={{
        background: '#080810',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '1rem',
              }}
            >
              Minor Devs Studios
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.7 }}>
              Made To Inspire. Helping young stars grow stronger, smarter, and more disciplined.
            </p>
            <div
              style={{
                marginTop: '1.5rem',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#8B5CF6',
                fontWeight: 300,
              }}
            >
              ✦ Solo Developer Studio
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  <motion.div
                    whileHover={{ x: 6, color: '#8B5CF6' }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: '0.875rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)' }}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              Contact
            </div>
            <motion.a
              href="mailto:minordevsbusiness@gmail.com"
              whileHover={{ color: '#8B5CF6' }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.55)',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              minordevsbusiness@gmail.com
            </motion.a>
            <motion.a
              href="https://github.com/ThangThwng-Jamatia"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: '#8B5CF6' }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.55)',
                display: 'block',
              }}
            >
              GitHub
            </motion.a>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.75rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} Minor Devs Studios. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', fontWeight: 300, color: '#8B5CF6', opacity: 0.7 }}>
            Made To Inspire
          </p>
        </div>
      </div>
    </footer>
  );
}
