'use client';

import { motion } from 'framer-motion';
import AppCard from '@/components/AppCard';
import LiquidLightBackground from '@/components/LiquidLightBackground';

interface App {
  name: string;
  description: string;
  category: string;
  playStoreUrl: string;
}

export default function Apps() {
  const apps: App[] = [
    // {
    //  name: 'Challenge Cards',
    //  description: 'Break the Unconcious Loop of Bad Habits with AI-Powered Challenge Cards. Transform your life with one challenge at a time.',
    //  category: 'Focus & Productivity',
    //  playStoreUrl: '#',
    // },
    // {
    //   name: 'Healthier',
    //   description: 'Smarter food decisions, powered by AI. Your intelligent companion for nutrition tracking and wellness insights.',
    //   category: 'Health & Fitness',
    //   playStoreUrl: '#',
    // },
    // {
    //   name: 'Expense AI',
    //   description: 'Track spending through intelligence. Revolutionary expense management using AI-powered receipt scanning.',
    //   category: 'Finance',
    //   playStoreUrl: '#',
    // },
 ];

  return (
    <div className="min-h-screen relative">
      <LiquidLightBackground />

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
              Built and Designed with Care, Minimalism and Beauty with Purpose.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
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
                className="max-w-md w-full"
              >
                <AppCard {...app} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center"
          >
            <p className="text-sm text-white/50 font-light">
              Apps Launching Soon...
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
