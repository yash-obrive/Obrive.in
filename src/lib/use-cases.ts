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
  howItWorks: readonly any[];
  keyBenefits: readonly any[];
  workflowStepsSidebar: readonly string[];
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
