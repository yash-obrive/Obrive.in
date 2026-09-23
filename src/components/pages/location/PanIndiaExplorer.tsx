"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { CITIES_DATA } from "./panIndiaData";

type TierFilter = "all" | "Tier 1" | "Tier 2" | "Tier 3";

export default function PanIndiaExplorer() {
  const [searchQuery, _setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<TierFilter>("all");

  const normalizedQuery = searchQuery.toLowerCase().trim();

  // Filtered cities
  const filteredCities = useMemo(() => {
    return CITIES_DATA.filter((city) => {
      const matchesTier =
        selectedTier === "all" || city.tier === selectedTier;
      const matchesQuery =
        !normalizedQuery ||
        city.name.toLowerCase().includes(normalizedQuery) ||
        city.state.toLowerCase().includes(normalizedQuery);
      return matchesTier && matchesQuery;
    });
  }, [selectedTier, normalizedQuery]);

  const tierOptions: { label: string; value: TierFilter }[] = [
    { label: "All Tiers", value: "all" },
    { label: "Tier 1", value: "Tier 1" },
    { label: "Tier 2", value: "Tier 2" },
    { label: "Tier 3", value: "Tier 3" },
  ];

  const quickJumpNav = [
    {
      label: "Cities",
      href: "#cities",
      icon: MapPin,
      count: filteredCities.length,
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
            One India.
            <br />
            Every City.
          </h1>

          {/* Subtitle */}
          <p className="text-primary/80 text-base sm:text-lg max-w-3xl font-normal leading-relaxed text-balance">
            Obrive combines technological capabilities with location-specific
            experiences. Every city page is structured to connect local
            business needs with the right solutions, products, services,
            resources, and opportunities—creating a consistent Pan India
            experience without losing local relevance.
          </p>
        </div>
      </FullWidthSection>

      {/* 2. Sticky Search, Tier Filter & Quick Nav */}
      <div className="sticky top-[76px] z-20 bg-white/95 backdrop-blur-md border-b border-primary/10 py-4 max-md:top-[64px] transition-all">
        <FullWidthSection backgroundColor="none" className="py-0">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto">
            {/* Tier Dropdown & Quick Jump Nav */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <select
                value={selectedTier}
                onChange={(e) =>
                  setSelectedTier(e.target.value as TierFilter)
                }
                className="bg-white border border-primary/20 text-primary text-xs font-semibold px-3 py-2 rounded-xl outline-none focus:border-primary/50 cursor-pointer shadow-sm shrink-0"
                aria-label="Filter by tier"
              >
                {tierOptions.map((opt) => (
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
                    {item.label} ({item.count})
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
          {/* Section 1: Pan India City Explorer */}
          <section id="cities" className="scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <h2
                  className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}
                >
                  Pan India City Explorer
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/location/${city.slug}`}
                    className="group flex flex-col justify-between p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px] transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-primary/70">
                            <MapPin className="w-5 h-5" />
                          </span>
                          <span
                            className={`${FONTS.microgrammaBold.className} text-primary text-base group-hover:text-secondary transition-colors`}
                          >
                            {city.name}
                          </span>
                        </div>
                        <span className="text-primary/40 group-hover:text-primary transition-colors p-1">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <p className="text-primary/70 text-xs leading-relaxed line-clamp-1">
                          {city.state}
                        </p>
                        <span className="px-2 py-1 bg-primary/5 rounded-md text-[10px] font-semibold text-primary/60 uppercase tracking-wider">
                          {city.tier}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-primary/60 text-sm">
                  No cities match your current filter criteria.
                </div>
              )}
            </div>
          </section>
        </div>
      </FullWidthSection>
    </div>
  );
}
