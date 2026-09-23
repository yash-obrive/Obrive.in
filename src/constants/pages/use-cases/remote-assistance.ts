import { ICONS, ICONS_META } from "@/assets/images";

export const REMOTE_ASSISTANCE_HERO = {
  title: "Remote Assistance",
  description:
    "Connect experts and frontline teams in real time—anywhere, anytime.",
  description2:
    "Enable technicians, operators, customers, and remote experts to collaborate through live video, AR annotations, spatial guidance, voice communication, document sharing, and interactive instructions. Obrive Remote Assistance brings expertise to the point of work, helping teams diagnose issues, perform procedures, train staff, and resolve problems without waiting for an expert to travel.",
  ctaButtons: {
    primary: "Explore Remote Assistance",
    secondary: "SCHEDULE A DEMO",
  },
};

export const REMOTE_ASSISTANCE_KEY_BENEFITS = [
  {
    title: "Faster Issue Resolution",
    description:
      "Bring the right expert into the workflow at the moment help is needed.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Lower Travel Costs",
    description:
      "Reduce unnecessary site visits by enabling remote diagnosis and guidance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Improved First-Time Fix",
    description:
      "Guide technicians with contextual visual instructions and expert input.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Knowledge Retention",
    description:
      "Capture sessions, procedures, and expert knowledge for reuse and training.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Enhanced Safety",
    description:
      "Support teams remotely when tasks are complex, hazardous, or difficult to access.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export const REMOTE_ASSISTANCE_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Live Video Collaboration",
    description:
      "Two-way visual communication between field teams and remote experts.",
    src: "/images/use-cases/remote_assist_1.jpg",
    srcMeta: { alt: "Live Video Collaboration", width: 720, height: 405 },
  },
  {
    step: "02",
    title: "AR Annotations",
    description:
      "Draw, point, label, highlight, and place contextual guidance over the real environment.",
    src: "/images/use-cases/remote_assist_2.jpg",
    srcMeta: { alt: "AR Annotations", width: 720, height: 405 },
  },
  {
    step: "03",
    title: "Guided Procedures",
    description:
      "Deliver structured step-by-step instructions for troubleshooting, inspection, and maintenance.",
    src: "/images/use-cases/remote_assist_3.jpg",
    srcMeta: { alt: "Guided Procedures", width: 720, height: 405 },
  },
  {
    step: "04",
    title: "Knowledge Capture",
    description:
      "Record sessions, procedures, evidence, and expert guidance for future reuse.",
    src: "/images/use-cases/remote_assist_4.jpg",
    srcMeta: { alt: "Knowledge Capture", width: 720, height: 405 },
  },
] as const;

export const REMOTE_ASSISTANCE_WORKFLOW_STEPS_SIDEBAR = [
  "Live Video Collaboration",
  "AR Annotations",
  "Guided Procedures",
  "Knowledge Capture",
] as const;

export const REMOTE_ASSISTANCE_SIDEBAR_LINKS = [
  { id: "industries", label: "Industries & Applications" },
  { id: "why-choose", label: "Why Choose Obrive" },
  { id: "scope", label: "Use-Case Scope" },
] as const;

export const REMOTE_ASSISTANCE_SERVICE_SECTIONS = [
  {
    id: "industries",
    title: "Industries & Applications",
    subtitle: "",
    description: "Connect experts and frontline teams across industries.",
    label: "Industries",
    items: [],
    footer: "",
    subSections: [
      {
        title: "Manufacturing",
        description:
          "Machine troubleshooting, maintenance, inspection, commissioning, and operator support.",
      },
      {
        title: "Energy & Utilities",
        description:
          "Remote inspection, field maintenance, equipment diagnostics, and emergency support.",
      },
      {
        title: "Healthcare",
        description:
          "Equipment support, technical guidance, training, and remote specialist collaboration.",
      },
      {
        title: "Field Services",
        description:
          "On-site troubleshooting, installation, repair, and customer support.",
      },
      {
        title: "Aviation & Defence",
        description:
          "Technical guidance, maintenance workflows, inspection, and specialist support.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subtitle: "",
    description:
      "Bring real-time expertise to the point of work with XR-powered remote assistance.",
    label: "Why Choose Obrive",
    items: [],
    footer: "",
    subSections: [
      {
        title: "Live Video & AR",
        description:
          "Live video and contextual AR annotations bring experts into the field workflow.",
      },
      {
        title: "Hands-Free Workflows",
        description:
          "Hands-free or mobile workflows support technicians working around machinery.",
      },
      {
        title: "Seamless Integration",
        description:
          "Integration with service management, CRM, knowledge bases, and work orders.",
      },
      {
        title: "Guided Procedures",
        description:
          "Standardize inspections, troubleshooting, maintenance, and training.",
      },
      {
        title: "Knowledge Reuse",
        description:
          "Session capture and knowledge reuse create an organization-wide remote expertise layer.",
      },
    ],
  },
  {
    id: "scope",
    title: "Use-Case Scope",
    subtitle: "",
    description: "Common applications for Remote Assistance.",
    label: "Use-Case Scope",
    items: [],
    footer: "",
    subSections: [
      {
        title: "Live Expert",
        description: "Live remote expert collaboration.",
      },
      {
        title: "AR Maintenance",
        description: "AR-guided maintenance and repair.",
      },
      {
        title: "Diagnostics",
        description: "Remote inspection and diagnostics.",
      },
      {
        title: "Commissioning",
        description: "Installation and commissioning support.",
      },
      { title: "Training", description: "Technical training and onboarding." },
      {
        title: "Work Instructions",
        description: "Digital work instructions and knowledge capture.",
      },
    ],
  },
] as const;
