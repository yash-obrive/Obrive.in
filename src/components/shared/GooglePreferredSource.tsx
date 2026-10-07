"use client";

/**
 * GooglePreferredSource
 *
 * Renders Google's official Preferred Sources widget container.
 * Google's publisher.js (loaded in root layout) initialises this div
 * into its own UI widget. If the widget is unavailable for a given
 * visitor or region, the div remains empty — no broken UI.
 *
 * Language:
 *   Reads Obrive's active language from CountryContext and passes it
 *   as data-lang so Google's widget uses the page language, not the
 *   browser default. Obrive language codes are ISO 639-1 and map
 *   directly to BCP-47 codes accepted by publisher.js.
 *   If the language code is absent or unrecognised, data-lang is
 *   omitted and Google falls back to the user's browser language.
 *
 * Eligibility note:
 *   This widget enables users to add obrive.com as a preferred source
 *   at the domain level. Whether Google recognises or displays Obrive
 *   in any experience is determined solely by Google.
 */

import React from "react";
import { useCountry } from "@/context/CountryContext";
import type { LanguageCode } from "@/config/languages";

/**
 * Obrive language codes that are valid BCP-47/ISO 639-1 codes
 * accepted by Google's publisher.js data-lang attribute.
 * Codes are identical to Obrive's LanguageCode values — no mapping needed.
 *
 * Codes intentionally supported: en, ar, es, pt, fr, de, nl, sv, it,
 * zh, ja, ko, ms, id, th, ru.
 *
 * If a future language code is added to Obrive that is not in this set,
 * the fallback (omitting data-lang) is safe — Google uses browser language.
 */
const GOOGLE_SUPPORTED_LANG_CODES = new Set<LanguageCode>([
  "en",
  "ar",
  "es",
  "pt",
  "fr",
  "de",
  "nl",
  "sv",
  "it",
  "zh",
  "ja",
  "ko",
  "ms",
  "id",
  "th",
  "ru",
]);

interface GooglePreferredSourceProps {
  /** Override theme for sections with dark backgrounds. Defaults to "light". */
  theme?: "light" | "dark";
}

export default function GooglePreferredSource({
  theme = "light",
}: GooglePreferredSourceProps) {
  const { language } = useCountry();

  // Only pass data-lang when the code is in our verified set.
  // Otherwise omit the attribute and let Google use browser language.
  const dataLang = GOOGLE_SUPPORTED_LANG_CODES.has(language)
    ? language
    : undefined;

  // Use React.createElement to safely pass the non-standard attribute
  // `google-add-preferred-source-btn` — JSX would strip or warn on unknown
  // boolean-looking attributes. This mirrors the ElevenLabsConvai.tsx pattern.
  return React.createElement("div", {
    "google-add-preferred-source-btn": "",
    "data-theme": theme,
    ...(dataLang ? { "data-lang": dataLang } : {}),
  });
}
