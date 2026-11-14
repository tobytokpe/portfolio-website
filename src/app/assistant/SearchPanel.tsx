import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowUp, AtSign, BookOpen, Briefcase, GripHorizontal, Layers, Plus, User, Landmark, X, type LucideIcon } from 'lucide-react';
import { useAssistantPanel } from './AssistantContext';
import { AiOrb } from './AiOrb';
import { AnswerCard, ThinkingSteps, TIMING, type AnswerKind, type ThinkingStep } from './AnswerCard';
import { ResultList, displayOrder } from './ResultList';
import { clampToViewport, saveDragPosition, savedDragPosition, useFloatingFrame, type DragPosition } from './floatingFrame';
import { DOCS, CONTENT_VERSION, findPrewritten, prewrittenById, search, type Result } from '../search/engine';
import { STARTER_CHIPS } from '../data/prewrittenAnswers';
import { needsAi } from '../search/answerGate';
import { answerKey } from '../search/normalise';
import { getSavedAnswer, saveAnswer } from '../search/answerCache';
import { askServer } from '../search/askClient';
import type { DocMeta, FallbackReason } from '../search/types';

const MAX_CHARS = 200;
const CHIP_ICONS: Record<string, LucideIcon> = {
  'pa/who': User,
  'pa/fintech': Landmark,
  'pa/design-systems': Layers,
  'pa/talks-writing': BookOpen,
  'pa/experience': Briefcase,
  'pa/contact': AtSign,
};

interface Answer {
  text: string;
  links: string[];
  kind: AnswerKind;
  /** "Couldn't find that": offer the starter chips. */
  suggest?: boolean;
  /** Only matches were found: offer a written AI answer. */
  offerAi?: boolean;
  /** The query it answers; editing the query clears it. */
  query: string;
}

const isMobile = () => window.innerWidth < 768;
const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

/** What the card says when it can't write an answer, by reason. Plain, honest, and always with somewhere to go next. */
function noticeFor(reason: FallbackReason, q: string): string {
  switch (reason) {
    case 'no-match':
      return `I couldn't find anything about "${q}" in Tobi's portfolio. I can help with his case studies, experience and CV, talks and writing, or how to reach him.`;
    case 'unanswerable':
      return "Tobi's portfolio doesn't answer that directly. These are the closest sections I found:";
    case 'limit':
      return "I've written a lot of answers today, so here are the most relevant sections instead. You can also ask Tobi directly.";
    default:
      return "I couldn't write an answer just now. Here are the most relevant sections instead.";
  }
}

/**
 * The search card: Bespoka's assistant panel (same frame, drag, hero background and welcome screen) with live
 * results and a short answer in place of the chat. Loaded lazily the first time it opens.
 */
