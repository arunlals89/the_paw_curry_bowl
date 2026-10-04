"use client";

import { useMemo, useState } from "react";

import { RoleScreen } from "@/components/app/RoleScreen";
import { StatusPill } from "@/components/app/StatusPill";
import type { FulfillmentStatus } from "@/components/app/constants";
import { KITCHEN_TICKETS, type KitchenTicket } from "@/components/app/demo-data";

const COLUMNS: { status: FulfillmentStatus; label: string }[] = [
  { status: "PENDING", label: "Pending" },
  { status: "PREPPING", label: "Prepping" },
  { status: "OUT_FOR_DELIVERY", label: "Out for delivery" },
  { status: "DELIVERED", label: "Delivered" },
];

function TicketCard({ ticket }: { ticket: KitchenTicket }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white p-3 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-bark">{ticket.petName}</span>
        <span className="text-[11px] font-mono text-bark-soft/60">{ticket.id}</span>
      </div>
      <p className="text-xs text-bark-soft">{ticket.clientName}</p>
      <p className="text-xs font-semibold text-paw-orange-dark">{ticket.planName}</p>
      <p className="text-[11px] text-bark-soft">
        {ticket.chickenG}g chicken · {ticket.veggieG}g veg · {ticket.riceG}g rice
      </p>
      {ticket.exclusions.length > 0 ? (
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
      ) : null}
    </div>
  );
}

export default function KitchenDashboard() {
  const [tickets] = useState(KITCHEN_TICKETS);

  const batch = useMemo(() => {
    const active = tickets.filter((t) => t.status === "PENDING" || t.status === "PREPPING");
    return {
      chicken: active.reduce((sum, t) => sum + t.chickenG, 0) / 1000,
      veggie: active.reduce((sum, t) => sum + t.veggieG, 0) / 1000,
      rice: active.reduce((sum, t) => sum + t.riceG, 0) / 1000,
      orders: active.length,
    };
  }, [tickets]);

  return (
    <RoleScreen title="Kitchen" subtitle="Today's production board">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-paw-green p-4 text-white shadow-soft">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-paw-green-light">Chicken</p>
            <p className="font-display text-lg">{batch.chicken.toFixed(1)}kg</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-paw-green-light">Veggies</p>
            <p className="font-display text-lg">{batch.veggie.toFixed(1)}kg</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-paw-green-light">Rice</p>
            <p className="font-display text-lg">{batch.rice.toFixed(1)}kg</p>
          </div>
          <p className="col-span-3 text-[11px] text-paw-green-light">
            Needed across {batch.orders} open orders today
          </p>
        </div>

        {COLUMNS.map((column) => {
          const columnTickets = tickets.filter((t) => t.status === column.status);
          return (
            <div key={column.status} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-bark">{column.label}</h2>
                <StatusPill status={column.status} />
              </div>
              <div className="flex flex-col gap-2">
                {columnTickets.length === 0 ? (
                  <p className="text-xs text-bark-soft/60">No tickets</p>
                ) : (
                  columnTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </RoleScreen>
  );
}
