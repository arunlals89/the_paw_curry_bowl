"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEMO_ACCOUNTS, type Pet, type Profile, type Subscription, type SubscriptionStatus, type UserRole } from "./constants";

type AppState = {
  isAuthenticated: boolean;
  role: UserRole | null;
  profile: Profile | null;
  pets: Pet[];
  subscriptions: Subscription[];
};

const EMPTY_STATE: AppState = {
  isAuthenticated: false,
  role: null,
  profile: null,
  pets: [],
  subscriptions: [],
};

const STORAGE_KEY = "paw-curry-bowl-app-demo";

type AppContextValue = AppState & {
  signIn: (phone: string) => void;
  completeProfile: (data: { fullName: string; address: string }) => void;
  addPet: (pet: Omit<Pet, "id">) => void;
  addSubscription: (sub: Omit<Subscription, "id" | "todayStatus">) => void;
  setSubscriptionStatus: (id: string, status: SubscriptionStatus) => void;
  signOut: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from sessionStorage on mount
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write failures (private browsing etc.)
    }
  }, [state, hydrated]);

  const signIn = useCallback((phone: string) => {
    const role = DEMO_ACCOUNTS.find((account) => account.phone === phone)?.role ?? "client";
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      role,
      profile: { ...(prev.profile as Profile), phone, walletBalance: prev.profile?.walletBalance ?? 25 },
    }));
  }, []);

  const completeProfile = useCallback((data: { fullName: string; address: string }) => {
    setState((prev) => ({
      ...prev,
      profile: {
        fullName: data.fullName,
        address: data.address,
        phone: prev.profile?.phone ?? "",
        walletBalance: prev.profile?.walletBalance ?? 25,
      },
    }));
  }, []);

  const addPet = useCallback((pet: Omit<Pet, "id">) => {
    setState((prev) => ({
      ...prev,
      pets: [...prev.pets, { ...pet, id: `pet-${Date.now()}` }],
    }));
  }, []);

  const addSubscription = useCallback((sub: Omit<Subscription, "id" | "todayStatus">) => {
    setState((prev) => ({
      ...prev,
      subscriptions: [
        ...prev.subscriptions,
        { ...sub, id: `sub-${Date.now()}`, todayStatus: "PREPPING" },
      ],
    }));
  }, []);

  const setSubscriptionStatus = useCallback((id: string, status: SubscriptionStatus) => {
    setState((prev) => ({
      ...prev,
      subscriptions: prev.subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status } : sub
      ),
    }));
  }, []);

  const signOut = useCallback(() => {
    setState(EMPTY_STATE);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      signIn,
      completeProfile,
      addPet,
      addSubscription,
      setSubscriptionStatus,
      signOut,
    }),
    [state, signIn, completeProfile, addPet, addSubscription, setSubscriptionStatus, signOut]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
