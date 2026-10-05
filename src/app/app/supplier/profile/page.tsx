"use client";

import { useState } from "react";

import { Button } from "@/components/app/Button";
import { RoleTabShell } from "@/components/app/RoleTabShell";
import { TextField } from "@/components/app/TextField";
import { PhoneIcon, UserIcon } from "@/components/app/icons";
import { SUPPLIER_TABS } from "@/components/app/role-tabs";
import { useAppState } from "@/components/app/state";

export default function SupplierProfileScreen() {
  const { supplierProfile, updateSupplierProfile } = useAppState();
  const [editing, setEditing] = useState(false);
  const [businessName, setBusinessName] = useState(supplierProfile.businessName);
  const [contactName, setContactName] = useState(supplierProfile.contactName);
  const [phone, setPhone] = useState(supplierProfile.phone);
  const [bankAccount, setBankAccount] = useState(supplierProfile.bankAccount);

  const startEdit = () => {
    setBusinessName(supplierProfile.businessName);
    setContactName(supplierProfile.contactName);
    setPhone(supplierProfile.phone);
    setBankAccount(supplierProfile.bankAccount);
    setEditing(true);
  };

  const save = () => {
    updateSupplierProfile({
      businessName: businessName.trim(),
      contactName: contactName.trim(),
      phone: phone.trim(),
      bankAccount: bankAccount.trim(),
    });
    setEditing(false);
  };

  return (
    <RoleTabShell title="Profile" tabs={SUPPLIER_TABS}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-soft">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paw-orange-light text-paw-orange-dark">
            <UserIcon size={30} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-bark">{supplierProfile.businessName}</p>
            <p className="text-sm text-bark-soft">{supplierProfile.contactName}</p>
          </div>
        </div>

        {editing ? (
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft">
            <TextField label="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            <TextField label="Contact name" value={contactName} onChange={(e) => setContactName(e.target.value)} />
            <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label="Payout account" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
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
              <span className="flex items-center gap-1.5 text-bark-soft">
                <PhoneIcon size={14} /> Phone
              </span>
              <span className="font-semibold text-bark">{supplierProfile.phone}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-bark-soft">GSTIN</span>
              <span className="font-mono font-semibold text-bark">{supplierProfile.gstin}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-bark-soft">Payout account</span>
              <span className="font-semibold text-bark">{supplierProfile.bankAccount}</span>
            </div>
            <Button variant="ghost" onClick={startEdit}>
              Edit profile
            </Button>
          </div>
        )}

        <div className="rounded-2xl bg-white p-4 shadow-soft">
          <p className="mb-2 text-sm font-bold text-bark">Items supplied</p>
          <div className="flex flex-wrap gap-2">
            {supplierProfile.itemsSupplied.map((item) => (
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
