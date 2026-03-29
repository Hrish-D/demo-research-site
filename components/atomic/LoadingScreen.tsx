'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  // Timer fallback — ensures we always transition
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Circular loader */}
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="url(#loaderGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={213.6}
            initial={{ strokeDashoffset: 213.6 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-2 h-2 rounded-full bg-orange-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}
