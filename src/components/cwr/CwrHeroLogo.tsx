import React from 'react';
import { motion } from 'framer-motion';

export const CwrHeroLogo: React.FC = () => {
  return (
    <div className="relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] mx-auto flex flex-col items-center justify-center select-none">
      {/* 1. Ambient Emerald & Netherite Aura Glowing Behind the Floating Island */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] bg-gradient-to-tr from-emerald-500/30 via-emerald-400/20 to-teal-400/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* 2. Ambient Floating Voxel Sparks drifting around the floating island */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-[1px] bg-[#34D399] shadow-[0_0_8px_#34D399]"
            initial={{
              x: 40 + (i * 55) % 360,
              y: 80 + (i * 45) % 280,
              opacity: 0.15
            }}
            animate={{
              y: [80 + (i * 45) % 280, 40 + (i * 45) % 280, 80 + (i * 45) % 280],
              opacity: [0.15, 0.8, 0.15],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3.5 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* 3. Pure Floating CWR Island Logo - Free floating with no square container */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          rotate: [-1.2, 1.2, -1.2]
        }}
        transition={{
          repeat: Infinity,
          duration: 5.5,
          ease: "easeInOut"
        }}
        className="relative z-10 w-full flex items-center justify-center filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)] drop-shadow-[0_0_45px_rgba(16,185,129,0.35)] drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]"
      >
        <img
          src="/assets/images/cwr_logo.webp"
          alt="Official CWR Network Floating Island Logo"
          className="w-full max-h-[460px] sm:max-h-[520px] object-contain transition-transform duration-500 hover:scale-105 pointer-events-auto cursor-pointer"
          loading="eager"
        />
      </motion.div>

      {/* 4. Subtle Floating Server Status Line below Island (Borderless) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 flex items-center gap-2 text-xs font-mono-code text-[#A7F3D0]/80 tracking-widest uppercase z-10"
      >
        <span className="w-2 h-2 rounded-[1px] bg-[#34D399] animate-pulse" />
        <span className="text-[#34D399] font-bold">MC.CWRESPORTS.LK</span>
        <span className="text-emerald-500/40">·</span>
        <span className="text-emerald-300/70">STAFF ECOSYSTEM</span>
      </motion.div>
    </div>
  );
};
