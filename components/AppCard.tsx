'use client';

import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AppCardProps {
  name: string;
  description: string;
  category: string;
  playStoreUrl: string;
}

export default function AppCard({ name, description, category, playStoreUrl }: AppCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs text-neutral-400 font-light uppercase tracking-wider">
            {category}
          </span>
          <h3 className="text-2xl font-light text-white">{name}</h3>
        </div>

        <p className="text-neutral-300 font-light leading-relaxed min-h-[4rem]">
          {description}
        </p>

        <div className="flex flex-col gap-3 pt-4">
          <motion.a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className="w-full bg-white text-black hover:bg-neutral-200 transition-all duration-300 font-light group/btn"
            >
              View App
              <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.a>

          <Link href="/legal">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300 font-light"
              >
                <FileText className="mr-2 w-4 h-4" />
                Legal Docs
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
