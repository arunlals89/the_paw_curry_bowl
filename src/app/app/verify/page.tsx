"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Button } from "@/components/app/Button";
import { Screen } from "@/components/app/Screen";
import { TextField } from "@/components/app/TextField";
import { DEMO_OTP } from "@/components/app/constants";
import { useAppState } from "@/components/app/state";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") ?? "";
  const { signIn } = useAppState();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyOtp = () => {
    if (code.trim() !== DEMO_OTP) {
      setError(`Preview build — use the demo code ${DEMO_OTP}`);
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      signIn(phone);
      router.replace("/app");
    }, 350);
  };

  return (
    <Screen>
      <div className="flex h-full flex-col justify-between px-6 py-8">
        <div className="flex flex-col gap-7 pt-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-2xl text-bark">Enter your code</h1>
            <p className="text-sm text-bark-soft">We sent a 6-digit code to {phone}.</p>
          </div>

          <TextField
            label="Verification code"
            placeholder={DEMO_OTP}
            inputMode="numeric"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verifyOtp()}
            error={error ?? undefined}
          />
        </div>

        <Button onClick={verifyOtp} loading={loading}>
          Verify & continue
        </Button>
      </div>
    </Screen>
  );
}

export default function VerifyScreen() {
  return (
    <Suspense fallback={null}>
      <VerifyForm />
    </Suspense>
  );
}
