"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { useCountry } from "@/context/CountryContext";
import {
  MARKETS_DATA,
  INDUSTRIES_DATA,
  SOLUTIONS_DATA,
  PRODUCTS_DATA,
  RESOURCES_DATA,
  ARCHITECTURE_MODEL,
  DEVELOPER_BRIEF_CARDS,
  MarketItem,
} from "./globalData";
import { Globe, ArrowUpRight, Search, Layers, Compass, Building2, Cpu, Package, BookOpen } from "lucide-react";

type RegionFilter = "all" | "India" | "Americas" | "Middle East" | "Europe" | "APAC" | "Africa";

export default function GlobalMarketExplorer() {
  const { country: currentCountry, switchCountry } = useCountry();
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filtered industries
  const filteredIndustries = useMemo(() => {
    return INDUSTRIES_DATA.filter((item) => {
      return (
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [normalizedQuery]);

  // Filtered solutions
  const filteredSolutions = useMemo(() => {
    return SOLUTIONS_DATA.filter((item) => {
      return (
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [normalizedQuery]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((item) => {
      return (
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [normalizedQuery]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      return (
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [normalizedQuery]);

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
    { label: "Countries", href: "#countries", icon: Globe, count: filteredMarkets.length },
    { label: "Industries", href: "#industries", icon: Building2, count: filteredIndustries.length },
    { label: "Solutions", href: "#solutions", icon: Cpu, count: filteredSolutions.length },
    { label: "Products", href: "#products", icon: Package, count: filteredProducts.length },
    { label: "Resources", href: "#resources", icon: BookOpen, count: filteredResources.length },
    { label: "Architecture", href: "#architecture", icon: Layers },
    { label: "Developer Brief", href: "#developer-brief", icon: Compass },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Obrive Layout Shell) */}
      <FullWidthSection backgroundColor="accent" className="py-12 sm:py-20 pt-28 sm:pt-36">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          {/* Obrive Eyebrow Kicker */}
          <div className="uppercase text-xs font-medium text-primary tracking-[0.16em]">
            Global Web Architecture
          </div>

          {/* Heading */}
          <h1
            className={`${FONTS.microgrammaBold.className} text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-balance`}
          >
            One Obrive.<br />Every Market.
          </h1>

          {/* Subtitle */}
          <p className="text-primary/80 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            A comprehensive, searchable global architecture connecting country → city → industry → solution → product → resource → lead across 26 priority international markets.
          </p>

          {/* Breadcrumb indicator */}
          <div className="text-xs text-primary/60 font-medium tracking-wide">
            <span>Home</span> <span className="mx-1">/</span> <span>Global</span> <span className="mx-1">/</span> <span className="text-primary font-semibold">Market Explorer</span>
          </div>
        </div>
      </FullWidthSection>

      {/* 2. Sticky Search, Region Filter & Quick Nav */}
      <div className="sticky top-[76px] z-20 bg-white/95 backdrop-blur-md border-b border-primary/10 py-4 max-md:top-[64px] transition-all">
        <FullWidthSection backgroundColor="none" className="py-0">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full md:flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                type="text"
                placeholder="Search “Bangalore”, “Automotive”, “AR Development”, “OBMOVE”…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-primary/20 text-primary text-sm pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-primary/50 transition-colors shadow-sm"
                aria-label="Search global architecture"
              />
            </div>

            {/* Region Dropdown & Region Chips */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as RegionFilter)}
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

          {/* SEO Architecture Callout Notice */}
          <div className="p-4 sm:p-5 rounded-[18px] bg-gradient-to-r from-primary/5 via-white to-primary/5 border border-primary/15 text-xs sm:text-sm text-primary/80 flex items-start gap-3.5 leading-relaxed">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0 mt-1.5" />
            <div>
              <strong className="text-secondary font-semibold">SEO & Routing Architecture Invariant:</strong> Every country storefront is a stable, crawlable URL (e.g. <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-mono text-xs">/in</code>, <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-mono text-xs">/us</code>, <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-mono text-xs">/ae</code>). Edge geo-IP detection provides a polite, non-blocking suggestion and never hides indexable localized content behind client-side geolocation.
            </div>
          </div>

          {/* Section 1: Global Country Explorer */}
          <section id="countries" className="scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="text-secondary text-[11px] font-extrabold tracking-[0.12em] uppercase mb-1">
                  Section 01
                </div>
                <h2 className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}>
                  Global Country Explorer
                </h2>
              </div>
              <p className="text-xs text-primary/60 font-medium self-start sm:self-auto">
                {filteredMarkets.length} markets shown • {MARKETS_DATA.length} total priority markets
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map((market) => (
                  <Link
                    key={market.code}
                    href={market.href}
                    onClick={() => switchCountry(market.code as any)}
                    className="group flex flex-col justify-between p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px] transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl" role="img" aria-label={market.name}>
                            {market.flag}
                          </span>
                          <span className={`${FONTS.microgrammaBold.className} text-primary text-base group-hover:text-secondary transition-colors`}>
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

                    <div className="flex items-center gap-2 pt-3 border-t border-primary/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-primary/5 px-2 py-0.5 rounded-md">
                        {market.region}
                      </span>
                      <span className="text-[10px] text-primary/50 font-mono">
                        {market.href}
                      </span>
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

          {/* Section 2: Industry Hubs */}
          <section id="industries" className="scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="text-secondary text-[11px] font-extrabold tracking-[0.12em] uppercase mb-1">
                  Section 02
                </div>
                <h2 className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}>
                  Industry Hubs
                </h2>
              </div>
              <p className="text-xs text-primary/60 font-medium">
                Reusable globally + localized by country and metropolitan hub
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIndustries.map((industry) => (
                <Link
                  key={industry.title}
                  href={`/${currentCountry}/industries/${industry.slug || ""}`}
                  className="group flex flex-col justify-between p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px] transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`${FONTS.microgrammaBold.className} text-primary text-base group-hover:text-secondary transition-colors`}>
                        {industry.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-primary/70 text-xs leading-relaxed mb-4">
                      {industry.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-primary/10">
                    {industry.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md border border-primary/10 text-primary/80 bg-primary/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Solutions & Technology */}
          <section id="solutions" className="scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="text-secondary text-[11px] font-extrabold tracking-[0.12em] uppercase mb-1">
                  Section 03
                </div>
                <h2 className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}>
                  Solutions & Technology
                </h2>
              </div>
              <p className="text-xs text-primary/60 font-medium">
                Technology capabilities connected to localized service offerings
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSolutions.map((solution) => (
                <Link
                  key={solution.title}
                  href={`/${currentCountry}/solutions/${solution.slug || ""}`}
                  className="group flex flex-col justify-between p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px] transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`${FONTS.microgrammaBold.className} text-primary text-base group-hover:text-secondary transition-colors`}>
                        {solution.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-primary/70 text-xs leading-relaxed mb-4">
                      {solution.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-primary/10">
                    {solution.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md border border-primary/10 text-primary/80 bg-primary/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 4: Obrive Products */}
          <section id="products" className="scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="text-secondary text-[11px] font-extrabold tracking-[0.12em] uppercase mb-1">
                  Section 04
                </div>
                <h2 className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}>
                  Obrive Products
                </h2>
              </div>
              <p className="text-xs text-primary/60 font-medium">
                Product entities connected to every localized market storefront
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.title}
                  href={`/${currentCountry}/products/${product.slug || ""}`}
                  className="group flex flex-col justify-between p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px] transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`${FONTS.microgrammaBold.className} text-primary text-lg group-hover:text-secondary transition-colors`}>
                        {product.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-primary/70 text-xs leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-primary/10">
                    {product.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md border border-primary/10 text-primary/80 bg-primary/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 5: Global Resource Engine */}
          <section id="resources" className="scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="text-secondary text-[11px] font-extrabold tracking-[0.12em] uppercase mb-1">
                  Section 05
                </div>
                <h2 className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}>
                  Global Resource Engine
                </h2>
              </div>
              <p className="text-xs text-primary/60 font-medium">
                SEO + AEO + GEO authority layer across all markets
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((res) => (
                <Link
                  key={res.title}
                  href={`/${currentCountry}/resources`}
                  className="group flex flex-col justify-between p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px] transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`${FONTS.microgrammaBold.className} text-primary text-base group-hover:text-secondary transition-colors`}>
                        {res.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-primary/70 text-xs leading-relaxed mb-4">
                      {res.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-primary/10">
                    {res.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md border border-primary/10 text-primary/80 bg-primary/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 6: Developer Architecture */}
          <section id="architecture" className="scroll-mt-36">
            <div className="mb-6">
              <div className="text-secondary text-[11px] font-extrabold tracking-[0.12em] uppercase mb-1">
                Section 06
              </div>
              <h2 className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}>
                Developer Architecture
              </h2>
              <p className="text-xs text-primary/60 font-medium mt-1">
                Recommended information routing and hierarchy model
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-white to-primary/5 border border-primary/15 rounded-[18px] shadow-sm">
              <h3 className={`${FONTS.microgrammaBold.className} text-primary text-lg sm:text-xl mb-3`}>
                {ARCHITECTURE_MODEL.title}
              </h3>
              <p className="text-primary/80 text-sm leading-relaxed mb-5">
                {ARCHITECTURE_MODEL.example}
              </p>
              <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-primary/10">
                {ARCHITECTURE_MODEL.tags.map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary/5 text-primary border border-primary/15">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 7: Developer Brief */}
          <section id="developer-brief" className="scroll-mt-36">
            <div className="mb-6">
              <div className="text-secondary text-[11px] font-extrabold tracking-[0.12em] uppercase mb-1">
                Section 07
              </div>
              <h2 className={`${FONTS.microgrammaBold.className} text-secondary text-2xl sm:text-3xl`}>
                Developer Brief
              </h2>
              <p className="text-xs text-primary/60 font-medium mt-1">
                Build once, localize at global scale
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEVELOPER_BRIEF_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col justify-between p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px]"
                >
                  <div>
                    <h3 className={`${FONTS.microgrammaBold.className} text-primary text-base mb-2`}>
                      {card.title}
                    </h3>
                    <p className="text-primary/70 text-xs leading-relaxed mb-4">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-primary/10">
                    {card.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md border border-primary/10 text-primary/80 bg-primary/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </FullWidthSection>
    </div>
  );
}
