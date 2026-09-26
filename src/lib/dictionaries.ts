import "server-only";
import { type LanguageCode } from "@/config/languages";
import en from "@/dictionaries/en.json";

export type Dictionary = typeof en;

// Explicit mapping prevents arbitrary path resolution
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  hi: () => import("@/dictionaries/hi.json").then((module) => module.default),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  nl: () => import("@/dictionaries/nl.json").then((module) => module.default),
  sv: () => import("@/dictionaries/sv.json").then((module) => module.default),
  it: () => import("@/dictionaries/it.json").then((module) => module.default),
  zh: () => import("@/dictionaries/zh.json").then((module) => module.default),
  ja: () => import("@/dictionaries/ja.json").then((module) => module.default),
  ko: () => import("@/dictionaries/ko.json").then((module) => module.default),
  ms: () => import("@/dictionaries/ms.json").then((module) => module.default),
  id: () => import("@/dictionaries/id.json").then((module) => module.default),
  th: () => import("@/dictionaries/th.json").then((module) => module.default),
};

export const getDictionary = async (locale: LanguageCode): Promise<Dictionary> => {
  const loader = dictionaries[locale];
  if (!loader) {
    return dictionaries.en();
  }
  
  try {
    const dict = await loader();
    // In a real application, you might deep-merge with English fallback here
    // For this phase, all three JSON files have identical required keys
    // We will do a basic merge at the top level
    return { ...en, ...dict } as Dictionary;
  } catch (error) {
    // Safe fallback to English if chunk fails to load
    return dictionaries.en();
  }
};
