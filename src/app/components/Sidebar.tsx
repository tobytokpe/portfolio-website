import { ProjectListItem } from './ProjectListItem';

interface SidebarProps {
  projects: Array<{ id: string; title: string; tag?: string }>;
  activeProjectId: string;
  onProjectSelect: (id: string) => void;
}

export function Sidebar({ projects, activeProjectId, onProjectSelect }: SidebarProps) {
  return (
    <div className="w-[300px] h-full bg-[#FAFAFA] border-r border-[#EAEAEA] flex flex-col">
      <div className="border-b border-[#EAEAEA] px-[24px] py-[12px] bg-[#ffffff]">
        <h3 className="font-medium text-gray-900 tracking-wide font-['Syne'] text-[20px]">PROJECTS</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-1 p-[0px] bg-[#ffffff]">
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            title={project.title}
            tag={project.tag}
            isActive={activeProjectId === project.id}
            onClick={() => onProjectSelect(project.id)}
          />
        ))}
      </div>
    </div>
  );
}