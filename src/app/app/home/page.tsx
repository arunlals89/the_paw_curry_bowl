"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/app/Button";
import { TabScreen } from "@/components/app/Screen";
import { StatusPill } from "@/components/app/StatusPill";
import { BASE_PLANS } from "@/components/app/constants";
import { useAppState } from "@/components/app/state";
import { basePath } from "@/lib/base-path";

export default function HomeDashboardScreen() {
  const router = useRouter();
  const { profile, pets, subscriptions } = useAppState();
  const activeSubscriptions = subscriptions.filter((sub) => sub.status === "active");

  return (
    <TabScreen>
      <div className="flex flex-col gap-5 px-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-bark-soft">Welcome back</p>
            <h1 className="font-display text-2xl text-bark">
              {profile?.fullName?.split(" ")[0] ?? "there"} 👋
            </h1>
          </div>
          <Image
            src={`${basePath}/brand/logo.jpg`}
            alt="The Paw Curry Bowl"
            width={38}
            height={38}
            className="rounded-full shadow-soft"
          />
        </div>

        {activeSubscriptions.length === 0 ? (
          <div className="flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white shadow-soft">
            <div className="relative h-36 w-full">
              <Image
                src={`${basePath}/brand/gallery-3.jpg`}
                alt="A packed The Paw Curry Bowl meal with chicken, veggies and rice"
                fill
                sizes="390px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-4 px-6 pb-6 text-center">
              <p className="text-[15px] text-bark-soft">
                No active plans yet. Build your first curry bowl plan for your pup.
              </p>
              <Button onClick={() => router.push("/app/customize")}>Create a plan</Button>
            </div>
          </div>
        ) : (
          activeSubscriptions.map((sub) => {
            const pet = pets.find((item) => item.id === sub.petId);
            const plan = BASE_PLANS.find((item) => item.id === sub.planId);
            return (
              <div key={sub.id} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-bark">{pet?.name ?? "Your pup"}</h2>
                  <StatusPill status={sub.todayStatus} />
                </div>
                <p className="text-sm text-bark-soft">
                  {plan?.name ?? "Custom plan"} · ₹{sub.dailyPrice.toFixed(0)}/day
                </p>
                {sub.todayStatus === "OUT_FOR_DELIVERY" ? (
                  <p className="text-sm font-semibold text-paw-blue">Your driver is on the way!</p>
                ) : null}
              </div>
            );
          })
        )}

        <Button variant="secondary" onClick={() => router.push("/app/customize")}>
          New plan for another pup
        </Button>
      </div>
    </TabScreen>
  );
}
