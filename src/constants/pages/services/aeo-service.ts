import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

import type { SolutionIndustriesContent } from "@/types/services";

export const AEO_SERVICE_HERO = {
  title: "Answer Engine Optimization (AEO) Services Across Industries — For the AI Era",
  description: "Obrive's Answer Engine Optimization services help organizations structure, clarify and strengthen their digital information for an AI-era discovery environment where users increasingly ask complete questions and receive direct answers through search engines, answer engines and conversational AI interfaces. Our AEO approach combines search intent research, conversational content, technical SEO, entity and knowledge architecture, structured information, internal linking, topical authority, analytics and AI-era content strategy. The goal is to make important business information easier to find, understand and evaluate—not to chase a particular algorithm.",
  description2: "From service and product answers to FAQs, knowledge hubs, local information, eCommerce discovery, enterprise content and AI-ready websites, Obrive builds answer ecosystems around real customer questions and business outcomes. AEO complements SEO. Strong technical foundations, useful content, trustworthy source information, accessibility and clear user journeys remain essential in the AI era.",
  ctaButtons: { primary: "Explore Solutions", secondary: "SCHEDULE A DEMO" },
};

export const AEO_SERVICE_KEY_BENEFITS = [
  { title: "Make Your Business the Answer", description: "Customers increasingly describe what they need in natural language. Obrive helps transform important business information into clear, contextual answers that can support discovery across search and AI-assisted interfaces.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Business-First Answer Strategy", description: "We begin with business goals, audiences, products, services, markets and customer journeys before defining the questions and information architecture to optimize.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Human-Centered Conversational Content", description: "AEO content is written for people first. We structure answers so users can understand the response quickly, explore supporting context and take an appropriate next step.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Entity & Knowledge Clarity", description: "We make organizations, products, services, people, locations and industry concepts explicit and connected so important information has clear meaning and context.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "AI-Era Discovery Architecture", description: "We connect pages, FAQs, topic clusters, internal links and structured information into an ecosystem designed for evolving search and answer experiences.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Measure, Learn & Improve", description: "We use analytics, content performance and emerging question patterns to continuously refine the answer ecosystem.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
];

export const AEO_SERVICE_SIDEBAR_LINKS = [
  { id: "aeo-services", label: "AEO Services" },
  { id: "ai-powered-aeo-generative-discovery", label: "AI-Powered AEO & Generative Discovery" },
  { id: "global-aeo-delivery", label: "Global AEO Delivery" },
  { id: "technology-platform-capabilities", label: "Technology & Platform Capabilities" },
  { id: "what-makes-an-aeo-program-successful", label: "What Makes an AEO Program Successful?" },
  { id: "why-choose-obrive-for-aeo", label: "Why Choose Obrive for AEO?" },
  { id: "business-outcomes-aeo-can-support", label: "Business Outcomes AEO Can Support" },
] as const;

export const AEO_SERVICE_SERVICE_SECTIONS = [
  {
    id: "aeo-services",
    title: "AEO Services",
    subtitle: "",
    description: "",
    label: "",
    items: [],
    subSections: [
      {
        title: "Answer Engine Optimization Strategy",
        description: "Define the questions, entities, audiences, topics and business journeys that an organization needs to answer across search engines, answer engines and AI-assisted discovery.",
      },
      {
        title: "Conversational Content Optimization",
        description: "Rewrite and structure important pages around natural-language questions, direct answers, supporting context and meaningful next steps.",
      },
      {
        title: "Entity & Knowledge Architecture",
        description: "Clarify organizations, products, services, people, locations, industries and relationships so machines can understand what a business is and how its information connects.",
      },
      {
        title: "AI Search Content Strategy",
        description: "Build topic clusters and content ecosystems designed for conversational discovery rather than isolated keyword pages.",
      },
      {
        title: "FAQ & Answer Architecture",
        description: "Develop comprehensive, answer-first question sets covering informational, commercial, comparison, local and industry intent.",
      },
      {
        title: "Structured Data & Semantic SEO",
        description: "Plan and implement relevant structured information and semantic relationships to improve machine understanding of visible content.",
      },
      {
        title: "Topical Authority & Knowledge Hubs",
        description: "Create connected resource ecosystems that demonstrate depth across services, industries, use cases, questions and expertise.",
      },
      {
        title: "Generative Engine Optimization",
        description: "Prepare high-value business information for generative discovery by improving clarity, context, source quality, entity relationships and content accessibility.",
      },
      {
        title: "AI-Ready Website Architecture",
        description: "Align navigation, URLs, headings, internal links, content models and page relationships with modern search and AI-assisted information retrieval.",
      },
      {
        title: "Local AEO",
        description: "Structure location, service-area, business and customer information for local questions and conversational geographic discovery.",
      },
      {
        title: "eCommerce AEO",
        description: "Optimize product, category, comparison, buying-guide and support information for conversational shopping research.",
      },
      {
        title: "Enterprise AEO",
        description: "Build scalable answer architecture across large websites, multiple teams, products, markets and knowledge domains.",
      },
      {
        title: "AI Knowledge Base Optimization",
        description: "Organize approved business knowledge, documentation and support content so users and intelligent interfaces can retrieve relevant information.",
      },
      {
        title: "AEO Analytics & Optimization",
        description: "Measure query visibility, content engagement, assisted journeys, conversions and emerging question patterns to continuously improve the answer ecosystem.",
      },
    ],
    footer: "",
  },
  {
    id: "ai-powered-aeo-generative-discovery",
    title: "AI-Powered AEO & Generative Discovery",
    subtitle: "",
    description: "Obrive applies AI where it creates genuine value. AEO does not mean generating large volumes of generic AI content; it means building useful, trustworthy and context-rich information that can serve people and intelligent discovery systems.",
    label: "",
    items: [
      "Conversational question mapping",
      "Answer-first content architecture",
      "Natural-language search optimization",
      "Entity and knowledge graph thinking",
      "Structured service and product information",
      "AI-assisted question clustering and content analysis",
      "Knowledge-base and documentation discovery",
      "Contextual recommendations where appropriate",
      "Summarization and extraction of complex information",
      "Human review for consequential or high-trust information",
      "Transparent treatment of uncertainty and AI limitations",
      "Privacy-aware information architecture",
    ],
    footer: "",
  },
  {
    id: "global-aeo-delivery",
    title: "Global AEO Delivery",
    subtitle: "",
    description: "We support organizations serving local, national and international markets, including multilingual content, regional intent, localized information, distributed teams and scalable content governance.",
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
      "Technical SEO and crawling",
      "Modern websites and web applications",
      "CMS and headless CMS",
      "eCommerce platforms",
      "Knowledge bases and documentation",
      "Structured data implementation planning",
      "Analytics and search performance platforms",
      "Internal linking and content architecture",
      "APIs and third-party integrations",
      "Performance and accessibility optimization",
      "AI and intelligent services",
      "Content workflows and governance",
      "Testing and QA",
      "Monitoring and continuous optimization",
    ],
    footer: "",
  },
  {
    id: "what-makes-an-aeo-program-successful",
    title: "What Makes an AEO Program Successful?",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "Clear business objectives",
      "Real customer questions",
      "Strong source content",
      "Direct and accurate answers",
      "Entity clarity",
      "Topical depth",
      "Logical internal linking",
      "Accessible technical foundations",
      "Useful structured information",
      "Human editorial review",
      "Reliable analytics",
      "Continuous content improvement",
    ],
    footer: "",
  },
  {
    id: "why-choose-obrive-for-aeo",
    title: "Why Choose Obrive for AEO?",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "AEO connected with SEO, content, UX and technology",
      "AI-era discovery strategy",
      "Technical and semantic information architecture",
      "Conversational and answer-first content",
      "Entity and knowledge architecture",
      "Enterprise, local and eCommerce AEO",
      "Analytics-led optimization",
      "AI-assisted workflows with human oversight",
      "Website and digital product expertise",
      "Global and India-focused delivery",
      "Ability to connect AEO with AI, web apps, SaaS, mobile and other digital experiences",
    ],
    footer: "",
  },
  {
    id: "business-outcomes-aeo-can-support",
    title: "Business Outcomes AEO Can Support",
    subtitle: "",
    description: "Outcomes vary by market, competition, website quality, content authority, implementation and external AI/search behavior. Obrive defines meaningful measures during discovery rather than promising guaranteed AI citations or rankings. The AI era is changing discovery from typing short phrases toward asking complete questions, comparing options conversationally and requesting synthesized information. Obrive helps organizations prepare the underlying digital knowledge so their information is clear, trustworthy, connected and useful across these evolving interfaces.",
    label: "",
    items: [
      "Clearer brand and service information",
      "Better coverage of customer questions",
      "Stronger topical authority",
      "Improved organic discovery",
      "More useful conversational journeys",
      "Better product and service discovery",
      "Improved content reuse across digital channels",
      "Stronger knowledge accessibility",
      "More qualified discovery journeys",
      "Better readiness for AI-assisted search",
      "From Search Results to Answers",
    ],
    footer: "",
  },
];

