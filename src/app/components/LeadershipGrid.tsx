import { ImageWithFallback } from './figma/ImageWithFallback';

interface LeadershipCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  onClick?: () => void;
}

function LeadershipCard({ title, description, imageSrc, onClick }: LeadershipCardProps) {
  return (
    <div 
      className="bg-white rounded-[16px] overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {/* Image placeholder */}
      <div className="w-full h-[230px] bg-gray-100 relative overflow-hidden">
        {imageSrc ? (
          <ImageWithFallback
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
      <div className="p-6 space-y-3">
        <h3
          className="text-[18px] font-bold text-[#16171B] leading-tight"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {title}
        </h3>
        <p className="text-[#5D6C7C] text-[12px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface LeadershipGridProps {
  leaders: Array<{
    id: string;
    title: string;
    description: string;
    imageSrc?: string;
  }>;
  onLeadershipClick?: (id: string) => void;
}

export function LeadershipGrid({ leaders, onLeadershipClick }: LeadershipGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[29px]">
      {leaders.map((leader) => (
        <LeadershipCard
          key={leader.id}
          title={leader.title}
          description={leader.description}
          imageSrc={leader.imageSrc}
          onClick={() => onLeadershipClick?.(leader.id)}
        />
      ))}
    </div>
  );
}