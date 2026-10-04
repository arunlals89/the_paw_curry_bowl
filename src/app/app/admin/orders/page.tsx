"use client";

import { useMemo, useState } from "react";

import { AdminShell } from "@/components/app/AdminShell";
import { StatusPill } from "@/components/app/StatusPill";
import { SearchIcon } from "@/components/app/icons";
import type { FulfillmentStatus } from "@/components/app/constants";
import { KITCHEN_TICKETS } from "@/components/app/demo-data";

const FILTERS: { label: string; value: FulfillmentStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Prepping", value: "PREPPING" },
  { label: "Out for delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

export default function AdminOrdersScreen() {
  const [filter, setFilter] = useState<FulfillmentStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return KITCHEN_TICKETS.filter((ticket) => {
      const matchesStatus = filter === "all" || ticket.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || ticket.clientName.toLowerCase().includes(q) || ticket.petName.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [filter, query]);

  return (
    <AdminShell title="Orders" subtitle={`${KITCHEN_TICKETS.length} tickets today`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5">
          <SearchIcon size={16} className="text-bark-soft/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search client or pet"
            className="w-full bg-transparent text-sm text-bark placeholder:text-bark-soft/50 focus:outline-none"
          />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === f.value
                  ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                  : "border-black/10 bg-white text-bark-soft"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-bark-soft">No orders match.</p>
          ) : (
            filtered.map((ticket) => (
              <div key={ticket.id} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-bark">
                    {ticket.petName} · {ticket.clientName}
                  </span>
                  <span className="font-mono text-[11px] text-bark-soft/60">{ticket.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-paw-orange-dark">{ticket.planName}</span>
                  <StatusPill status={ticket.status} />
                </div>
                <p className="text-[11px] text-bark-soft">
                  {ticket.chickenG}g chicken · {ticket.veggieG}g veg · {ticket.riceG}g rice
                </p>
                {ticket.exclusions.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {ticket.exclusions.map((item) => (
                      <span
                        key={item}
                        className="allergy-flash rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                      >
                        No {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminShell>
  );
}
