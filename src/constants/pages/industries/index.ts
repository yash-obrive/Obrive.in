import {
  ICONS,
  ICONS_META,
  IMAGES,
  IMAGES_META,
  OBMOVE_IMAGES,
  OBMOVE_IMAGES_META,
  OBNEST_IMAGES,
  OBNEST_IMAGES_META,
} from "@/assets/images";

const _PLACEHOLDER_WORKFLOW = [
  "Step 1: Discover",
  "Step 2: Implement",
  "Step 3: Integrate",
  "Step 4: Scale",
] as const;

const _PLACEHOLDER_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Placeholder Step",
    description: "This is a placeholder description for how it works.",
    src: IMAGES.AUGMENTED_FIRST_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FIRST_IMAGE,
  },
] as const;

const _PLACEHOLDER_KEY_BENEFITS = [
  {
    title: "Placeholder Benefit",
    description: "Placeholder description for key benefit.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const OBNEST_WORKFLOW = [
  "Step 1: Upload Property Data",
  "Step 2: Virtual Staging & Customization",
  "Step 3: Activate Listings",
  "Step 4: Enable Collaboration",
  "Step 5: Gain Insights",
  "Step 6: Analytics Dashboard",
] as const;

const OBNEST_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Upload Property Data",
    description:
      "Share your floorplans, 3D models, or architectural drawings. Our platform transforms them into immersive MR/VR-ready environments.",
    src: OBNEST_IMAGES.OBNEST_STEP_1,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_1,
  },
  {
    step: "02",
    title: "2. Virtual Staging & Customization",
    description:
      "Digitally stage interiors with furniture, lighting, and finishes—or allow buyers to customize designs in real time.",
    src: OBNEST_IMAGES.OBNEST_STEP_2,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_2,
  },
  {
    step: "03",
    title: "3. Activate Listings",
    description:
      "Publish your properties directly to the marketplace, where users can explore through VR headsets, MR devices, or smartphones.",
    src: OBNEST_IMAGES.OBNEST_STEP_3,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_3,
  },
  {
    step: "04",
    title: "4. Enable Collaboration",
    description:
      "Invite clients, architects, and stakeholders into the same property tour—annotate, adjust, and finalize design decisions together.",
    src: OBNEST_IMAGES.OBNEST_STEP_4,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_4,
  },
  {
    step: "05",
    title: "5. Gain Insights",
    description:
      "Track tour engagement, popular layouts, and buyer preferences through your analytics dashboard, helping you refine offerings.",
    src: OBNEST_IMAGES.OBNEST_STEP_5,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_5,
  },
  {
    step: "06",
    title: "6. Analytics Dashboard",
    description:
      "Gain access to a real-time dashboard with insights on space utilization, occupancy trends, customer behaviors, and revenue opportunities.",
    src: OBNEST_IMAGES.OBNEST_STEP_6,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_6,
  },
] as const;

const OBNEST_KEY_BENEFITS = [
  {
    title: "Accelerated Sales Cycles",
    description:
      "Virtual tours and immersive walkthroughs help buyers decide faster, reducing the need for repeated site visits.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Cost Savings on Staging & Marketing",
    description:
      "Skip expensive physical staging—digitally stage, update, and showcase properties instantly.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Global Reach & Remote Accessibility",
    description:
      "Attract international investors and remote buyers with MR/VR tours available anytime, anywhere.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Deeper Client Engagement",
    description:
      "Immersive, interactive experiences build stronger emotional connections and trust in the property.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Data-Driven Insights",
    description:
      "Understand buyer preferences with analytics on engagement, popular layouts, and time spent in spaces.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Competitive Advantage",
    description:
      "Differentiate your business as innovative and future-ready, standing out in crowded real estate markets.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const OBMOVE_WORKFLOW = [
  "Step 1: Enter Virtual Showroom",
  "Step 2: Explore Vehicles in 3D",
  "Step 3: Customize Instantly",
  "Step 4: Visualize in Your World",
  "Step 5: Compare & Decide",
  "Step 6: Analytics & Insights",
] as const;

const OBMOVE_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Enter Virtual Showroom",
    description:
      "From home, mobile, VR headset, or digital kiosk—customers instantly step into a life-sized 3D showroom.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_1,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_1,
  },
  {
    step: "02",
    title: "2. Explore in 3D",
    description:
      "Walk around models, examine details from every angle—as if the product were physically there.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_2,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_2,
  },
  {
    step: "03",
    title: "3. Customize Instantly",
    description:
      "Change trims, colors, and accessories in real time. Every choice updates the model instantly.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_3,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_3,
  },
  {
    step: "04",
    title: "4. Visualize in Your World",
    description:
      "Use AR mode to place the object in your environment—helping buyers imagine ownership.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_4,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_4,
  },
  {
    step: "05",
    title: "5. Compare & Decide",
    description:
      "Switch between models, view features side by side, and explore upgrades to make an informed choice.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_5,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_5,
  },
  {
    step: "06",
    title: "6. Analytics & Insights",
    description:
      "Track which models customers explore most. Measure customization trends, time spent, and AR interactions.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_6,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_6,
  },
] as const;

