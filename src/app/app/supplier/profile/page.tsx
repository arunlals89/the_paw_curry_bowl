"use client";

import { RoleTabShell } from "@/components/app/RoleTabShell";
import { PhoneIcon, UserIcon } from "@/components/app/icons";
import { SUPPLIER_TABS } from "@/components/app/role-tabs";
import { SUPPLIER_PROFILE } from "@/components/app/demo-data";

export default function SupplierProfileScreen() {
  return (
    <RoleTabShell title="Profile" tabs={SUPPLIER_TABS}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-soft">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paw-orange-light text-paw-orange-dark">
            <UserIcon size={30} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-bark">{SUPPLIER_PROFILE.businessName}</p>
            <p className="text-sm text-bark-soft">{SUPPLIER_PROFILE.contactName}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-bark-soft">
              <PhoneIcon size={14} /> Phone
            </span>
            <span className="font-semibold text-bark">{SUPPLIER_PROFILE.phone}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-bark-soft">GSTIN</span>
            <span className="font-mono font-semibold text-bark">{SUPPLIER_PROFILE.gstin}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-bark-soft">Payout account</span>
            <span className="font-semibold text-bark">{SUPPLIER_PROFILE.bankAccount}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <p className="mb-2 text-sm font-bold text-bark">Items supplied</p>
          <div className="flex flex-wrap gap-2">
            {SUPPLIER_PROFILE.itemsSupplied.map((item) => (
              <span
                key={item}
                className="rounded-full bg-paw-green-light px-3 py-1 text-xs font-bold text-paw-green-dark"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </RoleTabShell>
  );
}
