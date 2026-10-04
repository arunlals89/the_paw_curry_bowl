import type { FulfillmentStatus } from "./constants";

const STATUS_COPY: Record<FulfillmentStatus, { label: string; className: string }> = {
  PENDING: { label: "Order placed", className: "bg-black/5 text-bark-soft" },
  PREPPING: { label: "In the kitchen", className: "bg-paw-yellow-light text-[#9a7418]" },
  OUT_FOR_DELIVERY: { label: "Out for delivery", className: "bg-paw-blue-light text-paw-blue" },
  DELIVERED: { label: "Delivered", className: "bg-paw-green-light text-paw-green-dark" },
};

export function StatusPill({ status }: { status: FulfillmentStatus }) {
  const copy = STATUS_COPY[status];
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${copy.className}`}>
      {copy.label}
    </span>
  );
}
