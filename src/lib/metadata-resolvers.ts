import { CASE_STUDIES_IMAGES } from "@/assets/images";
import type { Metadata } from "next";
import { COUNTRIES, SUPPORTED_COUNTRIES } from "@/config/countries";
import { getSolutionData } from "@/lib/services";
import { getProductData } from "@/lib/products";
import { getIndustryData } from "@/lib/industries";
import { getUseCaseData } from "@/lib/use-cases";
import { getTechnologyData } from "@/lib/technology";
import { getBlogBySlug } from "@/lib/blogs";
import { getCaseStudyBySlug as getJsonCaseStudyBySlug } from "@/lib/case-studies";
import { getCaseStudyBySlug } from "@/lib/mdx";

export function getAlternates(basePath: string, slug: string) {
  const activeCountries = SUPPORTED_COUNTRIES.filter((code) => COUNTRIES[code].isProductionReady);
  const langs: Record<string, string> = { "x-default": `https://obrive.com${basePath}/${slug}` };
  for (const code of activeCountries) {
    langs[COUNTRIES[code].hreflang] = `https://obrive.com/${code}${basePath}/${slug}`;
  }
  return { canonical: `https://obrive.com${basePath}/${slug}`, languages: langs };
}


export async function resolveServiceMetadata(slug: string, languageCode = "en"): Promise<Metadata> {
    const solutionData = getSolutionData(slug);

  if (!solutionData) {
    return {
      title: "Solution Not Found",
    };
  }

  if (slug === "augmented-reality-development") {
    return {
      title:
        "Augmented Reality (AR) Development Services in India | AR App Solutions | Obrive Industries",

      description:
        "Obrive Industries offers professional Augmented Reality (AR) development services in India including AR apps, AR solutions for enterprise, retail, real estate & industrial use cases. Build engaging AR experiences with spatial computing expertise.",

      keywords: [
        "augmented reality development India",
        "AR app development Bangalore",
        "AR solutions for enterprise",
        "augmented reality for retail",
        "industrial AR services",
        "spatial computing apps",
        "Obrive AR development services",
      ],

      alternates: getAlternates("/services", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/services/augmented-reality-development",
        title:
          "Augmented Reality Development FAQs | AR Services & Solutions | Obrive Industries",
        description:
          "Professional AR app development and enterprise augmented reality solutions built with spatial computing expertise.",
        siteName: "Obrive Industries",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title: "Augmented Reality (AR) Development Services | Obrive Industries",
        description:
          "Custom AR app development and enterprise AR solutions for retail, real estate and industrial use cases.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  if (slug === "virtual-reality-development") {
    return {
      title:
        "Virtual Reality (VR) Development Services in India | Immersive VR Apps | Obrive Industries",

      description:
        "Obrive Industries offers professional Virtual Reality (VR) development services in India including VR apps, enterprise VR solutions, 360° immersive experiences and interactive 3D simulations for training, marketing, education & industrial use cases.",

      keywords: [
        "virtual reality development India",
        "VR app development Bangalore",
        "immersive VR solutions",
        "enterprise VR experiences",
        "3D VR training apps",
        "VR simulation services",
        "Obrive VR development",
      ],

      alternates: getAlternates("/services", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/services/virtual-reality-development",
        title:
          "Virtual Reality Development FAQs | VR Services & Solutions | Obrive Industries",
        description:
          "Professional VR app development and immersive simulation solutions for enterprise, training and marketing.",
        siteName: "Obrive Industries",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title: "Virtual Reality (VR) Development Services | Obrive Industries",
        description:
          "Immersive VR applications and enterprise VR solutions built for training and engagement.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  if (slug === "3d-design-development") {
    return {
      title:
        "3D Design & Visualization Services | Architectural & Product 3D Development | Obrive Industries",

      description:
        "Obrive Industries provides professional 3D design and visualization services including architectural modeling, product 3D rendering, digital twin creation, and immersive 3D experiences for real estate, manufacturing & enterprise projects.",

      keywords: [
        "3D design services India",
        "3D visualization Bangalore",
        "architectural 3D modeling",
        "product 3D rendering",
        "digital twin services",
        "immersive 3D visualization solutions",
        "Obrive 3D design",
      ],

      alternates: getAlternates("/services", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/services/3d-design-development",
        title:
          "3D Design & Development FAQs | 3D Services & Solutions | Obrive Industries",
        description:
          "Professional architectural 3D modeling, product rendering and immersive visualization services.",
        siteName: "Obrive Industries",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title: "3D Design & Visualization Services | Obrive Industries",
        description:
          "Architectural modeling, product rendering and immersive 3D visualization solutions.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  if (slug === "spatial-computing-app-development") {
    return {
      title:
        "Spatial Computing App Development Services | AR/VR & Immersive Experiences | Obrive Industries",

      description:
        "Obrive Industries offers spatial computing app development services to build immersive applications using AR/VR, 3D spatial interactions and mixed reality for enterprise, retail, real estate, healthcare and industrial solutions.",

      keywords: [
        "spatial computing app development",
        "AR app development",
        "VR immersive app solutions",
        "mixed reality spatial development",
        "immersive experiences design Bangalore",
        "spatial UX apps India",
        "Obrive spatial computing services",
      ],

      alternates: getAlternates("/services", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/services/spatial-computing-app-development",
        title:
          "Spatial Computing App Development FAQs | Spatial Services & Solutions | Obrive Industries",
        description:
          "Build immersive AR, VR and mixed reality applications with spatial computing expertise from Obrive Industries.",
        siteName: "Obrive Industries",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title: "Spatial Computing App Development Services | Obrive Industries",
        description:
          "AR, VR and immersive spatial applications for enterprise and industry.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  if (slug === "white-label-technology-partnerships") {
    return {
      title:
        "White Label Technology Partnerships & Development | Obrive Industries",

      description:
        "Partner with Obrive Industries to deliver advanced digital, immersive and AI solutions to your clients under your own brand. Extend your agency capabilities with white-label technology development.",

      keywords: [
        "white label development",
        "technology partnerships",
        "white label AR VR",
        "agency technology partner",
        "white label AI development",
        "dedicated technology teams",
        "Obrive white label services",
      ],

      alternates: getAlternates("/services", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/services/white-label-technology-partnerships",
        title:
          "White Label Technology Partnerships | Obrive Industries",
        description:
          "Extend your capabilities with white-label digital, immersive, and AI development partnerships.",
        siteName: "Obrive Industries",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title: "White Label Technology Partnerships | Obrive Industries",
        description:
          "Deliver advanced technology solutions to your clients under your own brand.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  // Fallback for all other services
  return {
    title: `${solutionData.hero.title} | Obrive Industries`,
    description: solutionData.hero.description || `Professional ${solutionData.hero.title} services provided by Obrive Industries.`,
    alternates: getAlternates("/services", slug),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: `https://obrive.com/services/${slug}`,
      title: `${solutionData.hero.title} | Obrive Industries`,
      description: solutionData.hero.description || `Professional ${solutionData.hero.title} services provided by Obrive Industries.`,
      siteName: "Obrive Industries",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${solutionData.hero.title} | Obrive Industries`,
      description: solutionData.hero.description || `Professional ${solutionData.hero.title} services provided by Obrive Industries.`,
    },
  };
}

export async function resolveProductMetadata(slug: string, languageCode = "en"): Promise<Metadata> {
  
  if (slug === "obpark") {
    return {
      metadataBase: new URL("https://obrive.com"),

      title:
        "Obpark – AR Parking Navigation & Smart Parking Solution | Obrive Bangalore",

      description:
        "Obpark by Obrive is an AR-powered smart parking navigation system that helps drivers find, navigate, and reserve parking spaces with augmented reality guidance. Ideal for malls, commercial complexes and city parking in Bangalore & beyond.",

      keywords: [
        "Obpark AR parking solution",
        "smart parking navigation Bangalore",
        "augmented reality parking app India",
        "AR wayfinding parking solution",
        "Obpark smart parking software",
        "Obrive Obpark product",
      ],

      alternates: getAlternates("/products", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/products/obpark",
        title:
          "Obpark – AR Parking Navigation & Smart Parking Solution | Obrive Bangalore",
        description:
          "AR-powered smart parking navigation system helping drivers find and reserve parking spaces with real-time augmented reality guidance.",
        siteName: "Obrive",
        locale: "en_IN",
        images: [
          {
            url: "https://obrive.com/_next/static/media/obpark-hero.webp",
            alt: "Obpark AR Smart Parking Navigation System",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: "Obpark – AR Smart Parking Navigation Solution",
        description:
          "AR-based parking navigation system for malls, commercial complexes & smart cities.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
        "product:brand": "Obrive",
        "product:category": "AR Smart Parking Solutions",
      },
    } satisfies Metadata;
  }

  if (slug === "obnest") {
    return {
      metadataBase: new URL("https://obrive.com"),

      title:
        "Obnest – 3D Property Visualization & Immersive Walkthrough | Obrive Bangalore",

      description:
        "Obnest by Obrive is a 3D property visualization and immersive walkthrough solution that enables interactive viewing of real estate, architectural designs, and building layouts. Enhance engagement with photoreal 3D experiences.",

      keywords: [
        "Obnest 3D property visualization",
        "3D architectural walkthrough solution",
        "real estate 3D visualization Bangalore",
        "immersive 3D walkthrough India",
        "Obrive Obnest product",
        "spatial 3D design services",
      ],

      alternates: getAlternates("/products", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/products/obnest",
        title:
          "Obnest – 3D Property Visualization & Immersive Walkthrough | Obrive Bangalore",
        description:
          "Interactive 3D property visualization and immersive walkthrough solution for real estate and architectural projects.",
        siteName: "Obrive",
        locale: "en_IN",
        images: [
          {
            url: "https://obrive.com/_next/static/media/obnest-hero.webp",
            alt: "Obnest 3D Property Visualization & Walkthrough",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: "Obnest – Immersive 3D Property Visualization Solution",
        description:
          "Photoreal 3D property visualization and immersive walkthrough platform by Obrive.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
        "product:brand": "Obrive",
        "product:category": "3D Property Visualization Solutions",
      },
    } satisfies Metadata;
  }

  if (slug === "obnavi") {
    return {
      metadataBase: new URL("https://obrive.com"),

      title: "Obnavi – AR Spatial Navigation & Immersive Wayfinding | Obrive",

      description:
        "Obnavi by Obrive is an Augmented Reality (AR) spatial navigation and immersive wayfinding solution guiding users through complex environments using AR overlays and 3D spatial cues.",

      keywords: [
        "Obnavi AR navigation",
        "AR wayfinding solution",
        "spatial navigation app",
        "AR indoor navigation India",
        "spatial computing navigation",
        "Obrive Obnavi",
      ],

      alternates: getAlternates("/products", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/products/obnavi",
        title: "Obnavi – AR Spatial Navigation & Immersive Wayfinding",
        description:
          "Immersive AR navigation and spatial wayfinding solution for malls, campuses, airports and smart environments.",
        siteName: "Obrive",
        locale: "en_IN",
        images: [
          {
            url: "https://obrive.com/images/obnavi-hero.webp",
            width: 1200,
            height: 630,
            alt: "Obnavi AR Spatial Navigation Solution",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: "Obnavi – AR Spatial Navigation Solution",
        description: "Immersive AR wayfinding and spatial navigation system.",
        images: ["https://obrive.com/images/obnavi-hero.webp"],
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  if (slug === "obmove") {
    return {
      metadataBase: new URL("https://obrive.com"),

      title:
        "Obmove – AR/VR Car Showroom & Immersive 3D Vehicle Experience | Obrive",

      description:
        "Obmove by Obrive is an immersive AR/VR car showroom and interactive 3D vehicle experience platform. Showcase vehicles with 360° views, AR features, configuration tools and next-gen digital engagement.",

      keywords: [
        "Obmove AR car showroom",
        "immersive 3D vehicle experience",
        "VR car showcase",
        "automotive AR/VR solution",
        "3D car configurator",
        "Obrive Obmove product",
        "interactive vehicle visualization",
      ],

      alternates: getAlternates("/products", slug),

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://obrive.com/products/obmove",
        title:
          "Obmove – AR/VR Car Showroom & Immersive 3D Vehicle Experience | Obrive",
        description:
          "Immersive AR/VR car showroom platform with interactive 3D vehicle configuration and 360° digital experiences.",
        siteName: "Obrive",
        locale: "en_IN",
        images: [
          {
            url: "https://obrive.com/_next/static/media/obmove-hero.webp",
            alt: "Obmove AR/VR Car Showroom Experience",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: "Obmove – Immersive AR/VR Car Showroom Experience",
        description:
          "Interactive 3D vehicle showcase platform powered by AR & VR technology.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        ICBM: "12.9716, 77.5946",
        "product:brand": "Obrive",
        "product:category": "AR/VR Automotive Solutions",
      },
    } satisfies Metadata;
  }

  const productData = getProductData(slug);

  if (!productData) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${productData.hero.title} | Obrive Industries`,
    description: productData.hero.description,
    alternates: getAlternates("/products", slug),
  };
}

export async function resolveIndustryMetadata(slug: string, languageCode = "en"): Promise<Metadata> {
    const industryData = getIndustryData(slug);

  if (!industryData) {
    return {
      title: "Industry Not Found",
    };
  }

  return {
    title: `${industryData.hero.title} | Obrive Industries`,
    description: industryData.hero.description || `Explore ${industryData.hero.title} solutions by Obrive Industries.`,
    alternates: getAlternates("/industries", slug),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: `https://obrive.com/industries/${slug}`,
      title: `${industryData.hero.title} | Obrive Industries`,
      description: industryData.hero.description || `Explore ${industryData.hero.title} solutions by Obrive Industries.`,
      siteName: "Obrive Industries",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${industryData.hero.title} | Obrive Industries`,
      description: industryData.hero.description || `Explore ${industryData.hero.title} solutions by Obrive Industries.`,
    },
  };
}

export async function resolveUseCaseMetadata(slug: string, languageCode = "en"): Promise<Metadata> {
    const useCaseData = getUseCaseData(slug);

  if (!useCaseData) {
    return {
      title: "Use Case Not Found",
    };
  }

  return {
    title: `${useCaseData.hero.title} | Obrive Industries`,
    description: useCaseData.hero.description || `Explore ${useCaseData.hero.title} use cases by Obrive Industries.`,
    alternates: getAlternates("/use-cases", slug),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: `https://obrive.com/use-cases/${slug}`,
      title: `${useCaseData.hero.title} | Obrive Industries`,
      description: useCaseData.hero.description || `Explore ${useCaseData.hero.title} use cases by Obrive Industries.`,
      siteName: "Obrive Industries",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${useCaseData.hero.title} | Obrive Industries`,
      description: useCaseData.hero.description || `Explore ${useCaseData.hero.title} use cases by Obrive Industries.`,
    },
  };
}

export async function resolveTechnologyMetadata(slug: string, languageCode = "en"): Promise<Metadata> {
    const technologyData = getTechnologyData(slug);

  if (!technologyData) {
    return {
      title: "Technology Not Found",
    };
  }

  return {
    title: `${technologyData.hero.title} | Obrive Industries`,
    description: technologyData.hero.description || `Explore ${technologyData.hero.title} technology by Obrive Industries.`,
    alternates: getAlternates("/technology", slug),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: `https://obrive.com/technology/${slug}`,
      title: `${technologyData.hero.title} | Obrive Industries`,
      description: technologyData.hero.description || `Explore ${technologyData.hero.title} technology by Obrive Industries.`,
      siteName: "Obrive Industries",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${technologyData.hero.title} | Obrive Industries`,
      description: technologyData.hero.description || `Explore ${technologyData.hero.title} technology by Obrive Industries.`,
    },
  };
}

export async function resolveResourceMetadata(slug: string, languageCode = "en"): Promise<Metadata> {
    
  const resource = await getCaseStudyBySlug(slug, languageCode);

  if (!resource) {
    const blog = getBlogBySlug(slug);
    if (blog) {
      return {
        title: `${blog.title} | Obrive`,
        description:
          blog.sections[0]?.content[0] || "Read more about this topic.",
        metadataBase: new URL("https://obrive.com"),
        alternates: {
          canonical: `https://obrive.com/resources/${slug}`,
        },
      };
    }
    const jsonCaseStudy = getJsonCaseStudyBySlug(slug);
    if (jsonCaseStudy) {
      const title = `${jsonCaseStudy.title} | Obrive Case Study`;
      const description =
        jsonCaseStudy.outcome_snapshot ||
        `${jsonCaseStudy.overview.slice(0, 155)}...`;
      return {
        title,
        description,
        alternates: {
          canonical: `https://obrive.com/resources/${jsonCaseStudy.slug}`,
        },
        openGraph: {
          title,
          description,
          type: "article",
          url: `https://obrive.com/resources/${jsonCaseStudy.slug}`,
          images: [
            {
              url: `https://obrive.com/images/case-studies/${jsonCaseStudy.image}`,
              alt: jsonCaseStudy.title,
            },
          ],
        },
      };
    }
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

  const heroImageKey = resource.metadata
    .heroImage as keyof typeof CASE_STUDIES_IMAGES;
  const heroImage = CASE_STUDIES_IMAGES[heroImageKey];
  const heroImageSrc =
    typeof resource.metadata.heroImage === "string" &&
    resource.metadata.heroImage.startsWith("/")
      ? resource.metadata.heroImage
      : heroImage?.src || "/images/default-hero.png";

  // ensure absolute URL for social media images
  const imageUrl = heroImageSrc.startsWith("http")
    ? heroImageSrc
    : `https://www.obrive.com${heroImageSrc}`;

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