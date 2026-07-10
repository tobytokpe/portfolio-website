import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router';
import { CASE_STUDIES } from './data/caseStudies';
import { Navigation } from './components/Navigation';
import { MiniMap } from './components/MiniMap';
import { Frame } from './components/Frame';
import { ProjectGrid } from './components/ProjectGrid';
import { LeadershipGrid } from './components/LeadershipGrid';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { MobileView } from './components/MobileView';
import Frame1984078061 from '../imports/Frame1984078061';
import { Mail, Linkedin, Copy, Check } from 'lucide-react';
import { InteractiveGridBackground } from './components/ui/InteractiveGridBackground';

// Project images
import projectImg1 from 'figma:asset/947a82d5fe77e989a24f0980b7accca6b672e014.png';
import projectImg2 from 'figma:asset/23219589c1a205fe377485579956acafd1b4f098.png';
import projectImg3 from 'figma:asset/2d89fe81df37e2795686073746b236d694313ad0.png';
import projectImg4 from 'figma:asset/7c865e05aec58c76ad849b692223a5fffeb0112c.png';
import projectImg5 from 'figma:asset/a398778366b9324607d700ade24de8649ef3b369.png';
import projectImg6 from 'figma:asset/3a62c1028d5d7219af66d2a4a1509be1fea7b2a7.png';

// Leadership images
import leadershipImg1 from 'figma:asset/c155cac86dd8ff90a2a85cab8016320721e754d1.png';
import leadershipImg2 from 'figma:asset/6c98f53f14f7bc06842b81eed62509f82d3eb07f.png';
import leadershipImg3 from 'figma:asset/ee3c15704633974bba90f26e3e6336a63e8d0d1e.png';
import leadershipImg4 from 'figma:asset/e1e3356660b323b0ab3e389e8d0faa92aa74992b.png';
import leadershipImg5 from 'figma:asset/30b8b64f96a5c24586ebb4bfd106e35cb3241c25.png';
import leadershipImg6 from 'figma:asset/b1106f77731fd77fc20c20de852879d67213bf40.png';

// Hero image
import image_585c477c511121f68283baf747a1742f4dc74091 from 'figma:asset/585c477c511121f68283baf747a1742f4dc74091.png';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const FRICTION = 0.92;
const VELOCITY_THRESHOLD = 0.1;

const CANVAS_WIDTH = 8000;
const CANVAS_HEIGHT = 2200;

// Case study projects data
const PROJECTS = [
  { 
    id: 'project1', 
    title: 'Hydra SaaS API Platform',
    description: 'User-centric SaaS B2B platform for financial industries, streamlining API integration, reducing costs, and driving fintech innovation.',
    tag: 'Fintech', 
    iframeUrl: 'https://oolowu.com/select-projects/hydra-project-cc/',
    imageSrc: projectImg1
  },
  { 
    id: 'project2', 
    title: 'Qore B2C Banking App',
    description: 'Mobile banking app delivering seamless transactions, bill payments, and personalized insights for improved financial management.',
    tag: 'Banking', 
    iframeUrl: 'https://oolowu.com/select-projects/qore-cc/',
    imageSrc: projectImg2
  },
  { 
    id: 'project3', 
    title: 'MAMVest (Mango Asset Management)',
    description: 'Digital wealth management platform democratizing access to institutional-grade instruments like Mutual Funds, Bonds, and Bills.',
    tag: 'Wealth Management', 
    iframeUrl: 'https://oolowu.com/select-projects/mamvest-cc/',
    imageSrc: projectImg3
  },
  { 
    id: 'project4', 
    title: 'Moore Neobank App',
    description: 'Digital banking app offering comprehensive financial management tools, from budgeting to secure transactions, in one user-friendly platform.',
    tag: 'Banking', 
    iframeUrl: 'https://oolowu.com/select-projects/moore-cc/',
    imageSrc: projectImg4
  },
  { 
    id: 'project5', 
    title: 'Conflict Early Warning System',
    description: 'Mobile app empowering users in conflict-prone areas with incident reporting, real-time updates, and authority connections for better safety.',
    tag: 'Social Impact', 
    iframeUrl: 'https://oolowu.com/select-projects/cewers-cc/',
    imageSrc: projectImg5
  },
  { 
    id: 'project6', 
    title: 'Signature Bank',
    description: 'A website for a tier 1 bank helping with seamless banking and transactions transactions',
    tag: 'Banking', 
    iframeUrl: 'https://www.signaturebankng.com/',
    imageSrc: projectImg6
  },
];

