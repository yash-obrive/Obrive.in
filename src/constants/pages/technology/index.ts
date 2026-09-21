import { ICONS, ICONS_META, IMAGES, IMAGES_META } from "@/assets/images";

const PLACEHOLDER_WORKFLOW = [
  "Step 1: Evaluate Technology",
  "Step 2: Design Architecture",
  "Step 3: Develop & Integrate",
  "Step 4: Deploy & Scale",
] as const;

const PLACEHOLDER_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Placeholder Technology Step",
    description:
      "This is a placeholder description for how this technology works.",
    src: IMAGES.AUGMENTED_FIRST_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FIRST_IMAGE,
  },
] as const;

const PLACEHOLDER_KEY_BENEFITS = [
  {
    title: "Placeholder Benefit",
    description: "Placeholder description for key benefit of this technology.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const AR_WORKFLOW = [
  "Step 1: Precise Visualization",
  "Step 2: Guided Support",
  "Step 3: Visual Collaboration",
  "Step 4: Monitor Approvals",
] as const;

const AR_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Precise Visualization",
    description:
      "Overlay contextual 3D models or step-by-step instructions directly onto physical workspaces—eliminating guesswork and improving accuracy.",
    src: IMAGES.AUGMENTED_FIRST_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Guided Support",
    description:
      "Enable field technicians, trainees, or remote collaborators to receive live AR annotations, voice prompts, and interactive cues in real time.",
    src: IMAGES.AUGMENTED_SECOND_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Visual Collaboration",
    description:
      "Utilize a branded AR portal for secure sharing of AR projects—allowing clients and team members to view, interact, and provide feedback.",
    src: IMAGES.AUGMENTED_THIRD_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Monitor Approvals",
    description:
      "Embed digital sign-off options and usage tracking within AR experiences, ensuring accountability, compliance, and seamless handoffs.",
    src: IMAGES.AUGMENTED_FOURTH_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FOURTH_IMAGE,
  },
] as const;

const AR_KEY_BENEFITS = [
  {
    title: "Speed & Efficiency",
    description:
      "Slash training and onboarding time with immersive, in‑situ AR guidance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Enhanced Accuracy",
    description:
      "Real‑time overlays reduce human errors and support compliance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Scalability",
    description:
      "Deploy across facilities or client sites with minimal setup and cost.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Stronger Engagement",
    description:
      "Interactive visuals foster deeper understanding and retention.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Unified Workflow",
    description:
      "Integrate with core business systems for seamless data‑driven AR delivery.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const VR_WORKFLOW = [
  "Step 1: Build VR Workflows",
  "Step 2: Launch & Train",
  "Step 3: Secure Collaboration",
  "Step 4: Track & Improve",
] as const;

const VR_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Build VR Workflows",
    description:
      "Build immersive simulations tailored to your operational environment—whether it's factory line training, equipment handling, or virtual inspections.",
    src: IMAGES.VIRTUAL_FIRST_IMAGE,
    srcMeta: IMAGES_META.VIRTUAL_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Launch & Train",
    description:
      "Deploy VR experiences to teams, with interactive guidance, prompts, and embedded AI-driven assistance that adapts to user performance.",
    src: IMAGES.VIRTUAL_SECOND_IMAGE,
    srcMeta: IMAGES_META.VIRTUAL_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Secure Collaboration",
    description:
      "Use a branded client portal to invite stakeholders, review recorded sessions, share feedback, and track progress in a modern VR interface.",
    src: IMAGES.VIRTUAL_THIRD_IMAGE,
    srcMeta: IMAGES_META.VIRTUAL_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Track & Improve",
    description:
      "Automatically capture performance metrics and user feedback directly from VR sessions, supporting analytics, certification, and continuous improvement.",
    src: IMAGES.VIRTUAL_FOURTH_IMAGE,
    srcMeta: IMAGES_META.VIRTUAL_FOURTH_IMAGE,
  },
] as const;