const OBMOVE_KEY_BENEFITS = [
  {
    title: "Immersive 3D Exploration",
    description:
      "Walk around life-sized cars, step inside, and experience interiors in detail.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Personalized Customization",
    description:
      "Instantly change trims, colors, wheels, and features to design your ideal configurations.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AR Visualization at Home",
    description:
      "Place items in your driveway, garage, or street for a realistic ownership preview.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Smarter Decisions",
    description:
      "Compare models side by side and explore upgrades with full clarity.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Convenient Access Anywhere",
    description:
      "Experience the catalog from home, mobile, VR headsets, or physical digital kiosks.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const OBNEST_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      {
        title: "Virtual Property Tours",
        description:
          "Explore properties remotely with immersive, interactive 3D walkthroughs.",
      },
      {
        title: "3D Architectural Visualization",
        description:
          "Visualize off-plan developments and unbuilt spaces before construction begins.",
      },
      {
        title: "Digital Staging",
        description:
          "Furnish empty properties with high-fidelity digital furniture and decor.",
      },
      {
        title: "Remote Client Collaboration",
        description:
          "Host guided virtual walkthroughs with international or remote buyers.",
      },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      {
        title: "Photorealistic 3D Environments",
        description:
          "True-to-life lighting, materials, and textures for premium real estate.",
      },
      {
        title: "Real-Time Customization",
        description:
          "Allow buyers to swap finishes, flooring, and layouts instantly.",
      },
      {
        title: "Multi-Platform Access",
        description: "Experience tours on web, mobile, AR, and VR headsets.",
      },
      {
        title: "Engagement Analytics",
        description:
          "Track which rooms and features capture buyer attention the most.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      {
        title: "Industry Expertise",
        description:
          "Tailored immersive solutions specifically designed for real estate developers and agencies.",
      },
      {
        title: "Accelerated Sales",
        description:
          "Immersive experiences that build buyer confidence and shorten the sales cycle.",
      },
      {
        title: "Scalable Deployments",
        description:
          "Easily scale from single properties to entire portfolios and masterplan communities.",
      },
    ],
  },
];

const OBNEST_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

const OBMOVE_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      {
        title: "Virtual Car Showrooms",
        description:
          "Step into infinite digital showrooms and explore vehicle models in life-size 3D.",
      },
      {
        title: "3D Vehicle Configuration",
        description:
          "Customize trims, paints, and accessories on high-fidelity vehicle twins.",
      },
      {
        title: "AR Driveway Previews",
        description:
          "Use Augmented Reality to place and view a customized car in your own driveway.",
      },
      {
        title: "Immersive Dealership Kiosks",
        description:
          "Enhance physical dealerships with interactive digital visualization screens.",
      },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      {
        title: "High-Fidelity 3D Models",
        description:
          "Pixel-perfect automotive models reflecting real-world materials and reflections.",
      },
      {
        title: "Real-Time Rendering",
        description:
          "Instant visual feedback as customers change vehicle configurations.",
      },
      {
        title: "AR Integration",
        description:
          "Seamlessly transition from 3D web exploration to mobile AR placement.",
      },
      {
        title: "Customer Analytics",
        description:
          "Gain insights into the most popular configurations, colors, and interactive features.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      {
        title: "Automotive Focus",
        description:
          "Deep understanding of OEM workflows, dealership operations, and car buyer journeys.",
      },
      {
        title: "Omnichannel Delivery",
        description:
          "Deploy the same 3D vehicle assets across web configurators, mobile apps, and XR devices.",
      },
      {
        title: "Enhanced Buying Experience",
        description:
          "Bridge the gap between digital research and physical test drives with interactive immersion.",
      },
    ],
  },
];

const OBMOVE_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

