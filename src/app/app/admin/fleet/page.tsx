"use client";

import { useState } from "react";

import { AdminShell } from "@/components/app/AdminShell";
import { Button } from "@/components/app/Button";
import { TextField } from "@/components/app/TextField";
import { PhoneIcon, TruckIcon } from "@/components/app/icons";
import { DRIVER_STOPS } from "@/components/app/demo-data";
import { useAppState } from "@/components/app/state";

export default function AdminFleetScreen() {
  const { drivers, addDriver, updateDriver, removeDriver } = useAppState();
  const deliveredToday = DRIVER_STOPS.filter((s) => s.status === "DELIVERED").length;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editVehicle, setEditVehicle] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newVehicle, setNewVehicle] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const startEdit = (id: string) => {
    const driver = drivers.find((d) => d.id === id);
    if (!driver) return;
    setEditingId(id);
    setEditName(driver.name);
    setEditVehicle(driver.vehicle);
    setEditPhone(driver.phone);
  };

  const saveEdit = (id: string) => {
    updateDriver(id, { name: editName.trim(), vehicle: editVehicle.trim(), phone: editPhone.trim() });
    setEditingId(null);
  };

  const submitNewDriver = () => {
    if (!newName.trim()) return;
    addDriver({
      name: newName.trim(),
      vehicle: newVehicle.trim() || "Unassigned",
      phone: newPhone.trim(),
      stopsToday: 0,
      onTimePct: 100,
    });
    setNewName("");
    setNewVehicle("");
    setNewPhone("");
    setCreating(false);
  };

  return (
    <AdminShell title="Fleet" subtitle={`${drivers.length} drivers on shift`}>
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
          {drivers.map((driver) => {
            const isEditing = editingId === driver.id;
            return (
              <div key={driver.id} className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
                {isEditing ? (
                  <div className="flex flex-col gap-3">
                    <TextField label="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <TextField
                      label="Vehicle"
                      value={editVehicle}
                      onChange={(e) => setEditVehicle(e.target.value)}
                    />
                    <TextField label="Phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                    <div className="flex gap-2">
                      <Button onClick={() => saveEdit(driver.id)}>Save</Button>
                      <Button variant="ghost" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-paw-red"
                        onClick={() => {
                          removeDriver(driver.id);
                          setEditingId(null);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
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
                    <Button variant="ghost" onClick={() => startEdit(driver.id)}>
                      Edit driver
                    </Button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {creating ? (
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-sm font-bold text-bark">Add driver</p>
            <TextField label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <TextField label="Vehicle" value={newVehicle} onChange={(e) => setNewVehicle(e.target.value)} />
            <TextField label="Phone" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={submitNewDriver}>Add driver</Button>
              <Button variant="ghost" onClick={() => setCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setCreating(true)}>
            + Add driver
          </Button>
        )}

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