const VR_KEY_BENEFITS = [
  {
    title: "Immersive Engagement",
    description:
      "Interactive 3D environments foster deeper understanding and retention over manual methods.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Risk-Free Simulation",
    description:
      "Provide safe, realistic, step-by-step guidance that enhances accuracy and reduces risks.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Scalability",
    description:
      "Enable enterprises to accelerate adoption and achieve measurable results across teams.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AI-Guided Feedback",
    description:
      "Automatically analyse user actions and deliver contextual guidance and recommendations.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Automated Triggers",
    description:
      "Automatically launch VR simulations when milestones or project phase transitions are reached.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const SC_WORKFLOW = [
  "Step 1: Structure Your Spatial App Workflow",
  "Step 2: Share Interactive Previews",
  "Step 3: Automate Iteration & Launch",
  "Step 4: Approve & Integrate",
] as const;

const SC_HOW_IT_WORKS = [
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

const SC_KEY_BENEFITS = [
  {
    title: "Immersive Pipeline Management",
    description:
      "Track every stage of your spatial computing project—from concept and prototyping to deployment.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Intelligent Progress Forecasting",
    description:
      "Leverage real-time analytics that forecast delivery timelines, highlight bottlenecks, and ensure smooth rollout.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AI-Driven Insight & Guidance",
    description:
      "Automatically analyze interactions, detect engagement drops, and adjustments to optimize VR/AR experiences.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Auto-Triggered Deployments",
    description:
      "Automatically launch user tests, beta previews, or live deployments as soon as milestones are reached.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Instant Interactive Demos",
    description:
      "Share links to immersive app previews—no installs, no delays—enabling clients to explore and collaborate.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const THREE_D_WORKFLOW = [
  "Step 1: Centralize Your Design Workflow",
  "Step 2: Review & Revise with Precision",
  "Step 3: Iterate Automatically",
  "Step 4: Approve, Integrate & Deliver",
] as const;

const THREE_D_HOW_IT_WORKS = [
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

const THREE_D_KEY_BENEFITS = [
  {
    title: "Structured Project Pipeline",
    description:
      "Monitor every design stage—concept, prototyping, review, revision—with clarity and precision.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Auto-Launch Iterations",
    description:
      "Trigger revised renders or next-stage assets automatically when a project moves into approved-for-production status.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Instant Collaborative Reviews",
    description:
      "Share interactive previews via unique links—no downloads, no setup—enabling clients to comment and collaborate instantly.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Intelligent Progress Forecasting",
    description:
      "Leverage data signals (feedback speed, approval delays, revision cycles) to anticipate project status and spot bottlenecks early.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AI-Driven Design Feedback",
    description:
      "Detect inconsistencies, recommend optimizations, and flag issues (e.g., geometry errors, lighting anomalies) through automated analysis.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;


// ── Service Sections & Sidebar Links ────────────────────────────────────────

const AR_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      { title: "AR-Guided Maintenance", description: "Overlay step-by-step instructions on equipment for faster, error-free maintenance." },
      { title: "Immersive Training", description: "Train employees in context using real-world AR overlays and interactive guidance." },
      { title: "Remote Expert Assistance", description: "Connect field teams with specialists through live AR annotation and video." },
      { title: "Product Visualization", description: "Let customers visualize products in their real environment before purchasing." },
      { title: "Quality Inspection", description: "Use spatial overlays and checklists to streamline inspection workflows." },
      { title: "Navigation & Wayfinding", description: "Guide users through complex spaces with AR indoor navigation." },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      { title: "3D Overlay & Anchoring", description: "Precisely place digital content in physical space using marker and markerless tracking." },
      { title: "Real-Time Collaboration", description: "Share AR sessions and annotations across teams and locations." },
      { title: "Device Flexibility", description: "Deploy on smartphones, tablets, smart glasses and headsets." },
      { title: "Enterprise Integration", description: "Connect AR experiences with ERP, CRM and IoT systems." },
      { title: "Analytics & Reporting", description: "Track usage, performance and outcomes across AR deployments." },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      { title: "End-to-End AR Expertise", description: "From concept and UX through 3D development, integration and deployment." },
      { title: "Industry-Focused Solutions", description: "Built around real operational and customer workflows." },
      { title: "Scalable & Secure", description: "Enterprise-ready architecture from pilot to full rollout." },
      { title: "Cross-Platform Delivery", description: "Web, mobile, wearables and supported XR devices." },
      { title: "Ongoing Support", description: "Expert guidance throughout delivery and beyond." },
    ],
  },
];
const AR_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

const VR_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      { title: "VR Training & Simulation", description: "Create immersive, repeatable training environments for high-stakes workflows." },
      { title: "Virtual Product Development", description: "Review and iterate on 3D product designs in an immersive environment." },
      { title: "Virtual Showrooms", description: "Let customers explore products and spaces in a fully interactive VR environment." },
      { title: "Collaborative Design Reviews", description: "Bring distributed teams into shared virtual design and review sessions." },
      { title: "Therapy & Rehabilitation", description: "Support clinical applications with immersive VR experiences." },
      { title: "Virtual Events & Experiences", description: "Create branded virtual spaces for events, launches and engagement." },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      { title: "Immersive 3D Environments", description: "High-fidelity environments built for training, collaboration and visualization." },
      { title: "Interactive Simulations", description: "Repeatable, scenario-based training and decision-making workflows." },
      { title: "Multi-User VR", description: "Collaborative spaces for distributed teams and stakeholders." },
      { title: "AI-Guided Feedback", description: "Contextual guidance and performance analytics within VR sessions." },
      { title: "Cross-Device Deployment", description: "Deploy on major VR headsets and desktop platforms." },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      { title: "Full-Stack VR Development", description: "3D, UX, development, integration and deployment under one roof." },
      { title: "Industry-Specific Expertise", description: "Solutions designed around real operational workflows." },
      { title: "Scalable Deployments", description: "From single-site pilots to global enterprise rollouts." },
      { title: "Measurable Outcomes", description: "Track adoption, performance and return on investment." },
      { title: "Ongoing Partnership", description: "Continuous support and content updates post-launch." },
    ],
  },
];
const VR_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

