"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/app/Button";
import { RoleTabShell } from "@/components/app/RoleTabShell";
import { StatusPill } from "@/components/app/StatusPill";
import { DRIVER_TABS } from "@/components/app/role-tabs";
import { DRIVER_STOPS } from "@/components/app/demo-data";
import type { FulfillmentStatus } from "@/components/app/constants";

export default function DriverDashboard() {
  const [stops, setStops] = useState(DRIVER_STOPS);
  const [podPhotos, setPodPhotos] = useState<Record<string, string>>({});
  const [podStopId, setPodStopId] = useState<string | null>(null);
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const advance = (id: string) => {
    const stop = stops.find((s) => s.id === id);
    if (stop?.status === "OUT_FOR_DELIVERY") {
      setPodStopId(id);
      setPendingPhoto(null);
      return;
    }
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "OUT_FOR_DELIVERY" as FulfillmentStatus } : s))
    );
  };

  const pickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingPhoto(URL.createObjectURL(file));
  };

  const confirmDelivery = () => {
    if (!podStopId || !pendingPhoto) return;
    setStops((prev) => prev.map((s) => (s.id === podStopId ? { ...s, status: "DELIVERED" } : s)));
    setPodPhotos((prev) => ({ ...prev, [podStopId]: pendingPhoto }));
    setPodStopId(null);
    setPendingPhoto(null);
  };

  const cancelPod = () => {
    setPodStopId(null);
    setPendingPhoto(null);
  };

  const remaining = stops.filter((s) => s.status !== "DELIVERED").length;
  const podStop = stops.find((s) => s.id === podStopId);

  if (podStopId && podStop) {
    return (
      <RoleTabShell title="Proof of delivery" subtitle={`${podStop.clientName} · ${podStop.petName}`} tabs={DRIVER_TABS}>
        <div className="flex flex-col gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={pickPhoto}
            className="hidden"
          />

          {pendingPhoto ? (
            <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-cream-dark/40">
              <Image src={pendingPhoto} alt="Captured proof" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex h-56 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-paw-orange/40 bg-paw-orange-light/30 text-sm font-semibold text-paw-orange-dark"
            >
              Tap to take a photo
            </button>
          )}

          {pendingPhoto ? (
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
              Retake photo
            </Button>
          ) : null}

          <div className="flex gap-3">
            <div className="flex-1">
              <Button variant="ghost" onClick={cancelPod}>
                Cancel
              </Button>
            </div>
            <div className="flex-1">
              <Button onClick={confirmDelivery} disabled={!pendingPhoto}>
                Confirm delivery
              </Button>
            </div>
          </div>
        </div>
      </RoleTabShell>
    );
  }

  return (
    <RoleTabShell title="Today's route" subtitle={`${remaining} stops remaining`} tabs={DRIVER_TABS}>
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
              <div className="flex items-center gap-2">
                {podPhotos[stop.id] ? (
                  <Image
                    src={podPhotos[stop.id]}
                    alt="Proof of delivery"
                    width={36}
                    height={36}
                    unoptimized
                    className="h-9 w-9 rounded-lg object-cover"
                  />
                ) : null}
                <p className="text-xs font-semibold text-paw-green-dark">Proof of delivery uploaded</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </RoleTabShell>
  );
}
