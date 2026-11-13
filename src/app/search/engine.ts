/**
 * The browser side of search. Imported only by the (lazy-loaded) search card, so none of this ships with the
 * first page load.
 */
import MiniSearch from 'minisearch';
import indexJs from '../../generated/search-index.json';
import docsMeta from '../../generated/search-docs.json';
import contentVersion from '../../generated/content-version.json';
import { PREWRITTEN_ANSWERS } from '../data/prewrittenAnswers';
import { INDEX_OPTIONS } from './indexConfig';
import { runQuery, type Hit } from './query';
import { matchPrewritten } from './prewritten';
import type { DocMeta, PrewrittenAnswer } from './types';

const index = MiniSearch.loadJS(indexJs as any, INDEX_OPTIONS);
export const DOCS = new Map<string, DocMeta>((docsMeta as DocMeta[]).map((d) => [d.id, d]));
export const CONTENT_VERSION: string = contentVersion.version;

export interface Result extends Hit {
  doc: DocMeta;
}

/** Results scoring under this share of the top hit are noise ("global talent" shouldn't list every "global"). */
const RELATIVE_FLOOR = 0.25;

export function search(query: string, limit = 8): Result[] {
  const hits = runQuery(index, query, limit);
  const top = hits[0]?.score ?? 0;
  return hits
    .filter((h) => h.score >= top * RELATIVE_FLOOR)
    .map((h) => ({ ...h, doc: DOCS.get(h.id)! }))
    .filter((r) => r.doc);
}

export function findPrewritten(query: string): PrewrittenAnswer | null {
  return matchPrewritten(query, PREWRITTEN_ANSWERS);
}

export function prewrittenById(id: string): PrewrittenAnswer | undefined {
  return PREWRITTEN_ANSWERS.find((a) => a.id === id);
}
