"use client";

import { useMemo } from "react";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { DRIVER_TABS } from "@/components/app/role-tabs";
import { DRIVER_HISTORY } from "@/components/app/demo-data";

export default function DriverHistoryScreen() {
  const grouped = useMemo(() => {
    const map = new Map<string, typeof DRIVER_HISTORY>();
    for (const delivery of DRIVER_HISTORY) {
      const list = map.get(delivery.date) ?? [];
      list.push(delivery);
      map.set(delivery.date, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <RoleTabShell title="Delivery history" subtitle={`${DRIVER_HISTORY.length} completed`} tabs={DRIVER_TABS}>
      <div className="flex flex-col gap-5">
        {grouped.map(([date, deliveries]) => (
          <div key={date} className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-bark-soft/70">{date}</p>
            {deliveries.map((delivery, i) => (
              <div
                key={`${date}-${i}`}
                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-soft"
              >
                <div>
                  <p className="text-sm font-semibold text-bark">{delivery.clientName}</p>
                  <p className="text-xs text-bark-soft">{delivery.petName}</p>
                </div>
                <span className="text-sm font-bold text-paw-green-dark">+₹{delivery.earnings}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </RoleTabShell>
  );
}
