"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/app/Button";
import { TabScreen } from "@/components/app/Screen";
import { useAppState } from "@/components/app/state";

export default function AccountScreen() {
  const router = useRouter();
  const { profile, signOut } = useAppState();

  const handleSignOut = () => {
    signOut();
    router.replace("/app");
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

        <div className="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-soft">
          <span className="text-sm text-bark-soft">Wallet balance</span>
          <span className="font-display text-xl text-paw-orange-dark">
            ₹{(profile?.walletBalance ?? 0).toFixed(0)}
          </span>
        </div>

        <div className="flex-1" />
        <Button variant="ghost" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </TabScreen>
  );
}
