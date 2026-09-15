"use client";

import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { FadeInOnView } from "@/components/shared/motion/GsapMotion";
import type { SolutionIndustriesContent } from "@/types/solutions";
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
                <div className="flex w-[804px] items-center justify-center gap-2.5 p-2.5 relative flex-[0_0_auto] max-lg:w-full max-lg:p-0">
                  <p className="relative w-[804px] mt-[-1.00px] ml-[-4.50px] mr-[-4.50px] font-normal text-base tracking-[1.00px] leading-7 max-lg:w-full max-lg:m-0 max-md:text-sm max-md:leading-6 max-sm:text-xs whitespace-pre-wrap text-zinc-700">
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
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 py-20 max-md:py-14">
          {industries.map((ind, i) => (
            <FadeInOnView key={ind.id} delay={i * 0.05}>
              <div className="flex flex-col gap-4 p-8 rounded-2xl border border-zinc-200 hover:border-primary/40 hover:shadow-lg transition-all h-full bg-white">
                <h3 className={`${FONTS.microgrammaBold.className} text-primary text-2xl max-md:text-xl`}>
                  {ind.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed tracking-wide">
                  {ind.description}
                </p>
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
        <FullWidthSection backgroundColor="primary">
          <div className="flex flex-col gap-20 py-24 max-md:py-16">
            
            {/* Technology Capabilities */}
            {technologyCapabilities && (
              <FadeInOnView>
                <div className="flex flex-col gap-8">
                  <div>
                    <h2 className={`${FONTS.microgrammaBold.className} text-white text-4xl max-md:text-3xl mb-4`}>
                      {technologyCapabilities.title}
                    </h2>
                    {technologyCapabilities.subtitle && (
                      <p className="text-white/80 text-lg max-w-3xl">
                        {technologyCapabilities.subtitle}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 mt-2">
                    {technologyCapabilities.items?.map((item, i) => (
                      <div key={i} className="flex items-center justify-center gap-2 px-3 py-1.5 border border-white/30 rounded-full bg-white/5 hover:bg-white/10 transition-colors max-w-full">
                        <span className="text-[11px] sm:text-xs text-white/90 leading-snug text-center break-words">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInOnView>
            )}

            {/* Global Delivery */}
            {globalDelivery && (
              <FadeInOnView>
                <div className="flex flex-col gap-8">
                  <div>
                    <h2 className={`${FONTS.microgrammaBold.className} text-white text-4xl max-md:text-3xl mb-4`}>
                      {globalDelivery.title}
                    </h2>
                    {globalDelivery.subtitle && (
                      <p className="text-white/80 text-lg max-w-3xl mb-4">
                        {globalDelivery.subtitle}
                      </p>
                    )}
                    {globalDelivery.description && (
                      <p className="text-white/70 text-base max-w-4xl leading-relaxed">
                        {globalDelivery.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 mt-2">
                    {globalDelivery.items?.map((item, i) => (
                      <div key={i} className="flex items-center justify-center gap-2 px-3 py-1.5 border border-white/30 rounded-full bg-white/5 hover:bg-white/10 transition-colors max-w-full">
                        <span className="text-[11px] sm:text-xs text-white/90 leading-snug text-center break-words">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInOnView>
            )}

          </div>
        </FullWidthSection>
      )}

      {/* ── FOOTER TEXT ─────────────────────────────────────────────── */}
      {footerText && (
        <FullWidthSection backgroundColor="none">
          <div className="py-16 max-md:py-10">
            <FadeInOnView>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-zinc-600 text-lg max-md:text-base leading-relaxed tracking-wide">
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
