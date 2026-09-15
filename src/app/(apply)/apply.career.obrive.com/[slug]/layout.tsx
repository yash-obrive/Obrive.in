import Link from "next/link";
import type { ReactNode } from "react";
import PrimaryLogo from "@/components/shared/logo/PrimaryLogo";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="absolute top-6 left-24 hidden sm:block">
        <Link href="/">
          <PrimaryLogo />
        </Link>
      </div>
      {children}
    </>
  );
}
