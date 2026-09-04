import BlogsHero from "@/components/pages/resources/BlogsHero";
import ResourcesContent from "@/components/pages/resources/ResourcesContent";
import { BlogCardContent } from "@/constants/pages/resources/blog-card";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://obrive.com"),

  title: "AR, VR & Spatial Computing Resources | Obrive",

  description:
    "Browse Obrive's library of AR, VR, MR, 3D and spatial computing articles and case studies for enterprise teams.",

  keywords: [
    "AR VR spatial computing resources",
    "immersive technology blog",
    "Obrive insights",
    "AR",
    "VR",
    "MR",
    "3D",
    "spatial computing",
    "case studies",
    "Obrive blog and case study library",
  ],

  alternates: {
    canonical: "https://obrive.com/resources",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://obrive.com/resources",
    title: "AR, VR & Spatial Computing Resources | Obrive",
    description:
      "Browse Obrive's library of AR, VR, MR, 3D and spatial computing articles and case studies for enterprise teams.",
    siteName: "Obrive",
    locale: "en_US",
    images: [
      {
        url: "https://obrive.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faugmented_first.f8b128f2.webp&w=1200&q=75",
        alt: "Obrive AR/VR/MR and Spatial Computing Resource Library",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AR, VR & Spatial Computing Resources | Obrive",
    description:
      "Browse Obrive's library of AR, VR, MR, 3D and spatial computing articles and case studies for enterprise teams.",
  },

  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bangalore, Karnataka, India",
    ICBM: "12.9716, 77.5946",
  },
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AR, VR & Spatial Computing Resources",
  headline: "AR, VR & Spatial Computing Resources | Obrive",
  description:
    "Browse Obrive's library of AR, VR, MR, 3D and spatial computing articles and case studies for enterprise teams.",
  url: "https://obrive.com/resources",
  publisher: {
    "@type": "Organization",
    name: "Obrive",
    url: "https://obrive.com",
    logo: {
      "@type": "ImageObject",
      url: "https://obrive.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fobrive-logo.fb3eb1d9.svg&w=256&q=75",
    },
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: BlogCardContent.length,
    itemListElement: BlogCardContent.map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://obrive.com/resources/${blog.slug}`,
      name: blog.title,
      description: blog.description,
    })),
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
  ],
};

export default function Blogs() {
  return (
    <main>
      {/* Structured Data: CollectionPage & ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      {/* Structured Data: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* hero section */}
      <BlogsHero />

      {/* main content with client-side filtering */}
      <ResourcesContent />
    </main>
  );
}
