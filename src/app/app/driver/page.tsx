"use client";

import { useState } from "react";

import { Button } from "@/components/app/Button";
import { RoleScreen } from "@/components/app/RoleScreen";
import { StatusPill } from "@/components/app/StatusPill";
import { DRIVER_STOPS } from "@/components/app/demo-data";
import type { FulfillmentStatus } from "@/components/app/constants";

export default function DriverDashboard() {
  const [stops, setStops] = useState(DRIVER_STOPS);

  const advance = (id: string) => {
    setStops((prev) =>
      prev.map((stop) => {
        if (stop.id !== id) return stop;
        const next: Record<FulfillmentStatus, FulfillmentStatus> = {
          PENDING: "OUT_FOR_DELIVERY",
          OUT_FOR_DELIVERY: "DELIVERED",
          PREPPING: "OUT_FOR_DELIVERY",
          DELIVERED: "DELIVERED",
        };
        return { ...stop, status: next[stop.status] };
      })
    );
  };

  const remaining = stops.filter((s) => s.status !== "DELIVERED").length;

  return (
    <RoleScreen title="Today's route" subtitle={`${remaining} stops remaining`}>
      <div className="flex flex-col gap-3">
        {stops.map((stop) => (
          <div key={stop.id} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paw-orange-light text-xs font-bold text-paw-orange-dark">
                  {stop.sequence}
                </span>
                <div>
                  <p className="text-sm font-bold text-bark">
                    {stop.clientName} · {stop.petName}
                  </p>
                  <p className="text-xs text-bark-soft">{stop.address}</p>
                </div>
              </div>
              <StatusPill status={stop.status} />
            </div>
            {stop.status !== "DELIVERED" ? (
              <Button
                variant={stop.status === "OUT_FOR_DELIVERY" ? "primary" : "secondary"}
                onClick={() => advance(stop.id)}
              >
                {stop.status === "PENDING" ? "Start delivery" : "Mark delivered"}
              </Button>
            ) : (
              <p className="text-xs font-semibold text-paw-green-dark">Proof of delivery uploaded</p>
            )}
          </div>
        ))}
      </div>
    </RoleScreen>
  );
}
