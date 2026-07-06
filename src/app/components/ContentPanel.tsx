import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContentPanelProps {
  projectTitle: string;
  iframeUrl: string;
  onClose: () => void;
}

export function ContentPanel({ projectTitle, iframeUrl, onClose }: ContentPanelProps) {
  return (
    <div className="flex-1 h-full flex flex-col bg-white">
      {/* Header Bar */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-[#F0F0F0]">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-gray-900 font-['Syne']">{projectTitle}</h2>
          <span className="text-xs text-gray-400">Case Study</span>
        </div>
        
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F2F2F2] transition-colors"
          aria-label="Close modal"
        >
          <X size={18} className="text-gray-600" />
        </button>
      </div>
      
      {/* Iframe Container */}
      <div className="flex-1 overflow-hidden bg-white relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={iframeUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full h-full"
          >
            <iframe
              src={iframeUrl}
              className="w-full h-full border-0"
              title={projectTitle}
              style={{
                boxShadow: 'inset 0px 1px 2px rgba(0,0,0,0.04)'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}