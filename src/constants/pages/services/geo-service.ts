import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

import type { SolutionIndustriesContent } from "@/types/services";

export const GEO_SERVICE_HERO = {
  title: "Generative Engine Optimization (GEO) Services Across Industries — For the AI Era",
  description: "Generative Engine Optimization (GEO) services help organizations prepare their digital presence for AI-assisted discovery, where users increasingly ask complex questions and receive synthesized answers, comparisons, recommendations and summaries from generative search experiences and conversational systems.",
  description2: "Obrive approaches GEO as a broader digital information and authority strategy—not as a tactic for inserting keywords into content. Our work combines search intent, authoritative content, entity clarity, topical depth, technical accessibility, structured information, internal linking, digital PR and measurable discovery signals to make important business information easier for AI systems and people to understand. From service and product discovery to enterprise knowledge, local visibility, eCommerce research, technical documentation and thought leadership, we build GEO programs around business objectives, audience questions and the information ecosystem that supports them.",
  ctaButtons: { primary: "Explore Solutions", secondary: "SCHEDULE A DEMO" },
};

export const GEO_SERVICE_KEY_BENEFITS = [
  { title: "Become a Trusted Source in the AI Era", description: "People are moving from searching for pages to asking systems to research, compare and explain. Your business needs more than a ranking—it needs clear, authoritative and connected information that can be discovered, interpreted and used in modern generative journeys. Obrive helps organizations strengthen the content, entities, evidence, architecture and digital signals that support AI-era discovery while keeping the experience useful for humans.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Business-First GEO Strategy", description: "We begin with business objectives, audiences, products or services, markets, competitive context and the questions customers need answered. The goal is not to optimize everything for AI; it is to identify where generative discovery can influence awareness, consideration, trust and qualified demand.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Human-Centered Generative Content", description: "AI-era content still needs to be useful to people. We structure content around clear questions, direct answers, supporting evidence, context, examples, comparisons and meaningful next steps—without producing repetitive or robotic pages.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Entity & Knowledge Clarity", description: "Generative systems need to understand who your organization is, what it offers, which industries it serves, where it operates and how its products, services, people and concepts relate. We strengthen entity consistency and relationships across the website and broader digital ecosystem.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Topical Authority & Evidence", description: "GEO depends on depth and credibility. We build connected topic clusters, authoritative resource pages, supporting documentation, expert-led content and evidence-rich information that establishes context rather than relying on isolated keyword pages.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "AI-Era Discovery Architecture", description: "We connect SEO, AEO, GEO, content architecture, structured information, internal linking and digital product knowledge so your information can support multiple discovery surfaces—from traditional search to answer engines and generative interfaces.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Measure, Learn & Improve", description: "Generative discovery changes quickly. We define practical measurement frameworks around visibility signals, branded discovery, referral patterns, content engagement, query coverage, conversions and business outcomes, then continuously improve the information ecosystem.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
];

export const GEO_SERVICE_SIDEBAR_LINKS = [
  { id: "geo-services", label: "GEO Services" },
  { id: "ai-powered-geo-capabilities", label: "AI-Powered GEO Capabilities" },
  { id: "global-geo-delivery", label: "Global GEO Delivery" },
  { id: "what-makes-a-geo-program-successful", label: "What Makes a GEO Program Successful?" },
  { id: "why-choose-obrive-for-geo", label: "Why Choose Obrive for GEO?" },
  { id: "business-outcomes-geo-can-support", label: "Business Outcomes GEO Can Support" },
] as const;

export const GEO_SERVICE_SERVICE_SECTIONS = [
  {
    id: "geo-services",
    title: "GEO Services",
    subtitle: "",
    description: "",
    label: "",
    items: [],
    subSections: [
      {
        title: "Generative Engine Optimization Strategy",
        description: "Define a GEO roadmap based on business goals, audience questions, market priorities, content maturity, competitive context and the organization's broader SEO/AEO strategy.",
      },
      {
        title: "AI Search & Generative Discovery Optimization",
        description: "Optimize information for modern AI-assisted discovery by improving clarity, relevance, context, entity relationships, content depth and technical accessibility.",
      },
      {
        title: "AI-Era Content Strategy",
        description: "Create content systems designed around real questions, research journeys, comparisons, use cases, evidence and topical relationships rather than keyword volume alone.",
      },
      {
        title: "Entity & Knowledge Optimization",
        description: "Clarify organizations, products, services, people, locations, technologies and concepts, and connect related information consistently across digital properties.",
      },
      {
        title: "Topical Authority & Content Hubs",
        description: "Build structured topic ecosystems with pillar pages, supporting articles, guides, comparisons, glossaries, documentation and expert resources.",
      },
      {
        title: "Answer-First & Conversational Content",
        description: "Develop direct answers and conversational pathways that support AEO while adding the context generative systems need to interpret and synthesize information.",
      },
      {
        title: "Citation & Source Readiness",
        description: "Improve the quality, accessibility, consistency and evidence of source information that may be considered by AI-assisted discovery systems, without promising guaranteed citations.",
      },
      {
        title: "Digital PR & Authority Signals",
        description: "Support broader authority through credible publications, expert commentary, partnerships, industry resources and other legitimate digital reputation signals.",
      },
      {
        title: "Structured Data & Semantic Information",
        description: "Use structured information where appropriate to communicate well-defined content to machines while ensuring markup accurately represents visible page content.",
      },
      {
        title: "GEO for Local Discovery",
        description: "Strengthen location, service-area, business, review, contact and local knowledge signals for organizations competing in geographic discovery journeys.",
      },
      {
        title: "GEO for eCommerce",
        description: "Improve product, category, brand, comparison, use-case, specification and purchasing information so shoppers can discover and evaluate products through AI-assisted research.",
      },
      {
        title: "Enterprise GEO",
        description: "Create governance, content architecture, entity standards, knowledge systems and scalable workflows for large organizations with many services, markets, teams and content owners.",
      },
      {
        title: "GEO for Knowledge Bases & Documentation",
        description: "Structure technical documentation, support content, product knowledge and internal-facing public resources so complex information is easier to retrieve and understand.",
      },
      {
        title: "GEO Analytics & Continuous Optimization",
        description: "Establish reporting and testing around content performance, query themes, discovery pathways, brand visibility and business outcomes, then refine the program over time.",
      },
    ],
    footer: "",
  },
  {
    id: "ai-powered-geo-capabilities",
    title: "AI-Powered GEO Capabilities",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "AI-assisted question and intent clustering",
      "Generative-search journey mapping",
      "Entity and topic relationship analysis",
      "Content gap and topical-depth analysis",
      "Answer and comparison content planning",
      "Knowledge-base and documentation discovery",
      "Semantic content analysis and content briefs",
      "AI-assisted content workflows with human editorial review",
      "Content summarization and information extraction where appropriate",
      "Internal-linking and information-architecture recommendations",
      "Structured information and schema planning",
      "Competitive generative-discovery analysis",
      "Brand/entity consistency checks",
      "Analytics-assisted content prioritization",
      "Privacy-aware and governance-conscious AI workflows",
    ],
    footer: "",
  },
  {
    id: "global-geo-delivery",
    title: "Global GEO Delivery",
    subtitle: "",
    description: "Obrive supports local, national and international GEO programs, including multilingual content environments, regional intent, multiple business units, distributed content teams and scalable governance. Strategy can be adapted for India, Bangalore, global markets and specialized industry audiences.",
    label: "",
    items: [
      "GEO Technology & Platform Capabilities",
      "Technical SEO and crawling foundations",
      "Modern websites, portals and web applications",
      "CMS and headless CMS platforms",
      "eCommerce platforms and product catalogs",
      "Knowledge bases and documentation systems",
      "Structured data and semantic markup",
      "Analytics, reporting and search-performance platforms",
      "Content architecture and internal linking",
      "APIs and enterprise integrations",
      "AI-assisted content and knowledge workflows",
      "Performance and accessibility optimization",
      "Testing, QA and content validation",
      "Monitoring and governance systems",
    ],
    footer: "",
  },
  {
    id: "what-makes-a-geo-program-successful",
    title: "What Makes a GEO Program Successful?",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "Clear business objectives",
      "Real customer and stakeholder questions",
      "Authoritative first-party information",
      "Strong topical depth and connected content",
      "Consistent entity and brand information",
      "Evidence-rich and trustworthy source content",
      "Clear answers with supporting context",
      "Logical information architecture and internal linking",
      "Accessible technical foundations",
      "Accurate structured information",
      "Human editorial review and governance",
      "Meaningful measurement",
      "Continuous optimization as AI-assisted discovery evolves",
    ],
    footer: "",
  },
  {
    id: "why-choose-obrive-for-geo",
    title: "Why Choose Obrive for GEO?",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "GEO connected with SEO, AEO, content, UX and technology",
      "AI-era discovery strategy built around business outcomes",
      "Technical, semantic and content architecture expertise",
      "Conversational, answer-first and evidence-rich content",
      "Entity and knowledge architecture",
      "Enterprise, local and eCommerce GEO",
      "Analytics-led optimization",
      "AI-assisted workflows with human oversight",
      "Website, web application, SaaS and digital product expertise",
      "Global and India-focused delivery",
      "Ability to connect discovery strategy with AI solutions and digital experiences",
    ],
    footer: "",
  },
  {
    id: "business-outcomes-geo-can-support",
    title: "Business Outcomes GEO Can Support",
    subtitle: "",
    description: "Outcomes vary by market, competition, source authority, implementation quality, content quality and external AI/search behavior. Obrive defines meaningful measures during discovery rather than promising guaranteed AI visibility, citations, rankings or ROI. The AI era is expanding discovery beyond lists of links. Users can ask for recommendations, comparisons, explanations and synthesized research. Obrive helps organizations prepare the underlying information ecosystem so important facts are clear, connected, authoritative, accessible and useful across evolving discovery interfaces.",
    label: "",
    items: [
      "Stronger readiness for generative discovery",
      "Clearer brand, product and service understanding",
      "Broader coverage of customer questions and research journeys",
      "Stronger topical authority and information depth",
      "Improved organic and AI-assisted discovery opportunities",
      "More useful comparison and consideration journeys",
      "Better product and service discovery",
      "Greater reuse of authoritative content across channels",
      "Improved knowledge accessibility",
      "More qualified discovery journeys",
      "Better alignment between content and business priorities",
      "From Search Rankings to Generative Discovery",
    ],
    footer: "",
  },
];

