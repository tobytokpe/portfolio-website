import { motion, AnimatePresence } from 'motion/react';

interface ModalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalOverlay({ isOpen, onClose }: ModalOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 bg-black/6 z-50"
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
}
