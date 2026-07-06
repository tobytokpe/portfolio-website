import { motion } from 'motion/react';
import { useState } from 'react';
import imgProfile from '../../imports/Frame1618869041/f3f35b7a6790541de22042d57017d5ec284cae1b.png';
import { NavPopup } from './NavPopup';

export const HomeIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" id="home" className="block size-full">
    <path fill="#C4E6FF" fillRule="evenodd" d="M18 18C18 18.5523 17.5523 19 17 19H16V21H8V19H1V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V9.60005C23 8.62111 22.5224 7.70373 21.7204 7.14235L18 4.54004V18Z" clipRule="evenodd"></path>
    <path fill="#024493" fillRule="evenodd" d="M12 1C11.3985 1 10.796 1.18081 10.2796 1.5423L2.27961 7.1423C1.47764 7.70369 1 8.62106 1 9.6V20C1 21.6568 2.34315 23 4 23H20C21.6569 23 23 21.6568 23 20V9.6C23 8.62106 22.5224 7.70369 21.7204 7.1423L13.7204 1.5423C13.204 1.18081 12.6015 1 12 1ZM21 9.6C21 9.27369 20.8408 8.9679 20.5735 8.78077L12.5735 3.18077C12.4012 3.06021 12.2011 3 12 3C11.7989 3 11.5988 3.06021 11.4265 3.18077L3.42654 8.78077C3.15921 8.9679 3 9.27369 3 9.6V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V9.6Z" clipRule="evenodd"></path>
    <path fill="#1E93FF" fillRule="evenodd" d="M8 17C8 15.3431 9.34315 14 11 14H13C14.6569 14 16 15.3431 16 17V22C16 22.5523 15.5523 23 15 23H9C8.44772 23 8 22.5523 8 22V17ZM11 16C10.4477 16 10 16.4477 10 17V21H14V17C14 16.4477 13.5523 16 13 16H11Z" clipRule="evenodd"></path>
  </svg>
);

export const AboutIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" id="user" className="block size-full">
    <path fill="#C4E6FF" fillRule="evenodd" d="M3 20C3 16.8289 5.10851 14.1503 8 13.2898V18C8 18.5522 8.44772 19 9 19C11.1785 19 20.9291 19 20.9291 19C20.9758 19.3266 21 19.6604 21 20C21 21.6568 19.6569 23 18 23H6C4.34315 23 3 21.6568 3 20Z" clipRule="evenodd"></path>
    <path fill="#1E93FF" fillRule="evenodd" d="M12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6Z" clipRule="evenodd"></path>
    <path fill="#024493" fillRule="evenodd" d="M3 20C3 16.134 6.13401 13 10 13H14C17.866 13 21 16.134 21 20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20ZM10 15C7.23858 15 5 17.2386 5 20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20C19 17.2386 16.7614 15 14 15H10Z" clipRule="evenodd"></path>
  </svg>
);

export const WorkIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" id="folder-open" className="block size-full">
    <path fill="#C4E6FF" d="M1 18H17C17.5523 18 18 17.5523 18 17V8H20.0001C21.6476 8 22.9849 9.32794 23 10.9718V19C23 20.5533 21.8195 21.8309 20.3067 21.9845C20.2122 21.9941 20.1163 21.9993 20.0194 21.9999C20.0129 22 20.0065 22 20 22H4.00002C2.34316 22 1 20.6569 1 19V18Z"></path>
    <path fill="#024493" fillRule="evenodd" d="M4 3C3.44772 3 3 3.44772 3 4V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V7C21 6.44772 20.5523 6 20 6H12C11.7348 6 11.4804 5.89464 11.2929 5.70711L8.87868 3.29289C8.69114 3.10536 8.43679 3 8.17157 3H4ZM1 4C1 2.34315 2.34315 1 4 1H8.17157C8.96722 1 9.73028 1.31607 10.2929 1.87868L12.4142 4H20C21.6569 4 23 5.34315 23 7V19C23 20.6569 21.6569 22 20 22H4C2.34315 22 1 20.6569 1 19V4Z" clipRule="evenodd"></path>
    <path fill="#1E93FF" fillRule="evenodd" d="M10.1487 8C9.08175 8 8.09505 8.56672 7.55742 9.48837L1.8007 19.3568C1.47149 19.9212 1.40751 20.6452 1.86699 21.1097C2.41078 21.6594 3.16556 22 3.99989 22H20C21.6569 22 23 20.6569 23 19V11C23 9.34315 21.6569 8 20 8H10.1487ZM9.28497 10.4961C9.46418 10.1889 9.79307 10 10.1487 10H20C20.5523 10 21 10.4477 21 11V19C21 19.5523 20.5523 20 20 20H4.08915C3.93479 20 3.83862 19.8326 3.9164 19.6992L9.28497 10.4961Z" clipRule="evenodd"></path>
  </svg>
);

