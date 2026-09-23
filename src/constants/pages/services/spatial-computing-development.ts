import { ICONS, ICONS_META, IMAGES, IMAGES_META } from "@/assets/images";

export const SPATIAL_COMPUTING_HERO = {
  title: "Spatial Computing App Development Services.",
  description:
    "Developing spatial computing apps—AR, VR, MR, or XR—can often feel fragmented, slow, and complex. Obrive Industries simplifies this with end-to-end Spatial Computing development that accelerates delivery, strengthens collaboration, and elevates immersive experiences.",
  description2:
    "This streamlined approach minimizes manual friction, improves engagement, and speeds innovation across industries—from real estate and education to retail, healthcare, and beyond. We build solutions that seamlessly blend the digital and physical worlds.",
  ctaButtons: {
    primary: "Explore Spatial Apps",
    secondary: "BOOK CONSULTATION",
  },
};

export const SPATIAL_COMPUTING_KEY_BENEFITS = [
  {
    title: "Overview",
    description:
      "We provide end-to-end Spatial Computing development that bridges physical and digital spaces, transforming how users interact with data, products, and environments.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Immersive Pipeline Management",
    description:
      "Track every stage of your spatial computing project—from concept and prototyping to deployment—in a sleek, structured workflow designed for XR development.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Instant Interactive Demos",
    description:
      "Share links to immersive app previews—no installs, no delays—enabling clients and stakeholders to explore, collaborate, and provide feedback instantly.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Auto-Triggered Deployments",
    description:
      "Automatically launch user tests, beta previews, or live deployments to headsets and devices as soon as critical project milestones are reached.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export const SPATIAL_COMPUTING_SIDEBAR_LINKS = [
  { id: "mixed-reality-apps", label: "Mixed Reality (MR) Applications" },
  { id: "spatial-web-webxr", label: "Spatial Web & WebXR" },
  { id: "wearable-tech", label: "Wearable Tech Integration" },
  { id: "spatial-ui-ux", label: "Spatial UI/UX Design" },
  { id: "location-based-xr", label: "Location-Based XR" },
  { id: "metaverse-development", label: "Metaverse Development" },
  { id: "volumetric-video", label: "Volumetric Video & Holograms" },
  { id: "spatial-audio", label: "Spatial Audio Engineering" },
] as const;

export const SPATIAL_COMPUTING_SERVICE_SECTIONS = [
  {
    id: "mixed-reality-apps",
    title: "Mixed Reality (MR) Applications",
    subtitle: "Blend Physical and Digital Realities Seamlessly",
    description:
      "Mixed Reality (MR) anchors digital objects to the real world, allowing them to interact with physical environments. We develop advanced MR applications for headsets like Apple Vision Pro and Meta Quest, creating experiences where digital content is aware of physical geometry.",
    label: "We build MR applications for",
    items: [
      "Apple Vision Pro development",
      "Meta Quest MR apps",
      "HoloLens enterprise solutions",
      "Interactive room mapping",
      "Physical-digital workflows",
      "MR remote collaboration",
      "Medical MR visualization",
      "Industrial MR maintenance",
      "Spatial data visualization",
    ],
    footer:
      "Our MR solutions utilize spatial anchors, plane detection, and scene understanding to create truly immersive computing experiences.",
  },
  {
    id: "spatial-web-webxr",
    title: "Spatial Web & WebXR",
    subtitle: "Immersive Experiences Directly in the Browser",
    description:
      "The Spatial Web brings 3D, AR, and VR directly into the web browser without requiring users to download apps. We develop WebXR solutions that allow users to access spatial content instantly across desktop, mobile, and XR headsets from a single web link.",
    label: "Our WebXR capabilities include",
    items: [
      "Browser-based AR/VR",
      "Cross-device spatial sites",
      "Web-based 3D configurators",
      "XR e-commerce integration",
      "WebXR virtual tours",
      "Interactive 3D landing pages",
      "Spatial storytelling",
      "Web-based multiplayer XR",
      "Performance-optimized WebGL",
    ],
    footer:
      "By leveraging WebXR, we drastically reduce friction and increase user adoption for spatial computing campaigns and tools.",
  },
  {
    id: "wearable-tech",
    title: "Wearable Tech Integration",
    subtitle: "Connect Spatial Apps to the Internet of Things",
    description:
      "Spatial computing is most powerful when connected to real-world data. We integrate spatial applications with wearable technology, IoT sensors, and haptic feedback devices to create a cohesive ecosystem where digital environments react to physical inputs.",
    label: "Wearable & IoT integrations",
    items: [
      "Smartwatch spatial controls",
      "Haptic glove integration",
      "Biometric data visualization",
      "IoT sensor overlays",
      "Spatial fitness applications",
      "Real-time machine telemetry",
      "BLE beacon tracking",
      "Smart glasses applications",
      "Connected health XR",
    ],
    footer:
      "We bridge the gap between hardware sensors and immersive software, creating responsive, data-driven spatial experiences.",
  },
  {
    id: "spatial-ui-ux",
    title: "Spatial UI/UX Design",
    subtitle: "Design Intuitive Interfaces for 3D Environments",
    description:
      "Designing for spatial computing requires abandoning 2D screen paradigms. We design spatial user interfaces (UI) and user experiences (UX) that leverage depth, gaze tracking, hand gestures, and voice commands. Our designs prioritize ergonomics, legibility, and intuitive interaction.",
    label: "Spatial design expertise",
    items: [
      "Eye-tracking interfaces",
      "Hand gesture controls",
      "Spatial typography",
      "Ergonomic 3D menus",
      "Voice-activated UI",
      "Haptic feedback design",
      "Spatial wireframing",
      "Accessibility in XR",
      "Diegetic interface design",
    ],
    footer:
      "Our UI/UX team ensures that your spatial applications are not just visually impressive, but comfortable and easy to use for extended periods.",
  },
  {
    id: "location-based-xr",
    title: "Location-Based XR",
    subtitle: "Transform Physical Locations with Digital Layers",
    description:
      "Location-Based XR anchors spatial content to specific geographic coordinates or physical venues. We develop experiences for stadiums, museums, cities, and retail stores where users can discover digital content that is persistently tied to their real-world location.",
    label: "Location-Based XR solutions",
    items: [
      "City-scale AR experiences",
      "Museum spatial tours",
      "Stadium XR activations",
      "Geospatial AR (VPS)",
      "Theme park MR attractions",
      "Interactive retail spaces",
      "Historical site overlays",
      "Campus navigation apps",
      "Persistent spatial anchors",
    ],
    footer:
      "Using Visual Positioning Systems (VPS) and advanced GPS, we ensure digital content is millimeter-accurate to the physical world.",
  },
  {
    id: "metaverse-development",
    title: "Metaverse Development",
    subtitle: "Build Your Presence in Virtual Worlds",
    description:
      "The Metaverse represents the next evolution of social and corporate interaction. We build persistent, multi-user virtual environments where brands, communities, and enterprises can host events, sell digital goods, and collaborate in shared 3D spaces.",
    label: "Metaverse services",
    items: [
      "Custom virtual worlds",
      "Metaverse event hosting",
      "Digital twin offices",
      "Avatar creation & rigging",
      "Blockchain/Web3 integration",
      "Virtual commerce storefronts",
      "Cross-platform social XR",
      "Brand activations in XR",
      "Persistent digital economies",
    ],
    footer:
      "We help brands navigate the complexities of virtual worlds, building scalable environments that foster genuine digital communities.",
  },
  {
    id: "volumetric-video",
    title: "Volumetric Video & Holograms",
    subtitle: "Capture Reality in True 3D",
    description:
      "Volumetric video captures real people and performances in 3D, allowing them to be viewed from any angle in spatial computing environments. We integrate volumetric captures and holographic performances into AR and VR applications for unparalleled realism.",
    label: "Volumetric applications",
    items: [
      "Holographic performances",
      "Volumetric sports replays",
      "Lifelike virtual guides",
      "Immersive documentaries",
      "XR music videos",
      "Volumetric training actors",
      "Holographic telepresence",
      "Digital human integration",
      "Point cloud visualization",
    ],
    footer:
      "We work with leading volumetric capture studios to compress and optimize heavy holographic data for smooth playback on mobile and XR headsets.",
  },
  {
    id: "spatial-audio",
    title: "Spatial Audio Engineering",
    subtitle: "Design Sound That Lives in the Environment",
    description:
      "In spatial computing, audio is just as important as visuals for creating presence. We design and implement spatial audio that reacts to head tracking and environment geometry, ensuring that sound comes from the correct 3D location and bounces realistically off virtual walls.",
    label: "Spatial audio services",
    items: [
      "Ambisonic sound design",
      "Head-tracked audio",
      "Acoustic ray tracing",
      "Interactive soundscapes",
      "HRTF implementation",
      "Voice chat spatialization",
      "Audio-driven haptics",
      "Virtual acoustic environments",
      "XR mixing & mastering",
    ],
    footer:
      "Our audio engineers use advanced spatialization tools to create soundscapes that guide user attention and deepen immersion.",
  },
];

export const SPATIAL_COMPUTING_PROCESS_STEPS = [
  {
    step: "01",
    title: "Spatial Workflow Strategy",
    description:
      "Organize your development pipeline—concept, prototype, review, beta, deployment—with a clear roadmap tailored to spatial computing constraints and hardware targets.",
  },
  {
    step: "02",
    title: "Design & Interactive Previews",
    description:
      "Our team designs spatial UI/UX and 3D assets. Clients access immersive demos through a branded portal, interacting with the app and giving visual feedback in real-time.",
  },
  {
    step: "03",
    title: "Develop & Automate",
    description:
      "We build the spatial application using industry-leading engines. Post-feedback, updates and testing environments are triggered automatically—pushing your project forward.",
  },
  {
    step: "04",
    title: "Approve & Integrate",
    description:
      "Collect final approvals, archive versions, and push deliverables into your asset libraries, app stores, or enterprise MDM solutions for seamless deployment.",
  },
] as const;

export const SPATIAL_COMPUTING_WORKFLOW_STEPS_SIDEBAR = [
  "Step 1: Structure Your Spatial App Workflow",
  "Step 2: Share Interactive Previews",
  "Step 3: Automate Iteration & Launch",
  "Step 4: Approve & Integrate",
];

export const SPATIAL_COMPUTING_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Spatial Workflow",
    description:
      "Organize your development pipeline—concept, prototype, review, beta, deployment—with automated stage tracking and timeline visibility.",
    src: IMAGES.SPATIAL_FIRST_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Interactive Previews",
    description:
      "Clients and stakeholders access immersive demos through a branded portal, interacting with the app and giving visual feedback in real-time.",
    src: IMAGES.SPATIAL_SECOND_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Automated Launch",
    description:
      "Post-feedback, updates and testing environments are triggered automatically—pushing your project forward without manual coordination.",
    src: IMAGES.SPATIAL_THIRD_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Approve & Integrate",
    description:
      "Collect final approvals within the portal, archive versions, and push deliverables into your asset libraries or customer environments effortlessly.",
    src: IMAGES.SPATIAL_FOURTH_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_FOURTH_IMAGE,
  },
] as const;

