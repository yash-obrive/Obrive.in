import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

import type { SolutionIndustriesContent } from "@/types/services";

export const SEO_SERVICE_HERO = {
  title: "SEO Services Across Industries — For the AI Era",
  description: "Obrive's SEO services combine search strategy, technical SEO, content architecture, UX, analytics, structured information and AI-era discovery thinking to help organizations become easier to find, understand and evaluate online. From technical SEO audits and website optimization to enterprise SEO, local SEO, eCommerce SEO, content strategy, AEO, GEO, migration support and ongoing optimization, Obrive builds search foundations around real business objectives rather than treating SEO as a keyword-only activity.",
  description2: "We work across customer acquisition, product discovery, local visibility, B2B demand generation, knowledge discovery and enterprise digital ecosystems. Our approach connects SEO with the underlying website, content model, user journey, technical platform and conversion path. In the AI era, search is expanding beyond traditional result pages. Users increasingly ask conversational questions, compare providers through AI-assisted interfaces and expect direct, trustworthy answers. Obrive therefore structures websites and content so important information is clear to humans and understandable to search engines, answer engines and AI-assisted discovery systems.",
  ctaButtons: { primary: "Explore Solutions", secondary: "SCHEDULE A DEMO" },
};

export const SEO_SERVICE_KEY_BENEFITS = [
  { title: "Make Your Business Easier to Discover", description: "Your customers should be able to find, understand and evaluate your products, services and expertise when they are actively searching. Obrive creates SEO foundations that connect search intent with useful digital experiences.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Business-First SEO Strategy", description: "We begin with business objectives, audiences, markets, products, services, competition and conversion goals before deciding what to optimize. The goal is not traffic for its own sake; it is relevant discoverability that supports measurable business journeys.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Human-Centered Search Experience", description: "SEO should improve the experience for people, not create pages written only for algorithms. We organize information around clear questions, useful content, intuitive navigation, accessibility, trust and meaningful next steps.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Technical SEO Foundation", description: "We address crawlability, indexability, information architecture, canonicalization, redirects, structured data, performance, mobile behavior, internal linking and other technical foundations that help discovery systems understand the site.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "AI-Era Search Readiness", description: "We structure content for traditional search as well as answer engines and generative discovery through direct answers, topical depth, explicit entities, contextual relationships and trustworthy information.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
  { title: "Measurable Organic Growth", description: "We connect SEO activity to analytics and business outcomes, using measurement to identify what is working, where users are dropping off and which opportunities deserve the next investment.", src: ICONS.BOX_CHECK_ICON, srcMeta: ICONS_META.BOX_CHECK_ICON },
];

export const SEO_SERVICE_SIDEBAR_LINKS = [
  { id: "seo-services", label: "SEO Services" },
  { id: "ai-powered-seo-discovery", label: "AI-Powered SEO & Discovery" },
  { id: "global-seo-delivery", label: "Global SEO Delivery" },
  { id: "technology-platform-capabilities", label: "Technology & Platform Capabilities" },
  { id: "what-makes-an-seo-program-successful", label: "What Makes an SEO Program Successful?" },
  { id: "why-choose-obrive-for-seo", label: "Why Choose Obrive for SEO?" },
  { id: "business-outcomes-seo-can-support", label: "Business Outcomes SEO Can Support" },
] as const;

export const SEO_SERVICE_SERVICE_SECTIONS = [
  {
    id: "seo-services",
    title: "SEO Services",
    subtitle: "",
    description: "",
    label: "",
    items: [],
    subSections: [
      {
        title: "Technical SEO Services",
        description: "Audit and improve crawlability, indexation, site architecture, redirects, canonicals, XML sitemaps, rendering, performance, mobile usability, structured data and technical quality.",
      },
      {
        title: "On-Page SEO & Content Optimization",
        description: "Optimize titles, headings, metadata, page structure, internal links, content clarity, topical depth, search intent alignment and conversion journeys.",
      },
      {
        title: "SEO Strategy & Search Intent Research",
        description: "Map audiences, queries, problems and commercial journeys into a prioritized SEO roadmap across services, products, industries, locations and informational topics.",
      },
      {
        title: "AI SEO, AEO & GEO Strategy",
        description: "Prepare digital information for AI-assisted discovery through answer-first content, entity clarity, topical authority, structured information and useful contextual relationships.",
      },
      {
        title: "Enterprise SEO",
        description: "Create scalable SEO governance for large websites, multiple teams, markets, products and business units through templates, workflows, technical controls and measurement.",
      },
      {
        title: "Local SEO",
        description: "Improve local discovery with location architecture, local relevance, business information, service-area content, technical foundations and conversion-focused local journeys.",
      },
      {
        title: "eCommerce SEO",
        description: "Optimize product and category discovery, technical crawl paths, faceted navigation, product information, structured data, internal linking and commercial content.",
      },
      {
        title: "SEO Content Strategy & Topic Clusters",
        description: "Build interconnected content around customer questions, services, industries, use cases and expertise to develop topical depth without repetitive keyword publishing.",
      },
      {
        title: "SEO Audit & Recovery",
        description: "Identify technical, content, architecture and visibility issues and create a prioritized remediation plan based on business impact and implementation effort.",
      },
      {
        title: "Website Migration SEO",
        description: "Protect organic discovery during redesigns, platform changes, domain changes and information-architecture updates through URL mapping, redirects, canonicals, content preservation and launch validation.",
      },
      {
        title: "SEO Analytics & Performance Measurement",
        description: "Establish meaningful reporting around organic visibility, qualified traffic, conversions, technical health, content performance and business outcomes.",
      },
      {
        title: "International SEO",
        description: "Structure multilingual and multi-market websites around regional intent, localization, international architecture and scalable content governance.",
      },
      {
        title: "SEO for Web Apps & SaaS",
        description: "Optimize public-facing product pages, documentation, knowledge content, comparison journeys and discovery surfaces for SaaS and web-product businesses.",
      },
      {
        title: "SEO for AI-Powered Websites & Products",
        description: "Create clear information architectures for AI-enabled products, with structured product knowledge, trustworthy documentation and user-focused explanations of intelligent capabilities.",
      },
    ],
    footer: "",
  },
  {
    id: "ai-powered-seo-discovery",
    title: "AI-Powered SEO & Discovery",
    subtitle: "",
    description: "Obrive uses AI where it creates genuine value. AI does not replace technical quality, editorial judgment, expertise, accessibility, trust or a strong user experience.",
    label: "",
    items: [
      "Answer-first content for conversational queries",
      "Natural-language search and discovery",
      "Entity-aware information architecture",
      "Structured service, product and organization information",
      "Topic clusters and contextual internal linking",
      "AI-assisted content research, classification and optimization workflows",
      "Knowledge-base and document discovery",
      "Search-friendly product and service explanations",
      "AI-assisted analytics and opportunity identification",
      "Human review for consequential or high-trust content",
      "Transparent treatment of uncertainty and AI limitations",
      "Privacy-aware handling of business and customer data",
    ],
    footer: "",
  },
  {
    id: "global-seo-delivery",
    title: "Global SEO Delivery",
    subtitle: "",
    description: "We can support organizations serving local, national and international markets, including multiple languages, regional content, localized service areas, multiple currencies, distributed teams and enterprise governance. SEO programs can be structured for controlled expansion across markets.",
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
      "Technical SEO auditing and crawling",
      "Modern front-end and server-side environments",
      "CMS and headless CMS",
      "Web applications and SaaS platforms",
      "eCommerce platforms and product catalogs",
      "Analytics and search performance platforms",
      "Structured data and schema implementation planning",
      "Cloud infrastructure and deployment workflows",
      "API and third-party integrations",
      "Performance and Core Web Vitals optimization",
      "Redirect and migration management",
      "Content systems and knowledge bases",
      "AI and intelligent services",
      "Testing, QA and monitoring",
    ],
    footer: "",
  },
  {
    id: "what-makes-an-seo-program-successful",
    title: "What Makes an SEO Program Successful?",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "Clear business and search objectives",
      "Well-defined target audiences and intent",
      "Strong technical foundations",
      "Useful, differentiated and trustworthy content",
      "Logical information architecture",
      "Meaningful internal linking",
      "Clear entity and topical relationships",
      "Fast, accessible and mobile-friendly experiences",
      "Structured information where appropriate",
      "Reliable analytics and measurement",
      "Consistent implementation across teams",
      "Continuous optimization based on evidence",
    ],
    footer: "",
  },
  {
    id: "why-choose-obrive-for-seo",
    title: "Why Choose Obrive for SEO?",
    subtitle: "",
    description: "",
    label: "",
    items: [
      "Business-first SEO strategy rather than keyword-only execution",
      "SEO connected with website design, development and digital product capabilities",
      "Technical SEO and content strategy in one delivery model",
      "AI-era SEO, AEO and GEO readiness",
      "Custom enterprise, local, eCommerce and B2B approaches",
      "Strong understanding of web architecture, APIs, CMS and digital platforms",
      "Analytics-led measurement and optimization",
      "Migration and modernization support",
      "Human-centered content and information architecture",
      "Global and India-focused delivery capability",
      "Ability to connect SEO with AI, web apps, mobile products and immersive digital experiences",
    ],
    footer: "",
  },
  {
    id: "business-outcomes-seo-can-support",
    title: "Business Outcomes SEO Can Support",
    subtitle: "",
    description: "Outcomes vary by market, competition, website condition, implementation quality and business model. Obrive defines meaningful metrics during discovery rather than promising generic rankings or ROI. The future of SEO is not simply ranking more pages. It is making a business's digital information clear, useful, technically accessible and context-rich enough to participate in the changing discovery journey. Obrive helps organizations build that foundation across websites, products, content systems and AI-enabled experiences.",
    label: "",
    items: [
      "Greater organic discoverability",
      "More relevant search traffic",
      "Improved product and service discovery",
      "Stronger topical authority",
      "Better website structure and usability",
      "Improved local visibility",
      "More efficient content investment",
      "Stronger qualified lead and conversion journeys",
      "Better visibility across traditional and AI-assisted discovery",
      "More measurable organic acquisition",
      "From Search Visibility to AI-Era Digital Discovery",
    ],
    footer: "",
  },
];

