'use client';

import { motion } from 'framer-motion';
import { Youtube, Instagram, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientBackground from '@/components/GradientBackground';

export default function About() {
  const socialLinks = [
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-400' },
    { name: 'Email', icon: Mail, href: 'mailto:support@minordevs.studio', color: 'hover:text-blue-400' },
  ];

  return (
    <div className="min-h-screen relative">
      <GradientBackground />

      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-12"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-light tracking-tight text-white"
          >
            About the Studio
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 text-lg md:text-xl text-neutral-300 font-light leading-relaxed"
          >
            <p>
              Minor Devs Studios is an independent developer initiative founded by one solo creator — a disciplined young developer and creator passionate about crafting clean, human-centered apps that combine utility and beauty.
            </p>

            <p>
              Every app is designed with intention, built with care, and refined to feel effortless. The mission is simple: create tools that enhance daily life without overwhelming it.
            </p>

            <p>
              From AI-powered health companions to elegant expense trackers, each project reflects a commitment to minimalism, functionality, and timeless design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-8"
          >
            <h2 className="text-2xl font-light text-white mb-6">Connect</h2>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    className={`border-white/20 text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-4 h-4 mr-2" />
                    {social.name}
                  </Button>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
