import { StaticImageData } from "next/image";
import { IMAGES } from "@/assets/images";
import {
  AUGMENTED_REALITY,
  VIRTUAL_REALITY,
  MIXED_REALITY,
  EXTENDED_REALITY,
  SPATIAL_COMPUTING,
  DIGITAL_TWINS,
  THREE_D_VISUALIZATION,
  AI_IMMERSIVE_TECHNOLOGY,
} from "@/constants/pages/technology";

// Reusing identical structure as SolutionHero for compatibility
export interface TechnologyHero {
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
export interface TechnologyData {
  slug: string;
  hero: TechnologyHero;
  howItWorks: readonly any[];
  keyBenefits: readonly any[];
  workflowStepsSidebar: readonly string[];
}

const TECHNOLOGIES_DATA: Record<string, TechnologyData> = {
  "augmented-reality": {
    slug: "augmented-reality",
    hero: {
      ...AUGMENTED_REALITY.hero,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    howItWorks: AUGMENTED_REALITY.howItWorks,
    keyBenefits: AUGMENTED_REALITY.keyBenefits,
    workflowStepsSidebar: AUGMENTED_REALITY.workflowStepsSidebar,
  },
  "virtual-reality": {
    slug: "virtual-reality",
    hero: {
      ...VIRTUAL_REALITY.hero,
      backgroundImage: IMAGES.OBNEST_HERO,
    },
    howItWorks: VIRTUAL_REALITY.howItWorks,
    keyBenefits: VIRTUAL_REALITY.keyBenefits,
    workflowStepsSidebar: VIRTUAL_REALITY.workflowStepsSidebar,
  },
  "mixed-reality": {
    slug: "mixed-reality",
    hero: {
      ...MIXED_REALITY.hero,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    howItWorks: MIXED_REALITY.howItWorks,
    keyBenefits: MIXED_REALITY.keyBenefits,
    workflowStepsSidebar: MIXED_REALITY.workflowStepsSidebar,
  },
  "extended-reality": {
    slug: "extended-reality",
    hero: {
      ...EXTENDED_REALITY.hero,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    howItWorks: EXTENDED_REALITY.howItWorks,
    keyBenefits: EXTENDED_REALITY.keyBenefits,
    workflowStepsSidebar: EXTENDED_REALITY.workflowStepsSidebar,
  },
  "spatial-computing": {
    slug: "spatial-computing",
    hero: {
      ...SPATIAL_COMPUTING.hero,
      backgroundImage: IMAGES.OBNAVI_HERO,
    },
    howItWorks: SPATIAL_COMPUTING.howItWorks,
    keyBenefits: SPATIAL_COMPUTING.keyBenefits,
    workflowStepsSidebar: SPATIAL_COMPUTING.workflowStepsSidebar,
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
  "3d-visualization": {
    slug: "3d-visualization",
    hero: {
      ...THREE_D_VISUALIZATION.hero,
      backgroundImage: IMAGES.OBMOVE_HERO,
    },
    howItWorks: THREE_D_VISUALIZATION.howItWorks,
    keyBenefits: THREE_D_VISUALIZATION.keyBenefits,
    workflowStepsSidebar: THREE_D_VISUALIZATION.workflowStepsSidebar,
  },
  "ai-immersive-technology": {
    slug: "ai-immersive-technology",
    hero: {
      ...AI_IMMERSIVE_TECHNOLOGY.hero,
      backgroundImage: IMAGES.OBPARK_HERO,
    },
    howItWorks: AI_IMMERSIVE_TECHNOLOGY.howItWorks,
    keyBenefits: AI_IMMERSIVE_TECHNOLOGY.keyBenefits,
    workflowStepsSidebar: AI_IMMERSIVE_TECHNOLOGY.workflowStepsSidebar,
  },
};

export function getTechnologySlugs(): string[] {
  return Object.keys(TECHNOLOGIES_DATA);
}

export function getTechnologyData(slug: string): TechnologyData | null {
  return TECHNOLOGIES_DATA[slug] || null;
}

export function getAllTechnologies(): TechnologyData[] {
  return Object.values(TECHNOLOGIES_DATA);
}
