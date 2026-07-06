import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'motion/react';

interface CanvasProps {
  children: React.ReactNode;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const FRICTION = 0.92;
const VELOCITY_THRESHOLD = 0.1;

export function Canvas({ children }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const animationFrame = useRef<number | null>(null);

  // Inertial scrolling
  useEffect(() => {
    if (isDragging) return;

    const animate = () => {
      setVelocity((vel) => {
        const newVelX = vel.x * FRICTION;
        const newVelY = vel.y * FRICTION;

        if (Math.abs(newVelX) < VELOCITY_THRESHOLD && Math.abs(newVelY) < VELOCITY_THRESHOLD) {
          return { x: 0, y: 0 };
        }

        setTransform((t) => ({
          ...t,
          x: t.x + newVelX,
          y: t.y + newVelY,
        }));

        return { x: newVelX, y: newVelY };
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    if (velocity.x !== 0 || velocity.y !== 0) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [velocity, isDragging]);

  // Handle wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey || e.metaKey) {
      // Zoom
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = -e.deltaY * 0.01;
      const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, transform.scale * (1 + delta)));

      // Cursor-centered zoom
      const scaleFactor = newScale / transform.scale;
      const newX = mouseX - scaleFactor * (mouseX - transform.x);
      const newY = mouseY - scaleFactor * (mouseY - transform.y);

      setTransform({
        x: newX,
        y: newY,
        scale: newScale,
      });
    } else {
      // Pan with trackpad
      setTransform((t) => ({
        ...t,
        x: t.x - e.deltaX,
        y: t.y - e.deltaY,
      }));
    }
  }, [transform]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    lastPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    setVelocity({ x: 0, y: 0 });
    document.body.style.cursor = 'grabbing';
  };

  // Handle drag move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setTransform((t) => ({
      ...t,
      x: newX,
      y: newY,
    }));

    // Calculate velocity
    const now = Date.now();
    const dt = now - lastPos.current.time;
    if (dt > 0) {
      const vx = (e.clientX - lastPos.current.x) / dt * 16;
      const vy = (e.clientY - lastPos.current.y) / dt * 16;
      setVelocity({ x: vx, y: vy });
    }

    lastPos.current = { x: e.clientX, y: e.clientY, time: now };
  }, [isDragging, dragStart]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = '';
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Disable default scrolling
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('scroll', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 overflow-hidden bg-[#f5f5f5]"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, #d0d0d0 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Canvas content */}
      <motion.div
        animate={{
          x: transform.x,
          y: transform.y,
          scale: transform.scale,
        }}
        transition={{ duration: 0 }}
        style={{
          transformOrigin: '0 0',
          willChange: 'transform',
        }}
        className="absolute"
      >
        {children}
      </motion.div>
    </div>
  );
}
