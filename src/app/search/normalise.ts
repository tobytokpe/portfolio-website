/**
 * Text handling shared by the browser, the index build and /api/ask. Pure functions, no imports, so it runs
 * the same everywhere. If you change it, the index changes too: run `npm run build:index`.
 */

export const STOP_WORDS = new Set(
  (
    'a an and are as at be been but by can could did do does for from had has have he her him his how i if in into is it its ' +
    'me my of on or our she so than that the their them then there these they this to too us was we were what when where ' +
    'which who whom why will with would you your yours about tell show give some any just also more most very much many ' +
    'tobi tobis olowu oluwatobi'
  ).split(' '),
);

/** Words people use for the same thing. The first of each group is the canonical form. */
const SYNONYM_GROUPS: string[][] = [
  ['contact', 'email', 'mail', 'reach', 'hire', 'hiring', 'touch'],
  ['fintech', 'banking', 'bank', 'finance', 'financial'],
  ['undp', 'un', 'united', 'nations', 'humanitarian', 'cewers'],
  ['talk', 'speaking', 'speaker', 'conference', 'presentation'],
  ['article', 'writing', 'blog', 'published', 'medium'],
  ['accessibility', 'a11y', 'wcag', 'accessible', 'inclusive'],
  ['token', 'variable'],
  ['cv', 'resume'],
  ['teach', 'teaching', 'mentor', 'mentoring', 'course'],
];

const CANONICAL = new Map<string, string>();
const GROUP_OF = new Map<string, string[]>();
for (const group of SYNONYM_GROUPS) {
  for (const word of group) {
    CANONICAL.set(word, group[0]);
    GROUP_OF.set(word, group);
  }
}

/** A deliberately light stemmer: plurals and common suffixes, so "systems" finds "system" and "designing" finds "design". */
export function stem(word: string): string {
  if (word.length <= 4) return word;
  if (word.endsWith('ies') && word.length > 5) return word.slice(0, -3) + 'y';
  if (word.endsWith('ing') && word.length > 6) return word.slice(0, -3);
  if (word.endsWith('ed') && word.length > 5) return word.slice(0, -2);
  if (word.endsWith('es') && /(ss|x|ch|sh)es$/.test(word)) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

/** Lowercase, accent-free words with punctuation removed. Keeps stop words. */
export function words(text: string): string[] {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’']s\b/g, '')
    .replace(/[^a-z0-9₦\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/** One term as the search index sees it: null drops it. Used for both indexing and queries. */
export function processTerm(term: string): string | null {
  const w = words(term)[0];
  if (!w || STOP_WORDS.has(w)) return null;
  return stem(w);
}

/** The meaningful words of a query, stemmed. */
export function terms(text: string): string[] {
  return words(text)
    .filter((w) => !STOP_WORDS.has(w))
    .map(stem);
}

/** Query text with synonyms added ("hire" also searches "contact", "email", …). */
export function expandQuery(text: string): string {
  const out = new Set<string>();
  for (const w of words(text)) {
    if (STOP_WORDS.has(w)) continue;
    out.add(w);
    for (const syn of GROUP_OF.get(w) ?? []) out.add(syn);
  }
  return [...out].join(' ');
}

/**
 * The cache identity of a question: meaningful words, synonyms folded, sorted, de-duplicated. "What's Tobi's
 * design-system experience?" and "design system experience" give the same text, so they share one saved answer.
 */
export function canonicalQuery(text: string): string {
  const set = new Set(
    words(text)
      .filter((w) => !STOP_WORDS.has(w))
      .map((w) => stem(CANONICAL.get(w) ?? w)),
  );
  return [...set].sort().join(' ');
}

/** Filler that never changes what a short question means. Question words stay, so "what is hydra" ≠ "hydra results". */
const FILLER = new Set(
  'a an the of to for in on at and or me i my you your he his him she her they them does do did is are was were has have had can could would please about tell s tobi tobis olowu oluwatobi'.split(' '),
);

/** The words used to match a query against prewritten questions: filler dropped, synonyms folded, stemmed. */
export function matchTokens(text: string): string[] {
  return [...new Set(words(text).filter((w) => !FILLER.has(w)).map((w) => stem(CANONICAL.get(w) ?? w)))];
}

export async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Same key in the browser cache and in Redis. The content version means edits to the site never serve stale answers. */
export async function answerKey(question: string, contentVersion: string): Promise<string> {
  return `ans:${contentVersion}:${(await sha256Hex(canonicalQuery(question))).slice(0, 16)}`;
}

const QUESTION_WORDS = new Set([
  'what', 'how', 'why', 'who', 'which', 'when', 'where', 'does', 'did', 'do', 'can', 'could', 'is', 'are', 'has', 'have',
  'tell', 'explain', 'describe', 'compare', 'summarise', 'summarize', 'should', 'would', 'was', 'were',
]);

/** True for "How did he…", "Tell me about…", "…?" and anything long enough to be more than a lookup. */
export function looksLikeQuestion(text: string): boolean {
  const all = words(text);
  if (text.trim().endsWith('?')) return true;
  if (all.length > 0 && QUESTION_WORDS.has(all[0])) return true;
  return terms(text).length >= 5;
}
