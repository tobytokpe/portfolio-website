import { useEffect, useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { AiOrb } from './AiOrb';
import { prefersReducedMotion } from '../search/highlight';
import type { DocMeta } from '../search/types';

/** quick: prewritten. ai: written by Gemini (or saved from it). notice: the search couldn't write an answer and says why. */
export type AnswerKind = 'quick' | 'ai' | 'notice';

/** How long the card "thinks" and types. Tests set these to 0. */
export const TIMING = { step: 550, minThinking: 1700, wordMs: 28, maxTypingMs: 2200 };

export interface ThinkingStep {
  label: string;
  done: boolean;
}

/** The steps the assistant is working through, each ticking off as it finishes (Bespoka's "Thinking…" pill, expanded). */
export function ThinkingSteps({ steps }: { steps: ThinkingStep[] }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white px-3.5 py-3" role="status" aria-live="polite">
      <div className="mb-2 flex items-center gap-2">
        <AiOrb size={22} motion="loop" />
        <span className="text-xs font-semibold text-ink-500">Thinking…</span>
      </div>
      <ol className="space-y-1.5 pl-1">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-ink-500 animate-in fade-in slide-in-from-bottom-1 duration-300">
            {s.done ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-marker" />
            ) : (
              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-marker animate-pulse" />
              </span>
            )}
            <span className={s.done ? 'text-ink-500' : 'text-ink-800'}>{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Reveals text word by word, so an answer reads as if it's being written. Instant with reduced motion. */
function useTypedText(text: string): { shown: string; done: boolean } {
  const words = text.split(/(\s+)/);
  const [count, setCount] = useState(() => (prefersReducedMotion() || TIMING.wordMs === 0 ? words.length : 0));
  useEffect(() => {
    if (prefersReducedMotion() || TIMING.wordMs === 0) {
      setCount(words.length);
      return;
    }
    setCount(0);
    // Long answers type faster so none takes longer than maxTypingMs.
    const perTick = Math.max(1, Math.ceil((words.length * TIMING.wordMs) / TIMING.maxTypingMs));
    const id = window.setInterval(() => {
      setCount((c) => {
        const next = Math.min(words.length, c + perTick * 2);
        if (next >= words.length) window.clearInterval(id);
        return next;
      });
    }, TIMING.wordMs * 2);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return { shown: words.slice(0, count).join(''), done: count >= words.length };
}

const LABELS: Record<AnswerKind, string> = { quick: 'Quick answer', ai: 'AI answer', notice: '' };

/** A short answer (prewritten, saved, AI, or a notice) with "Jump to section" links. Styled as Bespoka's assistant message. */
export function AnswerCard({
  text,
  links,
  kind,
  onJump,
  suggestions,
  onSuggestion,
  onAskAi,
}: {
  text: string;
  links: DocMeta[];
  kind: AnswerKind;
  onJump: (doc: DocMeta) => void;
  /** Chips to try instead (shown on "couldn't find that"). */
  suggestions?: Array<{ label: string; answerId: string }>;
  onSuggestion?: (answerId: string, label: string) => void;
  /** Offer a written AI answer when the search only found matches. */
  onAskAi?: () => void;
}) {
  const { shown, done } = useTypedText(text);
  return (
    <div className="rounded-2xl border border-ink-200 bg-white px-3.5 py-3 text-sm leading-relaxed text-ink-800">
      <div className="mb-1.5 flex items-center gap-2">
        <AiOrb size={22} motion={done ? 'still' : 'loop'} />
        {LABELS[kind] && <span className="text-[11px] font-semibold text-ink-400">{LABELS[kind]}</span>}
      </div>
      {/* Screen readers get the whole answer at once; the typing is visual only. */}
      <p className="sr-only" aria-live="polite">{text}</p>
      <p className="whitespace-pre-wrap" aria-hidden="true">
        {shown}
        {!done && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-ink-300" />}
      </p>
      {done && links.length > 0 && (
        <div className="mt-3 animate-in fade-in duration-300">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">Jump to section</p>
          <div className="flex flex-wrap gap-1.5">
            {links.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => onJump(doc)}
                className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-800 hover:bg-ink-100"
              >
                <span className="truncate">{linkLabel(doc)}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-marker" />
              </button>
            ))}
          </div>
        </div>
      )}
      {done && suggestions && suggestions.length > 0 && (
        <div className="mt-3 animate-in fade-in duration-300">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">Try asking about</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s.answerId}
                type="button"
                onClick={() => onSuggestion?.(s.answerId, s.label)}
                className="inline-flex items-center rounded-xl border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-800 hover:bg-ink-100"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {done && onAskAi && (
        <button
          type="button"
          onClick={onAskAi}
          className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-ink-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink-700 animate-in fade-in duration-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI for a written answer
        </button>
      )}
    </div>
  );
}

/** "Hydra: Sorting the Mess" for a section, "UNDP case study" for an overview, the title otherwise. */
const linkLabel = (doc: DocMeta) =>
  doc.kind === 'section' && doc.parent
    ? `${doc.parent}: ${shortTitle(doc.title)}`
    : doc.kind === 'case-study' && doc.title.includes(':')
      ? `${doc.title.split(':')[0]} case study`
      : shortTitle(doc.title);

/** "Sorting the Mess: Organizing Scattered Bank Tools" → "Sorting the Mess". */
export const shortTitle = (title: string) => (title.length > 34 && title.includes(':') ? title.split(':')[0] : title);
