"use client";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { DRIVER_TABS } from "@/components/app/role-tabs";
import { DRIVER_EARNINGS } from "@/components/app/demo-data";

export default function DriverEarningsScreen() {
  const { todayEarnings, todayDeliveries, weekEarnings, weekDeliveries, breakdown, last7DaysEarnings } =
    DRIVER_EARNINGS;
  const maxEarnings = Math.max(...last7DaysEarnings);

  return (
    <RoleTabShell title="Earnings" subtitle="Your payouts" tabs={DRIVER_TABS}>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-paw-orange p-4 text-white shadow-soft">
            <p className="text-xs text-white/80">Today</p>
            <p className="font-display text-2xl">₹{todayEarnings}</p>
            <p className="text-xs text-white/80">{todayDeliveries} deliveries</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-xs text-bark-soft">This week</p>
            <p className="font-display text-2xl text-bark">₹{weekEarnings}</p>
            <p className="text-xs text-bark-soft">{weekDeliveries} deliveries</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-bark">Last 7 days</p>
          <div className="flex h-24 gap-2">
            {last7DaysEarnings.map((value, i) => (
              <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
                <div
                  className="w-full rounded-t-md bg-paw-orange"
                  style={{ height: `${(value / maxEarnings) * 100}%` }}
                />
                <span className="text-[9px] text-bark-soft/60">D{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-bark">This week&apos;s breakdown</p>
          <div className="flex flex-col divide-y divide-black/5">
            {breakdown.map((line) => (
              <div key={line.label} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-bark-soft">{line.label}</span>
                <span className="font-bold text-bark">₹{line.amount}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5 text-sm">
              <span className="font-bold text-bark">Total</span>
              <span className="font-bold text-paw-orange-dark">₹{weekEarnings}</span>
            </div>
          </div>
        </div>
      </div>
    </RoleTabShell>
  );
}
