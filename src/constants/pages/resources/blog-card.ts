import type { StaticImageData } from "next/image";
import { getAllBlogs } from "@/lib/blogs";
import {
  CASE_STUDIES_IMAGES,
  RESOURCES_BLOG_IMAGES,
  RESOURCES_BLOG_IMAGES_META,
} from "@/assets/images";

const hardcodedContent: BlogCardContentType[] = [
  {
    src: RESOURCES_BLOG_IMAGES["spatial-computing-business-operations-2025"],
    alt: RESOURCES_BLOG_IMAGES_META[
      "spatial-computing-business-operations-2025"
    ].alt,
    date: "25.07.2025",
    title:
      "How Spatial Computing is Redefining Business Operations Across Industries in 2025.",
    description:
      "In 2025, businesses are no longer just operating in the digital world—they are immersed in it.",
    slug: "spatial-computing-business-operations-2025",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["ar-vr-mr-differences-business-use-cases-2025"],
    alt: RESOURCES_BLOG_IMAGES_META[
      "ar-vr-mr-differences-business-use-cases-2025"
    ].alt,
    date: "25.07.2025",
    title: "Augmented Reality vs. Virtual Reality vs. Mixed Reality",
    description:
      "The world of immersive technology is evolving rapidly, and terms like AR,VR,MR are shaping how businesses ",
    slug: "ar-vr-mr-differences-business-use-cases-2025",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES[
      "ar-powered-car-parking-systems-urban-mobility-challenges"
    ],
    alt: RESOURCES_BLOG_IMAGES_META[
      "ar-powered-car-parking-systems-urban-mobility-challenges"
    ].alt,
    date: "25.07.2025",
    title: "How AR-Powered Car Parking Systems are Solving Urban Mobility ...",
    description:
      "Urban mobility in 2025 is at a crossroads. With rising car ownership, limited parking spaces...",
    slug: "ar-powered-car-parking-systems-urban-mobility-challenges",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["future-augmented-reality-business-trends-2025"],
    alt: RESOURCES_BLOG_IMAGES_META[
      "future-augmented-reality-business-trends-2025"
    ].alt,
    date: "25.07.2025",
    title: "The Future of Augmented Reality in Business",
    description:
      "Not long ago, terms like spatial mapping and AR overlays felt futuristic, even sci-fi.",
    slug: "future-augmented-reality-business-trends-2025",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["webar-vs-app-ar-business-solution"],
    alt: RESOURCES_BLOG_IMAGES_META["webar-vs-app-ar-business-solution"].alt,
    date: "25.07.2025",
    title: "WebAR vs App AR: Which Augmented Reality Solution Fits...",
    description:
      "Not all AR is created equal. The choice between WebAR and App AR can define your UX",
    slug: "webar-vs-app-ar-business-solution",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["ar-packaging-immersive-customer-experiences"],
    alt: RESOURCES_BLOG_IMAGES_META[
      "ar-packaging-immersive-customer-experiences"
    ].alt,
    date: "25.07.2025",
    title: "AR Packaging: How Smart Packaging Creates Immersive...",
    description:
      "The turning point came in mid-2023. One of our retail clients was experimenting with promotional campaigns...",
    slug: "ar-packaging-immersive-customer-experiences",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["ar-printing-interactive-experiences"],
    alt: RESOURCES_BLOG_IMAGES_META["ar-printing-interactive-experiences"].alt,
    date: "25.07.2025",
    title: "AR Printing: Transforming Traditional Print into Interactive...",
    description:
      "Not long ago, if someone told me our brochures could come to life when scanned, I would've raised an eyebrow...",
    slug: "ar-printing-interactive-experiences",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["industries-benefit-ar-development"],
    alt: RESOURCES_BLOG_IMAGES_META["industries-benefit-ar-development"].alt,
    date: "23.08.25",
    title:
      "5 Industries That Can Immediately Benefit from AR Development Services",
    description:
      "Back in 2023, “augmented reality” was still niche talk—mostly for flashy marketing or novelty filters",
    slug: "industries-benefit-ar-development",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["ar-presentations-business-pitches"],
    alt: RESOURCES_BLOG_IMAGES_META["ar-presentations-business-pitches"].alt,
    date: "25.07.2025",
    title: "AR Presentations: How to Make Business Pitches Unforgettable",
    description:
      "Back in 2023, I thought augmented reality (AR) presentations were a flashy add-on:",
    slug: "ar-presentations-business-pitches",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["vr-training-workforce-development"],
    alt: RESOURCES_BLOG_IMAGES_META["vr-training-workforce-development"].alt,
    date: "25.07.2025",
    title:
      "VR Training: Why Virtual Reality Is the Future of Workforce Development",
    description:
      "Back in 2022, I thought VR training was cool, sure—but it felt gimmicky...",
    slug: "vr-training-workforce-development",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["vr-meetings-events-conferences"],
    alt: RESOURCES_BLOG_IMAGES_META["vr-meetings-events-conferences"].alt,
    date: "25.07.2025",
    title:
      "How VR Meetings and VR Events Are Replacing Traditional Conferences.",
    description:
      "Back in 2022, especially post-lockdown, I thought video conferencing had almost solved the remote meeting dilemma...",
    slug: "vr-meetings-events-conferences",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["web-vr-vs-app-vr-enterprises"],
    alt: RESOURCES_BLOG_IMAGES_META["web-vr-vs-app-vr-enterprises"].alt,
    date: "25.07.2025",
    title: "Web VR vs App VR: What’s the Best Choice for Enterprises?",
    description:
      "This read will take about 8–10 minutes—perfect for a thoughtful coffee break.",
    slug: "web-vr-vs-app-vr-enterprises",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["ar-vr-mr-differences-business-use-cases-2025"],
    alt: RESOURCES_BLOG_IMAGES_META[
      "ar-vr-mr-differences-business-use-cases-2025"
    ].alt,
    date: "25.07.2025",
    title: "AR vs VR vs MR: Understanding the Differences and Applications",
    description:
      "This read will take about 8–10 minutes—perfect for a thoughtful coffee break.",
    slug: "ar-vr-mr-differences-applications",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["mixed-reality-enterprise-productivity-2025"],
    alt: RESOURCES_BLOG_IMAGES_META[
      "mixed-reality-enterprise-productivity-2025"
    ].alt,
    date: "25.07.2025",
    title: "How Mixed Reality Is Driving Enterprise Productivity in 2025",
    description:
      "This read will take about 8–10 minutes—perfect for a thoughtful coffee break.",
    slug: "mixed-reality-enterprise-productivity-2025",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES[
      "mixed-reality-use-cases-manufacturing-healthcare-real-estate"
    ],
    alt: RESOURCES_BLOG_IMAGES_META[
      "mixed-reality-use-cases-manufacturing-healthcare-real-estate"
    ].alt,
    date: "25.07.2025",
    title:
      "Top Use Cases of Mixed Reality in Manufacturing, Healthcare, and Real Estate",
    description:
      "This read will take about 8–10 minutes—perfect for a thoughtful coffee break.",
    slug: "mixed-reality-use-cases-manufacturing-healthcare-real-estate",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["mixed-reality-digital-transformation"],
    alt: RESOURCES_BLOG_IMAGES_META["mixed-reality-digital-transformation"].alt,
    date: "25.07.2025",
    title:
      "Why Mixed Reality Will Be the Cornerstone of Digital Transformation",
    description:
      "This read will take about 8–10 minutes—perfect for a thoughtful coffee break.",
    slug: "mixed-reality-digital-transformation",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES["3d-rendering-real-estate"],
    alt: RESOURCES_BLOG_IMAGES_META["3d-rendering-real-estate"].alt,
    date: "23.08.25",
    title:
      "Transforming Global Real Estate Projects with Advanced 3D Visualization",
    description:
      "Visualizing the Future is no longer a luxury—it’s a business necessity.",
    slug: "3d-rendering-real-estate",
    type: "Blog",
  },
  {
    src: RESOURCES_BLOG_IMAGES[
      "3d-texturing-visualization-customer-engagement"
    ],
    alt: RESOURCES_BLOG_IMAGES_META[
      "3d-texturing-visualization-customer-engagement"
    ].alt,
    date: "25.07.2025",
    title: "How 3D Texturing and Visualization Enhance Customer Engagement",
    description:
      "This read will take about 8–10 minutes—perfect for a thoughtful coffee break.",
    slug: "3d-texturing-visualization-customer-engagement",
    type: "Blog",
  },
];

