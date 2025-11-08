'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradientBackground from '@/components/GradientBackground';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <GradientBackground />

      <section className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-8 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <Smartphone className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-400 font-light">Independent Developer Studio</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-white">
            Minor Devs Studios
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Building meaningful and minimal apps for the next generation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link href="/apps">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-neutral-200 transition-all duration-300 px-8 py-6 text-base font-light group"
              >
                Explore Apps
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 px-8 py-6 text-base font-light"
              >
                About the Developer
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
