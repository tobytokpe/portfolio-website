import { useEffect, useState, type CSSProperties } from "react";

/**
 * Where the floating search card sits (based on Bespoka's): on desktop, docked to the bottom-right corner,
 * level with the bottom dock unless the dock would sit underneath it; on phones, full width above the dock.
 * Measured from the page itself, so it follows the nav.
 */

export interface Box {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const GAP = 12;
const DESKTOP_WIDTH = 400;
const DESKTOP_MAX_HEIGHT = 760;
const MOBILE_BREAKPOINT = 768;

/** Pure: the card's fixed-position frame for a viewport, the header's box and the nav's box. */
export function floatingFrame(viewport: { width: number; height: number }, header: Box | null, nav: Box | null): CSSProperties {
  const top = Math.max(0, header?.bottom ?? 0) + GAP;
  const mobile = viewport.width < MOBILE_BREAKPOINT;
  // A nav across the bottom (wider than tall, in the lower half) pushes the card up; a side dock pushes it in.
  const navAtBottom = nav ? nav.right - nav.left > nav.bottom - nav.top && nav.top > viewport.height / 2 : false;
  const navOnRight = nav ? !navAtBottom && nav.left > viewport.width / 2 : false;
  const right = navOnRight && nav ? viewport.width - nav.left + GAP : mobile ? GAP : GAP + 4;
  if (mobile) {
    const bottom = navAtBottom && nav ? viewport.height - nav.top + GAP : GAP;
    return { top, bottom, left: GAP, right: GAP };
  }
  const width = Math.min(DESKTOP_WIDTH, viewport.width - right - GAP);
  const cardLeft = viewport.width - right - width;
  // Only climb above the dock when the dock actually reaches under the card (narrow desktop windows).
  const dockUnderCard = navAtBottom && nav ? nav.right > cardLeft - GAP : false;
  const bottom = dockUnderCard && nav ? viewport.height - nav.top + GAP : GAP + 4;
  const height = Math.min(DESKTOP_MAX_HEIGHT, viewport.height - bottom - top);
  return { bottom, right, width, height };
}

const boxOf = (selector: string): Box | null => {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
};

/** The frame for the open card, kept up to date as the page scrolls, resizes or the nav moves. */
export function useFloatingFrame(): CSSProperties {
  const measure = () =>
    floatingFrame({ width: window.innerWidth, height: window.innerHeight }, boxOf("[data-app-header]"), boxOf("[data-app-nav]"));
  const [frame, setFrame] = useState<CSSProperties>(measure);

  useEffect(() => {
    const update = () => setFrame(measure());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    for (const sel of ["[data-app-header]", "[data-app-nav]"]) {
      const el = document.querySelector(sel);
      if (el && observer) observer.observe(el);
    }
    // The nav animates when it's docked to another edge; settle once it has moved.
    const late = window.setTimeout(update, 400);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      observer?.disconnect();
      window.clearTimeout(late);
    };
  }, []);

  return frame;
}

/** Where the card is after being dragged: its top-left corner, in viewport pixels. */
export interface DragPosition {
  left: number;
  top: number;
}

/** Pure: keeps a dragged card fully on screen, `margin` pixels in from every edge. */
export function clampToViewport(
  pos: DragPosition,
  size: { width: number; height: number },
  viewport: { width: number; height: number },
  margin = 8,
): DragPosition {
  const maxLeft = Math.max(margin, viewport.width - size.width - margin);
  const maxTop = Math.max(margin, viewport.height - size.height - margin);
  return {
    left: Math.min(Math.max(pos.left, margin), maxLeft),
    top: Math.min(Math.max(pos.top, margin), maxTop),
  };
}

const POSITION_KEY = "portfolio_search_position";

/** The last place the card was dragged to in this browser, if any. Storage can be blocked; that just means no memory. */
export function savedDragPosition(): DragPosition | null {
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<DragPosition>;
    return typeof p.left === "number" && typeof p.top === "number" ? { left: p.left, top: p.top } : null;
  } catch {
    return null;
  }
}

export function saveDragPosition(pos: DragPosition | null): void {
  try {
    if (pos) localStorage.setItem(POSITION_KEY, JSON.stringify(pos));
    else localStorage.removeItem(POSITION_KEY);
  } catch {
    // Private windows can refuse storage; the card just goes back to its usual place next time.
  }
}
