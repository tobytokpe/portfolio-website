import type MiniSearch from 'minisearch';
import { SEARCH_OPTIONS } from './indexConfig.js';
import { expandQuery } from './normalise.js';

export interface Hit {
  id: string;
  score: number;
  /** Index terms that matched, for bolding in snippets. */
  terms: string[];
}

/** The id a long section was split from ("qore/results~2" → "qore/results"). */
export const baseId = (id: string) => id.replace(/~\d+$/, '');

/** Runs a query against the index (browser and server use the same function). Split sections collapse to their best chunk. */
export function runQuery(index: MiniSearch, query: string, limit = 8): Hit[] {
  const expanded = expandQuery(query);
  if (!expanded) return [];
  const seen = new Set<string>();
  const hits: Hit[] = [];
  for (const r of index.search(expanded, SEARCH_OPTIONS)) {
    const base = baseId(String(r.id));
    if (seen.has(base)) continue;
    seen.add(base);
    hits.push({ id: String(r.id), score: r.score, terms: r.terms });
    if (hits.length >= limit) break;
  }
  return hits;
}
