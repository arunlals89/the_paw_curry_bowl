"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/app/Button";
import { TextField } from "@/components/app/TextField";
import { DEMO_ACCOUNTS, DEMO_OTP } from "@/components/app/constants";
import { basePath } from "@/lib/base-path";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = () => {
    const trimmed = phone.trim();
    if (!DEMO_ACCOUNTS.some((account) => account.phone === trimmed)) {
      setError("Preview build — use one of the demo numbers below");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/app/verify?phone=${trimmed}`);
    }, 350);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="relative h-[36%] w-full shrink-0 overflow-hidden">
        <Image
          src={`${basePath}/brand/gallery-4.jpg`}
          alt="A freshly packed bowl of The Paw Curry Bowl meal, chicken, veggies and rice"
          fill
          sizes="390px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-black/10" />
        <div className="absolute left-5 top-5 flex items-center gap-2.5 rounded-full bg-white/90 px-3 py-1.5 shadow-soft backdrop-blur">
          <Image
            src={`${basePath}/brand/logo.jpg`}
            alt="The Paw Curry Bowl"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-display text-sm text-paw-green-dark">The Paw Curry Bowl</span>
        </div>
      </div>

      <div className="no-scrollbar flex flex-1 flex-col justify-between overflow-y-auto px-6 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-[26px] leading-tight text-bark">
              Fresh meals,
              <br />
              happy pups.
            </h1>
            <p className="text-sm text-bark-soft">
              Sign in with your phone to open the app.
            </p>
          </div>

          <TextField
            label="Phone number"
            placeholder={DEMO_ACCOUNTS[0].phone}
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendOtp()}
            error={error ?? undefined}
          />

          <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-paw-orange/30 bg-paw-orange-light/40 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-paw-orange-dark">
              Preview logins — tap a number to fill it in
            </p>
            <div className="flex flex-col gap-1.5">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.phone}
                  onClick={() => {
                    setPhone(account.phone);
                    setError(null);
                  }}
                  className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 text-left transition hover:bg-white"
                >
                  <span className="text-sm font-semibold text-bark">{account.label}</span>
                  <span className="font-mono text-sm text-bark-soft">{account.phone}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-bark-soft/80">
              OTP for every account is <span className="font-mono font-bold">{DEMO_OTP}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={sendOtp} loading={loading}>
            Send code
          </Button>
          <p className="text-center text-[11px] text-bark-soft/70">
            Design preview — no real messages are sent.
          </p>
        </div>
      </div>
    </div>
  );
}
