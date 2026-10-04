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
  { name: "Meera Krishnan", pets: 1, plan: "Powerpaws", status: "active" },
  { name: "Arjun Varma", pets: 2, plan: "Big Dawg", status: "active" },
  { name: "Divya Shankar", pets: 1, plan: "Pawrfect", status: "active" },
  { name: "Karthik Iyer", pets: 1, plan: "Powerpaws", status: "active" },
  { name: "Sanjana Rao", pets: 1, plan: "Pawrfect", status: "paused" },
  { name: "Vikram Nair", pets: 1, plan: "Big Dawg", status: "active" },
  { name: "Priya Menon", pets: 2, plan: "Powerpaws", status: "active" },
];
