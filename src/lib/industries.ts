import type { StaticImageData } from "next/image";
import { IMAGES } from "@/assets/images";
import {
  ARCHITECTURE_ENGINEERING_INDUSTRY,
  AUTOMOTIVE_INDUSTRY,
  EDUCATION_INDUSTRY,
  ENTERPRISE_INDUSTRY,
  HEALTHCARE_INDUSTRY,
  MANUFACTURING_INDUSTRY,
  REAL_ESTATE_INDUSTRY,
  RETAIL_INDUSTRY,
} from "@/constants/pages/industries";
import type {
  ServiceSection,
  SidebarLink,
  WorkflowStep,
} from "@/types/solutions";

// Reusing identical structure as SolutionHero for compatibility
export interface IndustryHero {
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

// Reusing identical structure as SolutionData for compatibility
export interface IndustryData {
  slug: string;
  hero: IndustryHero;
  howItWorks?: readonly any[];
  keyBenefits: readonly any[];
  workflowStepsSidebar?: readonly string[];
  sidebarLinks?: readonly SidebarLink[];
  serviceSections?: readonly ServiceSection[];
  processSteps?: readonly WorkflowStep[];
}

const INDUSTRIES_DATA: Record<string, IndustryData> = {
  "real-estate": {
    slug: "real-estate",
    hero: {
      ...REAL_ESTATE_INDUSTRY.hero,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    howItWorks: REAL_ESTATE_INDUSTRY.howItWorks,
    keyBenefits: REAL_ESTATE_INDUSTRY.keyBenefits,
    workflowStepsSidebar: REAL_ESTATE_INDUSTRY.workflowStepsSidebar,
    sidebarLinks: REAL_ESTATE_INDUSTRY.sidebarLinks,
    serviceSections: REAL_ESTATE_INDUSTRY.serviceSections,
  },
  automotive: {
    slug: "automotive",
    hero: {
      ...AUTOMOTIVE_INDUSTRY.hero,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    howItWorks: AUTOMOTIVE_INDUSTRY.howItWorks,
    keyBenefits: AUTOMOTIVE_INDUSTRY.keyBenefits,
    workflowStepsSidebar: AUTOMOTIVE_INDUSTRY.workflowStepsSidebar,
    sidebarLinks: AUTOMOTIVE_INDUSTRY.sidebarLinks,
    serviceSections: AUTOMOTIVE_INDUSTRY.serviceSections,
  },
  retail: {
    slug: "retail",
    hero: {
      ...RETAIL_INDUSTRY.hero,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    howItWorks: RETAIL_INDUSTRY.howItWorks,
    keyBenefits: RETAIL_INDUSTRY.keyBenefits,
    workflowStepsSidebar: RETAIL_INDUSTRY.workflowStepsSidebar,
    sidebarLinks: RETAIL_INDUSTRY.sidebarLinks,
    serviceSections: RETAIL_INDUSTRY.serviceSections,
  },
  healthcare: {
    slug: "healthcare",
    hero: {
      ...HEALTHCARE_INDUSTRY.hero,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    howItWorks: HEALTHCARE_INDUSTRY.howItWorks,
    keyBenefits: HEALTHCARE_INDUSTRY.keyBenefits,
    workflowStepsSidebar: HEALTHCARE_INDUSTRY.workflowStepsSidebar,
    sidebarLinks: HEALTHCARE_INDUSTRY.sidebarLinks,
    serviceSections: HEALTHCARE_INDUSTRY.serviceSections,
  },
  manufacturing: {
    slug: "manufacturing",
    hero: {
      ...MANUFACTURING_INDUSTRY.hero,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    howItWorks: MANUFACTURING_INDUSTRY.howItWorks,
    keyBenefits: MANUFACTURING_INDUSTRY.keyBenefits,
    workflowStepsSidebar: MANUFACTURING_INDUSTRY.workflowStepsSidebar,
    sidebarLinks: MANUFACTURING_INDUSTRY.sidebarLinks,
    serviceSections: MANUFACTURING_INDUSTRY.serviceSections,
  },
  "architecture-engineering": {
    slug: "architecture-engineering",
    hero: {
      ...ARCHITECTURE_ENGINEERING_INDUSTRY.hero,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    howItWorks: ARCHITECTURE_ENGINEERING_INDUSTRY.howItWorks,
    keyBenefits: ARCHITECTURE_ENGINEERING_INDUSTRY.keyBenefits,
    workflowStepsSidebar: ARCHITECTURE_ENGINEERING_INDUSTRY.workflowStepsSidebar,
    sidebarLinks: ARCHITECTURE_ENGINEERING_INDUSTRY.sidebarLinks,
    serviceSections: ARCHITECTURE_ENGINEERING_INDUSTRY.serviceSections,
  },
  education: {
    slug: "education",
    hero: {
      ...EDUCATION_INDUSTRY.hero,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    howItWorks: EDUCATION_INDUSTRY.howItWorks,
    keyBenefits: EDUCATION_INDUSTRY.keyBenefits,
    workflowStepsSidebar: EDUCATION_INDUSTRY.workflowStepsSidebar,
    sidebarLinks: EDUCATION_INDUSTRY.sidebarLinks,
    serviceSections: EDUCATION_INDUSTRY.serviceSections,
  },
  enterprise: {
    slug: "enterprise",
    hero: {
      ...ENTERPRISE_INDUSTRY.hero,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    howItWorks: ENTERPRISE_INDUSTRY.howItWorks,
    keyBenefits: ENTERPRISE_INDUSTRY.keyBenefits,
    workflowStepsSidebar: ENTERPRISE_INDUSTRY.workflowStepsSidebar,
    sidebarLinks: ENTERPRISE_INDUSTRY.sidebarLinks,
    serviceSections: ENTERPRISE_INDUSTRY.serviceSections,
  },
};

export function getIndustrySlugs(): string[] {
  return Object.keys(INDUSTRIES_DATA);
}

export function getIndustryData(slug: string): IndustryData | null {
  return INDUSTRIES_DATA[slug] || null;
}

export function getAllIndustries(): IndustryData[] {
  return Object.values(INDUSTRIES_DATA);
}
