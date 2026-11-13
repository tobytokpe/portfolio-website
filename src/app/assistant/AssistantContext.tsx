import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import type { JumpTarget } from '../search/types';

/** A page that can carry out a jump itself (the canvas pans, the mobile view scrolls). Returns false to let the default run. */
export type JumpHandler = (target: JumpTarget) => boolean;

interface AssistantPanelState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  /** Takes the visitor to a section: pans the canvas, opens a case study or opens an external link. */
  jumpTo: (target: JumpTarget) => void;
  /** Pages register how they handle jumps while they're mounted. Returns the unregister function. */
  registerJumpHandler: (handler: JumpHandler) => () => void;
}

// A no-op default keeps components usable (and testable) outside the provider.
const AssistantContext = createContext<AssistantPanelState>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
  jumpTo: () => {},
  registerJumpHandler: () => () => {},
});

/** "/about/global-talent" style hash for a frame target, so jumps from a case study page land on the canvas. */
export const frameHash = (target: Extract<JumpTarget, { type: 'frame' }>) => `#${target.anchor ?? target.frame}`;

export function AssistantProvider({ children, defaultOpen = false }: { children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const navigate = useNavigate();
  const handlers = useRef<JumpHandler[]>([]);

  const registerJumpHandler = useCallback((handler: JumpHandler) => {
    handlers.current = [handler, ...handlers.current];
    return () => {
      handlers.current = handlers.current.filter((h) => h !== handler);
    };
  }, []);

  const jumpTo = useCallback(
    (target: JumpTarget) => {
      if (target.type === 'external') {
        window.open(target.url, '_blank', 'noopener,noreferrer');
        return;
      }
      for (const handler of handlers.current) if (handler(target)) return;
      if (target.type === 'frame') navigate(`/${frameHash(target)}`);
      else navigate(`/works/${target.slug}${target.anchor ? `#${target.anchor}` : ''}`);
    },
    [navigate],
  );

  // "/" or Cmd/Ctrl+K opens search from anywhere; Escape closes it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(() => ({ open, setOpen, toggle, jumpTo, registerJumpHandler }), [open, toggle, jumpTo, registerJumpHandler]);
  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistantPanel() {
  return useContext(AssistantContext);
}

/** Registers a page's jump handler while it's mounted. The latest handler function is always used. */
export function useJumpHandler(handler: JumpHandler) {
  const { registerJumpHandler } = useAssistantPanel();
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => registerJumpHandler((t) => ref.current(t)), [registerJumpHandler]);
}
