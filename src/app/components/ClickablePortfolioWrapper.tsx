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
    { id: 'project1', label: 'Omney Mobile Stock Trading App', row: 1, col: 1 },
    { id: 'project2', label: 'Hydra Bank Admin Platform', row: 1, col: 2 },
    { id: 'project3', label: 'Omney Web Stock Trading Platform', row: 2, col: 1 },
    { id: 'project4', label: 'WordPress E-commerce Site', row: 2, col: 2 },
    { id: 'project5', label: 'Fintech Dashboard', row: 3, col: 1 },
    { id: 'project6', label: 'Healthcare Portal', row: 3, col: 2 },
  ];

  return (
    <div className="relative w-full">
      {/* Original portfolio grid */}
      {children}
      
      {/* Clickable overlay regions */}
      <div className="absolute inset-0 grid grid-cols-2 gap-[29px]">
        {projectRegions.map((region) => (
          <button
            key={region.id}
            onClick={() => onProjectClick(region.id)}
            className="relative cursor-pointer hover:bg-black/5 rounded-lg transition-all duration-200 group"
            aria-label={`View ${region.label} case study`}
          >
            {/* Invisible overlay for click detection */}
            <span className="absolute inset-0" />
          </button>
        ))}
      </div>
    </div>
  );
}