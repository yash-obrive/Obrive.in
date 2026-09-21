export interface MarketItem {
  flag: string;
  name: string;
  region: "India" | "Americas" | "Middle East" | "Europe" | "APAC" | "Africa";
  code: string;
  href: string;
  cities: string;
}

export interface HubItem {
  title: string;
  slug?: string;
  description: string;
  tags: string[];
  href?: string;
}

export interface BriefCard {
  title: string;
  description: string;
  tags: string[];
}

import { COUNTRIES, type CountryCode } from "@/config/countries";

export const MARKETS_DATA: MarketItem[] = (Object.keys(COUNTRIES) as CountryCode[]).map(
  (code) => {
    const country = COUNTRIES[code];
    return {
      flag: country.flag,
      name: country.name,
      region: country.region,
      code: country.code,
      href: `/${country.code}`,
      cities: country.offices.join(" · "),
    };
  }
);

export const INDUSTRIES_DATA: HubItem[] = [
  {
    title: "Automotive",
    slug: "automotive",
    description: "Localized automotive virtual showrooms, 3D vehicle configurators, and immersive buyer journeys.",
    tags: ["Industry", "Showrooms", "Configurators"],
  },
  {
    title: "Real Estate",
    slug: "real-estate",
    description: "MR property exploration, photorealistic 3D architectural visualization, and digital twins.",
    tags: ["Industry", "Virtual Tours", "Architecture"],
  },
  {
    title: "Retail & Commerce",
    slug: "retail",
    description: "AR try-ons, spatial shopping, indoor store navigation, and interactive catalog visualization.",
    tags: ["Industry", "AR Shopping", "Navigation"],
  },
  {
    title: "Manufacturing & Industrial",
    slug: "manufacturing",
    description: "Digital twin facility tracking, interactive equipment guides, and remote expert AR support.",
    tags: ["Industry", "Digital Twins", "IoT"],
  },
  {
    title: "Healthcare & Life Sciences",
    slug: "healthcare",
    description: "3D anatomical models, simulation environments, and medical training visualizations.",
    tags: ["Industry", "Simulation", "Training"],
  },
  {
    title: "Education & Training",
    slug: "education",
    description: "Immersive learning curricula, virtual laboratories, and experiential workforce training.",
    tags: ["Industry", "Workforce", "Interactive"],
  },
  {
    title: "Architecture & Engineering",
    slug: "architecture",
    description: "BIM integration, 1:1 scale holographic walk-throughs, and collaborative structural design reviews.",
    tags: ["Industry", "BIM", "Engineering"],
  },
  {
    title: "Tourism & Hospitality",
    slug: "tourism",
    description: "Interactive virtual destination exploration, heritage walkthroughs, and hotel spatial previews.",
    tags: ["Industry", "Virtual Travel", "Culture"],
  },
  {
    title: "Smart Mobility & Parking",
    slug: "smart-mobility",
    description: "Spatial wayfinding, sensor-integrated parking guidance, and connected fleet visualization.",
    tags: ["Industry", "Mobility", "Smart Cities"],
  },
  {
    title: "Logistics & Warehousing",
    slug: "logistics",
    description: "AR warehouse navigation, inventory spatial indexing, and automated pick-and-pack routing.",
    tags: ["Industry", "Supply Chain", "Automation"],
  },
  {
    title: "Enterprise Solutions",
    slug: "enterprise",
    description: "Cross-platform enterprise spatial infrastructure, secure private portals, and global deployment.",
    tags: ["Industry", "Enterprise", "Security"],
  },
  {
    title: "Media & Entertainment",
    slug: "media",
    description: "Immersive storytelling, holographic entertainment, spatial audio, and interactive brand activations.",
    tags: ["Industry", "Experiential", "Media"],
  },
];

