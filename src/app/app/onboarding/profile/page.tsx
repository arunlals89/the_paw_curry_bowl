"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/app/Button";
import { Screen } from "@/components/app/Screen";
import { StepHeader } from "@/components/app/StepHeader";
import { TextField } from "@/components/app/TextField";
import { LocationIcon } from "@/components/app/icons";
import { useAppState } from "@/components/app/state";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { completeProfile } = useAppState();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [locating, setLocating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      setError("Location isn't available in this browser.");
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setAddress(`Near ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
        setLocating(false);
      },
      () => {
        setError("Could not fetch your location. Enter your address manually.");
        setLocating(false);
      }
    );
  };

  const saveProfile = () => {
    if (!fullName.trim() || !address.trim()) {
      setError("Please fill in your name and address.");
      return;
    }
    setSaving(true);
    completeProfile({ fullName: fullName.trim(), address: address.trim() });
    setTimeout(() => {
      setSaving(false);
      router.push("/app/onboarding/pet");
    }, 250);
  };

  return (
    <Screen>
      <div className="flex h-full flex-col justify-between px-6 py-8">
        <div className="flex flex-col gap-6">
          <StepHeader
            step={1}
            totalSteps={2}
            title="Tell us about you"
            subtitle="We use your address to find your nearest kitchen and plan delivery routes."
          />

          <div className="flex flex-col gap-4">
            <TextField
              label="Full name"
              placeholder="Jordan Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              label="Delivery address"
              placeholder="123 Bark Street, Dogtown"
              multiline
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={error ?? undefined}
            />
            <Button variant="secondary" onClick={useCurrentLocation} loading={locating}>
              <span className="flex items-center gap-2">
                <LocationIcon size={16} />
                Use current location
              </span>
            </Button>
          </div>
        </div>

        <Button onClick={saveProfile} loading={saving}>
          Continue
        </Button>
      </div>
    </Screen>
  );
}
