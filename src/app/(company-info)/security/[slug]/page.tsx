import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createCompanyInfoMDXComponents } from "@/components/pages/company-info/CompanyInfoMDXComponents";
import CompanyInfoTemplate from "@/components/pages/company-info/CompanyInfoTemplate";
import { headers } from "next/headers";
import { type LanguageCode } from "@/config/languages";
import {
  getAllCompanyInfoSlugs,
  getCompanyInfoBySlug,
  sharedMdxOptions,
} from "@/lib/mdx";

interface SecurityPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllCompanyInfoSlugs("security");
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function SecurityPage({ params }: SecurityPageProps) {
  const headerList = await headers();
  const language = (headerList.get("x-obrive-language") as LanguageCode) || "en";

  const { slug } = await params;
  const securityDoc = await getCompanyInfoBySlug(slug, "security", language);

  if (!securityDoc) {
    notFound();
  }

  return (
    <CompanyInfoTemplate metadata={securityDoc.metadata} type="security">
      <MDXRemote
        source={securityDoc.content}
        components={createCompanyInfoMDXComponents(securityDoc.metadata)}
        options={sharedMdxOptions}
      />
    </CompanyInfoTemplate>
  );
}