export const SOLUTIONS_DATA: HubItem[] = [
  {
    title: "Augmented Reality (AR)",
    slug: "augmented-reality-development",
    description: "Contextual digital layers overlaid onto physical spaces for mobile, web, and headset hardware.",
    tags: ["Technology", "Spatial Overlay"],
  },
  {
    title: "Virtual Reality (VR)",
    slug: "virtual-reality-development",
    description: "Full sensory immersive environments engineered for training, exploration, and spatial simulation.",
    tags: ["Technology", "Immersion"],
  },
  {
    title: "Mixed Reality (MR)",
    slug: "mixed-reality",
    description: "Blended reality applications integrating digital interactables with real-world spatial physics.",
    tags: ["Technology", "Spatial Physics"],
  },
  {
    title: "3D Design & Visualization",
    slug: "3d-design-development",
    description: "Photorealistic 3D modeling, asset optimization, ray-traced rendering, and real-time animation.",
    tags: ["Technology", "Rendering"],
  },
  {
    title: "Spatial Computing",
    slug: "spatial-computing",
    description: "Next-generation spatial UI architectures, gesture tracking, and gaze-driven interactions.",
    tags: ["Technology", "VisionOS / Meta"],
  },
  {
    title: "Digital Twins",
    slug: "digital-twins",
    description: "Real-time bi-directional digital twins connecting IoT sensor feeds with 3D operational models.",
    tags: ["Technology", "IoT Sync"],
  },
  {
    title: "Extended Reality (XR)",
    slug: "extended-reality",
    description: "Holistic XR platforms unifying mobile AR, WebXR, and standalone spatial headsets.",
    tags: ["Technology", "WebXR"],
  },
  {
    title: "AI + Immersive Tech",
    slug: "ai-immersive",
    description: "Generative 3D environments, conversational voice agents, and computer vision recognition pipelines.",
    tags: ["Technology", "Generative AI"],
  },
  {
    title: "Indoor Positioning & Navigation",
    slug: "indoor-positioning",
    description: "Sub-meter AR indoor wayfinding without GPS, using visual inertial odometry and spatial anchors.",
    tags: ["Technology", "Wayfinding"],
  },
  {
    title: "Computer Vision",
    slug: "computer-vision",
    description: "Real-time surface detection, object recognition, SLAM tracking, and edge AI inference.",
    tags: ["Technology", "SLAM"],
  },
  {
    title: "Real-Time Rendering",
    slug: "real-time-rendering",
    description: "High-fidelity WebGL/WebGPU shaders, cloud pixel streaming, and sub-16ms latency graphics.",
    tags: ["Technology", "WebGPU"],
  },
  {
    title: "IoT + Spatial Computing",
    slug: "iot-spatial-computing",
    description: "Real-time telemetry overlays, facility alerts, and sensor telemetry projected into 3D space.",
    tags: ["Technology", "Telemetry"],
  },
];

export const PRODUCTS_DATA: HubItem[] = [
  {
    title: "OBPARK",
    slug: "obpark",
    description: "AR/MR parking navigation, slot reservations, safety wayfinding, and smart mobility management.",
    tags: ["Product", "Smart Mobility", "AR Navigation"],
  },
  {
    title: "OBNEST",
    slug: "obnest",
    description: "MR/VR property exploration, virtual 3D property tours, dynamic floor plans, and spatial real estate staging.",
    tags: ["Product", "Real Estate", "Virtual Tours"],
  },
  {
    title: "OBNAVI",
    slug: "obnavi",
    description: "AR indoor retail navigation, personalized store pathing, smart shopping, and promotional engagement.",
    tags: ["Product", "Retail", "Indoor GPS"],
  },
  {
    title: "OBMOVE",
    slug: "obmove",
    description: "AR/VR automotive virtual showrooms, real-time customizer, interactive vehicle features, and remote test-drives.",
    tags: ["Product", "Automotive", "Configurator"],
  },
];

