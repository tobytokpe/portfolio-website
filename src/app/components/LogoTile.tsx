import { getLogo } from '../lib/logos';

interface LogoTileProps {
  logoKey: string;
  name: string;
  size?: number;
  fallback?: React.ReactNode;
}

export function LogoTile({ logoKey, name, size = 48, fallback }: LogoTileProps) {
  const src = getLogo(logoKey);
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex-shrink-0 rounded-xl border border-gray-200 bg-white flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-contain p-1.5" />
      ) : fallback ? (
        fallback
      ) : (
        <span className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Syne, sans-serif' }}>
          {initials}
        </span>
      )}
    </div>
  );
}
