"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { TabBar, type TabConfig } from "./TabBar";
import { useAppState } from "./state";

export function RoleTabShell({
  title,
  subtitle,
  tabs,
  children,
}: {
  title: string;
  subtitle?: string;
  tabs: TabConfig[];
  children: ReactNode;
}) {
  const router = useRouter();
  const { signOut } = useAppState();

  const handleSignOut = () => {
    signOut();
    router.replace("/app");
  };

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
        <div>
          <h1 className="font-display text-xl text-bark">{title}</h1>
          {subtitle ? <p className="text-xs text-bark-soft">{subtitle}</p> : null}
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold text-bark-soft hover:bg-black/5"
        >
          Sign out
        </button>
      </div>
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-5 pb-24">{children}</div>
      <TabBar tabs={tabs} />
    </div>
  );
}
