import { type LanguageCode } from "@/config/languages";

export type Dictionary = Record<string, string>;

// Explicit mapping prevents arbitrary path resolution
const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default as Dictionary),
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default as Dictionary),
  es: () => import("@/dictionaries/es.json").then((module) => module.default as Dictionary),
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default as Dictionary),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default as Dictionary),
  de: () => import("@/dictionaries/de.json").then((module) => module.default as Dictionary),
  nl: () => import("@/dictionaries/nl.json").then((module) => module.default as Dictionary),
  sv: () => import("@/dictionaries/sv.json").then((module) => module.default as Dictionary),
  it: () => import("@/dictionaries/it.json").then((module) => module.default as Dictionary),
  zh: () => import("@/dictionaries/zh.json").then((module) => module.default as Dictionary),
  ja: () => import("@/dictionaries/ja.json").then((module) => module.default as Dictionary),
  ko: () => import("@/dictionaries/ko.json").then((module) => module.default as Dictionary),
  ms: () => import("@/dictionaries/ms.json").then((module) => module.default as Dictionary),
  id: () => import("@/dictionaries/id.json").then((module) => module.default as Dictionary),
  th: () => import("@/dictionaries/th.json").then((module) => module.default as Dictionary),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default as Dictionary),
  // Indian regional languages
  mr: () => import("@/dictionaries/mr.json").then((module) => module.default as Dictionary),
  kn: () => import("@/dictionaries/kn.json").then((module) => module.default as Dictionary),
  ta: () => import("@/dictionaries/ta.json").then((module) => module.default as Dictionary),
  te: () => import("@/dictionaries/te.json").then((module) => module.default as Dictionary),
  bn: () => import("@/dictionaries/bn.json").then((module) => module.default as Dictionary),
  gu: () => import("@/dictionaries/gu.json").then((module) => module.default as Dictionary),
  hi: () => import("@/dictionaries/hi.json").then((module) => module.default as Dictionary),
  pa: () => import("@/dictionaries/pa.json").then((module) => module.default as Dictionary),
  or: () => import("@/dictionaries/or.json").then((module) => module.default as Dictionary),
  ml: () => import("@/dictionaries/ml.json").then((module) => module.default as Dictionary),
  as: () => import("@/dictionaries/as.json").then((module) => module.default as Dictionary),
};

// Client-side cache to avoid redundant network requests for the same dictionary
const dictionaryCache = new Map<LanguageCode, Dictionary>();

export const getDictionary = async (locale: LanguageCode): Promise<Dictionary> => {
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!;
  }
  const loader = dictionaries[locale];
  if (!loader) {
    const enDict = await dictionaries.en();
    dictionaryCache.set("en", enDict);
    return enDict;
  }

  try {
    const dict = await loader();
    // STRICT VALIDATION: Return the localized dictionary exactly as-is.
    // Do NOT merge with 'en' to avoid silent English fallbacks in production.
    dictionaryCache.set(locale, dict as Dictionary);
    return dict as Dictionary;
  } catch (error) {
    // Safe fallback to English if chunk fails to load
    const enDict = await dictionaries.en();
    dictionaryCache.set("en", enDict);
    return enDict;
  }
};
