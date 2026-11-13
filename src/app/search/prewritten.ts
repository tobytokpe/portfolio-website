import type { PrewrittenAnswer } from './types.js';
import { matchTokens } from './normalise.js';

/** How much of the query and the stored question overlap, 0 to 1. Both sides count, so extra words lower the score. */
function overlap(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  const bs = new Set(b);
  const shared = a.filter((t) => bs.has(t)).length;
  return shared / Math.max(a.length, b.length);
}

export const PREWRITTEN_MIN_SCORE = 0.6;
export const PREWRITTEN_MIN_MARGIN = 0.15;

/**
 * The prewritten answer for a query, or null. A hit needs a strong match (≥ 0.6) that clearly beats every other
 * answer (by ≥ 0.15), so a near-miss falls through to search or AI instead of showing the wrong canned answer.
 */
export function matchPrewritten(query: string, answers: PrewrittenAnswer[]): PrewrittenAnswer | null {
  const q = matchTokens(query);
  if (!q.length) return null;
  const scored = answers
    .map((a) => ({ a, score: Math.max(...a.questions.map((v) => overlap(q, matchTokens(v)))) }))
    .sort((x, y) => y.score - x.score);
  const [best, second] = scored;
  if (!best || best.score < PREWRITTEN_MIN_SCORE) return null;
  if (second && best.score - second.score < PREWRITTEN_MIN_MARGIN) return null;
  return best.a;
}
