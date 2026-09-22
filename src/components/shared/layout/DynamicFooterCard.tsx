"use client";

import { usePathname } from "next/navigation";
import { PRIMARY_FOOTER_CARD } from "@/constants/Footer";
import PrimaryFooterCard from "../cards/PrimaryFooterCard";

export default function DynamicFooterCard() {
  const pathname = usePathname();

  if (pathname?.endsWith("/site-map")) {
    return (
      <PrimaryFooterCard
        title="Have a project in mind?"
        description="Tell Obrive what you want to build and we’ll help identify the right technology, product or implementation path."
      />
    );
  }

  if (pathname?.endsWith("/contact")) {
    // Hide footer card on contact page since they are already there
    return null;
  }

  if (
    pathname?.includes("/services/") &&
    !pathname.endsWith("/faqs") &&
    !pathname.endsWith("/industries")
  ) {
    return (
      <PrimaryFooterCard
        title="Have Questions?"
        description="Find answers to common questions about our services and our process."
        buttonText="Explore FAQs"
        buttonLink={`${pathname}/faqs`}
      />
    );
  }

  return <PrimaryFooterCard {...PRIMARY_FOOTER_CARD} />;
}
