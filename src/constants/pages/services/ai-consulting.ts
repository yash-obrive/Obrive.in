import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

import type { SolutionIndustriesContent } from "@/types/services";

export const AI_CONSULTING_HERO = {
  title: "AI Consulting Services Across Industries — For the AI Era",
  description: "Obrive provides AI Consulting Services that help organizations understand where artificial intelligence can create measurable business value, what should be automated, augmented or redesigned, and how AI initiatives can move from strategy to production. In the AI era, consulting is not simply about selecting a model or adding a chatbot. It is about connecting business strategy, data, workflows, people, technology, governance and customer experience into a practical AI roadmap.",
  description2: "Our approach combines business analysis, AI opportunity discovery, data and knowledge assessment, solution architecture, AI product strategy, automation planning, generative AI, machine learning, computer vision, intelligent agents, enterprise integration and responsible AI governance. We help organizations make informed AI decisions without treating AI adoption as a technology experiment disconnected from business outcomes.",
  ctaButtons: { primary: "Explore Solutions", secondary: "SCHEDULE A DEMO" },
};

export const AI_CONSULTING_KEY_BENEFITS = [
  { title: "Turn AI Ambition Into Business Value", description: "Move from AI curiosity to a prioritized portfolio of opportunities tied to revenue, productivity, customer experience, risk, quality or operational outcomes.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Business-First AI Strategy", description: "Start with business problems, decisions, workflows and measurable outcomes before selecting models, platforms or tools.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Human-Centered AI", description: "Design AI around the people who use, supervise, challenge and benefit from intelligent systems.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Generative AI & Intelligent Knowledge", description: "Transform organizational knowledge into useful copilots, assistants, search, decision support and workflow experiences.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "AI Architecture & Integration", description: "Connect models and AI capabilities with applications, data, APIs, enterprise systems and operational workflows.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Responsible AI & Governance", description: "Build practical controls around privacy, security, accuracy, human oversight, access, evaluation and ongoing monitoring.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
];

export const AI_CONSULTING_SIDEBAR_LINKS = [
  { id: "ai-consulting-services", label: "AI Consulting Services" },
  { id: "ai-era-consulting-capabilities", label: "AI-Era Consulting Capabilities" },
  { id: "global-ai-consulting-delivery", label: "Global AI Consulting Delivery" },
  { id: "technology-platform-capabilities", label: "Technology & Platform Capabilities" },
  { id: "what-makes-an-ai-consulting-program-successful", label: "What Makes an AI Consulting Program Successful?" },
  { id: "why-choose-obrive-for-ai-consulting", label: "Why Choose Obrive for AI Consulting?" },
  { id: "business-outcomes-ai-consulting-can-support", label: "Business Outcomes AI Consulting Can Support" },
] as const;

export const AI_CONSULTING_SERVICE_SECTIONS = [
  {
    id: "ai-consulting-services",
    title: "AI Consulting Services",
    subtitle: "",
    description: "",
    label: "",
    items: [],
    subSections: [
      {
        title: "AI Strategy & Transformation Consulting",
        description: "Define an AI vision, maturity baseline, opportunity portfolio, investment priorities and phased transformation roadmap aligned with business strategy.",
      },
      {
        title: "AI Opportunity & Use-Case Discovery",
        description: "Identify high-value AI opportunities across customer journeys, operations, sales, marketing, finance, engineering, support, knowledge work and decision processes.",
      },
      {
        title: "AI Readiness & Maturity Assessment",
        description: "Assess data, technology, people, processes, governance, skills and organizational readiness to determine what can realistically be implemented.",
      },
      {
        title: "Generative AI Consulting",
        description: "Identify practical uses for large language models and generative AI across content, knowledge, support, research, software, internal productivity and customer experiences.",
      },
      {
        title: "AI Agent & Copilot Strategy",
        description: "Design agentic and copilot opportunities with clear roles, permissions, tools, human checkpoints, evaluation criteria and escalation paths.",
      },
      {
        title: "Enterprise AI & Knowledge Consulting",
        description: "Plan AI-powered enterprise search, knowledge assistants, document intelligence, retrieval systems and governed access to organizational information.",
      },
      {
        title: "AI Automation & Intelligent Workflow Consulting",
        description: "Redesign repetitive and decision-heavy workflows using AI, automation, APIs and human-in-the-loop processes.",
      },
      {
        title: "Machine Learning & Predictive AI Consulting",
        description: "Evaluate predictive, classification, recommendation, forecasting, anomaly detection and optimization opportunities where machine learning is appropriate.",
      },
      {
        title: "Computer Vision & Intelligent Perception Consulting",
        description: "Assess visual inspection, object recognition, document understanding, spatial perception and image/video intelligence use cases.",
      },
      {
        title: "AI Product Strategy & AI-Native Product Consulting",
        description: "Shape AI-enabled digital products, feature roadmaps, user experiences, model interactions, evaluation plans and commercialization paths.",
      },
      {
        title: "AI Data & Knowledge Architecture",
        description: "Assess data sources, knowledge structures, retrieval patterns, metadata, permissions and pipelines needed to support reliable AI experiences.",
      },
      {
        title: "AI Solution Architecture & Technology Selection",
        description: "Translate business requirements into model, platform, application, integration, infrastructure and deployment choices without forcing every problem into one technology stack.",
      },
      {
        title: "AI Governance, Risk & Responsible AI",
        description: "Establish practical policies, controls, evaluation, documentation, human oversight, privacy and security practices for responsible AI adoption.",
      },
      {
        title: "AI Proof of Concept & Pilot Advisory",
        description: "Define pilot scope, success criteria, technical assumptions, evaluation methods and scale-up decisions so experimentation can produce evidence for investment.",
      },
    ],
    footer: "",
  },
  {
    id: "ai-era-consulting-capabilities",
    title: "AI-Era Consulting Capabilities",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "AI opportunity mapping based on business value and feasibility",
      "Generative AI and large-language-model strategy",
      "Agentic AI, copilots and workflow orchestration",
      "Enterprise knowledge and retrieval strategy",
      "Data, knowledge and integration readiness",
      "AI product and customer-experience strategy",
      "Machine learning and predictive use-case assessment",
      "Computer vision and intelligent document processing",
      "AI automation and human-in-the-loop workflows",
      "Model evaluation, quality measurement and observability",
      "Responsible AI, privacy, security and governance",
      "Pilot design, experimentation and scale-up planning",
      "AI operating-model, skills and adoption planning",
      "AI portfolio prioritization and investment roadmaps",
    ],
    footer: "",
  },
  {
    id: "global-ai-consulting-delivery",
    title: "Global AI Consulting Delivery",
    subtitle: "",
    description: "Obrive can support local, national and international organizations with AI strategy, discovery, architecture and implementation advisory across distributed teams, multiple business units, regional requirements and different levels of AI maturity. Engagements can be structured around a focused use case, enterprise AI roadmap, transformation program or AI-enabled digital product.",
    label: "",
    items: [],
    footer: "",
  },
  {
    id: "technology-platform-capabilities",
    title: "Technology & Platform Capabilities",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "Generative AI and foundation-model ecosystems",
      "Machine learning and predictive AI",
      "AI agents, copilots and orchestration",
      "Retrieval-augmented generation and enterprise knowledge systems",
      "Vector search, semantic retrieval and knowledge architectures",
      "Cloud AI platforms and scalable infrastructure",
      "Data platforms, pipelines and analytics",
      "APIs, microservices and enterprise integrations",
      "Web applications, mobile applications and SaaS platforms",
      "CMS, eCommerce and customer platforms",
      "Computer vision and document intelligence",
      "Automation and workflow platforms",
      "Monitoring, evaluation, testing and observability",
      "Security, access control, privacy and governance",
    ],
    footer: "",
  },
  {
    id: "what-makes-an-ai-consulting-program-successful",
    title: "What Makes an AI Consulting Program Successful?",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "Clear business objectives and measurable outcomes",
      "Use-case selection based on value rather than AI novelty",
      "Reliable and permission-aware data and knowledge",
      "Strong understanding of existing workflows and systems",
      "Human oversight for consequential decisions",
      "Practical model and technology selection",
      "Evaluation criteria defined before deployment",
      "Security, privacy and responsible AI controls",
      "User adoption and change-management planning",
      "Integration with existing digital products and operations",
      "Executive ownership and cross-functional alignment",
      "Continuous monitoring and improvement",
    ],
    footer: "",
  },
  {
    id: "why-choose-obrive-for-ai-consulting",
    title: "Why Choose Obrive for AI Consulting?",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "Business-first AI strategy rather than technology-first experimentation",
      "AI consulting connected with websites, web apps, SaaS, mobile and digital products",
      "Generative AI, intelligent automation and enterprise knowledge expertise",
      "AI + spatial computing and computer-vision perspective where relevant",
      "Human-centered AI product and UX thinking",
      "Technical architecture and integration capability",
      "SEO, AEO and GEO expertise for AI-era discovery and knowledge experiences",
      "Pilot-to-production mindset",
      "Industry-specific strategy and use-case mapping",
      "Responsible AI, privacy and governance considerations built into planning",
      "Global and India-focused delivery",
      "Analytics-led measurement and continuous optimization",
    ],
    footer: "",
  },
  {
    id: "business-outcomes-ai-consulting-can-support",
    title: "Business Outcomes AI Consulting Can Support",
    subtitle: "",
    description: "The AI era rewards organizations that can distinguish meaningful opportunities from technology noise. Obrive helps turn AI ambition into a connected business capability—linking strategy, data, knowledge, people, workflows, technology, product experience and governance. The objective is not to add AI everywhere; it is to identify where intelligence can create durable value and build the foundations to scale it responsibly.",
    label: "",
    items: [
      "Prioritized AI investment roadmap",
      "Reduced experimentation without a clear business case",
      "Faster identification of high-value AI opportunities",
      "Improved operational productivity",
      "Better customer and employee experiences",
      "Improved access to organizational knowledge",
      "More intelligent digital products and services",
      "Better decision support and forecasting",
      "Reduced manual and repetitive work",
      "Stronger AI governance and readiness",
      "Clearer pilot and scale-up decisions",
      "Long-term AI transformation capability",
      "From AI Experimentation to AI Transformation",
    ],
    footer: "",
  },
];

