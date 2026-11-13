import { lazy, Suspense, useState } from 'react';
import { useAssistantPanel } from './AssistantContext';

// lottie-web is ~300 KB, so it loads in its own chunk; for that moment a still orb in the same colours sits in its place.
const AiOrb = lazy(() => import('./AiOrb').then((m) => ({ default: m.AiOrb })));

function StillOrb({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 32% 30%, #CFEBFE 0%, #AFDFFC 28%, transparent 55%), radial-gradient(circle at 70% 72%, #E6C1FE 0%, transparent 50%), radial-gradient(circle at 30% 80%, #F0C6A3 0%, transparent 45%), #455EF9',
      }}
    />
  );
}

/** Always animating, like the orb on the welcome screen. lottie loads in its own chunk as soon as the dock mounts. */
function DockOrb({ size }: { size: number }) {
  return (
    <Suspense fallback={<StillOrb size={size} />}>
      <AiOrb size={size} motion="loop" />
    </Suspense>
  );
}

const LABEL = 'Chat with AI';

/** The dock's search button: the Bespoka assistant orb on its own, with the dock's usual hover tooltip. */
export function AskAiButton() {
  const { open, toggle } = useAssistantPanel();
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={LABEL}
        aria-pressed={open}
        aria-keyshortcuts="/ Meta+K Control+K"
        className={`h-8 w-8 rounded-full flex items-center justify-center transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-800 focus-visible:ring-offset-2 ${
          open ? 'ring-2 ring-ink-800 ring-offset-2' : 'hover:shadow-md'
        }`}
      >
        <DockOrb size={32} />
      </button>
      {/* Same tooltip as the other dock icons, hidden while the card is open (as theirs hide while their popup is). */}
      {hovered && !open && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] bg-gray-800 text-white px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none z-10">
          {LABEL}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-800 rotate-45" />
        </div>
      )}
    </div>
  );
}
