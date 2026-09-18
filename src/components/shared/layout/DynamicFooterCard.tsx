"use client";

import { usePathname } from "next/navigation";
import { PRIMARY_FOOTER_CARD } from "@/constants/Footer";
import PrimaryFooterCard from "../cards/PrimaryFooterCard";

export default function DynamicFooterCard() {
  const pathname = usePathname();

  if (pathname === "/site-map") {
    return (
      <PrimaryFooterCard
        title="Have a project in mind?"
        description="Tell Obrive what you want to build and we’ll help identify the right technology, product or implementation path."
      />
    );
  }

  if (pathname.startsWith("/case-studies")) {
    return (
      <PrimaryFooterCard
        title="Start a Similar Project"
        description="Have a complex digital or immersive challenge? Obrive can take the project from discovery and experience strategy through design, development, deployment and continuous optimization."
        buttonText="Discuss Your Project"
      />
    );
  }

  if (pathname.startsWith("/blog")) {
    return (
      <PrimaryFooterCard
        title="Ready to Build the Future?"
        description="Obrive helps enterprises design, develop, and deploy immersive technology solutions that drive real business value."
        buttonText="Discuss Your Project"
      />
    );
  }

  if (pathname === "/contact") {
    // Hide footer card on contact page since they are already there
    return null;
  }

  return <PrimaryFooterCard {...PRIMARY_FOOTER_CARD} />;
}
