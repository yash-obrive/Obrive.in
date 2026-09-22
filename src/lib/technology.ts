import type { StaticImageData } from "next/image";
import { IMAGES } from "@/assets/images";
import type { ServiceSection, SidebarLink } from "@/types/services";
import {
  AI_IMMERSIVE_TECHNOLOGY,
  AUGMENTED_REALITY,
  DIGITAL_TWINS,
  EXTENDED_REALITY,
  MIXED_REALITY,
  SPATIAL_COMPUTING,
  THREE_D_VISUALIZATION,
  VIRTUAL_REALITY,
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
  sidebarLinks?: readonly SidebarLink[];
  serviceSections?: readonly ServiceSection[];
}

const TECHNOLOGIES_DATA: Record<string, TechnologyData> = {
  "augmented-reality": {
    slug: "augmented-reality",
    hero: { ...AUGMENTED_REALITY.hero, backgroundImage: IMAGES.OBNAVI_HERO },
    howItWorks: AUGMENTED_REALITY.howItWorks,
    keyBenefits: AUGMENTED_REALITY.keyBenefits,
    workflowStepsSidebar: AUGMENTED_REALITY.workflowStepsSidebar,
    sidebarLinks: AUGMENTED_REALITY.sidebarLinks,
    serviceSections: AUGMENTED_REALITY.serviceSections,
  },
  "virtual-reality": {
    slug: "virtual-reality",
    hero: { ...VIRTUAL_REALITY.hero, backgroundImage: IMAGES.OBNEST_HERO },
    howItWorks: VIRTUAL_REALITY.howItWorks,
    keyBenefits: VIRTUAL_REALITY.keyBenefits,
    workflowStepsSidebar: VIRTUAL_REALITY.workflowStepsSidebar,
    sidebarLinks: VIRTUAL_REALITY.sidebarLinks,
    serviceSections: VIRTUAL_REALITY.serviceSections,
  },
  "mixed-reality": {
    slug: "mixed-reality",
    hero: { ...MIXED_REALITY.hero, backgroundImage: IMAGES.OBMOVE_HERO },
    howItWorks: MIXED_REALITY.howItWorks,
    keyBenefits: MIXED_REALITY.keyBenefits,
    workflowStepsSidebar: MIXED_REALITY.workflowStepsSidebar,
    sidebarLinks: MIXED_REALITY.sidebarLinks,
    serviceSections: MIXED_REALITY.serviceSections,
  },
  "extended-reality": {
    slug: "extended-reality",
    hero: { ...EXTENDED_REALITY.hero, backgroundImage: IMAGES.OBPARK_HERO },
    howItWorks: EXTENDED_REALITY.howItWorks,
    keyBenefits: EXTENDED_REALITY.keyBenefits,
    workflowStepsSidebar: EXTENDED_REALITY.workflowStepsSidebar,
    sidebarLinks: EXTENDED_REALITY.sidebarLinks,
    serviceSections: EXTENDED_REALITY.serviceSections,
  },
  "spatial-computing": {
    slug: "spatial-computing",
    hero: { ...SPATIAL_COMPUTING.hero, backgroundImage: IMAGES.OBNAVI_HERO },
    howItWorks: SPATIAL_COMPUTING.howItWorks,
    keyBenefits: SPATIAL_COMPUTING.keyBenefits,
    workflowStepsSidebar: SPATIAL_COMPUTING.workflowStepsSidebar,
    sidebarLinks: SPATIAL_COMPUTING.sidebarLinks,
    serviceSections: SPATIAL_COMPUTING.serviceSections,
  },
  "digital-twins": {
    slug: "digital-twins",
    hero: { ...DIGITAL_TWINS.hero, backgroundImage: IMAGES.OBNEST_HERO },
    howItWorks: DIGITAL_TWINS.howItWorks,
    keyBenefits: DIGITAL_TWINS.keyBenefits,
    workflowStepsSidebar: DIGITAL_TWINS.workflowStepsSidebar,
    sidebarLinks: DIGITAL_TWINS.sidebarLinks,
    serviceSections: DIGITAL_TWINS.serviceSections,
  },
  "3d-visualization": {
    slug: "3d-visualization",
    hero: { ...THREE_D_VISUALIZATION.hero, backgroundImage: IMAGES.OBMOVE_HERO },
    howItWorks: THREE_D_VISUALIZATION.howItWorks,
    keyBenefits: THREE_D_VISUALIZATION.keyBenefits,
    workflowStepsSidebar: THREE_D_VISUALIZATION.workflowStepsSidebar,
    sidebarLinks: THREE_D_VISUALIZATION.sidebarLinks,
    serviceSections: THREE_D_VISUALIZATION.serviceSections,
  },
  "ai-immersive-technology": {
    slug: "ai-immersive-technology",
    hero: { ...AI_IMMERSIVE_TECHNOLOGY.hero, backgroundImage: IMAGES.OBPARK_HERO },
    howItWorks: AI_IMMERSIVE_TECHNOLOGY.howItWorks,
    keyBenefits: AI_IMMERSIVE_TECHNOLOGY.keyBenefits,
    workflowStepsSidebar: AI_IMMERSIVE_TECHNOLOGY.workflowStepsSidebar,
    sidebarLinks: AI_IMMERSIVE_TECHNOLOGY.sidebarLinks,
    serviceSections: AI_IMMERSIVE_TECHNOLOGY.serviceSections,
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
