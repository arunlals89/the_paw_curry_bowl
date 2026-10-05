"use client";

import { InventoryStockPanel } from "@/components/app/InventoryStockPanel";
import { RoleTabShell } from "@/components/app/RoleTabShell";
import { KITCHEN_TABS } from "@/components/app/role-tabs";

export default function KitchenStockScreen() {
  return (
    <RoleTabShell title="Stock" subtitle="Raw ingredient levels" tabs={KITCHEN_TABS}>
      <InventoryStockPanel />
    </RoleTabShell>
  );
}
