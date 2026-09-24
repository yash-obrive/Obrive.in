import { SOCIAL_ICONS, SOCIAL_ICONS_META } from "@/assets/images";

export const GROUPS = [
  {
    title: "Products",
    items: [
      { label: "Obpark", href: "/products/obpark" },
      { label: "Obcrew", href: "/products/obcrew" },
      { label: "Obnavi", href: "/products/obnavi" },
      { label: "Obnest", href: "/products/obnest" },
      { label: "Obmove", href: "/products/obmove" },
    ],
    bottomLink: { label: "Obrive Resources", href: "/resources" },
  },
  {
    title: "What We Build",
    items: [
      {
        label: "Spatial Computing",
        href: "/services/spatial-computing-app-development",
      },
      {
        label: "AR Development",
        href: "/services/augmented-reality-development",
      },
      {
        label: "VR Development",
        href: "/services/virtual-reality-development",
      },
      {
        label: "MR Development",
        href: "/services/mixed-reality-development",
      },
      { label: "3D Development", href: "/services/3d-design-development" },
    ],
    bottomLink: { label: "Obrive Help Desk", href: "/support/help-center" },
  },
  {
    title: "Industries",
    items: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Education", href: "/industries/education" },
    ],
    bottomLink: { label: "Obrive Legal", href: "/legal" },
  },
  {
    title: "Company",
    items: [
      { label: "About Obrive", href: "/about" },
      { label: "White Label Partners", href: "/partners" },
      { label: "Join the Otters", href: "/career" },
      { label: "Community Forum", href: "/community-forum" },
      { label: "Site Map", href: "/site-map" },
    ],
    bottomLink: { label: "Global Market", href: "/global" },
  },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/obrive-industries",
    icon: SOCIAL_ICONS.SOCIAL_LINKEDIN,
    meta: SOCIAL_ICONS_META.SOCIAL_LINKEDIN,
  },
  {
    href: "https://www.instagram.com/obrive.inc",
    icon: SOCIAL_ICONS.SOCIAL_INSTAGRAM,
    meta: SOCIAL_ICONS_META.SOCIAL_INSTAGRAM,
  },
  {
    href: "https://www.facebook.com/obriveindustries/",
    icon: SOCIAL_ICONS.SOCIAL_FACEBOOK,
    meta: SOCIAL_ICONS_META.SOCIAL_FACEBOOK,
  },
  {
    href: "https://x.com/obriveinc",
    icon: SOCIAL_ICONS.SOCIAL_TWITTER,
    meta: SOCIAL_ICONS_META.SOCIAL_TWITTER,
  },
  {
    href: "https://medium.com/@obrive.inc",
    icon: SOCIAL_ICONS.SOCIAL_MEDIUM,
    meta: SOCIAL_ICONS_META.SOCIAL_MEDIUM,
  },
] as const;

export const PRIMARY_FOOTER_CARD = {
  title: "THE FUTURE ISN'T FLAT.\nIT'S SPATIAL.",
  description:
    "Simplify the creation and deployment of Augmented Reality, Virtual Reality, Mixed Reality, 3D design, and Spatial Computing projects through automated asset integration, real-time rendering, and seamless collaboration—all designed to bring your vision to life faster and smarter.",
} as const;
