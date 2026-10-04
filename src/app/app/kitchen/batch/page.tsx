"use client";

import { useMemo } from "react";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { KITCHEN_TABS } from "@/components/app/role-tabs";
import { KITCHEN_TICKETS } from "@/components/app/demo-data";

export default function KitchenBatchScreen() {
  const openTickets = useMemo(
    () => KITCHEN_TICKETS.filter((t) => t.status === "PENDING" || t.status === "PREPPING"),
    []
  );

  const totals = useMemo(
    () => ({
      chicken: openTickets.reduce((sum, t) => sum + t.chickenG, 0) / 1000,
      veggie: openTickets.reduce((sum, t) => sum + t.veggieG, 0) / 1000,
      rice: openTickets.reduce((sum, t) => sum + t.riceG, 0) / 1000,
    }),
    [openTickets]
  );

  const byPlan = useMemo(() => {
    const map = new Map<string, { count: number; chicken: number; veggie: number; rice: number }>();
    for (const t of openTickets) {
      const entry = map.get(t.planName) ?? { count: 0, chicken: 0, veggie: 0, rice: 0 };
      entry.count += 1;
      entry.chicken += t.chickenG;
      entry.veggie += t.veggieG;
      entry.rice += t.riceG;
      map.set(t.planName, entry);
    }
    return Array.from(map.entries());
  }, [openTickets]);

  return (
    <RoleTabShell title="Daily batch" subtitle="Ingredients needed for today" tabs={KITCHEN_TABS}>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-paw-green p-4 text-white shadow-soft">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-paw-green-light">Chicken</p>
            <p className="font-display text-lg">{totals.chicken.toFixed(1)}kg</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-paw-green-light">Veggies</p>
            <p className="font-display text-lg">{totals.veggie.toFixed(1)}kg</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-paw-green-light">Rice</p>
            <p className="font-display text-lg">{totals.rice.toFixed(1)}kg</p>
          </div>
          <p className="col-span-3 text-[11px] text-paw-green-light">
            Across {openTickets.length} open orders (pending + prepping)
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-bark">Breakdown by plan</p>
          {byPlan.map(([plan, entry]) => (
            <div key={plan} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-bark">{plan}</span>
                <span className="text-xs text-bark-soft">
                  {entry.count} order{entry.count > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-bark-soft">
                <div className="rounded-lg bg-cream-dark/40 py-2">
                  <p className="font-bold text-bark">{(entry.chicken / 1000).toFixed(1)}kg</p>
                  <p>Chicken</p>
                </div>
                <div className="rounded-lg bg-cream-dark/40 py-2">
                  <p className="font-bold text-bark">{(entry.veggie / 1000).toFixed(1)}kg</p>
                  <p>Veggies</p>
                </div>
                <div className="rounded-lg bg-cream-dark/40 py-2">
                  <p className="font-bold text-bark">{(entry.rice / 1000).toFixed(1)}kg</p>
                  <p>Rice</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleTabShell>
  );
}
