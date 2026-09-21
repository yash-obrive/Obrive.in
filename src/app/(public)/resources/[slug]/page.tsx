import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/mdx";
import ResourceTemplate from "@/components/pages/resources/ResourceTemplate";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { createResourceMDXComponents } from "@/components/pages/resources/ResourceMDXComponents";
import { Metadata } from "next";
import { CASE_STUDIES_IMAGES } from "@/assets/images";
import Script from "next/script";

interface ResourcePageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = params;
  const resource = await getCaseStudyBySlug(slug);

  if (!resource) {
    return {
      title: "Resource Not Found | Obrive",
      description:
        "The requested resource could not be found. Explore our other case studies and resources.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const heroImage = CASE_STUDIES_IMAGES[resource.metadata.heroImage];
  // ensure absolute URL for social media images
  const imageUrl = heroImage?.src.startsWith("http")
    ? heroImage.src
    : `https://www.obrive.com${heroImage?.src || "/images/default-hero.png"}`;

  // extract tags from postType for better SEO
  const tags = resource.metadata.postType?.split(" ").filter(Boolean) || [];

  // custom seo field if provided
  const pageTitle = resource.metadata.seoTitle || resource.metadata.title;
  const pageDescription =
    resource.metadata.seoDescription || resource.metadata.quote;

  const fullTitle = pageTitle.includes("Obrive")
    ? pageTitle
    : `${pageTitle} | Obrive`;

  return {
    title: fullTitle,
    description: pageDescription,
    keywords: resource.metadata.seoKeywords,
    authors: [{ name: resource.metadata.author }],
    creator: resource.metadata.author,
    publisher: "Obrive",
    metadataBase: new URL("https://obrive.com"),
    alternates: {
      canonical: `https://obrive.com/resources/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://obrive.com/resources/${slug}`,
      siteName: "Obrive",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resource.metadata.title,
        },
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: resource.metadata.date,
      authors: [resource.metadata.author],
      tags: tags,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
      site: "@Obrive",
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = await getCaseStudyBySlug(slug);

  if (!resource) {
    notFound();
  }

  const heroImage = CASE_STUDIES_IMAGES[resource.metadata.heroImage];
  const imageUrl = heroImage?.src.startsWith("http")
    ? heroImage.src
    : `https://obrive.com${heroImage?.src || "/images/default-hero.png"}`;

  const pageTitle = resource.metadata.seoTitle || resource.metadata.title;
  const pageDescription =
    resource.metadata.seoDescription || resource.metadata.quote;

  // Specific case study metadata overrides if applicable
  const caseStudySchemas: Record<string, { name: string; headline: string; description: string }> = {
    "bringing-onboarding-to-life": {
      name: "Bringing Onboarding to Life with Immersive Spatial Computing",
      headline: "What used to take weeks now happens in days. Trainees recall protocols more reliably, and trainers stay in control from anywhere. What Obrive delivered isn't just technology it's transformation.",
      description: "From weeks to days: Learn how one company revolutionized onboarding with virtual reality and spatial computing. Measurable results from immersive training.",
    },
    "spatial-flow": {
      name: "Case Study",
      headline: "See how spatial computing replaced outdated field training methods with immersive 3D workflows. Real results: faster learning, fewer errors, seamless operations.",
      description: "See how spatial computing replaced outdated field training methods with immersive 3D workflows. Real results: faster learning, fewer errors, seamless operations.",
    },
    "ar-onboarding": {
      name: "AR Onboarding Success: How Augmented Reality Broke Training Barriers",
      headline: "Breaking Onboarding Barriers with Augmented Reality A First - Person Success Story In Their Own Words",
      description: "Discover how AR technology eliminated onboarding challenges and accelerated employee training. A real case study in augmented reality workplace transformation.",
    },
    "client-immersive-onboarding": {
      name: "Immersive Onboarding Case Study: Training That Feels Real",
      headline: "Immersive Onboarding That Feels Like Reality - Through the eyes of the client",
      description: "Learn how immersive 3D onboarding created realistic training experiences without real-world risks. See the results: better engagement and retention rates.",
    },
  };

  const isCaseStudy = resource.metadata.postType !== "BLOG" && slug in caseStudySchemas;
  const csOverride = caseStudySchemas[slug];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": isCaseStudy ? "Article" : "BlogPosting",
    "@id": `https://obrive.com/resources/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://obrive.com/resources/${slug}`,
      url: `https://obrive.com/resources/${slug}`,
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
      url: "https://obrive.com",
      logo: {
        "@type": "ImageObject",
        url: "https://obrive.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobrive-logo.fb3eb1d9.svg&w=256&q=75",
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
        item: "https://obrive.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://obrive.com/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: resource.metadata.title,
        item: `https://obrive.com/resources/${slug}`,
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
        />
      </ResourceTemplate>
    </>
  );
}
