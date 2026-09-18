import Link from "next/link";
import React from "react";
import PricingHero from "./components/PricingHero";
import PricingSection from "./components/PricingSection";

export const metadata = {
  title: "Pricing | Premium Digital Development | Obrive",
  description:
    "Transparent starting prices for immersive experiences, digital products, software engineering and growth. Choose a stream, select a package and move into a clearly scoped engagement.",
  alternates: {
    canonical: "https://www.obrive.in/servicecharges",
  },
  openGraph: {
    title: "Pricing | Premium Digital Development | Obrive",
    description:
      "Transparent starting prices for immersive experiences, digital products, software engineering and growth.",
    url: "https://www.obrive.in/servicecharges",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Premium Digital Development | Obrive",
    description: "Transparent starting prices for digital products & growth.",
  },
};

export default function PricingPage() {
  return (
    <main className="w-full bg-white overflow-hidden">
      <PricingHero />
      <PricingSection />

      {/* Payment Disclaimer */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 pt-6 pb-2">
        <p
          className="text-[10px] md:text-[11px] leading-[1.6] text-[#484848]"
          style={{ fontFamily: "var(--font-michroma)" }}
        >
          Payments made to Obrive are processed securely using trusted payment
          gateways. Project scopes, service packages, subscriptions, and other
          digital services must be paid according to the agreed milestones
          before project initiation or confirmation. Prices may vary depending
          on the specific project requirements, engagement duration, and
          applicable taxes. All payments are subject to successful authorization
          and confirmation.
        </p>
        <div className="mt-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="/images/Payment-icons-complete.svg"
            alt="Accepted payment methods"
            className="h-7 md:h-8 w-auto opacity-80"
          />
          <div
            className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 text-[10px] md:text-[11px] text-[#484848]"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            <Link
              href="/legal/refund-policy"
              className="hover:text-primary transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="/legal/gst-taxes-policy"
              className="hover:text-primary transition-colors"
            >
              GST & Taxes
            </Link>
            <Link
              href="/legal/service-policy"
              className="hover:text-primary transition-colors"
            >
              Services Policy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
