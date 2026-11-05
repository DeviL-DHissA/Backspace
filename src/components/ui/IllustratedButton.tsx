import React from 'react';
import { Link } from 'react-router-dom';
import { DimensionalCrystal } from '../art/DimensionalCrystal';
import { VoxelEmerald } from '../art/VoxelEmerald';

export type IllustratedButtonVariant = 'primary' | 'secondary' | 'cwr-portal' | 'compact';

interface IllustratedButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  subtitle?: string;
  tag?: string;
  variant?: IllustratedButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export const IllustratedButton: React.FC<IllustratedButtonProps> = ({
  to,
  href,
  onClick,
  children,
  subtitle,
  tag,
  variant = 'primary',
  className = '',
  target,
  rel,
  disabled = false
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isCwrPortal = variant === 'cwr-portal';
  const isCompact = variant === 'compact';

  // Base interactive styles
  const baseWrapperStyles =
    "group relative inline-flex items-center text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080D] transition-all duration-300";

  const renderContent = () => {
    if (isPrimary) {
      return (
        <div className="relative flex items-center justify-between gap-5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#17122B] via-[#1A1530] to-[#130E26] border border-[#8B5CF6]/40 hover:border-[#A78BFA] shadow-[0_4px_25px_rgba(139,92,246,0.25)] hover:shadow-[0_6px_35px_rgba(139,92,246,0.45)] transition-all duration-300 transform group-hover:-translate-y-0.5 overflow-visible">
          {/* Subtle Cyber Grid Background Texture */}
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

          {/* Left Articulated Protruding Crystal Ornament */}
          <div className="relative -ml-2 -my-2 flex items-center justify-center">
            <DimensionalCrystal size={38} className="transform group-hover:scale-110 transition-transform duration-300" />
          </div>

          {/* Text Stack */}
          <div className="flex flex-col min-w-0 pr-2">
            {tag && (
              <span className="text-[10px] font-mono-code font-bold tracking-widest text-[#A78BFA] uppercase">
                {tag}
              </span>
            )}
            <span className="font-display font-black text-sm sm:text-base tracking-wider uppercase text-[#FFFFFF] group-hover:text-[#F5F3FA] transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {children}
            </span>
            {subtitle && (
              <span className="text-[11px] font-mono-code text-[#B4B0C5] group-hover:text-[#DDD6FE] transition-colors">
                {subtitle}
              </span>
            )}
          </div>

          {/* Right Directional Receptacle */}
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#8B5CF6]/50 flex items-center justify-center shrink-0 transition-colors shadow-inner">
            <svg
              className="w-4 h-4 text-[#A78BFA] group-hover:text-[#FFFFFF] transform group-hover:translate-x-0.5 transition-all"
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
          </div>

          {/* Bottom Neon Accent Rail */}
          <div className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
      );
    }

    if (isCwrPortal) {
      return (
        <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl bg-[#091511] border border-emerald-500/35 hover:border-emerald-400 shadow-[0_4px_20px_rgba(16,185,129,0.18)] hover:shadow-[0_6px_30px_rgba(52,211,153,0.35)] transition-all duration-300 transform group-hover:-translate-y-0.5">
          {/* Subtle Voxel Grid */}
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:10px_10px] opacity-15 pointer-events-none" />

          {/* Left Dimensional Voxel Emerald Art */}
          <div className="relative -ml-1 flex items-center justify-center">
            <VoxelEmerald size={32} type="emerald" className="transform group-hover:scale-110 transition-transform duration-300" />
          </div>

          {/* Text Stack */}
          <div className="flex flex-col min-w-0 pr-1">
            <span className="text-[9px] font-mono-code font-bold tracking-widest text-[#34D399] uppercase">
              {tag || 'MC NETWORK · STAFF'}
            </span>
            <span className="font-display font-bold text-sm tracking-wide text-[#F5F3FA] group-hover:text-[#FFFFFF] transition-colors">
              {children}
            </span>
          </div>

          {/* Minecraft Directional Arrow Box */}
          <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/30 group-hover:border-emerald-400/60 flex items-center justify-center shrink-0 transition-colors">
            <svg
              className="w-3.5 h-3.5 text-[#34D399] group-hover:text-emerald-200 transform group-hover:translate-x-0.5 transition-all"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      );
    }

    if (isSecondary) {
      return (
        <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl bg-[#110E1D]/90 border border-white/10 hover:border-violet-500/40 shadow-md hover:shadow-[0_4px_20px_rgba(139,92,246,0.2)] transition-all duration-300 transform group-hover:-translate-y-0.5">
          {/* Small Geometric Fold Motif */}
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#8B5CF6]/30 to-[#E879F9]/30 border border-white/15 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
          </div>

          <div className="flex flex-col min-w-0 pr-1">
            {tag && (
              <span className="text-[9px] font-mono-code text-[#A78BFA] uppercase tracking-wider">
                {tag}
              </span>
            )}
            <span className="font-display font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#F5F3FA] group-hover:text-[#FFFFFF] transition-colors">
              {children}
            </span>
          </div>

          <svg
            className="w-3.5 h-3.5 text-[#B4B0C5] group-hover:text-[#FFFFFF] transform group-hover:translate-x-0.5 transition-transform shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      );
    }

    // Compact variant
    return (
      <div className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-white/10 text-xs font-mono-code text-[#F5F3FA] transition-all">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
        <span>{children}</span>
      </div>
    );
  };

  if (to) {
    return (
      <Link to={to} className={`${baseWrapperStyles} ${className}`}>
        {renderContent()}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noreferrer noopener' : undefined)}
        className={`${baseWrapperStyles} ${className}`}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseWrapperStyles} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {renderContent()}
    </button>
  );
};
