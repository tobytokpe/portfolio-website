import { STATS } from '../data/stats';

export function StatStrip() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {STATS.map((stat) => (
        <div key={stat.id} className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            {stat.value}
          </p>
          <p className="text-xs text-gray-500 leading-snug mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
