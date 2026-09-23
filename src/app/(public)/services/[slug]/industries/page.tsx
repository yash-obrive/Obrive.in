import { notFound } from "next/navigation";
import { IndustriesTemplate } from "@/components/pages/services/IndustriesTemplate";
import { THREE_D_DESIGN_INDUSTRIES } from "@/constants/pages/services/3d-design-development";
import { AEO_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/services/aeo-service";
import { AI_CONSULTING_INDUSTRIES_CONTENT } from "@/constants/pages/services/ai-consulting";
import { AR_DEVELOPMENT_INDUSTRIES } from "@/constants/pages/services/ar-development";
import { CONTENT_MARKETING_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/services/content-marketing-service";
import { GEO_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/services/geo-service";
import { MIXED_REALITY_DEVELOPMENT_INDUSTRIES } from "@/constants/pages/services/mixed-reality-development";
import { MOBILE_APP_DESIGN_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/services/mobile-app-design-service";
import { MOBILE_APP_DEVELOPMENT_INDUSTRIES_CONTENT } from "@/constants/pages/services/mobile-app-development";
import { SEO_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/services/seo-service";
import { SPATIAL_COMPUTING_INDUSTRIES } from "@/constants/pages/services/spatial-computing-development";
import { VR_DEVELOPMENT_INDUSTRIES } from "@/constants/pages/services/vr-development";
import { WEB_APP_SAAS_MVP_DEVELOPMENT_INDUSTRIES_CONTENT } from "@/constants/pages/services/web-app-saas-mvp-development";
import { WEBSITE_DESIGN_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/services/website-design-service";
import { WEBSITE_DEVELOPMENT_SERVICE_INDUSTRIES_CONTENT } from "@/constants/pages/services/website-development-service";
import { getSolutionData } from "@/lib/services";

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
  "web-app-saas-mvp-development":
    WEB_APP_SAAS_MVP_DEVELOPMENT_INDUSTRIES_CONTENT,
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

  // If the page doesn't have industries content yet, return 404
  if (!content) {
    notFound();
  }

  return (
    <main>
      <IndustriesTemplate {...content} />
    </main>
  );
}
