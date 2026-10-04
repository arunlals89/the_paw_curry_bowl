"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/app/Button";
import { Screen } from "@/components/app/Screen";
import { StepHeader } from "@/components/app/StepHeader";
import { TextField } from "@/components/app/TextField";
import { CheckIcon } from "@/components/app/icons";
import { type ActivityLevel } from "@/components/app/constants";
import { useAppState } from "@/components/app/state";

const ACTIVITY_LEVELS: { value: ActivityLevel; label: string; blurb: string }[] = [
  { value: "low", label: "Low", blurb: "Mostly naps and short walks" },
  { value: "moderate", label: "Moderate", blurb: "Daily walks and some play" },
  { value: "high", label: "High", blurb: "Runs, hikes, lots of energy" },
];

const COMMON_ALLERGIES = ["Chicken", "Beef", "Peas", "Dairy", "Grain", "Fish"];
const TOTAL_STEPS = 4;

export default function PetOnboardingScreen() {
  const router = useRouter();
  const { addPet } = useAppState();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [ageMonths, setAgeMonths] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleAllergy = (allergy: string) => {
    setAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((item) => item !== allergy) : [...prev, allergy]
    );
  };

  const goNext = () => {
    setError(null);
    if (step === 1 && !name.trim()) {
      setError("Your pup needs a name!");
      return;
    }
    if (step === 2 && (!ageMonths.trim() || !weightKg.trim())) {
      setError("Age and weight help us size the right plan.");
      return;
    }
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }
    submit();
  };

  const submit = () => {
    setSaving(true);
    addPet({
      name: name.trim(),
      breed: breed.trim() || null,
      ageMonths: Number(ageMonths) || null,
      weightKg: Number(weightKg) || null,
      activityLevel,
      allergies,
    });
    setTimeout(() => {
      setSaving(false);
      router.push("/app/home");
    }, 250);
  };

  return (
    <Screen>
      <div className="flex h-full flex-col justify-between px-6 py-8">
        <div className="flex flex-col gap-6">
          <StepHeader
            step={step}
            totalSteps={TOTAL_STEPS}
            title={
              step === 1
                ? "What's your dog's name?"
                : step === 2
                  ? "Size and age"
                  : step === 3
                    ? "Activity level"
                    : "Any allergies?"
            }
          />

          {step === 1 ? (
            <div className="flex flex-col gap-4">
              <TextField label="Pet name" placeholder="Biscuit" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField
                label="Breed (optional)"
                placeholder="Golden Retriever"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="flex flex-col gap-4">
              <TextField
                label="Age (months)"
                placeholder="24"
                inputMode="numeric"
                value={ageMonths}
                onChange={(e) => setAgeMonths(e.target.value)}
              />
              <TextField
                label="Weight (kg)"
                placeholder="18"
                inputMode="decimal"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
              />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="flex flex-col gap-3">
              {ACTIVITY_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    activityLevel === level.value
                      ? "border-paw-orange bg-paw-orange-light"
                      : "border-black/10 bg-white"
                  }`}
                >
                  <p className="text-[15px] font-semibold text-bark">{level.label}</p>
                  <p className="text-sm text-bark-soft">{level.blurb}</p>
                </button>
              ))}
            </div>
          ) : null}

          {step === 4 ? (
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGIES.map((allergy) => {
                const selected = allergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    onClick={() => toggleAllergy(allergy)}
                    className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selected
                        ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                        : "border-black/10 bg-white text-bark"
                    }`}
                  >
                    {selected ? <CheckIcon size={14} /> : null}
                    {allergy}
                  </button>
                );
              })}
            </div>
          ) : null}

          {error ? <p className="text-sm font-medium text-paw-red">{error}</p> : null}
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={goNext} loading={saving}>
            {step < TOTAL_STEPS ? "Next" : "Finish setup"}
          </Button>
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : null}
        </div>
      </div>
    </Screen>
  );
}
