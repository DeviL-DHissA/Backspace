import React from 'react';

interface CrystalProps {
  className?: string;
  size?: number;
  glowColor?: string;
}

export const DimensionalCrystal: React.FC<CrystalProps> = ({
  className = "w-8 h-8",
  size = 32,
  glowColor = "#8B5CF6"
}) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Ambient optical back-glow */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: glowColor }}
      />
      
      {/* Dimensional Isometric Polyhedron SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
      >
        <defs>
          <linearGradient id="facet-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <linearGradient id="facet-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="facet-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="facet-bottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E879F9" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
        </defs>

        {/* Top Crystal Apex */}
        <polygon points="32,4 52,22 32,28 12,22" fill="url(#facet-top)" opacity="0.95" />
        
        {/* Left Dimensional Facet */}
        <polygon points="12,22 32,28 32,54 8,36" fill="url(#facet-left)" />
        
        {/* Right Dimensional Facet */}
        <polygon points="32,28 52,22 56,36 32,54" fill="url(#facet-right)" />

        {/* Bottom Refraction Keel */}
        <polygon points="32,28 32,54 24,60 32,60" fill="url(#facet-bottom)" opacity="0.75" />

        {/* Edge Highlight Wireframes */}
        <polyline points="32,4 12,22 8,36 32,54" stroke="#EDE9FE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <polyline points="32,4 52,22 56,36 32,54" stroke="#F5F3FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <line x1="32" y1="4" x2="32" y2="28" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <line x1="32" y1="28" x2="32" y2="54" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

        {/* Glimmering Apex Star */}
        <circle cx="32" cy="4" r="2" fill="#FFFFFF" />
        <circle cx="32" cy="28" r="1.5" fill="#DDD6FE" />
      </svg>
    </div>
  );
};