export const LeadershipIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" id="book-open" className="block size-full">
    <path fill="#C4E6FF" fillRule="evenodd" d="M12 3.64372C13.1778 2.65164 14.5407 1.91741 16 1.47778V20.5663C14.8014 21.0129 13.7001 21.7142 12.7782 22.6361L12.7123 22.7019C12.6714 22.7435 12.6266 22.7817 12.5784 22.8158C12.5584 22.83 12.5377 22.8436 12.5165 22.8563C12.4519 22.8953 12.3836 22.9266 12.3128 22.9499C12.1066 23.0178 11.8873 23.0157 11.6872 22.9499C11.6106 22.9246 11.5368 22.8901 11.4676 22.8466C11.4454 22.8326 11.4236 22.8177 11.4024 22.8018C11.3615 22.7713 11.3231 22.7379 11.2877 22.7019L11.2218 22.6361C11.149 22.5632 11.075 22.4918 11 22.4217V2.8924C11.3458 3.12329 11.6798 3.37397 12 3.64372Z" clipRule="evenodd"></path>
    <path fill="#024493" fillRule="evenodd" d="M12 3.6437C14.0191 1.94293 16.5823 1 19.2426 1H20C21.6569 1 23 2.34315 23 4V19C23 19.5523 22.5523 20 22 20H19.1421C16.7552 20 14.466 20.9482 12.7782 22.636L12.7123 22.7019C12.6714 22.7435 12.6266 22.7816 12.5784 22.8158C12.5584 22.83 12.5377 22.8435 12.5165 22.8563C12.4519 22.8953 12.3836 22.9265 12.3128 22.9498C12.1066 23.0178 11.8873 23.0157 11.6872 22.9498C11.6106 22.9246 11.5368 22.8901 11.4676 22.8466C11.4454 22.8326 11.4236 22.8177 11.4024 22.8018C11.3615 22.7713 11.3231 22.7379 11.2877 22.7019L11.2218 22.636C9.534 20.9482 7.24481 20 4.85786 20H2C1.44771 20 1 19.5523 1 19V4C1 2.34315 2.34315 1 4 1H4.75736C7.41773 1 9.98088 1.94293 12 3.6437ZM11 19.8745V5.42678C9.29946 3.86914 7.07321 3 4.75736 3H4C3.44771 3 3 3.44772 3 4V18H4.85786C7.06191 18 9.19776 18.6615 11 19.8745ZM13 19.8745C14.8022 18.6615 16.9381 18 19.1421 18H21V4C21 3.44772 20.5523 3 20 3H19.2426C16.9268 3 14.7005 3.86914 13 5.42678V19.8745Z" clipRule="evenodd"></path>
    <path fill="#1E93FF" fillRule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V5C11 4.44772 11.4477 4 12 4Z" clipRule="evenodd"></path>
  </svg>
);

