interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  onClick: () => void;
}

function ProjectCard({ title, description, imageSrc, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 text-left flex flex-col h-full"
    >
      {/* Image placeholder */}
      <div className="w-full h-[230px] bg-gray-100 relative overflow-hidden flex-shrink-0">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Image Placeholder</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-2 flex-grow flex flex-col">
        <h3
          className="text-[18px] font-bold text-[#16171B] leading-tight group-hover:text-blue-600 transition-colors"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {title}
        </h3>
        <p className="text-[#5D6C7C] text-[12px] leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
}

interface ProjectGridProps {
  projects: Array<{
    id: string;
    title: string;
    description: string;
    imageSrc?: string;
  }>;
  onProjectClick: (projectId: string) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[29px]">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          imageSrc={project.imageSrc}
          onClick={() => onProjectClick(project.id)}
        />
      ))}
    </div>
  );
}