"use client";

import { useState } from "react";

import { Button } from "@/components/app/Button";
import { RoleTabShell } from "@/components/app/RoleTabShell";
import { KITCHEN_TABS } from "@/components/app/role-tabs";
import { RAW_INVENTORY } from "@/components/app/demo-data";

export default function KitchenStockScreen() {
  const [requested, setRequested] = useState<string | null>(null);

  const requestRestock = (itemName: string) => {
    setRequested(itemName);
    setTimeout(() => setRequested(null), 2000);
  };

  return (
    <RoleTabShell title="Stock" subtitle="Raw ingredient levels" tabs={KITCHEN_TABS}>
      <div className="flex flex-col gap-3">
        {requested ? (
          <div className="rounded-xl bg-paw-green-light px-4 py-2.5 text-sm font-semibold text-paw-green-dark">
            Restock requested for {requested} ✓
          </div>
        ) : null}
        {RAW_INVENTORY.map((item) => {
          const low = item.stockKg < item.reorderThresholdKg;
          const pct = Math.min(100, (item.stockKg / (item.reorderThresholdKg * 1.6)) * 100);
          return (
            <div key={item.itemName} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-bark">{item.itemName}</span>
                <span className={low ? "font-bold text-paw-red" : "text-bark-soft"}>
                  {item.stockKg}kg on hand
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/5">
                <div
                  className={`h-1.5 rounded-full ${low ? "bg-paw-red" : "bg-paw-green"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-bark-soft">Reorder threshold: {item.reorderThresholdKg}kg</p>
              {low ? (
                <Button variant="secondary" onClick={() => requestRestock(item.itemName)}>
                  Request restock
                </Button>
              ) : null}
            </div>
          );
        })}
      </div>
    </RoleTabShell>
  );
}
