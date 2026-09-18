import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

// ─── Sidebar Navigation ───────────────────────────────────────────────────────

export const AR_DEVELOPMENT_SIDEBAR_LINKS = [
  { id: "webaar-development", label: "WebAR Development" },
  { id: "mobile-ar-development", label: "Mobile AR Development" },
  { id: "enterprise-ar-solution", label: "Enterprise AR Solution" },
  { id: "industrial-ar", label: "Industrial AR" },
  { id: "ar-product-visualization", label: "AR Product Visualization" },
  { id: "ar-commerce", label: "AR Commerce" },
  { id: "ar-training-simulation", label: "AR Training & Simulation" },
  { id: "ar-remote-assistance", label: "AR Remote Assistance" },
  { id: "spatial-ar-experiences", label: "Spatial AR Experiences" },
  { id: "ai-powered-ar", label: "AI-Powered Augmented Reality" },
  { id: "3d-spatial-content", label: "3D & Spatial Content Development" },
  { id: "ar-portals", label: "AR Portals & Interactive Experiences" },
] as const;

// ─── Service Sections ─────────────────────────────────────────────────────────

export const AR_DEVELOPMENT_SERVICE_SECTIONS = [
  {
    id: "webaar-development",
    title: "WebAR Development",
    subtitle: "Bring Augmented Reality Directly to the Browser",
    description:
      "Our WebAR development services make Augmented Reality accessible through the web, allowing customers to experience interactive digital content directly from their smartphones or compatible devices without downloading a dedicated application. A simple QR code, URL or digital interaction can launch a web based Augmented Reality experience, making WebAR particularly powerful for marketing campaigns, retail, advertising, packaging, events and product experiences. Obrive develops custom WebAR solutions that allow users to place 3D products in their surroundings, explore interactive environments, access digital information and engage with brands in entirely new ways.",
    label: "We build browser based AR experiences for",
    items: [
      "Product visualization",
      "Interactive advertising",
      "QR code activated expereinces",
      "AR marketing campaigns",
      "AR packaging",
      "Virtual product demonstration",
      "Tourism and destination experiences",
      "Event and exhibitions",
      "Interactive catalogs",
      "Brand activations",
      "Retail experience",
    ],
    footer:
      "Our WebAR development approach focuses on fast loading, intuitive interactions, responsive design and real world usability, helping businesses turn a simple web link into an immersive AR experience.",
  },
  {
    id: "mobile-ar-development",
    title: "Mobile AR Development",
    subtitle: "Build Immersive AR Applications for iOS and Android",
    description:
      "Our mobile AR development services transform smartphones and tablets into powerful Augmented Reality platforms. We design and develop custom AR applications for iOS and Android, creating experiences that allow users to visualize products, explore environments, interact with 3D objects, access contextual information and perform real world tasks. Whether you need a consumer-facing AR app or an enterprise grade mobile AR solution, our team can design the experience around your users, devices and business requirements.",
    label: "Mobile AR Applications for",
    items: [
      "AR product visualization",
      "AR shopping",
      "AR Navigation",
      "AR Education",
      "AR Training",
      "AR Games & Entertainment",
      "Industrial applications",
      "Field service",
      "Equipment visualization",
      "Interactive 3D experiences",
      "Location based AR",
    ],
    footer:
      "We build mobile Augmented Reality applications with an emphasis on performance, spatial tracking, usability, scalability and seamless integration with existing digital ecosystems.",
  },
  {
    id: "enterprise-ar-solution",
    title: "Enterprise AR Solution",
    subtitle: "Transform Enterprise Workflows with Augmented Reality",
    description:
      "Enterprise Augmented Reality requires more than an impressive visual experience. It requires technology that can integrate with business processes, enterprise applications, data systems and operational workflows. Obrive develops enterprise AR solutions that help organizations introduce immersive technology into everyday operations. Our solutions can connect AR experiences with enterprise software, APIs, databases, cloud platforms, AI systems and existing business applications, creating a connected AR environment rather than an isolated application.",
    label: "Organizations can use Augmented Reality for",
    items: [
      "Employee Training",
      "Digital work instructions",
      "Equipment maintenance",
      "Field services",
      "Remote assistance",
      "Quality inspection",
      "Manufacturing",
      "Product configuration",
      "Operational guidance",
      "Technical support",
      "Enterprise visualization",
      "Digital twins",
    ],
    footer:
      "We architect enterprise AR platforms with scalability, security, integration and long term maintainability in mind. From a single business unit to a globally distributed workforce, our enterprise AR development approach can be designed to scale with your organization.",
  },
  {
    id: "industrial-ar",
    title: "Industrial AR",
    subtitle: "Bring Digital Information Into the Industrial Environment",
    description:
      "Our Industrial AR solutions help manufacturers, engineers, technicians and field teams access relevant digital information while working in physical environments. Instead of constantly switching between equipment, manuals, diagrams and computer screens, workers can access contextual digital information through Augmented Reality overlays. Obrive develops industrial Augmented Reality applications for manufacturing, automotive, aerospace, engineering, energy, utilities, construction and other operational environments.",
    label: "Our solutions can support",
    items: [
      "AR maintenance",
      "Equipment inspection",
      "Assembly guidance",
      "Digital work instructions",
      "Machine visualization",
      "Quality inspection",
      "Quality control",
      "Safety procedures",
      "Remote troubleshooting",
      "Workforce training",
      "Digital twin visualization",
    ],
    footer:
      "Industrial AR can help organizations make complex information easier to access while creating more intuitive and guided workflows for employees and technicians. We design solutions around the actual physical environment, equipment, workflow and workforce, rather than treating AR as a standalone technology demonstration.",
  },
  {
    id: "ar-product-visualization",
    title: "AR Product Visualization",
    subtitle: "Let Customers See Products in Their Own World",
    description:
      "Product images and videos are powerful but Augmented Reality takes product visualization to another level. Our AR product visualization solutions allow customers to place and explore realistic 3D representations of products in their own physical environment. Customers can see how a product looks, understand its dimensions, explore features and interact with different configurations before making a purchasing decision. Obrive creates 3D product visualization and Augmented Reality experiences for retailers, manufacturers, consumer brands, automotive companies, furniture businesses, real estate organizations and other product driven businesses.",
    label: "Our AR product experiences can enable customers to",
    items: [
      "Place products in real environments",
      "View products at realistic scale",
      "Rotate and explore 3D models",
      "Configure product options",
      "Explore product features",
      "Compare variants",
      "Interact with digital components",
      "Access product information",
      "Move from visualization directly toward purchase",
    ],
    footer:
      "By combining 3D modeling, interactive visualization and AR technology, we help businesses create product experiences that are more engaging, informative and memorable.",
  },
  {
    id: "ar-commerce",
    title: "AR Commerce",
    subtitle: "Turn eCommerce Into an Immersive Shopping Experience",
    description:
      "The future of digital commerce is becoming increasingly visual, interactive and immersive. Our AR commerce solutions allow customers to interact with products digitally while connecting the experience to the physical world. From AR shopping and virtual try on to furniture placement, interactive product catalogs and 3D product visualization, Obrive helps brands create more engaging customer journeys.",
    label: "We develop",
    items: [
      "AR shopping experiences",
      "Virtual try on solutions",
      "AR furniture visualization",
      "3D product viewers",
      "Interactive product catalogs",
      "AR product configurators",
      "Digital showrooms",
      "Virtual retail experiences",
      "AR packaging",
      "Interactive retail campaigns",
      "Immersive product demonstrations",
    ],
    footer:
      "AR can help customers make more informed purchasing decisions by allowing them to experience products before committing to a purchase. Obrive combines Augmented Reality, 3D commerce, interactive design and eCommerce technology to help businesses create the next generation of digital shopping experiences.",
  },
  {
    id: "ar-training-simulation",
    title: "AR Training & Simulation",
    subtitle: "Turn Training Into an Interactive Experience",
    description:
      "Traditional training often relies on manuals, presentations and videos. Augmented Reality training introduces an interactive layer that allows people to learn by seeing, doing and interacting with digital information in the real world. Obrive develops AR training and simulation solutions for enterprises, manufacturers, healthcare organizations, educational institutions and technical teams. We can create immersive training experiences where users follow digital instructions, interact with 3D models, understand complex systems and practice procedures within realistic environments.",
    label: "We develop",
    items: [
      "Employee onboarding",
      "Equipment training",
      "Safety training",
      "Industrial training",
      "Technical training",
      "Maintenance training",
      "Assembly training",
      "Healthcare education",
      "Product training",
      "Simulation based learning",
      "Skills development",
      "Educational Augmented Reality",
    ],
    footer:
      "Our AR training solutions can incorporate 3D models, animation, voice guidance, interactive instructions, AI assistance and spatial overlays to create highly engaging learning environments.",
  },
  {
    id: "ar-remote-assistance",
    title: "AR Remote Assistance",
    subtitle: "Put Expert Knowledge Where It Is Needed",
    description:
      "When technicians or employees encounter complex problems in the field, access to expert knowledge can make the difference between a quick resolution and costly downtime. Our AR remote assistance solutions connect field teams with remote experts through visual communication and contextual digital guidance. An expert can guide a technician through a process, identify components, provide visual annotations and share instructions without necessarily being physically present.",
    label: "We develop",
    items: [
      "AR maintenance",
      "Equipment troubleshooting",
      "Industrial maintenance",
      "Technical support",
      "Engineering assistance",
      "Installation guidance",
      "Remote inspections",
      "Customer support",
      "Infrastructure maintenance",
      "Healthcare assistance",
    ],
    footer:
      "Obrive combines Augmented Reality, remote collaboration, visual communication and intelligent guidance to create remote assistance platforms designed for real world operational environments.",
  },
  {
    id: "spatial-ar-experiences",
    title: "Spatial AR Experiences",
    subtitle: "Turn Physical Spaces Into Intelligent Digital Experiences",
    description:
      "Augmented Reality is evolving from simple screen based overlays toward spatial computing and intelligent interaction with physical environments. Obrive creates spatial AR experiences that allow digital content to understand, respond to and interact with physical spaces. We design immersive experiences for retail environments, museums, exhibitions, real estate, tourism, education, entertainment, events and corporate environments.",
    label: "We develop",
    items: [
      "Museums and exhibitions",
      "Retail environments",
      "Events",
      "Tourist destinations",
      "Educational spaces",
      "Corporate environments",
      "Real estate",
      "Entertainment venues",
      "Brand activations",
      "Interactive installations",
    ],
    footer:
      "Our spatial computing solutions combine 3D environments, computer vision, spatial awareness and interactive design to create experiences that feel connected to the physical world.",
  },
  {
    id: "ai-powered-ar",
    title: "AI-Powered Augmented Reality",
    subtitle: "Make AR Intelligent, Context Aware and Responsive",
    description:
      "The next generation of Augmented Reality will not simply display information. It will understand what users are seeing, identify objects, interpret environments and provide intelligent assistance. Obrive combines Artificial Intelligence and Augmented Reality to develop intelligent AR experiences capable of responding to users and their surroundings. Our AI-powered AR solutions can incorporate computer vision, machine learning, voice interfaces, generative AI and intelligent digital assistants.",
    label: "We develop",
    items: [
      "Object recognition",
      "AI visual recognition",
      "Intelligent AR assistants",
      "AI-guided workflows",
      "Context aware information",
      "Voice controlled AR",
      "Intelligent product assistants",
      "Visual inspection",
      "AI maintenance assistance",
      "Personalized AR experiences",
      "Computer vision applications",
      "Generative AI experiences",
    ],
    footer:
      "By combining AI, computer vision and Augmented Reality, we help businesses move from static AR content toward intelligent experiences that can adapt to real world situations.",
  },
  {
    id: "3d-spatial-content",
    title: "3D & Spatial Content Development",
    subtitle: "Build the Digital Foundation Behind Your AR Experience",
    description:
      "Every successful AR experience begins with high quality digital content. Our 3D content development services create optimized digital assets that can be used across Augmented Reality, WebAR, mobile applications, spatial computing and other immersive technologies. Obrive can transform physical products, equipment, environments and concepts into interactive digital assets designed for real world applications.",
    label: "We develop",
    items: [
      "3D modeling",
      "3D product visualization",
      "AR ready 3D assets",
      "3D animation",
      "Texturing",
      "Lighting",
      "Rigging",
      "Digital twins",
      "3D configurators",
      "Interactive environments",
      "Spatial assets",
      "Real time 3D content",
    ],
    footer:
      "We optimize 3D assets for mobile devices, web browsers, AR applications, enterprise environments and emerging spatial computing platforms, balancing visual quality with performance.",
  },
  {
    id: "ar-portals",
    title: "AR Portals & Interactive Experiences",
    subtitle: "Create Gateways Between the Physical and Digital Worlds",
    description:
      "AR portals transform ordinary physical environments into gateways to immersive digital worlds. With an Augmented Reality portal, users can discover virtual environments, interactive stories, products and experiences through their physical surroundings. Obrive develops AR portals and immersive interactive experiences for brands, events, tourism, entertainment, education, retail and experiential marketing.",
    label: "We develop",
    items: [
      "Brand activations",
      "Product launches",
      "Interactive events",
      "Tourism experiences",
      "Virtual destinations",
      "Digital storytelling",
      "Retail activations",
      "Museum experiences",
      "Educational environments",
      "Experiential advertising",
      "Immersive entertainment",
      "Interactive installations",
    ],
    footer:
      "By combining 3D environments, spatial interaction, animation and Augmented Reality, we create experiences designed to make people stop, explore and interact.",
  },
] as const;

