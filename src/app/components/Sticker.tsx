import { useState } from 'react';
import { motion } from 'motion/react';

interface StickerProps {
  src: string;
  className?: string;
  factor?: number;
  alt?: string;
}

export function Sticker({ src, className = '', factor = 20, alt = 'sticker' }: StickerProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setCoords({ x: x * factor, y: y * factor });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={`cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: coords.x,
        y: coords.y,
        scale: isHovered ? 1.15 : 1,
      }}
      whileHover={{
        rotate: [0, -8, 8, -4, 4, 0],
        transition: { duration: 0.4, ease: "easeInOut" }
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
}
