import { ACHIEVEMENTS } from '../data/recognition';
import { LogoTile } from './LogoTile';

export function AchievementBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {ACHIEVEMENTS.map((a) => (
        <div key={a.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
          <LogoTile logoKey={a.logoKey} name={a.title} size={56} />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{a.year}</p>
            <p className="text-lg font-bold text-gray-900 mt-1 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              {a.title}
            </p>
            <p className="text-sm text-gray-500 leading-snug mt-1.5">{a.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
