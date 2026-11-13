import type { Options, SearchOptions } from 'minisearch';
import { processTerm } from './normalise.js';

/** MiniSearch settings. The same object builds the index (scripts/build-search-index.ts) and loads it (browser and /api/ask). */
export const INDEX_OPTIONS: Options = {
  idField: 'id',
  fields: ['title', 'parent', 'keywords', 'text'],
  storeFields: [],
  extractField: (doc: any, field: string) => (field === 'keywords' ? (doc.keywords ?? []).join(' ') : doc[field] ?? ''),
  processTerm: (term: string) => processTerm(term) ?? null,
};

export const SEARCH_OPTIONS: SearchOptions = {
  boost: { title: 3, keywords: 2, parent: 1.5, text: 1 },
  prefix: (term: string) => term.length >= 3,
  fuzzy: (term: string) => (term.length >= 5 ? 0.2 : false),
  combineWith: 'OR',
};

/** Long sections are split so each search hit (and each chunk sent to Gemini) stays focused. */
export const MAX_DOC_WORDS = 350;
