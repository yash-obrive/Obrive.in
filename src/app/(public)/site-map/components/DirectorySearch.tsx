"use client";
import Link from "@/components/shared/LocalizedLink";
import React, { useState } from "react";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import type { DirectoryCategory } from "../directoryData";

interface DirectorySearchProps {
  categories: DirectoryCategory[];
}

export default function DirectorySearch({ categories }: DirectorySearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.toLowerCase().trim();

  // Filter logic
  let visiblePagesCount = 0;
  const filteredCategories = categories
    .map((cat) => {
      const filteredEntries = cat.entries.filter((entry) => {
        const isMatch =
          !normalizedQuery || entry.searchKeywords.includes(normalizedQuery);
        if (isMatch) visiblePagesCount++;
        return isMatch;
      });
      return { ...cat, entries: filteredEntries };
    })
  return (
    <div className="w-full relative min-h-screen">
      {/* Sticky Search Bar */}
      <div className="sticky top-[76px] z-15 bg-white/90 backdrop-blur-md py-4 max-md:top-[64px]">
        <FullWidthSection backgroundColor="none" className="py-0">
          <div className="flex gap-2.5 items-center max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search the sitemap — e.g. augmented reality, automotive..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-[52px] bg-primary/5 border border-primary/20 rounded-full px-6 text-primary placeholder:text-primary/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all font-medium text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="h-[52px] px-6 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center shrink-0"
              >
                Clear
              </button>
            )}
          </div>
        </FullWidthSection>
      </div>

      {/* Directory Content */}
      <FullWidthSection backgroundColor="none" className="pt-2 pb-20">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <FadeInOnView key={category.id}>
                <section id={category.id} className="pt-8 mt-2 scroll-mt-32">
                  <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                    <div>
                      <div className="uppercase text-xs font-medium text-primary mb-2">
                        Directory
                      </div>
                      <h2
                        className={`${FONTS.microgrammaBold.className} text-secondary text-3xl sm:text-4xl m-0`}
                      >
                        {category.title}
                      </h2>
                    </div>
                    <p className="max-w-[550px] text-primary/70 text-sm sm:text-base m-0 pt-1">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.entries.map((entry) => (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col min-h-[165px] p-5 bg-gradient-to-br from-white to-primary/5 border border-primary/10 rounded-[18px] transition-all duration-200 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="text-secondary text-[11px] font-extrabold tracking-[0.1em]">
                          {entry.num}
                        </div>
                        <h3
                          className={`${FONTS.microgrammaBold.className} text-primary text-lg mt-[18px] mb-[7px]`}
                        >
                          {entry.title}
                        </h3>
                        <p className="text-primary/70 text-[13px] m-0 mb-auto leading-relaxed">
                          {entry.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              </FadeInOnView>
            ))
          ) : (
            <div className="py-20 text-center">
              <h3
                className={`${FONTS.microgrammaBold.className} text-primary text-2xl`}
              >
                No results found
              </h3>
              <p className="text-primary/70 mt-2">
                Try adjusting your search terms.
              </p>
            </div>
          )}
        </div>
      </FullWidthSection>
    </div>
  );
}