const MR_WORKFLOW = [
  "Understand the Environment",
  "Design the Experience",
  "Connect & Integrate",
  "Deploy & Optimize",
] as const;

const MR_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Understand the Environment",
    description: "Map physical workflows, spatial constraints, users and information needs.",
    src: "/technology/mr_1.jpg",
  },
  {
    step: "02",
    title: "2. Design the Experience",
    description: "Create spatial interfaces, 3D content, anchors and interaction models.",
    src: "/technology/mr_2.jpg",
  },
  {
    step: "03",
    title: "3. Connect & Integrate",
    description: "Connect relevant operational, IoT, product or enterprise data into the MR experience.",
    src: "/technology/mr_3.jpg",
  },
  {
    step: "04",
    title: "4. Deploy & Optimize",
    description: "Test across devices and environments, measure usage and continuously improve.",
    src: "/technology/mr_4.jpg",
  },
] as const;

const MR_KEY_BENEFITS = [
  { title: "Enhanced Visualization", description: "Bring digital models into real spaces for richer context.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Real-Time Interaction", description: "Interact naturally with spatial content in your environment.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Improved Collaboration", description: "Share 3D experiences across distributed teams and stakeholders.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Greater Efficiency", description: "Reduce ambiguity and errors in complex operational workflows.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Reduced Costs", description: "Reuse digital training and review experiences across teams.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Safer Operations", description: "Practice and guide complex workflows without physical risk.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
] as const;

const MR_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      { title: "MR-Assisted Maintenance", description: "Overlay work instructions and diagnostics onto real equipment." },
      { title: "Spatial Design Reviews", description: "Review and iterate on 3D designs overlaid on physical spaces." },
      { title: "Collaborative MR Sessions", description: "Multi-user MR experiences for distributed teams." },
      { title: "Medical Visualization", description: "Overlay anatomical or procedural content for clinical guidance." },
      { title: "Construction Planning", description: "Visualize building models overlaid on real construction sites." },
      { title: "MR Product Demos", description: "Show products in context within customer environments." },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      { title: "Spatial Anchoring", description: "Precisely place and lock digital content in physical space." },
      { title: "Real-World Understanding", description: "Surface detection, occlusion and environment mapping." },
      { title: "Multi-User MR", description: "Shared spatial experiences across teams and locations." },
      { title: "Enterprise Integration", description: "Connect MR to operational and enterprise data systems." },
      { title: "Cross-Device Support", description: "Deploy on HoloLens, Magic Leap, mobile and compatible devices." },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      { title: "End-to-End MR Development", description: "Spatial UX through to full deployment." },
      { title: "Industry-Focused Solutions", description: "Designed around real-world operational workflows." },
      { title: "Modern Technology Stack", description: "Spatial computing, 3D and enterprise integration." },
      { title: "Scalable & Secure", description: "Built for enterprise rollout from pilot to scale." },
      { title: "Expert Support", description: "Ongoing guidance and support throughout delivery." },
    ],
  },
];
const MR_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

