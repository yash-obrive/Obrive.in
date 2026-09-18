import { ICONS, ICONS_META } from "@/assets/images";

export const DIGITAL_TWINS_HERO = {
  title: "Digital Twins",
  description:
    "Bridge the physical and digital worlds with intelligent 3D replicas.",
  description2:
    "Create dynamic, data-connected digital replicas of physical assets, facilities, products, and processes. Obrive Digital Twins combine 3D visualization with IoT, operational data, simulation, and spatial interfaces so teams can understand what is happening, test what could happen, and make better decisions before changing the physical world.",
  ctaButtons: {
    primary: "Explore Digital Twins",
    secondary: "SCHEDULE A DEMO",
  },
};

export const DIGITAL_TWINS_KEY_BENEFITS = [
  {
    title: "Real-Time Visibility",
    description: "See assets, environments, and operating conditions in spatial context.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Predictive Insight",
    description: "Explore scenarios and identify issues before they become costly.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Operational Efficiency",
    description: "Understand bottlenecks, workflows, and asset performance visually.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Better Decisions",
    description: "Give engineering, operations, and leadership one shared visual model.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Scalable Deployment",
    description: "Start with 3D visualization and evolve toward live data and simulation.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export const DIGITAL_TWINS_HOW_IT_WORKS = [
  {
    step: "01",
    title: "3D Visualization",
    description: "High-fidelity, interactive models of assets, buildings, production lines, and environments.",
    src: "/images/use-cases/digital_twins_1.jpg",
    srcMeta: { alt: "3D Visualization", width: 720, height: 405 },
  },
  {
    step: "02",
    title: "Data Integration",
    description: "Connect IoT, BIM/CAD, ERP, MES, SCADA, APIs, and operational data.",
    src: "/images/use-cases/digital_twins_2.jpg",
    srcMeta: { alt: "Data Integration", width: 720, height: 405 },
  },
  {
    step: "03",
    title: "Simulation",
    description: "Test layouts, processes, capacity, maintenance, and other scenarios before physical change.",
    src: "/images/use-cases/digital_twins_3.jpg",
    srcMeta: { alt: "Simulation", width: 720, height: 405 },
  },
  {
    step: "04",
    title: "Spatial Experiences",
    description: "Extend the twin into web, tablet, AR, VR, and immersive collaboration.",
    src: "/images/use-cases/digital_twins_4.jpg",
    srcMeta: { alt: "Spatial Experiences", width: 720, height: 405 },
  },
] as const;

export const DIGITAL_TWINS_WORKFLOW_STEPS_SIDEBAR = [
  "3D Visualization",
  "Data Integration",
  "Simulation",
  "Spatial Experiences",
] as const;


export const DIGITAL_TWINS_SIDEBAR_LINKS = [
  { id: "industries", label: "Industries & Applications" },
  { id: "why-choose", label: "Why Choose Obrive" },
  { id: "scope", label: "Use-Case Scope" },
] as const;

export const DIGITAL_TWINS_SERVICE_SECTIONS = [
  {
    id: "industries",
    title: "Industries & Applications",
    subtitle: "",
    description: "Digital Twins applications across different sectors.",
    label: "Industries",
    items: [],
    footer: "",
    subSections: [
      { title: "Manufacturing", description: "Production lines, equipment monitoring, plant visualization, maintenance, and process optimization." },
      { title: "Real Estate & Construction", description: "Building visualization, facility management, asset planning, and stakeholder walkthroughs." },
      { title: "Smart Cities & Infrastructure", description: "Spatial views of infrastructure, utilities, transport assets, and urban systems." },
      { title: "Energy & Utilities", description: "Asset visualization, remote monitoring, inspection, and operational planning." },
      { title: "Healthcare", description: "Facility planning, equipment visualization, training, and operational workflows." }
    ]
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subtitle: "",
    description: "Turn real-world assets and operational data into an interactive spatial experience.",
    label: "Why Choose Obrive",
    items: [],
    footer: "",
    subSections: [
      { title: "High-Fidelity 3D", description: "High-fidelity 3D environments make complex facilities and assets easier to understand." },
      { title: "Data-Ready Architecture", description: "Connect to IoT sensors, enterprise systems, BIM/CAD data, and operational platforms." },
      { title: "Simulation & Planning", description: "Support layout, capacity, maintenance, training, and operational decisions." },
      { title: "Multi-Platform", description: "Web, tablet, AR, VR, and spatial-computing experiences tailored to stakeholders." },
      { title: "Modular Approach", description: "Begin with visualization and mature into real-time operational intelligence." }
    ]
  },
  {
    id: "scope",
    title: "Use-Case Scope",
    subtitle: "",
    description: "Explore the different types of digital twins.",
    label: "Use-Case Scope",
    items: [],
    footer: "",
    subSections: [
      { title: "Factory", description: "Digital factory and plant twins." },
      { title: "Building", description: "Building and facility twins." },
      { title: "Asset", description: "Asset and equipment twins." },
      { title: "Process", description: "Process and production twins." },
      { title: "Training", description: "Training and simulation environments." },
      { title: "Operations", description: "Remote operations and spatial monitoring." }
    ]
  }
] as const;
