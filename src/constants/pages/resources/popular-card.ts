import { HOME_IMAGES, HOME_IMAGES_META } from "@/assets/images";
import { StaticImageData } from "next/image";

export const PopularCardContent = [
  {
    src: HOME_IMAGES.AR_VR_IMAGE,
    alt: HOME_IMAGES_META.AR_VR_IMAGE.alt,
    date: "25.07.2025",
    title: "How Spatial Computing is Redefining Business Operations.",
    description:
      "Explore how spatial computing and immersive technologies are transforming enterprise workflows, retail, and operations in 2025.",
    author: "Jonnah Razel",
    slug: "spatial-computing-business-operations-2025",
  },
  {
    src: HOME_IMAGES.VR_TECH_IMAGE,
    alt: HOME_IMAGES_META.VR_TECH_IMAGE.alt,
    date: "25.07.2025",
    title: "Augmented Reality vs. Virtual Reality vs. Mixed Reality.",
    description:
      "Uncover the core differences between AR, VR, and MR, and discover real-world enterprise use cases powering business innovation.",
    author: "Jonnah Razel",
    slug: "ar-vr-mr-differences-business-use-cases-2025",
  },
] as const;

export type PopularCardContentType = {
  src: StaticImageData;
  alt: string;
  date: string;
  title: string;
  description: string;
  author: string;
  slug: string;
};