const XR_WORKFLOW = [
  "Discover the Use Case",
  "Design the XR Experience",
  "Develop & Integrate",
  "Deploy & Measure",
] as const;

const XR_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Discover the Use Case",
    description: "Identify where AR, VR or MR can improve experiences, training or operations.",
    src: "/technology/xr_1.jpg",
  },
  {
    step: "02",
    title: "2. Design the XR Experience",
    description: "Create the 3D environment, interaction model and complete user journey.",
    src: "/technology/xr_2.jpg",
  },
  {
    step: "03",
    title: "3. Develop & Integrate",
    description: "Build the application and connect required content, data and enterprise systems.",
    src: "/technology/xr3.png",
  },
  {
    step: "04",
    title: "4. Deploy & Measure",
    description: "Test on target devices, launch to users and measure outcomes continuously.",
    src: "/technology/xr4.jpeg",
  },
] as const;

const XR_KEY_BENEFITS = [
  { title: "Immersive Experiences", description: "Create deeper, more meaningful interactions across AR, VR and MR.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Higher Engagement", description: "Turn passive content into interactive, memorable experiences.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Faster Learning", description: "Support experiential training that improves retention and performance.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Better Collaboration", description: "Bring distributed teams together in shared immersive environments.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Increased Productivity", description: "Put visual tools and guidance in the right context at the right time.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Real Business Impact", description: "Connect XR experiences directly to operational workflows and outcomes.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
] as const;

const XR_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      { title: "Enterprise XR Training", description: "Immersive training across AR, VR and MR for any industry or workflow." },
      { title: "XR Product Visualization", description: "Showcase products in AR, navigate them in VR or review them in MR." },
      { title: "Spatial Collaboration", description: "Multi-user XR sessions for design review, planning and teamwork." },
      { title: "Customer XR Experiences", description: "Engage customers with immersive retail, real estate and marketing experiences." },
      { title: "XR Simulation", description: "Safe, repeatable scenario-based simulations for complex operations." },
      { title: "XR Data Visualization", description: "Understand complex datasets spatially in AR and VR environments." },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      { title: "Full-Spectrum XR", description: "AR, VR and MR development under one platform." },
      { title: "Creative & Technical", description: "UX design, 3D content creation and engineering." },
      { title: "Scalable & Secure", description: "Architecture that supports pilots through enterprise scale." },
      { title: "Industry-Focused", description: "Adapt experiences to specific users and operational workflows." },
      { title: "Ongoing Support", description: "Deployment, optimization and continuous improvement." },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      { title: "Full-Spectrum XR", description: "AR, VR and MR expertise in a single partner." },
      { title: "Creative & Technical Excellence", description: "UX, 3D and engineering capabilities combined." },
      { title: "Scalable from Pilot to Enterprise", description: "Solutions that grow with your business." },
      { title: "Industry-Adapted Solutions", description: "Tailored to specific users, workflows and environments." },
      { title: "Ongoing Partnership", description: "Continuous support, optimization and future-ready updates." },
    ],
  },
];
const XR_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

