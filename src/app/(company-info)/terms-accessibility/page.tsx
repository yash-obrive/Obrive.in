import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createCompanyInfoMDXComponents } from "@/components/pages/company-info/CompanyInfoMDXComponents";
import CompanyInfoTemplate from "@/components/pages/company-info/CompanyInfoTemplate";
import { getCompanyInfoBySlug } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Obrive Industries — Accessibility | Terms & Accessibility",
  description:
    "Review Obrive's commitment to making immersive platforms accessible to everyone. Learn about our inclusive design principles and accessibility standards.",
  keywords:
    "accessibility AR VR, inclusive design immersive technology, terms of accessibility XR, ADA compliance spatial computing",
  alternates: {
    canonical: "https://obrive.com/terms-accessibility",
  },
  openGraph: {
    type: "website",
    url: "https://obrive.com/terms-accessibility",
    title: "Obrive Industries — Accessibility",
    description:
      "Review Obrive's commitment to making immersive platforms accessible to everyone, including our inclusive design principles.",
    siteName: "Obrive",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Obrive Industries — Accessibility",
    description:
      "Read about Obrive's accessibility standards and inclusive immersive technologies.",
  },
};

export default async function TermsAccessibilityPage() {
  const legalDoc = await getCompanyInfoBySlug("accessibility", "legal");

  if (!legalDoc) {
    notFound();
  }

  return (
    <>
      <Script
        id="accessibility-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "WebPage",
          "@id": "https://obrive.com/terms-accessibility",
          url: "https://obrive.com/terms-accessibility",
          name: "Obrive Industries — Accessibility",
        })}
      </Script>

      <CompanyInfoTemplate metadata={legalDoc.metadata} type="legal">
        <MDXRemote
          source={legalDoc.content}
          components={createCompanyInfoMDXComponents(legalDoc.metadata)}
        />
      </CompanyInfoTemplate>
    </>
  );
}
