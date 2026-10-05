"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BreedField } from "@/components/app/BreedField";
import { Button } from "@/components/app/Button";
import { Screen } from "@/components/app/Screen";
import { TextField } from "@/components/app/TextField";
import { CheckIcon } from "@/components/app/icons";
import { ACTIVITY_LEVELS, COMMON_ALLERGIES, type ActivityLevel, type Pet } from "@/components/app/constants";
import { useAppState } from "@/components/app/state";

function PetCreator({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { addPet } = useAppState();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [ageMonths, setAgeMonths] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleAllergy = (allergy: string) => {
    setAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((item) => item !== allergy) : [...prev, allergy]
    );
  };

  const save = () => {
    if (!name.trim()) {
      setError("Your pup needs a name!");
      return;
    }
    addPet({
      name: name.trim(),
      breed: breed.trim() || null,
      ageMonths: Number(ageMonths) || null,
      weightKg: Number(weightKg) || null,
      activityLevel,
      allergies,
    });
    onCreated();
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-soft">
      <p className="text-sm font-bold text-bark">Add a pet</p>
      <TextField label="Pet name" value={name} onChange={(e) => setName(e.target.value)} />
      <BreedField value={breed} onChange={setBreed} />
      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Age (months)"
          inputMode="numeric"
          value={ageMonths}
          onChange={(e) => setAgeMonths(e.target.value)}
        />
        <TextField
          label="Weight (kg)"
          inputMode="decimal"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-bark">Activity level</span>
        <div className="flex gap-2">
          {ACTIVITY_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => setActivityLevel(level.value)}
              className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition ${
                activityLevel === level.value
                  ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                  : "border-black/10 bg-white text-bark"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-bark">Allergies</span>
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGIES.map((allergy) => {
            const selected = allergies.includes(allergy);
            return (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selected
                    ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                    : "border-black/10 bg-white text-bark"
                }`}
              >
                {selected ? <CheckIcon size={12} /> : null}
                {allergy}
              </button>
            );
          })}
        </div>
      </div>

      {error ? <p className="text-xs font-medium text-paw-red">{error}</p> : null}

      <div className="flex gap-2">
        <div className="flex-1">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
        <div className="flex-1">
          <Button onClick={save}>Add pet</Button>
        </div>
      </div>
    </div>
  );
}

function PetEditor({ pet, onClose }: { pet: Pet; onClose: () => void }) {
  const { updatePet, removePet, subscriptions } = useAppState();
  const [name, setName] = useState(pet.name);
  const [breed, setBreed] = useState(pet.breed ?? "");
  const [ageMonths, setAgeMonths] = useState(pet.ageMonths?.toString() ?? "");
  const [weightKg, setWeightKg] = useState(pet.weightKg?.toString() ?? "");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(pet.activityLevel);
  const [allergies, setAllergies] = useState<string[]>(pet.allergies);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const hasActiveSubscription = subscriptions.some(
    (sub) => sub.petId === pet.id && sub.status === "active"
  );

  const toggleAllergy = (allergy: string) => {
    setAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((item) => item !== allergy) : [...prev, allergy]
    );
  };

  const save = () => {
    updatePet(pet.id, {
      name: name.trim() || pet.name,
      breed: breed.trim() || null,
      ageMonths: Number(ageMonths) || null,
      weightKg: Number(weightKg) || null,
      activityLevel,
      allergies,
    });
    onClose();
  };

  const confirmDelete = () => {
    removePet(pet.id);
    onClose();
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-soft">
      <TextField label="Pet name" value={name} onChange={(e) => setName(e.target.value)} />
      <BreedField value={breed} onChange={setBreed} />
      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Age (months)"
          inputMode="numeric"
          value={ageMonths}
          onChange={(e) => setAgeMonths(e.target.value)}
        />
        <TextField
          label="Weight (kg)"
          inputMode="decimal"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-bark">Activity level</span>
        <div className="flex gap-2">
          {ACTIVITY_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => setActivityLevel(level.value)}
              className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition ${
                activityLevel === level.value
                  ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                  : "border-black/10 bg-white text-bark"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-bark">Allergies</span>
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGIES.map((allergy) => {
            const selected = allergies.includes(allergy);
            return (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selected
                    ? "border-paw-orange bg-paw-orange-light text-paw-orange-dark"
                    : "border-black/10 bg-white text-bark"
                }`}
              >
                {selected ? <CheckIcon size={12} /> : null}
                {allergy}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
        <div className="flex-1">
          <Button onClick={save}>Save changes</Button>
        </div>
      </div>

      {confirmingDelete ? (
        <div className="flex flex-col gap-2 rounded-xl bg-paw-red-light/60 p-3">
          <p className="text-xs font-semibold text-paw-red">
            {hasActiveSubscription
              ? `${pet.name} has an active plan — deleting will also remove it. Are you sure?`
              : `Delete ${pet.name}? This can't be undone.`}
          </p>
          <div className="flex gap-2">
            <div className="flex-1">
              <Button variant="ghost" onClick={() => setConfirmingDelete(false)}>
                Keep pet
              </Button>
            </div>
            <div className="flex-1">
              <Button variant="dark" onClick={confirmDelete}>
                Yes, delete
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirmingDelete(true)}
          className="text-center text-xs font-semibold text-paw-red"
        >
          Delete pet
        </button>
      )}
    </div>
  );
}

export default function PetsManagementScreen() {
  const router = useRouter();
  const { pets } = useAppState();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <Screen title="Your pets">
      <div className="flex flex-col gap-3 px-6 py-5">
        {pets.length === 0 && !creating ? (
          <p className="py-6 text-center text-sm text-bark-soft">No pets yet — add your first one below.</p>
        ) : (
          pets.map((pet) =>
            editingId === pet.id ? (
              <PetEditor key={pet.id} pet={pet} onClose={() => setEditingId(null)} />
            ) : (
              <button
                key={pet.id}
                onClick={() => setEditingId(pet.id)}
                className="flex flex-col gap-2 rounded-2xl bg-white p-4 text-left shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-bark">{pet.name}</p>
                  <span className="text-xs font-semibold text-paw-orange-dark">Edit →</span>
                </div>
                <p className="text-xs text-bark-soft">
                  {pet.breed ?? "Mixed / Indie"}
                  {pet.ageMonths ? ` · ${pet.ageMonths}mo` : ""}
                  {pet.weightKg ? ` · ${pet.weightKg}kg` : ""}
                </p>
                {pet.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {pet.allergies.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-paw-red-light px-2 py-0.5 text-[10px] font-bold uppercase text-paw-red"
                      >
                        No {a}
                      </span>
                    ))}
                  </div>
                ) : null}
              </button>
            )
          )
        )}

        {creating ? (
          <PetCreator
            onClose={() => setCreating(false)}
            onCreated={() => {
              setCreating(false);
              router.push("/app/customize");
            }}
          />
        ) : (
          <Button variant="secondary" onClick={() => setCreating(true)}>
            + Add a pet
          </Button>
        )}
      </div>
    </Screen>
  );
}
