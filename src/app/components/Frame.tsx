import { useState } from 'react';
import { motion } from 'motion/react';

interface FrameProps {
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children?: React.ReactNode;
  onClick?: () => void;
  id?: string;
}

export function Frame({ title, x, y, width, height, children, onClick, id }: FrameProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 1000);
    onClick?.();
  };

  return (
    <motion.div
      id={id}
      className="absolute"
      style={{
        left: x,
        top: y,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.009 }}
      transition={{ duration: 0.3 }}
    >
      {/* Frame container */}
      <motion.div
        className="relative bg-transparent rounded-sm overflow-hidden"
        style={{
          width,
          height,
          border: 'none',
          boxShadow: 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Selection glow */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            border: '2px solid #0066ff',
            boxShadow: '0 0 0 4px rgba(0, 102, 255, 0.2)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}