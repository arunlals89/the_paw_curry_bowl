import type { FulfillmentStatus } from "./constants";

export type KitchenTicket = {
  id: string;
  clientName: string;
  petName: string;
  planName: string;
  chickenG: number;
  veggieG: number;
  riceG: number;
  exclusions: string[];
  status: FulfillmentStatus;
};

export const KITCHEN_TICKETS: KitchenTicket[] = [
  { id: "T-1042", clientName: "Meera Krishnan", petName: "Bruno", planName: "Powerpaws", chickenG: 500, veggieG: 250, riceG: 250, exclusions: ["Peas"], status: "PENDING" },
  { id: "T-1043", clientName: "Arjun Varma", petName: "Simba", planName: "Big Dawg", chickenG: 800, veggieG: 300, riceG: 900, exclusions: [], status: "PENDING" },
  { id: "T-1044", clientName: "Divya Shankar", petName: "Coco", planName: "Pawrfect", chickenG: 300, veggieG: 100, riceG: 200, exclusions: ["Grain"], status: "PENDING" },
  { id: "T-1038", clientName: "Karthik Iyer", petName: "Max", planName: "Powerpaws", chickenG: 500, veggieG: 250, riceG: 250, exclusions: [], status: "PREPPING" },
  { id: "T-1039", clientName: "Sanjana Rao", petName: "Luna", planName: "Pawrfect", chickenG: 300, veggieG: 100, riceG: 200, exclusions: ["Dairy", "Fish"], status: "PREPPING" },
  { id: "T-1035", clientName: "Vikram Nair", petName: "Rocky", planName: "Big Dawg", chickenG: 800, veggieG: 300, riceG: 900, exclusions: [], status: "OUT_FOR_DELIVERY" },
  { id: "T-1036", clientName: "Priya Menon", petName: "Daisy", planName: "Powerpaws", chickenG: 500, veggieG: 250, riceG: 250, exclusions: ["Beef"], status: "OUT_FOR_DELIVERY" },
  { id: "T-1030", clientName: "Rahul Desai", petName: "Tommy", planName: "Pawrfect", chickenG: 300, veggieG: 100, riceG: 200, exclusions: [], status: "DELIVERED" },
  { id: "T-1031", clientName: "Anita George", petName: "Bella", planName: "Big Dawg", chickenG: 800, veggieG: 300, riceG: 900, exclusions: ["Peas"], status: "DELIVERED" },
];

export type DriverStop = {
  id: string;
  sequence: number;
  clientName: string;
  petName: string;
  address: string;
  status: FulfillmentStatus;
};

export const DRIVER_STOPS: DriverStop[] = [
  { id: "T-1035", sequence: 1, clientName: "Vikram Nair", petName: "Rocky", address: "14 Race Course Rd, RS Puram, Coimbatore", status: "OUT_FOR_DELIVERY" },
  { id: "T-1036", sequence: 2, clientName: "Priya Menon", petName: "Daisy", address: "221 DB Road, RS Puram, Coimbatore", status: "OUT_FOR_DELIVERY" },
  { id: "T-1037", sequence: 3, clientName: "Suresh Pillai", petName: "Zeus", address: "9 Avinashi Rd, Peelamedu, Coimbatore", status: "PENDING" },
  { id: "T-1040", sequence: 4, clientName: "Lakshmi Narayan", petName: "Milo", address: "55 Trichy Rd, Singanallur, Coimbatore", status: "PENDING" },
  { id: "T-1030", sequence: 5, clientName: "Rahul Desai", petName: "Tommy", address: "3 Sathy Rd, Ganapathy, Coimbatore", status: "DELIVERED" },
  { id: "T-1031", sequence: 6, clientName: "Anita George", petName: "Bella", address: "77 Mettupalayam Rd, Coimbatore", status: "DELIVERED" },
];

export type PurchaseOrder = {
  id: string;
  itemName: string;
  quantityKg: number;
  status: "awaiting_delivery" | "delivered" | "invoice_pending";
  dueDate: string;
};

