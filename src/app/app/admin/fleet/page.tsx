"use client";

import { AdminShell } from "@/components/app/AdminShell";
import { PhoneIcon, TruckIcon } from "@/components/app/icons";
import { ADMIN_DRIVERS, DRIVER_STOPS } from "@/components/app/demo-data";

export default function AdminFleetScreen() {
  const deliveredToday = DRIVER_STOPS.filter((s) => s.status === "DELIVERED").length;

  return (
    <AdminShell title="Fleet" subtitle={`${ADMIN_DRIVERS.length} drivers on shift`}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-xs text-bark-soft">Stops today</p>
            <p className="font-display text-2xl text-bark">{DRIVER_STOPS.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-xs text-bark-soft">Delivered</p>
            <p className="font-display text-2xl text-bark">
              {deliveredToday}/{DRIVER_STOPS.length}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {ADMIN_DRIVERS.map((driver) => (
            <div key={driver.name} className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paw-green-light text-paw-green-dark">
                  <TruckIcon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-bark">{driver.name}</p>
                  <p className="text-xs text-bark-soft">{driver.vehicle}</p>
                </div>
                <span className="text-sm font-bold text-paw-green-dark">{driver.onTimePct}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/5">
                <div
                  className="h-1.5 rounded-full bg-paw-green"
                  style={{ width: `${driver.onTimePct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-bark-soft">
                <span className="flex items-center gap-1.5">
                  <PhoneIcon size={13} /> {driver.phone}
                </span>
                <span>{driver.stopsToday} stops today</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-bark">Today&apos;s stop list</p>
          <div className="flex flex-col divide-y divide-black/5">
            {DRIVER_STOPS.map((stop) => (
              <div key={stop.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-semibold text-bark">
                    {stop.clientName} · {stop.petName}
                  </p>
                  <p className="text-xs text-bark-soft">{stop.address}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                    stop.status === "DELIVERED"
                      ? "bg-paw-green-light text-paw-green-dark"
                      : stop.status === "OUT_FOR_DELIVERY"
                        ? "bg-paw-blue-light text-paw-blue"
                        : "bg-black/5 text-bark-soft"
                  }`}
                >
                  {stop.status === "OUT_FOR_DELIVERY" ? "En route" : stop.status === "DELIVERED" ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