export const ContactIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" id="at-sign" className="block size-full">
    <path fill="#C4E6FF" fillRule="evenodd" d="M12 17.9999C15.3137 17.9999 18 15.3136 18 11.9999V2.77881C21.0102 4.74151 23 8.13832 23 11.9999C23 18.075 18.0751 22.9999 12 22.9999C8.13845 22.9999 4.74163 21.0101 2.77893 17.9999H12Z" clipRule="evenodd"></path>
    <path fill="#024493" d="M14.0958 1.20151C11.5889 0.71497 8.99077 1.11582 6.74707 2.33531C4.50336 3.5548 2.75386 5.51694 1.7986 7.88524C0.843338 10.2535 0.741837 12.8804 1.51151 15.3154C2.28118 17.7503 3.87406 19.8416 6.01697 21.2306C8.15988 22.6196 10.7193 23.2197 13.2563 22.928C15.7619 22.64 18.0914 21.4998 19.8556 19.7C20.2422 19.3056 20.2358 18.6725 19.8414 18.2859C19.447 17.8993 18.8139 17.9056 18.4273 18.3C16.9839 19.7726 15.0779 20.9411 13.0279 20.9411C10.9522 21.1798 8.85809 20.6887 7.10479 19.5523C5.3515 18.4159 4.04824 16.7048 3.41851 14.7126C2.78878 12.7203 2.87182 10.5711 3.6534 8.63338C4.43498 6.69568 5.86639 5.09029 7.70215 4.09253C9.5379 3.09476 11.6636 2.7668 13.7147 3.16488C15.7658 3.56296 17.6145 4.66228 18.9438 6.27431C20.273 7.88634 21 9.91063 21 12C21 12.2627 20.8478 12.7654C20.7473 13.008 20.5999 13.2285 20.4142 13.4142C20.2285 13.5999 20.008 13.7473 19.7654 13.8478C19.5227 13.9483 19.2626 14 19 14C18.7374 14 18.4773 13.9483 18.2346 13.8478C17.992 13.7473 17.7715 13.5999 17.5858 13.4142C17.4001 13.2285 17.2528 13.008 17.1522 12.7654C17.0517 12.5227 17 12.2627 17 12V8C17 7.44772 16.5523 7 16 7C15.4477 7 15 7.44772 15 8L15 12C15 12.5253 15.1035 13.0454 15.3045 13.5308C15.5055 14.0161 15.8001 14.457 16.1716 14.8284C16.543 15.1999 16.984 15.4945 17.4693 15.6955C17.9546 15.8966 18.4747 16 19 16C19.5253 16 20.0454 15.8966 20.5307 15.6955C21.016 15.4945 21.457 15.1999 21.8284 14.8284C22.1999 14.457 22.4945 14.0161 22.6955 13.5308C22.8965 13.0455 23 12.5253 23 12C23 9.44632 22.1115 6.97219 20.4869 5.00193C18.8622 3.03167 16.6027 1.68806 14.0958 1.20151Z" />
    <path fill="#1E93FF" fillRule="evenodd" d="M15 7.99963C14.1643 7.37195 13.1256 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C13.7241 17 15.2443 16.1274 16.1432 14.7998L16.1716 14.8284C16.2241 14.881 16.2781 14.932 16.3333 14.9814C16.745 15.3496 17.3772 15.3144 17.7454 14.9027C18.1135 14.4911 18.0783 13.8589 17.6667 13.4907C17.639 13.466 17.6121 13.4405 17.5858 13.4142C17.4001 13.2285 17.2528 13.008 17.1522 12.7654C17.0517 12.5227 17 12.2626 17 12V8C17 7.44772 16.5523 7 16 7C15.4478 7 15.0002 7.44752 15 7.99963ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" clipRule="evenodd"></path>
  </svg>
);

interface NavItem {
  id: string;
  title: string;
}

interface NavigationProps {
  sections: { id: string; name: string }[];
  onNavigate: (id: string) => void;
  onZoomToFit: () => void;
  onReset: () => void;
  currentZoom: number;
  projects: NavItem[];
  leadership: NavItem[];
  onProjectOpen: (id: string) => void;
  onLeadershipOpen: (id: string) => void;
}

