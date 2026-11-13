/** Saved answers in this browser: repeat questions cost nothing and need no network. Storage can be blocked; then nothing is saved. */

const PREFIX = 'ps_';
const INDEX_KEY = 'ps_answer_keys';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 50;

export interface SavedAnswer {
  answer: string;
  links: string[];
  savedAt: number;
}

function readIndex(): string[] {
  try {
    return JSON.parse(localStorage.getItem(INDEX_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function getSavedAnswer(key: string, now = Date.now()): SavedAnswer | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const saved = JSON.parse(raw) as SavedAnswer;
    if (now - saved.savedAt > TTL_MS) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    return saved;
  } catch {
    return null;
  }
}

export function saveAnswer(key: string, value: Omit<SavedAnswer, 'savedAt'>, now = Date.now()): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ ...value, savedAt: now }));
    const keys = [key, ...readIndex().filter((k) => k !== key)];
    for (const old of keys.slice(MAX_ENTRIES)) localStorage.removeItem(PREFIX + old);
    localStorage.setItem(INDEX_KEY, JSON.stringify(keys.slice(0, MAX_ENTRIES)));
  } catch {
    // Private windows can refuse storage.
  }
}

/** A random id for this browser, used only for the server's per-visitor limit. */
export function clientId(): string {
  try {
    let id = localStorage.getItem('ps_client_id');
    if (!id) {
      id = globalThis.crypto.randomUUID();
      localStorage.setItem('ps_client_id', id);
    }
    return id;
  } catch {
    return 'no-storage';
  }
}
