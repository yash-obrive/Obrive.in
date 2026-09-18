import {
  AEO_SERVICE_HERO,
  AEO_SERVICE_KEY_BENEFITS,
  AEO_SERVICE_SIDEBAR_LINKS,
  AEO_SERVICE_SERVICE_SECTIONS,
  AEO_SERVICE_PROCESS_STEPS
} from "@/constants/pages/solutions/aeo-service";
import {
  AI_CONSULTING_HERO,
  AI_CONSULTING_KEY_BENEFITS,
  AI_CONSULTING_SIDEBAR_LINKS,
  AI_CONSULTING_SERVICE_SECTIONS,
  AI_CONSULTING_PROCESS_STEPS
} from "@/constants/pages/solutions/ai-consulting";
import {
  CONTENT_MARKETING_SERVICE_HERO,
  CONTENT_MARKETING_SERVICE_KEY_BENEFITS,
  CONTENT_MARKETING_SERVICE_SIDEBAR_LINKS,
  CONTENT_MARKETING_SERVICE_SERVICE_SECTIONS,
  CONTENT_MARKETING_SERVICE_PROCESS_STEPS
} from "@/constants/pages/solutions/content-marketing-service";
import {
  GEO_SERVICE_HERO,
  GEO_SERVICE_KEY_BENEFITS,
  GEO_SERVICE_SIDEBAR_LINKS,
  GEO_SERVICE_SERVICE_SECTIONS,
  GEO_SERVICE_PROCESS_STEPS
} from "@/constants/pages/solutions/geo-service";
import {
  MOBILE_APP_DESIGN_SERVICE_HERO,
  MOBILE_APP_DESIGN_SERVICE_KEY_BENEFITS,
  MOBILE_APP_DESIGN_SERVICE_SIDEBAR_LINKS,
  MOBILE_APP_DESIGN_SERVICE_SERVICE_SECTIONS,
  MOBILE_APP_DESIGN_SERVICE_PROCESS_STEPS
} from "@/constants/pages/solutions/mobile-app-design-service";
import {
  MOBILE_APP_DEVELOPMENT_HERO,
  MOBILE_APP_DEVELOPMENT_KEY_BENEFITS,
  MOBILE_APP_DEVELOPMENT_SIDEBAR_LINKS,
  MOBILE_APP_DEVELOPMENT_SERVICE_SECTIONS,
  MOBILE_APP_DEVELOPMENT_PROCESS_STEPS
} from "@/constants/pages/solutions/mobile-app-development";
import {
  SEO_SERVICE_HERO,
  SEO_SERVICE_KEY_BENEFITS,
  SEO_SERVICE_SIDEBAR_LINKS,
  SEO_SERVICE_SERVICE_SECTIONS,
  SEO_SERVICE_PROCESS_STEPS
} from "@/constants/pages/solutions/seo-service";
import {
  WEB_APP_SAAS_MVP_DEVELOPMENT_HERO,
  WEB_APP_SAAS_MVP_DEVELOPMENT_KEY_BENEFITS,
  WEB_APP_SAAS_MVP_DEVELOPMENT_SIDEBAR_LINKS,
  WEB_APP_SAAS_MVP_DEVELOPMENT_SERVICE_SECTIONS,
  WEB_APP_SAAS_MVP_DEVELOPMENT_PROCESS_STEPS
} from "@/constants/pages/solutions/web-app-saas-mvp-development";
import {
  WEBSITE_DESIGN_SERVICE_HERO,
  WEBSITE_DESIGN_SERVICE_KEY_BENEFITS,
  WEBSITE_DESIGN_SERVICE_SIDEBAR_LINKS,
  WEBSITE_DESIGN_SERVICE_SERVICE_SECTIONS,
  WEBSITE_DESIGN_SERVICE_PROCESS_STEPS
} from "@/constants/pages/solutions/website-design-service";
import {
  WEBSITE_DEVELOPMENT_SERVICE_HERO,
  WEBSITE_DEVELOPMENT_SERVICE_KEY_BENEFITS,
  WEBSITE_DEVELOPMENT_SERVICE_SIDEBAR_LINKS,
  WEBSITE_DEVELOPMENT_SERVICE_SERVICE_SECTIONS,
  WEBSITE_DEVELOPMENT_SERVICE_PROCESS_STEPS
} from "@/constants/pages/solutions/website-development-service";

