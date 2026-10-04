"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { BottomTabBar } from "./BottomTabBar";
import { ArrowLeftIcon } from "./icons";

export function TabScreen({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-24">{children}</div>
      <BottomTabBar />
    </div>
  );
}

export function Screen({
  children,
  title,
  onBack,
}: {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col">
      {title || onBack ? (
        <div className="flex items-center gap-3 border-b border-black/5 px-5 py-3">
          <button
            onClick={() => (onBack ? onBack() : router.back())}
            className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-full text-bark hover:bg-black/5"
            aria-label="Go back"
          >
            <ArrowLeftIcon size={20} />
          </button>
          {title ? <h1 className="text-[17px] font-bold text-bark">{title}</h1> : null}
        </div>
      ) : null}
      <div className="no-scrollbar flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
