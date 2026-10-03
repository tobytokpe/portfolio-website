import { STATS } from '../data/stats';

export function StatStrip() {
  return (
    <div className="grid grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200">
      {STATS.map((stat) => (
        <div key={stat.id} className="bg-white p-4 sm:p-6">
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight whitespace-nowrap" style={{ fontFamily: 'Syne, sans-serif' }}>
            {stat.value}
          </p>
          <p className="text-xs text-gray-500 leading-snug mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
