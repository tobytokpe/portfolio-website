/**
 * POST /api/ask { q, clientId } → { answer, links, source } or { fallback: true }.
 * The last resort of the portfolio search: the browser only calls it after prewritten answers, the "needs AI"
 * check and its own saved answers all miss. The Gemini key never leaves this function.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import MiniSearch from 'minisearch';
import { INDEX_OPTIONS } from '../src/app/search/indexConfig.js';
import { runQuery } from '../src/app/search/query.js';
import { ask, configFromEnv, memoryCaps, type Corpus } from './_lib/core.js';
import { getStore } from './_lib/store.js';
import { geminiGenerate, DEFAULT_MODELS } from './_lib/gemini.js';

let loaded: { index: MiniSearch; corpus: Corpus; version: string } | null = null;

/** The index and corpus written by scripts/build-search-index.ts (bundled with the function via vercel.json includeFiles). */
function data() {
  if (!loaded) {
    const dir = join(process.cwd(), 'src', 'generated');
    const read = (f: string) => JSON.parse(readFileSync(join(dir, f), 'utf8'));
    loaded = {
      index: MiniSearch.loadJS(read('search-index.json'), INDEX_OPTIONS),
      corpus: read('search-corpus.json'),
      version: read('content-version.json').version,
    };
  }
  return loaded;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

/** Only pages on this site (or origins listed in ALLOWED_ORIGINS) may call it. */
function originAllowed(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  const self = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (self && host === self) return true;
  const allowed = (process.env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  return allowed.some((a) => a === origin || a === host);
}

export async function handle(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!originAllowed(request)) return json({ error: 'Forbidden' }, 403);
  const raw = await request.text();
  if (raw.length > 1024) return json({ error: 'Too large' }, 413);
  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Bad request' }, 400);
  }
  const q = typeof body?.q === 'string' ? body.q.trim() : '';
  const clientId = typeof body?.clientId === 'string' ? body.clientId.slice(0, 64) : '';
  if (q.length < 3 || q.length > 200) return json({ error: 'Bad request' }, 400);

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
  const { store, shared } = getStore();
  // Without Redis, limits are counted per warm instance, so they're tighter.
  const config = shared ? configFromEnv() : memoryCaps(configFromEnv());
  const { index, corpus, version } = data();
  const key = process.env.GEMINI_API_KEY;

  try {
    const result = await ask(
      { q, clientId, ip },
      {
        store,
        // GEMINI_MODEL (optional) puts one model first, ahead of the defaults.
        generate: key ? geminiGenerate(key, [...new Set([process.env.GEMINI_MODEL, ...DEFAULT_MODELS].filter(Boolean) as string[])]) : null,
        search: (text, limit) => runQuery(index, text, limit),
        corpus,
        version,
        config,
        log: (msg, extra) => console.log(`[ask] ${msg}`, extra ? JSON.stringify(extra) : ''),
      },
    );
    return json(result);
  } catch (err) {
    console.error('[ask] failed', err instanceof Error ? err.message : err);
    return json({ fallback: true, reason: 'unavailable' });
  }
}

export default { fetch: handle };
