'use client';

import { motion } from 'framer-motion';
import AppCard from '@/components/AppCard';
import LiquidLightBackground from '@/components/LiquidLightBackground';

export default function Apps() {
  const apps = [
    {
      name: 'Lovable',
      description: 'Where elegance meets emotion. A beautifully crafted space for meaningful connections and heartfelt moments.',
      category: 'Social',
      playStoreUrl: '#',
    },
    {
      name: 'Healthier',
      description: 'Smarter food decisions, powered by AI. Your intelligent companion for nutrition tracking and wellness insights.',
      category: 'Health & Fitness',
      playStoreUrl: '#',
    },
    {
      name: 'Expense AI',
      description: 'Track spending through vision and intelligence. Revolutionary expense management using AI-powered receipt scanning.',
      category: 'Finance',
      playStoreUrl: '#',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <GradientBackground />

      <section className="min-h-screen px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-6 mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">
              Our Apps
            </h1>
            <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
              Thoughtfully designed experiences that blend beauty with purpose.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <AppCard {...app} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
