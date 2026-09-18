import type { StaticImageData } from "next/image";
import { IMAGES } from "@/assets/images";
import {
  AR_PRODUCT_VISUALIZATION,
  DIGITAL_TWINS,
  INDOOR_NAVIGATION,
  REMOTE_ASSISTANCE,
  THREE_D_PRODUCT_CONFIGURATION,
  VIRTUAL_PROPERTY_TOURS,
  VIRTUAL_SHOWROOMS,
  VIRTUAL_TRAINING,
} from "@/constants/pages/use-cases";

import type {
  ServiceSection,
  SidebarLink,
  WorkflowStep,
} from "@/types/solutions";

// Reusing identical structure as SolutionHero for compatibility
export interface UseCaseHero {
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
export interface UseCaseData {
  slug: string;
  hero: UseCaseHero;
  howItWorks?: readonly any[];
  keyBenefits: readonly any[];
  workflowStepsSidebar?: readonly string[];
  sidebarLinks?: readonly SidebarLink[];
  serviceSections?: readonly ServiceSection[];
  processSteps?: readonly WorkflowStep[];
}

const USE_CASES_DATA: Record<string, UseCaseData> = {
  "ar-product-visualization": {
    slug: "ar-product-visualization",
    hero: {
      ...AR_PRODUCT_VISUALIZATION.hero,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    howItWorks: AR_PRODUCT_VISUALIZATION.howItWorks,
    keyBenefits: AR_PRODUCT_VISUALIZATION.keyBenefits,
    workflowStepsSidebar: AR_PRODUCT_VISUALIZATION.workflowStepsSidebar,
    sidebarLinks: AR_PRODUCT_VISUALIZATION.sidebarLinks,
    serviceSections: AR_PRODUCT_VISUALIZATION.serviceSections,
  },
  "virtual-training": {
    slug: "virtual-training",
    hero: {
      ...VIRTUAL_TRAINING.hero,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    howItWorks: VIRTUAL_TRAINING.howItWorks,
    keyBenefits: VIRTUAL_TRAINING.keyBenefits,
    workflowStepsSidebar: VIRTUAL_TRAINING.workflowStepsSidebar,
    sidebarLinks: VIRTUAL_TRAINING.sidebarLinks,
    serviceSections: VIRTUAL_TRAINING.serviceSections,
  },
  "digital-twins": {
    slug: "digital-twins",
    hero: {
      ...DIGITAL_TWINS.hero,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    howItWorks: DIGITAL_TWINS.howItWorks,
    keyBenefits: DIGITAL_TWINS.keyBenefits,
    workflowStepsSidebar: DIGITAL_TWINS.workflowStepsSidebar,
    sidebarLinks: DIGITAL_TWINS.sidebarLinks,
    serviceSections: DIGITAL_TWINS.serviceSections,
  },
  "virtual-showrooms": {
    slug: "virtual-showrooms",
    hero: {
      ...VIRTUAL_SHOWROOMS.hero,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    howItWorks: VIRTUAL_SHOWROOMS.howItWorks,
    keyBenefits: VIRTUAL_SHOWROOMS.keyBenefits,
    workflowStepsSidebar: VIRTUAL_SHOWROOMS.workflowStepsSidebar,
    sidebarLinks: VIRTUAL_SHOWROOMS.sidebarLinks,
    serviceSections: VIRTUAL_SHOWROOMS.serviceSections,
  },
  "indoor-navigation": {
    slug: "indoor-navigation",
    hero: {
      ...INDOOR_NAVIGATION.hero,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    howItWorks: INDOOR_NAVIGATION.howItWorks,
    keyBenefits: INDOOR_NAVIGATION.keyBenefits,
    workflowStepsSidebar: INDOOR_NAVIGATION.workflowStepsSidebar,
    sidebarLinks: INDOOR_NAVIGATION.sidebarLinks,
    serviceSections: INDOOR_NAVIGATION.serviceSections,
  },
  "3d-product-configuration": {
    slug: "3d-product-configuration",
    hero: {
      ...THREE_D_PRODUCT_CONFIGURATION.hero,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    howItWorks: THREE_D_PRODUCT_CONFIGURATION.howItWorks,
    keyBenefits: THREE_D_PRODUCT_CONFIGURATION.keyBenefits,
    workflowStepsSidebar: THREE_D_PRODUCT_CONFIGURATION.workflowStepsSidebar,
    sidebarLinks: THREE_D_PRODUCT_CONFIGURATION.sidebarLinks,
    serviceSections: THREE_D_PRODUCT_CONFIGURATION.serviceSections,
  },
  "virtual-property-tours": {
    slug: "virtual-property-tours",
    hero: {
      ...VIRTUAL_PROPERTY_TOURS.hero,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    howItWorks: VIRTUAL_PROPERTY_TOURS.howItWorks,
    keyBenefits: VIRTUAL_PROPERTY_TOURS.keyBenefits,
    workflowStepsSidebar: VIRTUAL_PROPERTY_TOURS.workflowStepsSidebar,
    sidebarLinks: VIRTUAL_PROPERTY_TOURS.sidebarLinks,
    serviceSections: VIRTUAL_PROPERTY_TOURS.serviceSections,
  },
  "remote-assistance": {
    slug: "remote-assistance",
    hero: {
      ...REMOTE_ASSISTANCE.hero,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    howItWorks: REMOTE_ASSISTANCE.howItWorks,
    keyBenefits: REMOTE_ASSISTANCE.keyBenefits,
    workflowStepsSidebar: REMOTE_ASSISTANCE.workflowStepsSidebar,
    sidebarLinks: REMOTE_ASSISTANCE.sidebarLinks,
    serviceSections: REMOTE_ASSISTANCE.serviceSections,
  },
};

export function getUseCaseSlugs(): string[] {
  return Object.keys(USE_CASES_DATA);
}

export function getUseCaseData(slug: string): UseCaseData | null {
  return USE_CASES_DATA[slug] || null;
}

export function getAllUseCases(): UseCaseData[] {
  return Object.values(USE_CASES_DATA);
}
