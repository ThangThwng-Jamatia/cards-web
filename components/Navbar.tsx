'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Apps', href: '/apps' },
    { name: 'Legal', href: '/legal' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: 0,
        backgroundColor: isScrolled ? 'rgba(11, 8, 12, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--borderColor)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'Geist, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--textColor)',
              }}
            >
              Minor Devs
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  whileHover={{ y: -1 }}
                  className="relative inline-block group"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    color: 'rgba(234, 229, 236, 0.5)',
                    display: 'block',
                  }}
                >
                  {item.name}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full transition-all duration-300"
                    style={{ height: '1px', background: 'var(--accentColor)' }}
                  />
                </motion.span>
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            style={{ color: 'var(--textColor)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'rgba(11, 8, 12, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--borderColor)',
            }}
          >
            <div className="px-6 py-8 space-y-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 300,
                      color: 'var(--textColor)',
                      display: 'block',
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
