import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import CountrySwitcherBanner from "@/components/shared/layout/CountrySwitcherBanner";
import {
  COUNTRIES,
  type CountryCode,
  getCountryConfig,
  isValidCountryCode,
  SUPPORTED_COUNTRIES,
} from "@/config/countries";
import { CountryProvider } from "@/context/CountryContext";

export function generateStaticParams() {
  return SUPPORTED_COUNTRIES.map((code) => ({ country: code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  if (!isValidCountryCode(country)) {
    return {};
  }

  const config = getCountryConfig(country);

  const languageAlternates: Record<string, string> = {
    "x-default": "https://obrive.com/in",
  };
  for (const code of SUPPORTED_COUNTRIES) {
    languageAlternates[COUNTRIES[code].hreflang] = `https://obrive.com/${code}`;
  }

  return {
    title: {
      template: `%s | Obrive ${config.name}`,
      default: `Obrive ${config.name} | AR · VR · MR & Spatial Computing Solutions`,
    },
    alternates: {
      canonical: `https://obrive.com/${country}`,
      languages: languageAlternates,
    },
  };
}

export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  if (!isValidCountryCode(country)) {
    notFound();
  }

  const headerList = await headers();
  const suggestedCountry =
    (headerList.get("x-obrive-suggested-country") as CountryCode) || null;

  return (
    <CountryProvider
      initialCountry={country as CountryCode}
      initialSuggestedCountry={suggestedCountry}
    >
      <CountrySwitcherBanner />
      {children}
    </CountryProvider>
  );
}
