import type { MetadataRoute } from "next";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getTranslationStatus } from "@/config/translations";
import { getIndustrySlugs } from "@/lib/industries";
import {
  getAllCaseStudySlugs,
  getAllCompanyInfoSlugs,
  getAllFAQSlugs,
} from "@/lib/mdx";
import { getProductSlugs } from "@/lib/products";
import { getSolutionSlugs } from "@/lib/services";
import { getTechnologySlugs } from "@/lib/technology";
import { getUseCaseSlugs } from "@/lib/use-cases";

const CHUNK_SIZE = 20;

const baseUrl = "https://obrive.in";

// Filter only production-ready countries
const activeCountries = SUPPORTED_COUNTRIES.filter(
  (code) => COUNTRIES[code].isProductionReady,
);

const makeAlternates = (subpath: string) => {
  const langs: Record<string, string> = {
    "x-default": `${baseUrl}/in/en${subpath}`,
  };
  for (const code of activeCountries) {
    const countryConf = COUNTRIES[code];
    const regionCode = countryConf.hreflang.split("-")[1] || code.toUpperCase();
    
    for (const lang of countryConf.supportedLanguages) {
      if (getTranslationStatus(code, lang, subpath) === "ready") {
        const hrefLangKey = `${lang}-${regionCode}`;
        langs[hrefLangKey] = `${baseUrl}/${code}/${lang}${subpath}`;
      }
    }
  }
  return { languages: langs };
};

type BasePath = { path: string; priority: number; changeFreq: any; isLegalOrSupport?: boolean };

async function getAllBasePaths(): Promise<BasePath[]> {
  const basePaths: BasePath[] = [];

  // Static
  ["", "/about", "/site-map", "/servicecharges", "/contact", "/global"].forEach(p => basePaths.push({ path: p, priority: p === "" ? 1.0 : 0.8, changeFreq: p === "" ? "weekly" : "monthly" }));

  // Products
  getProductSlugs().forEach(s => basePaths.push({ path: `/products/${s}`, priority: 0.9, changeFreq: "weekly" }));

  // Solutions
  getSolutionSlugs().forEach(s => basePaths.push({ path: `/services/${s}`, priority: 1.0, changeFreq: "weekly" }));

  // Industries
  getIndustrySlugs().forEach(s => basePaths.push({ path: `/industries/${s}`, priority: 0.9, changeFreq: "weekly" }));

  // Use Cases
  getUseCaseSlugs().forEach(s => basePaths.push({ path: `/use-cases/${s}`, priority: 0.9, changeFreq: "weekly" }));

  // Technology
  getTechnologySlugs().forEach(s => basePaths.push({ path: `/technology/${s}`, priority: 0.9, changeFreq: "weekly" }));

  // Resources
  const caseStudySlugs = await getAllCaseStudySlugs();
  const { getAllBlogs } = await import("@/lib/blogs");
  const { getAllCaseStudySlugs: getAllJsonCaseStudySlugs } = await import("@/lib/case-studies");
  const allResourceSlugs = [...caseStudySlugs, ...getAllBlogs().map(b => b.slug), ...getAllJsonCaseStudySlugs()];
  allResourceSlugs.forEach(s => basePaths.push({ path: `/resources/${s}`, priority: 0.7, changeFreq: "monthly" }));

  // FAQ
  const faqSlugs = await getAllFAQSlugs();
  faqSlugs.forEach(s => basePaths.push({ path: `/faq/${s}`, priority: 0.6, changeFreq: "monthly" }));

  // Legal
  const legalSlugs = await getAllCompanyInfoSlugs("legal");
  legalSlugs.forEach(s => basePaths.push({ path: `/legal/${s}`, priority: 0.4, changeFreq: "yearly", isLegalOrSupport: true }));

  // Support
  const supportSlugs = await getAllCompanyInfoSlugs("support");
  supportSlugs.forEach(s => basePaths.push({ path: `/support/${s}`, priority: 0.5, changeFreq: "monthly", isLegalOrSupport: true }));

  return basePaths;
}

export async function generateSitemaps() {
  const allPaths = await getAllBasePaths();
  const numChunks = Math.ceil(allPaths.length / CHUNK_SIZE);
  return Array.from({ length: numChunks }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const allPaths = await getAllBasePaths();
  const start = id * CHUNK_SIZE;
  const chunkPaths = allPaths.slice(start, start + CHUNK_SIZE);

  const pages: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFreq, isLegalOrSupport } of chunkPaths) {
    if (isLegalOrSupport) {
      pages.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority: priority,
      });
    } else {
      // Add the global/international route (e.g., https://obrive.in/)
      pages.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority: priority,
        alternates: makeAlternates(path),
      });

      // Add the localized routes (e.g., https://obrive.in/in/en/)
      for (const country of activeCountries) {
        const countryConf = COUNTRIES[country];
        for (const lang of countryConf.supportedLanguages) {
          if (getTranslationStatus(country, lang, path) === "ready") {
            pages.push({
              url: `${baseUrl}/${country}/${lang}${path}`,
              lastModified: new Date(),
              changeFrequency: changeFreq,
              priority: priority,
              alternates: makeAlternates(path),
            });
          }
        }
      }
    }
  }

  return pages;
}