export const SEO_SERVICE_PROCESS_STEPS = [
  { step: "01", title: "Discover", description: "Understand business objectives, audiences, markets, offerings and current digital ecosystem." },
  { step: "02", title: "Audit", description: "Assess technical SEO, content, architecture, internal linking, performance and search visibility." },
  { step: "03", title: "Research", description: "Analyze search intent, topics, competitors, entities, customer questions and commercial opportunities." },
  { step: "04", title: "Define", description: "Prioritize opportunities by business value, search opportunity, effort and technical dependency." },
  { step: "05", title: "Architect", description: "Design information hierarchy, URL structures, topic relationships, internal linking and content models." },
  { step: "06", title: "Optimize", description: "Improve technical foundations, pages, content, structured information and user journeys." },
  { step: "07", title: "Implement", description: "Work with content, design and engineering teams to deploy recommendations safely." },
  { step: "08", title: "Validate", description: "Test indexing, redirects, structured data, performance, accessibility, content and analytics." },
  { step: "09", title: "Measure", description: "Monitor organic visibility, qualified traffic, conversions and technical health." },
  { step: "10", title: "Improve", description: "Use evidence and changing search behavior to continuously refine the SEO program." },
];

export const SEO_SERVICE_INDUSTRIES = [
  {
    id: "automotive-mobility",
    title: "Automotive & Mobility",
    description: "Build search visibility for vehicle brands, mobility platforms, dealerships and aftermarket businesses through technical SEO, local discovery, product content, structured data and AI-era information architecture.",
  },
  {
    id: "manufacturing-industrial-engineering",
    title: "Manufacturing & Industrial Engineering",
    description: "Improve discoverability for industrial products, machinery, engineering services and B2B workflows through technical SEO, product-led content, entity clarity and search-ready documentation.",
  },
  {
    id: "healthcare-medical",
    title: "Healthcare & Medical",
    description: "Create trustworthy, accessible and technically sound search experiences for healthcare organizations, providers, medical products and patient information, with careful attention to accuracy and sensitive content.",
  },
  {
    id: "pharmaceuticals-life-sciences",
    title: "Pharmaceuticals & Life Sciences",
    description: "Strengthen discoverability for scientific, pharmaceutical and life-science information through structured content, topic clusters, technical SEO and evidence-aware publishing workflows.",
  },
  {
    id: "retail-ecommerce",
    title: "Retail & eCommerce",
    description: "Grow qualified product discovery with technical eCommerce SEO, category architecture, product schema, internal linking, content optimization, local discovery and AI-era product information.",
  },
  {
    id: "consumer-goods-brands",
    title: "Consumer Goods & Brands",
    description: "Build stronger brand and product visibility through search strategy, content systems, entity signals, product information and conversion-focused organic discovery.",
  },
  {
    id: "real-estate-property",
    title: "Real Estate & Property",
    description: "Optimize property, project, developer and location content with local SEO, structured property information, technical performance and search journeys designed for high-intent users.",
  },
  {
    id: "architecture-engineering-construction",
    title: "Architecture, Engineering & Construction",
    description: "Create topical authority around projects, services, technical capabilities and expertise through structured content, case studies, technical SEO and professional-service search optimization.",
  },
  {
    id: "education-edtech",
    title: "Education & EdTech",
    description: "Improve discovery for institutions, courses, learning platforms and educational resources with structured content, topic authority, technical SEO and answer-focused information.",
  },
  {
    id: "energy-utilities-infrastructure",
    title: "Energy, Utilities & Infrastructure",
    description: "Build search visibility for complex infrastructure, engineering and utility services using technical content, entity-aware architecture, structured data and clear expertise signals.",
  },
  {
    id: "oil-gas",
    title: "Oil & Gas",
    description: "Support discoverability for industrial services, equipment, engineering and operational expertise through technical SEO, authoritative content and structured knowledge ecosystems.",
  },
  {
    id: "mining-natural-resources",
    title: "Mining & Natural Resources",
    description: "Organize complex technical information into search-friendly topic clusters, service pages, project content and knowledge resources that help both specialist and general audiences find relevant information.",
  },
  {
    id: "aerospace-aviation",
    title: "Aerospace & Aviation",
    description: "Strengthen technical authority and discoverability across aerospace products, engineering services, aviation solutions and specialized knowledge with rigorous content architecture and technical SEO.",
  },
  {
    id: "logistics-warehousing-supply-chain",
    title: "Logistics, Warehousing & Supply Chain",
    description: "Optimize service, location, solution and technology content to improve discovery across logistics networks, warehouse solutions, freight services and supply-chain platforms.",
  },
  {
    id: "travel-tourism-hospitality",
    title: "Travel, Tourism & Hospitality",
    description: "Combine destination SEO, local discovery, structured experiences, multilingual content and conversion-focused journeys to help travelers find and evaluate relevant offerings.",
  },
  {
    id: "media-entertainment-gaming",
    title: "Media, Entertainment & Gaming",
    description: "Build discoverability around content libraries, franchises, experiences, creators, games and audience journeys using technical SEO, structured metadata and content ecosystems.",
  },
  {
    id: "sports-fitness",
    title: "Sports & Fitness",
    description: "Improve discovery for sports organizations, fitness brands, training services, venues and products through local SEO, structured content, topical authority and useful answer-driven resources.",
  },
  {
    id: "banking-financial-services-insurance",
    title: "Banking, Financial Services & Insurance",
    description: "Develop trustworthy, technically strong search experiences for financial services, products and educational content, with clear information architecture, governance and careful handling of consequential information.",
  },
  {
    id: "telecommunications",
    title: "Telecommunications",
    description: "Improve visibility for plans, devices, network services, enterprise connectivity and support content through technical SEO, structured product information and intent-based content architecture.",
  },
  {
    id: "agriculture-agritech",
    title: "Agriculture & AgriTech",
    description: "Connect farmers, businesses and industry audiences with products, services, equipment and knowledge through search-friendly information architecture, regional content and practical resources.",
  },
  {
    id: "government-public-sector",
    title: "Government & Public Sector",
    description: "Improve access to public information, programs, services and digital resources through accessible technical foundations, clear information architecture, structured content and answer-focused publishing.",
  },
  {
    id: "corporate-learning-professional-services",
    title: "Corporate Learning & Professional Services",
    description: "Build authority for consulting, training, professional expertise and knowledge services through topic clusters, expert content, case studies, technical SEO and AI-era discoverability.",
  },
];

