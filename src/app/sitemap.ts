import type { MetadataRoute } from "next";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getTranslationStatus } from "@/config/translations";
import type { LanguageCode } from "@/config/languages";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://obrive.com";

  // Filter only production-ready countries
  const activeCountries = SUPPORTED_COUNTRIES.filter(
    (code) => COUNTRIES[code].isProductionReady,
  );

  const makeAlternates = (subpath: string) => {
    const langs: Record<string, string> = {
      // The absolute fallback (x-default) points to the English India version
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

  function createLocalizedPages(paths: string[], priority: number, changeFreq: any) {
    const pages: MetadataRoute.Sitemap = [];
    for (const country of activeCountries) {
      const countryConf = COUNTRIES[country];
      for (const path of paths) {
        for (const lang of countryConf.supportedLanguages) {
          if (getTranslationStatus(country, lang, path) === "ready") {
            pages.push({
              url: `${baseUrl}/${country}/${lang}${path}`,
              lastModified: new Date(),
              changeFrequency: path === "" ? "weekly" : changeFreq,
              priority: path === "" ? 1.0 : priority,
              alternates: makeAlternates(path),
            });
          }
        }
      }
    }
    return pages;
  }

  // Country-specific static storefront pages
  const staticPaths = [
    "",
    "/about",
    "/site-map",
    "/servicecharges",
    "/contact",
    "/global",
  ];
  const localizedStaticPages = createLocalizedPages(staticPaths, 0.8, "monthly");

  // Product pages per country
  const productSlugs = getProductSlugs();
  const localizedProductPages = createLocalizedPages(productSlugs.map(s => `/products/${s}`), 0.9, "weekly");

  // Solution pages per country
  const solutionSlugs = getSolutionSlugs();
  const localizedSolutionPages = createLocalizedPages(solutionSlugs.map(s => `/services/${s}`), 0.9, "weekly");

  // Industries pages per country
  const industrySlugs = getIndustrySlugs();
  const localizedIndustryPages = createLocalizedPages(industrySlugs.map(s => `/industries/${s}`), 0.9, "weekly");

  // Use Cases pages per country
  const useCaseSlugs = getUseCaseSlugs();
  const localizedUseCasePages = createLocalizedPages(useCaseSlugs.map(s => `/use-cases/${s}`), 0.9, "weekly");

  // Technology pages per country
  const technologySlugs = getTechnologySlugs();
  const localizedTechnologyPages = createLocalizedPages(technologySlugs.map(s => `/technology/${s}`), 0.9, "weekly");

  // Case study/resource/blog pages per country
  const caseStudySlugs = await getAllCaseStudySlugs();
  const { getAllBlogs } = await import("@/lib/blogs");
  const { getAllCaseStudySlugs: getAllJsonCaseStudySlugs } = await import(
    "@/lib/case-studies"
  );
  const blogSlugs = getAllBlogs().map((b) => b.slug);
  const jsonCaseStudySlugs = getAllJsonCaseStudySlugs();
  const allResourceSlugs = [
    ...caseStudySlugs,
    ...blogSlugs,
    ...jsonCaseStudySlugs,
  ];
  const localizedCaseStudyPages = createLocalizedPages(allResourceSlugs.map(s => `/resources/${s}`), 0.7, "monthly");

  // FAQ pages per country
  const faqSlugs = await getAllFAQSlugs();
  const localizedFaqPages = createLocalizedPages(faqSlugs.map(s => `/faq/${s}`), 0.6, "monthly");

  // Global Legal & Support pages (from (company-info) route group)
  const legalSlugs = await getAllCompanyInfoSlugs("legal");
  const legalPages: MetadataRoute.Sitemap = legalSlugs.map((slug) => ({
    url: `${baseUrl}/legal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  const supportSlugs = await getAllCompanyInfoSlugs("support");
  const supportPages: MetadataRoute.Sitemap = supportSlugs.map((slug) => ({
    url: `${baseUrl}/support/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...localizedStaticPages,
    ...localizedProductPages,
    ...localizedSolutionPages,
    ...localizedIndustryPages,
    ...localizedUseCasePages,
    ...localizedTechnologyPages,
    ...localizedCaseStudyPages,
    ...localizedFaqPages,
    ...legalPages,
    ...supportPages,
  ];
}
