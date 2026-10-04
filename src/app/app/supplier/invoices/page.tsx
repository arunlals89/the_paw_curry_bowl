"use client";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { SUPPLIER_TABS } from "@/components/app/role-tabs";
import { SUPPLIER_INVOICES } from "@/components/app/demo-data";

export default function SupplierInvoicesScreen() {
  const totalPending = SUPPLIER_INVOICES.filter((i) => i.status === "pending").reduce(
    (sum, i) => sum + i.amount,
    0
  );

  return (
    <RoleTabShell title="Invoices" subtitle={`₹${totalPending} pending payment`} tabs={SUPPLIER_TABS}>
      <div className="flex flex-col gap-3">
        {SUPPLIER_INVOICES.map((invoice) => (
          <div key={invoice.id} className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-bark">{invoice.id}</span>
              <span className="font-mono text-[11px] text-bark-soft/60">{invoice.poId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-display text-lg text-paw-orange-dark">₹{invoice.amount}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  invoice.status === "paid"
                    ? "bg-paw-green-light text-paw-green-dark"
                    : "bg-paw-yellow-light text-[#9a7418]"
                }`}
              >
                {invoice.status === "paid" ? "Paid" : "Pending"}
              </span>
            </div>
            <p className="text-xs text-bark-soft">{invoice.date}</p>
          </div>
        ))}
      </div>
    </RoleTabShell>
  );
}
