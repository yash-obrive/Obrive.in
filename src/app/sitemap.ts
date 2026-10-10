import type { MetadataRoute } from "next";
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


const baseUrl = "https://obrive.in";

type BasePath = { path: string; priority: number; changeFreq: any; };

async function getAllBasePaths(): Promise<BasePath[]> {
  const basePaths: BasePath[] = [];

  // Static
  ["", "/about", "/site-map", "/servicecharges", "/contact"].forEach(p => basePaths.push({ path: p, priority: p === "" ? 1.0 : 0.8, changeFreq: p === "" ? "weekly" : "monthly" }));

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
  legalSlugs.forEach(s => basePaths.push({ path: `/legal/${s}`, priority: 0.4, changeFreq: "yearly" }));

  // Support
  const supportSlugs = await getAllCompanyInfoSlugs("support");
  supportSlugs.forEach(s => basePaths.push({ path: `/support/${s}`, priority: 0.5, changeFreq: "monthly" }));

  return basePaths;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPaths = await getAllBasePaths();

  return allPaths.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority: priority,
  }));
}
