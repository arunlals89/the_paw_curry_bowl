"use client";

import type { ReactNode } from "react";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pb-1 pt-3 text-[13px] font-semibold text-bark">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="15" y="0.5" width="3" height="11.5" rx="0.5" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 2.5C5.5 2.5 3.3 3.5 1.5 5.2L0 3.6C2.2 1.4 5 0 8 0C11 0 13.8 1.4 16 3.6L14.5 5.2C12.7 3.5 10.5 2.5 8 2.5Z"
            fill="currentColor"
          />
          <circle cx="8" cy="9.5" r="2" fill="currentColor" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" />
          <rect x="2" y="2" width="15" height="8" rx="1" fill="currentColor" />
          <rect x="21.5" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-cream sm:bg-[radial-gradient(circle_at_top,#f4ece0,#e9ddc9)] sm:py-12">
      <div className="relative h-screen w-screen sm:h-auto sm:w-auto">
        {/* bezel — only decorative at sm+; full-bleed on an actual phone viewport */}
        <div className="relative h-full w-full overflow-hidden bg-cream sm:h-[844px] sm:w-[390px] sm:rounded-[56px] sm:bg-bark sm:p-[14px] sm:shadow-[0_40px_80px_-20px_rgba(43,33,26,0.45)]">
          <div className="relative h-full w-full overflow-hidden bg-cream sm:rounded-[42px]">
            {/* notch */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-30 hidden h-7 w-36 -translate-x-1/2 rounded-b-2xl bg-bark sm:block" />
            <div className="flex h-full flex-col overflow-hidden">
              <StatusBar />
              <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
            </div>
            {/* home indicator */}
            <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 hidden h-1.5 w-32 -translate-x-1/2 rounded-full bg-bark/80 sm:block" />
          </div>
        </div>
      </div>
    </div>
  );
}