const ICON_BUTTONS = [
  { id: 'hero',       label: 'Home',       popup: null        },
  { id: 'about',      label: 'About',      popup: null        },
  { id: 'work',       label: 'Work',       popup: 'work'      },
  { id: 'leadership', label: 'Leadership', popup: 'leadership'},
  { id: 'contact',    label: 'Contact',    popup: null        },
] as const;

export function Navigation({
  onNavigate,
  projects,
  leadership,
  onProjectOpen,
  onLeadershipOpen,
}: NavigationProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [openPopup, setOpenPopup] = useState<'work' | 'leadership' | null>(null);

  function handleIconClick(id: string, popup: 'work' | 'leadership' | null) {
    if (popup) {
      setOpenPopup((prev) => (prev === popup ? null : popup));
    } else {
      setOpenPopup(null);
      onNavigate(id);
    }
  }

  return (
    <motion.div
      className="fixed bottom-5 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Wrapper gives the popup a reference width equal to the nav pill */}
      <div className="relative pointer-events-auto">

        {/* Work popup */}
        {openPopup === 'work' && (
          <NavPopup
            type="work"
            items={projects}
            onNavigateToSection={() => { onNavigate('work'); }}
            onItemClick={(id) => { onProjectOpen(id); }}
            onClose={() => setOpenPopup(null)}
          />
        )}

        {/* Leadership popup */}
        {openPopup === 'leadership' && (
          <NavPopup
            type="leadership"
            items={leadership}
            onNavigateToSection={() => { onNavigate('leadership'); }}
            onItemClick={(id) => { onLeadershipOpen(id); }}
            onClose={() => setOpenPopup(null)}
          />
        )}

        {/* Nav pill */}
        <div className="bg-white flex gap-4 sm:gap-[24px] items-center px-4 py-3 sm:px-[20px] sm:py-[16px] rounded-[16px] drop-shadow-[0px_2.154px_2.154px_rgba(0,0,0,0.1)] max-w-[calc(100vw-24px)]">
          {/* Profile block */}
          <div className="flex gap-0 sm:gap-[16px] items-center shrink-0">
            <div className="relative rounded-full shrink-0 size-[38px]">
              <img
                alt="Profile Avatar"
                className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-full size-full"
                src={imgProfile}
              />
            </div>
            <p className="hidden sm:block font-['Montserrat',sans-serif] font-medium leading-none text-black text-[16px] whitespace-nowrap">
              Tobi Olowu
            </p>
            <div className="hidden sm:flex bg-white items-center justify-center pl-[6px] pr-[8px] py-[3px] rounded-[8px] shrink-0 border border-[#d0d5dd]">
              <div className="flex gap-[4px] items-center">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="3" cy="3" r="3" fill="#12B76A" />
                </svg>
                <p className="font-['Gilmer',sans-serif] leading-[18px] text-[#344054] text-[12px] text-center whitespace-nowrap">
                  Portfolio
                </p>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="flex h-[32px] items-center justify-center shrink-0 w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[32px]">
                <div className="absolute inset-[-2px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 2">
                    <line stroke="#C1C1C1" strokeWidth="2" x2="32" y1="1" y2="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Icon buttons */}
          {ICON_BUTTONS.map((icon) => {
            const isActive = openPopup === icon.popup && icon.popup !== null;
            return (
              <div key={icon.id} className="relative flex items-center">
                <button
                  onClick={() => handleIconClick(icon.id, icon.popup)}
                  onMouseEnter={() => setHoveredIcon(icon.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className={`relative shrink-0 size-[24px] rounded-md transition-all duration-150 ${
                    isActive ? 'bg-gray-100' : 'hover:bg-gray-100 active:bg-gray-200'
                  }`}
                >
                  {icon.id === 'hero' ? <HomeIcon size={24} /> :
                   icon.id === 'about' ? <AboutIcon size={24} /> :
                   icon.id === 'work' ? <WorkIcon size={24} /> :
                   icon.id === 'leadership' ? <LeadershipIcon size={24} /> :
                   <ContactIcon size={24} />}
                </button>
                {hoveredIcon === icon.id && !isActive && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] bg-gray-800 text-white px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none z-10">
                    {icon.label}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-800 rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
