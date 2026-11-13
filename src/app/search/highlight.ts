/** The element a search id points at, on whichever page is showing. */
export function findAnchor(id: string, root: ParentNode = document): HTMLElement | null {
  return root.querySelector<HTMLElement>(`[data-search-id="${CSS.escape(id)}"]`);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Marks where a jump landed: a marker outline that fades out, and focus for screen readers. */
export function highlight(el: HTMLElement): void {
  el.classList.remove('search-hit', 'search-hit-fade');
  // Restart the effect if the same element is highlighted twice in a row.
  void el.offsetWidth;
  el.classList.add('search-hit');
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  window.setTimeout(() => el.classList.add('search-hit-fade'), 2200);
  window.setTimeout(() => el.classList.remove('search-hit', 'search-hit-fade'), 2900);
}

/** Scrolls an element into view inside its scroll container, then highlights it. Retries once for late-loading images. */
export function scrollToAndHighlight(id: string, block: ScrollLogicalPosition = 'start'): boolean {
  const el = findAnchor(id) ?? document.getElementById(id);
  if (!el) return false;
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
  el.scrollIntoView({ behavior, block });
  // Images above the target can still change height; settle on the final position.
  window.setTimeout(() => el.scrollIntoView({ behavior, block }), 450);
  window.setTimeout(() => highlight(el), 500);
  return true;
}
