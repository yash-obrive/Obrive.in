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
import {
  type LanguageCode,
  isValidLanguageCode,
  getLanguageConfig,
} from "@/config/languages";
import { getLanguageForCity } from "@/components/pages/location/panIndiaData";

interface CountryContextType {
  country: CountryCode;
  countryConfig: CountryConfig;
  language: LanguageCode;
  suggestedCountry: CountryCode | null;
  isBannerDismissed: boolean;
  dismissBanner: () => void;
  switchCountry: (newCountry: CountryCode, preservePath?: boolean) => void;
  switchLanguage: (newLanguage: LanguageCode) => void;
  activeCity: string | null;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export interface CountryProviderProps {
  children: ReactNode;
  initialCountry?: CountryCode;
  initialLanguage?: LanguageCode;
  initialSuggestedCountry?: CountryCode | null;
  initialCity?: string | null;
}

export function CountryProvider({
  children,
  initialCountry = DEFAULT_COUNTRY,
  initialLanguage,
  initialSuggestedCountry = null,
  initialCity = null,
}: CountryProviderProps) {
  const _router = useRouter();
  const pathname = usePathname();

  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [language, setLanguage] = useState<LanguageCode>(
    initialLanguage || getCountryConfig(initialCountry).defaultLanguage
  );
  const [suggestedCountry] = useState<CountryCode | null>(
    initialSuggestedCountry,
  );
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(false);
  const [activeCity, setActiveCity] = useState<string | null>(initialCity || null);

  useEffect(() => {
    if (isValidCountryCode(initialCountry)) {
      setCountry(initialCountry);
    }
  }, [initialCountry]);

  useEffect(() => {
    if (initialCity) {
      setActiveCity(initialCity);
    }
  }, [initialCity]);

  useEffect(() => {
    if (isValidLanguageCode(initialLanguage)) {
      const segments = (pathname || "").split("/").filter(Boolean);
      // Don't override language when on a city route that already set it
      if (segments[0] === "location" && segments.length > 1 && activeCity === segments[1]) {
        return;
      }
      setLanguage(initialLanguage);
    }
  }, [initialLanguage, pathname, activeCity]);

  // Detect city from pathname and set language accordingly
  useEffect(() => {
    if (!pathname) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "location" && segments.length > 1) {
      const city = segments[1];
      if (city !== activeCity) {
        setActiveCity(city);
        if (typeof window !== "undefined") {
          try {
            sessionStorage.setItem("obrive_location_city", city);
          } catch {}
        }
        const cityLang = getLanguageForCity(city);
        setLanguage(cityLang);
      }
    } else if (segments[0] === "location" && segments.length === 1) {
      setActiveCity(null);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.removeItem("obrive_location_city");
          sessionStorage.removeItem("obrive_location_lang");
        } catch {}
      }
      setLanguage("en");
    } else if (!isValidCountryCode(segments[0]) && segments[0] !== undefined) {
      // Non-country, non-location routes: clear city and reset to English
      setActiveCity(null);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.removeItem("obrive_location_city");
          sessionStorage.removeItem("obrive_location_lang");
        } catch {}
      }
      if (!activeCity) {
        setLanguage("en");
      }
    }
  }, [pathname, activeCity]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const langConfig = getLanguageConfig(language);
      if (langConfig) {
        document.documentElement.lang = langConfig.code;
        document.documentElement.dir = langConfig.dir;
      }
    }
  }, [language, pathname]);

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
      document.cookie = `preferred_country=${country}; path=/; max-age=31536000; SameSite=Lax`;
    }
  };

  const switchCountry = (
    newCountry: CountryCode,
    preservePath: boolean = true,
  ) => {
    if (!isValidCountryCode(newCountry)) return;

    if (typeof document !== "undefined") {
      document.cookie = `preferred_country=${newCountry}; path=/; max-age=31536000; SameSite=Lax`;
    }

    setCountry(newCountry);
    dismissBanner();

    const newCountryConfig = getCountryConfig(newCountry);
    let targetLanguage = language;
    if (!newCountryConfig.supportedLanguages.includes(language)) {
      targetLanguage = newCountryConfig.defaultLanguage;
    }

    let currentPath = pathname || "/";
    const segments = currentPath.split("/").filter(Boolean);
    if (segments.length >= 2 && isValidCountryCode(segments[0]) && isValidLanguageCode(segments[1])) {
      currentPath = "/" + segments.slice(2).join("/");
    } else if (segments.length >= 1 && isValidCountryCode(segments[0])) {
      currentPath = "/" + segments.slice(1).join("/");
    }

    if (preservePath) {
      window.location.href = `/${newCountry}/${targetLanguage}${currentPath === "/" ? "" : currentPath}`;
    } else {
      window.location.href = `/${newCountry}/${targetLanguage}`;
    }
  };

  const switchLanguage = (newLanguage: LanguageCode) => {
    if (!isValidLanguageCode(newLanguage)) return;

    setLanguage(newLanguage);

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("obrive_location_lang", newLanguage);
      } catch {}
    }

    const currentPath = pathname || "/";
    const segments = currentPath.split("/").filter(Boolean);

    // On city routes (/location/[city]), stay on the same page and update language state dynamically
    if (segments[0] === "location" && segments.length > 1) {
      return;
    }

    let basePath = currentPath;
    if (segments.length >= 2 && isValidCountryCode(segments[0]) && isValidLanguageCode(segments[1])) {
      basePath = "/" + segments.slice(2).join("/");
    } else if (segments.length >= 1 && isValidCountryCode(segments[0])) {
      basePath = "/" + segments.slice(1).join("/");
    }

    window.location.href = `/${country}/${newLanguage}${basePath === "/" ? "" : basePath}`;
  };

  const countryConfig = getCountryConfig(country);

  return (
    <CountryContext.Provider
      value={{
        country,
        countryConfig,
        language,
        suggestedCountry,
        isBannerDismissed,
        dismissBanner,
        switchCountry,
        switchLanguage,
        activeCity,
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
      language: COUNTRIES[DEFAULT_COUNTRY].defaultLanguage,
      suggestedCountry: null,
      isBannerDismissed: true,
      dismissBanner: () => {},
      switchCountry: () => {},
      switchLanguage: () => {},
      activeCity: null,
    };
  }
  return context;
}
