import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createCompanyInfoMDXComponents } from "@/components/pages/company-info/CompanyInfoMDXComponents";
import CompanyInfoTemplate from "@/components/pages/company-info/CompanyInfoTemplate";

export const metadata: Metadata = {
  title: "Documentation | Obrive Industries Private Limited",
  description: "Obrive Documentation covering our technology ecosystem, spatial computing, AR, VR, AI, digital twins, and developer resources.",
};

import { headers } from "next/headers";
import { type LanguageCode } from "@/config/languages";
import { notFound } from "next/navigation";
import { getCompanyInfoBySlug, sharedMdxOptions } from "@/lib/mdx";

export default async function DocsPage() {
  const headerList = await headers();
  const language = (headerList.get("x-obrive-language") as LanguageCode) || "en";

  const docsDoc = await getCompanyInfoBySlug("index", "docs", language);

  if (!docsDoc) {
    notFound();
  }

  const components = createCompanyInfoMDXComponents(docsDoc.metadata);

  return (
    <div className="bg-white min-h-screen">
      <CompanyInfoTemplate metadata={{ title: "Documentation" }} type="docs">
        <MDXRemote 
          source={docsDoc.content} 
          components={components} 
          options={sharedMdxOptions}
        />
      </CompanyInfoTemplate>
    </div>
  );
}
