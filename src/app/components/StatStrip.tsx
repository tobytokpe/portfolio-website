import { useNavigate } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { STATS, type Stat } from '../data/stats';

function StatBody({ stat }: { stat: Stat }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight whitespace-nowrap" style={{ fontFamily: 'Syne, sans-serif' }}>
          {stat.value}
        </p>
        {stat.slug && <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0 mt-1" />}
      </div>
      <p className="text-xs text-gray-500 leading-snug mt-2 flex-1">{stat.label}</p>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">{stat.category}</p>
    </>
  );
}

export function StatStrip() {
  const navigate = useNavigate();
  const cell = 'bg-white p-4 sm:p-5 flex flex-col text-left';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200">
      {STATS.map((stat) =>
        stat.slug ? (
          <button
            key={stat.id}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/works/${stat.slug}`);
            }}
            className={`${cell} group hover:bg-gray-50 transition-colors cursor-pointer`}
          >
            <StatBody stat={stat} />
          </button>
        ) : (
          <div key={stat.id} className={cell}>
            <StatBody stat={stat} />
          </div>
        ),
      )}
    </div>
  );
}
