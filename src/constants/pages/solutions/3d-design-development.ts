import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

export const THREE_D_DESIGN_HERO = {
  title: "3D Design & Development Services Across Industries.",
  description:
    "Traditional 3D workflows—from CAD handoffs to reviews—are often fragmented, slow, and constrained by basic previews. Obrive redefines this with a unified platform that streamlines stages, accelerates collaboration, and improves quality across industries.",
  description2:
    "Our 3D Design pipeline centralizes the entire journey, from concept to render, while a secure client portal enables feedback, approvals, and data integration. This seamless approach reduces manual effort, increases visibility, and elevates stakeholder experience across sectors.",
  ctaButtons: {
    primary: "View 3D Portfolio",
    secondary: "GET A QUOTE",
  },
};

export const THREE_D_DESIGN_KEY_BENEFITS = [
  {
    title: "Overview",
    description:
      "We provide end-to-end 3D design and development services, transforming concepts into photorealistic visuals, interactive assets, and production-ready models tailored to your industry.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Unified 3D Workflow",
    description:
      "Our 3D pipeline centralizes the entire journey, from initial wireframe to final render. We automate status updates, task assignments, and asset visibility to ensure nothing falls through the cracks.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Smart Iteration & Delivery",
    description:
      "Trigger revised renders or next-stage assets automatically when a project moves into an 'approved-for-production' status, smoothing handoffs and archiving versions for compliance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Instant Collaborative Reviews",
    description:
      "Share interactive previews via unique links—no downloads, no setup required. Clients and team members can comment directly on 3D previews through a sleek, centralized portal.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export const THREE_D_DESIGN_SIDEBAR_LINKS = [
  { id: "3d-product-modeling", label: "3D Product Modeling" },
  { id: "architectural-rendering", label: "Architectural 3D Rendering" },
  { id: "3d-animation", label: "3D Animation Services" },
  { id: "character-design", label: "Character Design & Rigging" },
  { id: "environment-building", label: "Environment & World Building" },
  { id: "ecommerce-visuals", label: "E-Commerce 3D Visuals" },
  { id: "industrial-prototyping", label: "Industrial 3D Prototyping" },
  { id: "virtual-production", label: "Virtual Production Assets" },
  { id: "3d-configurators", label: "3D Configurators" },
] as const;

export const THREE_D_DESIGN_SERVICE_SECTIONS = [
  {
    id: "3d-product-modeling",
    title: "3D Product Modeling",
    subtitle: "Precision Digital Twins of Physical Products",
    description:
      "We create highly accurate, detailed 3D models of your physical products. Whether working from CAD data, technical drawings, or physical reference photos, our modelers ensure every curve, texture, and material property is faithfully recreated for digital use.",
    label: "We build 3D product models for",
    items: [
      "Consumer electronics",
      "Furniture & homeware",
      "Automotive components",
      "Fashion & apparel",
      "Jewelry design",
      "Packaging visualization",
      "Medical devices",
      "Industrial machinery",
      "Sporting goods",
    ],
    footer:
      "Our models are optimized for both high-fidelity offline rendering and real-time interactive applications, ensuring maximum ROI for your digital assets.",
  },
  {
    id: "architectural-rendering",
    title: "Architectural 3D Rendering",
    subtitle: "Bring Unbuilt Spaces to Life with Photorealism",
    description:
      "Transform architectural plans into stunning, photorealistic visuals that captivate investors and buyers. We specialize in exterior and interior renderings that highlight lighting, materials, and spatial atmosphere, helping you market properties long before construction begins.",
    label: "Our architectural services include",
    items: [
      "Exterior rendering",
      "Interior visualization",
      "Virtual staging",
      "Aerial & drone matching",
      "Day/night cycle visuals",
      "Floor plan 3D conversion",
      "Commercial real estate",
      "Master plan rendering",
      "Lighting analysis",
    ],
    footer:
      "We work closely with architects and developers to ensure design intent is perfectly captured in every frame we produce.",
  },
  {
    id: "3d-animation",
    title: "3D Animation Services",
    subtitle: "Tell Your Story with Cinematic Motion",
    description:
      "Static images only tell part of the story. Our 3D animation services bring products, characters, and processes to life with fluid motion, dynamic camera work, and compelling visual effects. From complex mechanical explosions to emotive character performances, we handle the entire animation pipeline.",
    label: "We develop 3D animations for",
    items: [
      "Product explainer videos",
      "Mechanical assembly guides",
      "Medical mechanism of action",
      "Architectural fly-throughs",
      "Broadcast commercials",
      "Corporate presentations",
      "Trade show loops",
      "Character shorts",
      "VFX integration",
    ],
    footer:
      "Our animators use industry-standard tools to deliver smooth, cinematic sequences that explain complex ideas in seconds.",
  },
  {
    id: "character-design",
    title: "Character Design & Rigging",
    subtitle: "Create Iconic Digital Personalities",
    description:
      "From conceptual sketches to fully articulated 3D models, we design characters that resonate with your audience. We build production-ready rigs with advanced facial morphs and body kinematics, preparing them for games, film, or interactive brand mascots.",
    label: "Our character services include",
    items: [
      "Concept art & design",
      "High-poly sculpting",
      "Retopology for games",
      "Advanced skeletal rigging",
      "Facial blendshapes",
      "Hair & fur grooming",
      "Motion capture cleanup",
      "Stylized character art",
      "Photorealistic humans",
    ],
    footer:
      "Every character rig is stress-tested to ensure animators have the control they need to deliver expressive, lifelike performances.",
  },
  {
    id: "environment-building",
    title: "Environment & World Building",
    subtitle: "Craft Immersive Digital Worlds",
    description:
      "Whether you need a hyper-realistic forest for a virtual production shoot, or a stylized cityscape for a game engine, our environment artists create expansive, detailed 3D worlds. We focus on atmospheric lighting, optimized geometry, and cohesive art direction.",
    label: "We build 3D environments for",
    items: [
      "Virtual Reality experiences",
      "Game development",
      "Virtual production (LED walls)",
      "Metaverse spaces",
      "Historical recreations",
      "Sci-fi & fantasy worlds",
      "Level design",
      "Matte painting 3D plates",
      "Simulator backdrops",
    ],
    footer:
      "Our environments balance visual fidelity with real-time performance constraints, ensuring they look stunning while running smoothly.",
  },
  {
    id: "ecommerce-visuals",
    title: "E-Commerce 3D Visuals",
    subtitle: "Elevate Your Online Retail Presence",
    description:
      "Replace expensive traditional photography with flexible, scalable 3D rendering. We create flawless product shots on pure white backgrounds, lifestyle imagery in virtual sets, and 360-degree spin assets that drive online conversions and reduce return rates.",
    label: "E-Commerce deliverables include",
    items: [
      "White background silo renders",
      "Lifestyle environment renders",
      "360-degree interactive spins",
      "Colorway & material variants",
      "Detail macro shots",
      "Transparent PNG assets",
      "AR-ready GLB/USDZ files",
      "Amazon A+ content imagery",
      "Catalog batch rendering",
    ],
    footer:
      "By digitizing your inventory, you can generate endless variations of product imagery without ever organizing a physical photoshoot.",
  },
  {
    id: "industrial-prototyping",
    title: "Industrial 3D Prototyping",
    subtitle: "Validate Engineering Concepts Visually",
    description:
      "Bridge the gap between raw engineering CAD and visual communication. We take heavy, unoptimized engineering data and transform it into visually appealing, easily understandable 3D prototypes. This helps stakeholders, investors, and marketing teams grasp complex engineering concepts.",
    label: "Industrial 3D services include",
    items: [
      "CAD cleanup & optimization",
      "Exploded view diagrams",
      "Cutaway rendering",
      "Material flow simulation",
      "Pre-manufacturing visualization",
      "Patent illustration 3D",
      "Investor pitch visuals",
      "Safety protocol visualization",
      "Digital twin foundation",
    ],
    footer:
      "We securely handle proprietary CAD data, ensuring your intellectual property remains protected while we create stunning visual prototypes.",
  },
  {
    id: "virtual-production",
    title: "Virtual Production Assets",
    subtitle: "Next-Generation Filmmaking Environments",
    description:
      "We build heavily optimized, photorealistic 3D assets and environments specifically designed for real-time engines like Unreal Engine, used in modern LED-volume virtual production. Our assets ensure directors can shoot on digital sets with accurate parallax and lighting.",
    label: "Virtual production services",
    items: [
      "Unreal Engine environment art",
      "Real-time lighting setup",
      "Nanite mesh optimization",
      "Lumen lighting integration",
      "LED volume backdrops",
      "Virtual scouting environments",
      "Pre-visualization (Previs)",
      "Real-time prop modeling",
      "In-camera VFX assets",
    ],
    footer:
      "Our team understands the strict frame-rate budgets required for live virtual production, delivering assets that perform under pressure.",
  },
  {
    id: "3d-configurators",
    title: "3D Configurators",
    subtitle: "Let Users Customize Products in Real-Time",
    description:
      "We develop interactive 3D configurators that allow customers to build, customize, and visualize products in real-time. By connecting our 3D logic to your pricing and inventory systems, we create a seamless customization journey that directly impacts sales.",
    label: "Configurator capabilities",
    items: [
      "Real-time material swapping",
      "Modular component assembly",
      "Dynamic pricing integration",
      "Lighting & environment toggles",
      "High-res snapshot generation",
      "BOM (Bill of Materials) export",
      "Web-based (WebGL) deployment",
      "Mobile responsive UI",
      "AR preview integration",
    ],
    footer:
      "Our configurators combine high-end 3D rendering with robust web development to deliver a flawless user experience across all devices.",
  },
];

export const THREE_D_DESIGN_PROCESS_STEPS = [
  {
    step: "01",
    title: "Concept & Reference",
    description:
      "We start by gathering CAD files, blueprints, sketches, or physical references. We establish the art direction, visual style, and technical requirements to ensure alignment with your goals.",
  },
  {
    step: "02",
    title: "Modeling & Optimization",
    description:
      "Our artists construct the 3D geometry, focusing on topological flow and optimization. We build everything from high-poly sculpts for rendering to low-poly meshes for real-time use.",
  },
  {
    step: "03",
    title: "Texturing & Lighting",
    description:
      "We apply photorealistic materials, UV mapping, and intricate textures. We then establish digital lighting setups to highlight product features and create the desired atmosphere.",
  },
  {
    step: "04",
    title: "Review & Delivery",
    description:
      "Using our secure client portal, you review interactive previews or test renders. Once revisions are approved, we execute final high-resolution renders or export deployment-ready 3D assets.",
  },
] as const;

export const THREE_D_DESIGN_WORKFLOW_STEPS_SIDEBAR = [
  "Step 1: Centralize Your Design Workflow",
  "Step 2: Review & Revise with Precision",
  "Step 3: Iterate Automatically",
  "Step 4: Approve, Integrate & Deliver",
];

export const THREE_D_DESIGN_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Unified Workflow",
    description:
      "Set up a connected pipeline that tracks each 3D asset from wireframe to final render—automating status updates, task assignments, and visibility.",
    src: IMAGES.THREE_D_FIRST_IMAGE,
    srcMeta: IMAGES_META.THREE_D_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Accurate Review",
    description:
      "Clients and team members comment directly on 3D previews through a sleek portal. AI-powered suggestions surface improvements or flag errors in real-time.",
    src: IMAGES.THREE_D_SECOND_IMAGE,
    srcMeta: IMAGES_META.THREE_D_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Smart Iteration",
    description:
      "Once revisions are approved, the next version is rendered and shared automatically—keeping delivery moving without manual intervention.",
    src: IMAGES.THREE_D_THIRD_IMAGE,
    srcMeta: IMAGES_META.THREE_D_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Approve & Deliver",
    description:
      "Capture client approval, log version history, and push final assets to downstream systems—smoothing handoffs and archiving for compliance.",
    src: IMAGES.THREE_D_FOURTH_IMAGE,
    srcMeta: IMAGES_META.THREE_D_FOURTH_IMAGE,
  },
] as const;

