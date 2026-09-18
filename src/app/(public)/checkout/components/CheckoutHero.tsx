import React from "react";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";

export default function CheckoutHero() {
  return (
    <FullWidthSection backgroundColor="accent" className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Decorative background elements consistent with Obrive branding */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto relative z-10 text-center">
        <h1 className={`${FONTS.microgrammaBold.className} text-secondary sm:leading-20 text-4xl sm:text-5xl md:text-6xl max-w-[90vw] sm:max-w-3xl md:max-w-4xl mx-auto break-words text-balance mb-6 uppercase`}>
          Secure Checkout
        </h1>
        
        <p className="text-base sm:text-md max-w-[600px] mx-auto font-medium text-secondary mb-4">
          Complete your details to initiate the project scope and begin the development process.
        </p>
      </div>
    </FullWidthSection>
  );
}
