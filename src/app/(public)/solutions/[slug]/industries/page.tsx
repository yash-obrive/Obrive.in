import React from "react";
import { notFound } from "next/navigation";
import { getSolutionData } from "@/lib/solutions";
import { IndustriesTemplate } from "@/components/pages/solutions/IndustriesTemplate";
import { AR_DEVELOPMENT_INDUSTRIES } from "@/constants/pages/solutions/ar-development";
import { VR_DEVELOPMENT_INDUSTRIES } from "@/constants/pages/solutions/vr-development";
import { THREE_D_DESIGN_INDUSTRIES } from "@/constants/pages/solutions/3d-design-development";
import { SPATIAL_COMPUTING_INDUSTRIES } from "@/constants/pages/solutions/spatial-computing-development";
import { MIXED_REALITY_DEVELOPMENT_INDUSTRIES } from "@/constants/pages/solutions/mixed-reality-development";

import { AEO_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/aeo-service";
import { AI_CONSULTING_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/ai-consulting";
import { CONTENT_MARKETING_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/content-marketing-service";
import { GEO_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/geo-service";
import { MOBILE_APP_DESIGN_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/mobile-app-design-service";
import { MOBILE_APP_DEVELOPMENT_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/mobile-app-development";
import { SEO_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/seo-service";
import { WEB_APP_SAAS_MVP_DEVELOPMENT_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/web-app-saas-mvp-development";
import { WEBSITE_DESIGN_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/website-design-service";
import { WEBSITE_DEVELOPMENT_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/solutions/website-development-service";

const industriesContentMap: Record<string, any> = {
  "augmented-reality-development": AR_DEVELOPMENT_INDUSTRIES,
  "virtual-reality-development": VR_DEVELOPMENT_INDUSTRIES,
  "3d-design-development": THREE_D_DESIGN_INDUSTRIES,
  "spatial-computing-app-development": SPATIAL_COMPUTING_INDUSTRIES,
  "mixed-reality-development": MIXED_REALITY_DEVELOPMENT_INDUSTRIES,
  "aeo-service": AEO_SERVICE_INDUSTRIES_CONTENT,
  "ai-consulting": AI_CONSULTING_INDUSTRIES_CONTENT,
  "content-marketing-service": CONTENT_MARKETING_SERVICE_INDUSTRIES_CONTENT,
  "geo-service": GEO_SERVICE_INDUSTRIES_CONTENT,
  "mobile-app-design-service": MOBILE_APP_DESIGN_SERVICE_INDUSTRIES_CONTENT,
  "mobile-app-development": MOBILE_APP_DEVELOPMENT_INDUSTRIES_CONTENT,
  "seo-service": SEO_SERVICE_INDUSTRIES_CONTENT,
  "web-app-saas-mvp-development": WEB_APP_SAAS_MVP_DEVELOPMENT_INDUSTRIES_CONTENT,
  "website-design-service": WEBSITE_DESIGN_SERVICE_INDUSTRIES_CONTENT,
  "website-development-service": WEBSITE_DEVELOPMENT_SERVICE_INDUSTRIES_CONTENT,
};

export default async function SolutionIndustriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Verify that the solution exists
  const solution = getSolutionData(slug);
  if (!solution) {
    notFound();
  }

  const content = industriesContentMap[slug];
  
  // If the page doesn't have industries content yet, just fallback or notFound
  if (!content) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl">Content coming soon</h1>
      </main>
    )
  }

  return (
    <main>
      <IndustriesTemplate {...content} />
    </main>
  );
}
