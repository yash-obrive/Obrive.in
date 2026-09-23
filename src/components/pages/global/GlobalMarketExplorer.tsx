"use client";

import { ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { useCountry } from "@/context/CountryContext";
import { MARKETS_DATA } from "./globalData";

type RegionFilter =
  | "all"
  | "India"
  | "Americas"
  | "Middle East"
  | "Europe"
  | "APAC"
  | "Africa";

export default function GlobalMarketExplorer() {
  const { country: currentCountry, switchCountry } = useCountry();
  const [searchQuery, _setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>("all");

  const normalizedQuery = searchQuery.toLowerCase().trim();

  // Filtered markets
  const filteredMarkets = useMemo(() => {
    return MARKETS_DATA.filter((market) => {
      const matchesRegion =
        selectedRegion === "all" || market.region === selectedRegion;
      const matchesQuery =
        !normalizedQuery ||
        market.name.toLowerCase().includes(normalizedQuery) ||
        market.cities.toLowerCase().includes(normalizedQuery) ||
        market.region.toLowerCase().includes(normalizedQuery) ||
        market.code.toLowerCase().includes(normalizedQuery);
      return matchesRegion && matchesQuery;
    });
  }, [selectedRegion, normalizedQuery]);

  const regionOptions: { label: string; value: RegionFilter }[] = [
    { label: "All Regions", value: "all" },
    { label: "India", value: "India" },
    { label: "Americas", value: "Americas" },
    { label: "Middle East", value: "Middle East" },
    { label: "Europe", value: "Europe" },
    { label: "APAC", value: "APAC" },
    { label: "Africa", value: "Africa" },
  ];

  const quickJumpNav = [
    {
      label: "Countries",
      href: "#countries",
      icon: Globe,
      count: filteredMarkets.length,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Obrive Layout Shell) */}
      <FullWidthSection
        backgroundColor="accent"
        className="py-12 sm:py-20 pt-28 sm:pt-36"
      >
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          {/* Heading */}
          <h1
            className={`${FONTS.microgrammaBold.className} text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-balance`}
          >
            One Obrive.
            <br />
            Every Market.
          </h1>

          {/* Subtitle */}
          <p className="text-primary/80 text-base sm:text-lg max-w-3xl font-normal leading-relaxed text-balance">
            Obrive combines global technology capabilities with market-specific
            experiences. Every market page is structured to connect local
            business needs with the right solutions, products, services,
            resources, and opportunities—creating a consistent global Obrive
            experience without losing local relevance.
          </p>
        </div>
      </FullWidthSection>

      {/* 2. Sticky Search, Region Filter & Quick Nav */}
      <div className="sticky top-[76px] z-20 bg-white/95 backdrop-blur-md border-b border-primary/10 py-4 max-md:top-[64px] transition-all">
        <FullWidthSection backgroundColor="none" className="py-0">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto">
            {/* Region Dropdown & Region Chips */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <select
                value={selectedRegion}
                onChange={(e) =>
                  setSelectedRegion(e.target.value as RegionFilter)
                }
                className="bg-white border border-primary/20 text-primary text-xs font-semibold px-3 py-2 rounded-xl outline-none focus:border-primary/50 cursor-pointer shadow-sm shrink-0"
                aria-label="Filter by geographic region"
              >
                {regionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Quick Jump Anchors */}
              <div className="hidden lg:flex items-center gap-1.5 border-l border-primary/15 pl-2 ml-1">
                {quickJumpNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-xs px-2.5 py-1.5 rounded-lg text-primary/70 hover:text-primary hover:bg-primary/5 transition-colors font-medium shrink-0"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FullWidthSection>
      </div>

      {/* Main Content Area */}
      <FullWidthSection backgroundColor="none" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {/* Section 1: Global Country Explorer */}
          <section id="countries" className="scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <h2
                  className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}
                >
                  Global Country Explorer
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map((market) => (
                  <Link
                    key={market.code}
                    href={market.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px] transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="text-2xl"
                            role="img"
                            aria-label={market.name}
                          >
                            {market.flag}
                          </span>
                          <span
                            className={`${FONTS.microgrammaBold.className} text-primary text-base group-hover:text-secondary transition-colors`}
                          >
                            {market.name}
                          </span>
                        </div>
                        <span className="text-primary/40 group-hover:text-primary transition-colors p-1">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>

                      <p className="text-primary/70 text-xs leading-relaxed line-clamp-3 mb-4">
                        {market.cities}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-primary/60 text-sm">
                  No country markets match your current filter criteria.
                </div>
              )}
            </div>
          </section>
        </div>
      </FullWidthSection>
    </div>
  );
}
