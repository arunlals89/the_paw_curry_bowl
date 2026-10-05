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

import {
  DEMO_ACCOUNTS,
  type AdminClient,
  type DriverProfile,
  type FleetDriver,
  type InventoryUsageEntry,
  type Pet,
  type Profile,
  type RawInventoryItem,
  type Subscription,
  type SubscriptionStatus,
  type SupplierCatalogItem,
  type SupplierProfile,
  type UserRole,
} from "./constants";
import {
  ADMIN_CLIENTS,
  ADMIN_DRIVERS,
  DRIVER_PROFILE,
  RAW_INVENTORY,
  SUPPLIER_CATALOG,
  SUPPLIER_PROFILE,
} from "./demo-data";

type AppState = {
  isAuthenticated: boolean;
  role: UserRole | null;
  profile: Profile | null;
  pets: Pet[];
  subscriptions: Subscription[];
  inventory: RawInventoryItem[];
  usageLog: InventoryUsageEntry[];
  clients: AdminClient[];
  drivers: FleetDriver[];
  catalog: SupplierCatalogItem[];
  driverProfile: DriverProfile;
  supplierProfile: SupplierProfile;
};

const EMPTY_STATE: AppState = {
  isAuthenticated: false,
  role: null,
  profile: null,
  pets: [],
  subscriptions: [],
  inventory: RAW_INVENTORY,
  usageLog: [],
  clients: ADMIN_CLIENTS,
  drivers: ADMIN_DRIVERS,
  catalog: SUPPLIER_CATALOG,
  driverProfile: DRIVER_PROFILE,
  supplierProfile: SUPPLIER_PROFILE,
};

const STORAGE_KEY = "paw-curry-bowl-app-demo";

