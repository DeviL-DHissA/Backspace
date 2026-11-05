import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyzingImage } from '../loading-ui/analyzing-image';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface CwrAnalyzingLoaderProps {
  onComplete: () => void;
}

export const CwrAnalyzingLoader: React.FC<CwrAnalyzingLoaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReduced) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 350);
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070B0A] text-[#34D399] select-none"
          style={{ '--loading-ui-analyzing-image-background': '#070B0A' } as React.CSSProperties}
        >
          {/* Subtle background voxel grid overlay */}
          <div className="absolute inset-0 bg-voxel-grid opacity-30 pointer-events-none" />
          <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Central Analyzing Image Animation */}
          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="p-4 rounded-2xl bg-[#0B1512] border border-emerald-500/30 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
              <AnalyzingImage className="w-16 h-16 text-[#34D399]" />
            </div>

            <div className="flex flex-col items-center space-y-1">
              <span className="font-display font-bold text-sm tracking-[0.25em] text-[#34D399] uppercase">
                ENTERING CWR WORLD
              </span>
              <span className="text-[10px] font-mono-code text-emerald-200/60 tracking-wider">
                INITIALIZING MINECRAFT ENVIRONMENT
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
