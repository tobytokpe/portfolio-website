import { ArrowRight } from 'lucide-react';
import { AiOrb } from './AiOrb';
import type { DocMeta } from '../search/types';

export type AnswerSource = 'quick' | 'ai';

/** Bespoka's "Thinking…" pill, shown while an AI answer is on its way. */
export function ThinkingPill() {
  return (
    <div className="flex items-center gap-2" role="status" aria-live="polite">
      <span className="inline-flex items-center gap-2 rounded-2xl border border-ink-200 bg-white px-2 py-1.5">
        <AiOrb size={22} motion="loop" />
        <span className="pr-1 text-xs text-ink-500">Thinking…</span>
      </span>
    </div>
  );
}

/** A short answer (prewritten, saved or AI) with "Jump to section" links. Styled as Bespoka's assistant message. */
export function AnswerCard({
  text,
  links,
  source,
  onJump,
}: {
  text: string;
  links: DocMeta[];
  source: AnswerSource;
  onJump: (doc: DocMeta) => void;
}) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-ink-800" aria-live="polite">
      <div className="mb-1.5 flex items-center gap-2">
        <AiOrb size={22} motion="still" />
        <span className="text-[11px] font-semibold text-ink-400">{source === 'ai' ? 'AI answer' : 'Quick answer'}</span>
      </div>
      <p className="whitespace-pre-wrap">{text}</p>
      {links.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">Jump to section</p>
          <div className="flex flex-wrap gap-1.5">
            {links.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => onJump(doc)}
                className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-800 hover:bg-ink-100"
              >
                <span className="truncate">{doc.parent && doc.kind === 'section' ? `${doc.parent}: ` : ''}{shortTitle(doc.title)}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-marker" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** "Sorting the Mess: Organizing Scattered Bank Tools" → "Sorting the Mess". */
export const shortTitle = (title: string) => (title.length > 34 && title.includes(':') ? title.split(':')[0] : title);
