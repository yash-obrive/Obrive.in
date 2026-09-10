export interface PricingFeature {
  text: string;
}

export interface PricingPackage {
  id: string; // Internal identifier for CTA (e.g. "ar", "website-design")
  name: string;
  category: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  features: PricingFeature[];
  isPopular?: boolean;
  isBestSeller?: boolean;
  isRecommended?: boolean;
  isMonthly?: boolean;
  ctaText: string;
}

export interface ServiceStream {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  packages: PricingPackage[];
}

export const PRICING_STREAMS: ServiceStream[] = [
  {
    id: "immersive-spatial",
    number: "01",
    title: "Immersive & Spatial",
    subtitle: "AR · VR · MR · 3D · Spatial Computing",
    packages: [
      {
        id: "ar",
        category: "Immersive",
        name: "AR Experience",
        description: "Web/mobile AR, product visualization, campaigns and interactive overlays.",
        priceINR: 150000,
        priceUSD: 1725,
        features: [
          { text: "AR UX & interaction" },
          { text: "3D integration" },
          { text: "Device/browser QA" },
          { text: "Deployment handoff" },
        ],
        ctaText: "Start AR →",
      },
      {
        id: "vr",
        category: "Immersive",
        name: "VR Experience",
        description: "Training, simulation, virtual tours and branded VR environments.",
        priceINR: 250000,
        priceUSD: 2875,
        features: [
          { text: "VR UX" },
          { text: "Environment & interaction" },
          { text: "Device optimisation" },
          { text: "Build & QA" },
        ],
        ctaText: "Start VR →",
      },
      {
        id: "mr",
        category: "Enterprise",
        name: "MR Experience",
        description: "Mixed-reality product demos, industrial workflows and collaborative experiences.",
        priceINR: 350000,
        priceUSD: 4025,
        features: [
          { text: "Spatial UX" },
          { text: "3D assets & interactions" },
          { text: "Device deployment" },
          { text: "Technical handoff" },
        ],
        isPopular: true,
        ctaText: "Build MR →",
      },
      {
        id: "3d",
        category: "3D",
        name: "3D Visualization",
        description: "Product, architectural and interactive 3D assets for web and immersive platforms.",
        priceINR: 100000,
        priceUSD: 1150,
        features: [
          { text: "Modeling" },
          { text: "Materials & lighting" },
          { text: "Render optimisation" },
          { text: "Export-ready assets" },
        ],
        ctaText: "Create 3D →",
      },
      {
        id: "spatial",
        category: "Spatial",
        name: "Spatial Computing",
        description: "Spatial apps and experiences for XR, enterprise environments and emerging devices.",
        priceINR: 500000,
        priceUSD: 5750,
        features: [
          { text: "Spatial architecture" },
          { text: "Interaction system" },
          { text: "Prototype" },
          { text: "Deployment support" },
        ],
        ctaText: "Build Spatial →",
      },
    ],
  },
  {
    id: "digital-product-design",
    number: "02",
    title: "Digital Product Design",
    subtitle: "UX · UI · Product Systems",
    packages: [
      {
        id: "website-design",
        category: "Web",
        name: "Website Design",
        description: "Premium responsive UX/UI for corporate, product and conversion-focused websites.",
        priceINR: 100000,
        priceUSD: 1150,
        features: [
          { text: "Discovery & sitemap" },
          { text: "Wireframes" },
          { text: "UI design system" },
          { text: "Responsive screens" },
        ],
        ctaText: "Design Website →",
      },
      {
        id: "mobile-design",
        category: "Mobile",
        name: "Mobile App Design",
        description: "Research-led iOS & Android UX/UI with a scalable component system.",
        priceINR: 150000,
        priceUSD: 1725,
        features: [
          { text: "User flows" },
          { text: "Wireframes" },
          { text: "UI system" },
          { text: "Clickable prototype" },
        ],
        ctaText: "Design App →",
      },
      {
        id: "product-design",
        category: "Product",
        name: "Product UX/UI System",
        description: "End-to-end product design for SaaS, portals, dashboards and complex workflows.",
        priceINR: 250000,
        priceUSD: 2875,
        features: [
          { text: "Research" },
          { text: "UX architecture" },
          { text: "Design system" },
          { text: "Prototype & handoff" },
        ],
        ctaText: "Design Product →",
      },
    ],
  },
  {
    id: "software-engineering",
    number: "03",
    title: "Software Engineering",
    subtitle: "Web · Mobile · Platforms",
    packages: [
      {
        id: "website-development",
        category: "Engineering",
        name: "Website Development",
        description: "High-performance React/Next.js websites with CMS, analytics and integrations.",
        priceINR: 250000,
        priceUSD: 2875,
        features: [
          { text: "Frontend build" },
          { text: "CMS/API integration" },
          { text: "SEO foundation" },
          { text: "QA & deployment" },
        ],
        ctaText: "Develop Website →",
      },
      {
        id: "mobile-development",
        category: "Mobile Engineering",
        name: "Mobile App Development",
        description: "Production-ready iOS & Android apps with backend, APIs and store release support.",
        priceINR: 450000,
        priceUSD: 5175,
        features: [
          { text: "Cross-platform app" },
          { text: "Backend & APIs" },
          { text: "Auth & analytics" },
          { text: "QA + store support" },
        ],
        isBestSeller: true,
        ctaText: "Build App →",
      },
      {
        id: "saas",
        category: "SaaS / MVP",
        name: "Web App / SaaS MVP",
        description: "Validated MVPs with authentication, dashboards, databases and integrations.",
        priceINR: 500000,
        priceUSD: 5750,
        features: [
          { text: "Architecture" },
          { text: "Frontend + backend" },
          { text: "Database" },
          { text: "Cloud deployment" },
        ],
        ctaText: "Build MVP →",
      },
      {
        id: "platform",
        category: "Enterprise",
        name: "Custom Digital Platform",
        description: "Complex portals, marketplaces, workflow systems and enterprise applications.",
        priceINR: 700000,
        priceUSD: 8050,
        features: [
          { text: "Full-stack architecture" },
          { text: "Integrations" },
          { text: "Security baseline" },
          { text: "DevOps & handoff" },
        ],
        ctaText: "Build Platform →",
      },
    ],
  },
  {
    id: "digital-growth",
    number: "04",
    title: "Digital Growth",
    subtitle: "Monthly Retainers",
    packages: [
      {
        id: "growth-launch",
        category: "Growth",
        name: "Growth Launch",
        description: "Focused SEO, content, social and reporting for businesses establishing digital demand.",
        priceINR: 100000,
        priceUSD: 1150,
        features: [
          { text: "SEO foundation" },
          { text: "Social management" },
          { text: "Content plan" },
          { text: "Monthly reporting" },
        ],
        isMonthly: true,
        ctaText: "Start Growth →",
      },
      {
        id: "growth-engine",
        category: "Growth Engine",
        name: "Growth Engine",
        description: "SEO, AEO/GEO, social, content, paid-media management and conversion optimisation.",
        priceINR: 250000,
        priceUSD: 2875,
        features: [
          { text: "SEO/AEO/GEO" },
          { text: "Paid media management" },
          { text: "Social & content" },
          { text: "CRO + dashboard" },
        ],
        isRecommended: true,
        isMonthly: true,
        ctaText: "Scale Growth →",
      },
      {
        id: "enterprise-growth",
        category: "Enterprise",
        name: "Digital Growth Partner",
        description: "Full-funnel growth team combining strategy, creative, media and optimisation.",
        priceINR: 500000,
        priceUSD: 5750,
        features: [
          { text: "Strategy" },
          { text: "SEO/AEO + content" },
          { text: "Paid media" },
          { text: "Creative + CRO" },
        ],
        isMonthly: true,
        ctaText: "Partner With Us →",
      },
    ],
  },
];

// Flat mapping for the Contact form Dropdown
export const PRICING_SERVICES_MAP: Record<string, string> = {};
PRICING_STREAMS.forEach((stream) => {
  stream.packages.forEach((pkg) => {
    PRICING_SERVICES_MAP[pkg.id] = pkg.name;
  });
});
