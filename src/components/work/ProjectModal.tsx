import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#08080D]/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel-elevated border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#F5F3FA] z-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#B4B0C5] hover:text-[#F5F3FA] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              aria-label="Close project modal"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#B4B0C5] mb-3">
              <span className="text-[#A78BFA] font-semibold">{project.categoryLabel}</span>
              <span>·</span>
              <span>{project.role}</span>
              {project.isConcept && (
                <>
                  <span>·</span>
                  <span className="text-[#E879F9]">Concept Prototype</span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-display font-bold leading-tight mb-4 text-gradient-brand">
              {project.title}
            </h2>

            {/* Summary */}
            <p className="text-base text-[#B4B0C5] leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Technical Highlights */}
            <div className="mb-8 p-5 rounded-2xl bg-[#100D1C] border border-white/10">
              <h4 className="text-xs font-mono-code text-[#A78BFA] uppercase tracking-wider mb-3">
                Key Technical & Creative Highlights
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#F5F3FA]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0 shadow-[0_0_8px_#8B5CF6]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Used */}
            <div className="mb-8">
              <h4 className="text-xs font-mono-code text-[#B4B0C5] uppercase tracking-wider mb-2">
                Tools & Technologies
              </h4>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#F5F3FA]">
                {project.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1.5 rounded-lg bg-[#171522] border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-code text-[#6D6786]">
              <span>Architecture ready for live media embed and production reels</span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-[#FFFFFF] font-semibold uppercase tracking-wider text-xs hover:opacity-95 transition-opacity"
              >
                Close Viewer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
