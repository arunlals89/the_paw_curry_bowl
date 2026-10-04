"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CalendarIcon, HomeIcon, UserIcon } from "./icons";

const TABS = [
  { href: "/app/home", label: "Home", Icon: HomeIcon },
  { href: "/app/plans", label: "Plan", Icon: CalendarIcon },
  { href: "/app/account", label: "Account", Icon: UserIcon },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t border-black/5 bg-white/95 pb-7 pt-2.5 backdrop-blur">
      {TABS.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-1 text-[11px] font-semibold ${
              active ? "text-paw-orange" : "text-bark-soft/60"
            }`}
          >
            <Icon size={22} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