export const PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: "PO-2041", itemName: "Chicken mince", quantityKg: 80, status: "awaiting_delivery", dueDate: "Tomorrow, 7:00 AM" },
  { id: "PO-2040", itemName: "Mixed vegetables", quantityKg: 45, status: "awaiting_delivery", dueDate: "Tomorrow, 7:00 AM" },
  { id: "PO-2037", itemName: "Rice (raw)", quantityKg: 60, status: "invoice_pending", dueDate: "Delivered yesterday" },
  { id: "PO-2033", itemName: "Chicken mince", quantityKg: 80, status: "delivered", dueDate: "Delivered 3 days ago" },
  { id: "PO-2030", itemName: "Mixed vegetables", quantityKg: 45, status: "delivered", dueDate: "Delivered 4 days ago" },
];

export const RAW_INVENTORY = [
  { itemName: "Chicken mince", stockKg: 32, reorderThresholdKg: 40 },
  { itemName: "Mixed vegetables", stockKg: 18, reorderThresholdKg: 25 },
  { itemName: "Rice", stockKg: 54, reorderThresholdKg: 30 },
];

export const ADMIN_ANALYTICS = {
  todayRevenue: 18400,
  revenueChangePct: 12.5,
  activeOrders: 142,
  activeSubscriptions: 311,
  driverPerformance: [
    { name: "Vikram's route", onTimePct: 98 },
    { name: "Suresh's route", onTimePct: 94 },
    { name: "Lakshmi's route", onTimePct: 100 },
  ],
  revenueLast7Days: [12800, 14200, 13100, 15600, 16800, 17200, 18400],
};

export const ADMIN_CLIENTS = [
  {
    name: "Meera Krishnan",
    phone: "+91 98765 43210",
    plan: "Powerpaws",
    status: "active",
    walletBalance: 420,
    sinceMonths: 8,
    pets: [{ name: "Bruno", breed: "Labrador", allergies: ["Peas"] }],
  },
  {
    name: "Arjun Varma",
    phone: "+91 98765 11234",
    plan: "Big Dawg",
    status: "active",
    walletBalance: 180,
    sinceMonths: 14,
    pets: [
      { name: "Simba", breed: "Rottweiler", allergies: [] },
      { name: "Leo", breed: "Rottweiler", allergies: [] },
    ],
  },
  {
    name: "Divya Shankar",
    phone: "+91 90000 22334",
    plan: "Pawrfect",
    status: "active",
    walletBalance: 65,
    sinceMonths: 3,
    pets: [{ name: "Coco", breed: "Shih Tzu", allergies: ["Grain"] }],
  },
  {
    name: "Karthik Iyer",
    phone: "+91 98400 55667",
    plan: "Powerpaws",
    status: "active",
    walletBalance: 310,
    sinceMonths: 20,
    pets: [{ name: "Max", breed: "Beagle", allergies: [] }],
  },
  {
    name: "Sanjana Rao",
    phone: "+91 93456 77889",
    plan: "Pawrfect",
    status: "paused",
    walletBalance: 0,
    sinceMonths: 6,
    pets: [{ name: "Luna", breed: "Indie", allergies: ["Dairy", "Fish"] }],
  },
  {
    name: "Vikram Nair",
    phone: "+91 97890 12345",
    plan: "Big Dawg",
    status: "active",
    walletBalance: 540,
    sinceMonths: 11,
    pets: [{ name: "Rocky", breed: "German Shepherd", allergies: [] }],
  },
  {
    name: "Priya Menon",
    phone: "+91 96543 21098",
    plan: "Powerpaws",
    status: "active",
    walletBalance: 95,
    sinceMonths: 5,
    pets: [
      { name: "Daisy", breed: "Golden Retriever", allergies: ["Beef"] },
      { name: "Oreo", breed: "Pug", allergies: [] },
    ],
  },
  {
    name: "Rahul Desai",
    phone: "+91 99887 66554",
    plan: "Pawrfect",
    status: "active",
    walletBalance: 140,
    sinceMonths: 2,
    pets: [{ name: "Tommy", breed: "Indie", allergies: [] }],
  },
  {
    name: "Anita George",
    phone: "+91 90123 45678",
    plan: "Big Dawg",
    status: "cancelled",
    walletBalance: 0,
    sinceMonths: 9,
    pets: [{ name: "Bella", breed: "Boxer", allergies: ["Peas"] }],
  },
];

