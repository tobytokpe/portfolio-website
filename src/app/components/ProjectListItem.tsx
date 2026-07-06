interface ProjectListItemProps {
  title: string;
  tag?: string;
  isActive: boolean;
  onClick: () => void;
}

export function ProjectListItem({ title, tag, isActive, onClick }: ProjectListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-6 py-3 transition-all ${isActive ? 'bg-[#F2F8F8] border-l-[3px] border-gray-900' : 'hover:bg-[#F2F8F8] border-l-[3px] border-transparent' } rounded-[0px]`}
    >
      <div className="font-medium text-gray-900 text-sm mb-1">{title}</div>
      <div className="text-xs text-[#828691]">{tag}</div>
    </button>
  );
}