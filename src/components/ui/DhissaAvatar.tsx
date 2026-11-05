import React, { useState } from 'react';

interface DhissaAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const DhissaAvatar: React.FC<DhissaAvatarProps> = ({
  size = 'md',
  className = '',
  showBadge = true
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: 'w-7 h-7 text-[10px]',
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-28 h-28 text-3xl'
  }[size];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Outer ambient glow ring */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-[#8B5CF6] via-[#E879F9] to-[#60A5FA] rounded-2xl blur-md opacity-45 group-hover:opacity-75 transition-opacity duration-300" />

      {/* Main avatar surface */}
      <div
        className={`relative ${sizeClasses} rounded-2xl bg-[#171522] border border-white/20 overflow-hidden flex items-center justify-center shadow-xl select-none`}
      >
        {!imgError ? (
          <img
            src="/assets/images/dhissa_logo.png"
            alt="DHISSA logo"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          /* Branded high-fidelity avatar fallback */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#201C30] to-[#100D1C] p-1">
            <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#E879F9] to-[#67E8F9]">
              D
            </span>
            <span className="text-[7px] font-mono-code text-[#B4B0C5] tracking-widest uppercase">
              VoxOfD
            </span>
          </div>
        )}
      </div>

      {/* Status / Role pill badge */}
      {showBadge && (
        <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#100D1C] border border-[#8B5CF6]/50 flex items-center gap-1 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
          <span className="text-[9px] font-mono-code text-[#F5F3FA] font-medium leading-none">
            CWR
          </span>
        </div>
      )}
    </div>
  );
};
