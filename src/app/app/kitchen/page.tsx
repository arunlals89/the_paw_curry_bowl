"use client";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { StatusPill } from "@/components/app/StatusPill";
import { KITCHEN_TABS } from "@/components/app/role-tabs";
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
              className="allergy-flash rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
            >
              No {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function KitchenBoardScreen() {
  return (
    <RoleTabShell title="Kitchen board" subtitle="Today's production" tabs={KITCHEN_TABS}>
      <div className="flex flex-col gap-5">
        {COLUMNS.map((column) => {
          const columnTickets = KITCHEN_TICKETS.filter((t) => t.status === column.status);
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
    </RoleTabShell>
  );
}
