"use client";

import { useState } from "react";

import { Button } from "@/components/app/Button";
import { TextField } from "@/components/app/TextField";
import { useAppState } from "@/components/app/state";

export function InventoryStockPanel() {
  const { inventory, usageLog, addInventoryItem, updateInventoryItem, removeInventoryItem, logInventoryUsage } =
    useAppState();
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editStock, setEditStock] = useState("");
  const [editCost, setEditCost] = useState("");
  const [editThreshold, setEditThreshold] = useState("");
  const [usageItem, setUsageItem] = useState<string | null>(null);
  const [usageQty, setUsageQty] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newThreshold, setNewThreshold] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const usedToday = (itemName: string) =>
    usageLog
      .filter((entry) => entry.itemName === itemName && entry.date === today)
      .reduce((sum, entry) => sum + entry.quantityKg, 0);

  const startEdit = (itemName: string) => {
    const item = inventory.find((i) => i.itemName === itemName);
    if (!item) return;
    setEditingItem(itemName);
    setEditStock(String(item.stockKg));
    setEditCost(String(item.costPerKg));
    setEditThreshold(String(item.reorderThresholdKg));
  };

  const saveEdit = (itemName: string) => {
    updateInventoryItem(itemName, {
      stockKg: Number(editStock) || 0,
      costPerKg: Number(editCost) || 0,
      reorderThresholdKg: Number(editThreshold) || 0,
    });
    setEditingItem(null);
  };

  const submitUsage = (itemName: string) => {
    const qty = Number(usageQty);
    if (qty > 0) logInventoryUsage(itemName, qty);
    setUsageItem(null);
    setUsageQty("");
  };

  const submitNewItem = () => {
    if (!newName.trim()) return;
    addInventoryItem({
      itemName: newName.trim(),
      stockKg: Number(newStock) || 0,
      costPerKg: Number(newCost) || 0,
      reorderThresholdKg: Number(newThreshold) || 0,
    });
    setNewName("");
    setNewStock("");
    setNewCost("");
    setNewThreshold("");
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {inventory.map((item) => {
        const low = item.stockKg < item.reorderThresholdKg;
        const pct = Math.min(100, (item.stockKg / (item.reorderThresholdKg * 1.6 || 1)) * 100);
        const isEditing = editingItem === item.itemName;
        const isLoggingUsage = usageItem === item.itemName;
        const todayUsage = usedToday(item.itemName);

        return (
          <div key={item.itemName} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-bark">{item.itemName}</span>
              <span className={low ? "font-bold text-paw-red" : "text-bark-soft"}>
                {item.stockKg}kg on hand {low ? "· reorder" : ""}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-black/5">
              <div
                className={`h-1.5 rounded-full ${low ? "bg-paw-red" : "bg-paw-green"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-bark-soft">
              ₹{item.costPerKg}/kg · reorder threshold {item.reorderThresholdKg}kg
              {todayUsage > 0 ? ` · ${todayUsage}kg used today` : ""}
            </p>

            {isEditing ? (
              <div className="flex flex-col gap-2 rounded-xl bg-cream/60 p-3">
                <div className="grid grid-cols-3 gap-2">
                  <TextField label="Stock (kg)" type="number" value={editStock} onChange={(e) => setEditStock(e.target.value)} />
                  <TextField label="Cost/kg (₹)" type="number" value={editCost} onChange={(e) => setEditCost(e.target.value)} />
                  <TextField label="Reorder (kg)" type="number" value={editThreshold} onChange={(e) => setEditThreshold(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => saveEdit(item.itemName)}>Save</Button>
                  <Button variant="ghost" onClick={() => setEditingItem(null)}>Cancel</Button>
                  <Button
                    variant="ghost"
                    className="w-auto text-paw-red"
                    onClick={() => {
                      removeInventoryItem(item.itemName);
                      setEditingItem(null);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : isLoggingUsage ? (
              <div className="flex items-end gap-2 rounded-xl bg-cream/60 p-3">
                <div className="flex-1">
                  <TextField
                    label="Used today (kg)"
                    type="number"
                    value={usageQty}
                    onChange={(e) => setUsageQty(e.target.value)}
                    autoFocus
                  />
                </div>
                <Button className="w-auto" onClick={() => submitUsage(item.itemName)}>Log</Button>
                <Button className="w-auto" variant="ghost" onClick={() => setUsageItem(null)}>Cancel</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="flex-1">
                  <Button variant="secondary" onClick={() => setUsageItem(item.itemName)}>
                    Log usage
                  </Button>
                </div>
                <div className="flex-1">
                  <Button variant="ghost" onClick={() => startEdit(item.itemName)}>
                    Edit stock
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {showAddForm ? (
        <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
          <p className="text-sm font-bold text-bark">Add inventory item</p>
          <TextField label="Item name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <div className="grid grid-cols-3 gap-2">
            <TextField label="Stock (kg)" type="number" value={newStock} onChange={(e) => setNewStock(e.target.value)} />
            <TextField label="Cost/kg (₹)" type="number" value={newCost} onChange={(e) => setNewCost(e.target.value)} />
            <TextField label="Reorder (kg)" type="number" value={newThreshold} onChange={(e) => setNewThreshold(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button onClick={submitNewItem}>Add item</Button>
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <Button variant="secondary" onClick={() => setShowAddForm(true)}>
          + Add inventory item
        </Button>
      )}
    </div>
  );
}
