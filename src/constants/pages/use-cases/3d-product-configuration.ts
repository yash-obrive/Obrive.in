import { ICONS, ICONS_META } from "@/assets/images";

export const THREE_D_PRODUCT_CONFIGURATION_HERO = {
  title: "3D Product Configuration",
  description:
    "Let customers explore, personalize, and buy with confidence in real-time 3D.",
  description2:
    "Give customers an interactive way to configure products before purchase. Obrive 3D Product Configuration transforms complex options into intuitive visual experiences where users can switch colours, materials, components, accessories, packages, dimensions, and variants while seeing the result instantly across web, mobile, AR, VR, and in-store environments.",
  ctaButtons: {
    primary: "Explore Configurators",
    secondary: "SCHEDULE A DEMO",
  },
};

export const THREE_D_PRODUCT_CONFIGURATION_KEY_BENEFITS = [
  {
    title: "Interactive Experiences",
    description: "Let customers actively explore products instead of relying on static images.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Real-Time Customization",
    description: "Update colours, materials, components, and accessories instantly.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Higher Confidence",
    description: "Show the configured product clearly before a customer commits.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Lower Returns",
    description: "Reduce expectation gaps with accurate visual representation.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Multi-Channel Reach",
    description: "Deploy the same product experience across web, mobile, AR/VR, and retail.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export const THREE_D_PRODUCT_CONFIGURATION_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Interactive 3D Configurators",
    description: "Customize products with real-time visual updates.",
    src: "/images/use-cases/product_config_1.jpg",
    srcMeta: { alt: "Interactive 3D Configurators", width: 720, height: 405 },
  },
  {
    step: "02",
    title: "Photorealistic Rendering",
    description: "Show materials, finishes, textures, and lighting with high visual fidelity.",
    src: "/images/use-cases/product_config_2.jpg",
    srcMeta: { alt: "Photorealistic Rendering", width: 720, height: 405 },
  },
  {
    step: "03",
    title: "Rule-Based Configuration",
    description: "Manage compatible options, dependencies, packages, and product logic.",
    src: "/images/use-cases/product_config_3.jpg",
    srcMeta: { alt: "Rule-Based Configuration", width: 720, height: 405 },
  },
  {
    step: "04",
    title: "AR/VR Visualization",
    description: "Let customers experience products in real or immersive environments.",
    src: "/images/use-cases/product_config_4.jpg",
    srcMeta: { alt: "AR/VR Visualization", width: 720, height: 405 },
  },
] as const;

export const THREE_D_PRODUCT_CONFIGURATION_WORKFLOW_STEPS_SIDEBAR = [
  "Interactive 3D Configurators",
  "Photorealistic Rendering",
  "Rule-Based Configuration",
  "AR/VR Visualization",
] as const;

export const THREE_D_PRODUCT_CONFIGURATION_SIDEBAR_LINKS = [
  { id: "industries", label: "Industries & Applications" },
  { id: "why-choose", label: "Why Choose Obrive" },
  { id: "scope", label: "Use-Case Scope" },
] as const;

export const THREE_D_PRODUCT_CONFIGURATION_SERVICE_SECTIONS = [
  {
    id: "industries",
    title: "Industries & Applications",
    subtitle: "",
    description: "Bring your products to life across industries.",
    label: "Industries",
    items: [],
    footer: "",
    subSections: [
      { title: "Automotive", description: "Automotive and vehicle configurators." },
      { title: "Furniture", description: "Furniture and modular interiors." },
      { title: "Consumer Electronics", description: "Consumer product visualization." },
      { title: "Industrial Machinery", description: "Industrial machinery configurators." },
      { title: "Luxury Goods", description: "Luxury and lifestyle product experiences." }
    ]
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subtitle: "",
    description: "Create immersive product experiences that help customers understand, personalize, and act with confidence.",
    label: "Why Choose Obrive",
    items: [],
    footer: "",
    subSections: [
      { title: "Photorealistic Rendering", description: "Accurate materials, finishes, lighting, and textures." },
      { title: "Rule-Based Configuration", description: "Supports dependent options, compatibility, pricing, and product variants." },
      { title: "AR-Ready Visualization", description: "Lets customers place or preview products in real environments." },
      { title: "Seamless Integration", description: "Integration with ecommerce, CRM, ERP, CPQ, dealer, and lead-management systems." },
      { title: "Reusable 3D Assets", description: "Work across websites, sales teams, exhibitions, kiosks, and campaigns." }
    ]
  },
  {
    id: "scope",
    title: "Use-Case Scope",
    subtitle: "",
    description: "Common applications for 3D product configuration.",
    label: "Use-Case Scope",
    items: [],
    footer: "",
    subSections: [
      { title: "Automotive", description: "Automotive and vehicle configurators." },
      { title: "Furniture", description: "Furniture and modular interiors." },
      { title: "Machinery", description: "Industrial machinery configurators." },
      { title: "Consumer", description: "Consumer product visualization." },
      { title: "Luxury", description: "Luxury and lifestyle product experiences." },
      { title: "Discovery", description: "AR-enabled product discovery." }
    ]
  }
] as const;

