import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { ContentPanel } from './ContentPanel';
import { useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  tag?: string;
  iframeUrl: string;
}

interface CaseStudyModalProps {
  isOpen: boolean;
  projects: Project[];
  activeProjectId: string;
  onProjectSelect: (id: string) => void;
  onClose: () => void;
}

export function CaseStudyModal({
  isOpen,
  projects,
  activeProjectId,
  onProjectSelect,
  onClose,
}: CaseStudyModalProps) {
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Trap focus and disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-8 pointer-events-none"
        >
          <div
            className="w-[90vw] h-[90vh] bg-white rounded-2xl border border-[#E5E5E5] shadow-[0px_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              projects={projects}
              activeProjectId={activeProjectId}
              onProjectSelect={onProjectSelect}
            />
            <ContentPanel
              projectTitle={activeProject.title}
              iframeUrl={activeProject.iframeUrl}
              onClose={onClose}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}