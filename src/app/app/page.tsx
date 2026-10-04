"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppState } from "@/components/app/state";

export default function AppEntry() {
  const router = useRouter();
  const { isAuthenticated, role, profile } = useAppState();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/app/login");
      return;
    }
    if (role === "client") {
      router.replace(profile?.address ? "/app/home" : "/app/onboarding/profile");
      return;
    }
    if (role) {
      router.replace(`/app/${role}`);
    }
  }, [isAuthenticated, role, profile, router]);

  return null;
}
