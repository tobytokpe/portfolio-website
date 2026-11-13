import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowUp, AtSign, BookOpen, Briefcase, GripHorizontal, Layers, Plus, User, Landmark, X, type LucideIcon } from 'lucide-react';
import { useAssistantPanel } from './AssistantContext';
import { AiOrb } from './AiOrb';
import { AnswerCard, ThinkingPill, type AnswerSource } from './AnswerCard';
import { ResultList, displayOrder } from './ResultList';
import { clampToViewport, saveDragPosition, savedDragPosition, useFloatingFrame, type DragPosition } from './floatingFrame';
import { DOCS, CONTENT_VERSION, findPrewritten, prewrittenById, search, type Result } from '../search/engine';
import { STARTER_CHIPS } from '../data/prewrittenAnswers';
import { needsAi } from '../search/answerGate';
import { answerKey } from '../search/normalise';
import { getSavedAnswer, saveAnswer } from '../search/answerCache';
import { askServer } from '../search/askClient';
import type { DocMeta } from '../search/types';

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
  source: AnswerSource;
  /** The query it answers; editing the query clears it. */
  query: string;
}

const isMobile = () => window.innerWidth < 768;

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
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [thinking, setThinking] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const request = useRef(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Live results, a beat after typing stops.
  useEffect(() => {
    const id = window.setTimeout(() => setQuery(text), 80);
    return () => window.clearTimeout(id);
  }, [text]);
  const results = useMemo(() => (query.trim().length >= 2 ? displayOrder(search(query)) : []), [query]);
  useEffect(() => setActiveId(null), [query]);

  const showAnswer = answer && answer.query === text.trim() ? answer : null;
  const showStart = !text.trim() && !showAnswer && !thinking;
  const linkDocs = (ids: string[]) => ids.map((id) => DOCS.get(id)).filter((d): d is DocMeta => Boolean(d));

  const go = (doc: DocMeta) => {
    jumpTo(doc.target);
    // On a phone the card covers the page, so get out of the way.
    if (isMobile() && doc.target.type !== 'external') setOpen(false);
  };

  /** Enter or send: prewritten answer → (gate) → saved answer → AI. Stops at the first that answers. */
  const submit = async () => {
    const q = text.trim();
    if (!q || thinking) return;
    const ticket = ++request.current;

    const pre = findPrewritten(q);
    if (pre) {
      setAnswer({ text: pre.answer, links: pre.links, source: 'quick', query: q });
      return;
    }
    if (needsAi(q, search(q).length) === 'results') {
      setAnswer(null);
      return;
    }
    const key = await answerKey(q, CONTENT_VERSION);
    const saved = getSavedAnswer(key);
    if (saved) {
      if (ticket === request.current) setAnswer({ text: saved.answer, links: saved.links, source: 'ai', query: q });
      return;
    }
    setThinking(true);
    const res = await askServer(q);
    if (ticket !== request.current) return;
    setThinking(false);
    if (res.fallback) {
      // Limits, errors and "can't answer" all land here: the results are the answer, and nothing else is said.
      setAnswer(null);
      return;
    }
    const links = res.links.filter((id) => DOCS.has(id));
    saveAnswer(key, { answer: res.answer, links });
    setAnswer({ text: res.answer, links, source: 'ai', query: q });
  };

  const pickChip = (answerId: string, label: string) => {
    const pre = prewrittenById(answerId);
    if (!pre) return;
    request.current++;
    setThinking(false);
    setText(label);
    setAnswer({ text: pre.answer, links: pre.links, source: 'quick', query: label });
  };

  const newSearch = () => {
    request.current++;
    setActiveId(null);
    setThinking(false);
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

  const noMatches = query.trim().length >= 3 && results.length === 0 && !showAnswer && !thinking;

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

        {thinking && <ThinkingPill />}
        {showAnswer && <AnswerCard text={showAnswer.text} links={linkDocs(showAnswer.links)} source={showAnswer.source} onJump={go} />}
        {results.length > 0 && (
          <ResultList results={results} activeId={activeId} onPick={(r: Result) => go(r.doc)} />
        )}
        {noMatches && (
          <p className="px-3 pt-2 text-xs text-ink-500">
            No matches yet. Try “design systems”, “Qore” or “contact”.
          </p>
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
