import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface CwrVoxelLoaderProps {
  onComplete: () => void;
}

export const CwrVoxelLoader: React.FC<CwrVoxelLoaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReduced) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 400);
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete, prefersReduced]);

  if (prefersReduced) return null;

  // 9 Voxel Blocks forming an isometric Minecraft-style block structure
  const blocks = [
    { x: 0, y: -28, delay: 0.1, color: '#34D399' }, // Emerald top
    { x: -24, y: -14, delay: 0.2, color: '#10B981' },
    { x: 24, y: -14, delay: 0.25, color: '#059669' },
    { x: -48, y: 0, delay: 0.35, color: '#27272A' }, // Stone
    { x: 0, y: 0, delay: 0.4, color: '#34D399' },
    { x: 48, y: 0, delay: 0.45, color: '#27272A' },
    { x: -24, y: 14, delay: 0.55, color: '#18181B' }, // Obsidian
    { x: 24, y: 14, delay: 0.6, color: '#18181B' },
    { x: 0, y: 28, delay: 0.7, color: '#090D0C' }
  ];

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070B0A] text-[#F5F3FA] select-none"
        >
          {/* Subtle voxel grid overlay */}
          <div className="absolute inset-0 bg-voxel-grid opacity-30 pointer-events-none" />
          <div className="absolute w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Voxel Structure Assembly */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              {blocks.map((b, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: b.y - 40, scale: 0.5 }}
                  animate={{ opacity: 1, y: b.y, scale: 1 }}
                  transition={{ duration: 0.35, delay: b.delay, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    transform: `translate(${b.x}px, ${b.y}px)`,
                    backgroundColor: b.color
                  }}
                  className="w-8 h-8 rounded-sm border border-emerald-400/30 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                />
              ))}
            </div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="flex flex-col items-center space-y-1"
            >
              <span className="font-display font-black text-xl tracking-[0.2em] text-[#34D399]">
                CWR NETWORK
              </span>
              <span className="text-[10px] font-mono-code text-[#6EE7B7] tracking-widest uppercase">
                MINECRAFT SERVER ENVIRONMENT
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
