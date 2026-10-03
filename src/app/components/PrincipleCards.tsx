import { PRINCIPLES } from '../data/principles';

export function PrincipleCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {PRINCIPLES.map((p, i) => (
        <div key={p.id} className="bg-white border border-gray-200 rounded-2xl p-5">
          <span className="text-xs font-bold text-gray-300" style={{ fontFamily: 'Syne, sans-serif' }}>
            0{i + 1}
          </span>
          <p className="text-base font-bold text-gray-900 mt-2 leading-snug" style={{ fontFamily: 'Syne, sans-serif' }}>
            {p.title}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mt-2">{p.body}</p>
        </div>
      ))}
    </div>
  );
}
