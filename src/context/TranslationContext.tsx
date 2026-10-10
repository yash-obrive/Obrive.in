"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { isValidLanguageCode } from "@/config/languages";
import { useCountry } from "@/context/CountryContext";

interface TranslationContextType {
  dictionary: Dictionary;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({
  children,
  dictionary: initialDictionary,
}: {
  children: ReactNode;
  dictionary: Dictionary;
}) {
  const countryContext = useCountry();
  const currentLanguage = countryContext?.language;
  const [currentDictionary, setCurrentDictionary] = useState<Dictionary>(initialDictionary);

  useEffect(() => {
    if (!currentLanguage || !isValidLanguageCode(currentLanguage)) return;
    let isMounted = true;
    getDictionary(currentLanguage).then((dict) => {
      if (isMounted) {
        setCurrentDictionary(dict);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currentLanguage]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = currentDictionary;
    for (const k of keys) {
      if (value && typeof value === "object" && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ dictionary: currentDictionary, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    // Fallback for non-localized routes (e.g. dashboard, company-info)
    return { dictionary: {} as Dictionary, t: (key: string) => key };
  }
  return context;
}

export function deepTranslate(data: unknown, t: (key: string) => string): unknown {
  if (typeof data === "string") {
    if (data.startsWith("/") || data.startsWith("http")) return data;
    if (data.length < 2) return data;
    // Skip likely internal ids or symbols
    if (/^[a-zA-Z0-9_-]+$/.test(data) && !data.includes(" ") && data.length < 15) return data;
    return t(data);
  }
  if (Array.isArray(data)) {
    return data.map((item) => deepTranslate(item, t));
  }
  if (data !== null && typeof data === "object") {
    const result: Record<string, unknown> = {};
    for (const key in data as Record<string, unknown>) {
      if (["id", "href", "url", "icon", "className", "slug", "date", "path", "author"].includes(key)) {
        result[key] = (data as Record<string, unknown>)[key];
      } else {
        result[key] = deepTranslate((data as Record<string, unknown>)[key], t);
      }
    }
    return result;
  }
  return data;
}
