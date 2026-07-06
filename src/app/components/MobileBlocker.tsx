import { useState, useEffect } from 'react';

interface MobileBlockerProps {
  children: React.ReactNode;
}

export function MobileBlocker({ children }: MobileBlockerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 || 
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center px-8">
          <svg
            className="mx-auto mb-6 text-gray-400"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Desktop Only
          </h1>
          <p className="text-gray-600 max-w-md">
            For the best experience, please view this portfolio on desktop.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