const DT_WORKFLOW = [
  "Capture Real-World Data",
  "Create the 3D Twin",
  "Integrate & Analyze",
  "Optimize Operations",
] as const;

const DT_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Capture Real-World Data",
    description: "Bring together asset, sensor, BIM, IoT and operational data from your environment.",
    src: "/technology/dt_1.jpg",
  },
  {
    step: "02",
    title: "2. Create the 3D Twin",
    description: "Build a structured digital representation of your asset, space or operational system.",
    src: "/technology/dt_2.jpg",
  },
  {
    step: "03",
    title: "3. Integrate & Analyze",
    description: "Connect live and historical data streams for real-time monitoring and simulation.",
    src: "/technology/dt_3.jpg",
  },
  {
    step: "04",
    title: "4. Optimize Operations",
    description: "Use insights and scenarios to improve maintenance, planning and lifecycle performance.",
    src: "/technology/dt_4.jpg",
  },
] as const;

const DT_KEY_BENEFITS = [
  { title: "Real-Time Monitoring", description: "See asset conditions in contextual 3D with live data overlays.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Predictive Insights", description: "Identify patterns and potential issues before they impact operations.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Better Decisions", description: "Simulate scenarios and evaluate options before making costly changes.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Reduced Costs", description: "Optimize maintenance scheduling and resource allocation.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Enhanced Asset Lifecycle", description: "Connect design intent through operational performance.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Sustainable Operations", description: "Improve resource utilization and reduce operational waste.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
] as const;

const DT_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      { title: "Asset Digital Twins", description: "Create live replicas of machinery, equipment and infrastructure." },
      { title: "Building & Facility Twins", description: "Monitor and manage built environments with real-time data." },
      { title: "Manufacturing Process Twins", description: "Simulate and optimize production lines and factory operations." },
      { title: "Infrastructure Twins", description: "Manage roads, utilities and urban systems through connected models." },
      { title: "Supply Chain Twins", description: "Visualize and optimize logistics, inventory and distribution flows." },
      { title: "Product Lifecycle Twins", description: "Connect design, manufacturing and service into a unified model." },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      { title: "Advanced 3D Modeling", description: "BIM, CAD and spatial data converted into interactive digital twins." },
      { title: "Real-Time Analytics", description: "Live operational monitoring with visual dashboards and alerts." },
      { title: "IoT & Sensor Integration", description: "Connect physical sensors and data streams to the digital model." },
      { title: "Simulation & Scenario Planning", description: "Test changes and predict outcomes in a safe digital environment." },
      { title: "Scalable Platforms", description: "Support multiple assets and sites from a single platform." },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      { title: "Advanced 3D & BIM Expertise", description: "CAD, BIM and spatial data at the foundation of every twin." },
      { title: "Real-Time Analytics", description: "Live visual monitoring and insight generation." },
      { title: "Industry Use Cases", description: "Assets, buildings, infrastructure and industrial environments." },
      { title: "Scalable Platforms", description: "Support multiple sites and asset portfolios." },
      { title: "Expert Support", description: "3D modeling, integration and ongoing platform expertise." },
    ],
  },
];
const DT_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

