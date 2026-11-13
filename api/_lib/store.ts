import { Redis } from '@upstash/redis';

/** The little bit of Redis the endpoint needs: saved answers and daily counters. */
export interface Store {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds: number): Promise<void>;
  /** Sets only if missing; false if it already existed. */
  setIfAbsent(key: string, value: string, ttlSeconds: number): Promise<boolean>;
  incrBy(key: string, by: number, ttlSeconds: number): Promise<number>;
}

class UpstashStore implements Store {
  constructor(private redis: Redis) {}
  async get(key: string) {
    const v = await this.redis.get<string>(key);
    return v == null ? null : typeof v === 'string' ? v : JSON.stringify(v);
  }
  async set(key: string, value: string, ttl: number) {
    await this.redis.set(key, value, { ex: ttl });
  }
  async setIfAbsent(key: string, value: string, ttl: number) {
    return (await this.redis.set(key, value, { ex: ttl, nx: true })) === 'OK';
  }
  async incrBy(key: string, by: number, ttl: number) {
    const [n] = await this.redis.pipeline().incrby(key, by).expire(key, ttl).exec<[number, number]>();
    return n;
  }
}

/** In-memory store for local development only. */
export class MemoryStore implements Store {
  private data = new Map<string, { value: string; expires: number }>();
  constructor(private now: () => number = Date.now) {}
  private live(key: string) {
    const e = this.data.get(key);
    if (e && e.expires <= this.now()) this.data.delete(key);
    return this.data.get(key) ?? null;
  }
  async get(key: string) {
    return this.live(key)?.value ?? null;
  }
  async set(key: string, value: string, ttl: number) {
    this.data.set(key, { value, expires: this.now() + ttl * 1000 });
  }
  async setIfAbsent(key: string, value: string, ttl: number) {
    if (this.live(key)) return false;
    await this.set(key, value, ttl);
    return true;
  }
  async incrBy(key: string, by: number, ttl: number) {
    const n = Number(this.live(key)?.value ?? 0) + by;
    await this.set(key, String(n), ttl);
    return n;
  }
}

let memory: MemoryStore | null = null;

export interface StoreChoice {
  store: Store;
  /** True for Redis: one cache and one set of counters for every instance. False for in-memory. */
  shared: boolean;
}

/**
 * Upstash Redis when configured (the Vercel Marketplace integration sets KV_REST_API_* or UPSTASH_REDIS_REST_*).
 * Without it, the function's own memory: Vercel keeps instances warm between requests, so saved answers and
 * counters live as long as the instance does (a low-traffic site is mostly served by one). Limits then count per
 * instance, so the caller tightens them (see memoryCaps in core.ts).
 */
export function getStore(env: NodeJS.ProcessEnv = process.env): StoreChoice {
  const url = env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN;
  if (url && token) return { store: new UpstashStore(new Redis({ url, token })), shared: true };
  return { store: (memory ??= new MemoryStore()), shared: false };
}
