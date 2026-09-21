"use client";

import { Globe, X } from "lucide-react";
import FONTS from "@/assets/fonts";
import { getCountryConfig } from "@/config/countries";
import { useCountry } from "@/context/CountryContext";

export default function CountrySwitcherBanner() {
  const {
    country,
    countryConfig,
    suggestedCountry,
    isBannerDismissed,
    dismissBanner,
    switchCountry,
  } = useCountry();

  if (!suggestedCountry || isBannerDismissed || suggestedCountry === country) {
    return null;
  }

  const suggestedConfig = getCountryConfig(suggestedCountry);

  return (
    <section
      aria-label="Regional website suggestion"
      className="bg-primary text-[#F4F9FD] border-b border-primary/20 px-4 py-2.5 sm:px-6 relative z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Globe className="w-4 h-4 text-accent shrink-0 hidden sm:inline-block" />
          <p>
            You are viewing <strong>Obrive {countryConfig.name}</strong>. Would
            you like to switch to our localized portal for{" "}
            <strong>{suggestedConfig.name}</strong>?
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => switchCountry(suggestedCountry)}
            className={`bg-[#eef7ff] text-primary hover:bg-white px-3 py-1 rounded-md font-medium text-xs transition-colors shadow-sm ${FONTS.microgrammaBold.className}`}
          >
            Switch to {suggestedConfig.name}
          </button>
          <button
            type="button"
            onClick={dismissBanner}
            aria-label="Dismiss banner and stay on current country"
            className="text-[#F4F9FD]/80 hover:text-white px-2 py-1 text-xs transition-colors flex items-center gap-1"
          >
            Stay on {countryConfig.name}
            <X className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
