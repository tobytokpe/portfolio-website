/**
 * Builds the portfolio search index (0 tokens at runtime). Run by `npm run build:index`, before `dev` and `build`.
 * Writes src/generated/:
 *   search-docs.json    result rows for the browser (no full text)
 *   search-index.json   the serialised MiniSearch index (browser and /api/ask)
 *   search-corpus.json  full section text, read only by /api/ask to give Gemini context
 *   content-version.json a hash of the corpus; saved answers are keyed by it, so edits never serve stale answers
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import MiniSearch from 'minisearch';
import { CASE_STUDIES } from '../src/app/data/caseStudies.ts';
import { PROJECTS, LEADERSHIP, HERO_INTRO, ABOUT_BIO, GLOBAL_TALENT, DESIGN_JOURNEY, CONTACT } from '../src/app/data/site.ts';
import { PREWRITTEN_ANSWERS, STARTER_CHIPS } from '../src/app/data/prewrittenAnswers.ts';
import { buildDocs, validateDocs } from '../src/app/search/buildDocs.ts';
import { INDEX_OPTIONS } from '../src/app/search/indexConfig.ts';
import type { DocMeta } from '../src/app/search/types.ts';

const docs = buildDocs({
  caseStudies: CASE_STUDIES,
  projects: PROJECTS,
  leadership: LEADERSHIP,
  heroIntro: HERO_INTRO,
  aboutBio: ABOUT_BIO,
  globalTalent: GLOBAL_TALENT,
  designJourney: DESIGN_JOURNEY,
  contact: CONTACT,
});

validateDocs(docs, PREWRITTEN_ANSWERS, PROJECTS.map((p) => p.slug));
for (const chip of STARTER_CHIPS) {
  if (!PREWRITTEN_ANSWERS.some((a) => a.id === chip.answerId)) throw new Error(`Starter chip "${chip.label}" points at missing answer ${chip.answerId}`);
}

const index = new MiniSearch(INDEX_OPTIONS);
index.addAll(docs);

const snippet = (text: string) => (text.length > 220 ? text.slice(0, 217).replace(/\s+\S*$/, '') + '…' : text);
const meta: DocMeta[] = docs.map(({ text, ...rest }) => ({ ...rest, snippet: snippet(text) }));
const corpus = Object.fromEntries(docs.map((d) => [d.id, { title: d.title, parent: d.parent ?? null, text: d.text }]));
const version = createHash('sha256').update(JSON.stringify(docs)).digest('hex').slice(0, 10);

const out = new URL('../src/generated/', import.meta.url);
mkdirSync(out, { recursive: true });
writeFileSync(new URL('search-docs.json', out), JSON.stringify(meta));
writeFileSync(new URL('search-index.json', out), JSON.stringify(index));
writeFileSync(new URL('search-corpus.json', out), JSON.stringify(corpus));
writeFileSync(new URL('content-version.json', out), JSON.stringify({ version }));

const words = docs.reduce((n, d) => n + d.text.split(' ').length, 0);
console.log(`search index: ${docs.length} docs, ${words} words, version ${version}`);