export const SEO_SERVICE_INDUSTRIES_CONTENT: SolutionIndustriesContent = {
  slug: "seo-service",
  hero: {
    title: "SEO Services Across Industries — AI-Era Industry Solutions",
    description: "Create industry-specific SEO content that preserves the service-page structure while showing how technical SEO, content strategy, AEO, GEO, local discovery and AI-era information architecture can be adapted to different business environments.",
  },
  industries: SEO_SERVICE_INDUSTRIES,
  extraBlocks: [
    {
      id: "ai-era-seo-across-industries",
      title: "AI-Era SEO Across Industries",
      subtitle: "",
      description: "",
      label: "",
      items: ["Conversational discovery for complex questions", "Natural-language search and information retrieval", "Entity-aware content architecture", "Structured product, service and organization knowledge", "Industry-specific topic clusters", "AI-assisted content analysis and optimization", "Document and knowledge discovery", "Personalized or contextual discovery where appropriate", "AI-assisted analytics and opportunity identification", "Human review for consequential information", "Transparent treatment of uncertainty", "Privacy-aware and governance-conscious content systems"],
      footer: "AI should be applied according to the industry's users, data permissions, business rules and risk. AI-era SEO does not mean adding AI language to every page; it means making important information useful, trustworthy and accessible across changing discovery interfaces.",
    },
  ],
  globalDelivery: {
    title: "Global SEO Delivery",
    subtitle: "",
    description: "Obrive can support local, national and international organizations, including localized content, multiple languages, regional search intent, distributed teams, market-specific landing pages and scalable governance.",
    items: [],
  },
  technologyCapabilities: {
    title: "Technology & Platform Capabilities",
    subtitle: "",
    items: ["Technical SEO audits", "CMS and headless CMS", "Modern web frameworks", "eCommerce platforms", "Web apps and SaaS", "Analytics and reporting", "Structured data", "Performance optimization", "API and third-party integrations", "Content and knowledge systems", "AI-assisted workflows", "Migration and redirect management", "Testing and QA", "Monitoring and continuous optimization"],
  },
  footerText: "Our industry solutions are not limited to these sectors. We can adapt SEO foundations to specialized terminology, regulations, customer journeys, product catalogs, geographic markets, technical documentation and emerging digital business models.",
};
