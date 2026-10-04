"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/app/Button";
import { TabScreen } from "@/components/app/Screen";
import { BASE_PLANS } from "@/components/app/constants";
import { useAppState } from "@/components/app/state";

export default function PlansScreen() {
  const router = useRouter();
  const { pets, subscriptions, setSubscriptionStatus, toggleSkipTomorrow } = useAppState();

  return (
    <TabScreen>
      <div className="flex flex-col gap-4 px-6 pt-6">
        <h1 className="font-display text-2xl text-bark">Your plans</h1>

        {subscriptions.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-soft">
            <p className="text-[15px] text-bark-soft">You don&apos;t have any plans yet.</p>
            <Button onClick={() => router.push("/app/customize")}>Create a plan</Button>
          </div>
        ) : (
          subscriptions.map((sub) => {
            const pet = pets.find((item) => item.id === sub.petId);
            const plan = BASE_PLANS.find((item) => item.id === sub.planId);
            return (
              <div key={sub.id} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-bark">{pet?.name}</h2>
                  <span className="text-xs font-bold uppercase text-bark-soft/60">{sub.status}</span>
                </div>
                <p className="text-sm text-bark-soft">
                  {plan?.name} · {sub.frequency} · ₹{sub.dailyPrice.toFixed(0)}/day
                </p>
                {sub.skippedTomorrow ? (
                  <p className="text-xs font-semibold text-paw-green-dark">
                    Tomorrow&apos;s bowl is skipped.
                  </p>
                ) : null}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Button
                      variant={sub.skippedTomorrow ? "ghost" : "secondary"}
                      onClick={() => toggleSkipTomorrow(sub.id)}
                      disabled={sub.status !== "active"}
                    >
                      {sub.skippedTomorrow ? "Cancel skip" : "Skip tomorrow"}
                    </Button>
                  </div>
                  <div className="flex-1">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSubscriptionStatus(sub.id, sub.status === "active" ? "paused" : "active")
                      }
                    >
                      {sub.status === "active" ? "Pause plan" : "Resume plan"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </TabScreen>
  );
}
