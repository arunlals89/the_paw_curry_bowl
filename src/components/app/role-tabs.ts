import {
  BoxIcon,
  CalendarIcon,
  GridIcon,
  ListIcon,
  TruckIcon,
  UserIcon,
} from "./icons";
import type { TabConfig } from "./TabBar";

export const ADMIN_TABS: TabConfig[] = [
  { href: "/app/admin", label: "Overview", Icon: GridIcon },
  { href: "/app/admin/orders", label: "Orders", Icon: ListIcon },
  { href: "/app/admin/clients", label: "Clients", Icon: UserIcon },
  { href: "/app/admin/fleet", label: "Fleet", Icon: TruckIcon },
  { href: "/app/admin/stock", label: "Stock", Icon: BoxIcon },
];

export const KITCHEN_TABS: TabConfig[] = [
  { href: "/app/kitchen", label: "Board", Icon: GridIcon },
  { href: "/app/kitchen/batch", label: "Batch", Icon: BoxIcon },
  { href: "/app/kitchen/alerts", label: "Alerts", Icon: ListIcon },
  { href: "/app/kitchen/stock", label: "Stock", Icon: TruckIcon },
];

export const DRIVER_TABS: TabConfig[] = [
  { href: "/app/driver", label: "Route", Icon: TruckIcon },
  { href: "/app/driver/earnings", label: "Earnings", Icon: GridIcon },
  { href: "/app/driver/history", label: "History", Icon: ListIcon },
  { href: "/app/driver/profile", label: "Profile", Icon: UserIcon },
];

export const SUPPLIER_TABS: TabConfig[] = [
  { href: "/app/supplier", label: "Orders", Icon: ListIcon },
  { href: "/app/supplier/invoices", label: "Invoices", Icon: BoxIcon },
  { href: "/app/supplier/catalog", label: "Catalog", Icon: CalendarIcon },
  { href: "/app/supplier/profile", label: "Profile", Icon: UserIcon },
];
