'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import Link from 'next/link';

interface AppCardProps {
  name: string;
  description: string;
  category: string;
  playStoreUrl: string;
  index?: number;
}

export default function AppCard({ name, description, category, playStoreUrl, index = 0 }: AppCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 14;
    const rotateY = (centerX - x) / 14;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(28px)`;
    card.style.boxShadow = '0 30px 60px rgba(194, 164, 255, 0.15), 0 0 0 1px rgba(194, 164, 255, 0.15)';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.boxShadow = 'none';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card-hover-glow"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--borderColor)',
          borderRadius: '20px',
          padding: '2.5rem',
          transition: 'transform 0.15s ease, background 0.4s ease, border-color 0.4s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          const t = e.currentTarget;
          t.style.background = 'rgba(194, 164, 255, 0.05)';
          t.style.borderColor = 'rgba(194, 164, 255, 0.2)';
        }}
        onMouseOut={(e) => {
          const t = e.currentTarget;
          t.style.background = 'rgba(255, 255, 255, 0.03)';
          t.style.borderColor = 'var(--borderColor)';
          handleMouseLeave();
        }}
      >
        {/* Glow blob */}
        <div style={{
          position: 'absolute',
          top: '-40%',
          right: '-20%',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(194, 164, 255, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          transition: 'opacity 0.4s ease',
        }} />

        {/* Number */}
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          fontSize: '3rem',
          fontWeight: 900,
          color: 'rgba(194, 164, 255, 0.06)',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Category */}
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accentColor)',
            marginBottom: '0.75rem',
            opacity: 0.8,
          }}>
            {category}
          </div>

          {/* Name */}
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--textColor)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}>
            {name}
          </h3>

          {/* Divider */}
          <div style={{
            width: '2rem',
            height: '1px',
            background: 'var(--accentColor)',
            marginBottom: '1rem',
            opacity: 0.4,
          }} />

          {/* Description */}
          <p style={{
            fontSize: '0.9rem',
            fontWeight: 300,
            color: 'rgba(234, 229, 236, 0.6)',
            lineHeight: 1.7,
            minHeight: '4rem',
            marginBottom: '2rem',
          }}>
            {description}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <motion.a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                background: 'var(--accentColor)',
                color: '#0b080c',
                borderRadius: '10px',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
              }}
              onHoverStart={(e) => {
                (e.target as HTMLElement).style.boxShadow = '0 0 30px rgba(194, 164, 255, 0.4)';
              }}
              onHoverEnd={(e) => {
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            >
              View on Play Store
              <ExternalLink size={15} />
            </motion.a>

            <Link href="/legal">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  background: 'transparent',
                  color: 'rgba(234, 229, 236, 0.5)',
                  borderRadius: '10px',
                  border: '1px solid var(--borderColor)',
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <FileText size={15} />
                Legal Docs
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
