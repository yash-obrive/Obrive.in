// src/config/languages.ts

export type LanguageCode = "en";

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: { code: "en", name: "English", nativeName: "English", dir: "ltr" },
};

export function isValidLanguageCode(code?: string | null): code is LanguageCode {
  if (!code) return false;
  return Object.hasOwn(LANGUAGES, code.toLowerCase());
}

export function getLanguageConfig(code: LanguageCode): LanguageConfig {
  return LANGUAGES[code];
}
