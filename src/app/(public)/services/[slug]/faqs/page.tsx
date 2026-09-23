import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import SolutionFAQSection from "@/components/pages/services/components/SolutionFAQSection";
import { getSolutionData, getSolutionSlugs } from "@/lib/services";

interface SolutionFAQsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getSolutionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SolutionFAQsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solutionData = getSolutionData(slug);

  if (!solutionData || !solutionData.faqs) {
    return {
      title: "Services FAQs | Obrive",
      description: "Frequently asked questions about Obrive services.",
    };
  }

  const title = solutionData.faqMeta?.title
    ? `${solutionData.faqMeta.title} | Obrive`
    : `${solutionData.hero.title} FAQs | Obrive`;

  const description =
    solutionData.faqMeta?.description ||
    `Find comprehensive answers to frequently asked questions about ${solutionData.hero.title} at Obrive.`;

  const canonicalUrl = `https://www.obrive.in/services/${slug}/faqs`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SolutionFAQsPage({
  params,
}: SolutionFAQsPageProps) {
  const { slug } = await params;
  const solutionData = getSolutionData(slug);

  if (!solutionData || !solutionData.faqs || solutionData.faqs.length === 0) {
    notFound();
  }

  return (
    <>
      <Script
        id={`${slug}-faq-schema`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: solutionData.faqs.flatMap((cat) =>
            cat.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer.replace(/<[^>]+>/g, ""),
              },
            })),
          ),
        })}
      </Script>

      <SolutionFAQSection
        title={solutionData.faqMeta?.title}
        description={solutionData.faqMeta?.description}
        categories={solutionData.faqs}
        serviceSlug={slug}
        serviceTitle={solutionData.hero.title}
      />
    </>
  );
}