// ─── Process Steps ────────────────────────────────────────────────────────────

export const AR_DEVELOPMENT_PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover & Strategize",
    description:
      "We start by understanding your business, users, environment and objectives. We identify the right Augmented Reality use case, define the experience and establish a clear technical roadmap for your AR solution.",
  },
  {
    step: "02",
    title: "Design & Experience",
    description:
      "Our team transforms the strategy into intuitive UX/UI, 3D experiences and spatial interactions. Every element is designed around usability, engagement, performance and the way users interact with the real world.",
  },
  {
    step: "03",
    title: "Build & Integrate",
    description:
      "We develop your WebAR experience, mobile AR application, enterprise AR platform or custom Augmented Reality solution. Where required, we integrate 3D, AI, computer vision, APIs, cloud platforms and existing business systems.",
  },
  {
    step: "04",
    title: "Launch & Scale",
    description:
      "After rigorous testing across devices and real-world environments, we deploy your solution and continuously optimize it using performance insights and user feedback. Our architecture is built to evolve as your business and technology requirements grow.",
  },
] as const;


export const AR_DEVELOPMENT_HERO = {
  title: "Augmented Reality Development Services Across Industries.",
  description:
    "At Obrive Industries, we design and develop intelligent Augmented Reality solutions that connect the digital world with the physical world—helping businesses visualize products, train people, guide employees, improve operations, engage customers and create entirely new digital experiences.",
  description2: "From WebAR and mobile AR applications to enterprise AR platforms, industrial AR, AR product visualization, AR commerce, remote assistance, spatial overlays and AI-powered experiences, we build solutions around real business objectives. Don't just show your customers what's possible. Let them experience it.",
  ctaButtons: {
    primary: "Get Started with AR",
    secondary: "SCHEDULE A CONSULTATION",
  },
};

