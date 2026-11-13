import { ArrowRight, ArrowUpRight, AtSign, BookOpen, Briefcase, FileText, ScrollText, User, type LucideIcon } from 'lucide-react';
import { stem, words } from '../search/normalise';
import type { Result } from '../search/engine';
import type { DocKind } from '../search/types';

const GROUPS: Array<{ label: string; kinds: DocKind[] }> = [
  { label: 'Case studies', kinds: ['case-study', 'section'] },
  { label: 'About', kinds: ['about'] },
  { label: 'CV', kinds: ['cv'] },
  { label: 'Leadership', kinds: ['leadership'] },
  { label: 'Contact', kinds: ['contact'] },
];

const ICONS: Record<DocKind, LucideIcon> = {
  'case-study': Briefcase,
  section: FileText,
  about: User,
  cv: ScrollText,
  leadership: BookOpen,
  contact: AtSign,
};

/** Groups in the order of their best result, so the top hit is always first on screen. */
function orderedGroups(results: Result[]) {
  const rank = (kinds: DocKind[]) => {
    const i = results.findIndex((r) => kinds.includes(r.doc.kind));
    return i < 0 ? Infinity : i;
  };
  return [...GROUPS]
    .sort((a, b) => rank(a.kinds) - rank(b.kinds))
    .map((g) => ({ ...g, rows: results.filter((r) => g.kinds.includes(r.doc.kind)) }))
    .filter((g) => g.rows.length);
}

/** Results in the order they're shown (what the arrow keys walk through). */
export const displayOrder = (results: Result[]) => orderedGroups(results).flatMap((g) => g.rows);

/** The snippet with words that matched the query in bold. */
function Snippet({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  return (
    <>
      {text.split(/(\s+)/).map((part, i) => {
        const w = words(part)[0];
        const hit = w && terms.some((t) => stem(w).startsWith(t) || t.startsWith(stem(w)));
        return hit && w.length > 2 ? (
          <strong key={i} className="font-semibold text-ink-800">
            {part}
          </strong>
        ) : (
          part
        );
      })}
    </>
  );
}

/** Live results, grouped by kind. `activeId` is the row the arrow keys are on. */
export function ResultList({
  results,
  activeId,
  onPick,
}: {
  results: Result[];
  activeId: string | null;
  onPick: (r: Result) => void;
}) {
  return (
    <div id="search-results" className="space-y-3" role="listbox" aria-label="Search results">
      {orderedGroups(results).map(({ label, rows }) => {
        return (
          <div key={label}>
            <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wide text-ink-400">{label}</p>
            <div className="space-y-0.5">
              {rows.map((r) => {
                const Icon = ICONS[r.doc.kind];
                const external = r.doc.target.type === 'external';
                const active = activeId === r.id;
                return (
                  <div key={r.id} className={`group flex items-start gap-1 rounded-xl ${active ? 'bg-ink-100' : 'hover:bg-ink-100'}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      id={`search-row-${r.id}`}
                      onClick={() => onPick(r)}
                      className="flex-1 min-w-0 flex items-start gap-2.5 px-3 py-2 text-left focus-visible:outline-none"
                    >
                      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-marker" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-ink-800">{r.doc.title}</span>
                        <span className="mt-0.5 block text-[11px] leading-relaxed text-ink-500 line-clamp-2">
                          {r.doc.parent && <span className="text-ink-400">{r.doc.parent} · </span>}
                          <Snippet text={r.doc.snippet} terms={r.terms} />
                        </span>
                      </span>
                      {external ? (
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
                      ) : (
                        <ArrowRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400 transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                      )}
                    </button>
                    {r.doc.url && !external && (
                      <a
                        href={r.doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${r.doc.title} in a new tab`}
                        className="mt-1.5 mr-1.5 h-6 shrink-0 rounded-lg px-1.5 flex items-center gap-0.5 text-[11px] font-semibold text-ink-500 hover:text-ink-800 hover:bg-white"
                      >
                        Open <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
