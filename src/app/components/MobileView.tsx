import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Linkedin, Check, Copy } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Navigation } from './Navigation';
import { ProjectGrid } from './ProjectGrid';
import { LeadershipGrid } from './LeadershipGrid';
import aboutMeSvg from '../../assets/about-me.svg';
import thumbsupSticker from '../../assets/stickers/thumbsup.png';
import starSticker from '../../assets/stickers/star.png';
import plus1Sticker from '../../assets/stickers/plus1.png';
import { Sticker } from './Sticker';

interface Project {
  id: string;
  title: string;
  description: string;
  tag?: string;
  iframeUrl: string;
  imageSrc: string;
}

interface MobileViewProps {
  projects: Project[];
  leadership: Project[];
  heroImage: string;
}

function scrollTo(id: string) {
  const el = document.getElementById(`mobile-${id}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionCard({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={`mobile-${id}`}
      className="w-full max-w-[480px] mx-auto px-4 py-8 scroll-mt-20"
    >
      <div className="relative">
        <div className="p-0">{children}</div>
      </div>
    </section>
  );
}

export function MobileView({ projects, leadership, heroImage }: MobileViewProps) {
  const navigate = useNavigate();
  const [emailCopied, setEmailCopied] = useState(false);

  function handleCopyEmail() {
    const textarea = document.createElement('textarea');
    textarea.value = 'oluwatobi.olowu@outlook.com';
    textarea.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {}
    document.body.removeChild(textarea);
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{
      backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
      backgroundSize: '15px 15px',
    }}>

      {/* Floating bottom nav — stretched to the end of the screen on mobile view */}
      <Navigation
        sections={[]}
        onNavigate={(id) => {
          scrollTo(id);
        }}
        onZoomToFit={() => {}}
        onReset={() => {}}
        currentZoom={1}
        projects={projects.map((p) => ({ id: p.id, title: p.title, slug: p.slug }))}
        leadership={leadership.map((l) => ({ id: l.id, title: l.title }))}
        onProjectOpen={(id) => {
          if (id === 'project6') {
            window.open('https://www.signaturebankng.com/', '_blank');
          } else {
            const proj = projects.find((p) => p.id === id);
            if (proj) {
              navigate(`/works/${proj.slug}`);
            }
          }
        }}
        onLeadershipOpen={(id) => {
          const leader = leadership.find((l) => l.id === id);
          if (leader) window.open(leader.iframeUrl, '_blank');
        }}
      />

      {/* Offset for bottom nav */}
      <div className="pt-6 pb-28">
        <SectionCard id="hero">
          <div className="flex flex-col items-center justify-between gap-6 py-6">
            <div className="relative w-[180px] h-[180px] flex-shrink-0">
              <div className="w-full h-full overflow-hidden">
                {heroImage.endsWith('.gif') || heroImage.endsWith('.mp4') ? (
                  <img
                    src={heroImage}
                    alt="Tobi Olowu"
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                ) : (
                  <ImageWithFallback
                    src={heroImage}
                    alt="Tobi Olowu"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              {/* Mobile stickers beside the avatar */}
              <Sticker
                src={thumbsupSticker}
                className="absolute w-[35px] h-[35px] -left-3 -bottom-1 z-10"
                alt="Thumbs up sticker"
              />
              <Sticker
                src={starSticker}
                className="absolute w-[35px] h-[35px] -right-3 bottom-8 z-10"
                alt="Star sticker"
              />
              <Sticker
                src={plus1Sticker}
                className="absolute w-[35px] h-[35px] -right-2 top-8 z-10"
                alt="+1 sticker"
              />
            </div>
            <div className="text-center relative px-6">
              <h1
                className="text-3xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Hi, I'm Tobi Olowu
              </h1>
              <p className="text-[#5d6c7c] text-sm leading-[1.7] font-[Architects_Daughter]">
                A product designer with a decade of pushing pixels, fixing flows, and making sense of chaos across fintech, SaaS, and energy — all in the name of building things people actually want to use.
              </p>
            </div>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 bg-gray-900 text-white text-sm rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Get in touch
            </button>
          </div>
        </SectionCard>

        {/* About */}
        <SectionCard id="about">
          <h2
            className="text-3xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            About Me
          </h2>
          <div className="space-y-6 text-[#5d6c7c] text-sm leading-[1.7]">
            <p className="font-[Architects_Daughter]">
              A Designer dedicated to iterative improvement, ensuring products are usable with extensive experience in B2C and B2B SaaS products across mobile and web platforms. With about a decade of experience, I have led design initiatives across diverse industries, including Finance, Energy, and Technology, delivering user-centric solutions that drive significant business impact. Recently, I received the esteemed endorsement as an exceptional talent for the Global Talent UK, an acknowledgement of my dedication to the world of Design and Technology.
            </p>
            
            <div className="pt-6">
              <img
                src={aboutMeSvg}
                alt="Skills and Expertise Overview"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </SectionCard>

        {/* Selected Work */}
        <SectionCard id="work">
          <h2
            className="text-3xl font-bold text-gray-900 mb-8"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Selected Work
          </h2>
          <ProjectGrid
            projects={projects}
            onProjectClick={(projectId) => {
              if (projectId === 'project6') {
                window.open('https://www.signaturebankng.com/', '_blank');
              } else {
                const proj = projects.find((p) => p.id === projectId);
                if (proj) {
                  navigate(`/works/${proj.slug}`);
                }
              }
            }}
          />
        </SectionCard>

        {/* Leadership */}
        <SectionCard id="leadership">
          <h2
            className="text-3xl font-bold text-gray-900 mb-8"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Leadership
          </h2>
          <LeadershipGrid
            leaders={leadership}
            onLeadershipClick={(leadershipId) => {
              const leader = leadership.find((l) => l.id === leadershipId);
              if (leader) window.open(leader.iframeUrl, '_blank');
            }}
          />
        </SectionCard>

        {/* Contact */}
        <SectionCard id="contact">
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Let's Connect</h2>
            <p className="text-gray-600 mb-8 max-w-sm text-sm">
              Interested in working together? Feel free to reach out through any of these channels.
            </p>
            <div className="space-y-3 w-full max-w-xs mx-auto">
              <div className="flex gap-3">
                <a
                  href="mailto:oluwatobi.olowu@outlook.com"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                >
                  <Mail size={20} />
                  <span>Email Me</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Copy email"
                >
                  {emailCopied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                </button>
              </div>
              <a
                href="https://www.linkedin.com/in/olowutobi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-sm"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
