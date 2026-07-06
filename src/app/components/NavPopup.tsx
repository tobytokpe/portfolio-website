import { useEffect, useRef } from 'react';
import { WorkIcon, LeadershipIcon } from './Navigation';

interface PopupItem {
  id: string;
  title: string;
}

interface NavPopupProps {
  type: 'work' | 'leadership';
  items: PopupItem[];
  onNavigateToSection: () => void;
  onItemClick: (id: string) => void;
  onClose: () => void;
}

const CaseStudiesIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" id="file" className="block size-full">
    <path fill="#C4E6FF" fillRule="evenodd" d="M6 1C4.34315 1 3 2.34315 3 4V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V19H9C8.44772 19 8 18.5523 8 18V1H6Z" clipRule="evenodd"></path>
    <path fill="#024493" fillRule="evenodd" d="M6 3C5.44772 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V7.82843C19 7.56321 18.8946 7.30886 18.7071 7.12132L14.8787 3.29289C14.6911 3.10536 14.4368 3 14.1716 3H6ZM3 4C3 2.34315 4.34315 1 6 1H14.1716C14.9672 1 15.7303 1.31607 16.2929 1.87868L20.1213 5.70711C20.6839 6.26972 21 7.03278 21 7.82843V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V4Z" clipRule="evenodd"></path>
    <path fill="#1E93FF" fillRule="evenodd" d="M14 1C13.4477 1 13 1.44772 13 2V6C13 7.65685 14.3431 9 16 9H20C20.5523 9 21 8.55228 21 8V7.82843C21 7.03278 20.6839 6.26972 20.1213 5.70711L16.2929 1.87868C15.7303 1.31607 14.9672 1 14.1716 1H14ZM15 6V3.41421L18.5858 7H16C15.4477 7 15 6.55228 15 6Z" clipRule="evenodd"></path>
  </svg>
);

const LeadershipLinksIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" id="link" className="block size-full">
    <path fill="#C4E6FF" fillRule="evenodd" d="M23 12C23 8.68629 20.3137 6 17 6H15C14.4477 6 14 6.44772 14 7V17C14 17.5523 14.4477 18 15 18H17C20.3137 18 23 15.3137 23 12Z" clipRule="evenodd"></path>
    <path fill="#024493" fillRule="evenodd" d="M7 6C3.68629 6 1 8.68629 1 12C1 15.3137 3.68629 18 7 18H9C9.55228 18 10 17.5523 10 17C10 16.4477 9.55228 16 9 16H7C4.79086 16 3 14.2091 3 12C3 9.79086 4.79086 8 7 8H9C9.55228 8 10 7.55228 10 7C10 6.44772 9.55228 6 9 6H7ZM17 6C20.3137 6 23 8.68629 23 12C23 15.3137 20.3137 18 17 18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17C19.2091 16 21 14.2091 21 12C21 9.79086 19.2091 8 17 8H15C14.4477 8 14 7.55228 14 7C14 6.44772 14.4477 6 15 6H17Z" clipRule="evenodd"></path>
    <path fill="#1E93FF" fillRule="evenodd" d="M5 12C5 11.4477 5.44772 11 6 11L18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13L6 13C5.44772 13 5 12.5523 5 12Z" clipRule="evenodd"></path>
  </svg>
);

const SECTION_META = {
  work: {
    header: 'Selected Work',
    allLabel: 'All recent showcase work',
  },
  leadership: {
    header: 'Leadership',
    allLabel: 'All leadership',
  },
};

export function NavPopup({ type, items, onNavigateToSection, onItemClick, onClose }: NavPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const meta = SECTION_META[type];

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="absolute bottom-[calc(100%+16px)] left-0 right-0 bg-white rounded-[12px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] overflow-hidden z-50"
    >
      {/* Section header */}
      <div className="px-[18px] pt-[16px] pb-[4px]">
        <p className="text-[#667085] text-[12px] leading-[20px] font-medium" style={{ fontFamily: 'Gilmer, sans-serif' }}>
          {meta.header}
        </p>
      </div>

      {/* "All" first item */}
      <button
        onClick={() => { onNavigateToSection(); onClose(); }}
        className="w-full flex items-center gap-[8px] px-[18px] py-[8px] hover:bg-[#f9fafb] transition-colors text-left"
      >
        <div className="shrink-0 size-[18px]">
          {type === 'work' ? <WorkIcon size={18} /> : <LeadershipIcon size={18} />}
        </div>
        <span className="text-[#101828] text-[14px] leading-[20px]" style={{ fontFamily: 'Gilmer, sans-serif' }}>
          {meta.allLabel}
        </span>
      </button>

      {/* Divider */}
      <div className="mx-[18px] my-[4px] h-px bg-[#f2f4f7]" />

      {/* Individual items */}
      <div className="pb-[8px]">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => { onItemClick(item.id); onClose(); }}
            className="w-full flex items-center gap-[8px] px-[18px] py-[8px] hover:bg-[#f9fafb] transition-colors text-left"
          >
            {/* Custom file or link icon */}
            <div className="shrink-0 size-[18px]">
              {type === 'work' ? <CaseStudiesIcon size={18} /> : <LeadershipLinksIcon size={18} />}
            </div>
            <span
              className="text-[#101828] text-[14px] leading-[20px] truncate flex-1 min-w-0"
              style={{ fontFamily: 'Gilmer, sans-serif' }}
            >
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