export const AEO_SERVICE_PROCESS_STEPS = [
  { step: "01", title: "Discover", description: "Understand business objectives, audiences, products, services, markets and existing digital information." },
  { step: "02", title: "Audit", description: "Review technical foundations, content, architecture, entities, questions, internal linking and current discovery opportunities." },
  { step: "03", title: "Research", description: "Map customer questions, search intent, conversational language, entities, competitors and topic gaps." },
  { step: "04", title: "Define", description: "Prioritize high-value questions, pages, knowledge areas and implementation opportunities." },
  { step: "05", title: "Architect", description: "Design topic relationships, answer structures, information hierarchy, internal links and content models." },
  { step: "06", title: "Create & Optimize", description: "Develop or improve answer-first content, FAQs, service information, product knowledge and supporting resources." },
  { step: "07", title: "Implement", description: "Work with content, UX and engineering teams to deploy recommendations and structured information." },
  { step: "08", title: "Validate", description: "Check technical accessibility, content clarity, links, structured data, performance and analytics." },
  { step: "09", title: "Measure", description: "Track relevant discovery, engagement, conversions and content performance." },
  { step: "10", title: "Improve", description: "Refine the answer ecosystem as customer questions, products and AI-assisted discovery behavior evolve." },
];

export const AEO_SERVICE_INDUSTRIES = [
  {
    id: "automotive-mobility",
    title: "Automotive & Mobility",
    description: "Optimize vehicle discovery, dealer networks, mobility services, aftermarket products and technical information for conversational and traditional search.",
  },
  {
    id: "manufacturing-industrial-engineering",
    title: "Manufacturing & Industrial Engineering",
    description: "Build topical authority around machinery, engineering services, industrial products, documentation and B2B solutions through structured knowledge and answer-ready content.",
  },
  {
    id: "healthcare-medical",
    title: "Healthcare & Medical",
    description: "Create clear, trustworthy and accessible answers around healthcare services, organizations, medical information and patient journeys, with appropriate review and governance.",
  },
  {
    id: "pharmaceuticals-life-sciences",
    title: "Pharmaceuticals & Life Sciences",
    description: "Structure scientific, pharmaceutical and life-science knowledge so users and AI-assisted systems can find relevant, contextual and responsibly presented information.",
  },
  {
    id: "retail-ecommerce",
    title: "Retail & eCommerce",
    description: "Make products, categories, comparisons, buying guidance and support information easier to discover through structured product knowledge and conversational search experiences.",
  },
  {
    id: "consumer-goods-brands",
    title: "Consumer Goods & Brands",
    description: "Strengthen brand and product visibility by connecting entity information, product knowledge, customer questions and useful answers across the digital ecosystem.",
  },
  {
    id: "real-estate-property",
    title: "Real Estate & Property",
    description: "Create answer-ready property, project, developer, neighborhood and location information for high-intent discovery and conversational research.",
  },
  {
    id: "architecture-engineering-construction",
    title: "Architecture, Engineering & Construction",
    description: "Turn complex expertise, project information, capabilities and technical knowledge into structured content that can answer specific user questions.",
  },
  {
    id: "education-edtech",
    title: "Education & EdTech",
    description: "Improve discovery of institutions, courses, programs, learning resources and educational answers through structured knowledge and intent-led content.",
  },
  {
    id: "energy-utilities-infrastructure",
    title: "Energy, Utilities & Infrastructure",
    description: "Organize complex technical services, infrastructure information, projects and customer guidance into accessible, contextual answer experiences.",
  },
  {
    id: "oil-gas",
    title: "Oil & Gas",
    description: "Make technical services, equipment, engineering expertise and operational knowledge easier to discover through structured content and expert-led answers.",
  },
  {
    id: "mining-natural-resources",
    title: "Mining & Natural Resources",
    description: "Structure specialist information, services, projects and technical knowledge around the questions customers, professionals and stakeholders actually ask.",
  },
  {
    id: "aerospace-aviation",
    title: "Aerospace & Aviation",
    description: "Build authoritative, structured knowledge around aerospace engineering, aviation services, products, safety information and specialist capabilities.",
  },
  {
    id: "logistics-warehousing-supply-chain",
    title: "Logistics, Warehousing & Supply Chain",
    description: "Create conversationally discoverable information around freight, warehousing, fulfillment, supply-chain technology, services and operational questions.",
  },
  {
    id: "travel-tourism-hospitality",
    title: "Travel, Tourism & Hospitality",
    description: "Connect destinations, properties, experiences, amenities, policies and travel questions into structured information that supports conversational discovery.",
  },
  {
    id: "media-entertainment-gaming",
    title: "Media, Entertainment & Gaming",
    description: "Structure content, franchises, games, experiences, creators and audience information for richer discovery across search and AI-assisted interfaces.",
  },
  {
    id: "sports-fitness",
    title: "Sports & Fitness",
    description: "Create answer-ready information for organizations, venues, training, fitness services, products, events and audience questions.",
  },
  {
    id: "banking-financial-services-insurance",
    title: "Banking, Financial Services & Insurance",
    description: "Provide clear, structured and carefully governed answers around financial products, services, policies and educational information, with human oversight for consequential topics.",
  },
  {
    id: "telecommunications",
    title: "Telecommunications",
    description: "Make plans, devices, connectivity services, enterprise solutions, support content and network information easier to discover and understand.",
  },
  {
    id: "agriculture-agritech",
    title: "Agriculture & AgriTech",
    description: "Structure practical knowledge around agricultural products, equipment, services, crops, technology and regional needs for conversational discovery.",
  },
  {
    id: "government-public-sector",
    title: "Government & Public Sector",
    description: "Improve access to public programs, services, eligibility information, forms and official guidance through clear, structured and accessible answers.",
  },
  {
    id: "corporate-learning-professional-services",
    title: "Corporate Learning & Professional Services",
    description: "Turn expertise, consulting services, training, knowledge and professional resources into structured answer ecosystems that support research and evaluation.",
  },
];