export const REAL_ESTATE_INDUSTRY = {
  hero: {
    title: "Real Estate Industry Solutions",
    description:
      "Transform property exploration with immersive MR/VR experiences.",
    description2:
      "Every buyer has faced the same challenge: endless site visits, flat photos, and uncertainty. We use MR and VR to deliver immersive, true-to-life property experiences that inspire confidence and accelerate decisions.",
    ctaButtons: {
      primary: "Explore Real Estate",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: OBNEST_WORKFLOW,
  howItWorks: OBNEST_HOW_IT_WORKS,
  keyBenefits: OBNEST_KEY_BENEFITS,
  sidebarLinks: OBNEST_SIDEBAR_LINKS,
  serviceSections: OBNEST_SERVICE_SECTIONS,
};

export const AUTOMOTIVE_INDUSTRY = {
  hero: {
    title: "Automotive Industry Solutions",
    description:
      "Redefine vehicle showrooms and discovery with immersive technology.",
    description2:
      "Automotive buying deserves more than brochures and spec sheets. We provide a next-generation MR/VR virtual showroom platform that transforms the way customers explore, customize, and purchase vehicles.",
    ctaButtons: {
      primary: "Explore Automotive",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: OBMOVE_WORKFLOW,
  howItWorks: OBMOVE_HOW_IT_WORKS,
  keyBenefits: OBMOVE_KEY_BENEFITS,
  sidebarLinks: OBMOVE_SIDEBAR_LINKS,
  serviceSections: OBMOVE_SERVICE_SECTIONS,
};

const ARCHITECTURE_ENGINEERING_WORKFLOW = [
  "Import Project Data",
  "Create the Spatial Model",
  "Simulate the Design",
  "Collaborate in XR",
  "Validate On Site",
  "Document & Deliver",
] as const;

const ARCHITECTURE_ENGINEERING_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Import Project Data",
    description:
      "Bring in BIM, CAD, floorplans, models, drawings and project information.",
    src: "/industries/architecture1.jpeg",
    srcMeta: {
      alt: "Architect using AR to import project data",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "02",
    title: "2. Create the Spatial Model",
    description:
      "Prepare optimized 3D environments for immersive review and visualization.",
    src: "/industries/architecture2.png",
    srcMeta: {
      alt: "3D spatial model creation for architecture project",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "03",
    title: "3. Simulate the Design",
    description:
      "Explore layouts, materials, lighting, circulation and selected project scenarios.",
    src: "/industries/architecture3.jpeg",
    srcMeta: {
      alt: "Architecture design simulation in AR/VR",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "04",
    title: "4. Collaborate in XR",
    description:
      "Invite clients, architects, engineers and stakeholders into shared design reviews.",
    src: "/industries/architecture4.png",
    srcMeta: {
      alt: "XR collaboration for architecture and engineering",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "05",
    title: "5. Validate On Site",
    description:
      "Use AR to compare digital intent with the physical environment where appropriate.",
    src: "/industries/architecture1.jpeg",
    srcMeta: {
      alt: "On-site AR validation for construction",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "06",
    title: "6. Document & Deliver",
    description:
      "Capture decisions, updates and outputs for project teams and stakeholders.",
    src: "/industries/architecture2.png",
    srcMeta: {
      alt: "Architecture documentation and delivery",
      width: 1200,
      height: 800,
    },
  },
] as const;

const ARCHITECTURE_ENGINEERING_KEY_BENEFITS = [
  {
    title: "Better Design Decisions",
    description: "Evaluate designs in spatial context before construction.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Improved Collaboration",
    description: "Give distributed teams a shared visual reference.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Reduced Rework & Costs",
    description: "Identify issues and design conflicts earlier.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Faster Approvals",
    description: "Help clients and stakeholders understand proposed spaces.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Enhanced Client Engagement",
    description: "Turn presentations into interactive experiences.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Sustainable Design",
    description:
      "Explore performance and planning options through simulation and visualization.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const ARCHITECTURE_ENGINEERING_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      {
        title: "3D Architectural Visualization",
        description:
          "Explore buildings, interiors, developments and infrastructure in interactive 3D.",
      },
      {
        title: "Virtual Site Tours",
        description:
          "Review projects remotely and communicate spatial intent to stakeholders.",
      },
      {
        title: "Design Collaboration in VR/MR",
        description:
          "Conduct immersive design reviews and multidisciplinary discussions.",
      },
      {
        title: "BIM & Digital Twin Integration",
        description:
          "Connect spatial experiences with building and asset information.",
      },
      {
        title: "Construction Planning",
        description:
          "Visualize sequences, spaces, logistics and selected site workflows.",
      },
      {
        title: "Client Presentations",
        description:
          "Turn conventional presentations into interactive project experiences.",
      },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      {
        title: "BIM/CAD-to-3D",
        description:
          "Convert project information into optimized immersive experiences.",
      },
      {
        title: "VR Walkthroughs",
        description: "Explore designs at human scale before construction.",
      },
      {
        title: "AR On-Site Visualization",
        description: "Overlay design intent onto physical environments.",
      },
      {
        title: "Collaborative Design Review",
        description: "Bring stakeholders together for spatial decision-making.",
      },
      {
        title: "Digital Twins",
        description:
          "Extend building models into operational and facility contexts.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      {
        title: "Advantage 1",
        description: "End-to-end AR/VR/MR/3D and spatial-computing expertise.",
      },
      {
        title: "Advantage 2",
        description:
          "Industry-specific solutions designed around real operational and customer workflows.",
      },
      {
        title: "Advantage 3",
        description:
          "Scalable, secure and deployment-ready digital experiences.",
      },
      {
        title: "Advantage 4",
        description:
          "Reusable 3D assets and immersive experiences across web, mobile and XR.",
      },
      {
        title: "Advantage 5",
        description:
          "Integration with existing business, content, analytics and enterprise systems.",
      },
    ],
  },
];

const ARCHITECTURE_ENGINEERING_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

export const ARCHITECTURE_ENGINEERING_INDUSTRY = {
  hero: {
    title: "Architecture & Engineering Solutions",
    description: "Spatial Computing for Design, Collaboration and Construction",
    description2:
      "Bring ideas to life with immersive 3D, AR and VR. Obrive helps architects, engineers, developers and construction teams visualize designs, collaborate around models, simulate real-world conditions and communicate project intent across the project lifecycle.",
    ctaButtons: {
      primary: "Explore Architecture",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: ARCHITECTURE_ENGINEERING_WORKFLOW,
  howItWorks: ARCHITECTURE_ENGINEERING_HOW_IT_WORKS,
  keyBenefits: ARCHITECTURE_ENGINEERING_KEY_BENEFITS,
  sidebarLinks: ARCHITECTURE_ENGINEERING_SIDEBAR_LINKS,
  serviceSections: ARCHITECTURE_ENGINEERING_SERVICE_SECTIONS,
};

const EDUCATION_WORKFLOW = [
  "Define Learning Goals",
  "Design the Experience",
  "Add Curriculum Content",
  "Deploy Across Devices",
  "Enable Active Learning",
  "Measure & Improve",
] as const;

const EDUCATION_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Define Learning Goals",
    description:
      "Identify curriculum topics, skills and outcomes that benefit from immersive learning.",
    src: "/industries/education1.jpeg",
    srcMeta: {
      alt: "Students using VR headsets for immersive learning",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "02",
    title: "2. Design the Experience",
    description:
      "Create 3D models, interactive lessons, simulations and virtual environments.",
    src: "/industries/education2.jpeg",
    srcMeta: {
      alt: "AR science experiment in an educational setting",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "03",
    title: "3. Add Curriculum Content",
    description:
      "Combine instructional content, assessments, narration and guided interactions.",
    src: "/industries/education3.png",
    srcMeta: {
      alt: "3D learning content in a university lecture hall",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "04",
    title: "4. Deploy Across Devices",
    description:
      "Deliver through web, mobile, AR, VR or supported classroom hardware.",
    src: "/industries/education4.jpeg",
    srcMeta: {
      alt: "Student attending virtual classroom remotely",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "05",
    title: "5. Enable Active Learning",
    description:
      "Let students explore, practise, collaborate and receive guided feedback.",
    src: "/industries/education1.jpeg",
    srcMeta: {
      alt: "Students collaborating in an immersive learning environment",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "06",
    title: "6. Measure & Improve",
    description:
      "Use learner feedback and engagement data to improve future content.",
    src: "/industries/education2.jpeg",
    srcMeta: {
      alt: "Analytics dashboard for educational outcomes",
      width: 1200,
      height: 800,
    },
  },
] as const;

const EDUCATION_KEY_BENEFITS = [
  {
    title: "Higher Student Engagement",
    description:
      "Turn abstract concepts into experiences students can explore.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Better Knowledge Retention",
    description:
      "Support learning through visual and experiential interaction.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Accessible Learning",
    description:
      "Bring difficult-to-access environments and equipment into the classroom.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Safe & Cost-Effective Simulations",
    description:
      "Practice experiments and procedures in controlled digital environments.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Future-Ready Skills",
    description: "Expose learners to modern spatial and digital workflows.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Scalable Solutions",
    description:
      "Reuse immersive content across cohorts, campuses and locations.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const EDUCATION_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      {
        title: "Immersive Classroom Learning",
        description:
          "Create interactive lessons that bring complex subjects into 3D.",
      },
      {
        title: "Virtual Labs & Simulations",
        description:
          "Practice science, engineering, healthcare and technical workflows safely.",
      },
      {
        title: "3D Learning Content",
        description:
          "Explain objects, systems, mechanisms and environments spatially.",
      },
      {
        title: "Virtual Field Trips",
        description:
          "Take learners to places, facilities and environments beyond the campus.",
      },
      {
        title: "Skill Training & Certifications",
        description: "Support hands-on technical and professional learning.",
      },
      {
        title: "Metaverse & Spatial Campuses",
        description:
          "Create persistent digital spaces for collaboration and learning.",
      },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      {
        title: "Interactive 3D Learning",
        description: "Explore curriculum concepts through spatial interaction.",
      },
      {
        title: "VR Labs",
        description:
          "Create repeatable simulations without requiring physical lab resources for every learner.",
      },
      {
        title: "AR Learning",
        description:
          "Overlay contextual information onto physical objects and environments.",
      },
      {
        title: "Virtual Collaboration",
        description: "Support group activities across campuses and locations.",
      },
      {
        title: "Assessment & Analytics",
        description:
          "Create measurable learning journeys and engagement insights.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      {
        title: "Advantage 1",
        description: "End-to-end AR/VR/MR/3D and spatial-computing expertise.",
      },
      {
        title: "Advantage 2",
        description:
          "Industry-specific solutions designed around real operational and customer workflows.",
      },
      {
        title: "Advantage 3",
        description:
          "Scalable, secure and deployment-ready digital experiences.",
      },
      {
        title: "Advantage 4",
        description:
          "Reusable 3D assets and immersive experiences across web, mobile and XR.",
      },
      {
        title: "Advantage 5",
        description:
          "Integration with existing business, content, analytics and enterprise systems.",
      },
    ],
  },
];

const EDUCATION_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

export const EDUCATION_INDUSTRY = {
  hero: {
    title: "Education Solutions",
    description: "Spatial Computing for Immersive Learning Experiences",
    description2:
      "Make learning more engaging, interactive and effective with AR, VR, MR and 3D. Obrive helps schools, universities, training institutions and professional academies create immersive classrooms, virtual labs, simulations, field trips, skill training and interactive learning content.",
    ctaButtons: {
      primary: "Explore Education",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: EDUCATION_WORKFLOW,
  howItWorks: EDUCATION_HOW_IT_WORKS,
  keyBenefits: EDUCATION_KEY_BENEFITS,
  sidebarLinks: EDUCATION_SIDEBAR_LINKS,
  serviceSections: EDUCATION_SERVICE_SECTIONS,
};

const ENTERPRISE_WORKFLOW = [
  "Map Business Opportunities",
  "Design the Experience",
  "Connect Enterprise Systems",
  "Pilot & Validate",
  "Scale Across Teams",
  "Measure Business Impact",
] as const;

const ENTERPRISE_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Map Business Opportunities",
    description:
      "Identify workflows, customer journeys and operational challenges where spatial computing can create value.",
    src: "/industries/enterprise1.png",
    srcMeta: {
      alt: "Enterprise team mapping business opportunities in VR",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "02",
    title: "2. Design the Experience",
    description:
      "Create immersive interfaces, 3D models, simulations and collaborative environments.",
    src: "/industries/enterprise2.jpeg",
    srcMeta: {
      alt: "Enterprise AR experience design",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "03",
    title: "3. Connect Enterprise Systems",
    description:
      "Integrate relevant data, content, CRM, ERP, HR, service and analytics systems.",
    src: "/industries/enterprise3.png",
    srcMeta: {
      alt: "Enterprise digital twin operations center",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "04",
    title: "4. Pilot & Validate",
    description:
      "Launch targeted experiences, test adoption and refine the workflow.",
    src: "/industries/enterprise4.jpeg",
    srcMeta: {
      alt: "Enterprise VR collaboration platform pilot",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "05",
    title: "5. Scale Across Teams",
    description:
      "Standardize assets, governance and deployment across locations and business units.",
    src: "/industries/enterprise1.png",
    srcMeta: {
      alt: "Enterprise XR scaling across global teams",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "06",
    title: "6. Measure Business Impact",
    description:
      "Track adoption, engagement, workflow outcomes and opportunities for improvement.",
    src: "/industries/enterprise2.jpeg",
    srcMeta: {
      alt: "Enterprise analytics and business impact measurement",
      width: 1200,
      height: 800,
    },
  },
] as const;

const ENTERPRISE_KEY_BENEFITS = [
  {
    title: "Increased Productivity",
    description:
      "Give teams visual tools that make complex work easier to understand.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Better Collaboration",
    description: "Create shared spaces for distributed teams and stakeholders.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Reduced Travel Costs",
    description:
      "Support remote collaboration, training and expert assistance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Faster Decision-Making",
    description: "Visualize data, products, spaces and scenarios in context.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Enhanced Employee Engagement",
    description:
      "Make onboarding, training and collaboration more interactive.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Scalable Global Solutions",
    description:
      "Deploy repeatable immersive experiences across teams and locations.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const ENTERPRISE_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      {
        title: "Immersive Workforce Training",
        description:
          "Deliver onboarding, safety, technical and role-based learning.",
      },
      {
        title: "Virtual Collaboration & Meetings",
        description:
          "Create spatial collaboration environments for distributed teams.",
      },
      {
        title: "3D Data Visualization",
        description:
          "Understand complex operational, product and business information spatially.",
      },
      {
        title: "Remote Assistance & Support",
        description:
          "Connect experts and frontline teams for faster resolution.",
      },
      {
        title: "Virtual Showrooms & Product Demos",
        description:
          "Create immersive sales, marketing and customer experiences.",
      },
      {
        title: "Metaverse-Ready Workspaces",
        description:
          "Explore persistent digital environments for collaboration and engagement.",
      },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      {
        title: "Enterprise 3D Platforms",
        description:
          "Reusable spatial assets and experiences across business functions.",
      },
      {
        title: "Immersive Training",
        description: "Role-specific simulations and onboarding environments.",
      },
      {
        title: "Digital Twins",
        description:
          "Operational visualization for assets, spaces and processes.",
      },
      {
        title: "Remote Assistance",
        description: "Visual expert support for distributed teams.",
      },
      {
        title: "Spatial Collaboration",
        description: "Immersive meetings, reviews and stakeholder experiences.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      {
        title: "Advantage 1",
        description: "End-to-end AR/VR/MR/3D and spatial-computing expertise.",
      },
      {
        title: "Advantage 2",
        description:
          "Industry-specific solutions designed around real operational and customer workflows.",
      },
      {
        title: "Advantage 3",
        description:
          "Scalable, secure and deployment-ready digital experiences.",
      },
      {
        title: "Advantage 4",
        description:
          "Reusable 3D assets and immersive experiences across web, mobile and XR.",
      },
      {
        title: "Advantage 5",
        description:
          "Integration with existing business, content, analytics and enterprise systems.",
      },
    ],
  },
];

const ENTERPRISE_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

export const ENTERPRISE_INDUSTRY = {
  hero: {
    title: "Enterprise Solutions",
    description: "Spatial Computing for Smarter Workplaces and Business Growth",
    description2:
      "Empower employees and customers with AR, VR, MR and 3D solutions that streamline operations, improve collaboration and create immersive business experiences. Obrive helps enterprises apply spatial computing to training, visualization, remote assistance, digital twins, customer experiences and distributed work.",
    ctaButtons: {
      primary: "Explore Enterprise",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: ENTERPRISE_WORKFLOW,
  howItWorks: ENTERPRISE_HOW_IT_WORKS,
  keyBenefits: ENTERPRISE_KEY_BENEFITS,
  sidebarLinks: ENTERPRISE_SIDEBAR_LINKS,
  serviceSections: ENTERPRISE_SERVICE_SECTIONS,
};

const HEALTHCARE_WORKFLOW = [
  "Identify the Clinical Workflow",
  "Build the 3D Experience",
  "Connect Medical Data",
  "Validate the Experience",
  "Deploy for Users",
  "Improve Continuously",
] as const;

const HEALTHCARE_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Identify the Clinical Workflow",
    description:
      "Map training, planning, patient, facility or device workflows where spatial visualization can help.",
    src: "/industries/healthcare1.jpeg",
    srcMeta: {
      alt: "Medical professional using AR for clinical workflow",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "02",
    title: "2. Build the 3D Experience",
    description:
      "Create anatomical, facility, device or procedural models and interactive environments.",
    src: "/industries/healthcare2.png",
    srcMeta: {
      alt: "3D anatomy visualization in a hospital setting",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "03",
    title: "3. Connect Medical Data",
    description:
      "Integrate approved datasets, clinical content, device information or operational systems as appropriate.",
    src: "/industries/healthcare3.jpeg",
    srcMeta: {
      alt: "Medical data integration for VR training",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "04",
    title: "4. Validate the Experience",
    description:
      "Review usability, clinical workflows, privacy and safety requirements with relevant stakeholders.",
    src: "/industries/healthcare4.jpeg",
    srcMeta: {
      alt: "Healthcare VR simulation validation",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "05",
    title: "5. Deploy for Users",
    description:
      "Deliver through web, mobile, AR, VR or supported spatial devices.",
    src: "/industries/healthcare1.jpeg",
    srcMeta: {
      alt: "Healthcare AR deployment for clinicians",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "06",
    title: "6. Improve Continuously",
    description:
      "Use feedback, usage data and workflow insights to refine the experience.",
    src: "/industries/healthcare2.png",
    srcMeta: {
      alt: "Continuous improvement of healthcare digital experiences",
      width: 1200,
      height: 800,
    },
  },
] as const;

const HEALTHCARE_KEY_BENEFITS = [
  {
    title: "Improved Training",
    description: "Make clinical learning more immersive and repeatable.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Enhanced Patient Engagement",
    description: "Explain procedures and conditions visually.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Reduced Operational Costs",
    description:
      "Use simulation and digital workflows to reduce dependency on physical resources.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Better Clinical Understanding",
    description: "Visualize anatomy, equipment and procedures in context.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Safe Simulation",
    description:
      "Practice scenarios without exposing patients to unnecessary risk.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Accessible Healthcare",
    description: "Extend guidance and expertise through remote experiences.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const HEALTHCARE_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      {
        title: "Medical Training & Simulation",
        description:
          "Immersive practice environments for students, clinicians and technical teams.",
      },
      {
        title: "3D Anatomy Visualization",
        description:
          "Explore anatomical structures and medical concepts interactively.",
      },
      {
        title: "Surgical Planning & Assistance",
        description:
          "Support visualization and collaboration around complex procedures.",
      },
      {
        title: "Patient Education",
        description:
          "Explain conditions, procedures and treatment journeys using understandable 3D experiences.",
      },
      {
        title: "Hospital Navigation",
        description:
          "Help patients and visitors find departments, rooms and services.",
      },
      {
        title: "Remote Consultation & Guidance",
        description:
          "Connect experts and frontline teams through visual remote-assistance workflows.",
      },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      {
        title: "Medical 3D Visualization",
        description: "Interactive anatomical, device and procedural models.",
      },
      {
        title: "Immersive Simulation",
        description:
          "Repeatable training environments and scenario-based learning.",
      },
      {
        title: "AR Guidance",
        description: "Contextual visual guidance for equipment and workflows.",
      },
      {
        title: "Remote Assistance",
        description:
          "Live expert support with visual annotations and collaboration.",
      },
      {
        title: "Spatial Navigation",
        description:
          "Wayfinding experiences for hospitals and healthcare facilities.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      {
        title: "Advantage 1",
        description: "End-to-end AR/VR/MR/3D and spatial-computing expertise.",
      },
      {
        title: "Advantage 2",
        description:
          "Industry-specific solutions designed around real operational and customer workflows.",
      },
      {
        title: "Advantage 3",
        description:
          "Scalable, secure and deployment-ready digital experiences.",
      },
      {
        title: "Advantage 4",
        description:
          "Reusable 3D assets and immersive experiences across web, mobile and XR.",
      },
      {
        title: "Advantage 5",
        description:
          "Integration with existing business, content, analytics and enterprise systems.",
      },
    ],
  },
];

const HEALTHCARE_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

export const HEALTHCARE_INDUSTRY = {
  hero: {
    title: "Healthcare Solutions",
    description: "Spatial Computing for Better Care, Training and Outcomes",
    description2:
      "Enable smarter healthcare experiences with AR, VR, MR and 3D. Obrive creates immersive solutions for medical training, surgical planning, patient education, hospital navigation, remote assistance and medical device visualization—helping clinicians, students and patients interact with complex information more intuitively.",
    ctaButtons: {
      primary: "Explore Healthcare",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: HEALTHCARE_WORKFLOW,
  howItWorks: HEALTHCARE_HOW_IT_WORKS,
  keyBenefits: HEALTHCARE_KEY_BENEFITS,
  sidebarLinks: HEALTHCARE_SIDEBAR_LINKS,
  serviceSections: HEALTHCARE_SERVICE_SECTIONS,
};

const MANUFACTURING_WORKFLOW = [
  "Capture the Factory",
  "Create Digital Models",
  "Connect Operational Data",
  "Enable the Workforce",
  "Collaborate Remotely",
  "Optimize Continuously",
] as const;

const MANUFACTURING_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Capture the Factory",
    description:
      "Model assets, equipment, workstations, processes and production environments.",
    src: "/industries/manufacturing1.png",
    srcMeta: {
      alt: "Factory engineer using AR glasses for assembly guidance",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "02",
    title: "2. Create Digital Models",
    description:
      "Build 3D assets, digital twins, simulations and spatial work instructions.",
    src: "/industries/manufacturing2.png",
    srcMeta: {
      alt: "Smart factory floor with digital twin overlay",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "03",
    title: "3. Connect Operational Data",
    description:
      "Integrate relevant IoT, MES, ERP, SCADA or service information.",
    src: "/industries/manufacturing3.jpeg",
    srcMeta: {
      alt: "Worker using tablet to control robotic arms in real-time",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "04",
    title: "4. Enable the Workforce",
    description:
      "Deploy AR-guided maintenance, immersive training and visual instructions.",
    src: "/industries/manufacturing4.png",
    srcMeta: {
      alt: "Quality control inspection with AR defect detection overlays",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "05",
    title: "5. Collaborate Remotely",
    description:
      "Connect field teams with engineers and experts for faster issue resolution.",
    src: "/industries/manufacturing1.png",
    srcMeta: {
      alt: "Remote collaboration for manufacturing operations",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "06",
    title: "6. Optimize Continuously",
    description:
      "Use operational insights and simulation to improve processes and asset performance.",
    src: "/industries/manufacturing2.png",
    srcMeta: {
      alt: "Manufacturing process optimization through digital twins",
      width: 1200,
      height: 800,
    },
  },
] as const;

const MANUFACTURING_KEY_BENEFITS = [
  {
    title: "Increased Productivity",
    description: "Give teams clearer visual information at the point of work.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Reduced Downtime",
    description: "Support faster troubleshooting and maintenance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Lower Operational Costs",
    description:
      "Use simulation and digital workflows before physical changes.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Improved Safety",
    description: "Guide workers through procedures and complex environments.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Faster Time-to-Market",
    description: "Validate designs, layouts and processes earlier.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Sustainable Operations",
    description: "Optimize resources, workflows and asset utilization.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const MANUFACTURING_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      {
        title: "Digital Twins of Assets",
        description:
          "Create dynamic visual replicas of machinery, lines, plants and operational environments.",
      },
      {
        title: "AR-Assisted Maintenance",
        description:
          "Overlay instructions, component information and inspection guidance at the point of work.",
      },
      {
        title: "Workforce Training & Simulation",
        description:
          "Practice machine operation, safety and procedures in immersive environments.",
      },
      {
        title: "Remote Expert Assistance",
        description:
          "Bring engineers and specialists into field workflows without unnecessary travel.",
      },
      {
        title: "3D Product & Process Visualization",
        description:
          "Visualize products, assemblies, factory layouts and manufacturing processes across the lifecycle.",
      },
      {
        title: "Quality Control & Inspection",
        description:
          "Use spatial overlays and visual workflows to support inspection and quality processes.",
      },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      {
        title: "Digital Twins",
        description:
          "3D representations connected to operational and asset information.",
      },
      {
        title: "Industrial AR",
        description:
          "Hands-on guidance for maintenance, inspection, assembly and training.",
      },
      {
        title: "VR Simulation",
        description: "Safe and repeatable environments for workforce learning.",
      },
      {
        title: "3D Visualization",
        description:
          "Product, factory and process visualization across the lifecycle.",
      },
      {
        title: "Remote Assistance",
        description: "Expert collaboration for field and plant teams.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      {
        title: "Advantage 1",
        description: "End-to-end AR/VR/MR/3D and spatial-computing expertise.",
      },
      {
        title: "Advantage 2",
        description:
          "Industry-specific solutions designed around real operational and customer workflows.",
      },
      {
        title: "Advantage 3",
        description:
          "Scalable, secure and deployment-ready digital experiences.",
      },
      {
        title: "Advantage 4",
        description:
          "Reusable 3D assets and immersive experiences across web, mobile and XR.",
      },
      {
        title: "Advantage 5",
        description:
          "Integration with existing business, content, analytics and enterprise systems.",
      },
    ],
  },
];

const MANUFACTURING_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

export const MANUFACTURING_INDUSTRY = {
  hero: {
    title: "Manufacturing Solutions",
    description: "Spatial Computing for Smarter, More Efficient Operations",
    description2:
      "Create connected, intelligent and future-ready factories with AR, VR, MR, 3D and Digital Twins. Obrive helps manufacturers improve design, training, maintenance, quality, remote assistance and operational efficiency across the product lifecycle—from concept and engineering to production and service.",
    ctaButtons: {
      primary: "Explore Manufacturing",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: MANUFACTURING_WORKFLOW,
  howItWorks: MANUFACTURING_HOW_IT_WORKS,
  keyBenefits: MANUFACTURING_KEY_BENEFITS,
  sidebarLinks: MANUFACTURING_SIDEBAR_LINKS,
  serviceSections: MANUFACTURING_SERVICE_SECTIONS,
};

const RETAIL_WORKFLOW = [
  "Map the Customer Journey",
  "Create 3D Experiences",
  "Connect Retail Data",
  "Deploy Across Channels",
  "Personalize Discovery",
  "Measure & Optimize",
] as const;

const RETAIL_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Map the Customer Journey",
    description:
      "Identify discovery, consideration, purchase and post-purchase moments where immersive experiences add value.",
    src: "/industries/retail1.png",
    srcMeta: {
      alt: "Customer using AR try-on in a retail store",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "02",
    title: "2. Create 3D Experiences",
    description:
      "Build product models, environments, AR interactions, virtual showrooms and digital merchandising assets.",
    src: "/industries/retail2.jpeg",
    srcMeta: {
      alt: "3D product configurator in a luxury showroom",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "03",
    title: "3. Connect Retail Data",
    description:
      "Integrate catalogues, inventory, pricing, promotions, CRM, ecommerce and analytics.",
    src: "/industries/retail3.png",
    srcMeta: {
      alt: "Virtual retail showroom environment in VR",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "04",
    title: "4. Deploy Across Channels",
    description:
      "Launch experiences on web, mobile, in-store displays, AR devices and supported XR platforms.",
    src: "/industries/retail4.jpeg",
    srcMeta: {
      alt: "Smart retail analytics dashboard with AR overlay",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "05",
    title: "5. Personalize Discovery",
    description:
      "Use contextual recommendations, product comparisons, navigation and interactive content.",
    src: "/industries/retail1.png",
    srcMeta: {
      alt: "Personalized AR product discovery for shoppers",
      width: 1200,
      height: 800,
    },
  },
  {
    step: "06",
    title: "6. Measure & Optimize",
    description:
      "Track engagement, interaction patterns and conversion signals to improve the experience.",
    src: "/industries/retail2.jpeg",
    srcMeta: {
      alt: "Retail experience analytics and optimization",
      width: 1200,
      height: 800,
    },
  },
] as const;

const RETAIL_KEY_BENEFITS = [
  {
    title: "Higher Engagement",
    description: "Make products interactive and memorable.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Better Conversion",
    description: "Help shoppers understand products before purchase.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Personalized Shopping",
    description: "Tailor discovery, recommendations and experiences.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Lower Returns",
    description: "Set clearer expectations through realistic visualization.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Data-Driven Insights",
    description: "Understand engagement and product interactions.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Omnichannel Integration",
    description: "Connect online, mobile, store and immersive channels.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const RETAIL_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      {
        title: "Virtual Try-On",
        description:
          "Let customers preview fashion, accessories, eyewear or other products in an interactive environment.",
      },
      {
        title: "3D Product Visualization",
        description:
          "Explore products from every angle and understand features, finishes and configurations.",
      },
      {
        title: "In-Store Navigation",
        description:
          "Guide shoppers to products, departments, offers and services using spatial or AR navigation.",
      },
      {
        title: "Interactive Product Catalogues",
        description:
          "Replace static listings with interactive 3D product experiences.",
      },
      {
        title: "AR Promotions & Gamification",
        description:
          "Create location-aware campaigns, product discovery and interactive promotions.",
      },
      {
        title: "Virtual Showrooms",
        description:
          "Extend the store beyond physical locations with immersive digital spaces.",
      },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      {
        title: "3D Commerce",
        description:
          "Photorealistic and interactive product experiences for ecommerce and retail environments.",
      },
      {
        title: "AR Experiences",
        description:
          "Try-ons, product discovery, visualization, promotions and contextual interactions.",
      },
      {
        title: "Spatial Navigation",
        description:
          "Indoor wayfinding and product discovery for complex retail environments.",
      },
      {
        title: "Digital Showrooms",
        description:
          "Immersive brand and product environments for customers and sales teams.",
      },
      {
        title: "Analytics",
        description:
          "Measure interaction, product interest and customer journey behaviour.",
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      {
        title: "Advantage 1",
        description: "End-to-end AR/VR/MR/3D and spatial-computing expertise.",
      },
      {
        title: "Advantage 2",
        description:
          "Industry-specific solutions designed around real operational and customer workflows.",
      },
      {
        title: "Advantage 3",
        description:
          "Scalable, secure and deployment-ready digital experiences.",
      },
      {
        title: "Advantage 4",
        description:
          "Reusable 3D assets and immersive experiences across web, mobile and XR.",
      },
      {
        title: "Advantage 5",
        description:
          "Integration with existing business, content, analytics and enterprise systems.",
      },
    ],
  },
];

const RETAIL_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

export const RETAIL_INDUSTRY = {
  hero: {
    title: "Retail Solutions",
    description: "Spatial Computing for Immersive Shopping Experiences",
    description2:
      "Transform how people discover, compare and buy products with AR, VR, MR and 3D experiences. Obrive helps retailers create virtual try-ons, interactive product visualization, in-store navigation, immersive showrooms and personalized shopping journeys that connect digital discovery with physical retail.",
    ctaButtons: {
      primary: "Explore Retail",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: RETAIL_WORKFLOW,
  howItWorks: RETAIL_HOW_IT_WORKS,
  keyBenefits: RETAIL_KEY_BENEFITS,
  sidebarLinks: RETAIL_SIDEBAR_LINKS,
  serviceSections: RETAIL_SERVICE_SECTIONS,
};