export const AI_CONSULTING_PROCESS_STEPS = [
  { step: "01", title: "Discover", description: "Understand business strategy, users, workflows, systems, constraints and desired outcomes." },
  { step: "02", title: "Assess", description: "Evaluate AI maturity, data readiness, technical foundations, risks and organizational capability." },
  { step: "03", title: "Identify", description: "Map AI opportunities and distinguish automation, augmentation, prediction, generation and decision-support use cases." },
  { step: "04", title: "Prioritize", description: "Score opportunities by business value, feasibility, risk, data readiness, adoption and time to value." },
  { step: "05", title: "Define", description: "Establish the target use case, users, requirements, success measures and operating assumptions." },
  { step: "06", title: "Architect", description: "Design the AI, data, application, integration, security and governance architecture." },
  { step: "07", title: "Validate", description: "Define a proof of concept or pilot with evaluation criteria and human review." },
  { step: "08", title: "Pilot", description: "Test the solution in a controlled environment and measure technical and business performance." },
  { step: "09", title: "Scale", description: "Prepare production architecture, workflows, adoption, governance and operational ownership." },
  { step: "10", title: "Optimize", description: "Continuously improve models, prompts, knowledge, workflows, evaluation and business outcomes." },
];

export const AI_CONSULTING_INDUSTRIES = [
  {
    id: "automotive-mobility",
    title: "Automotive & Mobility",
    description: "AI for vehicle intelligence, manufacturing, quality, predictive maintenance, mobility operations, customer experience and intelligent service workflows.",
  },
  {
    id: "manufacturing-industrial-engineering",
    title: "Manufacturing & Industrial Engineering",
    description: "AI opportunity mapping across production, quality, maintenance, engineering knowledge, supply chain, safety and operational decision support.",
  },
  {
    id: "healthcare-medical",
    title: "Healthcare & Medical",
    description: "AI strategy for clinical-adjacent workflows, patient experience, documentation, knowledge access, operations and decision support with appropriate human oversight.",
  },
  {
    id: "pharmaceuticals-life-sciences",
    title: "Pharmaceuticals & Life Sciences",
    description: "AI opportunities across research, documentation, knowledge management, quality, operations and commercial intelligence with strong governance.",
  },
  {
    id: "retail-ecommerce",
    title: "Retail & eCommerce",
    description: "AI for personalization, product discovery, customer service, merchandising, demand intelligence, content operations and conversion journeys.",
  },
  {
    id: "consumer-goods-brands",
    title: "Consumer Goods & Brands",
    description: "AI strategy across marketing, consumer insights, product knowledge, demand planning, customer engagement and brand operations.",
  },
  {
    id: "real-estate-property",
    title: "Real Estate & Property",
    description: "AI for property intelligence, lead qualification, document analysis, customer engagement, asset operations and portfolio decision support.",
  },
  {
    id: "architecture-engineering-construction",
    title: "Architecture, Engineering & Construction",
    description: "AI for project knowledge, documentation, design workflows, estimation, compliance support, field intelligence and operational coordination.",
  },
  {
    id: "education-edtech",
    title: "Education & EdTech",
    description: "AI for learning support, content intelligence, knowledge access, personalization, administration and learner engagement with appropriate safeguards.",
  },
  {
    id: "energy-utilities-infrastructure",
    title: "Energy, Utilities & Infrastructure",
    description: "AI consulting for asset intelligence, predictive maintenance, operations, customer service, planning, knowledge systems and infrastructure decision support.",
  },
  {
    id: "oil-gas",
    title: "Oil & Gas",
    description: "AI opportunities across engineering knowledge, asset performance, maintenance, safety, documentation, operations and technical decision support.",
  },
  {
    id: "mining-natural-resources",
    title: "Mining & Natural Resources",
    description: "AI for equipment intelligence, operational analytics, safety, document knowledge, planning, maintenance and resource workflows.",
  },
  {
    id: "aerospace-aviation",
    title: "Aerospace & Aviation",
    description: "AI strategy for engineering knowledge, maintenance, operations, customer support, documentation and high-assurance workflows.",
  },
  {
    id: "logistics-warehousing-supply-chain",
    title: "Logistics, Warehousing & Supply Chain",
    description: "AI for demand forecasting, route and inventory intelligence, warehouse operations, document processing, customer service and exception management.",
  },
  {
    id: "travel-tourism-hospitality",
    title: "Travel, Tourism & Hospitality",
    description: "AI for customer assistance, itinerary intelligence, personalization, operations, knowledge management and service workflows.",
  },
  {
    id: "media-entertainment-gaming",
    title: "Media, Entertainment & Gaming",
    description: "AI for content intelligence, audience understanding, personalization, production workflows, discovery and interactive experiences.",
  },
  {
    id: "sports-fitness",
    title: "Sports & Fitness",
    description: "AI for fan engagement, content, operations, personalization, performance analytics and intelligent customer experiences.",
  },
  {
    id: "banking-financial-services-insurance",
    title: "Banking, Financial Services & Insurance",
    description: "AI for knowledge access, document intelligence, service operations, risk workflows, customer support and analytics with rigorous governance.",
  },
  {
    id: "telecommunications",
    title: "Telecommunications",
    description: "AI for network operations, support, enterprise services, knowledge systems, customer experience and operational intelligence.",
  },
  {
    id: "agriculture-agritech",
    title: "Agriculture & AgriTech",
    description: "AI for crop intelligence, equipment, forecasting, field operations, advisory systems, supply chains and practical decision support.",
  },
  {
    id: "government-public-sector",
    title: "Government & Public Sector",
    description: "AI strategy for citizen information, document workflows, knowledge access, service operations and administrative efficiency with transparency and oversight.",
  },
  {
    id: "corporate-learning-professional-services",
    title: "Corporate Learning & Professional Services",
    description: "AI for enterprise knowledge, research, training, consulting workflows, document intelligence, proposal support and productivity.",
  },
];

