/** Shared by the browser, the index build script and the /api/ask function. No imports, so all three can load it. */

export type FrameId = 'hero' | 'about' | 'work' | 'leadership' | 'contact';

/** Where "Jump to section" goes. */
export type JumpTarget =
  | { type: 'frame'; frame: FrameId; anchor?: string }
  | { type: 'case-study'; slug: string; anchor?: string }
  | { type: 'external'; url: string };

export type DocKind = 'case-study' | 'section' | 'about' | 'cv' | 'leadership' | 'contact';

export interface SearchDoc {
  /** Stable, hand-written id, e.g. "hydra/sorting-the-mess". Also the DOM anchor (data-search-id). */
  id: string;
  kind: DocKind;
  title: string;
  /** e.g. "HYDRA" for a Hydra section. */
  parent?: string;
  /** Plain text (no markdown). */
  text: string;
  keywords?: string[];
  target: JumpTarget;
  /** A second link for leadership articles and contact channels ("Open ↗"). */
  url?: string;
}

/** What ships to the browser for a result row: the doc without its full text. */
export interface DocMeta extends Omit<SearchDoc, 'text'> {
  snippet: string;
}

export interface PrewrittenAnswer {
  id: string;
  /** Ways a visitor might ask it. Matched locally, never sent anywhere. */
  questions: string[];
  answer: string;
  /** Section ids to offer as "Jump to section" links. */
  links: string[];
}

/** Why the server didn't write an answer. The card explains it in plain words; the visitor still gets the results. */
export type FallbackReason = 'no-match' | 'unanswerable' | 'limit' | 'unavailable';

/** /api/ask response. `fallback` means no written answer, with the reason. */
export type AskResponse =
  | { fallback: true; reason: FallbackReason }
  | { fallback?: false; answer: string; links: string[]; source: 'ai' | 'cache' };