export default function SearchPanel() {
  const { setOpen, jumpTo } = useAssistantPanel();
  const frame = useFloatingFrame();
  const asideRef = useRef<HTMLElement>(null);
  // Once dragged, the card keeps the size it had and sits where it was dropped (remembered in this browser).
  const [dragged, setDragged] = useState<{ pos: DragPosition; width: number; height: number } | null>(null);
  const draggedRef = useRef(dragged);
  draggedRef.current = dragged;
  const dragStart = useRef<{ x: number; y: number; left: number; top: number; width: number; height: number } | null>(null);
  const viewport = () => ({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const saved = savedDragPosition();
    const box = asideRef.current?.getBoundingClientRect();
    if (saved && box) setDragged({ pos: clampToViewport(saved, box, viewport()), width: box.width, height: box.height });
    // Keep a dragged card on screen when the window shrinks.
    const onResize = () => setDragged((d) => (d ? { ...d, pos: clampToViewport(d.pos, d, viewport()) } : d));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const moveTo = (pos: DragPosition, size: { width: number; height: number }) => setDragged({ pos: clampToViewport(pos, size, viewport()), ...size });

  const onDragStart = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    const box = asideRef.current?.getBoundingClientRect();
    if (!box) return;
    dragStart.current = { x: e.clientX, y: e.clientY, left: box.left, top: box.top, width: box.width, height: box.height };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onDragMove = (e: PointerEvent<HTMLButtonElement>) => {
    const s = dragStart.current;
    if (!s) return;
    moveTo({ left: s.left + e.clientX - s.x, top: s.top + e.clientY - s.y }, s);
  };
  const onDragEnd = () => {
    if (!dragStart.current) return;
    dragStart.current = null;
    if (draggedRef.current) saveDragPosition(draggedRef.current.pos);
  };
  const resetPosition = () => {
    setDragged(null);
    saveDragPosition(null);
  };
  const onDragKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 48 : 16;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const delta = moves[e.key];
    if (!delta) return;
    e.preventDefault();
    const box = asideRef.current?.getBoundingClientRect();
    if (!box) return;
    const size = { width: box.width, height: box.height };
    const next = clampToViewport({ left: box.left + delta[0], top: box.top + delta[1] }, size, viewport());
    setDragged({ pos: next, ...size });
    saveDragPosition(next);
  };

  const [text, setText] = useState('');
  /** The question last sent. Nothing is searched or shown until the visitor presses send or Enter. */
  const [submitted, setSubmitted] = useState('');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [steps, setSteps] = useState<ThinkingStep[] | null>(null);
  const thinking = steps !== null;
  const [activeId, setActiveId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const request = useRef(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sentResults = useMemo(() => (submitted ? displayOrder(search(submitted)) : []), [submitted]);
  useEffect(() => setActiveId(null), [submitted]);

  const showAnswer = answer && answer.query === text.trim() ? answer : null;
  // Results appear with the answer, after send, and go away as soon as the question is edited.
  const results = showAnswer && !thinking && submitted === text.trim() ? sentResults : [];
  // The welcome screen stays while typing; it only gives way once a question is sent.
  const showStart = !showAnswer && !thinking;
  const linkDocs = (ids: string[]) => ids.map((id) => DOCS.get(id)).filter((d): d is DocMeta => Boolean(d));

  const go = (doc: DocMeta) => {
    jumpTo(doc.target);
    // On a phone the card covers the page, so get out of the way.
    if (isMobile() && doc.target.type !== 'external') setOpen(false);
  };

  /**
   * Enter, send, a chip or "Ask AI": prewritten answer → (gate) → saved answer → AI, stopping at the first that
   * answers. Every path shows the thinking steps for at least TIMING.minThinking and ends in a reply card, even when
   * the answer was instant or the AI couldn't help.
   */
  const run = async (q: string, opts: { forceAi?: boolean; answerId?: string } = {}) => {
    if (!q) return;
    // A new run supersedes any in flight (each checks its ticket before touching the card).
    const ticket = ++request.current;
    const live = () => ticket === request.current;
    const started = Date.now();
    let list: ThinkingStep[] = [{ label: "Searching Tobi's portfolio", done: false }];
    const show = (next: ThinkingStep[]) => {
      list = next;
      if (live()) setSteps(next);
    };
    const tick = (label?: string) => show([...list.map((x) => ({ ...x, done: true })), ...(label ? [{ label, done: false }] : [])]);
    const finish = async (a: Answer) => {
      await sleep(Math.max(0, TIMING.minThinking - (Date.now() - started)));
      if (!live()) return;
      tick();
      await sleep(TIMING.step / 3);
      if (!live()) return;
      setSteps(null);
      setAnswer(a);
    };

    setAnswer(null);
    setSubmitted(q);
    show(list);
    const hits = search(q);
    const top = (n: number) => hits.slice(0, n).map((h) => h.id);

    // 1. A prewritten answer (chips go straight here).
    const pre = opts.answerId ? prewrittenById(opts.answerId) : opts.forceAi ? null : findPrewritten(q);
    await sleep(TIMING.step);
    if (!live()) return;
    if (pre) {
      tick('Found a matching answer');
      return finish({ text: pre.answer, links: pre.links, kind: 'quick', query: q });
    }

    // 2. Nothing in the portfolio: say so, kindly, without spending anything.
    if (!hits.length) {
      tick('Nothing in the portfolio matches');
      return finish({ text: noticeFor('no-match', q), links: [], kind: 'notice', query: q, suggest: true });
    }

    // 3. A lookup ("qore", "design tokens"): the matches are the answer, with a written answer one click away.
    if (!opts.forceAi && needsAi(q, hits.length) === 'results') {
      tick(`Found ${hits.length} matching section${hits.length === 1 ? '' : 's'}`);
      const best = hits[0].doc;
      return finish({ text: `The best match is "${best.title}".`, links: top(3), kind: 'notice', query: q, offerAi: true });
    }

    // 4. Saved in this browser.
    const key = await answerKey(q, CONTENT_VERSION);
    const saved = getSavedAnswer(key);
    if (saved) {
      tick('Found a saved answer');
      return finish({ text: saved.answer, links: saved.links, kind: 'ai', query: q });
    }

    // 5. Ask the server (it checks its own saved answers before Gemini). The request starts now; the steps play meanwhile.
    const pending = askServer(q);
    tick(`Reading ${Math.min(hits.length, 4)} relevant section${hits.length === 1 ? '' : 's'}`);
    await sleep(TIMING.step);
    if (!live()) return;
    tick('Writing an answer');
    const res = await pending;
    if (!live()) return;
    if (res.fallback) {
      const reason = res.reason ?? 'unavailable';
      return finish({
        text: noticeFor(reason, q),
        links: reason === 'limit' ? [...top(2), 'contact/email'] : top(3),
        kind: 'notice',
        query: q,
        suggest: reason === 'no-match',
      });
    }
    const links = res.links.filter((id) => DOCS.has(id));
    saveAnswer(key, { answer: res.answer, links });
    return finish({ text: res.answer, links, kind: 'ai', query: q });
  };

  const submit = () => {
    if (!thinking) void run(text.trim());
  };

  const pickChip = (answerId: string, label: string) => {
    if (!prewrittenById(answerId)) return;
    setText(label);
    void run(label, { answerId });
  };

  const newSearch = () => {
    request.current++;
    setActiveId(null);
    setSteps(null);
    setText('');
    setAnswer(null);
    inputRef.current?.focus();
  };

  const onInputKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const ids = results.map((r) => r.id);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!ids.length) return;
      e.preventDefault();
      const i = activeId ? ids.indexOf(activeId) : -1;
      const next = e.key === 'ArrowDown' ? Math.min(i + 1, ids.length - 1) : i - 1;
      const id = next < 0 ? null : ids[next];
      setActiveId(id);
      if (id) document.getElementById(`search-row-${id}`)?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const active = results.find((r) => r.id === activeId);
      if (active) go(active.doc);
      else void submit();
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      if (text) newSearch();
      else setOpen(false);
    }
  };


  return (
    <aside
      ref={asideRef}
      role="complementary"
      aria-label="Search the portfolio"
      data-search-panel
      style={dragged ? { left: dragged.pos.left, top: dragged.pos.top, width: dragged.width, height: dragged.height } : frame}
      className="fixed z-[45] flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-xl font-['Poppins']"
      onMouseDown={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      <header className="relative shrink-0 px-4 pt-4 pb-2 flex items-center justify-between">
        {/* Drag the card anywhere; double-click to put it back above the dock. Arrow keys move it too. */}
        <button
          type="button"
          aria-label="Move search (drag, or use the arrow keys; double-click to put it back)"
          title="Drag to move · double-click to put back"
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
          onDoubleClick={resetPosition}
          onKeyDown={onDragKey}
          className="absolute left-1/2 top-1 -translate-x-1/2 h-5 w-12 rounded-full flex items-center justify-center text-ink-300 hover:text-ink-500 hover:bg-ink-100 cursor-grab active:cursor-grabbing touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-800"
        >
          <GripHorizontal className="h-4 w-4" />
        </button>
        {/* On the start page the orb sits in the middle; otherwise it's the card's avatar, playing while it answers. */}
        {showStart ? <span /> : <AiOrb size={36} motion={thinking ? 'loop' : 'still'} />}
        <div className="flex items-center gap-0.5">
          {!showStart && (
            <button type="button" className="h-8 w-8 rounded-xl flex items-center justify-center text-ink-500 hover:text-ink-800 hover:bg-ink-100" aria-label="New search" onClick={newSearch}>
              <Plus className="h-4 w-4" />
            </button>
          )}
          <button type="button" className="h-8 w-8 rounded-xl flex items-center justify-center text-ink-500 hover:text-ink-800 hover:bg-ink-100" aria-label="Close search" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="relative flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {showStart && (
          <div className="flex flex-col items-center text-center pt-6 sm:pt-10">
            <AiOrb size={64} motion="loop" speed={0.5} />
            <p className="mt-5 text-base text-ink-500">Hi there,</p>
            <p className="mt-1 text-lg font-bold text-ink-800">What would you like to know?</p>
            <p className="mt-3 max-w-[300px] text-xs leading-relaxed text-ink-500">
              Ask about Tobi's work, experience or how to reach him, and I'll take you straight to the right section. Pick one below or just type.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {STARTER_CHIPS.map(({ label, answerId }) => {
                const Icon = CHIP_ICONS[answerId] ?? User;
                return (
                  <button
                    key={answerId}
                    type="button"
                    onClick={() => pickChip(answerId, label)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-800 hover:bg-ink-100"
                  >
                    <Icon className="h-3.5 w-3.5 text-marker" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {steps && <ThinkingSteps steps={steps} />}
        {showAnswer && (
          <AnswerCard
            text={showAnswer.text}
            links={linkDocs(showAnswer.links)}
            kind={showAnswer.kind}
            onJump={go}
            suggestions={showAnswer.suggest ? STARTER_CHIPS : undefined}
            onSuggestion={pickChip}
            onAskAi={showAnswer.offerAi ? () => void run(showAnswer.query, { forceAi: true }) : undefined}
          />
        )}
        {results.length > 0 && (
          <ResultList results={results} activeId={activeId} onPick={(r: Result) => go(r.doc)} />
        )}
      </div>

      <div className="relative shrink-0 px-3 pb-3 space-y-2">
        <div className="rounded-2xl border border-ink-200 bg-white focus-within:border-ink-800 transition-colors">
          <div className="flex items-end gap-2 p-2">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => {
                setActiveId(null);
                setText(e.target.value.replace(/\n/g, ' ').slice(0, MAX_CHARS));
              }}
              onKeyDown={onInputKey}
              placeholder="Search or ask anything…"
              rows={2}
              enterKeyHint="search"
              aria-label="Search or ask about the portfolio"
              aria-controls="search-results"
              aria-activedescendant={activeId ? `search-row-${activeId}` : undefined}
              className="flex-1 min-h-0 resize-none border-0 bg-transparent p-1.5 text-base sm:text-sm text-ink-800 placeholder:text-ink-400 shadow-none outline-none focus-visible:ring-0"
            />
            <button
              type="button"
              aria-label="Ask"
              onClick={() => void submit()}
              disabled={!text.trim() || thinking}
              className="h-8 w-8 shrink-0 rounded-xl bg-ink-800 hover:bg-ink-700 text-white flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
