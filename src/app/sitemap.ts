import type { MetadataRoute } from "next";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getIndustrySlugs } from "@/lib/industries";
import {
  getAllCaseStudySlugs,
  getAllCompanyInfoSlugs,
  getAllFAQSlugs,
} from "@/lib/mdx";
import { getProductSlugs } from "@/lib/products";
import { getSolutionSlugs } from "@/lib/solutions";
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
      "x-default": `${baseUrl}/in${subpath}`,
    };
    for (const code of activeCountries) {
      langs[COUNTRIES[code].hreflang] = `${baseUrl}/${code}${subpath}`;
    }
    return { languages: langs };
  };

  // Country-specific static storefront pages
  const staticPaths = [
    "",
    "/about",
    "/site-map",
    "/servicecharges",
    "/contact",
  ];
  const localizedStaticPages: MetadataRoute.Sitemap = activeCountries.flatMap(
    (country) =>
      staticPaths.map((path) => ({
        url: `${baseUrl}/${country}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : 0.8,
        alternates: makeAlternates(path),
      })),
  );

  // Product pages per country
  const productSlugs = getProductSlugs();
  const localizedProductPages: MetadataRoute.Sitemap = activeCountries.flatMap(
    (country) =>
      productSlugs.map((slug) => ({
        url: `${baseUrl}/${country}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: makeAlternates(`/products/${slug}`),
      })),
  );

  // Solution pages per country
  const solutionSlugs = getSolutionSlugs();
  const localizedSolutionPages: MetadataRoute.Sitemap = activeCountries.flatMap(
    (country) =>
      solutionSlugs.map((slug) => ({
        url: `${baseUrl}/${country}/solutions/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: makeAlternates(`/solutions/${slug}`),
      })),
  );

  // Industries pages per country
  const blockedIndustrySlugs = new Set([
    "retail",
    "healthcare",
    "manufacturing",
    "architecture-engineering",
    "education",
    "enterprise",
  ]);
  const industrySlugs = getIndustrySlugs().filter(
    (slug) => !blockedIndustrySlugs.has(slug),
  );
  const localizedIndustryPages: MetadataRoute.Sitemap = activeCountries.flatMap(
    (country) =>
      industrySlugs.map((slug) => ({
        url: `${baseUrl}/${country}/industries/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: makeAlternates(`/industries/${slug}`),
      })),
  );

  // Use Cases pages per country
  const blockedUseCaseSlugs = new Set([
    "3d-product-configuration",
    "digital-twins",
    "remote-assistance",
  ]);
  const useCaseSlugs = getUseCaseSlugs().filter(
    (slug) => !blockedUseCaseSlugs.has(slug),
  );
  const localizedUseCasePages: MetadataRoute.Sitemap = activeCountries.flatMap(
    (country) =>
      useCaseSlugs.map((slug) => ({
        url: `${baseUrl}/${country}/use-cases/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: makeAlternates(`/use-cases/${slug}`),
      })),
  );

  // Technology pages per country
  const blockedTechnologySlugs = new Set([
    "mixed-reality",
    "extended-reality",
    "digital-twins",
    "ai-immersive-technology",
  ]);
  const technologySlugs = getTechnologySlugs().filter(
    (slug) => !blockedTechnologySlugs.has(slug),
  );
  const localizedTechnologyPages: MetadataRoute.Sitemap =
    activeCountries.flatMap((country) =>
      technologySlugs.map((slug) => ({
        url: `${baseUrl}/${country}/technology/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: makeAlternates(`/technology/${slug}`),
      })),
    );

  // Case study/resource pages per country
  const caseStudySlugs = await getAllCaseStudySlugs();
  const localizedCaseStudyPages: MetadataRoute.Sitemap =
    activeCountries.flatMap((country) =>
      caseStudySlugs.map((slug) => ({
        url: `${baseUrl}/${country}/resources/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: makeAlternates(`/resources/${slug}`),
      })),
    );

  // FAQ pages per country
  const faqSlugs = await getAllFAQSlugs();
  const localizedFaqPages: MetadataRoute.Sitemap = activeCountries.flatMap(
    (country) =>
      faqSlugs.map((slug) => ({
        url: `${baseUrl}/${country}/faq/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: makeAlternates(`/faq/${slug}`),
      })),
  );

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
