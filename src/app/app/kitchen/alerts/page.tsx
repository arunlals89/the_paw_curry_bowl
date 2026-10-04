"use client";

import { useMemo } from "react";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { StatusPill } from "@/components/app/StatusPill";
import { KITCHEN_TABS } from "@/components/app/role-tabs";
import { KITCHEN_TICKETS } from "@/components/app/demo-data";

export default function KitchenAlertsScreen() {
  const flagged = useMemo(
    () => KITCHEN_TICKETS.filter((t) => t.exclusions.length > 0 && t.status !== "DELIVERED"),
    []
  );

  const allergenCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of flagged) {
      for (const item of t.exclusions) {
        map.set(item, (map.get(item) ?? 0) + 1);
      }
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [flagged]);

  return (
    <RoleTabShell title="Allergy alerts" subtitle={`${flagged.length} tickets need attention`} tabs={KITCHEN_TABS}>
      <div className="flex flex-col gap-5">
        {allergenCounts.length > 0 ? (
          <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-4 shadow-soft">
            {allergenCounts.map(([item, count]) => (
              <span
                key={item}
                className="rounded-full bg-paw-red-light px-3 py-1.5 text-xs font-bold text-paw-red"
              >
                No {item} · {count}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          {flagged.length === 0 ? (
            <p className="py-6 text-center text-sm text-bark-soft">No active orders have exclusions.</p>
          ) : (
            flagged.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col gap-2 rounded-2xl border border-paw-red/20 bg-white p-4 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-bark">
                    {ticket.petName} · {ticket.clientName}
                  </span>
                  <StatusPill status={ticket.status} />
                </div>
                <p className="text-xs text-bark-soft">{ticket.planName} · {ticket.id}</p>
                <div className="flex flex-wrap gap-1">
                  {ticket.exclusions.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-paw-red-light px-2 py-0.5 text-[10px] font-bold uppercase text-paw-red"
                    >
                      No {item}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </RoleTabShell>
  );
}
