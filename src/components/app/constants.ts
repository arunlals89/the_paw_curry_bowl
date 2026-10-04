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
  frequency: "daily" | "weekly";
  customChickenG: number;
  customVeggieG: number;
  customRiceG: number;
  dailyPrice: number;
  status: SubscriptionStatus;
  todayStatus: FulfillmentStatus;
};

export type Profile = {
  fullName: string;
  phone: string;
  address: string;
  walletBalance: number;
};
