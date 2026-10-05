"use client";

import { useState } from "react";

import { Button } from "@/components/app/Button";
import { RoleTabShell } from "@/components/app/RoleTabShell";
import { TextField } from "@/components/app/TextField";
import { PhoneIcon, TruckIcon } from "@/components/app/icons";
import { DRIVER_TABS } from "@/components/app/role-tabs";
import { useAppState } from "@/components/app/state";

export default function DriverProfileScreen() {
  const { driverProfile, updateDriverProfile } = useAppState();
  const [onShift, setOnShift] = useState(true);
  const [editing, setEditing] = useState(false);
  const [vehicle, setVehicle] = useState(driverProfile.vehicle);
  const [vehicleType, setVehicleType] = useState(driverProfile.vehicleType);
  const [phone, setPhone] = useState(driverProfile.phone);

  const startEdit = () => {
    setVehicle(driverProfile.vehicle);
    setVehicleType(driverProfile.vehicleType);
    setPhone(driverProfile.phone);
    setEditing(true);
  };

  const save = () => {
    updateDriverProfile({ vehicle: vehicle.trim(), vehicleType: vehicleType.trim(), phone: phone.trim() });
    setEditing(false);
  };

  return (
    <RoleTabShell title="Profile" tabs={DRIVER_TABS}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-soft">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paw-green-light text-paw-green-dark">
            <TruckIcon size={30} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-bark">{driverProfile.name}</p>
            <p className="text-sm text-bark-soft">★ {driverProfile.rating} rating</p>
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

        {editing ? (
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
            <TextField label="Vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} />
            <TextField label="Vehicle type" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} />
            <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={save}>Save</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between text-sm">
              <span className="text-bark-soft">Vehicle</span>
              <span className="font-semibold text-bark">
                {driverProfile.vehicle} · {driverProfile.vehicleType}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-bark-soft">
                <PhoneIcon size={14} /> Phone
              </span>
              <span className="font-semibold text-bark">{driverProfile.phone}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-bark-soft">Deliveries completed</span>
              <span className="font-semibold text-bark">{driverProfile.deliveriesCompleted}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-bark-soft">Driving since</span>
              <span className="font-semibold text-bark">{driverProfile.joinedMonthsAgo} months ago</span>
            </div>
            <Button variant="ghost" onClick={startEdit}>
              Edit profile
            </Button>
          </div>
        )}
      </div>
    </RoleTabShell>
  );
}
