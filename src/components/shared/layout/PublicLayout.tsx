import type { ReactNode } from "react";
import Footer from "@/components/shared/layout/Footer";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import NavBar from "@/components/shared/layout/NavBar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar backgroundColor="accent" />
      <main>{children}</main>
      <FullWidthSection backgroundColor="accent">
        <Footer />
      </FullWidthSection>
    </div>
  );
}
