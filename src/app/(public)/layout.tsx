import type { ReactNode } from "react";
import CookiePopup from "@/components/shared/cookies/cookies";
import PublicLayout from "@/components/shared/layout/PublicLayout";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicLayout>{children}</PublicLayout>
      <CookiePopup />
    </>
  );
}
