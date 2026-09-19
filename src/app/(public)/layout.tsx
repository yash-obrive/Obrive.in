import type { ReactNode } from "react";
import CookiePopup from "@/components/shared/cookies/cookies";
import PublicLayout from "@/components/shared/layout/PublicLayout";

import { CountryProvider } from "@/context/CountryContext";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <CountryProvider>
      <PublicLayout>{children}</PublicLayout>
      <CookiePopup />
    </CountryProvider>
  );
}