export const AR_DEVELOPMENT_WORKFLOW_STEPS_SIDEBAR = [
  "Step 1: Structure Your Spatial App Workflow",
  "Step 2: Share Interactive Previews",
  "Step 3: Automate Iteration & Launch",
  "Step 4: Approve & Integrate"
];

export const AR_DEVELOPMENT_HOW_IT_WORKS = [
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
      "Utilize a branded AR portal for secure sharing of AR projects—allowing clients and team members to view, interact, and provide feedback within a modern, intuitive interface.",
    src: IMAGES.AUGMENTED_THIRD_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Monitor Approvals",
    description:
      "Embed digital sign-off options and usage tracking within AR experiences, ensuring accountability, compliance, and seamless project handoffs.",
    src: IMAGES.AUGMENTED_FOURTH_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FOURTH_IMAGE,
  },
] as const;

export const AR_DEVELOPMENT_KEY_BENEFITS = [
  {
    title: "Overview",
    description:
      "We don't simply build AR applications. We deliver complete Augmented Reality solutions around your business objectives, your technology ecosystem and measurable results.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Business-First AR Development",
    description:
      "Technology alone does not create value. We begin with your business challenge, identify where AR can make an impact and design the experience around your users and objectives.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Built for Real-World Environments",
    description:
      "Our AR solutions are designed to work in real physical environments—not just controlled demonstrations. We consider device compatibility, lighting, spatial tracking, usability, performance and scalability from the beginning.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Immersive Experiences That Convert",
    description:
      "From product discovery to employee training, we create interactive experiences designed to capture attention, simplify complex processes and encourage meaningful interactions.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export {
  AR_DEVELOPMENT_FAQS,
  AR_DEVELOPMENT_FAQS_META,
} from "./faqs/ar-development-faqs";

