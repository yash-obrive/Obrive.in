import type { StaticImageData } from "next/image";
import type React from "react";
import { HOME_IMAGES, HOME_IMAGES_META } from "@/assets/images";
import AkarIcon from "@/components/pages/home/icons/AkarIcon";
import SpatialIcon from "@/components/pages/home/icons/SpatialIcon";
import ThreeDIcon from "@/components/pages/home/icons/ThreeDBoxIcon";
import UserIcon from "@/components/pages/home/icons/UserIcon";
import VRIcon from "@/components/pages/home/icons/VRIcon";

export const HOME_CARD = [
  {
    title: "AR PRODUCT VISUALIZATION.",
    description: `Put lifelike 3D products directly into the real world. Help customers understand, explore and experience products before they buy.`,
    icon: AkarIcon,
    use: "SEE IT BEFORE IT EXISTS",
    url: "/services/augmented-reality-development",
  },
  {
    title: "VR TRAINING & SIMULATION.",
    description: `Turn complex training into immersive experiences. Let teams learn, practice and make decisions inside realistic virtual environments.`,
    icon: VRIcon,
    use: "TRAIN WITHOUT THE RISK",
    url: "/services/virtual-reality-development",
  },
  {
    title: "MIXED REALITY.",
    description: `Bring teams, ideas and 3D models together—even when they're miles apart. Design, review and collaborate in shared spatial environments.`,
    icon: UserIcon,
    use: "COLLABORATE IN THREE DIMENSIONS",
    url: "/services/mixed-reality-development",
  },
  {
    title: "3D & DIGITAL TWINS.",
    description: `Walk through spaces before they're built. Visualize buildings, products and environments through interactive 3D experiences.`,
    icon: ThreeDIcon,
    use: "EXPERIENCE WHAT YOU'RE BUILDING",
    url: "/services/3d-design-development",
  },
  {
    title: "SPATIAL COMPUTING.",
    description: `Create experiences that understand location, environment and context. From navigation and retail to smart spaces and enterprise operations.`,
    icon: SpatialIcon,
    use: "MAKE PLACES INTELLIGENT",
    url: "/services/spatial-computing-app-development",
  },
] as const;

export const HOME_CARD_BLOG = [
  {
    imageSrc: HOME_IMAGES.AR_VR_IMAGE,
    imgWidth: HOME_IMAGES_META.AR_VR_IMAGE.width,
    imgHeight: HOME_IMAGES_META.AR_VR_IMAGE.height,
    imgAlt: HOME_IMAGES_META.AR_VR_IMAGE.alt,
    title: `Augmented Reality vs. Virtual Reality vs. Mixed Reality: Key Differences.`,
    date: "30.07.25",
    slug: "ar-vr-mr-differences-business-use-cases-2025",
    description:
      "Learn the key differences between AR, VR, and MR and how to choose the right one for your business.",
  },
  {
    imageSrc: HOME_IMAGES.VR_TECH_IMAGE,
    imgWidth: HOME_IMAGES_META.VR_TECH_IMAGE.width,
    imgHeight: HOME_IMAGES_META.VR_TECH_IMAGE.height,
    imgAlt: HOME_IMAGES_META.VR_TECH_IMAGE.alt,
    title: `How Spatial Computing is Redefining Business Operation.`,
    date: "30.07.25",
    slug: "spatial-computing-business-operations-2025",
    description:
      "Discover how spatial computing is transforming industries and creating new opportunities for growth.",
  },
  {
    imageSrc: HOME_IMAGES.PARKING_IMAGE,
    imgWidth: HOME_IMAGES_META.PARKING_IMAGE.width,
    imgHeight: HOME_IMAGES_META.PARKING_IMAGE.height,
    imgAlt: HOME_IMAGES_META.PARKING_IMAGE.alt,
    title: `How AR-Powered Car Parking Systems are Solving Urban Mobility.`,
    date: "30.07.25",
    slug: "ar-powered-car-parking-systems-urban-mobility-challenges",
    description:
      "Explore how augmented reality is revolutionizing urban mobility with smart parking solutions.",
  },
];

export type HomeCard = {
  title: string;
  description: string;
  icon: React.ComponentType;
  use: string;
  url: string;
};

export type HomeCardBlog = {
  imageSrc: string | StaticImageData;
  imgWidth: number;
  imgHeight: number;
  imgAlt: string;
  title: string;
  date: string;
  slug: string;
  description: string;
};
