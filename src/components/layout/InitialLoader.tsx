import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReduced) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 400);
          }, 150);
          return 100;
        }
        const increment = prev < 50 ? 10 : prev < 85 ? 16 : 22;
        return Math.min(100, prev + increment);
      });
    }, 55);

    const timeout = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 350);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080D] text-[#F5F3FA] select-none"
        >
          {/* Subtle background radial glow */}
          <div className="absolute w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Central Branded Lockup */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Directional Accent Arrowhead */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex items-center justify-center w-12 h-12 rounded-2xl glass-panel-elevated shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              <svg
                className="w-5 h-5 text-[#A78BFA]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.div>

            {/* Clipped DHISSA Wordmark */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-4xl sm:text-5xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#F5F3FA] via-[#A78BFA] to-[#E879F9]"
              >
                DHISSA
              </motion.h1>
            </div>

            {/* Sub-label disciplines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center gap-2 text-xs font-mono-code text-[#B4B0C5] tracking-widest uppercase mb-8"
            >
              <span>VIDEO</span>
              <span className="text-[#8B5CF6]">/</span>
              <span>THUMBNAILS</span>
              <span className="text-[#8B5CF6]">/</span>
              <span>MINECRAFT</span>
            </motion.div>

            {/* Segmented / Smooth Progress Bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#E879F9] to-[#60A5FA] shadow-[0_0_12px_#8B5CF6]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Tabular counter */}
            <div className="mt-3 text-xs font-mono-code text-[#B4B0C5] tabular-nums tracking-wider">
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
