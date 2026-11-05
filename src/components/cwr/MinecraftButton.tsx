import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { VoxelEmerald } from '../art/VoxelEmerald';

interface MinecraftButtonProps {
  children: ReactNode;
  subtitle?: string;
  tag?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'emerald' | 'obsidian' | 'stone';
  className?: string;
  icon?: ReactNode;
}

export const MinecraftButton: React.FC<MinecraftButtonProps> = ({
  children,
  subtitle,
  tag,
  to,
  href,
  onClick,
  variant = 'emerald',
  className = '',
  icon
}) => {
  const isEmerald = variant === 'emerald';
  const isObsidian = variant === 'obsidian';
  const isStone = variant === 'stone';

  const baseStyles =
    "group relative inline-flex items-center text-left transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 active:translate-y-0.5";

  const renderContent = () => {
    if (isEmerald) {
      return (
        <div className="relative flex items-center gap-3.5 px-5 py-3 rounded-xl bg-gradient-to-b from-[#10B981] via-[#059669] to-[#047857] text-[#070B0A] border-t-2 border-l-2 border-[#6EE7B7] border-b-2 border-r-2 border-[#064E3B] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.45),0_4px_16px_rgba(16,185,129,0.35)] group-hover:brightness-110 group-hover:shadow-[inset_1px_1px_0px_rgba(255,255,255,0.6),0_6px_22px_rgba(52,211,153,0.5)] transition-all">
          {/* 3D Isometric Voxel Emerald Illustration */}
          <div className="relative -ml-1 flex items-center justify-center shrink-0">
            <VoxelEmerald size={28} type="emerald" className="group-hover:scale-115 transition-transform duration-200" />
          </div>

          <div className="flex flex-col min-w-0 pr-1">
            {tag && (
              <span className="text-[9px] font-mono-code font-bold text-[#064E3B] tracking-widest uppercase">
                {tag}
              </span>
            )}
            <span className="font-mono-code font-black text-xs uppercase tracking-wider text-[#052E16] group-hover:text-[#022c22] transition-colors">
              {children}
            </span>
            {subtitle && (
              <span className="text-[10px] font-mono-code text-[#064E3B] opacity-90">
                {subtitle}
              </span>
            )}
          </div>

          {/* Minecraft Directional Marker */}
          <div className="w-6 h-6 rounded-md bg-[#047857]/40 border border-[#A7F3D0]/40 flex items-center justify-center shrink-0">
            {icon || (
              <svg className="w-3.5 h-3.5 text-[#070B0A] group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            )}
          </div>
        </div>
      );
    }

    if (isObsidian) {
      return (
        <div className="relative flex items-center gap-3.5 px-5 py-3 rounded-xl bg-gradient-to-b from-[#1E182E] via-[#130E22] to-[#0A0713] text-[#A7F3D0] border-t-2 border-l-2 border-[#581C87] border-b-2 border-r-2 border-[#090511] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.6)] group-hover:border-[#7E22CE] group-hover:shadow-[0_6px_22px_rgba(139,92,246,0.3)] transition-all">
          {/* Obsidian Voxel Cube Art */}
          <div className="relative -ml-1 flex items-center justify-center shrink-0">
            <VoxelEmerald size={26} type="obsidian" className="group-hover:scale-115 transition-transform duration-200" />
          </div>

          <div className="flex flex-col min-w-0 pr-1">
            {tag && (
              <span className="text-[9px] font-mono-code text-[#C084FC] tracking-widest uppercase">
                {tag}
              </span>
            )}
            <span className="font-mono-code font-bold text-xs uppercase tracking-wider text-[#F5F3FA] group-hover:text-[#FFFFFF] transition-colors">
              {children}
            </span>
            {subtitle && (
              <span className="text-[10px] font-mono-code text-[#A78BFA]/80">
                {subtitle}
              </span>
            )}
          </div>

          <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            {icon || (
              <svg className="w-3.5 h-3.5 text-[#C084FC] group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            )}
          </div>
        </div>
      );
    }

    // Stone variant
    return (
      <div className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-b from-[#2E2E35] to-[#1E1E24] text-[#F5F3FA] border-t-2 border-l-2 border-[#4A4A55] border-b-2 border-r-2 border-[#121216] shadow-[inset_1px_1px_0px_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)] group-hover:bg-[#3F3F4A] transition-all">
        <span className="w-2 h-2 rounded-[1px] bg-[#9CA3AF] shrink-0" />
        <span className="font-mono-code font-semibold text-xs uppercase tracking-wider text-[#F5F3FA]">
          {children}
        </span>
        {icon || (
          <svg className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </div>
    );
  };

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${className}`}>
        {renderContent()}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={`${baseStyles} ${className}`}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {renderContent()}
    </button>
  );
};
