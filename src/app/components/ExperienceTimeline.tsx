import { EXPERIENCE } from '../data/experience';

export function ExperienceTimeline() {
  return (
    <div className="space-y-6">
      {EXPERIENCE.map((entry, i) => (
        <div key={entry.id} className="relative pl-6">
          {i !== EXPERIENCE.length - 1 && (
            <div className="absolute left-[5px] top-5 bottom-[-24px] w-px bg-gray-200" />
          )}
          <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-gray-900" />
          <p className="text-base font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            {entry.role}
          </p>
          <p className="text-sm text-gray-600">
            {entry.company}
            {entry.companyDetail ? <span className="text-gray-400"> — {entry.companyDetail}</span> : null}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {entry.dates} · {entry.location}
          </p>
          {entry.bullets.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {entry.bullets.map((b, j) => (
                <li key={j} className="text-sm text-gray-600 leading-relaxed flex gap-2">
                  <span className="text-gray-300 mt-1">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
