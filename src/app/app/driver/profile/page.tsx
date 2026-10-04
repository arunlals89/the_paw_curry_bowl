"use client";

import { useState } from "react";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { PhoneIcon, TruckIcon } from "@/components/app/icons";
import { DRIVER_TABS } from "@/components/app/role-tabs";
import { DRIVER_PROFILE } from "@/components/app/demo-data";

export default function DriverProfileScreen() {
  const [onShift, setOnShift] = useState(true);

  return (
    <RoleTabShell title="Profile" tabs={DRIVER_TABS}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-soft">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paw-green-light text-paw-green-dark">
            <TruckIcon size={30} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-bark">{DRIVER_PROFILE.name}</p>
            <p className="text-sm text-bark-soft">★ {DRIVER_PROFILE.rating} rating</p>
          </div>
        </div>

        <button
          onClick={() => setOnShift((v) => !v)}
          className={`flex items-center justify-between rounded-2xl p-4 shadow-soft transition ${
            onShift ? "bg-paw-green text-white" : "bg-white text-bark"
          }`}
        >
          <span className="text-sm font-bold">{onShift ? "On shift" : "Off shift"}</span>
          <span
            className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
              onShift ? "justify-end bg-white/30" : "justify-start bg-black/10"
            }`}
          >
            <span className={`h-5 w-5 rounded-full ${onShift ? "bg-white" : "bg-bark-soft"}`} />
          </span>
        </button>

        <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between text-sm">
            <span className="text-bark-soft">Vehicle</span>
            <span className="font-semibold text-bark">
              {DRIVER_PROFILE.vehicle} · {DRIVER_PROFILE.vehicleType}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-bark-soft">
              <PhoneIcon size={14} /> Phone
            </span>
            <span className="font-semibold text-bark">{DRIVER_PROFILE.phone}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-bark-soft">Deliveries completed</span>
            <span className="font-semibold text-bark">{DRIVER_PROFILE.deliveriesCompleted}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-bark-soft">Driving since</span>
            <span className="font-semibold text-bark">{DRIVER_PROFILE.joinedMonthsAgo} months ago</span>
          </div>
        </div>
      </div>
    </RoleTabShell>
  );
}
