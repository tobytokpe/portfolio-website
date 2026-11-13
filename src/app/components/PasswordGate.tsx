import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Lock } from 'lucide-react';
import PROTECTED_CASES from '../data/protectedCases.json';
import { PROTECTED_ASSETS } from '../data/caseStudies';

type Encrypted = { salt: string; iv: string; ct: string; iterations: number };

const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const toB64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)));

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function deriveKey(password: string, enc: Encrypted) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: fromB64(enc.salt), iterations: enc.iterations, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, true, ['decrypt'],
  );
}

async function decryptSections(key: CryptoKey, enc: Encrypted) {
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(enc.iv) }, key, fromB64(enc.ct));
  const json = new TextDecoder().decode(plain);
  // Swap "@img:<name>" placeholders for the bundled image URLs
  return JSON.parse(json, (_k, v) => (typeof v === 'string' && v.startsWith('@img:') ? PROTECTED_ASSETS[v.slice(5)] ?? v : v));
}

interface PasswordGateProps {
  storageKey: string;
  passwordHash: string;
  encryptedId?: string;
  sections: any[];
  onBack: () => void;
  children: (sections: any[]) => React.ReactNode;
}

// Encrypted case studies only exist as ciphertext in the bundle; the password decrypts them in the browser.
export function PasswordGate({ storageKey, passwordHash, encryptedId, sections, onBack, children }: PasswordGateProps) {
  const unlockedKey = `case-unlocked:${storageKey}`;
  const keyKey = `case-key:${storageKey}`;
  const enc = encryptedId ? (PROTECTED_CASES as Record<string, Encrypted>)[encryptedId] : undefined;

  const [content, setContent] = useState<any[] | null>(() => {
    if (enc) return null;
    try { return sessionStorage.getItem(unlockedKey) === '1' ? sections : null; } catch { return null; }
  });
  const [wallVisible, setWallVisible] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Re-open an encrypted case study already unlocked in this tab
  useEffect(() => {
    if (!enc || content) return;
    let raw: string | null = null;
    try { raw = sessionStorage.getItem(keyKey); } catch { /* private mode */ }
    if (!raw) return;
    crypto.subtle.importKey('raw', fromB64(raw), 'AES-GCM', false, ['decrypt'])
      .then((key) => decryptSections(key, enc))
      .then(setContent)
      .catch(() => { try { sessionStorage.removeItem(keyKey); } catch { /* ignore */ } });
  }, [enc, keyKey, content]);

  // Show the wall once the reader scrolls to where the protected content starts.
  // A capture-phase scroll listener catches scrolling inside any container.
  useEffect(() => {
    if (content) return;
    const check = () => {
      const el = sentinelRef.current;
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.85) setWallVisible(true);
    };
    check();
    window.addEventListener('scroll', check, { capture: true, passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check, { capture: true } as EventListenerOptions);
      window.removeEventListener('resize', check);
    };
  }, [content]);

  if (content) return <>{children(content)}</>;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if ((await sha256(value)) !== passwordHash) { setError(true); return; }
    if (!enc) {
      try { sessionStorage.setItem(unlockedKey, '1'); } catch { /* private mode */ }
      setContent(sections);
      return;
    }
    setBusy(true);
    try {
      const key = await deriveKey(value, enc);
      const decrypted = await decryptSections(key, enc);
      try { sessionStorage.setItem(keyKey, toB64(await crypto.subtle.exportKey('raw', key))); } catch { /* private mode */ }
      setContent(decrypted);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div ref={sentinelRef} />
      {/* Placeholder only: the real content isn't available until it's decrypted */}
      <div className="blur-md select-none pointer-events-none space-y-6" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-11/12 bg-gray-100 rounded" />
            <div className="h-64 w-full bg-gray-100 rounded-2xl" />
          </div>
        ))}
      </div>

      {wallVisible && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6 bg-white/40 backdrop-blur-xl">
          <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-3xl border border-gray-200 shadow-[0px_16px_40px_rgba(0,0,0,0.08)] p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto mb-5">
              <Lock size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
              This case study is protected
            </h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              It covers work under NDA. Enter the password to keep reading.
            </p>
            <input
              type="password"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-gray-900 ${error ? 'border-red-400' : 'border-gray-300'}`}
            />
            {error && <p className="text-xs text-red-500 mt-2 text-left">That password isn't right.</p>}
            <button type="submit" disabled={busy} className="w-full mt-4 px-5 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-60">
              {busy ? 'Unlocking…' : 'Unlock'}
            </button>
            <button type="button" onClick={onBack} className="w-full mt-2 px-5 py-3 text-sm text-gray-500 hover:text-gray-900 cursor-pointer">
              Back to home
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Need access? <a href="mailto:oluwatobi.olowu@outlook.com" className="underline">Email me</a>
            </p>
          </form>
        </div>,
        document.body,
      )}
    </>
  );
}

export function MaybePasswordGate(props: Omit<PasswordGateProps, 'passwordHash'> & { passwordHash?: string }) {
  if (!props.passwordHash) return <>{props.children(props.sections)}</>;
  return <PasswordGate {...props} passwordHash={props.passwordHash} />;
}