export const GEO_SERVICE_PROCESS_STEPS = [
  { step: "01", title: "Discover", description: "Understand the business, audiences, offerings, markets, content ecosystem, competitive environment and desired outcomes." },
  { step: "02", title: "Audit", description: "Review technical accessibility, content quality, entity clarity, topical coverage, internal linking, structured information and authority signals." },
  { step: "03", title: "Research", description: "Map customer questions, conversational journeys, generative discovery themes, competitors and information gaps." },
  { step: "04", title: "Define", description: "Prioritize the topics, entities, content types, sources, markets and business journeys with the highest strategic value." },
  { step: "05", title: "Architect", description: "Design the information architecture, topic clusters, content relationships, entity structure and governance model." },
  { step: "06", title: "Create & Optimize", description: "Develop or improve authoritative, useful, answer-first and evidence-rich content." },
  { step: "07", title: "Implement", description: "Publish changes, improve technical foundations, structured information, internal links and supporting digital assets." },
  { step: "08", title: "Validate", description: "Review accuracy, accessibility, technical implementation, entity consistency and content quality." },
  { step: "09", title: "Measure", description: "Track discovery signals, engagement, branded demand, referral patterns, content performance and agreed business outcomes." },
  { step: "10", title: "Improve", description: "Continuously refine the GEO ecosystem as customer questions, AI interfaces, competitors and business priorities evolve." },
];