export const AI_CONSULTING_INDUSTRIES_CONTENT: SolutionIndustriesContent = {
  slug: "ai-consulting",
  hero: {
    title: "AI Consulting Across Industries — AI-Era Industry Solutions",
    description: "AI adoption is not one-size-fits-all. Every industry has different data environments, regulations, workflows, customer expectations, operational risks and definitions of value. Obrive's AI Consulting approach maps artificial intelligence to those realities, helping organizations identify useful AI opportunities and design practical paths from strategy to implementation. Across industries, the focus is on making AI useful, explainable, secure and connected to real business processes—not adding AI terminology to every service or workflow.",
  },
  industries: AI_CONSULTING_INDUSTRIES,
  extraBlocks: [
    {
      id: "ai-era-consulting-across-industries",
      title: "AI-Era Consulting Across Industries",
      subtitle: "",
      description: "",
      label: "",
      items: ["Industry-specific AI opportunity discovery", "Conversational and natural-language AI use cases", "Generative AI and enterprise knowledge systems", "AI agents and copilots with controlled permissions", "Entity-aware and knowledge-driven AI architecture", "AI-assisted document and information discovery", "Workflow automation and human-in-the-loop design", "AI product and customer-experience strategy", "Predictive analytics and decision support", "Computer vision and intelligent document processing", "AI-assisted analytics and opportunity identification", "Human review for consequential information", "Transparent treatment of uncertainty and limitations", "Privacy-aware AI workflows and governance", "Evaluation, monitoring and continuous optimization"],
      footer: "AI should be applied according to each industry's users, data permissions, business rules and risk. AI-era consulting means finding meaningful applications for intelligence and building trustworthy systems—not simply adding AI features for their own sake.",
    },
  ],
  globalDelivery: {
    title: "Global AI Consulting Delivery",
    subtitle: "",
    description: "Obrive supports local, national and international organizations, including multilingual environments, regional operating requirements, distributed teams, multiple business units and scalable AI governance. Consulting can begin with one business unit or use case and expand into an enterprise AI portfolio.",
    items: [],
  },
  technologyCapabilities: {
    title: "Technology & Platform Capabilities",
    subtitle: "",
    items: ["Generative AI and foundation models", "AI agents, copilots and orchestration", "Machine learning and predictive systems", "Retrieval-augmented generation and enterprise search", "Vector databases and semantic retrieval", "Knowledge graphs and structured knowledge where appropriate", "Data platforms and analytics", "Cloud AI infrastructure", "APIs and enterprise integrations", "Web, mobile and SaaS applications", "Computer vision and document intelligence", "Workflow automation", "AI evaluation and observability", "Security, access controls and governance"],
  },
  footerText: "Our industry solutions are not limited to these sectors. Obrive can adapt AI consulting to specialized terminology, regulations, data permissions, technical documentation, product catalogs, customer journeys, operating models, geographic markets and emerging business models.",
};
