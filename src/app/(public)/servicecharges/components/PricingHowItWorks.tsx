import React from "react";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";

export default function PricingHowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Select a service",
      description:
        "Choose a stream and package that matches the initial scope.",
    },
    {
      number: "02",
      title: "Confirm scope",
      description:
        "Obrive validates requirements and issues the final SOW, timeline and invoice.",
    },
    {
      number: "03",
      title: "Pay securely",
      description:
        "Customer pays through Razorpay; payment and invoice IDs are recorded.",
    },
    {
      number: "04",
      title: "Build & deliver",
      description:
        "Project enters delivery with milestones, reviews, QA and final handoff.",
    },
  ];

  return (
    <FullWidthSection className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <div className="uppercase text-xs font-medium text-primary mb-2">
            HOW IT WORKS
          </div>
          <h2
            className={`${FONTS.microgrammaBold.className} text-primary text-3xl sm:text-4xl lg:text-[38px] leading-tight`}
          >
            Simple. Secure. Structured.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-primary/5 border border-primary/10 rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="text-secondary text-lg font-bold mb-3">
                {step.number}
              </div>
              <h4
                className={`${FONTS.microgrammaBold.className} text-primary text-lg mb-2`}
              >
                {step.title}
              </h4>
              <p className="text-primary/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-primary/50 text-xs leading-relaxed mt-12 max-w-[1000px]">
          Prototype pricing is a proposed standard package list. Final pricing
          depends on scope, integrations, number of screens/assets, platforms,
          third-party licences, hosting/cloud costs and delivery requirements.
          GST and advertising spend are extra unless included in the signed
          proposal. USD figures are indicative at approximately ₹87/USD and
          should be recalculated at invoice time.
        </p>
      </div>
    </FullWidthSection>
  );
}
