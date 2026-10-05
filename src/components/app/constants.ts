export const DEMO_OTP = "111111";

export type UserRole = "client" | "kitchen" | "driver" | "supplier" | "admin";

export const DEMO_ACCOUNTS: { phone: string; role: UserRole; label: string }[] = [
  { phone: "9999999999", role: "client", label: "Pet parent" },
  { phone: "9999999991", role: "kitchen", label: "Kitchen staff" },
  { phone: "9999999992", role: "driver", label: "Delivery driver" },
  { phone: "9999999993", role: "supplier", label: "Supplier" },
  { phone: "9999999994", role: "admin", label: "Admin" },
];

export const DEMO_PHONE = DEMO_ACCOUNTS[0].phone;

export type ActivityLevel = "low" | "moderate" | "high";

export const ACTIVITY_LEVELS: { value: ActivityLevel; label: string; blurb: string }[] = [
  { value: "low", label: "Low", blurb: "Mostly naps and short walks" },
  { value: "moderate", label: "Moderate", blurb: "Daily walks and some play" },
  { value: "high", label: "High", blurb: "Runs, hikes, lots of energy" },
];

export const COMMON_ALLERGIES = ["Chicken", "Beef", "Peas", "Dairy", "Grain", "Fish"];

export type Pet = {
  id: string;
  name: string;
  breed: string | null;
  ageMonths: number | null;
  weightKg: number | null;
  activityLevel: ActivityLevel;
  allergies: string[];
};

export type BasePlan = {
  id: string;
  name: string;
  basePrice: number;
  totalWeightGrams: number;
  defaultChickenG: number;
  defaultVeggieG: number;
  defaultRiceG: number;
};

export const BASE_PLANS: BasePlan[] = [
  {
    id: "pawrfect",
    name: "Pawrfect",
    basePrice: 100,
    totalWeightGrams: 600,
    defaultChickenG: 300,
    defaultVeggieG: 100,
    defaultRiceG: 200,
  },
  {
    id: "powerpaws",
    name: "Powerpaws",
    basePrice: 150,
    totalWeightGrams: 1000,
    defaultChickenG: 500,
    defaultVeggieG: 250,
    defaultRiceG: 250,
  },
  {
    id: "big-dawg",
    name: "Big Dawg",
    basePrice: 200,
    totalWeightGrams: 2000,
    defaultChickenG: 800,
    defaultVeggieG: 300,
    defaultRiceG: 900,
  },
];

export type FulfillmentStatus = "PENDING" | "PREPPING" | "OUT_FOR_DELIVERY" | "DELIVERED";
export type SubscriptionStatus = "active" | "paused" | "cancelled";

export type Subscription = {
  id: string;
  petId: string;
  planId: string;
  customChickenG: number;
  customVeggieG: number;
  customRiceG: number;
  dailyPrice: number;
  status: SubscriptionStatus;
  todayStatus: FulfillmentStatus;
  skippedTomorrow: boolean;
};

export type Profile = {
  fullName: string;
  phone: string;
  address: string;
  walletBalance: number;
};

export type RawInventoryItem = {
  itemName: string;
  stockKg: number;
  reorderThresholdKg: number;
  costPerKg: number;
};

export type InventoryUsageEntry = {
  id: string;
  itemName: string;
  quantityKg: number;
  date: string;
};

export type AdminClient = {
  id: string;
  name: string;
  phone: string;
  plan: string;
  status: SubscriptionStatus;
  walletBalance: number;
  sinceMonths: number;
  pets: { name: string; breed: string; allergies: string[] }[];
};

export type FleetDriver = {
  id: string;
  name: string;
  vehicle: string;
  stopsToday: number;
  onTimePct: number;
  phone: string;
};

export type SupplierCatalogItem = {
  id: string;
  itemName: string;
  ratePerKg: number;
  unit: string;
  leadTimeDays: number;
};

export type DriverProfile = {
  name: string;
  phone: string;
  vehicle: string;
  vehicleType: string;
  rating: number;
  deliveriesCompleted: number;
  joinedMonthsAgo: number;
};

export type SupplierProfile = {
  businessName: string;
  contactName: string;
  phone: string;
  gstin: string;
  bankAccount: string;
  itemsSupplied: string[];
};
