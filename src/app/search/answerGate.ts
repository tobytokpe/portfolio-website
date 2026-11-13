import { looksLikeQuestion, terms } from './normalise.js';

export type GateDecision = 'results' | 'ask';

/**
 * Whether a submitted query is worth an AI answer. Lookups ("qore", "design tokens") are answered by the results;
 * only real questions with something in the index to ground them go to the server.
 */
export function needsAi(query: string, resultCount: number): GateDecision {
  const q = query.trim();
  if (q.length < 3) return 'results';
  if (resultCount === 0) return 'results';
  if (terms(q).length === 0) return 'results';
  if (!looksLikeQuestion(q) && terms(q).length <= 3) return 'results';
  return 'ask';
}
