import { SolutionTemplate } from "@/components/pages/solutions/SolutionTemplate";
import { getSolutionData, getSolutionSlugs } from "@/lib/solutions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getSolutionSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solutionData = getSolutionData(slug);

  if (!solutionData) {
    return {
      title: "Solution Not Found",
    };
  }

  if (slug === "augmented-reality-development") {
    return {
      metadataBase: new URL("https://www.obrive.in"),

      title:
        "Augmented Reality Development FAQs | AR Services & Solutions | Obrive",

      description:
        "Explore Obrive's Augmented Reality development FAQs covering WebAR, mobile AR, enterprise AR, industrial AR, AR commerce, AI-powered AR, 3D visualization, spatial computing, AR glasses, integrations, security, industries, pricing, development timelines and global deployment.",

      keywords: [
        "Augmented Reality Development Services",
        "AR Development Company",
        "Augmented Reality Development Company",
        "AR Solutions",
        "WebAR Development",
        "Mobile AR Development",
        "Enterprise AR Development",
        "Industrial AR Solutions",
        "AR Commerce",
        "AI-powered AR",
        "Spatial Computing",
        "3D AR Development",
        "AR Training",
        "AR Remote Assistance",
        "Digital Twin AR",
      ],

      alternates: {
        canonical: "https://www.obrive.in/solutions/augmented-reality-development",
      },

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://www.obrive.in/solutions/augmented-reality-development",
        title:
          "Augmented Reality Development FAQs | AR Services & Solutions | Obrive",
        description:
          "Explore Obrive's Augmented Reality development FAQs covering WebAR, mobile AR, enterprise AR, industrial AR, AR commerce, AI-powered AR, 3D visualization, spatial computing, AR glasses, integrations, security, industries, pricing, development timelines and global deployment.",
        siteName: "Obrive",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title:
          "Augmented Reality Development FAQs | AR Services & Solutions | Obrive",
        description:
          "Explore Obrive's Augmented Reality development FAQs covering WebAR, mobile AR, enterprise AR, industrial AR, AR commerce, AI-powered AR, 3D visualization, spatial computing, AR glasses, integrations, security, industries, pricing, development timelines and global deployment.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        "ICBM": "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  if (slug === "virtual-reality-development") {
    return {
      metadataBase: new URL("https://www.obrive.in"),

      title:
        "Virtual Reality Development FAQs | VR Services & Solutions | Obrive",

      description:
        "Explore Obrive's Virtual Reality development FAQs covering VR applications, enterprise VR, industrial simulation, training, virtual showrooms, AI-powered VR, 3D environments, OpenXR, integrations, security, industries, pricing, timelines and global deployment.",

      keywords: [
        "Virtual Reality Development Services",
        "VR Development Company",
        "Virtual Reality Development Company",
        "VR Solutions",
        "Enterprise VR Development",
        "VR Training & Simulation",
        "Industrial VR",
        "VR Application Development",
        "Virtual Showroom Development",
        "AI-powered VR",
        "Immersive Simulation",
        "3D VR Development",
        "Digital Twin VR",
        "OpenXR Development",
        "Multi-user VR",
      ],

      alternates: {
        canonical: "https://www.obrive.in/solutions/virtual-reality-development",
      },

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://www.obrive.in/solutions/virtual-reality-development",
        title:
          "Virtual Reality Development FAQs | VR Services & Solutions | Obrive",
        description:
          "Explore Obrive's Virtual Reality development FAQs covering VR applications, enterprise VR, industrial simulation, training, virtual showrooms, AI-powered VR, 3D environments, OpenXR, integrations, security, industries, pricing, timelines and global deployment.",
        siteName: "Obrive",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title:
          "Virtual Reality Development FAQs | VR Services & Solutions | Obrive",
        description:
          "Explore Obrive's Virtual Reality development FAQs covering VR applications, enterprise VR, industrial simulation, training, virtual showrooms, AI-powered VR, 3D environments, OpenXR, integrations, security, industries, pricing, timelines and global deployment.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        "ICBM": "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  if (slug === "3d-design-development") {
    return {
      metadataBase: new URL("https://www.obrive.in"),

      title:
        "3D Design & Development FAQs | 3D Services & Solutions | Obrive",

      description:
        "Explore Obrive's 3D Design & Development FAQs covering 3D modeling, photorealistic rendering, architectural visualization, product configurators, CAD-to-3D conversion, digital twins, real-time 3D, and immersive asset development.",

      keywords: [
        "3D Design & Development",
        "3D Design & Development Services",
        "3D Design & Development Company",
        "3D Modeling Services",
        "3D Visualization Services",
        "3D Development Company",
        "3D Design Company in India",
        "3D Design Company in Bangalore",
        "3D Development Services Bangalore",
        "3D Product Visualization",
        "3D Architectural Visualization",
        "3D Rendering Services",
        "3D Product Design",
        "Interactive 3D",
        "3D Configurator",
        "CAD to 3D",
        "Digital Twin Development",
        "Real-Time 3D",
        "Enterprise 3D Solutions",
        "3D Assets for AR/VR/MR",
        "3D Design Software",
        "3D Modeling Company",
        "3D Design Services India",
      ],

      alternates: {
        canonical: "https://www.obrive.in/solutions/3d-design-development",
      },

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://www.obrive.in/solutions/3d-design-development",
        title:
          "3D Design & Development FAQs | 3D Services & Solutions | Obrive",
        description:
          "Explore Obrive's 3D Design & Development FAQs covering 3D modeling, photorealistic rendering, architectural visualization, product configurators, CAD-to-3D conversion, digital twins, real-time 3D, and immersive asset development.",
        siteName: "Obrive",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title:
          "3D Design & Development FAQs | 3D Services & Solutions | Obrive",
        description:
          "Explore Obrive's 3D Design & Development FAQs covering 3D modeling, photorealistic rendering, architectural visualization, product configurators, CAD-to-3D conversion, digital twins, real-time 3D, and immersive asset development.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        "ICBM": "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  if (slug === "spatial-computing-app-development") {
    return {
      metadataBase: new URL("https://www.obrive.in"),

      title:
        "Spatial Computing App Development FAQs | Spatial Services & Solutions | Obrive",

      description:
        "Explore Obrive's Spatial Computing App Development FAQs covering Apple Vision Pro, visionOS, AR/VR/MR integration, spatial UX design, enterprise spatial apps, digital twins, and immersive software in Bangalore, India.",

      keywords: [
        "Spatial Computing Development",
        "Spatial Computing App Development",
        "Spatial Computing App Development Company",
        "Spatial Computing Development Services",
        "Spatial Computing Development Company",
        "Enterprise Spatial Computing",
        "Spatial Computing Solutions",
        "Apple Vision Pro App Development",
        "visionOS App Development",
        "Immersive App Development",
        "Spatial UX Design",
        "Digital Twin Development",
        "Spatial Data Visualization",
        "Spatial Computing Services India",
        "Spatial Computing Development Bangalore",
        "AR VR MR Development",
      ],

      alternates: {
        canonical:
          "https://www.obrive.in/solutions/spatial-computing-app-development",
      },

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        url: "https://www.obrive.in/solutions/spatial-computing-app-development",
        title:
          "Spatial Computing App Development FAQs | Spatial Services & Solutions | Obrive",
        description:
          "Explore Obrive's Spatial Computing App Development FAQs covering Apple Vision Pro, visionOS, AR/VR/MR integration, spatial UX design, enterprise spatial apps, digital twins, and immersive software in Bangalore, India.",
        siteName: "Obrive",
        locale: "en_IN",
      },

      twitter: {
        card: "summary_large_image",
        title:
          "Spatial Computing App Development FAQs | Spatial Services & Solutions | Obrive",
        description:
          "Explore Obrive's Spatial Computing App Development FAQs covering Apple Vision Pro, visionOS, AR/VR/MR integration, spatial UX design, enterprise spatial apps, digital twins, and immersive software in Bangalore, India.",
      },

      other: {
        "geo.region": "IN-KA",
        "geo.placename": "Bangalore, Karnataka, India",
        "ICBM": "12.9716, 77.5946",
      },
    } satisfies Metadata;
  }

  return {
    title: `${solutionData.hero.title} | Obrive`,
    description: solutionData.hero.description,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solutionData = getSolutionData(slug);

  if (!solutionData) {
    notFound();
  }

  return (
    <>
      {/* WebPage Schema Markup - No duplicate GTM since it's in root layout */}
      <Script
        id={`${slug}-schema`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "WebPage",
          "@id": `https://www.obrive.in/solutions/${slug}`,
          url: `https://www.obrive.in/solutions/${slug}`,
          name: (() => {
            switch (slug) {
              case "augmented-reality-development":
                return "Augmented Reality Development Across Industries";
              case "virtual-reality-development":
                return "Virtual Reality Development Across Industries";
              case "3d-design-development":
                return "3D Design & Development Across Industries";
              case "spatial-computing-app-development":
                return "Spatial Computing App Development Across Industries";
              default:
                return solutionData.hero.title;
            }
          })(),
        })}
      </Script>
      <SolutionTemplate
        hero={solutionData.hero}
        keyBenefits={solutionData.keyBenefits}
        howItWorks={solutionData.howItWorks}
        workflowStepsSidebar={solutionData.workflowStepsSidebar}
      />
    </>
  );
}

