import { EXPERIENCE } from '../data/experience';
import { LogoTile } from './LogoTile';

export function CareerRail() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
      {EXPERIENCE.map((e) => (
        <div key={e.id} className="flex items-center gap-4 p-4">
          <LogoTile logoKey={e.logoKey} name={e.company} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
              {e.company}
            </p>
            <p className="text-xs text-gray-500">{e.role}</p>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{e.years}</span>
        </div>
      ))}
    </div>
  );
}