export const AEO_SERVICE_INDUSTRIES_CONTENT: SolutionIndustriesContent = {
  slug: "aeo-service",
  hero: {
    title: "Answer Engine Optimization (AEO) Across Industries — AI-Era Industry Solutions",
    description: "Create industry-specific AEO content that preserves Obrive's established service-page structure while showing how answer architecture, conversational content, entity clarity, knowledge systems and AI-era discovery can be adapted to different business environments.",
  },
  industries: AEO_SERVICE_INDUSTRIES,
  extraBlocks: [
    {
      id: "ai-era-aeo-across-industries",
      title: "AI-Era AEO Across Industries",
      subtitle: "",
      description: "",
      label: "",
      items: ["Conversational discovery for complex questions", "Natural-language question coverage", "Entity-aware information architecture", "Structured product, service and organization knowledge", "Industry-specific topic clusters", "AI-assisted question and content analysis", "Document and knowledge discovery", "Contextual information and recommendations", "AI-assisted analytics", "Human review for consequential information", "Transparent treatment of uncertainty", "Privacy-aware content and knowledge governance"],
      footer: "AI should be applied according to the industry's users, data permissions, business rules and risk. AI-era AEO means making important information useful, trustworthy and accessible—not adding AI terminology to every page.",
    },
  ],
  globalDelivery: {
    title: "Global AEO Delivery",
    subtitle: "",
    description: "Obrive can support local, national and international organizations, including multilingual information, regional intent, localized service areas, distributed teams and scalable content governance.",
    items: [],
  },
  technologyCapabilities: {
    title: "Technology & Platform Capabilities",
    subtitle: "",
    items: ["Technical SEO foundations", "CMS and headless CMS", "Websites, portals and web applications", "eCommerce platforms", "Knowledge bases and documentation", "Structured data", "Analytics and reporting", "Content architecture and internal linking", "APIs and integrations", "AI-assisted workflows", "Performance and accessibility", "Testing and QA", "Monitoring"],
  },
  footerText: "Our industry solutions are not limited to these sectors. We can adapt AEO foundations to specialized terminology, regulations, customer questions, technical documentation, product catalogs, geographic markets and emerging business models.",
};
