import React from "react";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import Link from "next/link";

export default function PricingHero() {
  return (
    <FullWidthSection className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white relative overflow-hidden">
      {/* Decorative background elements consistent with Obrive branding */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        <div className="lg:col-span-7">
          <div className="text-accent text-xs font-bold tracking-[0.14em] uppercase mb-6 inline-block bg-accent/5 px-4 py-2 rounded-full border border-accent/10">
            PRICING · PREMIUM DIGITAL DEVELOPMENT
          </div>
          
          <h1 className={`${FONTS.microgrammaBold.className} text-primary text-5xl sm:text-6xl md:text-7xl leading-[1.1] mb-6`}>
            Build what's next.<br />
            <span className="text-accent">Know the investment.</span>
          </h1>
          
          <p className="text-primary/70 text-lg md:text-xl leading-relaxed max-w-[600px] mb-10">
            Transparent starting prices for immersive experiences, digital products, software engineering and growth. Choose a stream, select a package and move into a clearly scoped engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#services"
              className="bg-accent text-white px-8 py-4 rounded-full font-bold text-center hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
            >
              Explore Services
            </Link>
            <Link
              href="/contact?intent=quote"
              className="bg-primary/5 text-primary border border-primary/10 px-8 py-4 rounded-full font-bold text-center hover:bg-primary/10 transition-colors"
            >
              Build My Scope
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          {/* Obrive aesthetic card for project range */}
          <div className="bg-gradient-to-br from-primary to-[#0f2e2a] text-white p-8 md:p-10 rounded-[32px] relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute -right-20 -top-20 w-64 h-64 border border-accent/30 rounded-full opacity-50" />
            <div className="absolute -right-10 -top-10 w-48 h-48 border border-accent/20 rounded-full opacity-50" />
            
            <div className="relative z-10">
              <div className="text-accent text-xs font-extrabold tracking-[0.15em] uppercase mb-4">
                PROJECT RANGE
              </div>
              <div className={`${FONTS.microgrammaBold.className} text-4xl sm:text-5xl md:text-6xl mb-6`}>
                ₹1L — ₹7L+
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-[280px]">
                Premium fixed packages for defined scopes. Enterprise, multi-platform and high-complexity projects move to a custom SOW.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FullWidthSection>
  );
}
