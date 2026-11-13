import { useEffect, useRef } from 'react';

interface AutoplayVideoProps {
  src: string;
  webm?: string;
  className?: string;
  label?: string;
}

// Muted looping video that reliably autoplays: sets `muted` on the element itself
// (React only sets the property, which Safari's autoplay check can miss) and nudges play().
export function AutoplayVideo({ src, webm, className, label }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute('muted', '');
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, [src, webm]);

  return (
    <video ref={ref} autoPlay loop muted playsInline preload="auto" aria-label={label} className={className}>
      {webm && <source src={webm} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