import caseStudiesData from "@/data/case-studies.json";

const jsonCaseStudies: BlogCardContentType[] = caseStudiesData.map((cs) => ({
  src: `/images/case-studies/${cs.image}`,
  alt: cs.title,
  date: "25.07.2025",
  title: cs.title,
  slug: cs.slug,
  description: cs.overview.slice(0, 150) + "...",
  type: "Case Studies" as const,
}));

const navbarCaseStudies: BlogCardContentType[] = [
  {
    src: CASE_STUDIES_IMAGES["HERO_IMAGE_ONE"],
    alt: "Bringing Onboarding to Life with Immersive Spatial Computing",
    date: "04.05.2025",
    title: "Bringing Onboarding to Life with Immersive Spatial Computing",
    description:
      "Discover how TechSolutions transformed employee onboarding with spatial computing—reducing training time by 80% and improving accuracy by 40%.",
    slug: "bringing-onboarding-to-life",
    type: "Case Studies",
  },
  {
    src: CASE_STUDIES_IMAGES["HERO_IMAGE_TWO"],
    alt: "From Field Friction to Spatial Flow",
    date: "04.05.2025",
    title: "From Field Friction to Spatial Flow A Real Transformation Story",
    description:
      "See how SafeBuild Corp transformed remote induction with spatial computing—reducing training time by 70% and boosting team collaboration by 80%.",
    slug: "spatial-flow",
    type: "Case Studies",
  },
  {
    src: CASE_STUDIES_IMAGES["HERO_IMAGE_THREE"],
    alt: "Breaking Onboarding Barriers with Augmented Reality",
    date: "08.04.2025",
    title: "Breaking Onboarding Barriers with Augmented Reality",
    description:
      "See how BuildSafe Solutions transformed employee onboarding with AR spatial computing—reducing training time from 2 weeks to 3 days with 80% better retention.",
    slug: "ar-onboarding",
    type: "Case Studies",
  },
  {
    src: CASE_STUDIES_IMAGES["HERO_IMAGE_FOUR"],
    alt: "Immersive Onboarding That Feels Like Reality",
    date: "08.04.2025",
    title:
      "Immersive Onboarding That Feels Like Reality - Through the eyes of the client",
    description:
      "Learn how FutureTech Industries revolutionized employee onboarding with immersive spatial computing—cutting training time by 70% with interactive 3D experiences.",
    slug: "client-immersive-onboarding",
    type: "Case Studies",
  },
];

const jsonBlogs: BlogCardContentType[] = getAllBlogs().map((blog) => ({
  src: "/images/blogs/blog-fallback.png",
  alt: blog.title,
  date: "25.07.2025",
  title: blog.title,
  slug: blog.slug,
  description: (blog.sections?.[0]?.content?.[0] || "").slice(0, 150) + "...",
  type: "Blog" as const,
}));

export const BlogCardContent: BlogCardContentType[] = [
  ...hardcodedContent,
  ...navbarCaseStudies,
  ...jsonBlogs,
  ...jsonCaseStudies,
];

export type BlogCardContentType = {
  src: StaticImageData | string;
  alt: string;
  date: string;
  title: string;
  slug: string;
  description: string;
  type?: "Blog" | "Case Studies";
};
