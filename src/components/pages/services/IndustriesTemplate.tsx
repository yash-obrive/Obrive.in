"use client";

import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import type { SolutionIndustriesContent } from "@/types/services";
import React from "react";
import SolutionServiceSection from "./components/SolutionServiceSection";

export function IndustriesTemplate({
  hero,
  industries,
  footerText,
  globalDelivery,
  technologyCapabilities,
  extraBlocks,
}: SolutionIndustriesContent) {
  return (
    <div>
      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <FadeInOnView>
        <FullWidthSection backgroundColor="none">
          <div className="flex mt-40 items-center flex-col gap-26 max-xl:mt-32 max-lg:mt-28 max-md:mt-20 max-sm:mt-26 max-md:gap-16">
            <div className="w-4xl max-xl:w-full">
              <h1
                className={`${FONTS.microgrammaBold.className} text-center text-primary text-7xl max-xl:text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl`}
              >
                {hero.title}
              </h1>
            </div>
            
            <div className="flex w-full items-center justify-center p-2.5 relative max-lg:w-full max-lg:p-0">
              <div className="inline-flex flex-col items-center justify-center gap-2.5 pl-6 pr-[90px] pt-4 pb-6 relative flex-[0_0_auto] mt-[-1.00px] mb-[-1.00px] rounded-2xl border-[0.5px] border-solid border-primary/40 max-lg:w-full max-lg:px-6 max-lg:py-6 max-md:px-4 max-md:py-5 max-sm:px-3">
                <div className="flex w-full max-w-[804px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] max-lg:max-w-none max-lg:p-0">
                  <p className="relative w-full max-w-[804px] mt-[-1.00px] ml-[-4.50px] mr-[-4.50px] font-normal text-base tracking-[1.00px] leading-7 max-lg:max-w-none max-lg:m-0 max-md:text-sm max-md:leading-6 max-sm:text-xs whitespace-pre-wrap text-zinc-700">
                    {hero.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FullWidthSection>
      </FadeInOnView>

      {/* ── INDUSTRIES GRID ─────────────────────────────────────────────── */}
      <FullWidthSection backgroundColor="none">
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-x-12 gap-y-4 py-20 max-md:py-14">
          {industries.map((ind, i) => (
            <FadeInOnView key={ind.id} delay={i * 0.05}>
              <div className="group flex flex-col gap-3 py-6 px-6 hover:bg-zinc-50/80 border-l-[3px] border-transparent hover:border-primary hover:-translate-y-0.5 motion-reduce:transform-none transition-all duration-300 h-full rounded-r-xl">
                <div className="flex items-center gap-4 mb-1">
                  <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors flex-shrink-0"></div>
                  <h3 className={`${FONTS.microgrammaBold.className} text-primary text-[22px] max-md:text-xl`}>
                    {ind.title}
                  </h3>
                </div>
                <ul className="mt-2 flex flex-wrap gap-2 pl-6">
                  {ind.description
                    .split(/[,;]|\band\b/i)
                    .map((s) => s.trim().replace(/\.$/, ""))
                    .filter(Boolean)
                    .map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200/60 bg-white shadow-sm text-xs text-zinc-500 group-hover:border-primary/30 group-hover:text-zinc-700 transition-colors"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary"></div>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </FadeInOnView>
          ))}
        </div>
      </FullWidthSection>

      {/* ── EXTRA BLOCKS ─────────────────────────────────────────────── */}
      {extraBlocks && extraBlocks.length > 0 && (
        <FullWidthSection backgroundColor="none">
          <div className="flex flex-col gap-16 py-10">
            {extraBlocks.map((section, idx) => (
              <FadeInOnView key={section.id} delay={idx * 0.1}>
                <SolutionServiceSection {...section} />
              </FadeInOnView>
            ))}
          </div>
        </FullWidthSection>
      )}

      {/* ── CAPABILITIES & DELIVERY ────────────────────────────────────── */}
      {(technologyCapabilities || globalDelivery) && (
        <FullWidthSection backgroundColor="none">
          <div className="flex flex-col lg:flex-row gap-16 py-24 max-md:py-16 border-t border-zinc-200/60">
            
            {/* Technology Capabilities */}
            {technologyCapabilities && (
              <div className="flex-1 w-full">
                <FadeInOnView>
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className={`${FONTS.microgrammaBold.className} text-primary text-4xl max-md:text-3xl mb-4`}>
                        {technologyCapabilities.title}
                      </h2>
                      {technologyCapabilities.subtitle && (
                        <p className="text-zinc-600 text-lg max-w-3xl">
                          {technologyCapabilities.subtitle}
                        </p>
                      )}
                    </div>
                    
                    <ul className="flex flex-wrap gap-2.5 mt-2">
                      {technologyCapabilities.items?.map((item, i) => (
                        <li key={i} className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200/80 rounded-full bg-zinc-50/50 hover:bg-zinc-100/80 hover:border-primary/30 transition-colors max-w-full">
                          <span className="text-[11px] sm:text-xs text-zinc-600 font-medium leading-snug text-center break-words">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInOnView>
              </div>
            )}

            {/* Global Delivery */}
            {globalDelivery && (
              <div className="flex-1 w-full">
                <FadeInOnView>
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className={`${FONTS.microgrammaBold.className} text-primary text-4xl max-md:text-3xl mb-4`}>
                        {globalDelivery.title}
                      </h2>
                      {globalDelivery.subtitle && (
                        <p className="text-zinc-700 font-medium text-lg max-w-3xl mb-4">
                          {globalDelivery.subtitle}
                        </p>
                      )}
                      {globalDelivery.description && (
                        <p className="text-zinc-500 text-[15px] leading-relaxed max-w-4xl tracking-[0.3px]">
                          {globalDelivery.description}
                        </p>
                      )}
                    </div>
                    
                    <ul className="flex flex-wrap gap-2.5 mt-2">
                      {globalDelivery.items?.map((item, i) => (
                        <li key={i} className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200/80 rounded-full bg-zinc-50/50 hover:bg-zinc-100/80 hover:border-primary/30 transition-colors max-w-full">
                          <span className="text-[11px] sm:text-xs text-zinc-600 font-medium leading-snug text-center break-words">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInOnView>
              </div>
            )}

          </div>
        </FullWidthSection>
      )}

      {/* ── FOOTER TEXT ─────────────────────────────────────────────── */}
      {footerText && (
        <FullWidthSection backgroundColor="none">
          <div className="py-24 max-md:py-16">
            <FadeInOnView>
              <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                <div className="w-12 h-0.5 bg-primary/30 mb-8 rounded-full"></div>
                <p className="text-zinc-500 text-[17px] md:text-xl leading-[1.8] tracking-[0.5px]">
                  {footerText}
                </p>
              </div>
            </FadeInOnView>
          </div>
        </FullWidthSection>
      )}
    </div>
  );
}
