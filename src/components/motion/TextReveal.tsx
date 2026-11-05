import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  tag: Tag = 'h2',
  stagger = 0.04,
  delay = 0
}) => {
  const prefersReduced = useReducedMotionPreference();
  const words = text.split(' ');

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block mr-[0.28em] whitespace-nowrap overflow-hidden py-1">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
