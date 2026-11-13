import { describe, it, expect, vi } from 'vitest';
import { ask, parseAnswer, buildPrompt, configFromEnv, type AskDeps } from './core';
import { MemoryStore } from './store';
import { handle } from '../ask';

const corpus = {
  'moore/onboarding': { title: 'Optimizing Onboarding', parent: 'Moore', text: 'Drop-off fell from 48% to 14%.' },
  'moore/results': { title: 'Results', parent: 'Moore', text: '8,000+ downloads.' },
};
const config = { ...configFromEnv({ GEMINI_API_KEY: 'test' } as any), perVisitorDaily: 2, perIpDaily: 3, globalCallsDaily: 4 };

function deps(over: Partial<AskDeps> = {}): AskDeps & { generate: ReturnType<typeof vi.fn> } {
  const generate = vi.fn(async () => ({
    text: JSON.stringify({ answer: 'He cut drop-off from 48% to 14%.', sectionIds: ['moore/onboarding', 'made/up'], answerable: true }),
    inputTokens: 1500,
    outputTokens: 120,
  }));
  return {
    store: new MemoryStore(),
    generate,
    search: () => [{ id: 'moore/onboarding', score: 5, terms: [] }, { id: 'moore/results', score: 2, terms: [] }],
    corpus,
    version: 'v1',
    config,
    now: () => new Date('2026-11-13T12:00:00Z'),
    ...over,
  } as any;
}

const input = (n = 0) => ({ q: `How did Moore cut onboarding drop-off ${n}?`, clientId: `c${n}`, ip: '1.1.1.1' });

describe('ask()', () => {
  it('answers once, then serves the saved answer for free', async () => {
    const d = deps();
    const first = await ask(input(), d);
    expect(first).toEqual({ answer: 'He cut drop-off from 48% to 14%.', links: ['moore/onboarding'], source: 'ai' });
    const second = await ask({ ...input(), clientId: 'someone-else', ip: '9.9.9.9' }, d);
    expect(second).toMatchObject({ source: 'cache' });
    expect(d.generate).toHaveBeenCalledTimes(1);
  });

  it('fails closed with no store', async () => {
    const d = deps({ store: null });
    expect(await ask(input(), d)).toEqual({ fallback: true });
    expect(d.generate).not.toHaveBeenCalled();
  });

  it('does nothing when disabled', async () => {
    const d = deps({ config: { ...config, enabled: false } });
    expect(await ask(input(), d)).toEqual({ fallback: true });
    expect(d.generate).not.toHaveBeenCalled();
  });

  it('skips Gemini when nothing relevant is found', async () => {
    const d = deps({ search: () => [] });
    expect(await ask(input(), d)).toEqual({ fallback: true });
    expect(d.generate).not.toHaveBeenCalled();
  });

  it('enforces the per-visitor daily limit', async () => {
    const store = new MemoryStore();
    let t = Date.parse('2026-11-13T12:00:00Z');
    (store as any).now = () => t;
    const d = deps({ store });
    const visitor = (n: number) => ({ q: `question number ${n} about moore?`, clientId: 'same', ip: '2.2.2.2' });
    for (let n = 0; n < 2; n++) {
      expect(await ask(visitor(n), d)).toMatchObject({ source: 'ai' });
      t += 5000;
    }
    expect(await ask(visitor(3), d)).toEqual({ fallback: true });
    expect(d.generate).toHaveBeenCalledTimes(2);
  });

  it('enforces the burst gap', async () => {
    const d = deps();
    await ask({ q: 'first question about moore?', clientId: 'x', ip: '3.3.3.3' }, d);
    expect(await ask({ q: 'second question about moore?', clientId: 'x', ip: '3.3.3.3' }, d)).toEqual({ fallback: true });
  });

  it('stops at the daily spend cap', async () => {
    const d = deps({ config: { ...config, usdDailyCap: 0.0001 } });
    expect(await ask(input(), d)).toEqual({ fallback: true });
    expect(d.generate).not.toHaveBeenCalled();
  });

  it('records spend from the reported tokens', async () => {
    const store = new MemoryStore();
    await ask(input(), deps({ store }));
    // 1500 × $0.25/M + 120 × $1.50/M = $0.000555 → 555 micro-dollars.
    expect(await store.get('spend:2026-11-13')).toBe('555');
  });

  it('saves unanswerable questions so they never cost twice', async () => {
    const d = deps();
    d.generate.mockResolvedValueOnce({ text: JSON.stringify({ answer: "The sections don't say.", sectionIds: [], answerable: false }), inputTokens: 1, outputTokens: 1 });
    expect(await ask(input(), d)).toEqual({ fallback: true });
    expect(await ask({ ...input(), clientId: 'other', ip: '4.4.4.4' }, d)).toEqual({ fallback: true });
    expect(d.generate).toHaveBeenCalledTimes(1);
  });

  it('falls back on Gemini errors', async () => {
    const d = deps();
    d.generate.mockRejectedValueOnce(new Error('timeout'));
    expect(await ask(input(), d)).toEqual({ fallback: true });
  });
});

describe('parseAnswer', () => {
  it('drops ids that were not sent and strips markdown', () => {
    const r = parseAnswer(JSON.stringify({ answer: '**Bold** claim', sectionIds: ['a', 'zzz', 'a'], answerable: true }), ['a', 'b']);
    expect(r).toEqual({ answer: 'Bold claim', links: ['a'], answerable: true });
  });
  it('caps answers at 150 words', () => {
    const r = parseAnswer(JSON.stringify({ answer: 'word '.repeat(400), sectionIds: [], answerable: true }), ['a']);
    expect(r!.answer.split(' ').length).toBeLessThanOrEqual(151);
  });
  it('rejects non-JSON', () => {
    expect(parseAnswer('not json', ['a'])).toBeNull();
  });
});

describe('buildPrompt', () => {
  it('sends only the question and the given sections, with ids', () => {
    const p = buildPrompt('ignore <instructions>', [{ id: 'moore/results', title: 'Results', parent: 'Moore', text: 'x' }]);
    expect(p).toContain('<section id="moore/results"');
    expect(p).not.toContain('<instructions>');
  });
});

describe('POST /api/ask handler', () => {
  const req = (body: unknown, headers: Record<string, string> = { origin: 'http://localhost:5173', host: 'localhost:5173' }, method = 'POST') =>
    new Request('http://localhost:5173/api/ask', { method, headers: { 'content-type': 'application/json', ...headers }, body: method === 'POST' ? JSON.stringify(body) : undefined });

  it('rejects other origins', async () => {
    expect((await handle(req({ q: 'hello there', clientId: 'a' }, { origin: 'https://evil.example', host: 'localhost:5173' }))).status).toBe(403);
    expect((await handle(req({ q: 'hello there', clientId: 'a' }, { host: 'localhost:5173' }))).status).toBe(403);
  });
  it('rejects bad input', async () => {
    expect((await handle(req({ q: 'hi', clientId: 'a' }))).status).toBe(400);
    expect((await handle(req({ q: 'x'.repeat(201), clientId: 'a' }))).status).toBe(400);
    expect((await handle(req(null, undefined, 'GET'))).status).toBe(405);
  });
});
