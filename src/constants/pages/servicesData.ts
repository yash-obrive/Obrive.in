export interface ServiceItem {
  title: string;
  shortDescription: string;
  description: string;
  href?: string;
}

export interface ServiceCategory {
  id: string;
  category: string;
  heading: string;
  description: string;
  items: ServiceItem[];
}

export const MAIN_SERVICES_HERO = {
  title: "POWERING DIGITAL TRANSFORMATION WITH IMMERSIVE TECHNOLOGY",
  description:
    "From strategy to software, spatial experiences to intelligent digital platforms — Obrive helps businesses design, build and scale the technologies of tomorrow.",
};

export const SERVICES_CATEGORIES: ServiceCategory[] = [
  {
    id: "strategy-consulting",
    category: "STRATEGY & CONSULTING",
    heading: "Define the Opportunity Before You Build It",
    description:
      "Obrive helps organizations identify opportunities, evaluate emerging technologies and create practical strategies that turn ideas into scalable digital initiatives.",
    items: [
      {
        title: "DIGITAL TRANSFORMATION STRATEGY",
        shortDescription: "Turn technology into a business transformation roadmap.",
        description: "We help organizations identify opportunities to modernize operations, customer experiences, products and business processes through digital technologies.",
      },
      {
        title: "SPATIAL COMPUTING STRATEGY",
        shortDescription: "Discover where spatial technology can create real business value.",
        description: "We identify opportunities to apply AR, VR, MR, 3D, computer vision and spatial computing to real-world business challenges.",
      },
      {
        title: "AI STRATEGY",
        shortDescription: "Identify where intelligence can transform your business.",
        description: "We help organizations identify practical AI opportunities across products, operations, customer experiences, automation and decision-making.",
        href: "/services/ai-consulting",
      },
      {
        title: "PRODUCT STRATEGY",
        shortDescription: "Turn an idea into a product with direction.",
        description: "We define product vision, target users, value propositions, feature priorities, technology requirements and development roadmaps.",
      },
      {
        title: "TECHNOLOGY CONSULTING",
        shortDescription: "Make confident technology decisions.",
        description: "We evaluate technologies, platforms, architectures and development approaches to help organizations select solutions aligned with their objectives, budget and scalability requirements.",
      },
      {
        title: "INNOVATION CONSULTING",
        shortDescription: "Turn emerging technology into actionable opportunities.",
        description: "We explore emerging technologies and identify practical applications that can create new products, experiences, operational efficiencies and business models.",
      },
      {
        title: "DIGITAL EXPERIENCE STRATEGY",
        shortDescription: "Design the complete experience, not just the interface.",
        description: "We connect business objectives, customer journeys, technology and experience design to create a unified digital experience strategy.",
      },
      {
        title: "TECHNOLOGY ROADMAPS",
        shortDescription: "Know what to build, when to build it and why.",
        description: "We translate business objectives into phased technology roadmaps covering priorities, architecture, products, platforms, integrations and future capabilities.",
      },
    ],
  },
  {
    id: "immersive-technology",
    category: "IMMERSIVE TECHNOLOGY",
    heading: "Turn Physical Experiences Into Digital Possibilities",
    description:
      "Our immersive technology services help organizations move beyond traditional screens and create experiences that are interactive, contextual, spatial and intelligent.",
    items: [
      {
        title: "AUGMENTED REALITY",
        shortDescription: "Bring digital experiences into the real world.",
        description: "We create AR experiences that allow users to visualize, interact with and access digital information within their physical surroundings.",
        href: "/services/augmented-reality-development",
      },
      {
        title: "VIRTUAL REALITY",
        shortDescription: "Create experiences beyond the physical world.",
        description: "We develop immersive VR environments for training, simulation, education, visualization, collaboration and engagement.",
        href: "/services/virtual-reality-development",
      },
      {
        title: "MIXED REALITY",
        shortDescription: "Connect digital intelligence with physical environments.",
        description: "We combine physical and digital environments to create interactive MR experiences for enterprise, training, visualization and collaboration.",
        href: "/services/mixed-reality-development",
      },
      {
        title: "SPATIAL COMPUTING",
        shortDescription: "Build experiences that understand space.",
        description: "We create applications that understand space, objects, movement, location and context to enable more natural digital interactions.",
        href: "/services/spatial-computing-app-development",
      },
      {
        title: "WEBXR",
        shortDescription: "Bring immersive experiences directly to the browser.",
        description: "We develop browser-based XR experiences that allow users to access interactive 3D, AR and VR experiences without traditional application barriers.",
      },
      {
        title: "AR NAVIGATION",
        shortDescription: "Make complex environments easier to navigate.",
        description: "We create spatial navigation systems that provide contextual directions and digital guidance across physical environments.",
      },
      {
        title: "ENTERPRISE XR",
        shortDescription: "Bring immersive technology into everyday business operations.",
        description: "We develop XR solutions for training, collaboration, visualization, maintenance, customer engagement and operational workflows.",
      },
      {
        title: "IMMERSIVE TRAINING",
        shortDescription: "Transform learning into experience.",
        description: "We build immersive training environments that allow users to practice processes, procedures and scenarios in realistic digital environments.",
      },
      {
        title: "SPATIAL INTERFACES",
        shortDescription: "Create interfaces designed for three-dimensional interaction.",
        description: "We design spatial UX/UI systems for AR, VR, MR and spatial computing environments.",
      },
      {
        title: "REMOTE ASSISTANCE",
        shortDescription: "Connect experts with people wherever they work.",
        description: "We create immersive remote assistance solutions using AR, spatial annotations, live collaboration and contextual information.",
      },
    ],
  },
  {
    id: "3d-design-development",
    category: "3D DESIGN & DEVELOPMENT",
    heading: "Build the Digital Assets Behind the Experience",
    description:
      "We transform products, environments, buildings and ideas into high-quality 3D assets that can power immersive experiences, digital products and intelligent platforms.",
    items: [
      {
        title: "3D PRODUCT MODELLING",
        shortDescription: "Transform physical products into digital assets.",
        description: "We create accurate, optimized 3D product models for AR, VR, visualization, eCommerce, configurators and digital experiences.",
        href: "/services/3d-design-development",
      },
      {
        title: "3D ARCHITECTURAL VISUALIZATION",
        shortDescription: "Experience spaces before they exist.",
        description: "We transform architectural concepts into realistic and interactive digital environments for visualization, marketing and design review.",
      },
      {
        title: "3D ENVIRONMENT DESIGN",
        shortDescription: "Build digital worlds around real-world experiences.",
        description: "We create interactive 3D environments for immersive applications, simulations, virtual experiences and digital platforms.",
      },
      {
        title: "3D ANIMATION",
        shortDescription: "Make products, ideas and processes move.",
        description: "We use 3D animation to communicate complex concepts, demonstrate products and create engaging visual stories.",
      },
      {
        title: "3D CONFIGURATORS",
        shortDescription: "Let customers design before they buy.",
        description: "We create interactive configurators that allow users to customize products, materials, colours, components and specifications in real time.",
      },
      {
        title: "DIGITAL TWINS",
        shortDescription: "Create digital representations of the physical world.",
        description: "We connect physical assets, environments and operational data through interactive digital twin platforms.",
      },
      {
        title: "INTERACTIVE 3D",
        shortDescription: "Turn static content into interactive experiences.",
        description: "We develop browser-based and application-based 3D experiences that allow users to explore products, environments and information.",
      },
      {
        title: "REAL-TIME 3D",
        shortDescription: "Build experiences that respond in real time.",
        description: "We develop high-performance 3D applications for visualization, simulation, product experiences, digital twins and spatial environments.",
      },
      {
        title: "AR-READY 3D ASSETS",
        shortDescription: "Create 3D content optimized for augmented experiences.",
        description: "We optimize models, textures, materials and interactions for mobile AR, WebAR and spatial platforms.",
      },
      {
        title: "VR ENVIRONMENTS",
        shortDescription: "Create immersive worlds for exploration and training.",
        description: "We design optimized virtual environments for simulations, training, visualization, collaboration and immersive experiences.",
      },
      {
        title: "PRODUCT VISUALIZATION",
        shortDescription: "Show products before they exist.",
        description: "We create photorealistic and interactive digital representations that help businesses visualize, market and sell products.",
      },
      {
        title: "SIMULATION ENVIRONMENTS",
        shortDescription: "Test and train without reproducing the physical world.",
        description: "We build immersive simulation environments for training, safety, operations, engineering and scenario-based learning.",
      },
      {
        title: "SPATIAL ASSETS",
        shortDescription: "Build the digital building blocks of spatial computing.",
        description: "We create optimized 3D assets designed for AR, VR, MR and spatial environments.",
      },
      {
        title: "VIRTUAL SHOWROOMS",
        shortDescription: "Transform product discovery into an experience.",
        description: "We create immersive virtual showrooms where customers can explore, customize and experience products digitally.",
      },
    ],
  },
  {
    id: "ai-intelligent-technology",
    category: "AI & INTELLIGENT TECHNOLOGY",
    heading: "Make Digital Experiences More Intelligent",
    description:
      "We combine AI, computer vision, automation and emerging technologies to build systems that understand information, recognize environments and respond intelligently.",
    items: [
      {
        title: "AI APPLICATION DEVELOPMENT",
        shortDescription: "Turn artificial intelligence into practical products.",
        description: "We develop AI-powered applications designed around specific business workflows, users and objectives.",
      },
      {
        title: "GENERATIVE AI",
        shortDescription: "Create intelligent systems that understand and generate information.",
        description: "We integrate generative AI into applications, knowledge systems, content workflows and customer experiences.",
      },
      {
        title: "AI AGENTS",
        shortDescription: "Build AI systems that can do more than answer questions.",
        description: "We develop intelligent agents capable of interacting with tools, information and workflows to assist users and automate tasks.",
      },
      {
        title: "COMPUTER VISION",
        shortDescription: "Help technology understand the physical world.",
        description: "We build computer vision systems capable of recognizing objects, environments, visual patterns and physical interactions.",
      },
      {
        title: "AI-POWERED AR",
        shortDescription: "Combine intelligence with augmented reality.",
        description: "We integrate AI and AR to create contextual experiences that can recognize environments, identify objects and deliver relevant information.",
      },
      {
        title: "AI ASSISTANTS",
        shortDescription: "Create intelligent interfaces for your customers and teams.",
        description: "We develop AI assistants that can understand natural language, retrieve information and support business workflows.",
      },
      {
        title: "AI AUTOMATION",
        shortDescription: "Automate repetitive work with intelligent systems.",
        description: "We identify and automate operational workflows using AI, APIs, data and intelligent decision systems.",
      },
      {
        title: "PREDICTIVE INTELLIGENCE",
        shortDescription: "Turn data into forward-looking insights.",
        description: "We develop intelligent systems that analyze patterns, trends and historical information to support better business decisions.",
      },
      {
        title: "AI + DIGITAL TWINS",
        shortDescription: "Bring intelligence into digital representations of the physical world.",
        description: "We combine AI, 3D and real-world data to create intelligent digital twins for monitoring, simulation and optimization.",
      },
      {
        title: "INTELLIGENT SEARCH",
        shortDescription: "Help users find the right information faster.",
        description: "We create intelligent search and knowledge systems that understand context rather than relying only on traditional keyword matching.",
      },
    ],
  },
  {
    id: "digital-product-development",
    category: "DIGITAL PRODUCT DEVELOPMENT",
    heading: "From Idea to Production-Ready Product",
    description:
      "We design and develop digital products from concept and MVP through deployment, optimization and scale.",
    items: [
      {
        title: "WEB APPLICATION DEVELOPMENT",
        shortDescription: "Build scalable digital platforms for the web.",
        description: "We create high-performance web applications tailored to specific business workflows and user requirements.",
        href: "/services/web-app-saas-mvp-development",
      },
      {
        title: "MOBILE APP DEVELOPMENT",
        shortDescription: "Create connected experiences for iOS and Android.",
        description: "We develop mobile applications that connect users, products, services and digital ecosystems.",
        href: "/services/mobile-app-development",
      },
      {
        title: "SAAS DEVELOPMENT",
        shortDescription: "Build software designed for recurring growth.",
        description: "We create scalable SaaS platforms with multi-user architecture, subscriptions, dashboards, integrations and cloud infrastructure.",
        href: "/services/web-app-saas-mvp-development",
      },
      {
        title: "MVP DEVELOPMENT",
        shortDescription: "Validate your idea with a working product.",
        description: "We transform product concepts into functional MVPs designed for testing, validation and market entry.",
        href: "/services/web-app-saas-mvp-development",
      },
      {
        title: "ENTERPRISE SOFTWARE",
        shortDescription: "Build software around the way your organization works.",
        description: "We develop customized enterprise platforms that integrate workflows, users, data and existing systems.",
      },
      {
        title: "API DEVELOPMENT",
        shortDescription: "Connect your digital ecosystem.",
        description: "We design secure APIs that allow applications, platforms, AI systems and third-party services to communicate efficiently.",
      },
      {
        title: "SYSTEM INTEGRATION",
        shortDescription: "Make your technology work together.",
        description: "We connect software, databases, APIs, cloud services, AI systems, IoT devices and third-party platforms.",
      },
      {
        title: "CLOUD APPLICATIONS",
        shortDescription: "Build technology that can scale with your business.",
        description: "We develop cloud-based applications and infrastructure designed for reliability, performance and future growth.",
      },
      {
        title: "PRODUCT MODERNIZATION",
        shortDescription: "Transform legacy technology into modern platforms.",
        description: "We help organizations modernize outdated applications, architectures and technology systems.",
      },
      {
        title: "DEDICATED DEVELOPMENT TEAMS",
        shortDescription: "Extend your engineering capabilities.",
        description: "We provide specialized development teams for ongoing product development, technology initiatives and long-term engineering requirements.",
      },
    ],
  },
  {
    id: "digital-experience",
    category: "DIGITAL EXPERIENCE",
    heading: "Design Digital Experiences People Remember",
    description:
      "We combine strategy, UX, visual design and technology to create digital experiences that are intuitive, engaging and aligned with business objectives.",
    items: [
      {
        title: "UX/UI DESIGN",
        shortDescription: "Design experiences around real user behaviour.",
        description: "We create intuitive interfaces that balance usability, visual identity, functionality and business objectives.",
        href: "/services/mobile-app-design-service",
      },
      {
        title: "SPATIAL UX/UI",
        shortDescription: "Design interfaces for three-dimensional environments.",
        description: "We create interaction systems specifically for AR, VR, MR and spatial computing experiences.",
      },
      {
        title: "WEBSITE DESIGN",
        shortDescription: "Turn your website into a powerful digital experience.",
        description: "We design premium websites that communicate your brand, products and value proposition clearly.",
        href: "/services/website-design-service",
      },
      {
        title: "WEBSITE DEVELOPMENT",
        shortDescription: "Build fast, scalable digital experiences.",
        description: "We develop modern websites optimized for performance, responsiveness, accessibility and search visibility.",
        href: "/services/website-development-service",
      },
      {
        title: "eCOMMERCE EXPERIENCE",
        shortDescription: "Make discovering and buying products easier.",
        description: "We design digital commerce experiences focused on product discovery, engagement, conversion and customer retention.",
      },
      {
        title: "INTERACTIVE EXPERIENCE DESIGN",
        shortDescription: "Make digital interactions more engaging.",
        description: "We combine animation, interaction, 3D and technology to create memorable digital experiences.",
      },
      {
        title: "DIGITAL BRAND EXPERIENCES",
        shortDescription: "Translate your brand into every digital interaction.",
        description: "We create connected brand experiences across websites, applications, immersive platforms and digital products.",
      },
      {
        title: "DESIGN SYSTEMS",
        shortDescription: "Create consistency across your digital ecosystem.",
        description: "We develop reusable design systems that improve consistency, scalability and efficiency across digital products.",
      },
      {
        title: "CONVERSION EXPERIENCE DESIGN",
        shortDescription: "Turn digital attention into meaningful action.",
        description: "We optimize user journeys, interfaces and content around measurable business goals.",
      },
    ],
  },
  {
    id: "search-content-digital-growth",
    category: "SEARCH, CONTENT & DIGITAL GROWTH",
    heading: "Be Discoverable. Be Understandable. Be Chosen.",
    description:
      "We help businesses build digital ecosystems that can be discovered across this changing landscape.",
    items: [
      {
        title: "SEARCH ENGINE OPTIMIZATION — SEO",
        shortDescription: "Build sustainable visibility across search engines.",
        description: "We optimize websites, technical architecture, content and authority to improve organic discovery.",
        href: "/services/seo-service",
      },
      {
        title: "ANSWER ENGINE OPTIMIZATION — AEO",
        shortDescription: "Make your content useful for answer-driven search.",
        description: "We structure content and information so it can better serve users looking for direct answers through modern search experiences.",
        href: "/services/aeo-service",
      },
      {
        title: "GENERATIVE ENGINE OPTIMIZATION — GEO",
        shortDescription: "Prepare your brand for AI-powered discovery.",
        description: "We optimize digital information and content ecosystems for emerging generative search and AI discovery environments.",
        href: "/services/geo-service",
      },
      {
        title: "AI SEARCH OPTIMIZATION",
        shortDescription: "Adapt your digital presence to the next generation of search.",
        description: "We help brands structure their content, entities and digital information for AI-driven discovery.",
      },
      {
        title: "CONTENT STRATEGY",
        shortDescription: "Create content with a purpose.",
        description: "We build content strategies connecting business objectives, customer journeys, search visibility and brand authority.",
      },
      {
        title: "CONTENT MARKETING",
        shortDescription: "Turn expertise into digital influence.",
        description: "We create educational, strategic and commercial content designed to engage audiences and support growth.",
        href: "/services/content-marketing-service",
      },
      {
        title: "DIGITAL MARKETING",
        shortDescription: "Connect your channels into one growth ecosystem.",
        description: "We combine content, search, campaigns, social platforms and digital experiences into integrated growth strategies.",
      },
      {
        title: "LOCAL & GLOBAL SEO",
        shortDescription: "Build visibility wherever your customers search.",
        description: "We develop location-specific and international search strategies for businesses operating across markets.",
      },
      {
        title: "TECHNICAL SEO",
        shortDescription: "Build a stronger technical foundation for discovery.",
        description: "We optimize website architecture, performance, indexing, structured data, internal linking and technical search signals.",
      },
      {
        title: "SEO CONTENT DEVELOPMENT",
        shortDescription: "Create content search engines and people can understand.",
        description: "We develop structured content around search intent, expertise, authority and customer needs.",
      },
    ],
  },
  {
    id: "white-label-technology-partnerships",
    category: "WHITE-LABEL & TECHNOLOGY PARTNERSHIPS",
    heading: "Extend Your Capabilities With Obrive",
    description:
      "We partner with agencies, consultants, technology companies and businesses that need additional design, development and emerging technology capabilities.",
    items: [
      {
        title: "WHITE-LABEL DEVELOPMENT",
        shortDescription: "Deliver more technology services under your own brand.",
        description: "Our teams work behind the scenes to help agencies and technology partners deliver projects under their own brand.",
        href: "/partners",
      },
      {
        title: "AR/VR DEVELOPMENT PARTNERSHIPS",
        shortDescription: "Add immersive technology to your service portfolio.",
        description: "Extend your capabilities with Obrive's AR, VR, MR and spatial computing expertise.",
      },
      {
        title: "3D PRODUCTION PARTNERSHIPS",
        shortDescription: "Scale your 3D content capabilities.",
        description: "Access specialized 3D modelling, visualization, animation and digital asset production capabilities.",
      },
      {
        title: "AI DEVELOPMENT PARTNERSHIPS",
        shortDescription: "Add AI capabilities to your client solutions.",
        description: "Work with our AI and engineering teams to integrate intelligent technology into your products and services.",
      },
      {
        title: "DEDICATED TECHNOLOGY TEAMS",
        shortDescription: "Extend your team without building everything in-house.",
        description: "Access specialized developers, designers, 3D artists and technology professionals for ongoing initiatives.",
      },
      {
        title: "PRODUCT DEVELOPMENT PARTNERSHIPS",
        shortDescription: "Build products together from concept to scale.",
        description: "Collaborate with Obrive across product strategy, design, engineering, technology integration and deployment.",
      },
      {
        title: "TECHNOLOGY CO-DEVELOPMENT",
        shortDescription: "Combine capabilities to build something new.",
        description: "Partner with Obrive to develop new platforms, products, solutions and technology ventures.",
      },
      {
        title: "AGENCY TECHNOLOGY PARTNERSHIPS",
        shortDescription: "Give your agency deeper technology capabilities.",
        description: "We provide the technology execution layer behind agencies that want to offer advanced digital, immersive, AI and software solutions without building every capability internally.",
      },
    ],
  },
];
