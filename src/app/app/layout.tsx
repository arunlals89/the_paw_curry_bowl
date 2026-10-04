import type { Metadata } from "next";

import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppStateProvider } from "@/components/app/state";

export const metadata: Metadata = {
  title: "The Paw Curry Bowl — App preview",
  description: "Interactive design preview of the Paw Curry Bowl client app.",
};

export default function AppPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <PhoneFrame>{children}</PhoneFrame>
    </AppStateProvider>
  );
}
