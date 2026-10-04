"use client";

import type { ReactNode } from "react";

import { RoleTabShell } from "./RoleTabShell";
import { ADMIN_TABS } from "./role-tabs";

export function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <RoleTabShell title={title} subtitle={subtitle} tabs={ADMIN_TABS}>
      {children}
    </RoleTabShell>
  );
}
