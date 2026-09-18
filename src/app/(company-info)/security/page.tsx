import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createCompanyInfoMDXComponents } from "@/components/pages/company-info/CompanyInfoMDXComponents";
import CompanyInfoTemplate from "@/components/pages/company-info/CompanyInfoTemplate";
import { getCompanyInfoBySlug, sharedMdxOptions } from "@/lib/mdx";

export default async function SecurityIndexPage() {
  const securityDoc = await getCompanyInfoBySlug("index", "security");

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
