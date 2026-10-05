"use client";

import { useState } from "react";

import { Button } from "@/components/app/Button";
import { RoleTabShell } from "@/components/app/RoleTabShell";
import { TextField } from "@/components/app/TextField";
import { SUPPLIER_TABS } from "@/components/app/role-tabs";
import { useAppState } from "@/components/app/state";

export default function SupplierCatalogScreen() {
  const { catalog, addCatalogItem, updateCatalogItem, removeCatalogItem } = useAppState();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editRate, setEditRate] = useState("");
  const [editUnit, setEditUnit] = useState("");
  const [editLeadTime, setEditLeadTime] = useState("");

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRate, setNewRate] = useState("");
  const [newUnit, setNewUnit] = useState("kg");
  const [newLeadTime, setNewLeadTime] = useState("1");

  const startEdit = (id: string) => {
    const item = catalog.find((i) => i.id === id);
    if (!item) return;
    setEditingId(id);
    setEditName(item.itemName);
    setEditRate(String(item.ratePerKg));
    setEditUnit(item.unit);
    setEditLeadTime(String(item.leadTimeDays));
  };

  const saveEdit = (id: string) => {
    updateCatalogItem(id, {
      itemName: editName.trim(),
      ratePerKg: Number(editRate) || 0,
      unit: editUnit.trim() || "kg",
      leadTimeDays: Number(editLeadTime) || 1,
    });
    setEditingId(null);
  };

  const submitNewItem = () => {
    if (!newName.trim()) return;
    addCatalogItem({
      itemName: newName.trim(),
      ratePerKg: Number(newRate) || 0,
      unit: newUnit.trim() || "kg",
      leadTimeDays: Number(newLeadTime) || 1,
    });
    setNewName("");
    setNewRate("");
    setNewUnit("kg");
    setNewLeadTime("1");
    setCreating(false);
  };

  return (
    <RoleTabShell title="Catalog" subtitle="Items you supply" tabs={SUPPLIER_TABS}>
      <div className="flex flex-col gap-3">
        {catalog.map((item) => {
          const isEditing = editingId === item.id;
          return (
            <div key={item.id} className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
              {isEditing ? (
                <div className="flex flex-col gap-3">
                  <TextField label="Item name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                  <div className="grid grid-cols-3 gap-2">
                    <TextField
                      label="Rate (₹)"
                      type="number"
                      value={editRate}
                      onChange={(e) => setEditRate(e.target.value)}
                    />
                    <TextField label="Unit" value={editUnit} onChange={(e) => setEditUnit(e.target.value)} />
                    <TextField
                      label="Lead (days)"
                      type="number"
                      value={editLeadTime}
                      onChange={(e) => setEditLeadTime(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => saveEdit(item.id)}>Save</Button>
                    <Button variant="ghost" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-paw-red"
                      onClick={() => {
                        removeCatalogItem(item.id);
                        setEditingId(null);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-bark">{item.itemName}</p>
                    <p className="text-xs text-bark-soft">Lead time: {item.leadTimeDays} day(s)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-display text-lg text-paw-orange-dark">
                      ₹{item.ratePerKg}
                      <span className="text-xs font-sans font-semibold text-bark-soft">/{item.unit}</span>
                    </p>
                    <Button variant="ghost" className="w-auto" onClick={() => startEdit(item.id)}>
                      Edit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {creating ? (
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-sm font-bold text-bark">Add item</p>
            <TextField label="Item name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <div className="grid grid-cols-3 gap-2">
              <TextField label="Rate (₹)" type="number" value={newRate} onChange={(e) => setNewRate(e.target.value)} />
              <TextField label="Unit" value={newUnit} onChange={(e) => setNewUnit(e.target.value)} />
              <TextField
                label="Lead (days)"
                type="number"
                value={newLeadTime}
                onChange={(e) => setNewLeadTime(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={submitNewItem}>Add item</Button>
              <Button variant="ghost" onClick={() => setCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setCreating(true)}>
            + Add item
          </Button>
        )}
      </div>
    </RoleTabShell>
  );
}
