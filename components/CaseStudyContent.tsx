'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PROJECTS } from '@/src/data/projects';
import { Navigation } from '@/components/Navigation';
import { InteractiveGridBackground } from '@/components/ui/InteractiveGridBackground';

interface CaseStudyContentProps {
  project: any;
  data: any;
  slug: string;
}

export function CaseStudyContent({ project, data, slug }: CaseStudyContentProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project?.id === 'project6') {
      window.location.replace(project.iframeUrl);
    }
  }, [project]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [slug]);

  if (!project || !data) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#f5f5f5] text-gray-900 font-['Poppins']">
        <div className="text-center">
          <p className="mb-4">Project not found.</p>
          <button onClick={() => router.push('/')} className="underline text-blue-600 font-semibold cursor-pointer">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-[#f5f5f5] overflow-y-auto flex flex-col font-['Poppins'] z-10">
      <InteractiveGridBackground />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 pt-16 pb-32">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F3853] bg-white px-5 py-2.5 rounded-full shadow-[0px_4px_16px_rgba(0,0,0,0.06)] border border-[#E5E5E5] hover:shadow-[0px_6px_20px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to home
          </button>
        </div>

        <div className="text-center mb-12">
          <h1
            className="text-[40px] md:text-[54px] font-bold text-gray-900 leading-tight tracking-tight mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {data.title}
          </h1>
          {project.description && (
            <p className="text-[#5D6C7C] text-[16px] max-w-2xl mx-auto mb-8 leading-relaxed font-['Poppins']">
              {project.description}
            </p>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.04)] border border-[#E5E5E5] p-8 md:p-10 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(data.metadata).map(([key, val]: any) => (
              <div key={key} className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-['Syne']">{key}</span>
                <p className="text-[15px] font-semibold text-gray-800 leading-snug">{val}</p>
              </div>
            ))}
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-['Syne']">Timeline</span>
              <p className="text-[15px] font-semibold text-gray-800 leading-snug">2 Months</p>
            </div>
          </div>
        </div>

        {(data.problem || data.solution) && (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {data.problem && (
              <div className="bg-white rounded-3xl p-8 border border-[#E5E5E5] shadow-[0px_8px_30px_rgba(0,0,0,0.02)]">
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                  The Challenge
                </h3>
                <p className="text-[#4A5568] text-[15px] leading-[1.7] whitespace-pre-line">
                  {data.problem}
                </p>
              </div>
            )}
            {data.solution && (
              <div className="bg-white rounded-3xl p-8 border border-[#E5E5E5] shadow-[0px_8px_30px_rgba(0,0,0,0.02)]">
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                  The Solution
                </h3>
                <p className="text-[#4A5568] text-[15px] leading-[1.7] whitespace-pre-line">
                  {data.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {data.heroImage && (
          <div className="mb-16">
            {typeof data.heroImage === 'string' && data.heroImage.endsWith('.mp4') ? (
              <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                <video
                  src={data.heroImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={{ width: '400px', borderRadius: '58px', display: 'block', background: 'transparent', pointerEvents: 'none' }}
                />
              </div>
            ) : (
              <div className="w-full h-auto relative rounded-[32px] overflow-hidden shadow-[0px_16px_40px_rgba(0,0,0,0.06)] border border-[#E5E5E5]">
                <Image
                  src={data.heroImage}
                  alt={`${data.title} Hero mockup`}
                  width={1000}
                  height={600}
                  priority
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
        )}

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
                    if (item.fullWidth) {
                      return (
                        <div key={itemIdx} style={{ margin: '2rem 0' }}>
                          <video
                            src={item.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            style={{ width: '100%', borderRadius: '24px', display: 'block', background: 'transparent' }}
                          />
                        </div>
                      );
                    }
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
                      <div key={itemIdx} className="w-full h-auto relative my-8">
                        <Image
                          src={item.src}
                          alt={item.alt || section.title}
                          width={1000}
                          height={600}
                          className="w-full h-auto rounded-2xl object-contain"
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </section>
          ))}
        </div>

        {(() => {
          const localPages = PROJECTS.filter((p) => p.id !== 'project6');
          const currentIndex = localPages.findIndex((p) => p.slug === slug);
          if (currentIndex === -1) return null;

          const prevProject = localPages[(currentIndex - 1 + localPages.length) % localPages.length];
          const nextProject = localPages[(currentIndex + 1) % localPages.length];

          return (
            <div className="flex justify-between items-center border-t border-gray-200 pt-8 mt-16 w-full mx-auto">
              <button
                onClick={() => router.push(`/works/${prevProject.slug}`)}
                className="flex flex-col items-start gap-1 group text-left cursor-pointer border-0 bg-transparent p-0"
              >
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider font-['Syne']">Previous Project</span>
                <span className="text-[15px] font-bold text-[#2F3853] group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  &larr; {prevProject.title}
                </span>
              </button>

              <div className="w-[1px] h-8 bg-gray-200" />

              <button
                onClick={() => router.push(`/works/${nextProject.slug}`)}
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

      <Navigation
        sections={[
          { id: 'hero', name: 'Hero' },
          { id: 'about', name: 'About' },
          { id: 'work', name: 'Work' },
          { id: 'leadership', name: 'Leadership' },
          { id: 'contact', name: 'Contact' },
        ]}
        onNavigate={(sectionId) => {
          router.push(`/#${sectionId}`);
        }}
        onZoomToFit={() => {}}
        onReset={() => {}}
        currentZoom={1}
        projects={PROJECTS.map((p) => ({ id: p.id, title: p.title, slug: p.slug }))}
        leadership={[]}
        onProjectOpen={(projId) => {
          if (projId === 'project6') {
            window.open('https://www.signaturebankng.com/', '_blank');
          } else {
            const project = PROJECTS.find((p) => p.id === projId);
            if (project) {
              router.push(`/works/${project.slug}`);
            }
          }
        }}
        onLeadershipOpen={() => {}}
      />
    </div>
  );
}
