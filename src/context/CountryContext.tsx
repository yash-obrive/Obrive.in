"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  COUNTRIES,
  type CountryCode,
  type CountryConfig,
  DEFAULT_COUNTRY,
  getCountryConfig,
  isValidCountryCode,
} from "@/config/countries";

interface CountryContextType {
  country: CountryCode;
  countryConfig: CountryConfig;
  suggestedCountry: CountryCode | null;
  isBannerDismissed: boolean;
  dismissBanner: () => void;
  switchCountry: (newCountry: CountryCode) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export interface CountryProviderProps {
  children: ReactNode;
  initialCountry?: CountryCode;
  initialSuggestedCountry?: CountryCode | null;
}

export function CountryProvider({
  children,
  initialCountry = DEFAULT_COUNTRY,
  initialSuggestedCountry = null,
}: CountryProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [suggestedCountry] = useState<CountryCode | null>(
    initialSuggestedCountry,
  );
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (isValidCountryCode(initialCountry)) {
      setCountry(initialCountry);
    }
  }, [initialCountry]);

  useEffect(() => {
    // Check if user previously dismissed banner
    if (typeof document !== "undefined") {
      const match = document.cookie.match(
        /(?:^|;\s*)dismissed_country_banner=([^;]+)/,
      );
      if (match && match[1] === "true") {
        setIsBannerDismissed(true);
      }
    }
  }, []);

  const dismissBanner = () => {
    setIsBannerDismissed(true);
    if (typeof document !== "undefined") {
      document.cookie =
        "dismissed_country_banner=true; path=/; max-age=2592000; SameSite=Lax";
    }
  };

  const switchCountry = (newCountry: CountryCode) => {
    if (!isValidCountryCode(newCountry)) return;

    // Set 1-year preference cookie
    if (typeof document !== "undefined") {
      document.cookie = `preferred_country=${newCountry}; path=/; max-age=31536000; SameSite=Lax`;
    }

    setCountry(newCountry);
    dismissBanner();

    // The user explicitly requested UI-only state updates for now,
    // since the /[country]/ routes do not exist yet in this branch.
    // router.push logic has been disabled.
  };

  const countryConfig = getCountryConfig(country);

  return (
    <CountryContext.Provider
      value={{
        country,
        countryConfig,
        suggestedCountry,
        isBannerDismissed,
        dismissBanner,
        switchCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry(): CountryContextType {
  const context = useContext(CountryContext);
  if (!context) {
    // Fallback when used outside provider
    return {
      country: DEFAULT_COUNTRY,
      countryConfig: COUNTRIES[DEFAULT_COUNTRY],
      suggestedCountry: null,
      isBannerDismissed: true,
      dismissBanner: () => {},
      switchCountry: () => {},
    };
  }
  return context;
}
