import React from 'react';

interface VoxelProps {
  className?: string;
  size?: number;
  type?: 'emerald' | 'obsidian' | 'netherite';
}

export const VoxelEmerald: React.FC<VoxelProps> = ({
  className = "w-8 h-8",
  size = 32,
  type = 'emerald'
}) => {
  const isEmerald = type === 'emerald';
  const isObsidian = type === 'obsidian';

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Ambient optical back-glow */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-70 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundColor: isEmerald ? '#10B981' : isObsidian ? '#8B5CF6' : '#6B7280'
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-115 group-hover:-translate-y-0.5"
      >
        <defs>
          {/* Emerald Palettes */}
          <linearGradient id="em-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="em-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="em-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          {/* Obsidian Palettes */}
          <linearGradient id="obs-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
          <linearGradient id="obs-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#581C87" />
            <stop offset="100%" stopColor="#2E1065" />
          </linearGradient>
          <linearGradient id="obs-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B0764" />
            <stop offset="100%" stopColor="#0F051D" />
          </linearGradient>
        </defs>

        {isEmerald && (
          <>
            {/* Cut Emerald Octagonal Gem Geometry */}
            {/* Top Table Facet */}
            <polygon points="22,10 42,10 50,18 42,26 22,26 14,18" fill="url(#em-top)" />
            
            {/* Top Angled Facets */}
            <polygon points="22,10 42,10 32,4" fill="#D1FAE5" opacity="0.9" />
            <polygon points="14,18 22,10 8,14" fill="#6EE7B7" opacity="0.8" />
            <polygon points="42,10 50,18 56,14" fill="#34D399" opacity="0.8" />

            {/* Side Beveled Walls */}
            <polygon points="14,18 22,26 20,44 10,38" fill="url(#em-left)" />
            <polygon points="42,26 50,18 54,38 44,44" fill="url(#em-right)" />

            {/* Bottom Pavilion Keel */}
            <polygon points="22,26 42,26 32,58 20,44" fill="url(#em-left)" />
            <polygon points="42,26 32,58 44,44" fill="url(#em-right)" />

            {/* Specular Glint Lines */}
            <polyline points="32,4 42,10 42,26 32,58" stroke="#ECFDF5" strokeWidth="1.2" opacity="0.85" />
            <line x1="22" y1="10" x2="22" y2="26" stroke="#A7F3D0" strokeWidth="1" opacity="0.6" />
            <line x1="14" y1="18" x2="50" y2="18" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" strokeDasharray="2 2" />

            {/* Sparkle Glint */}
            <circle cx="28" cy="14" r="2" fill="#FFFFFF" />
            <circle cx="34" cy="20" r="1.5" fill="#D1FAE5" />
          </>
        )}

        {isObsidian && (
          <>
            {/* Obsidian Monolith Cube with Crystal Fracture */}
            {/* Top Voxel Face */}
            <polygon points="32,6 56,18 32,30 8,18" fill="url(#obs-top)" />
            {/* Left Face */}
            <polygon points="8,18 32,30 32,56 8,44" fill="url(#obs-left)" />
            {/* Right Face */}
            <polygon points="32,30 56,18 56,44 32,56" fill="url(#obs-right)" />

            {/* Amethyst Vein Fractures */}
            <polyline points="20,14 32,20 44,14" stroke="#F0ABFC" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
            <polyline points="32,30 26,40 32,50" stroke="#E879F9" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <polyline points="32,30 40,38 36,48" stroke="#D946EF" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

            {/* Glowing Corner Accents */}
            <circle cx="32" cy="20" r="2" fill="#FFFFFF" />
            <circle cx="26" cy="40" r="1.5" fill="#F472B6" />
          </>
        )}
      </svg>
    </div>
  );
};
