'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface MiniMapProps {
  canvasWidth: number;
  canvasHeight: number;
  viewportX: number;
  viewportY: number;
  viewportWidth: number;
  viewportHeight: number;
  scale: number;
  onNavigate: (x: number, y: number) => void;
}

export function MiniMap({
  canvasWidth,
  canvasHeight,
  viewportX,
  viewportY,
  viewportWidth,
  viewportHeight,
  scale,
  onNavigate,
}: MiniMapProps) {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const MINIMAP_WIDTH = 200;
  const MINIMAP_HEIGHT = 120;
  const scaleX = MINIMAP_WIDTH / canvasWidth;
  const scaleY = MINIMAP_HEIGHT / canvasHeight;

  const viewportRectX = -viewportX * scaleX;
  const viewportRectY = -viewportY * scaleY;
  const viewportRectWidth = (viewportWidth / scale) * scaleX;
  const viewportRectHeight = (viewportHeight / scale) * scaleY;

  const handleClick = (e: React.MouseEvent<any>) => {
    const rect = minimapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetX = -(x / scaleX - viewportWidth / scale / 2);
    const targetY = -(y / scaleY - viewportHeight / scale / 2);

    onNavigate(targetX, targetY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleClick(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const rect = minimapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetX = -(x / scaleX - viewportWidth / scale / 2);
    const targetY = -(y / scaleY - viewportHeight / scale / 2);

    onNavigate(targetX, targetY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
        <div className="text-[10px] font-medium text-gray-500 mb-2">Canvas Overview</div>
        <div
          ref={minimapRef}
          className="relative bg-gray-50 rounded cursor-pointer"
          style={{
            width: MINIMAP_WIDTH,
            height: MINIMAP_HEIGHT,
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Canvas boundary outline */}
          <div
            className="absolute border border-gray-300"
            style={{
              left: 0,
              top: 0,
              width: MINIMAP_WIDTH,
              height: MINIMAP_HEIGHT,
            }}
          />

          {/* Viewport rectangle */}
          <motion.div
            className="absolute border-2 border-blue-500 bg-blue-500/10 rounded-sm pointer-events-none"
            style={{
              left: Math.max(0, Math.min(MINIMAP_WIDTH - viewportRectWidth, viewportRectX)),
              top: Math.max(0, Math.min(MINIMAP_HEIGHT - viewportRectHeight, viewportRectY)),
              width: Math.min(MINIMAP_WIDTH, viewportRectWidth),
              height: Math.min(MINIMAP_HEIGHT, viewportRectHeight),
            }}
            animate={{
              left: Math.max(0, Math.min(MINIMAP_WIDTH - viewportRectWidth, viewportRectX)),
              top: Math.max(0, Math.min(MINIMAP_HEIGHT - viewportRectHeight, viewportRectY)),
            }}
            transition={{ duration: 0 }}
          />

          {/* Simplified frame representations */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Hero */}
            <div
              className="absolute bg-gray-400 rounded-[1px]"
              style={{
                left: 50 * scaleX,
                top: 200 * scaleY,
                width: 800 * scaleX,
                height: 500 * scaleY,
              }}
            />
            {/* About */}
            <div
              className="absolute bg-gray-400 rounded-[1px]"
              style={{
                left: 950 * scaleX,
                top: 200 * scaleY,
                width: 600 * scaleX,
                height: 500 * scaleY,
              }}
            />
            {/* Selected Work */}
            <div
              className="absolute bg-gray-400 rounded-[1px]"
              style={{
                left: 1650 * scaleX,
                top: 200 * scaleY,
                width: 700 * scaleX,
                height: 500 * scaleY,
              }}
            />
            {/* Case Study 01 */}
            <div
              className="absolute bg-gray-400 rounded-[1px]"
              style={{
                left: 2450 * scaleX,
                top: 200 * scaleY,
                width: 1200 * scaleX,
                height: 800 * scaleY,
              }}
            />
            {/* Case Study 02 */}
            <div
              className="absolute bg-gray-400 rounded-[1px]"
              style={{
                left: 3750 * scaleX,
                top: 200 * scaleY,
                width: 1200 * scaleX,
                height: 800 * scaleY,
              }}
            />
            {/* Contact */}
            <div
              className="absolute bg-gray-400 rounded-[1px]"
              style={{
                left: 5050 * scaleX,
                top: 200 * scaleY,
                width: 600 * scaleX,
                height: 500 * scaleY,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
