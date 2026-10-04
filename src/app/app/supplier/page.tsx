"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/app/Button";
import { RoleTabShell } from "@/components/app/RoleTabShell";
import { SUPPLIER_TABS } from "@/components/app/role-tabs";
import { PURCHASE_ORDERS, type PurchaseOrder } from "@/components/app/demo-data";

const STATUS_COPY: Record<PurchaseOrder["status"], { label: string; className: string }> = {
  awaiting_delivery: { label: "Awaiting delivery", className: "bg-paw-blue-light text-paw-blue" },
  invoice_pending: { label: "Invoice pending", className: "bg-paw-yellow-light text-[#9a7418]" },
  delivered: { label: "Complete", className: "bg-paw-green-light text-paw-green-dark" },
};

export default function SupplierDashboard() {
  const [orders, setOrders] = useState(PURCHASE_ORDERS);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const pendingOrderId = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startUpload = (id: string) => {
    pendingOrderId.current = id;
    fileInputRef.current?.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const id = pendingOrderId.current;
    if (!file || !id) return;
    setFileNames((prev) => ({ ...prev, [id]: file.name }));
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status: "delivered" } : order)));
    setToast(`Uploaded ${file.name} ✓`);
    setTimeout(() => setToast(null), 2500);
    e.target.value = "";
  };

  return (
    <RoleTabShell title="Purchase orders" subtitle="Assigned to your account" tabs={SUPPLIER_TABS}>
      <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={onFileSelected} className="hidden" />
      <div className="flex flex-col gap-3">
        {toast ? (
          <div className="rounded-xl bg-paw-green-light px-4 py-2.5 text-sm font-semibold text-paw-green-dark">
            {toast}
          </div>
        ) : null}
        {orders.map((order) => {
          const copy = STATUS_COPY[order.status];
          return (
            <div key={order.id} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-bark">{order.itemName}</span>
                <span className="font-mono text-[11px] text-bark-soft/60">{order.id}</span>
              </div>
              <p className="text-sm text-bark-soft">{order.quantityKg}kg · {order.dueDate}</p>
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${copy.className}`}>
                {copy.label}
              </span>
              {fileNames[order.id] ? (
                <p className="truncate text-xs text-bark-soft">📎 {fileNames[order.id]}</p>
              ) : null}
              {order.status === "invoice_pending" ? (
                <Button variant="secondary" onClick={() => startUpload(order.id)}>
                  Upload invoice
                </Button>
              ) : null}
            </div>
          );
        })}
      </div>
    </RoleTabShell>
  );
}
