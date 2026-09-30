"use client";
import Translate from "@/components/shared/Translate";

import React, { useState } from "react";
import FONTS from "@/assets/fonts";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import { PRICING_STREAMS } from "@/constants/pages/pricingData";
import { useCountry } from "@/context/CountryContext";
import { useEffect } from "react";


const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  CNY: 7.24,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  BHD: 0.38,
  CHF: 0.90,
  SEK: 10.5,
  SGD: 1.35,
  AUD: 1.53,
  NZD: 1.66,
  JPY: 153.0,
  KRW: 1370.0,
  MYR: 4.7,
  IDR: 16000.0,
  THB: 37.0,
  ZAR: 18.5,
  MXN: 17.0,
  BRL: 5.1,
  CAD: 1.37,
};

export default function PricingSection() {
  const { countryConfig } = useCountry();
  const userCurrency = countryConfig?.currency || "USD";
  const userSymbol = countryConfig?.currencySymbol || "$";
  const hasLocalCurrency = userCurrency !== "USD" && userCurrency !== "INR"; // If it's INR, we treat it separately if needed, but wait, India is redirected. Let's just say != "USD"

  const [showUSD, setShowUSD] = useState(!hasLocalCurrency);
  const [hoveredPackageId, setHoveredPackageId] = useState<string | null>(null);

  useEffect(() => {
    setShowUSD(userCurrency === "USD");
  }, [userCurrency]);

  const formatCurrency = (pkg: any, useUSD: boolean) => {
    if (useUSD) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(pkg.priceUSD);
    }
    
    // If it's INR, use the hardcoded INR price.
    if (userCurrency === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(pkg.priceINR);
    }
    
    // Otherwise calculate dynamically from USD
    const rate = EXCHANGE_RATES[userCurrency] || 1;
    const localValue = pkg.priceUSD * rate;
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: userCurrency,
      maximumFractionDigits: 0,
    }).format(localValue);
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
                <Translate text="OBRIVE SERVICES" />
              </div>
              <h2
                className={`${FONTS.microgrammaBold.className} text-primary text-3xl sm:text-4xl lg:text-5xl mb-4`}
              >
                <Translate text="Choose your stream." />
              </h2>
              <p className="text-primary/70 text-lg leading-relaxed">
                <Translate text="Each package is a starting commercial scope. Final deliverables, timeline and payment amount are confirmed in the SOW before checkout." />
              </p>
            </div>
            <div className="flex bg-primary/5 p-1 rounded-full border border-primary/10">
              <button
                onClick={() => setShowUSD(false)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  !showUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                {userCurrency} {userSymbol}
              </button>
              <button
                onClick={() => setShowUSD(true)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  showUSD
                    ? "bg-primary text-white shadow-md"
                    : "text-primary/60 hover:text-primary"
                }`}
              >
                <Translate text="USD $" />
              </button>
            </div>
          </div>

          {/* Service Streams */}
          <div className="space-y-24">
            {PRICING_STREAMS.map((stream) => (
              <div key={stream.id}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-secondary font-bold text-lg">
                    {stream.number}
                  </div>
                  <h3
                    className={`${FONTS.microgrammaBold.className} text-primary text-2xl`}
                  >
                    {stream.title}
                  </h3>
                  <div className="hidden sm:block w-px h-6 bg-primary/20 mx-2" />
                  <div className="hidden md:flex flex-wrap items-center gap-2 text-primary/50 text-xs tracking-widest uppercase font-bold mt-2 sm:mt-0">
                    {stream.packages.map((pkg, i) => (
                      <React.Fragment key={pkg.id}>
                        <span
                          className={`cursor-pointer transition-colors ${hoveredPackageId === pkg.id ? "text-primary" : hoveredPackageId ? "opacity-40" : "hover:text-primary"}`}
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
                            : pkg.isRecommended ||
                                pkg.isPopular ||
                                pkg.isBestSeller
                              ? "border-primary/40 shadow-[0_8px_30px_rgb(0,0,0,0.08)] -translate-y-1"
                              : "border-primary/10 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1"
                        } relative overflow-hidden`}
                      >
                        {(pkg.isRecommended ||
                          pkg.isPopular ||
                          pkg.isBestSeller) && (
                          <div className="absolute top-0 end-0 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-es-lg">
                            {pkg.isRecommended
                              ? "Recommended"
                              : pkg.isPopular
                                ? "Popular"
                                : "Best Seller"}
                          </div>
                        )}

                        <div className="text-secondary text-xs font-extrabold tracking-widest uppercase mb-4 mt-2">
                          {pkg.category}
                        </div>
                        <h4
                          className={`${FONTS.microgrammaBold.className} text-primary text-xl mb-3`}
                        >
                          {pkg.name}
                        </h4>
                        <p className="text-primary/70 text-sm leading-relaxed mb-6 min-h-[60px]">
                          {pkg.description}
                        </p>

                        <div className="mb-6">
                          <div
                            suppressHydrationWarning
                            className={`${FONTS.microgrammaBold.className} text-primary text-3xl`}
                          >
                            {formatCurrency(pkg, showUSD)}
                            {pkg.isMonthly && (
                              <span className="text-base text-primary/50 font-sans ms-1">
                                /mo
                              </span>
                            )}
                          </div>
                          <div
                            suppressHydrationWarning
                            className="text-primary/50 text-xs mt-1"
                          >
                            ≈{" "}
                            {formatCurrency(pkg, !showUSD)}
                            {pkg.isMonthly && "/mo"}
                          </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow border-t border-primary/10 pt-6">
                          {pkg.features.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-start text-sm text-primary/80"
                            >
                              <span className="text-secondary me-2.5 font-bold mt-0.5">
                                •
                              </span>
                              <span className="leading-relaxed">
                                {feature.text}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto flex justify-center w-full">
                          <AnimatedButton
                            href={`/checkout?service=${pkg.id}`}
                            variant={
                              pkg.isRecommended ||
                              pkg.isPopular ||
                              pkg.isBestSeller
                                ? "default"
                                : "outline"
                            }
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
