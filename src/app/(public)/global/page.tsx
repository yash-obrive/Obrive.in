import type { Metadata } from "next";
import { headers } from "next/headers";
import GlobalMarketExplorer from "@/components/pages/global/GlobalMarketExplorer";
import {
  DEFAULT_COUNTRY,
  getCountryConfig,
  isValidCountryCode,
} from "@/config/countries";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const countryCode = headerList.get("x-obrive-country");
  const config = getCountryConfig(
    isValidCountryCode(countryCode) ? countryCode : DEFAULT_COUNTRY,
  );

  return {
    title: `Obrive Global — Country & Market Explorer (${config.name}) | One Obrive. Every Market.`,
    description: `Explore the global country and market explorer for Obrive across 26 international markets. Seamlessly connect country, city, industry, solution, product, and resource architectures for ${config.name}.`,
    openGraph: {
      title: `Obrive Global — Country & Market Explorer | One Obrive. Every Market.`,
      description: `Explore the global country and market explorer for Obrive across 26 international markets.`,
      type: "website",
      siteName: "Obrive",
    },
  };
}

export default function GlobalPage() {
  return <GlobalMarketExplorer />;
}
