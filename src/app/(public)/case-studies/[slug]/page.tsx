import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/case-studies";
import CaseStudyDetail from "@/components/pages/case-studies/CaseStudyDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const title = `${caseStudy.title} | Obrive Case Study`;
  const description = caseStudy.outcome_snapshot || caseStudy.overview.slice(0, 155) + "...";

  return {
    title,
    description,
    alternates: {
      canonical: `https://obrive.com/case-studies/${caseStudy.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://obrive.com/case-studies/${caseStudy.slug}`,
      images: [
        {
          url: `https://obrive.com/images/case-studies/${caseStudy.image}`,
          alt: caseStudy.title,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params; const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.outcome_snapshot || caseStudy.overview,
    image: `https://obrive.com/images/case-studies/${caseStudy.image}`,
    author: {
      "@type": "Organization",
      name: "Obrive",
    },
    publisher: {
      "@type": "Organization",
      name: "Obrive",
      logo: {
        "@type": "ImageObject",
        url: "https://obrive.com/images/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <CaseStudyDetail caseStudy={caseStudy} />
    </>
  );
}