const SC_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      { title: "Spatial App Development", description: "Build applications that understand and interact with physical space." },
      { title: "Immersive Workspaces", description: "Create persistent digital environments for collaboration and productivity." },
      { title: "Spatial Commerce", description: "Enable product discovery and purchase in 3D spatial environments." },
      { title: "Smart Building Interfaces", description: "Control and interact with building systems through spatial interfaces." },
      { title: "Spatial Training Platforms", description: "Develop training applications that adapt to real-world environments." },
      { title: "Location-Based Experiences", description: "Create geo-aware spatial experiences for retail, tourism and events." },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      { title: "Immersive Pipeline Management", description: "Track every stage of your spatial computing project from concept to deployment." },
      { title: "Intelligent Progress Forecasting", description: "Real-time analytics that forecast delivery and highlight bottlenecks." },
      { title: "AI-Driven Guidance", description: "Automatically detect engagement drops and optimize spatial experiences." },
      { title: "Auto-Triggered Deployments", description: "Launch tests and live deployments automatically as milestones are reached." },
      { title: "Instant Interactive Demos", description: "Share immersive previews without installs for rapid client feedback." },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      { title: "Spatial Computing Expertise", description: "Deep experience across AR, VR, MR and spatial platforms." },
      { title: "Full-Stack Development", description: "3D, UX, backend and integration in one team." },
      { title: "Enterprise-Ready Architecture", description: "Secure, scalable platforms from pilot to rollout." },
      { title: "Cross-Platform Delivery", description: "Deploy to Apple Vision Pro, Quest, HoloLens, mobile and web." },
      { title: "Innovation-Led Approach", description: "Constantly exploring new spatial computing workflows and capabilities." },
    ],
  },
];
const SC_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

const THREE_D_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      { title: "Product Visualization", description: "Create photorealistic 3D renders and interactive product models." },
      { title: "Architectural Visualization", description: "Explore buildings, interiors and developments in interactive 3D." },
      { title: "Industrial 3D Models", description: "Visualize machinery, equipment and manufacturing assets in detail." },
      { title: "Marketing & Brand Content", description: "Create compelling 3D visuals for campaigns, launches and brand storytelling." },
      { title: "3D for AR & VR", description: "Create optimized assets for use in immersive AR and VR experiences." },
      { title: "Animation & Motion", description: "Bring products, spaces and concepts to life with 3D animation." },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      { title: "Structured Project Pipeline", description: "Monitor every design stage with clarity and precision." },
      { title: "Auto-Launch Iterations", description: "Trigger revised renders automatically when assets move to production." },
      { title: "Instant Collaborative Reviews", description: "Share interactive previews for real-time client feedback." },
      { title: "Intelligent Progress Forecasting", description: "Identify bottlenecks and forecast timelines from data signals." },
      { title: "AI-Driven Design Feedback", description: "Detect inconsistencies and recommend optimizations automatically." },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      { title: "End-to-End 3D Expertise", description: "Modeling, rendering, animation and XR-ready asset production." },
      { title: "Industry-Specific Content", description: "Products, spaces and environments across any sector." },
      { title: "Scalable Workflows", description: "From single assets to large-scale content libraries." },
      { title: "AR & VR-Ready Output", description: "Optimized assets designed for immersive deployment." },
      { title: "Quality & Consistency", description: "Rigorous review workflows and iterative refinement." },
    ],
  },
];
const THREE_D_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

const AI_WORKFLOW = [
  "Define the Business Goal",
  "Design the Intelligent Experience",
  "Develop & Integrate",
  "Learn & Improve",
] as const;

const AI_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Define the Business Goal",
    description: "Identify tasks and decisions where AI and immersive technology can work together to create value.",
    src: "/technology/ai1.jpeg",
  },
  {
    step: "02",
    title: "2. Design the Intelligent Experience",
    description: "Combine spatial interfaces with conversational, vision or predictive AI models.",
    src: "/technology/ai2.png",
  },
  {
    step: "03",
    title: "3. Develop & Integrate",
    description: "Connect AI models, data pipelines, workflows and enterprise systems into the immersive experience.",
    src: "/technology/ai3.jpeg",
  },
  {
    step: "04",
    title: "4. Learn & Improve",
    description: "Monitor quality and user outcomes, then continuously refine and evolve the experience.",
    src: "/technology/ai4.png",
  },
] as const;

