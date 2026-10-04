"use client";

import { RoleScreen } from "@/components/app/RoleScreen";
import { ADMIN_ANALYTICS, ADMIN_CLIENTS } from "@/components/app/demo-data";

export default function AdminDashboard() {
  const { todayRevenue, revenueChangePct, activeOrders, activeSubscriptions, driverPerformance, revenueLast7Days } =
    ADMIN_ANALYTICS;
  const maxRevenue = Math.max(...revenueLast7Days);

  return (
    <RoleScreen title="Overview" subtitle="Fleet-wide analytics">
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
          <div className="col-span-2 rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-xs text-bark-soft">Active subscriptions</p>
            <p className="font-display text-2xl text-bark">{activeSubscriptions}</p>
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
          <p className="mb-3 text-sm font-bold text-bark">Driver performance</p>
          <div className="flex flex-col gap-3">
            {driverPerformance.map((driver) => (
              <div key={driver.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-bark">{driver.name}</span>
                  <span className="text-bark-soft">{driver.onTimePct}% on-time</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black/5">
                  <div
                    className="h-1.5 rounded-full bg-paw-green"
                    style={{ width: `${driver.onTimePct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-bark">Clients</p>
          <div className="flex flex-col divide-y divide-black/5">
            {ADMIN_CLIENTS.map((client) => (
              <div key={client.name} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-semibold text-bark">{client.name}</p>
                  <p className="text-xs text-bark-soft">
                    {client.pets} pet{client.pets > 1 ? "s" : ""} · {client.plan}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                    client.status === "active"
                      ? "bg-paw-green-light text-paw-green-dark"
                      : "bg-black/5 text-bark-soft"
                  }`}
                >
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleScreen>
  );
}
