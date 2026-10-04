"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/app/Button";
import { IngredientSlider } from "@/components/app/IngredientSlider";
import { Screen } from "@/components/app/Screen";
import { BASE_PLANS, type BasePlan } from "@/components/app/constants";
import { useAppState } from "@/components/app/state";

export default function CustomizePlanScreen() {
  const router = useRouter();
  const { pets, addSubscription } = useAppState();

  const [selectedPlan, setSelectedPlan] = useState<BasePlan>(BASE_PLANS[0]);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(pets[0]?.id ?? null);
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const [chickenG, setChickenG] = useState(BASE_PLANS[0].defaultChickenG);
  const [veggieG, setVeggieG] = useState(BASE_PLANS[0].defaultVeggieG);
  const [riceG, setRiceG] = useState(BASE_PLANS[0].defaultRiceG);
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estimatedPrice = useMemo(() => {
    const baseWeight = selectedPlan.totalWeightGrams || 1;
    const customWeight = chickenG + veggieG + riceG;
    return Math.round((selectedPlan.basePrice * customWeight) / baseWeight);
  }, [selectedPlan, chickenG, veggieG, riceG]);

  const selectPlan = (plan: BasePlan) => {
    setSelectedPlan(plan);
    setChickenG(plan.defaultChickenG);
    setVeggieG(plan.defaultVeggieG);
    setRiceG(plan.defaultRiceG);
  };

  const confirmPlan = () => {
    if (!selectedPetId) {
      setError("Pick a pet to continue.");
      return;
    }
    setSaving(true);
    setError(null);
    addSubscription({
      petId: selectedPetId,
      planId: selectedPlan.id,
      frequency,
      customChickenG: chickenG,
      customVeggieG: veggieG,
      customRiceG: riceG,
      dailyPrice: estimatedPrice,
      status: "active",
    });
    setTimeout(() => {
      setSaving(false);
      router.push("/app/home");
    }, 250);
  };

  return (
    <Screen title="Customize plan">
      <div className="flex flex-col gap-5 px-6 py-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-bark">Pet</span>
          {pets.length === 0 ? (
            <p className="text-sm text-bark-soft">
              Add a pet in onboarding first — then they&apos;ll show up here.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pets.map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => setSelectedPetId(pet.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedPetId === pet.id
                      ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                      : "border-black/10 bg-white text-bark"
                  }`}
                >
                  {pet.name}
                </button>
              ))}
            </div>
          )}
          {selectedPet && selectedPet.allergies.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-paw-red-light/60 px-3 py-2">
              <span className="text-xs font-semibold text-paw-red">
                {selectedPet.name} is allergic to:
              </span>
              {selectedPet.allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase text-paw-red"
                >
                  {allergy}
                </span>
              ))}
              <span className="text-xs text-paw-red/80">— excluded automatically from the kitchen</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-bark">Base plan</span>
          <div className="flex flex-col gap-2">
            {BASE_PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => selectPlan(plan)}
                className={`rounded-2xl border p-4 text-left transition ${
                  selectedPlan.id === plan.id
                    ? "border-paw-orange bg-paw-orange-light"
                    : "border-black/10 bg-white"
                }`}
              >
                <p className="text-[15px] font-bold text-bark">{plan.name}</p>
                <p className="text-sm text-bark-soft">
                  {plan.totalWeightGrams}g · from ₹{plan.basePrice}/day
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-bark">Customize the mix</span>
          <IngredientSlider label="Chicken" grams={chickenG} min={0} max={1000} onChange={setChickenG} />
          <IngredientSlider label="Veggies" grams={veggieG} min={0} max={400} onChange={setVeggieG} />
          <IngredientSlider label="Rice" grams={riceG} min={0} max={1000} onChange={setRiceG} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-bark">Frequency</span>
          <div className="flex gap-2">
            {(["daily", "weekly"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setFrequency(value)}
                className={`flex-1 rounded-xl border py-3 text-center text-sm font-semibold capitalize transition ${
                  frequency === value
                    ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                    : "border-black/10 bg-white text-bark"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-soft">
          <span className="text-[15px] text-bark-soft">Estimated price</span>
          <span className="font-display text-xl text-paw-orange-dark">₹{estimatedPrice}/day</span>
        </div>

        {error ? <p className="text-sm font-medium text-paw-red">{error}</p> : null}

        <Button onClick={confirmPlan} loading={saving}>
          Confirm plan
        </Button>
      </div>
    </Screen>
  );
}
