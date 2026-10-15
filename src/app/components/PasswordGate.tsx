import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Lock } from 'lucide-react';

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

interface PasswordGateProps {
  storageKey: string;
  passwordHash: string;
  onBack: () => void;
  children: React.ReactNode;
}

// Client-side gate: keeps casual visitors out of NDA work, not a security boundary.
export function PasswordGate({ storageKey, passwordHash, onBack, children }: PasswordGateProps) {
  const key = `case-unlocked:${storageKey}`;
  const [unlocked, setUnlocked] = useState(() => {
    try { return sessionStorage.getItem(key) === '1'; } catch { return false; }
  });
  const [wallVisible, setWallVisible] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unlocked || !sentinelRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) setWallVisible(true);
    });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [unlocked]);

  if (unlocked) return <>{children}</>;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if ((await sha256(value)) === passwordHash) {
      try { sessionStorage.setItem(key, '1'); } catch { /* private mode */ }
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div ref={sentinelRef} />
      <div className="blur-md select-none pointer-events-none max-h-[900px] overflow-hidden" aria-hidden>
        {children}
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
            <button type="submit" className="w-full mt-4 px-5 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
              Unlock
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
  if (!props.passwordHash) return <>{props.children}</>;
  return <PasswordGate {...props} passwordHash={props.passwordHash} />;
}
