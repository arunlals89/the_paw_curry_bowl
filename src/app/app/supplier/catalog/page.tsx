"use client";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { SUPPLIER_TABS } from "@/components/app/role-tabs";
import { SUPPLIER_CATALOG } from "@/components/app/demo-data";

export default function SupplierCatalogScreen() {
  return (
    <RoleTabShell title="Catalog" subtitle="Items you supply" tabs={SUPPLIER_TABS}>
      <div className="flex flex-col gap-3">
        {SUPPLIER_CATALOG.map((item) => (
          <div
            key={item.itemName}
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-soft"
          >
            <div>
              <p className="text-sm font-bold text-bark">{item.itemName}</p>
              <p className="text-xs text-bark-soft">Lead time: {item.leadTimeDays} day(s)</p>
            </div>
            <p className="font-display text-lg text-paw-orange-dark">
              ₹{item.ratePerKg}
              <span className="text-xs font-sans font-semibold text-bark-soft">/{item.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </RoleTabShell>
  );
}
