import React from 'react';
import { ProjectItem } from '../../types';
import { CursorArrowArea } from '../motion/CursorArrow';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, featured = false }) => {
  return (
    <div
      className={`group relative rounded-2xl glass-panel overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <CursorArrowArea
        label="Explore"
        accentColor={project.accentColor || '#8B5CF6'}
        onClick={() => onSelect(project)}
        className="w-full h-full flex flex-col cursor-pointer"
      >
        {/* Visual Media Showcase Container */}
        <div className="relative w-full aspect-[16/10] bg-[#0E0C17] overflow-hidden border-b border-white/5">
          {/* Subtle Ambient Accent Gradient */}
          <div
            className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
            style={{
              background: `radial-gradient(circle at 60% 40%, ${project.accentColor || '#8B5CF6'} 0%, transparent 70%)`
            }}
          />

          {/* Dynamic Graphic Mockup Based on Project Type */}
          <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105">
            {project.previewType === 'video' && (
              <div className="w-full max-w-sm rounded-xl glass-panel-elevated p-3.5 shadow-2xl">
                {/* Simulated DaVinci/Premiere timeline header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono-code text-[#B4B0C5]">
                  <span>TIMELINE: 24.00 FPS</span>
                  <span className="text-[#A78BFA]">00:01:42:18</span>
                </div>
                {/* Timeline tracks */}
                <div className="pt-2 space-y-1.5">
                  <div className="h-4 rounded bg-[#201C30] border border-violet-500/20 flex items-center px-2">
                    <span className="text-[9px] font-mono-code text-[#A78BFA]">V1 // SPEED RAMP</span>
                  </div>
                  <div className="h-4 rounded bg-[#171522] flex items-center px-2">
                    <span className="text-[9px] font-mono-code text-[#B4B0C5]">V2 // COLOR GRADE</span>
                  </div>
                  <div className="h-3.5 rounded bg-[#100D1C] flex items-center px-2">
                    <span className="text-[8px] font-mono-code text-cyan-400">A1 // SFX IMPACT</span>
                  </div>
                </div>
              </div>
            )}

            {project.previewType === 'image' && (
              <div className="w-full max-w-sm aspect-[16/9] rounded-xl glass-panel-elevated p-4 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#E879F9]/20 rounded-full blur-xl" />
                <div className="text-[10px] font-mono-code text-[#B4B0C5] flex items-center justify-between">
                  <span>COMPOSITION MATRIX</span>
                  <span className="text-[#E879F9]">1280 × 720</span>
                </div>
                <div className="my-auto text-center">
                  <div className="font-display font-black text-xl text-[#F5F3FA] tracking-wider uppercase drop-shadow-md">
                    DUAL CONTRAST
                  </div>
                  <div className="text-[10px] font-mono-code text-[#A78BFA] tracking-widest mt-1">
                    FOCAL CLASH POINT
                  </div>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono-code text-[#B4B0C5]">
                  <span>RIM: 4500K</span>
                  <span>DEPTH: LAYER 4</span>
                </div>
              </div>
            )}

            {project.previewType === 'code' && (
              <div className="w-full max-w-sm rounded-xl glass-panel-elevated p-3.5 shadow-2xl text-[10px] font-mono-code">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[#B4B0C5]">
                  <span className="text-[#34D399]">cwr-core.yml</span>
                  <span className="text-emerald-400">TPS: 20.0</span>
                </div>
                <div className="pt-2 text-[#B4B0C5] space-y-0.5">
                  <div><span className="text-purple-400">server:</span> paper-1.20</div>
                  <div>&nbsp;&nbsp;<span className="text-amber-300">async-chunks:</span> true</div>
                  <div>&nbsp;&nbsp;<span className="text-amber-300">economy-sync:</span> redis-cluster</div>
                  <div>&nbsp;&nbsp;<span className="text-amber-300">staff-escalation:</span> active</div>
                </div>
              </div>
            )}
          </div>

          {/* Top Category and Concept Tag */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono-code">
            <span className="text-[#F5F3FA] bg-[#08080D]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              {project.categoryLabel}
            </span>
            {project.isConcept && (
              <span className="text-[11px] text-[#B4B0C5] bg-[#08080D]/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/5">
                Concept Showcase
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-display font-bold text-lg text-[#F5F3FA] group-hover:text-[#A78BFA] transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-[#B4B0C5] line-clamp-2 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Tools & Affordance Footer */}
          <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
            {/* Unboxed tools list with typographic separators */}
            <div className="flex items-center gap-1.5 text-[#B4B0C5] text-[11px] font-mono-code truncate mr-2">
              {project.tools.slice(0, 3).map((tool, idx) => (
                <React.Fragment key={tool}>
                  <span>{tool}</span>
                  {idx < Math.min(project.tools.length, 3) - 1 && <span className="text-[#6D6786]">/</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center gap-1 text-[#A78BFA] font-mono-code text-xs shrink-0 group-hover:translate-x-1 transition-transform">
              <span>View</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>
      </CursorArrowArea>
    </div>
  );
};
