"use client";

import Link from "next/link";

import { AdminShell } from "@/components/app/AdminShell";
import { StatusPill } from "@/components/app/StatusPill";
import { ADMIN_ANALYTICS, ADMIN_CLIENTS, KITCHEN_TICKETS, RAW_INVENTORY } from "@/components/app/demo-data";

export default function AdminOverviewScreen() {
  const { todayRevenue, revenueChangePct, activeOrders, activeSubscriptions, revenueLast7Days } =
    ADMIN_ANALYTICS;
  const maxRevenue = Math.max(...revenueLast7Days);

  const recentTickets = KITCHEN_TICKETS.slice(0, 3);
  const lowStock = RAW_INVENTORY.filter((item) => item.stockKg < item.reorderThresholdKg);
  const activeClients = ADMIN_CLIENTS.filter((c) => c.status === "active").length;

  return (
    <AdminShell title="Overview" subtitle="Fleet-wide snapshot">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-xs text-bark-soft">Today&apos;s revenue</p>
            <p className="font-display text-2xl text-bark">₹{todayRevenue.toLocaleString("en-IN")}</p>
            <p className="text-xs font-semibold text-paw-green-dark">+{revenueChangePct}% vs yesterday</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-xs text-bark-soft">Active orders</p>
            <p className="font-display text-2xl text-bark">{activeOrders}</p>
            <p className="text-xs text-bark-soft">across all kitchens</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-xs text-bark-soft">Subscriptions</p>
            <p className="font-display text-2xl text-bark">{activeSubscriptions}</p>
            <p className="text-xs text-bark-soft">{activeClients} active clients shown</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-xs text-bark-soft">Low stock items</p>
            <p className="font-display text-2xl text-bark">{lowStock.length}</p>
            <Link href="/app/admin/stock" className="text-xs font-semibold text-paw-orange-dark">
              Review stock →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-bark">Revenue — last 7 days</p>
          <div className="flex h-28 gap-2">
            {revenueLast7Days.map((value, i) => (
              <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
                <div
                  className="w-full rounded-t-md bg-paw-orange"
                  style={{ height: `${(value / maxRevenue) * 100}%` }}
                />
                <span className="text-[9px] text-bark-soft/60">D{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-bark">Recent orders</p>
            <Link href="/app/admin/orders" className="text-xs font-semibold text-paw-orange-dark">
              View all →
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-black/5">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-semibold text-bark">
                    {ticket.petName} · {ticket.clientName}
                  </p>
                  <p className="text-xs text-bark-soft">{ticket.planName}</p>
                </div>
                <StatusPill status={ticket.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-bold text-bark">Need a deeper look?</p>
          </div>
          <p className="text-xs text-bark-soft">
            Use the tabs below for full order history, the client roster, driver fleet performance,
            and raw ingredient stock.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