import type { StaticImageData } from "next/image";
import { IMAGES } from "@/assets/images";
import {
  THREE_D_DESIGN_HERO,
  THREE_D_DESIGN_HOW_IT_WORKS,
  THREE_D_DESIGN_KEY_BENEFITS,
  THREE_D_DESIGN_PROCESS_STEPS,
  THREE_D_DESIGN_SERVICE_SECTIONS,
  THREE_D_DESIGN_SIDEBAR_LINKS,
  THREE_D_DESIGN_WORKFLOW_STEPS_SIDEBAR,
} from "@/constants/pages/solutions/3d-design-development";
import {
  AR_DEVELOPMENT_HERO,
  AR_DEVELOPMENT_HOW_IT_WORKS,
  AR_DEVELOPMENT_KEY_BENEFITS,
  AR_DEVELOPMENT_PROCESS_STEPS,
  AR_DEVELOPMENT_SERVICE_SECTIONS,
  AR_DEVELOPMENT_SIDEBAR_LINKS,
  AR_DEVELOPMENT_WORKFLOW_STEPS_SIDEBAR,
} from "@/constants/pages/solutions/ar-development";
import {
  MIXED_REALITY_DEVELOPMENT_HERO,
  MIXED_REALITY_DEVELOPMENT_KEY_BENEFITS,
  MIXED_REALITY_DEVELOPMENT_PROCESS_STEPS,
  MIXED_REALITY_DEVELOPMENT_SERVICE_SECTIONS,
  MIXED_REALITY_DEVELOPMENT_SIDEBAR_LINKS,
} from "@/constants/pages/solutions/mixed-reality-development";
import {
  SPATIAL_COMPUTING_HERO,
  SPATIAL_COMPUTING_KEY_BENEFITS,
  SPATIAL_COMPUTING_PROCESS_STEPS,
  SPATIAL_COMPUTING_SERVICE_SECTIONS,
  SPATIAL_COMPUTING_SIDEBAR_LINKS,
} from "@/constants/pages/solutions/spatial-computing-development";
import {
  VR_DEVELOPMENT_HERO,
  VR_DEVELOPMENT_HOW_IT_WORKS,
  VR_DEVELOPMENT_KEY_BENEFITS,
  VR_DEVELOPMENT_PROCESS_STEPS,
  VR_DEVELOPMENT_SERVICE_SECTIONS,
  VR_DEVELOPMENT_SIDEBAR_LINKS,
  VR_DEVELOPMENT_WORKFLOW_STEPS_SIDEBAR,
} from "@/constants/pages/solutions/vr-development";
import type {
  ServiceSection,
  SidebarLink,
  WorkflowStep,
} from "@/types/solutions";

export interface SolutionHero {
  title: string;
  description: string;
  description2: string;
  backgroundImage: string | StaticImageData;
  icon?: React.ComponentType;
  ctaButtons: {
    primary: string;
    secondary: string;
  };
}

export interface SolutionData {
  slug: string;
  hero: SolutionHero;
  howItWorks?: readonly any[];
  keyBenefits: readonly any[];
  workflowStepsSidebar?: readonly string[];
  sidebarLinks?: readonly SidebarLink[];
  serviceSections?: readonly ServiceSection[];
  processSteps?: readonly WorkflowStep[];
  faqs?: Record<string, { q: string; a: string }[]>;
}