// Leadership experience data
const LEADERSHIP = [
  {
    id: 'leader1',
    title: 'Talk: Leveraging AI for Accessible Design Systems with Variables',
    description: 'Diving into how I harnessed AI to build more inclusive, scalable, and flexible design systems.',
    imageSrc: leadershipImg1,
    iframeUrl: 'https://uxscotland.net/programme/leveraging-ai-accessible-design-systems-variables'
  },
  {
    id: 'leader2',
    title: 'Article: AI and Variables',
    description: 'Learn how AI can speed up the development of more accessible designsystems with variables.',
    imageSrc: leadershipImg2,
    iframeUrl: 'https://zeroheight.com/blog/ai-and-variables-building-more-accessible-design-systems-faster/'
  },
  {
    id: 'leader3',
    title: 'Article: Mastering AG-Grid: Designing Efficient Data Tables',
    description: 'Best practices for AG-Grid data-tables, a framework renowned for its robust features.',
    imageSrc: leadershipImg3,
    iframeUrl: 'https://medium.com/woodmac/mastering-ag-grid-designing-efficient-and-user-centered-data-tables-8fa35580f4f7'
  },
  {
    id: 'leader4',
    title: 'CVSpan Product Design Learning Course',
    description: 'Comprehensive course equipping aspiring designers with hands-on training in user-centric product design and development.',
    imageSrc: leadershipImg4,
    iframeUrl: 'https://learn.cvspan.com/'
  },
  {
    id: 'leader5',
    title: 'CVSpan Design Jam Competition',
    description: 'Organized and led collaborative design sprints, fostering innovation and teamwork within a vibrant community of designers and developers.',
    imageSrc: leadershipImg5,
    iframeUrl: 'https://example.com/leadership/design-jam'
  },
  {
    id: 'leader6',
    title: 'Article: Design Thinking in Fintech; Creating User-Centric Experience',
    description: 'Exploring creativity and technology to craft engaging, user-centric financial experiences that redefine traditional banking.',
    imageSrc: leadershipImg6,
    iframeUrl: 'https://qore.inc/design-thinking-in-crafting-user-centric-experiences/'
  },
];

function FigmaCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Email copy state
  const [emailCopied, setEmailCopied] = useState(false);
  const [hoveredCopyButton, setHoveredCopyButton] = useState(false);
  
  // Calculate initial transform to match hero navigation
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

  // Inertial scrolling
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

  // Handle wheel zoom and pan
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey || e.metaKey) {
      // Zoom
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = -e.deltaY * 0.005;
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

  // Attach wheel listener
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
    if (e.button !== 0) return;
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

  // Disable scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle hash changes on mount or location update to navigate canvas to frame
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && ['hero', 'about', 'work', 'leadership', 'contact'].includes(hash)) {
      const timer = setTimeout(() => {
        handleNavigate(hash);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Navigation handlers
  const handleNavigate = useCallback((id: string) => {
    // Stop any velocity
    setVelocity({ x: 0, y: 0 });
    
    // Frame coordinates: [x, y, width, height]
    // Calculate center position for each frame at 1.56 zoom
    const frames: Record<string, { x: number; y: number; width: number; height: number }> = {
      hero: { x: 50, y: 200, width: 800, height: 500 },
      about: { x: 950, y: 200, width: 800, height: 900 },
      work: { x: 1850, y: 200, width: 800, height: 1600 },
      leadership: { x: 2750, y: 200, width: 800, height: 1600 },
      contact: { x: 3650, y: 200, width: 800, height: 500 },
    };

    const frame = frames[id];
    if (frame) {
      const scale = 1.56;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      // For the about, work and leadership sections, align to top instead of centering
      if (id === 'about' || id === 'work' || id === 'leadership') {
        const frameCenterX = frame.x + frame.width / 2;
        const frameTop = frame.y;
        
        // Position frame top near the top of viewport (with some padding)
        const topPadding = 100; // pixels from top of viewport
        const x = viewportCenterX - frameCenterX * scale;
        const y = topPadding - frameTop * scale;
        
        setTransform({ x, y, scale });
      } else {
        // Center the frame in viewport (default behavior)
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
    // Use same centering logic as navigation for Hero card
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
        projects={PROJECTS.map((p) => ({ id: p.id, title: p.title }))}
        leadership={LEADERSHIP.map((l) => ({ id: l.id, title: l.title }))}
        onProjectOpen={(id) => {
          if (id === 'project6') {
            window.open('https://www.signaturebankng.com/', '_blank');
          } else {
            navigate(`/projects/${id}`);
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
            { x: 950, y: 200, width: 800, height: 900 },
            { x: 1850, y: 200, width: 800, height: 1600 },
            { x: 2750, y: 200, width: 800, height: 1600 },
            { x: 3650, y: 200, width: 800, height: 500 },
          ]}
        />

        {/* Canvas content */}
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
            <div className="h-full flex items-center justify-between px-12 gap-8">
              {/* Text on the left */}
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

              {/* Image on the right */}
              <motion.div
                className="w-[280px] h-[280px] overflow-hidden flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ImageWithFallback
                  src={image_585c477c511121f68283baf747a1742f4dc74091}
                  alt="Tobi Olowu"
                  className="w-full h-full object-contain"
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
                
                <div className="pt-6 space-y-5">
                  {[
                    {
                      label: 'Leadership',
                      skills: ['Design Strategy', 'Team Development', 'Mentorship & Coaching', 'Process Improvement', 'Stakeholder Management', 'Project Management', 'Communication'],
                    },
                    {
                      label: 'Design Expertise',
                      skills: ['UX/UI Design', 'Design Thinking', 'Wireframing & Prototyping', 'User Research', 'Interaction Design', 'Information Architecture', 'Design Systems'],
                    },
                    {
                      label: 'Tools & Technologies',
                      skills: ['Sketch', 'Figma', 'InVision', 'Adobe Creative Suite', 'Zeplin', 'Adobe XD', 'Dovetail', 'Amplitude', 'Hotjar', 'Balsamiq', 'HTML', 'CSS', 'CMS (WordPress, Webflow, Framer)'],
                    },
                    {
                      label: 'Research & Analysis',
                      skills: ['Heuristic Evaluation', 'A/B Testing', 'Surveys', 'User Interviews', 'Usability Testing', 'Cognitive Walkthroughs'],
                    },
                  ].map(({ label, skills }) => (
                    <div key={label}>
                      <h4 className="font-semibold text-gray-900 mb-2 font-[Syne] font-bold text-sm">{label}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 text-xs rounded-full font-medium text-gray-900 bg-gray-100 border border-gray-300">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4 font-[Syne] font-bold">My Design Process</h3>
                  <Frame1984078061 />
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
                    navigate(`/projects/${projectId}`);
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
                        // Fallback method for copying text (works without Clipboard API)
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
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center"
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
    </>
  );
}

function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const project = PROJECTS.find((p) => p.id === id);
  const data = id ? CASE_STUDIES[id] : null;

  useEffect(() => {
    if (project?.id === 'project6') {
      window.location.replace(project.iframeUrl);
    }
  }, [project]);

  // Scroll to top when project ID changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      document.title = `${data.title} - Oluwatobi Olowu`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', data.problem || data.title);
    }
    
    return () => {
      document.title = 'Tobi Olowu - Portfolio';
    };
  }, [data]);

  if (!project || !data) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#f5f5f5] text-gray-900 font-['Poppins']">
        <div className="text-center">
          <p className="mb-4">Project not found.</p>
          <button onClick={() => navigate('/')} className="underline text-blue-600 font-semibold">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-[#f5f5f5] overflow-y-auto flex flex-col font-['Poppins']">
      <InteractiveGridBackground />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 pt-16 pb-32">
        {/* Back Button (Centralized) */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F3853] bg-white px-5 py-2.5 rounded-full shadow-[0px_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E5E5] hover:shadow-[0px_6px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to home
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className="text-[40px] md:text-[54px] font-bold text-gray-900 leading-tight tracking-tight mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {data.title}
          </h1>

          {/* Project description under title */}
          <p className="text-[#5D6C7C] text-[16px] max-w-2xl mx-auto mb-8 leading-relaxed font-['Poppins']">
            {project.description}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left w-full mx-auto">
            {Object.entries(data.metadata).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#E5E5E5] shadow-sm flex flex-col justify-between"
              >
                <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase font-['Syne']">{key}</span>
                <span className="text-sm font-semibold text-gray-800 mt-2 leading-relaxed">{value as string}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero/Intro Image */}
        {data.heroImage && (
          <div className="w-full mb-16 rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-sm bg-white p-2">
            <img
              src={data.heroImage}
              alt={`${data.title} Overview`}
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        )}

        {/* Problem and Solution Columns */}
        {(data.problem || data.solution) && (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {data.problem && (
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-[#E5E5E5] shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                  The Challenge
                </h3>
                <p className="text-[#4A5568] text-[14px] leading-[1.7] whitespace-pre-line">
                  {data.problem}
                </p>
              </div>
            )}
            {data.solution && (
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-[#E5E5E5] shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                  The Solution
                </h3>
                <p className="text-[#4A5568] text-[14px] leading-[1.7] whitespace-pre-line">
                  {data.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Custom Dynamic Sections */}
        <div className="space-y-16">
          {data.sections.map((section: any, idx: number) => (
            <section key={idx} className="space-y-6">
              {section.title && (
                <h2
                  className="text-2xl md:text-3xl font-bold text-gray-900 border-b border-gray-200 pb-3"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {section.title}
                </h2>
              )}
              <div className="space-y-4">
                {section.items.map((item: any, itemIdx: number) => {
                  if (item.type === 'paragraph') {
                    const renderFormattedText = (text: string) => {
                      if (!text) return null;
                      const parts = text.split('**');
                      return parts.map((part, index) => {
                        if (index % 2 === 1) {
                          return <strong key={index} className="font-bold text-gray-900">{part}</strong>;
                        }
                        return part;
                      });
                    };
                    return (
                      <p key={itemIdx} className="text-[#4A5568] text-[15px] leading-[1.7] w-full whitespace-pre-line">
                        {renderFormattedText(item.text)}
                      </p>
                    );
                  }
                  if (item.type === 'subheading') {
                    return (
                      <h4 key={itemIdx} className="text-lg font-bold text-[#1A202C] pt-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {item.text}
                      </h4>
                    );
                  }
                  if (item.type === 'cta') {
                    return (
                      <div key={itemIdx} className="my-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-['Syne']">Figma &amp; Design Systems</span>
                          <p className="text-[15px] font-semibold text-gray-800 leading-normal">
                            {item.text}
                          </p>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
                        >
                          View Presentation &rarr;
                        </a>
                      </div>
                    );
                  }
                  if (item.type === 'video') {
                    return (
                      <div key={itemIdx} style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          style={{ width: '400px', borderRadius: '58px', display: 'block', background: 'transparent', pointerEvents: 'none' }}
                        />
                      </div>
                    );
                  }
                  if (item.type === 'image') {
                    return (
                      <img
                        key={itemIdx}
                        src={item.src}
                        alt={item.alt || section.title}
                        className="w-full h-auto rounded-2xl object-contain my-8"
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Project Pagination (Prev / Next) */}
        {(() => {
          const localPages = PROJECTS.filter((p) => p.id !== 'project6');
          const currentIndex = localPages.findIndex((p) => p.id === id);
          if (currentIndex === -1) return null;

          const prevProject = localPages[(currentIndex - 1 + localPages.length) % localPages.length];
          const nextProject = localPages[(currentIndex + 1) % localPages.length];

          return (
            <div className="flex justify-between items-center border-t border-gray-200 pt-8 mt-16 w-full mx-auto">
              <button
                onClick={() => navigate(`/projects/${prevProject.id}`)}
                className="flex flex-col items-start gap-1 group text-left cursor-pointer border-0 bg-transparent p-0"
              >
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider font-['Syne']">Previous Project</span>
                <span className="text-[15px] font-bold text-[#2F3853] group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  &larr; {prevProject.title}
                </span>
              </button>

              <div className="w-[1px] h-8 bg-gray-200" />

              <button
                onClick={() => navigate(`/projects/${nextProject.id}`)}
                className="flex flex-col items-end gap-1 group text-right cursor-pointer border-0 bg-transparent p-0"
              >
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider font-['Syne']">Next Project</span>
                <span className="text-[15px] font-bold text-[#2F3853] group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  {nextProject.title} &rarr;
                </span>
              </button>
            </div>
          );
        })()}
      </div>

      {/* Navigation */}
      <Navigation
        sections={[
          { id: 'hero', name: 'Hero' },
          { id: 'about', name: 'About' },
          { id: 'work', name: 'Work' },
          { id: 'leadership', name: 'Leadership' },
          { id: 'contact', name: 'Contact' },
        ]}
        onNavigate={(sectionId) => {
          navigate(`/#${sectionId}`);
        }}
        onZoomToFit={() => {}}
        onReset={() => {}}
        currentZoom={1}
        projects={PROJECTS.map((p) => ({ id: p.id, title: p.title }))}
        leadership={LEADERSHIP.map((l) => ({ id: l.id, title: l.title }))}
        onProjectOpen={(projId) => {
          if (projId === 'project6') {
            window.open('https://www.signaturebankng.com/', '_blank');
          } else {
            navigate(`/projects/${projId}`);
          }
        }}
        onLeadershipOpen={(leadId) => {
          const leader = LEADERSHIP.find(l => l.id === leadId);
          if (leader) window.open(leader.iframeUrl, '_blank');
        }}
      />
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  });

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileView
        projects={PROJECTS}
        leadership={LEADERSHIP}
        heroImage={image_585c477c511121f68283baf747a1742f4dc74091}
      />
    );
  }

  return <FigmaCanvas />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:id" element={<ProjectPage />} />
    </Routes>
  );
}