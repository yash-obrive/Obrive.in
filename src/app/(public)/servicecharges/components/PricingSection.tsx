"use client";

import React, { useState } from "react";
import FONTS from "@/assets/fonts";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { PRICING_STREAMS } from "@/constants/pages/pricingData";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function PricingSection() {
  const [isUSD, setIsUSD] = useState(false);
  const [hoveredPackageId, setHoveredPackageId] = useState<string | null>(null);

  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div id="services">
      <FullWidthSection className="py-20 bg-background">
        <div className="max-w-[1280px] mx-auto">
          {/* Header & Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="max-w-[760px]">
              <div className="uppercase text-xs font-medium text-primary mb-2">
                OBRIVE SERVICES
              </div>
              <h2 className={`${FONTS.microgrammaBold.className} text-primary text-3xl sm:text-4xl lg:text-5xl mb-4`}>
                Choose your stream.
              </h2>
              <p className="text-primary/70 text-lg leading-relaxed">
                Each package is a starting commercial scope. Final deliverables, timeline and payment amount are confirmed in the SOW before checkout.
              </p>
            </div>
            <div className="flex bg-primary/5 p-1 rounded-full border border-primary/10">
              <button
                onClick={() => setIsUSD(false)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  !isUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                INR ₹
              </button>
              <button
                onClick={() => setIsUSD(true)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  isUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                USD $
              </button>
            </div>
          </div>

          {/* Service Streams */}
          <div className="space-y-24">
            {PRICING_STREAMS.map((stream) => (
              <div key={stream.id}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-secondary font-bold text-lg">{stream.number}</div>
                  <h3 className={`${FONTS.microgrammaBold.className} text-primary text-2xl`}>
                    {stream.title}
                  </h3>
                  <div className="hidden sm:block w-px h-6 bg-primary/20 mx-2" />
                  <div className="hidden md:flex flex-wrap items-center gap-2 text-primary/50 text-xs tracking-widest uppercase font-bold mt-2 sm:mt-0">
                    {stream.packages.map((pkg, i) => (
                      <React.Fragment key={pkg.id}>
                        <span 
                          className={`cursor-pointer transition-colors ${hoveredPackageId === pkg.id ? "text-primary" : (hoveredPackageId ? "opacity-40" : "hover:text-primary")}`}
                          onMouseEnter={() => setHoveredPackageId(pkg.id)}
                          onMouseLeave={() => setHoveredPackageId(null)}
                        >
                          {pkg.name}
                        </span>
                        {i < stream.packages.length - 1 && <span>·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {stream.packages.map((pkg, index) => (
                    <FadeInOnView key={pkg.id} delay={index * 0.1}>
                      <div
                        className={`flex flex-col h-full bg-white rounded-2xl p-6 transition-all duration-300 border ${
                          hoveredPackageId && hoveredPackageId !== pkg.id
                            ? "opacity-20 scale-[0.98]"
                            : ""
                        } ${
                          hoveredPackageId === pkg.id
                            ? "border-primary/60 shadow-xl -translate-y-2"
                            : pkg.isRecommended || pkg.isPopular || pkg.isBestSeller
                            ? "border-primary/40 shadow-[0_8px_30px_rgb(0,0,0,0.08)] -translate-y-1"
                            : "border-primary/10 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1"
                        } relative overflow-hidden`}
                      >
                        {(pkg.isRecommended || pkg.isPopular || pkg.isBestSeller) && (
                          <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-bl-lg">
                            {pkg.isRecommended ? "Recommended" : pkg.isPopular ? "Popular" : "Best Seller"}
                          </div>
                        )}
                        
                        <div className="text-secondary text-xs font-extrabold tracking-widest uppercase mb-4 mt-2">
                          {pkg.category}
                        </div>
                        <h4 className={`${FONTS.microgrammaBold.className} text-primary text-xl mb-3`}>
                          {pkg.name}
                        </h4>
                        <p className="text-primary/70 text-sm leading-relaxed mb-6 min-h-[60px]">
                          {pkg.description}
                        </p>
                        
                        <div className="mb-6">
                          <div suppressHydrationWarning className={`${FONTS.microgrammaBold.className} text-primary text-3xl`}>
                            {isUSD ? formatUSD(pkg.priceUSD) : formatINR(pkg.priceINR)}
                            {pkg.isMonthly && <span className="text-base text-primary/50 font-sans ml-1">/mo</span>}
                          </div>
                          <div suppressHydrationWarning className="text-primary/50 text-xs mt-1">
                            ≈ {isUSD ? formatINR(pkg.priceINR) : formatUSD(pkg.priceUSD)}
                            {pkg.isMonthly && "/mo"}
                          </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow border-t border-primary/10 pt-6">
                          {pkg.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start text-sm text-primary/80">
                              <span className="text-secondary mr-2.5 font-bold mt-0.5">•</span>
                              <span className="leading-relaxed">{feature.text}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto flex justify-center w-full">
                          <AnimatedButton
                            href={`/checkout?service=${pkg.id}`}
                            variant={pkg.isRecommended || pkg.isPopular || pkg.isBestSeller ? "default" : "outline"}
                            className="px-8"
                          >
                            {pkg.ctaText}
                          </AnimatedButton>
                        </div>
                      </div>
                    </FadeInOnView>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FullWidthSection>
    </div>
  );
}
