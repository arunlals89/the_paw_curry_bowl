"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/app/Button";
import { TabScreen } from "@/components/app/Screen";
import { useAppState } from "@/components/app/state";

const TOP_UP_AMOUNTS = [100, 500, 1000];

export default function AccountScreen() {
  const router = useRouter();
  const { profile, pets, signOut, addFunds } = useAppState();
  const [justAdded, setJustAdded] = useState<number | null>(null);

  const handleSignOut = () => {
    signOut();
    router.replace("/app");
  };

  const handleAddFunds = (amount: number) => {
    addFunds(amount);
    setJustAdded(amount);
    setTimeout(() => setJustAdded(null), 2000);
  };

  return (
    <TabScreen>
      <div className="flex h-full flex-col gap-6 px-6 pt-6">
        <div>
          <h1 className="font-display text-2xl text-bark">{profile?.fullName ?? "Your account"}</h1>
          <p className="text-sm text-bark-soft">{profile?.phone}</p>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-soft">
          <span className="text-sm text-bark-soft">Delivery address</span>
          <span className="text-[15px] text-bark">{profile?.address ?? "Not set"}</span>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft">
          <div>
            <span className="text-sm text-bark-soft">Wallet balance</span>
            <p className="font-display text-xl text-paw-orange-dark">
              ₹{(profile?.walletBalance ?? 0).toFixed(0)}
            </p>
          </div>
          {justAdded ? (
            <p className="text-xs font-semibold text-paw-green-dark">Added ₹{justAdded} ✓</p>
          ) : null}
          <div className="flex gap-2">
            {TOP_UP_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAddFunds(amount)}
                className="flex-1 rounded-xl border border-paw-orange/30 bg-paw-orange-light px-2 py-2 text-xs font-bold text-paw-orange-dark"
              >
                +₹{amount}
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/app/pets"
          className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-soft"
        >
          <div>
            <span className="text-sm text-bark-soft">Your pets</span>
            <p className="text-[15px] font-semibold text-bark">
              {pets.length === 0 ? "No pets yet" : `${pets.length} pet${pets.length > 1 ? "s" : ""}`}
            </p>
          </div>
          <span className="text-sm font-bold text-paw-orange-dark">Manage →</span>
        </Link>

        <div className="flex-1" />
        <Button variant="ghost" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </TabScreen>
  );
}