export const RESOURCES_DATA: HubItem[] = [
  {
    title: "Market Landing Pages",
    description: "Localized country storefronts with customized regional case studies, currencies, and contacts.",
    tags: ["Global", "Localization"],
  },
  {
    title: "City SEO Hubs",
    description: "Hyper-localized metropolitan hubs targeting regional industry demands across 26 nations.",
    tags: ["SEO", "Metropolitan"],
  },
  {
    title: "Industry Guides",
    description: "Deep-dive whitepapers and deployment strategies for enterprise immersive transformation.",
    tags: ["Research", "Strategy"],
  },
  {
    title: "Use-Case Pages",
    description: "Practical real-world implementations connecting spatial technologies to ROI metrics.",
    tags: ["Architecture", "ROI"],
  },
  {
    title: "Case Studies",
    description: "Verified customer implementation outcomes, performance metrics, and client quotes.",
    tags: ["Enterprise", "Proof"],
  },
  {
    title: "AEO Answer Library",
    description: "Direct-answer structured knowledgebase optimized for AI engine discovery and search retrieval.",
    tags: ["AEO", "Knowledgebase"],
  },
  {
    title: "Research & Reports",
    description: "Technical benchmarks, spatial computing hardware evaluations, and market projections.",
    tags: ["Data", "Analysis"],
  },
  {
    title: "Whitepapers",
    description: "Comprehensive technical architectures for enterprise spatial deployments.",
    tags: ["Technical", "Security"],
  },
  {
    title: "Glossary",
    description: "Authoritative reference definitions for AR, VR, MR, Spatial Computing, and WebXR terminology.",
    tags: ["Reference", "Definitions"],
  },
  {
    title: "Blog & Insights",
    description: "Latest architectural updates, industry news, and engineering breakthroughs from Obrive.",
    tags: ["Articles", "Updates"],
  },
  {
    title: "Developer Documentation",
    description: "SDK references, API endpoints, schema guidelines, and integration documentation.",
    tags: ["APIs", "SDKs"],
  },
  {
    title: "Product FAQs",
    description: "Detailed operational, technical, security, and licensing answers for all Obrive flagship products.",
    tags: ["Support", "Technical"],
  },
];

export const ARCHITECTURE_MODEL = {
  title: "/[country]/ → country → city → industry → solution → product",
  example: "Example: /in/cities/bangalore/automotive/ar-vehicle-visualization/ → OBMOVE → case study → FAQ → schedule demo.",
  tags: ["hreflang", "canonical", "JSON-LD", "Sitemap Index", "CMS-Driven", "Edge-Routed"],
};

export const DEVELOPER_BRIEF_CARDS: BriefCard[] = [
  {
    title: "Global CMS & Data Model",
    description: "Centralized country, locale, currency, office cities, industry, technology, product, and CTA schemas.",
    tags: ["Architecture", "Multi-Tenant"],
  },
  {
    title: "AI & AEO Content Layer",
    description: "Keyword clustering, localized drafts, AEO direct answers, internal-link graphs, and content-gap scoring.",
    tags: ["Search", "AI Retrieval"],
  },
  {
    title: "SEO & Edge Infrastructure",
    description: "Country URLs, hreflang alternates, canonical rules, sitemap index, Organization and Product JSON-LD schema.",
    tags: ["Edge CDN", "Sub-5ms"],
  },
  {
    title: "Polite Personalization",
    description: "Detect likely visitor region, present non-blocking switcher banner, remember choice in cookies, keep crawlable URLs stable.",
    tags: ["Apple Model", "UX"],
  },
  {
    title: "Hierarchical Navigation",
    description: "Searchable hierarchy + Obrive visual system + instant keyword filtering + regional filters + persistent switcher.",
    tags: ["Information Architecture", "Figma UI"],
  },
  {
    title: "Conversion Pipeline",
    description: "Every market page routes directly to Talk to Ella, Schedule Demo, Request Proposal, and localized contact offices.",
    tags: ["Leads", "Conversion"],
  },
];
