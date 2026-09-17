import { StaticImageData } from "next/image";
import { IMAGES } from "@/assets/images";
import { SidebarLink, ServiceSection, WorkflowStep } from "@/types/solutions";
import {
  AR_DEVELOPMENT_HERO,
  AR_DEVELOPMENT_HOW_IT_WORKS,
  AR_DEVELOPMENT_KEY_BENEFITS,
  AR_DEVELOPMENT_WORKFLOW_STEPS_SIDEBAR,
  AR_DEVELOPMENT_FAQS,
  AR_DEVELOPMENT_FAQS_META,
  AR_DEVELOPMENT_SIDEBAR_LINKS,
  AR_DEVELOPMENT_SERVICE_SECTIONS,
  AR_DEVELOPMENT_PROCESS_STEPS,
} from "@/constants/pages/solutions/ar-development";
import {
  VR_DEVELOPMENT_HERO,
  VR_DEVELOPMENT_HOW_IT_WORKS,
  VR_DEVELOPMENT_KEY_BENEFITS,
  VR_DEVELOPMENT_WORKFLOW_STEPS_SIDEBAR,
  VR_DEVELOPMENT_FAQS,
  VR_DEVELOPMENT_FAQS_META,
  VR_DEVELOPMENT_SIDEBAR_LINKS,
  VR_DEVELOPMENT_SERVICE_SECTIONS,
  VR_DEVELOPMENT_PROCESS_STEPS,
} from "@/constants/pages/solutions/vr-development";
import {
  THREE_D_DESIGN_HERO,
  THREE_D_DESIGN_HOW_IT_WORKS,
  THREE_D_DESIGN_KEY_BENEFITS,
  THREE_D_DESIGN_WORKFLOW_STEPS_SIDEBAR,
  THREE_D_DESIGN_FAQS,
  THREE_D_DESIGN_FAQ_META,
  THREE_D_DESIGN_SIDEBAR_LINKS,
  THREE_D_DESIGN_SERVICE_SECTIONS,
  THREE_D_DESIGN_PROCESS_STEPS,
} from "@/constants/pages/solutions/3d-design-development";
import {
  SPATIAL_COMPUTING_HERO,
  SPATIAL_COMPUTING_HOW_IT_WORKS,
  SPATIAL_COMPUTING_KEY_BENEFITS,
  SPATIAL_COMPUTING_WORKFLOW_STEPS_SIDEBAR,
  SPATIAL_COMPUTING_FAQS,
  SPATIAL_COMPUTING_FAQ_META,
  SPATIAL_COMPUTING_SIDEBAR_LINKS,
  SPATIAL_COMPUTING_SERVICE_SECTIONS,
  SPATIAL_COMPUTING_PROCESS_STEPS,
} from "@/constants/pages/solutions/spatial-computing-development";

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

export interface SolutionFAQItem {
  question: string;
  answer: string;
}

export interface SolutionFAQCategory {
  title: string;
  items: SolutionFAQItem[];
}

export interface SolutionFAQMeta {
  title: string;
  description?: string;
}

export interface SolutionData {
  slug: string;
  hero: SolutionHero;
  howItWorks: readonly any[];
  keyBenefits: readonly any[];
  workflowStepsSidebar: readonly string[];
  faqs?: readonly SolutionFAQCategory[];
  faqMeta?: SolutionFAQMeta;
  sidebarLinks?: readonly SidebarLink[];
  serviceSections?: readonly ServiceSection[];
  processSteps?: readonly WorkflowStep[];
}

const SOLUTIONS_DATA: Record<string, SolutionData> = {
  "augmented-reality-development": {
    slug: "augmented-reality-development",
    hero: {
      ...AR_DEVELOPMENT_HERO,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    howItWorks: AR_DEVELOPMENT_HOW_IT_WORKS,
    keyBenefits: AR_DEVELOPMENT_KEY_BENEFITS,
    workflowStepsSidebar: AR_DEVELOPMENT_WORKFLOW_STEPS_SIDEBAR,
    faqs: AR_DEVELOPMENT_FAQS,
    faqMeta: AR_DEVELOPMENT_FAQS_META,
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
    howItWorks: VR_DEVELOPMENT_HOW_IT_WORKS,
    keyBenefits: VR_DEVELOPMENT_KEY_BENEFITS,
    workflowStepsSidebar: VR_DEVELOPMENT_WORKFLOW_STEPS_SIDEBAR,
    faqs: VR_DEVELOPMENT_FAQS,
    faqMeta: VR_DEVELOPMENT_FAQS_META,
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
    howItWorks: THREE_D_DESIGN_HOW_IT_WORKS,
    keyBenefits: THREE_D_DESIGN_KEY_BENEFITS,
    workflowStepsSidebar: THREE_D_DESIGN_WORKFLOW_STEPS_SIDEBAR,
    faqs: THREE_D_DESIGN_FAQS,
    faqMeta: THREE_D_DESIGN_FAQ_META,
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
    howItWorks: SPATIAL_COMPUTING_HOW_IT_WORKS,
    keyBenefits: SPATIAL_COMPUTING_KEY_BENEFITS,
    workflowStepsSidebar: SPATIAL_COMPUTING_WORKFLOW_STEPS_SIDEBAR,
    faqs: SPATIAL_COMPUTING_FAQS,
    faqMeta: SPATIAL_COMPUTING_FAQ_META,
    sidebarLinks: SPATIAL_COMPUTING_SIDEBAR_LINKS,
    serviceSections: SPATIAL_COMPUTING_SERVICE_SECTIONS,
    processSteps: SPATIAL_COMPUTING_PROCESS_STEPS,
  },
};

export function getSolutionSlugs(): string[] {
  return Object.keys(SOLUTIONS_DATA);
}

export function getSolutionData(slug: string): SolutionData | null {
  return SOLUTIONS_DATA[slug] || null;
}

export function getAllSolutions(): SolutionData[] {
  return Object.values(SOLUTIONS_DATA);
}
