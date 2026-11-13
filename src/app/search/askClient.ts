import type { AskResponse } from './types';
import { clientId } from './answerCache';

/** Asks /api/ask. Any failure (offline, timeout, limit, server error) comes back as `fallback`, which shows results only. */
export async function askServer(question: string, signal?: AbortSignal): Promise<AskResponse> {
  const timeout = new AbortController();
  const timer = window.setTimeout(() => timeout.abort(), 22_000);
  signal?.addEventListener('abort', () => timeout.abort());
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ q: question, clientId: clientId() }),
      signal: timeout.signal,
    });
    if (!res.ok) return { fallback: true, reason: res.status === 429 ? 'limit' : 'unavailable' };
    const data = (await res.json()) as AskResponse;
    if (data.fallback) return { fallback: true, reason: data.reason ?? 'unavailable' };
    if (typeof data.answer !== 'string' || !Array.isArray(data.links)) return { fallback: true, reason: 'unavailable' };
    return data;
  } catch {
    return { fallback: true, reason: 'unavailable' };
  } finally {
    window.clearTimeout(timer);
  }
}
