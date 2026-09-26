"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionaries";

interface TranslationContextType {
  dictionary: Dictionary;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({
  children,
  dictionary,
}: {
  children: ReactNode;
  dictionary: Dictionary;
}) {
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = dictionary;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ dictionary, t }}>
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

export function deepTranslate(data: any, t: (key: string) => string): any {
  if (typeof data === 'string') {
    if (data.startsWith('/') || data.startsWith('http')) return data;
    if (data.length < 2) return data;
    // Skip likely internal ids or symbols
    if (/^[a-zA-Z0-9_-]+$/.test(data) && !data.includes(' ') && data.length < 15) return data;
    return t(data);
  }
  if (Array.isArray(data)) {
    return data.map(item => deepTranslate(item, t));
  }
  if (data !== null && typeof data === 'object') {
    const result: any = {};
    for (const key in data) {
      if (['id', 'href', 'url', 'icon', 'className', 'slug', 'date', 'path', 'author'].includes(key)) {
        result[key] = data[key];
      } else {
        result[key] = deepTranslate(data[key], t);
      }
    }
    return result;
  }
  return data;
}
