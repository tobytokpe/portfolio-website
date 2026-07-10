import { ReactNode } from 'react';

interface ClickablePortfolioWrapperProps {
  children: ReactNode;
  onProjectClick: (projectId: string) => void;
}

/**
 * ClickablePortfolioWrapper
 * 
 * Creates an overlay grid on top of the portfolio grid to make each project clickable.
 * The portfolio grid is a 2x3 layout (2 columns, 3 rows) with 6 project cards.
 * 
 * To update project names:
 * 1. Update the projectRegions array below with the actual project names from the portfolio
 * 2. Update the PROJECTS array in App.tsx to match these IDs and titles
 */
export function ClickablePortfolioWrapper({ children, onProjectClick }: ClickablePortfolioWrapperProps) {
  // Portfolio grid layout: 2 columns, 3 rows
  // Based on the Frame structure, the 6 projects are arranged in a 2x3 grid
  const projectRegions = [
    { id: 'project1', label: 'HYDRA: Bringing Order to Fragmented Banking Code', href: '/projects/project1' },
    { id: 'project2', label: 'QORE: Launching Banking Apps Instantly', href: '/projects/project2' },
    { id: 'project3', label: 'MAMVest: Digitizing Traditional Wealth Management', href: '/projects/project3' },
    { id: 'project4', label: 'Moore: Making Digital Banking Simple for New Markets', href: '/projects/project4' },
    { id: 'project5', label: 'UNDP: Rebuilding Security and Alert Systems in Crisis Zones', href: '/projects/project5' },
    { id: 'project6', label: 'Signature Bank', href: 'https://www.signaturebankng.com/', target: '_blank', rel: 'noopener noreferrer' },
  ];

  return (
    <div className="relative w-full">
      {/* Original portfolio grid */}
      {children}
      
      {/* Clickable overlay regions */}
      <div className="absolute inset-0 grid grid-cols-2 gap-[29px]">
        {projectRegions.map((region) => (
          <a
            key={region.id}
            href={region.href}
            target={region.target}
            rel={region.rel}
            onClick={(e) => {
              // Standard left-click overrides to use modal navigate, but allows right-click to open in tab
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0 && region.id !== 'project6') {
                e.preventDefault();
                onProjectClick(region.id);
              }
            }}
            className="relative cursor-pointer hover:bg-black/5 rounded-lg transition-all duration-200 group"
            aria-label={`View ${region.label} case study`}
          >
            {/* Invisible overlay for click detection */}
            <span className="absolute inset-0" />
          </a>
        ))}
      </div>
    </div>
  );
}