import React, { useEffect, useRef } from 'react';

interface CardRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface InteractiveGridBackgroundProps {
  transform?: { x: number; y: number; scale: number };
  cards?: CardRect[];
}

export function InteractiveGridBackground({
  transform = { x: 0, y: 0, scale: 1 },
  cards = [],
}: InteractiveGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    handleResize();

    const draw = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 9; // base spacing in pixels (reduced by 50%)
      const dotRadius = 0.8;
      const { x: panX, y: panY, scale } = transform;

      // Calculate screen-space bounding boxes for cards to apply gravity/warping
      const screenCards = cards.map((card) => ({
        x: card.x * scale + panX,
        y: card.y * scale + panY,
        w: card.width * scale,
        h: card.height * scale,
      }));

      // Base grid spacing scales with zoom
      const scaledSpacing = spacing * scale;
      
      // Determine viewport grid boundaries handling negative modulo alignment properly
      const startX = (((panX % scaledSpacing) + scaledSpacing) % scaledSpacing) - scaledSpacing;
      const startY = (((panY % scaledSpacing) + scaledSpacing) % scaledSpacing) - scaledSpacing;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      const mouseInfluenceRadius = 100; // increased to 100px
      const mouseWarpStrength = 10;     // increased to 10

      const cardInfluenceRadius = 20 * Math.max(0.7, scale); // reduced by 50%
      const cardWarpStrength = 5 * Math.max(0.7, scale);    // reduced by 50%

      for (let x = startX; x < canvas.width + scaledSpacing; x += scaledSpacing) {
        for (let y = startY; y < canvas.height + scaledSpacing; y += scaledSpacing) {
          let drawX = x;
          let drawY = y;

          // 1. Organic background breathing/wave effect
          const waveX = Math.sin(time + y * 0.008) * 0.6;
          const waveY = Math.cos(time + x * 0.008) * 0.6;
          drawX += waveX;
          drawY += waveY;



          // Render all dots to ensure the grid pattern is continuous under transparent cards

          // 3. Magnetic pull towards cursor hover
          if (mouseActive) {
            const dx = mouseX - drawX;
            const dy = mouseY - drawY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseInfluenceRadius) {
              const force = Math.pow(1 - dist / mouseInfluenceRadius, 2);
              // Pull dots slightly towards cursor
              drawX += (dx / dist) * force * mouseWarpStrength;
              drawY += (dy / dist) * force * mouseWarpStrength;
            }
          }

          // Draw the grid dot
          ctx.fillStyle = 'rgba(208, 208, 208, 0.85)';
          ctx.beginPath();
          ctx.arc(drawX, drawY, dotRadius * Math.min(1.4, Math.max(0.6, scale)), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [transform, cards]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#f5f5f5]"
    />
  );
}
