'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LiquidLightBackground from '@/components/LiquidLightBackground';

export default function About() {
  const socialLinks = [
    //{ name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-400' },
    //{ name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-400' },
    { name: 'Email', icon: Mail, href: 'mailto:minordevsbusiness@gmail.com', color: 'hover:text-blue-400' },
  ];

  return (
    <div className="min-h-screen relative">
      <LiquidLightBackground />

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
            About the Studio and Founder
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 text-lg md:text-xl text-neutral-300 font-light leading-relaxed"
          >
            <p>
              Minor Devs Studios is a one-person developer studio created by a solopreneur who believes in turning ideas into real, useful apps.
            </p>

            <p>
              I’m a solo developer and creator also a calisthenics athlete who loves building things that help people grow and improve their lives.
            </p>

            <p>
              Every app I create is designed to be clean, minimal, and meaningful. My goal is to prove that even one person, with discipline, vision and ambition, can build something that make a difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-8"
          >
            <h2 className="text-2xl font-light text-white mb-6">Connect With Me</h2>
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
