'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Linkedin, Copy, Check } from 'lucide-react';

import { PROJECTS, LEADERSHIP, heroImage, aboutMeSvg } from '@/src/data/projects';
import { Navigation } from './Navigation';
import { MiniMap } from './MiniMap';
import { Frame } from './Frame';
import { ProjectGrid } from './ProjectGrid';
import { LeadershipGrid } from './LeadershipGrid';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { InteractiveGridBackground } from './ui/InteractiveGridBackground';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const FRICTION = 0.92;
const VELOCITY_THRESHOLD = 0.1;

const CANVAS_WIDTH = 8000;
const CANVAS_HEIGHT = 2200;

export function HomeCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const [emailCopied, setEmailCopied] = useState(false);
  const [hoveredCopyButton, setHoveredCopyButton] = useState(false);
  
  const getInitialTransform = () => {
    const frame = { x: 50, y: 200, width: 800, height: 500 };
    const frameCenterX = frame.x + frame.width / 2;
    const frameCenterY = frame.y + frame.height / 2;
    const viewportCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 960;
    const viewportCenterY = typeof window !== 'undefined' ? window.innerHeight / 2 : 540;
    const scale = 1.56;
    const x = viewportCenterX - frameCenterX * scale;
    const y = viewportCenterY - frameCenterY * scale;
    return { x, y, scale };
  };
  
  const [transform, setTransform] = useState(getInitialTransform());
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    if (isDragging || (velocity.x === 0 && velocity.y === 0)) return;

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

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [velocity.x, velocity.y, isDragging]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey || e.metaKey) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = -e.deltaY * 0.005;
      const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, transform.scale * (1 + delta)));

      const scaleFactor = newScale / transform.scale;
      const newX = mouseX - scaleFactor * (mouseX - transform.x);
      const newY = mouseY - scaleFactor * (mouseY - transform.y);

      setTransform({
        x: newX,
        y: newY,
        scale: newScale,
      });
    } else {
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    lastPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    setVelocity({ x: 0, y: 0 });
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setTransform((t) => ({
      ...t,
      x: newX,
      y: newY,
    }));

    const now = Date.now();
    const dt = now - lastPos.current.time;
    if (dt > 0) {
      const vx = (e.clientX - lastPos.current.x) / dt * 16;
      const vy = (e.clientY - lastPos.current.y) / dt * 16;
      setVelocity({ x: vx, y: vy });
    }

    lastPos.current = { x: e.clientX, y: e.clientY, time: now };
  }, [isDragging, dragStart]);

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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setVelocity({ x: 0, y: 0 });
    
    const frames: Record<string, { x: number; y: number; width: number; height: number }> = {
      hero: { x: 50, y: 200, width: 800, height: 500 },
      about: { x: 950, y: 200, width: 800, height: 1400 },
      work: { x: 1850, y: 200, width: 800, height: 1600 },
      leadership: { x: 2750, y: 200, width: 800, height: 1600 },
      contact: { x: 3650, y: 200, width: 800, height: 500 },
    };

    const frame = frames[id];
    if (frame) {
      const scale = 1.56;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      if (id === 'about' || id === 'work' || id === 'leadership') {
        const frameCenterX = frame.x + frame.width / 2;
        const frameTop = frame.y;
        const topPadding = 100;
        const x = viewportCenterX - frameCenterX * scale;
        const y = topPadding - frameTop * scale;
        
        setTransform({ x, y, scale });
      } else {
        const frameCenterX = frame.x + frame.width / 2;
        const frameCenterY = frame.y + frame.height / 2;
        const x = viewportCenterX - frameCenterX * scale;
        const y = viewportCenterY - frameCenterY * scale;
        
        setTransform({ x, y, scale });
      }
    }
  }, []);

  const handleZoomToFit = useCallback(() => {
    setTransform({ x: -800, y: -50, scale: 0.5 });
  }, []);

  const handleReset = useCallback(() => {
    const frame = { x: 50, y: 200, width: 800, height: 500 };
    const frameCenterX = frame.x + frame.width / 2;
    const frameCenterY = frame.y + frame.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const scale = 1.56;
    const x = viewportCenterX - frameCenterX * scale;
    const y = viewportCenterY - frameCenterY * scale;
    setTransform({ x, y, scale });
  }, []);

  const handleMinimapNavigate = useCallback((x: number, y: number) => {
    setTransform((t) => ({ ...t, x, y }));
  }, []);

  const sections = [
    { id: 'hero', name: 'Hero' },
    { id: 'about', name: 'About' },
    { id: 'work', name: 'Work' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'contact', name: 'Contact' },
  ];

  return (
    <>
      <Navigation
        sections={sections}
        onNavigate={handleNavigate}
        onZoomToFit={handleZoomToFit}
        onReset={handleReset}
        currentZoom={transform.scale}
        projects={PROJECTS.map((p) => ({ id: p.id, title: p.title, slug: p.slug }))}
        leadership={LEADERSHIP.map((l) => ({ id: l.id, title: l.title }))}
        onProjectOpen={(id) => {
          if (id === 'project6') {
            window.open('https://www.signaturebankng.com/', '_blank');
          } else {
            const project = PROJECTS.find((p) => p.id === id);
            if (project) {
              router.push(`/works/${project.slug}`);
            }
          }
        }}
        onLeadershipOpen={(id) => {
          const leader = LEADERSHIP.find(l => l.id === id);
          if (leader) window.open(leader.iframeUrl, '_blank');
        }}
      />

      <div
        ref={canvasRef}
        className="fixed inset-0 overflow-hidden bg-transparent"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <InteractiveGridBackground
          transform={transform}
          cards={[
            { x: 50, y: 200, width: 800, height: 500 },
            { x: 950, y: 200, width: 800, height: 1400 },
            { x: 1850, y: 200, width: 800, height: 1600 },
            { x: 2750, y: 200, width: 800, height: 1600 },
            { x: 3650, y: 200, width: 800, height: 500 },
          ]}
        />

        <motion.div
          animate={{
            x: transform.x,
            y: transform.y,
            scale: transform.scale,
          }}
          transition={{
            type: 'tween',
            duration: 0,
            ease: 'linear'
          }}
          style={{
            transformOrigin: '0 0',
          }}
          className="absolute"
        >
          {/* Hero Frame */}
          <Frame
            id="hero"
            title="Hero"
            x={50}
            y={200}
            width={800}
            height={500}
          >
            <div className="h-full flex items-center justify-between px-12 gap-8 bg-transparent">
              <div className="flex-1">
                <motion.h1
                  className="font-bold text-gray-900 mb-4 text-[36px]"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >Hi, I'm Tobi Olowu</motion.h1>
                
                <motion.p
                  className="text-gray-500 max-w-md font-[Architects_Daughter]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >A product designer with a decade of pushing pixels, fixing flows, and making sense of chaos across fintech, SaaS, and energy, all in the name of building things people actually want to use.</motion.p>
              </div>

              <motion.div
                className="w-[280px] h-[280px] overflow-hidden flex-shrink-0 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ImageWithFallback
                  src={heroImage}
                  alt="Tobi Olowu"
                  fill
                  sizes="280px"
                  className="object-contain"
                />
              </motion.div>
            </div>
          </Frame>

          {/* About Frame */}
          <Frame
            id="about"
            title="About"
            x={950}
            y={200}
            width={800}
            height={1400}
          >
            <div className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>About Me</h2>
              <div className="space-y-4 text-gray-600">
                <p className="font-[Architects_Daughter]">A Designer dedicated to iterative improvement, ensuring products are usable with extensive experience in B2C and B2B SaaS products across mobile and web platforms. With about a decade of experience, I have led design initiatives across diverse industries, including Finance, Energy, and Technology, delivering user-centric solutions that drive significant business impact. Recently, I received the esteemed endorsement as an exceptional talent for the Global Talent UK, an acknowledgement of my dedication to the world of Design and Technology</p>
                
                <div className="pt-6 relative w-full h-[500px]">
                  <Image
                    src={aboutMeSvg}
                    alt="Skills and Expertise Overview"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </Frame>

          {/* Selected Work Frame */}
          <Frame
            id="work"
            title="Selected Work"
            x={1850}
            y={200}
            width={800}
            height={1600}
          >
            <div className="h-full w-full overflow-hidden p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>Selected Work</h2>
              <ProjectGrid
                projects={PROJECTS}
                onProjectClick={(projectId) => {
                  if (projectId === 'project6') {
                    window.open('https://www.signaturebankng.com/', '_blank');
                  } else {
                    const project = PROJECTS.find((p) => p.id === projectId);
                    if (project) {
                      router.push(`/works/${project.slug}`);
                    }
                  }
                }}
              />
            </div>
          </Frame>

          {/* Leadership Frame */}
          <Frame
            id="leadership"
            title="Leadership"
            x={2750}
            y={200}
            width={800}
            height={1600}
          >
            <div className="h-auto p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>Leadership</h2>
              <LeadershipGrid 
                leaders={LEADERSHIP}
                onLeadershipClick={(leadershipId) => {
                  const leader = LEADERSHIP.find(l => l.id === leadershipId);
                  if (leader) window.open(leader.iframeUrl, '_blank');
                }}
              />
            </div>
          </Frame>

          {/* Contact Frame */}
          <Frame
            id="contact"
            title="Contact"
            x={3650}
            y={200}
            width={800}
            height={500}
          >
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Let's Connect</h2>
              <p className="text-gray-600 mb-8 max-w-sm">
                Interested in working together? Feel free to reach out through any of these channels.
              </p>
              <div className="space-y-3 w-full max-w-xs">
                <div className="flex gap-3">
                  <a
                    href="mailto:oluwatobi.olowu@outlook.com"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Mail size={20} />
                    <span>Email Me</span>
                  </a>
                  <div className="relative">
                    <button
                      onClick={() => {
                        const textarea = document.createElement('textarea');
                        textarea.value = 'oluwatobi.olowu@outlook.com';
                        textarea.style.position = 'fixed';
                        textarea.style.opacity = '0';
                        document.body.appendChild(textarea);
                        textarea.select();
                        try {
                          document.execCommand('copy');
                          setEmailCopied(true);
                          setTimeout(() => setEmailCopied(false), 2000);
                        } catch (err) {
                          console.error('Failed to copy email:', err);
                        }
                        document.body.removeChild(textarea);
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center cursor-pointer"
                      onMouseEnter={() => setHoveredCopyButton(true)}
                      onMouseLeave={() => setHoveredCopyButton(false)}
                    >
                      {emailCopied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                    </button>
                    {hoveredCopyButton && !emailCopied && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] bg-gray-800 text-white px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none z-10">
                        Copy email
                        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-800 rotate-45" />
                      </div>
                    )}
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/olowutobi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </Frame>
        </motion.div>
      </div>

      <MiniMap
        canvasWidth={CANVAS_WIDTH}
        canvasHeight={CANVAS_HEIGHT}
        viewportX={transform.x}
        viewportY={transform.y}
        viewportWidth={typeof window !== 'undefined' ? window.innerWidth : 1920}
        viewportHeight={typeof window !== 'undefined' ? window.innerHeight : 1080}
        scale={transform.scale}
        onNavigate={handleMinimapNavigate}
      />
    </>
  );
}