const SOLUTIONS_DATA: Record<string, SolutionData> = {
  "augmented-reality-development": {
    slug: "augmented-reality-development",
    hero: {
      ...AR_DEVELOPMENT_HERO,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    keyBenefits: AR_DEVELOPMENT_KEY_BENEFITS,
    sidebarLinks: AR_DEVELOPMENT_SIDEBAR_LINKS,
    serviceSections: AR_DEVELOPMENT_SERVICE_SECTIONS,
    processSteps: AR_DEVELOPMENT_PROCESS_STEPS,
  },
  "virtual-reality-development": {
    slug: "virtual-reality-development",
    hero: {
      ...VR_DEVELOPMENT_HERO,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    keyBenefits: VR_DEVELOPMENT_KEY_BENEFITS,
    sidebarLinks: VR_DEVELOPMENT_SIDEBAR_LINKS,
    serviceSections: VR_DEVELOPMENT_SERVICE_SECTIONS,
    processSteps: VR_DEVELOPMENT_PROCESS_STEPS,
  },
  "3d-design-development": {
    slug: "3d-design-development",
    hero: {
      ...THREE_D_DESIGN_HERO,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    keyBenefits: THREE_D_DESIGN_KEY_BENEFITS,
    sidebarLinks: THREE_D_DESIGN_SIDEBAR_LINKS,
    serviceSections: THREE_D_DESIGN_SERVICE_SECTIONS,
    processSteps: THREE_D_DESIGN_PROCESS_STEPS,
  },
  "spatial-computing-app-development": {
    slug: "spatial-computing-app-development",
    hero: {
      ...SPATIAL_COMPUTING_HERO,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    keyBenefits: SPATIAL_COMPUTING_KEY_BENEFITS,
    sidebarLinks: SPATIAL_COMPUTING_SIDEBAR_LINKS,
    serviceSections: SPATIAL_COMPUTING_SERVICE_SECTIONS,
    processSteps: SPATIAL_COMPUTING_PROCESS_STEPS,
  },
  "mixed-reality-development": {
    slug: "mixed-reality-development",
    hero: {
      ...MIXED_REALITY_DEVELOPMENT_HERO,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    keyBenefits: MIXED_REALITY_DEVELOPMENT_KEY_BENEFITS,
    sidebarLinks: MIXED_REALITY_DEVELOPMENT_SIDEBAR_LINKS,
    serviceSections: MIXED_REALITY_DEVELOPMENT_SERVICE_SECTIONS,
    processSteps: MIXED_REALITY_DEVELOPMENT_PROCESS_STEPS,
  },
  "aeo-service": {
    slug: "aeo-service",
    hero: {
      ...AEO_SERVICE_HERO,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    keyBenefits: AEO_SERVICE_KEY_BENEFITS,
    sidebarLinks: AEO_SERVICE_SIDEBAR_LINKS,
    serviceSections: AEO_SERVICE_SERVICE_SECTIONS,
    processSteps: AEO_SERVICE_PROCESS_STEPS,
  },
  "ai-consulting": {
    slug: "ai-consulting",
    hero: {
      ...AI_CONSULTING_HERO,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    keyBenefits: AI_CONSULTING_KEY_BENEFITS,
    sidebarLinks: AI_CONSULTING_SIDEBAR_LINKS,
    serviceSections: AI_CONSULTING_SERVICE_SECTIONS,
    processSteps: AI_CONSULTING_PROCESS_STEPS,
  },
  "content-marketing-service": {
    slug: "content-marketing-service",
    hero: {
      ...CONTENT_MARKETING_SERVICE_HERO,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    keyBenefits: CONTENT_MARKETING_SERVICE_KEY_BENEFITS,
    sidebarLinks: CONTENT_MARKETING_SERVICE_SIDEBAR_LINKS,
    serviceSections: CONTENT_MARKETING_SERVICE_SERVICE_SECTIONS,
    processSteps: CONTENT_MARKETING_SERVICE_PROCESS_STEPS,
  },
  "geo-service": {
    slug: "geo-service",
    hero: {
      ...GEO_SERVICE_HERO,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    keyBenefits: GEO_SERVICE_KEY_BENEFITS,
    sidebarLinks: GEO_SERVICE_SIDEBAR_LINKS,
    serviceSections: GEO_SERVICE_SERVICE_SECTIONS,
    processSteps: GEO_SERVICE_PROCESS_STEPS,
  },
  "mobile-app-design-service": {
    slug: "mobile-app-design-service",
    hero: {
      ...MOBILE_APP_DESIGN_SERVICE_HERO,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    keyBenefits: MOBILE_APP_DESIGN_SERVICE_KEY_BENEFITS,
    sidebarLinks: MOBILE_APP_DESIGN_SERVICE_SIDEBAR_LINKS,
    serviceSections: MOBILE_APP_DESIGN_SERVICE_SERVICE_SECTIONS,
    processSteps: MOBILE_APP_DESIGN_SERVICE_PROCESS_STEPS,
  },
  "mobile-app-development": {
    slug: "mobile-app-development",
    hero: {
      ...MOBILE_APP_DEVELOPMENT_HERO,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    keyBenefits: MOBILE_APP_DEVELOPMENT_KEY_BENEFITS,
    sidebarLinks: MOBILE_APP_DEVELOPMENT_SIDEBAR_LINKS,
    serviceSections: MOBILE_APP_DEVELOPMENT_SERVICE_SECTIONS,
    processSteps: MOBILE_APP_DEVELOPMENT_PROCESS_STEPS,
  },
  "seo-service": {
    slug: "seo-service",
    hero: {
      ...SEO_SERVICE_HERO,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    keyBenefits: SEO_SERVICE_KEY_BENEFITS,
    sidebarLinks: SEO_SERVICE_SIDEBAR_LINKS,
    serviceSections: SEO_SERVICE_SERVICE_SECTIONS,
    processSteps: SEO_SERVICE_PROCESS_STEPS,
  },
  "web-app-saas-mvp-development": {
    slug: "web-app-saas-mvp-development",
    hero: {
      ...WEB_APP_SAAS_MVP_DEVELOPMENT_HERO,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    keyBenefits: WEB_APP_SAAS_MVP_DEVELOPMENT_KEY_BENEFITS,
    sidebarLinks: WEB_APP_SAAS_MVP_DEVELOPMENT_SIDEBAR_LINKS,
    serviceSections: WEB_APP_SAAS_MVP_DEVELOPMENT_SERVICE_SECTIONS,
    processSteps: WEB_APP_SAAS_MVP_DEVELOPMENT_PROCESS_STEPS,
  },
  "website-design-service": {
    slug: "website-design-service",
    hero: {
      ...WEBSITE_DESIGN_SERVICE_HERO,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    keyBenefits: WEBSITE_DESIGN_SERVICE_KEY_BENEFITS,
    sidebarLinks: WEBSITE_DESIGN_SERVICE_SIDEBAR_LINKS,
    serviceSections: WEBSITE_DESIGN_SERVICE_SERVICE_SECTIONS,
    processSteps: WEBSITE_DESIGN_SERVICE_PROCESS_STEPS,
  },
  "website-development-service": {
    slug: "website-development-service",
    hero: {
      ...WEBSITE_DEVELOPMENT_SERVICE_HERO,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    keyBenefits: WEBSITE_DEVELOPMENT_SERVICE_KEY_BENEFITS,
    sidebarLinks: WEBSITE_DEVELOPMENT_SERVICE_SIDEBAR_LINKS,
    serviceSections: WEBSITE_DEVELOPMENT_SERVICE_SERVICE_SECTIONS,
    processSteps: WEBSITE_DEVELOPMENT_SERVICE_PROCESS_STEPS,
  },
};

import solutionFaqs from "@/data/solution-faqs.json";

export function getSolutionSlugs(): string[] {
  return Object.keys(SOLUTIONS_DATA);
}

export function getSolutionData(slug: string): SolutionData | null {
  const data = SOLUTIONS_DATA[slug];
  if (!data) return null;
  
  // Inject FAQs if available
  const faqs = (solutionFaqs as Record<string, Record<string, {q: string; a: string}[]>>)[slug];
  if (faqs) {
    return { ...data, faqs };
  }
  
  return data;
}

export function getAllSolutions(): SolutionData[] {
  return Object.values(SOLUTIONS_DATA).map(data => {
    const faqs = (solutionFaqs as Record<string, Record<string, {q: string; a: string}[]>>)[data.slug];
    if (faqs) {
      return { ...data, faqs };
    }
    return data;
  });
}