type AppContextValue = AppState & {
  signIn: (phone: string) => void;
  completeProfile: (data: { fullName: string; address: string }) => void;
  addPet: (pet: Omit<Pet, "id">) => void;
  updatePet: (id: string, updates: Partial<Omit<Pet, "id">>) => void;
  removePet: (id: string) => void;
  addSubscription: (sub: Omit<Subscription, "id" | "todayStatus" | "skippedTomorrow">) => void;
  updateSubscription: (id: string, updates: Partial<Omit<Subscription, "id">>) => void;
  removeSubscription: (id: string) => void;
  setSubscriptionStatus: (id: string, status: SubscriptionStatus) => void;
  toggleSkipTomorrow: (id: string) => void;
  addFunds: (amount: number) => void;
  addInventoryItem: (item: RawInventoryItem) => void;
  updateInventoryItem: (itemName: string, updates: Partial<Omit<RawInventoryItem, "itemName">>) => void;
  removeInventoryItem: (itemName: string) => void;
  logInventoryUsage: (itemName: string, quantityKg: number) => void;
  addClient: (client: Omit<AdminClient, "id">) => void;
  updateClient: (id: string, updates: Partial<Omit<AdminClient, "id">>) => void;
  removeClient: (id: string) => void;
  addDriver: (driver: Omit<FleetDriver, "id">) => void;
  updateDriver: (id: string, updates: Partial<Omit<FleetDriver, "id">>) => void;
  removeDriver: (id: string) => void;
  addCatalogItem: (item: Omit<SupplierCatalogItem, "id">) => void;
  updateCatalogItem: (id: string, updates: Partial<Omit<SupplierCatalogItem, "id">>) => void;
  removeCatalogItem: (id: string) => void;
  updateDriverProfile: (updates: Partial<DriverProfile>) => void;
  updateSupplierProfile: (updates: Partial<SupplierProfile>) => void;
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

  const updatePet = useCallback((id: string, updates: Partial<Omit<Pet, "id">>) => {
    setState((prev) => ({
      ...prev,
      pets: prev.pets.map((pet) => (pet.id === id ? { ...pet, ...updates } : pet)),
    }));
  }, []);

  const removePet = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      pets: prev.pets.filter((pet) => pet.id !== id),
      subscriptions: prev.subscriptions.filter((sub) => sub.petId !== id),
    }));
  }, []);

  const addSubscription = useCallback(
    (sub: Omit<Subscription, "id" | "todayStatus" | "skippedTomorrow">) => {
      setState((prev) => ({
        ...prev,
        subscriptions: [
          ...prev.subscriptions,
          { ...sub, id: `sub-${Date.now()}`, todayStatus: "PREPPING", skippedTomorrow: false },
        ],
      }));
    },
    []
  );

  const updateSubscription = useCallback((id: string, updates: Partial<Omit<Subscription, "id">>) => {
    setState((prev) => ({
      ...prev,
      subscriptions: prev.subscriptions.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub)),
    }));
  }, []);

  const removeSubscription = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      subscriptions: prev.subscriptions.filter((sub) => sub.id !== id),
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

  const toggleSkipTomorrow = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      subscriptions: prev.subscriptions.map((sub) =>
        sub.id === id ? { ...sub, skippedTomorrow: !sub.skippedTomorrow } : sub
      ),
    }));
  }, []);

  const addFunds = useCallback((amount: number) => {
    setState((prev) => ({
      ...prev,
      profile: prev.profile
        ? { ...prev.profile, walletBalance: prev.profile.walletBalance + amount }
        : prev.profile,
    }));
  }, []);

  const signOut = useCallback(() => {
    setState(EMPTY_STATE);
  }, []);

  const addInventoryItem = useCallback((item: RawInventoryItem) => {
    setState((prev) => ({
      ...prev,
      inventory: [...prev.inventory, item],
    }));
  }, []);

  const updateInventoryItem = useCallback(
    (itemName: string, updates: Partial<Omit<RawInventoryItem, "itemName">>) => {
      setState((prev) => ({
        ...prev,
        inventory: prev.inventory.map((item) =>
          item.itemName === itemName ? { ...item, ...updates } : item
        ),
      }));
    },
    []
  );

  const removeInventoryItem = useCallback((itemName: string) => {
    setState((prev) => ({
      ...prev,
      inventory: prev.inventory.filter((item) => item.itemName !== itemName),
    }));
  }, []);

  const logInventoryUsage = useCallback((itemName: string, quantityKg: number) => {
    setState((prev) => ({
      ...prev,
      inventory: prev.inventory.map((item) =>
        item.itemName === itemName
          ? { ...item, stockKg: Math.max(0, item.stockKg - quantityKg) }
          : item
      ),
      usageLog: [
        { id: `usage-${Date.now()}`, itemName, quantityKg, date: new Date().toISOString().slice(0, 10) },
        ...prev.usageLog,
      ],
    }));
  }, []);

  const addClient = useCallback((client: Omit<AdminClient, "id">) => {
    setState((prev) => ({
      ...prev,
      clients: [...prev.clients, { ...client, id: `client-${Date.now()}` }],
    }));
  }, []);

  const updateClient = useCallback((id: string, updates: Partial<Omit<AdminClient, "id">>) => {
    setState((prev) => ({
      ...prev,
      clients: prev.clients.map((client) => (client.id === id ? { ...client, ...updates } : client)),
    }));
  }, []);

  const removeClient = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      clients: prev.clients.filter((client) => client.id !== id),
    }));
  }, []);

  const addDriver = useCallback((driver: Omit<FleetDriver, "id">) => {
    setState((prev) => ({
      ...prev,
      drivers: [...prev.drivers, { ...driver, id: `driver-${Date.now()}` }],
    }));
  }, []);

  const updateDriver = useCallback((id: string, updates: Partial<Omit<FleetDriver, "id">>) => {
    setState((prev) => ({
      ...prev,
      drivers: prev.drivers.map((driver) => (driver.id === id ? { ...driver, ...updates } : driver)),
    }));
  }, []);

  const removeDriver = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      drivers: prev.drivers.filter((driver) => driver.id !== id),
    }));
  }, []);

  const addCatalogItem = useCallback((item: Omit<SupplierCatalogItem, "id">) => {
    setState((prev) => ({
      ...prev,
      catalog: [...prev.catalog, { ...item, id: `catalog-${Date.now()}` }],
    }));
  }, []);

  const updateCatalogItem = useCallback(
    (id: string, updates: Partial<Omit<SupplierCatalogItem, "id">>) => {
      setState((prev) => ({
        ...prev,
        catalog: prev.catalog.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      }));
    },
    []
  );

  const removeCatalogItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      catalog: prev.catalog.filter((item) => item.id !== id),
    }));
  }, []);

  const updateDriverProfile = useCallback((updates: Partial<DriverProfile>) => {
    setState((prev) => ({
      ...prev,
      driverProfile: { ...prev.driverProfile, ...updates },
    }));
  }, []);

  const updateSupplierProfile = useCallback((updates: Partial<SupplierProfile>) => {
    setState((prev) => ({
      ...prev,
      supplierProfile: { ...prev.supplierProfile, ...updates },
    }));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      signIn,
      completeProfile,
      addPet,
      updatePet,
      removePet,
      addSubscription,
      updateSubscription,
      removeSubscription,
      setSubscriptionStatus,
      toggleSkipTomorrow,
      addFunds,
      addInventoryItem,
      updateInventoryItem,
      removeInventoryItem,
      logInventoryUsage,
      addClient,
      updateClient,
      removeClient,
      addDriver,
      updateDriver,
      removeDriver,
      addCatalogItem,
      updateCatalogItem,
      removeCatalogItem,
      updateDriverProfile,
      updateSupplierProfile,
      signOut,
    }),
    [
      state,
      signIn,
      completeProfile,
      addPet,
      updatePet,
      removePet,
      addSubscription,
      updateSubscription,
      removeSubscription,
      setSubscriptionStatus,
      toggleSkipTomorrow,
      addFunds,
      addInventoryItem,
      updateInventoryItem,
      removeInventoryItem,
      logInventoryUsage,
      addClient,
      updateClient,
      removeClient,
      addDriver,
      updateDriver,
      removeDriver,
      addCatalogItem,
      updateCatalogItem,
      removeCatalogItem,
      updateDriverProfile,
      updateSupplierProfile,
      signOut,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
