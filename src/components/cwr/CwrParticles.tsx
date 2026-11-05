import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

export const CwrParticles: React.FC = () => {
  const prefersReduced = useReducedMotionPreference();

  if (prefersReduced) return null;

  // 16 stylized floating voxel particles
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: (i % 3) * 4 + 6,
    left: `${(i * 19) % 94 + 3}%`,
    top: `${(i * 23) % 90 + 5}%`,
    duration: 6 + (i % 5) * 2,
    delay: (i % 4) * 0.8,
    color: i % 2 === 0 ? '#34D399' : '#38BDF8'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: 0, opacity: 0.15, rotate: 0 }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.15, 0.45, 0.15],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color
          }}
          className="rounded-[2px] shadow-[0_0_10px_rgba(52,211,153,0.3)] opacity-30"
        />
      ))}
    </div>
  );
};