export const SPATIAL_COMPUTING_INDUSTRIES: import("../../../types/services").SolutionIndustriesContent =
  {
    slug: "spatial-computing-development",
    hero: {
      title: "Spatial Computing Development Across Industries",
      description:
        "Spatial computing can connect digital information with three-dimensional environments, immersive devices and natural interaction. Obrive develops industry-specific spatial applications for visualization, training, collaboration, digital twins, product experiences and operational workflows.",
    },
    industries: [
      {
        id: "automotive-mobility",
        title: "Automotive & Mobility",
        description:
          "Create spatial vehicle exploration, design review, product configuration, immersive showrooms, engineering visualization, training and service experiences.",
      },
      {
        id: "manufacturing-industrial-engineering",
        title: "Manufacturing & Industrial Engineering",
        description:
          "Support factory visualization, equipment interaction, assembly training, inspection, maintenance, design review, digital twins and collaborative engineering.",
      },
      {
        id: "healthcare-medical",
        title: "Healthcare & Medical",
        description:
          "Develop spatial anatomy visualization, medical education, training, facility experiences, procedure simulation and medical-device visualization, subject to relevant clinical, privacy, safety and regulatory requirements.",
      },
      {
        id: "pharmaceuticals-life-sciences",
        title: "Pharmaceuticals & Life Sciences",
        description:
          "Use spatial applications for laboratory visualization, equipment training, scientific models, facility walkthroughs, manufacturing education and immersive learning.",
      },
      {
        id: "retail-ecommerce",
        title: "Retail & eCommerce",
        description:
          "Create spatial product visualization, virtual showrooms, interactive product experiences, immersive demonstrations and spatial commerce concepts.",
      },
      {
        id: "consumer-goods-brands",
        title: "Consumer Goods & Brands",
        description:
          "Turn products, packaging, campaigns and brand stories into interactive 3D and spatial experiences for customers and stakeholders.",
      },
      {
        id: "real-estate-property",
        title: "Real Estate & Property",
        description:
          "Visualize properties and developments through immersive walkthroughs, spatial design review, interactive sales experiences and 3D environments.",
      },
      {
        id: "architecture-engineering-construction",
        title: "Architecture, Engineering & Construction",
        description:
          "Support spatial design review, engineering collaboration, project visualization, immersive walkthroughs, construction communication and digital-twin interfaces.",
      },
      {
        id: "education-edtech",
        title: "Education & EdTech",
        description:
          "Create interactive 3D lessons, virtual laboratories, simulations, spatial classrooms, scientific visualization and vocational learning environments.",
      },
      {
        id: "energy-utilities-infrastructure",
        title: "Energy, Utilities & Infrastructure",
        description:
          "Use spatial computing for asset visualization, infrastructure models, field training, safety simulations, maintenance workflows and connected digital twins.",
      },
      {
        id: "oil-gas",
        title: "Oil & Gas",
        description:
          "Develop spatial equipment visualization, facility models, maintenance training, safety simulations, inspection workflows and remote collaboration.",
      },
      {
        id: "mining-natural-resources",
        title: "Mining & Natural Resources",
        description:
          "Support site visualization, equipment training, safety learning, maintenance, geological visualization and operational collaboration.",
      },
      {
        id: "aerospace-aviation",
        title: "Aerospace & Aviation",
        description:
          "Create aircraft and component visualization, engineering review, maintenance training, cabin/cockpit environments, technical learning and collaborative design experiences.",
      },
      {
        id: "logistics-warehousing-supply-chain",
        title: "Logistics, Warehousing & Supply Chain",
        description:
          "Build warehouse visualization, workflow simulations, equipment training, spatial navigation concepts and operational walkthroughs.",
      },
      {
        id: "travel-tourism-hospitality",
        title: "Travel, Tourism & Hospitality",
        description:
          "Create immersive destinations, hotel and resort walkthroughs, cultural environments, virtual experiences and spatial storytelling.",
      },
      {
        id: "media-entertainment-gaming",
        title: "Media, Entertainment & Gaming",
        description:
          "Develop immersive worlds, interactive storytelling, virtual venues, branded spatial experiences, entertainment environments and real-time 3D content.",
      },
      {
        id: "sports-fitness",
        title: "Sports & Fitness",
        description:
          "Create spatial coaching concepts, venue experiences, training environments, equipment visualization and immersive fan engagement.",
      },
      {
        id: "banking-financial-services-insurance",
        title: "Banking, Financial Services & Insurance",
        description:
          "Explore spatial branch concepts, financial education, property visualization, immersive workforce training and selected asset or claims visualization workflows.",
      },
      {
        id: "telecommunications",
        title: "Telecommunications",
        description:
          "Support network visualization, infrastructure models, field training, equipment experiences, technician enablement and customer demonstrations.",
      },
      {
        id: "agriculture-agritech",
        title: "Agriculture & AgriTech",
        description:
          "Create spatial equipment visualization, field models, training environments, agricultural education and decision-support experiences.",
      },
      {
        id: "government-public-sector",
        title: "Government & Public Sector",
        description:
          "Develop public infrastructure visualization, emergency preparedness environments, cultural heritage experiences, training and citizen-facing immersive applications.",
      },
      {
        id: "corporate-learning-professional-services",
        title: "Corporate Learning & Professional Services",
        description:
          "Build immersive onboarding, leadership simulations, professional training, collaborative environments, client demonstrations and scenario-based learning.",
      },
    ],
    footerText:
      "We can adapt the same spatial foundations—3D content, spatial UX, application engineering, AI, integration, analytics and deployment—to new industries, proprietary products and specialized environments.",
    globalDelivery: {
      title: "Global Spatial Computing Delivery",
      subtitle: "Build Once. Localize, Integrate and Scale Worldwide.",
      description:
        "Spatial applications can be structured for multiple markets, languages, devices, sites and stakeholder groups while maintaining appropriate product, brand, security and governance standards.",
      items: [
        "Multi-market spatial experiences",
        "Localized interfaces and content",
        "Reusable 3D asset libraries",
        "Multi-site deployment",
        "Cloud and API integration",
        "Role-based access and governance",
        "Device compatibility planning",
        "Analytics and usage measurement",
        "Distributed stakeholder collaboration",
        "AR, VR and MR interoperability where appropriate",
      ],
    },
    technologyCapabilities: {
      title: "Spatial Computing Technology & Platform Capabilities",
      subtitle: "",
      items: [
        "Spatial UX and 3D interaction",
        "visionOS-oriented development where scoped",
        "Apple Vision Pro experiences where scoped",
        "ARKit / RealityKit where appropriate",
        "Unity",
        "Unreal Engine",
        "WebXR",
        "Real-time 3D",
        "Computer vision",
        "Hand, gaze and voice interaction",
        "AI and generative AI",
        "Digital twins",
        "Cloud and enterprise APIs",
        "ERP, CRM, IoT and analytics integrations",
      ],
    },
  };

export {
  SPATIAL_COMPUTING_FAQ_META,
  SPATIAL_COMPUTING_FAQS,
} from "./faqs/spatial-computing-faqs";