export const GEO_SERVICE_INDUSTRIES = [
  {
    id: "automotive-mobility",
    title: "Automotive & Mobility",
    description: "GEO focus: Vehicle specifications, comparisons, ownership questions, technologies, dealerships, services, EV information, mobility solutions and product education. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "manufacturing-industrial-engineering",
    title: "Manufacturing & Industrial Engineering",
    description: "GEO focus: Technical specifications, applications, industrial processes, engineering documentation, product comparisons, safety information, capabilities and procurement research. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "healthcare-medical",
    title: "Healthcare & Medical",
    description: "GEO focus: Clear service information, conditions, treatment education, provider expertise, patient questions and trustworthy first-party information with careful editorial governance. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "pharmaceuticals-life-sciences",
    title: "Pharmaceuticals & Life Sciences",
    description: "GEO focus: Scientific information, product knowledge, research areas, therapy information, regulatory context and evidence-rich educational content. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "retail-ecommerce",
    title: "Retail & eCommerce",
    description: "GEO focus: Product attributes, use cases, comparisons, categories, buying guides, availability, brand information and purchase-oriented discovery journeys. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "consumer-goods-brands",
    title: "Consumer Goods & Brands",
    description: "GEO focus: Product education, ingredients/materials, use cases, comparisons, brand stories, customer questions and reputation signals. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "real-estate-property",
    title: "Real Estate & Property",
    description: "GEO focus: Property types, locations, amenities, market information, buyer/renter questions, project details, developer information and local discovery. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "architecture-engineering-construction",
    title: "Architecture, Engineering & Construction",
    description: "GEO focus: Capabilities, project expertise, materials, methods, certifications, technical resources, project documentation and procurement questions. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "education-edtech",
    title: "Education & EdTech",
    description: "GEO focus: Programs, courses, learning outcomes, admissions questions, curriculum information, skills, institutions and learner decision journeys. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "energy-utilities-infrastructure",
    title: "Energy, Utilities & Infrastructure",
    description: "GEO focus: Projects, technologies, services, sustainability information, infrastructure capabilities, technical explanations and stakeholder questions. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "oil-gas",
    title: "Oil & Gas",
    description: "GEO focus: Technical capabilities, services, equipment, operational expertise, safety information, project experience and industry knowledge. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "mining-natural-resources",
    title: "Mining & Natural Resources",
    description: "GEO focus: Exploration, equipment, processing, environmental information, services, technical capabilities and operational knowledge. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "aerospace-aviation",
    title: "Aerospace & Aviation",
    description: "GEO focus: Aircraft and aerospace information, engineering capabilities, safety, services, technical documentation, training and specialized expertise. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "logistics-warehousing-supply-chain",
    title: "Logistics, Warehousing & Supply Chain",
    description: "GEO focus: Service areas, shipping solutions, warehousing capabilities, technology, fulfillment, tracking, trade questions and operational information. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "travel-tourism-hospitality",
    title: "Travel, Tourism & Hospitality",
    description: "GEO focus: Destinations, experiences, hotels, itineraries, local questions, amenities, comparisons, seasonal information and traveler decision journeys. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "media-entertainment-gaming",
    title: "Media, Entertainment & Gaming",
    description: "GEO focus: Content discovery, creators, titles, franchises, platforms, experiences, audience questions and contextual knowledge. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "sports-fitness",
    title: "Sports & Fitness",
    description: "GEO focus: Programs, facilities, equipment, training concepts, schedules, services, athlete or team information and audience discovery journeys. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "banking-financial-services-insurance",
    title: "Banking, Financial Services & Insurance",
    description: "GEO focus: Products, eligibility, processes, terminology, comparisons, educational information, trust signals and compliance-aware content governance. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "telecommunications",
    title: "Telecommunications",
    description: "GEO focus: Plans, devices, coverage, connectivity, enterprise services, support information, comparisons and technology education. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "agriculture-agritech",
    title: "Agriculture & AgriTech",
    description: "GEO focus: Crops, equipment, inputs, technologies, farm practices, services, regional questions, product information and practical education. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "government-public-sector",
    title: "Government & Public Sector",
    description: "GEO focus: Citizen services, eligibility, procedures, policies, forms, public information, locations and accessible explanations of complex processes. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
  {
    id: "corporate-learning-professional-services",
    title: "Corporate Learning & Professional Services",
    description: "GEO focus: Expertise, training, consulting capabilities, methodologies, certifications, resources, use cases and decision-maker questions. Obrive can build an industry-specific information architecture around real audience questions, authoritative source material, entity relationships, topical clusters and business priorities.",
  },
];

export const GEO_SERVICE_INDUSTRIES_CONTENT: SolutionIndustriesContent = {
  slug: "geo-service",
  hero: {
    title: "Generative Engine Optimization (GEO) Across Industries — AI-Era Industry Solutions",
    description: "Generative Engine Optimization changes by industry because customers ask different questions, evaluate different evidence and move through different decision journeys. Obrive adapts GEO strategy to each organization's terminology, expertise, products, services, regulations, geographic markets, content ecosystem and competitive environment. Our industry approach combines authoritative content, entity clarity, topical authority, conversational discovery, structured information, technical accessibility, digital reputation and analytics to help organizations prepare for AI-assisted research and generative discovery. GEO Across Industries",
  },
  industries: GEO_SERVICE_INDUSTRIES,
  extraBlocks: [
    {
      id: "ai-era-geo-across-industries",
      title: "AI-Era GEO Across Industries",
      subtitle: "",
      description: "",
      label: "",
      items: ["Conversational discovery and natural-language question coverage", "Entity-aware organization, product, service and location information", "Structured product/service/organization knowledge", "Industry-specific topic clusters and authoritative resource hubs", "AI-assisted question, content and competitive analysis", "Knowledge-base and technical-document discovery", "Answer, comparison and decision-support content", "Content reuse across website, knowledge base, support and marketing channels", "Human editorial review for high-trust and regulated information", "Transparent handling of uncertainty and limitations", "Privacy-aware AI workflows and governance"],
      footer: "",
    },
  ],
  globalDelivery: {
    title: "Global GEO Delivery",
    subtitle: "",
    description: "Obrive supports local, national and international organizations, including multilingual content environments, regional intent, localized service areas, distributed teams and scalable content governance. GEO can be adapted to Bangalore, India and global markets without relying on location keyword repetition.",
    items: [],
  },
  technologyCapabilities: {
    title: "Technology & Platform Capabilities",
    subtitle: "",
    items: ["Technical SEO foundations", "CMS and headless CMS", "Websites, portals and web applications", "eCommerce platforms", "Knowledge bases and documentation", "Structured data", "Analytics and reporting", "Content architecture and internal linking", "APIs and integrations", "AI-assisted workflows", "Performance and accessibility", "Testing and QA", "Monitoring and governance"],
  },
  footerText: "Our industry solutions are not limited to these sectors. We can adapt GEO foundations to specialized terminology, regulations, customer questions, technical documentation, product catalogs, geographic markets, content maturity and emerging business models.",
};
