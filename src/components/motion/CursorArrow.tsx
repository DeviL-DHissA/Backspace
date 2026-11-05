import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface CursorArrowAreaProps {
  children: ReactNode;
  label?: string;
  className?: string;
  onClick?: () => void;
  accentColor?: string;
}

export const CursorArrowArea: React.FC<CursorArrowAreaProps> = ({
  children,
  label = "View",
  className = "",
  onClick,
  accentColor = "#8B5CF6"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReduced = useReducedMotionPreference();

  // Position references for RAF smooth physics
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const rotation = useRef(45); // Default 45deg up-right
  const targetRotation = useRef(45);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice || prefersReduced) return;

    const animate = () => {
      // Smooth interpolation (lerp)
      const ease = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      // Rotation lerp
      rotation.current += (targetRotation.current - rotation.current) * 0.12;

      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        const arrowEl = badgeRef.current.querySelector('.cursor-arrow-icon') as HTMLElement | null;
        if (arrowEl) {
          arrowEl.style.transform = `rotate(${rotation.current}deg)`;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    if (isHovered) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    }

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isHovered, isTouchDevice, prefersReduced]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || prefersReduced) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    currentPos.current = { x, y };
    lastPos.current = { x, y };
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || prefersReduced) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targetPos.current = { x, y };

    // Calculate velocity / direction vector
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 2) {
      // Angle in degrees from vector
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      targetRotation.current = angle;
      lastPos.current = { x, y };
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetRotation.current = 45;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden group select-none ${className}`}
    >
      {children}

      {/* Contextual follower badge with directional arrowhead */}
      {!isTouchDevice && !prefersReduced && (
        <div
          ref={badgeRef}
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-0 -ml-7 -mt-7 z-30 transition-opacity duration-200 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-md border border-white/20 text-[#FFFFFF] font-semibold text-xs tracking-wider"
            style={{ backgroundColor: accentColor }}
          >
            <span>{label}</span>
            <svg
              className="cursor-arrow-icon w-3.5 h-3.5 transition-transform duration-75"
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
        </div>
      )}
    </div>
  );
};