const AI_KEY_BENEFITS = [
  { title: "Personalized Experiences", description: "Adapt content, guidance and interactions to individual users.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Intelligent Automation", description: "Accelerate immersive workflows with AI-driven decision-making.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Real-Time Insights", description: "Combine spatial context with AI analysis for deeper understanding.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Greater Engagement", description: "Make experiences responsive and adaptive to user behavior.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Improved Decisions", description: "Visualize AI outputs in context for faster, more confident choices.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Future-Ready Solutions", description: "Evolve as AI models improve and new capabilities emerge.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
] as const;

const AI_SERVICE_SECTIONS = [
  {
    id: "applications",
    title: "Key Applications",
    subSections: [
      { title: "AI-Powered Training", description: "Immersive training experiences that adapt to individual learner performance." },
      { title: "Intelligent Remote Assistance", description: "AI-enhanced expert support with real-time guidance and object recognition." },
      { title: "Conversational XR Interfaces", description: "Voice and language AI embedded in spatial experiences." },
      { title: "Predictive Maintenance", description: "AI analysis combined with AR overlays for proactive asset management." },
      { title: "AI Product Configurators", description: "Intelligent 3D configurators that recommend options based on user behavior." },
      { title: "Spatial Data Analytics", description: "Visualize and explore AI-generated insights in immersive 3D environments." },
    ],
  },
  {
    id: "capabilities",
    title: "Core Capabilities",
    subSections: [
      { title: "AI + Immersive Integration", description: "Combining AI models with AR, VR, MR and spatial interfaces." },
      { title: "Computer Vision", description: "Object detection, recognition and spatial understanding for AR applications." },
      { title: "Conversational AI", description: "Natural language interfaces embedded into immersive experiences." },
      { title: "Predictive Analytics", description: "AI models that surface actionable insights from operational data." },
      { title: "Adaptive Personalization", description: "Experiences that learn and adapt to individual users over time." },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Obrive",
    subSections: [
      { title: "AI + Immersive Expertise", description: "Deep capability across AI, AR, VR, MR and spatial interfaces." },
      { title: "Custom-Built Solutions", description: "Designed around your data, users and business goals." },
      { title: "Scalable & Secure", description: "Enterprise-ready architecture and responsible AI practices." },
      { title: "Cross-Industry Experience", description: "Apply AI-immersive solutions across business functions and sectors." },
      { title: "Innovation-Driven", description: "Constantly exploring new AI-spatial workflows and capabilities." },
    ],
  },
];
const AI_SIDEBAR_LINKS = [
  { id: "applications", label: "Key Applications" },
  { id: "capabilities", label: "Core Capabilities" },
  { id: "why-choose", label: "Why Choose Obrive" },
];

export const AUGMENTED_REALITY = {
  hero: {
    title: "Augmented Reality",
    description:
      "Overlay digital information onto the physical world for enhanced experiences.",
    description2:
      "Bring manuals, instructions, and collaboration directly into physical workspaces to eliminate guesswork, speed up training, and improve operational accuracy.",
    ctaButtons: {
      primary: "Explore AR",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: AR_WORKFLOW,
  howItWorks: AR_HOW_IT_WORKS,
  keyBenefits: AR_KEY_BENEFITS,
  sidebarLinks: AR_SIDEBAR_LINKS,
  serviceSections: AR_SERVICE_SECTIONS,
};

export const VIRTUAL_REALITY = {
  hero: {
    title: "Virtual Reality",
    description:
      "Immerse users in entirely digital, fully interactive 3D environments.",
    description2:
      "Transform how industries train, collaborate, and operate. Create interactive 3D environments to replace costly manual methods with engaging, efficient simulations.",
    ctaButtons: {
      primary: "Explore VR",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: VR_WORKFLOW,
  howItWorks: VR_HOW_IT_WORKS,
  keyBenefits: VR_KEY_BENEFITS,
  sidebarLinks: VR_SIDEBAR_LINKS,
  serviceSections: VR_SERVICE_SECTIONS,
};

export const MIXED_REALITY = {
  hero: {
    title: "Mixed Reality",
    description:
      "Blend physical and digital worlds to create complex interactive environments.",
    description2:
      "Bridging the Physical and Digital Worlds — Obrive creates immersive MR experiences that empower businesses to visualize, collaborate, train and operate in smarter, more intuitive ways.",
    ctaButtons: {
      primary: "Explore MR",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: MR_WORKFLOW,
  howItWorks: MR_HOW_IT_WORKS,
  keyBenefits: MR_KEY_BENEFITS,
  sidebarLinks: MR_SIDEBAR_LINKS,
  serviceSections: MR_SERVICE_SECTIONS,
};

export const EXTENDED_REALITY = {
  hero: {
    title: "Extended Reality",
    description:
      "The overarching umbrella bridging AR, VR, and MR into cohesive spatial systems.",
    description2:
      "A New Dimension for Human Experience — Obrive delivers end-to-end XR solutions that transform the way people learn, work, collaborate and engage across every industry.",
    ctaButtons: {
      primary: "Explore XR",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: XR_WORKFLOW,
  howItWorks: XR_HOW_IT_WORKS,
  keyBenefits: XR_KEY_BENEFITS,
  sidebarLinks: XR_SIDEBAR_LINKS,
  serviceSections: XR_SERVICE_SECTIONS,
};

export const SPATIAL_COMPUTING = {
  hero: {
    title: "Spatial Computing",
    description:
      "Seamlessly map and interact with digital elements in 3D physical space.",
    description2:
      "Simplify end-to-end Spatial Computing development to accelerate delivery, strengthen collaboration, and elevate immersive experiences across sectors.",
    ctaButtons: {
      primary: "Explore Spatial Computing",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: SC_WORKFLOW,
  howItWorks: SC_HOW_IT_WORKS,
  keyBenefits: SC_KEY_BENEFITS,
  sidebarLinks: SC_SIDEBAR_LINKS,
  serviceSections: SC_SERVICE_SECTIONS,
};

export const DIGITAL_TWINS = {
  hero: {
    title: "Digital Twins",
    description:
      "Real-time, interactive virtual replicas for monitoring and simulating physical assets.",
    description2:
      "Real Assets. Virtual Intelligence. Greater Possibilities — Obrive builds intelligent digital twins that help businesses monitor, simulate, analyze and optimize operations across the entire asset lifecycle.",
    ctaButtons: {
      primary: "Explore Digital Twins",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: DT_WORKFLOW,
  howItWorks: DT_HOW_IT_WORKS,
  keyBenefits: DT_KEY_BENEFITS,
  sidebarLinks: DT_SIDEBAR_LINKS,
  serviceSections: DT_SERVICE_SECTIONS,
};

export const THREE_D_VISUALIZATION = {
  hero: {
    title: "3D Visualization",
    description:
      "High-fidelity rendering and interactive modeling for products and spaces.",
    description2:
      "Redefine traditional 3D workflows with a unified platform that streamlines stages, accelerates collaboration, and improves quality across your entire design pipeline.",
    ctaButtons: {
      primary: "Explore 3D Visualization",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: THREE_D_WORKFLOW,
  howItWorks: THREE_D_HOW_IT_WORKS,
  keyBenefits: THREE_D_KEY_BENEFITS,
  sidebarLinks: THREE_D_SIDEBAR_LINKS,
  serviceSections: THREE_D_SERVICE_SECTIONS,
};

export const AI_IMMERSIVE_TECHNOLOGY = {
  hero: {
    title: "AI + Immersive Technology",
    description:
      "Integrating Artificial Intelligence into AR/VR for smarter, adaptive interactions.",
    description2:
      "Smarter Experiences. Greater Possibilities — By combining AI with AR, VR and MR, Obrive creates intelligent, adaptive and personalized experiences that understand, respond and evolve with users.",
    ctaButtons: {
      primary: "Explore AI + Immersive Tech",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: AI_WORKFLOW,
  howItWorks: AI_HOW_IT_WORKS,
  keyBenefits: AI_KEY_BENEFITS,
  sidebarLinks: AI_SIDEBAR_LINKS,
  serviceSections: AI_SERVICE_SECTIONS,
};
