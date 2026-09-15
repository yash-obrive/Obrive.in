import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createCompanyInfoMDXComponents } from "@/components/pages/company-info/CompanyInfoMDXComponents";
import CompanyInfoTemplate from "@/components/pages/company-info/CompanyInfoTemplate";
import { getAllCompanyInfoSlugs, getCompanyInfoBySlug } from "@/lib/mdx";

interface SecurityPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllCompanyInfoSlugs("security");
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function SecurityPage({ params }: SecurityPageProps) {
  const { slug } = params;
  const securityDoc = await getCompanyInfoBySlug(slug, "security");

  if (!securityDoc) {
    notFound();
  }

  return (
    <CompanyInfoTemplate metadata={securityDoc.metadata} type="security">
      <MDXRemote
        source={securityDoc.content}
        components={createCompanyInfoMDXComponents(securityDoc.metadata)}
      />
    </CompanyInfoTemplate>
  );
}
