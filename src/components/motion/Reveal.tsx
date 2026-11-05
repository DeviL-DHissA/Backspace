import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 32,
  className = ''
}) => {
  const prefersReduced = useReducedMotionPreference();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      case 'none': return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();
  const start = `translate3d(${offset.x}px, ${offset.y}px, 0) scale(.985)`;
  const finish = 'translate3d(0, 0, 0) scale(1)';

  return (
    <motion.div
      initial={{ opacity: 0, transform: start }}
      whileInView={{ opacity: 1, transform: finish }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