export const ADMIN_DRIVERS = [
  { name: "Vikram S.", vehicle: "TN 37 AB 4521 · Scooter", stopsToday: 2, onTimePct: 98, phone: "+91 98111 22334" },
  { name: "Suresh Pillai", vehicle: "TN 37 CD 7788 · Bike", stopsToday: 2, onTimePct: 94, phone: "+91 98222 33445" },
  { name: "Lakshmi N.", vehicle: "TN 37 EF 9012 · Scooter", stopsToday: 2, onTimePct: 100, phone: "+91 98333 44556" },
];

export const DRIVER_PROFILE = {
  name: "Vikram S.",
  phone: "+91 98111 22334",
  vehicle: "TN 37 AB 4521",
  vehicleType: "Scooter",
  rating: 4.9,
  deliveriesCompleted: 842,
  joinedMonthsAgo: 11,
};

export const DRIVER_EARNINGS = {
  todayEarnings: 420,
  todayDeliveries: 6,
  weekEarnings: 2850,
  weekDeliveries: 38,
  perDelivery: 60,
  incentive: 150,
  breakdown: [
    { label: "Delivery payouts", amount: 2700 },
    { label: "On-time bonus", amount: 150 },
  ],
  last7DaysEarnings: [380, 410, 395, 440, 420, 455, 420],
};

export type PastDelivery = {
  date: string;
  clientName: string;
  petName: string;
  earnings: number;
};

export const DRIVER_HISTORY: PastDelivery[] = [
  { date: "Today", clientName: "Rahul Desai", petName: "Tommy", earnings: 60 },
  { date: "Today", clientName: "Anita George", petName: "Bella", earnings: 60 },
  { date: "Yesterday", clientName: "Meera Krishnan", petName: "Bruno", earnings: 60 },
  { date: "Yesterday", clientName: "Karthik Iyer", petName: "Max", earnings: 60 },
  { date: "Yesterday", clientName: "Divya Shankar", petName: "Coco", earnings: 60 },
  { date: "2 days ago", clientName: "Priya Menon", petName: "Daisy", earnings: 60 },
  { date: "2 days ago", clientName: "Sanjana Rao", petName: "Luna", earnings: 60 },
];

export const SUPPLIER_PROFILE = {
  businessName: "Coimbatore Fresh Farms",
  contactName: "Ganesh Murthy",
  phone: "+91 90000 44556",
  gstin: "33AAFCC1234D1Z6",
  bankAccount: "HDFC •••• 7721",
  itemsSupplied: ["Chicken mince", "Mixed vegetables", "Rice"],
};

export type SupplierInvoice = {
  id: string;
  poId: string;
  amount: number;
  status: "paid" | "pending";
  date: string;
};

export const SUPPLIER_INVOICES: SupplierInvoice[] = [
  { id: "INV-514", poId: "PO-2037", amount: 4800, status: "pending", date: "Yesterday" },
  { id: "INV-510", poId: "PO-2033", amount: 6400, status: "paid", date: "3 days ago" },
  { id: "INV-507", poId: "PO-2030", amount: 3150, status: "paid", date: "4 days ago" },
  { id: "INV-501", poId: "PO-2019", amount: 6400, status: "paid", date: "1 week ago" },
];

export const SUPPLIER_CATALOG = [
  { itemName: "Chicken mince", ratePerKg: 220, unit: "kg", leadTimeDays: 1 },
  { itemName: "Mixed vegetables", ratePerKg: 70, unit: "kg", leadTimeDays: 1 },
  { itemName: "Rice (raw)", ratePerKg: 55, unit: "kg", leadTimeDays: 2 },
];
