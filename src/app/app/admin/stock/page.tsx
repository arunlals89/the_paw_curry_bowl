"use client";

import { AdminShell } from "@/components/app/AdminShell";
import { InventoryStockPanel } from "@/components/app/InventoryStockPanel";
import { PURCHASE_ORDERS, type PurchaseOrder } from "@/components/app/demo-data";

const PO_STATUS_COPY: Record<PurchaseOrder["status"], { label: string; className: string }> = {
  awaiting_delivery: { label: "Awaiting delivery", className: "bg-paw-blue-light text-paw-blue" },
  invoice_pending: { label: "Invoice pending", className: "bg-paw-yellow-light text-[#9a7418]" },
  delivered: { label: "Complete", className: "bg-paw-green-light text-paw-green-dark" },
};

export default function AdminStockScreen() {
  return (
    <AdminShell title="Stock" subtitle="Raw ingredients & purchase orders">
      <div className="flex flex-col gap-5">
        <div>
          <p className="mb-3 text-sm font-bold text-bark">Raw inventory</p>
          <InventoryStockPanel />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-bark">Purchase orders</p>
          {PURCHASE_ORDERS.map((order) => {
            const copy = PO_STATUS_COPY[order.status];
            return (
              <div key={order.id} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-bark">{order.itemName}</span>
                  <span className="font-mono text-[11px] text-bark-soft/60">{order.id}</span>
                </div>
                <p className="text-xs text-bark-soft">
                  {order.quantityKg}kg · {order.dueDate}
                </p>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${copy.className}`}>
                  {copy.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
