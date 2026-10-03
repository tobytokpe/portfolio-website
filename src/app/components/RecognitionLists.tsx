import { ACHIEVEMENTS, EDUCATION, CERTIFICATIONS, PUBLICATIONS } from '../data/recognition';

export function RecognitionLists() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
          Key Achievements
        </h3>
        <ul className="space-y-2">
          {ACHIEVEMENTS.map((a, i) => (
            <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-2">
              <span className="text-gray-300 mt-1">—</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
          Education
        </h3>
        <ul className="space-y-2">
          {EDUCATION.map((e, i) => (
            <li key={i} className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">{e.degree}</span>
              <br />
              {e.school} · {e.year}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
          Certifications
        </h3>
        <div className="flex flex-wrap gap-2">
          {CERTIFICATIONS.map((c, i) => (
            <span key={i} className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1.5">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
          Publications
        </h3>
        <ul className="space-y-2">
          {PUBLICATIONS.map((p, i) => (
            <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-2">
              <span className="text-gray-300 mt-1">—</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
