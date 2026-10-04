"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";

export type TabConfig = {
  href: string;
  label: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
};

export function TabBar({ tabs }: { tabs: TabConfig[] }) {
  const pathname = usePathname();

  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t border-black/5 bg-white/95 pb-7 pt-2 backdrop-blur">
      {tabs.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-1 text-[10px] font-semibold ${
              active ? "text-paw-orange" : "text-bark-soft/60"
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
