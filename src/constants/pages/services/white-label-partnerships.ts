import { ICONS, ICONS_META, IMAGES } from "@/assets/images";
import type {
  ServiceSection,
  SidebarLink,
  WorkflowStep,
} from "@/types/services";

export const WHITE_LABEL_HERO = {
  title: "Extend Your Capabilities With Obrive",
  description:
    "We partner with agencies, consultants, technology companies and businesses that need additional design, development and emerging technology capabilities.",
  description2:
    "Deliver advanced digital, immersive and AI solutions to your clients without building every capability in-house. Obrive becomes the technology execution layer behind your brand.",
  backgroundImage: IMAGES.OBPARK_HERO,
  ctaButtons: {
    primary: "Become a Partner",
    secondary: "Explore Capabilities",
  },
};

export const WHITE_LABEL_KEY_BENEFITS = [
  {
    title: "Brand Stays Yours",
    description:
      "Position the delivery under your own brand and maintain the client relationship.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Specialist Talent",
    description:
      "Access specialized developers, designers, 3D artists and technology professionals.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Flexible Capacity",
    description:
      "Extend your team without building everything in-house. Scale delivery based on project requirements.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "One Delivery Layer",
    description:
      "Coordinate complex technology work through one partner across design and engineering.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
];

export const WHITE_LABEL_PROCESS_STEPS: WorkflowStep[] = [
  {
    title: "Brief",
    description:
      "You share the client requirement, scope and commercial context.",
  },
  {
    title: "Scope",
    description:
      "We define technology requirements, deliverables, timeline and team.",
  },
  {
    title: "Proposal",
    description:
      "You receive a delivery-ready scope and partner commercial structure.",
  },
  {
    title: "Build",
    description:
      "Our specialists design, develop, test and iterate the solution.",
  },
  {
    title: "Review",
    description:
      "You remain in control of the client relationship and approvals.",
  },
  {
    title: "Launch",
    description: "We support deployment, handover and ongoing optimization.",
  },
];

export const WHITE_LABEL_SERVICE_SECTIONS: ServiceSection[] = [
  {
    id: "our-capabilities",
    title: "Our Capabilities",
    description:
      "Our teams work behind the scenes to help agencies and technology partners deliver projects under their own brand. We provide the technology execution layer behind agencies that want to offer advanced digital, immersive, AI and software solutions without building every capability internally.",
    subSections: [
      {
        title: "WHITE-LABEL DEVELOPMENT",
        description:
          "Our teams work behind the scenes to help agencies and technology partners deliver projects under their own brand.",
      },
      {
        title: "AR/VR DEVELOPMENT PARTNERSHIPS",
        description:
          "Extend your capabilities with Obrive's AR, VR, MR and spatial computing expertise.",
      },
      {
        title: "3D PRODUCTION PARTNERSHIPS",
        description:
          "Access specialized 3D modelling, visualization, animation and digital asset production capabilities.",
      },
      {
        title: "AI DEVELOPMENT PARTNERSHIPS",
        description:
          "Work with our AI and engineering teams to integrate intelligent technology into your products and services.",
      },
      {
        title: "PRODUCT DEVELOPMENT PARTNERSHIPS",
        description:
          "Collaborate with Obrive across product strategy, design, engineering, technology integration and deployment.",
      },
    ],
  },
  {
    id: "partnership-models",
    title: "Partnership Models",
    description:
      "Choose how deeply Obrive integrates into your delivery model. Our partnership structure is designed to protect your client ownership while giving you access to specialized execution.",
    subSections: [
      {
        title: "PROJECT-BASED DELIVERY",
        description:
          "Bring Obrive into individual client projects when specialist delivery is required.",
      },
      {
        title: "DEDICATED TECHNOLOGY TEAMS",
        description:
          "Access specialized developers, designers, 3D artists and technology professionals for ongoing initiatives. Reserve a multidisciplinary team for ongoing delivery and product development.",
      },
      {
        title: "TECHNOLOGY CO-DEVELOPMENT",
        description:
          "Partner with Obrive to develop new platforms, products, solutions and technology ventures. Create a long-term technology relationship with a flexible scope across multiple capabilities.",
      },
    ],
  },
  {
    id: "commercial-structure",
    title: "Commercial Structure",
    description:
      "Obrive can structure partner pricing so you can package, mark up and commercialize the capability within your own offering.",
    subSections: [
      {
        title: "WHOLESALE DELIVERY",
        description:
          "Receive partner-level project pricing and build your own client-facing commercial package.",
      },
      {
        title: "COMMERCIAL CONTROL",
        description:
          "Set your client-facing pricing, packaging and value proposition based on your market.",
      },
      {
        title: "FLEXIBLE SCOPE",
        description:
          "Start with one project and expand into recurring delivery, dedicated teams or strategic partnership.",
      },
    ],
  },
];

export const WHITE_LABEL_SIDEBAR_LINKS: SidebarLink[] = [
  {
    id: "our-capabilities",
    label: "Capabilities",
  },
  {
    id: "partnership-models",
    label: "Partnership Models",
  },
  {
    id: "workflow",
    label: "Process",
  },
  {
    id: "commercial-structure",
    label: "Commercial Structure",
  },
];

export const WHITE_LABEL_FAQS = [
  {
    title: "General Questions",
    items: [
      {
        question: "How does white-label delivery work?",
        answer:
          "We operate behind the scenes as your dedicated technology execution team. You manage the client relationship, project management, and strategy, while we deliver the design, engineering, and emerging technology capabilities. All deliverables can be presented under your agency's brand.",
      },
      {
        question: "Do you communicate directly with our clients?",
        answer:
          "By default, we operate completely behind the scenes and you manage all client communications. If preferred, we can join calls acting as your internal 'Technology Team' or 'Engineering Partner' using your company's email addresses or brand identity.",
      },
      {
        question: "What capabilities can we access?",
        answer:
          "Partners have access to our full suite of capabilities including Spatial Computing, AR/VR, Mixed Reality, AI Integration, 3D Visualization, Digital Twins, and full-stack software development.",
      },
    ],
  },
];

export const WHITE_LABEL_FAQS_META = {
  title: "Partnership FAQs",
  description: "Common questions about partnering with Obrive.",
};
