import React, { useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const prefersReduced = useReducedMotionPreference();

  // Reset scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (prefersReduced) {
    return <main className="pt-20 min-h-screen">{children}</main>;
  }

  return (
    <motion.main
      key={location.pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="pt-20 min-h-screen relative"
    >
      {children}
    </motion.main>
  );
};
