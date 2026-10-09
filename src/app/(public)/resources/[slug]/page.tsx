import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CASE_STUDIES_IMAGES } from "@/assets/images";
import BlogDetail from "@/components/pages/blogs/BlogDetail";
import CaseStudyDetail from "@/components/pages/case-studies/CaseStudyDetail";
import { createResourceMDXComponents } from "@/components/pages/resources/ResourceMDXComponents";
import ResourceTemplate from "@/components/pages/resources/ResourceTemplate";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import {
  getAllCaseStudySlugs as getAllJsonCaseStudySlugs,
  getCaseStudyBySlug as getJsonCaseStudyBySlug,
} from "@/lib/case-studies";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  sharedMdxOptions,
} from "@/lib/mdx";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

import { resolveResourceMetadata } from "@/lib/metadata-resolvers";

export async function generateMetadata(props: any): Promise<Metadata> {
  const { slug } = await props.params;
  const headersList = await import("next/headers").then(m => m.headers());
  const languageCode = headersList.get("x-obrive-language") || "en";
  return resolveResourceMetadata(slug, languageCode);
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const caseStudySlugs = await getAllCaseStudySlugs();
  const blogSlugs = getAllBlogs().map((b) => b.slug);
  const jsonCaseStudySlugs = getAllJsonCaseStudySlugs();
  const allSlugs = [...caseStudySlugs, ...blogSlugs, ...jsonCaseStudySlugs];
  return allSlugs.map((slug) => ({
    slug,
  }));
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const headersList = await headers();
  const languageCode = headersList.get("x-obrive-language") || "en";
  const resource = await getCaseStudyBySlug(slug, languageCode);

  if (!resource) {
    const blog = getBlogBySlug(slug);
    if (blog) {
      return <BlogDetail blog={blog} />;
    }
    const jsonCaseStudy = getJsonCaseStudyBySlug(slug);
    if (jsonCaseStudy) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: jsonCaseStudy.title,
        description: jsonCaseStudy.outcome_snapshot || jsonCaseStudy.overview,
        image: `https://obrive.in/images/case-studies/${jsonCaseStudy.image}`,
        author: {
          "@type": "Organization",
          name: "Obrive",
        },
        publisher: {
          "@type": "Organization",
          name: "Obrive",
          logo: {
            "@type": "ImageObject",
            url: "https://obrive.in/images/logo.png",
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
          <CaseStudyDetail caseStudy={jsonCaseStudy} />
        </>
      );
    }
    notFound();
  }

  const heroImageKey = resource.metadata
    .heroImage as keyof typeof CASE_STUDIES_IMAGES;
  const heroImage = CASE_STUDIES_IMAGES[heroImageKey];
  const heroImageSrc =
    typeof resource.metadata.heroImage === "string" &&
    resource.metadata.heroImage.startsWith("/")
      ? resource.metadata.heroImage
      : heroImage?.src || "/images/default-hero.png";

  const imageUrl = heroImageSrc.startsWith("http")
    ? heroImageSrc
    : `https://obrive.in${heroImageSrc}`;

  const pageTitle = resource.metadata.seoTitle || resource.metadata.title;
  const pageDescription =
    resource.metadata.seoDescription || resource.metadata.quote;

  // Specific case study metadata overrides if applicable
  const caseStudySchemas: Record<
    string,
    { name: string; headline: string; description: string }
  > = {
    "bringing-onboarding-to-life": {
      name: "Bringing Onboarding to Life with Immersive Spatial Computing",
      headline:
        "What used to take weeks now happens in days. Trainees recall protocols more reliably, and trainers stay in control from anywhere. What Obrive delivered isn't just technology it's transformation.",
      description:
        "From weeks to days: Learn how one company revolutionized onboarding with virtual reality and spatial computing. Measurable results from immersive training.",
    },
    "spatial-flow": {
      name: "Case Study",
      headline:
        "See how spatial computing replaced outdated field training methods with immersive 3D workflows. Real results: faster learning, fewer errors, seamless operations.",
      description:
        "See how spatial computing replaced outdated field training methods with immersive 3D workflows. Real results: faster learning, fewer errors, seamless operations.",
    },
    "ar-onboarding": {
      name: "AR Onboarding Success: How Augmented Reality Broke Training Barriers",
      headline:
        "Breaking Onboarding Barriers with Augmented Reality A First - Person Success Story In Their Own Words",
      description:
        "Discover how AR technology eliminated onboarding challenges and accelerated employee training. A real case study in augmented reality workplace transformation.",
    },
    "client-immersive-onboarding": {
      name: "Immersive Onboarding Case Study: Training That Feels Real",
      headline:
        "Immersive Onboarding That Feels Like Reality - Through the eyes of the client",
      description:
        "Learn how immersive 3D onboarding created realistic training experiences without real-world risks. See the results: better engagement and retention rates.",
    },
  };

  const isCaseStudy =
    resource.metadata.postType !== "BLOG" && slug in caseStudySchemas;
  const csOverride = caseStudySchemas[slug];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": isCaseStudy ? "Article" : "BlogPosting",
    "@id": `https://obrive.in/resources/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://obrive.in/resources/${slug}`,
      url: `https://obrive.in/resources/${slug}`,
    },
    name: csOverride ? csOverride.name : resource.metadata.title,
    headline: csOverride ? csOverride.headline : pageTitle,
    description: csOverride ? csOverride.description : pageDescription,
    image: imageUrl,
    datePublished: resource.metadata.date,
    author: {
      "@type": "Person",
      name: resource.metadata.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Obrive",
      url: "https://obrive.in",
      logo: {
        "@type": "ImageObject",
        url: "https://obrive.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobrive-logo.fb3eb1d9.svg&w=256&q=75",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://obrive.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://obrive.in/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: resource.metadata.title,
        item: `https://obrive.in/resources/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data: Article/BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Structured Data: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <ResourceTemplate metadata={resource.metadata} slug={slug}>
        <MDXRemote
          source={resource.content}
          components={createResourceMDXComponents(resource.metadata)}
          options={sharedMdxOptions}
        />
      </ResourceTemplate>
    </>
  );
}
