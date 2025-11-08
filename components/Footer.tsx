'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-white font-light text-lg">Minor Devs Studios</h3>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Building meaningful and minimal apps for the next generation.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-light text-lg">Navigation</h3>
            <div className="space-y-2">
              <Link href="/">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="text-neutral-400 text-sm font-light hover:text-white transition-colors"
                >
                  Home
                </motion.div>
              </Link>
              <Link href="/about">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="text-neutral-400 text-sm font-light hover:text-white transition-colors"
                >
                  About
                </motion.div>
              </Link>
              <Link href="/apps">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="text-neutral-400 text-sm font-light hover:text-white transition-colors"
                >
                  Apps
                </motion.div>
              </Link>
              <Link href="/legal">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="text-neutral-400 text-sm font-light hover:text-white transition-colors"
                >
                  Legal
                </motion.div>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-light text-lg">Contact</h3>
            <a
              href="mailto:support@minordevs.studio"
              className="text-neutral-400 text-sm font-light hover:text-white transition-colors block"
            >
              support@minordevs.studio
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-neutral-500 text-sm font-light text-center">
            © {new Date().getFullYear()} Minor Devs Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
