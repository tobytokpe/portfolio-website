import { Frame } from './Frame';

interface NestedFrameProps {
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children?: React.ReactNode;
}

export function NestedFrame({ title, x, y, width, height, children }: NestedFrameProps) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
      }}
    >
      {/* Nested frame label */}
      <div
        className="absolute -top-6 left-0 text-[10px] font-medium text-[#888]"
        style={{ pointerEvents: 'none' }}
      >
        {title}
      </div>

      {/* Nested frame container */}
      <div
        className="relative bg-[#fafafa] rounded-sm overflow-auto"
        style={{
          width,
          height,
          border: '1px solid #e8e8e8',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