export const THREE_D_DESIGN_INDUSTRIES: import("../../../types/solutions").SolutionIndustriesContent = {
  "slug": "3d-design-development",
  "hero": {
    "title": "3D Design & Development Across Industries",
    "description": "3D becomes more valuable when it is designed around the products, spaces, engineering realities and customer journeys of a specific industry. Obrive develops configurable 3D solutions for visualization, product communication, design review, sales, training, eCommerce, simulation, digital twins and immersive experiences."
  },
  "industries": [
    {
      "id": "automotive-mobility",
      "title": "Automotive & Mobility",
      "description": "Create vehicle and component models, product configurators, design-review environments, engineering visualization, dealership content, marketing renders, training assets and immersive product experiences."
    },
    {
      "id": "manufacturing-industrial-engineering",
      "title": "Manufacturing & Industrial Engineering",
      "description": "Support product development, machine visualization, assembly communication, technical documentation, digital work instructions, factory visualization, simulation assets and digital twin experiences."
    },
    {
      "id": "healthcare-medical",
      "title": "Healthcare & Medical",
      "description": "Develop 3D anatomy, medical-device visualization, facility models, educational content, training assets and interactive experiences. Clinical or regulated applications should be designed with appropriate validation, privacy, safety and regulatory requirements."
    },
    {
      "id": "pharmaceuticals-life-sciences",
      "title": "Pharmaceuticals & Life Sciences",
      "description": "Use 3D for scientific visualization, laboratory environments, equipment training, manufacturing communication, facility walkthroughs, product education and immersive learning."
    },
    {
      "id": "retail-ecommerce",
      "title": "Retail & eCommerce",
      "description": "Create interactive product viewers, 3D catalogs, product configurators, virtual showrooms, product animations, material visualization and digital commerce experiences."
    },
    {
      "id": "consumer-goods-brands",
      "title": "Consumer Goods & Brands",
      "description": "Turn products, packaging and brand concepts into high-quality 3D assets for campaigns, product launches, digital merchandising, social content, presentations and immersive experiences."
    },
    {
      "id": "real-estate-property",
      "title": "Real Estate & Property",
      "description": "Visualize properties, interiors and developments with architectural models, renders, virtual staging, walkthroughs, interactive tours and stakeholder presentation experiences."
    },
    {
      "id": "architecture-engineering-construction",
      "title": "Architecture, Engineering & Construction",
      "description": "Use 3D for design review, architectural visualization, BIM-oriented communication, construction sequencing, stakeholder walkthroughs, technical visualization and immersive project presentations."
    },
    {
      "id": "education-edtech",
      "title": "Education & EdTech",
      "description": "Create interactive 3D lessons, virtual laboratories, scientific models, vocational training assets, historical environments, technical simulations and experiential learning content."
    },
    {
      "id": "energy-utilities-infrastructure",
      "title": "Energy, Utilities & Infrastructure",
      "description": "Support asset visualization, infrastructure models, maintenance planning, safety training, facility walkthroughs, technical communication and digital twin visualization."
    },
    {
      "id": "oil-gas",
      "title": "Oil & Gas",
      "description": "Develop equipment models, facility visualization, maintenance rehearsal assets, safety simulations, technical training environments and operational knowledge-transfer experiences."
    },
    {
      "id": "mining-natural-resources",
      "title": "Mining & Natural Resources",
      "description": "Use 3D for equipment visualization, mine-site models, safety training, maintenance simulation, geological communication, operational planning and workforce enablement."
    },
    {
      "id": "aerospace-aviation",
      "title": "Aerospace & Aviation",
      "description": "Create aircraft and component visualization, engineering models, assembly and maintenance training assets, cabin/cockpit environments, technical documentation visuals and immersive collaboration experiences."
    },
    {
      "id": "logistics-warehousing-supply-chain",
      "title": "Logistics, Warehousing & Supply Chain",
      "description": "Build warehouse models, facility layouts, workflow simulations, equipment visualization, loading and picking training environments and operational walkthroughs."
    },
    {
      "id": "travel-tourism-hospitality",
      "title": "Travel, Tourism & Hospitality",
      "description": "Create destinations, hotels, resorts, attractions and cultural environments for virtual tours, immersive previews, marketing, training and guest experiences."
    },
    {
      "id": "media-entertainment-gaming",
      "title": "Media, Entertainment & Gaming",
      "description": "Develop characters, environments, props, interactive scenes, virtual venues, immersive storytelling assets, branded experiences and real-time 3D content."
    },
    {
      "id": "sports-fitness",
      "title": "Sports & Fitness",
      "description": "Create athlete and equipment visualization, venue models, coaching environments, training simulations, fan experiences and branded immersive content."
    },
    {
      "id": "banking-financial-services-insurance",
      "title": "Banking, Financial Services & Insurance",
      "description": "Use 3D for property and asset visualization, workforce training, virtual branch concepts, customer education, claims-related visualization and selected immersive collaboration workflows."
    },
    {
      "id": "telecommunications",
      "title": "Telecommunications",
      "description": "Support network and infrastructure visualization, equipment models, technician training, retail demonstrations, field-service preparation and customer education."
    },
    {
      "id": "agriculture-agritech",
      "title": "Agriculture & AgriTech",
      "description": "Create farm and equipment visualization, agricultural machinery models, training environments, field simulations, safety education and knowledge-transfer experiences."
    },
    {
      "id": "government-public-sector",
      "title": "Government & Public Sector",
      "description": "Develop public infrastructure visualization, emergency-preparedness environments, workforce training, cultural heritage experiences, museums and citizen-facing immersive content."
    },
    {
      "id": "corporate-learning-professional-services",
      "title": "Corporate Learning & Professional Services",
      "description": "Build leadership simulations, soft-skills environments, sales training, onboarding, client demonstrations, collaborative learning spaces and scenario-based training."
    }
  ],
  "footerText": "We can adapt the same 3D foundations—modeling, visualization, rendering, interactive development, workflow automation, integration and immersive technology—to new industries, proprietary products and specialized environments.",
  "globalDelivery": {
    "title": "Global 3D Delivery",
    "subtitle": "Build Once. Localize, Integrate and Scale Worldwide.",
    "description": "Obrive can support organizations operating across markets, products, languages, stakeholders and digital channels. We structure 3D assets and workflows for reuse while maintaining appropriate visual, technical and brand standards.",
    "items": [
      "Multi-market product and property visualization",
      "Localized product variants and materials",
      "Reusable 3D asset libraries",
      "Multi-language interfaces and presentation content",
      "Centralized review and approval workflows",
      "Cloud and API integration",
      "Role-based access and governance",
      "Web, mobile and real-time deployment",
      "AR, VR, MR and spatial-computing readiness",
      "Distributed stakeholder collaboration"
    ]
  },
  "technologyCapabilities": {
    "title": "3D Technology & Platform Capabilities",
    "subtitle": "",
    "items": [
      "3D modeling and texturing",
      "Photorealistic rendering",
      "Real-time 3D",
      "Interactive 3D",
      "CAD-to-3D workflows",
      "3D configurators",
      "Digital twins",
      "Architectural visualization",
      "Product visualization",
      "Animation and technical visualization",
      "AR/VR/MR-ready 3D assets",
      "Unity and Unreal Engine workflows",
      "Web-based 3D experiences",
      "AI-assisted review and workflow automation",
      "Enterprise and cloud integrations"
    ]
  }
};
