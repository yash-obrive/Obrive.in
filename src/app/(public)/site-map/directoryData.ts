export interface DirectoryEntry {
  title: string;
  description: string;
  href: string;
  category: string;
  num: string;
  searchKeywords: string;
}

export interface DirectoryCategory {
  id: string;
  title: string;
  description: string;
  entries: DirectoryEntry[];
}

export const DIRECTORY_DATA: DirectoryCategory[] = [
  {
    id: "services",
    title: "Services",
    description:
      "Technology services for building and deploying immersive digital experiences.",
    entries: [
      {
        num: "01",
        title: "Augmented Reality Development",
        description:
          "AR applications, product visualization, navigation, training, commerce and enterprise experiences.",
        href: "/services/augmented-reality-development",
        category: "solutions",
        searchKeywords:
          "augmented reality development /services/augmented-reality-development ar applications, product visualization, navigation, training, commerce and enterprise experiences. solutions",
      },
      {
        num: "02",
        title: "Virtual Reality Development",
        description:
          "VR simulations, training, walkthroughs, product experiences and immersive collaboration.",
        href: "/services/virtual-reality-development",
        category: "solutions",
        searchKeywords:
          "virtual reality development /services/virtual-reality-development vr simulations, training, walkthroughs, product experiences and immersive collaboration. solutions",
      },
      {
        num: "03",
        title: "Mixed Reality Development",
        description:
          "MR applications connecting physical environments with interactive digital content.",
        href: "/services/mixed-reality-development",
        category: "solutions",
        searchKeywords:
          "mixed reality development /services/mixed-reality-development mr applications connecting physical environments with interactive digital content. solutions",
      },
      {
        num: "04",
        title: "3D Design & Development",
        description:
          "3D modelling, visualization, interactive environments, configurators and digital assets.",
        href: "/services/3d-design-development",
        category: "solutions",
        searchKeywords:
          "3d design & development /services/3d-design-development 3d modelling, visualization, interactive environments, configurators and digital assets. solutions",
      },
      {
        num: "05",
        title: "Spatial Computing App Development",
        description:
          "Spatial interfaces, digital twins, location-aware experiences and enterprise spatial applications.",
        href: "/services/spatial-computing-app-development",
        category: "solutions",
        searchKeywords:
          "spatial computing app development /services/spatial-computing-app-development spatial interfaces, digital twins, location-aware experiences and enterprise spatial applications. solutions",
      },
      {
        num: "06",
        title: "AEO Service",
        description: "AEO Service solutions.",
        href: "/services/aeo-service",
        category: "solutions",
        searchKeywords:
          "aeo service /services/aeo-service aeo service solutions",
      },
      {
        num: "07",
        title: "AI Consulting",
        description: "AI Consulting solutions.",
        href: "/services/ai-consulting",
        category: "solutions",
        searchKeywords:
          "ai consulting /services/ai-consulting ai consulting solutions",
      },
      {
        num: "08",
        title: "Content Marketing Service",
        description: "Content Marketing Service solutions.",
        href: "/services/content-marketing-service",
        category: "solutions",
        searchKeywords:
          "content marketing service /services/content-marketing-service content marketing service solutions",
      },
      {
        num: "09",
        title: "GEO Service",
        description: "GEO Service solutions.",
        href: "/services/geo-service",
        category: "solutions",
        searchKeywords:
          "geo service /services/geo-service geo service solutions",
      },
      {
        num: "10",
        title: "Mobile App Design Service",
        description: "Mobile App Design Service solutions.",
        href: "/services/mobile-app-design-service",
        category: "solutions",
        searchKeywords:
          "mobile app design service /services/mobile-app-design-service mobile app design service solutions",
      },
      {
        num: "11",
        title: "Mobile App Development",
        description: "Mobile App Development solutions.",
        href: "/services/mobile-app-development",
        category: "solutions",
        searchKeywords:
          "mobile app development /services/mobile-app-development mobile app development solutions",
      },
      {
        num: "12",
        title: "SEO Service",
        description: "SEO Service solutions.",
        href: "/services/seo-service",
        category: "solutions",
        searchKeywords:
          "seo service /services/seo-service seo service solutions",
      },
      {
        num: "13",
        title: "Web App & SaaS MVP Development",
        description: "Web App & SaaS MVP Development solutions.",
        href: "/services/web-app-saas-mvp-development",
        category: "solutions",
        searchKeywords:
          "web app & saas mvp development /services/web-app-saas-mvp-development web app & saas mvp development solutions",
      },
      {
        num: "14",
        title: "Website Design Service",
        description: "Website Design Service solutions.",
        href: "/services/website-design-service",
        category: "solutions",
        searchKeywords:
          "website design service /services/website-design-service website design service solutions",
      },
      {
        num: "15",
        title: "Website Development Service",
        description: "Website Development Service solutions.",
        href: "/services/website-development-service",
        category: "solutions",
        searchKeywords:
          "website development service /services/website-development-service website development service solutions",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    description:
      "Obrive's product ecosystem for parking, property, retail and automotive experiences.",
    entries: [
      {
        num: "01",
        title: "OBPARK",
        description:
          "AR/MR smart parking, indoor navigation, reservations, mobility services and parking analytics.",
        href: "/products/obpark",
        category: "products",
        searchKeywords:
          "obpark /products/obpark ar/mr smart parking, indoor navigation, reservations, mobility services and parking analytics. products",
      },
      {
        num: "02",
        title: "OBNEST",
        description:
          "MR/VR property exploration, virtual tours, staging, customization and real-estate engagement.",
        href: "/products/obnest",
        category: "products",
        searchKeywords:
          "obnest /products/obnest mr/vr property exploration, virtual tours, staging, customization and real-estate engagement. products",
      },
      {
        num: "03",
        title: "OBNAVI",
        description:
          "AR indoor retail navigation, product discovery, smart-store interactions and retail analytics.",
        href: "/products/obnavi",
        category: "products",
        searchKeywords:
          "obnavi /products/obnavi ar indoor retail navigation, product discovery, smart-store interactions and retail analytics. products",
      },
      {
        num: "04",
        title: "OBMOVE",
        description:
          "AR/VR automotive virtual showroom, 3D vehicle exploration, configuration and visualization.",
        href: "/products/obmove",
        category: "products",
        searchKeywords:
          "obmove /products/obmove ar/vr automotive virtual showroom, 3d vehicle exploration, configuration and visualization. products",
      },
    ],
  },
  {
    id: "industries",
    title: "Industries",
    description:
      "Industry-specific applications of AR, VR, MR, 3D and spatial computing.",
    entries: [
      {
        num: "01",
        title: "Real Estate",
        description:
          "Virtual property tours, 3D visualization, staging and remote property experiences.",
        href: "/industries/real-estate",
        category: "industries",
        searchKeywords:
          "real estate /industries/real-estate virtual property tours, 3d visualization, staging and remote property experiences. industries",
      },
      {
        num: "02",
        title: "Automotive",
        description:
          "Virtual showrooms, 3D vehicle configurators, AR visualization and digital dealerships.",
        href: "/industries/automotive",
        category: "industries",
        searchKeywords:
          "automotive /industries/automotive virtual showrooms, 3d vehicle configurators, ar visualization and digital dealerships. industries",
      },
      {
        num: "03",
        title: "Retail",
        description:
          "AR wayfinding, smart shopping, product discovery and retail intelligence.",
        href: "/industries/retail",
        category: "industries",
        searchKeywords:
          "retail /industries/retail ar wayfinding, smart shopping, product discovery and retail intelligence. industries",
      },
      {
        num: "04",
        title: "Healthcare",
        description:
          "Immersive training, visualization, simulation and patient education.",
        href: "/industries/healthcare",
        category: "industries",
        searchKeywords:
          "healthcare /industries/healthcare immersive training, visualization, simulation and patient education. industries",
      },
      {
        num: "05",
        title: "Manufacturing",
        description:
          "AR work instructions, VR safety training, digital twins and remote assistance.",
        href: "/industries/manufacturing",
        category: "industries",
        searchKeywords:
          "manufacturing /industries/manufacturing ar work instructions, vr safety training, digital twins and remote assistance. industries",
      },
      {
        num: "06",
        title: "Architecture & Engineering",
        description:
          "3D visualization, immersive design reviews and spatial collaboration.",
        href: "/industries/architecture-engineering",
        category: "industries",
        searchKeywords:
          "architecture & engineering /industries/architecture-engineering 3d visualization, immersive design reviews and spatial collaboration. industries",
      },
      {
        num: "07",
        title: "Education",
        description:
          "Immersive learning, virtual laboratories, AR content and VR training.",
        href: "/industries/education",
        category: "industries",
        searchKeywords:
          "education /industries/education immersive learning, virtual laboratories, ar content and vr training. industries",
      },
      {
        num: "08",
        title: "Enterprise",
        description:
          "Enterprise AR/VR/MR, spatial computing, digital twins and workflow modernization.",
        href: "/industries/enterprise",
        category: "industries",
        searchKeywords:
          "enterprise /industries/enterprise enterprise ar/vr/mr, spatial computing, digital twins and workflow modernization. industries",
      },
    ],
  },
  {
    id: "use-cases",
    title: "Use Cases",
    description:
      "Searchable business problems and outcomes that Obrive's technology can address.",
    entries: [
      {
        num: "01",
        title: "AR Product Visualization",
        description:
          "Place interactive 3D products into real-world environments.",
        href: "/use-cases/ar-product-visualization",
        category: "use-cases",
        searchKeywords:
          "ar product visualization /use-cases/ar-product-visualization place interactive 3d products into real-world environments. use cases",
      },
      {
        num: "02",
        title: "Virtual Training & Simulation",
        description:
          "Create repeatable, immersive training and simulation environments.",
        href: "/use-cases/virtual-training",
        category: "use-cases",
        searchKeywords:
          "virtual training & simulation /use-cases/virtual-training create repeatable, immersive training and simulation environments. use cases",
      },
      {
        num: "03",
        title: "Digital Twins",
        description:
          "Create digital representations of spaces, assets and operational environments.",
        href: "/use-cases/digital-twins",
        category: "use-cases",
        searchKeywords:
          "digital twins /use-cases/digital-twins create digital representations of spaces, assets and operational environments. use cases",
      },
      {
        num: "04",
        title: "Virtual Showrooms",
        description:
          "Let customers explore products and spaces without relying only on physical displays.",
        href: "/use-cases/virtual-showrooms",
        category: "use-cases",
        searchKeywords:
          "virtual showrooms /use-cases/virtual-showrooms let customers explore products and spaces without relying only on physical displays. use cases",
      },
      {
        num: "05",
        title: "Indoor Navigation",
        description:
          "Guide users through complex indoor environments with spatial and AR experiences.",
        href: "/use-cases/indoor-navigation",
        category: "use-cases",
        searchKeywords:
          "indoor navigation /use-cases/indoor-navigation guide users through complex indoor environments with spatial and ar experiences. use cases",
      },
      {
        num: "06",
        title: "3D Product Configurators",
        description:
          "Configure products, options and environments through interactive 3D.",
        href: "/use-cases/3d-product-configuration",
        category: "use-cases",
        searchKeywords:
          "3d product configurators /use-cases/3d-product-configuration configure products, options and environments through interactive 3d. use cases",
      },
      {
        num: "07",
        title: "Virtual Property Tours",
        description:
          "Experience properties remotely through immersive digital walkthroughs.",
        href: "/use-cases/virtual-property-tours",
        category: "use-cases",
        searchKeywords:
          "virtual property tours /use-cases/virtual-property-tours experience properties remotely through immersive digital walkthroughs. use cases",
      },
      {
        num: "08",
        title: "Remote Assistance",
        description:
          "Connect experts and field teams with contextual digital guidance.",
        href: "/use-cases/remote-assistance",
        category: "use-cases",
        searchKeywords:
          "remote assistance /use-cases/remote-assistance connect experts and field teams with contextual digital guidance. use cases",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    description: "Core technologies behind Obrive's immersive experiences.",
    entries: [
      {
        num: "01",
        title: "Augmented Reality",
        description:
          "Contextual digital overlays and interactive real-world experiences.",
        href: "/technology/augmented-reality",
        category: "technology",
        searchKeywords:
          "augmented reality /technology/augmented-reality contextual digital overlays and interactive real-world experiences. technology",
      },
      {
        num: "02",
        title: "Virtual Reality",
        description: "Fully immersive digital environments and simulations.",
        href: "/technology/virtual-reality",
        category: "technology",
        searchKeywords:
          "virtual reality /technology/virtual-reality fully immersive digital environments and simulations. technology",
      },
      {
        num: "03",
        title: "Mixed Reality",
        description:
          "Interactive digital content anchored to physical environments.",
        href: "/technology/mixed-reality",
        category: "technology",
        searchKeywords:
          "mixed reality /technology/mixed-reality interactive digital content anchored to physical environments. technology",
      },
      {
        num: "04",
        title: "Extended Reality",
        description: "Connected AR, VR and MR experiences across devices.",
        href: "/technology/extended-reality",
        category: "technology",
        searchKeywords:
          "extended reality /technology/extended-reality connected ar, vr and mr experiences across devices. technology",
      },
      {
        num: "05",
        title: "Spatial Computing",
        description:
          "Computing experiences that understand space, objects and user context.",
        href: "/technology/spatial-computing",
        category: "technology",
        searchKeywords:
          "spatial computing /technology/spatial-computing computing experiences that understand space, objects and user context. technology",
      },
      {
        num: "06",
        title: "Digital Twins",
        description:
          "Digital representations for visualization, simulation and operational insight.",
        href: "/technology/digital-twins",
        category: "technology",
        searchKeywords:
          "digital twins /technology/digital-twins digital representations for visualization, simulation and operational insight. technology",
      },
      {
        num: "07",
        title: "3D Visualization",
        description:
          "Interactive 3D models, environments and real-time visual experiences.",
        href: "/technology/3d-visualization",
        category: "technology",
        searchKeywords:
          "3d visualization /technology/3d-visualization interactive 3d models, environments and real-time visual experiences. technology",
      },
      {
        num: "08",
        title: "AI + Immersive Technology",
        description:
          "AI-assisted automation, personalization, analytics and immersive workflows.",
        href: "/technology/ai-immersive-technology",
        category: "technology",
        searchKeywords:
          "ai + immersive technology /technology/ai-immersive-technology ai-assisted automation, personalization, analytics and immersive workflows. technology",
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    description:
      "Learn, compare and explore the technologies behind Obrive's solutions.",
    entries: [
      {
        num: "01",
        title: "Blog",
        description:
          "Insights covering AR, VR, MR, 3D, spatial computing and industry applications.",
        href: "/resources?filter=Blog",
        category: "resources",
        searchKeywords:
          "blog /resources?filter=Blog insights covering ar, vr, mr, 3d, spatial computing and industry applications. resources",
      },
      {
        num: "02",
        title: "Case Studies",
        description:
          "Real-world projects, outcomes and implementation stories.",
        href: "/resources?filter=Case Studies",
        category: "resources",
        searchKeywords:
          "case studies /resources?filter=Case Studies real-world projects, outcomes and implementation stories. resources",
      },
      {
        num: "03",
        title: "FAQ",
        description:
          "Answers to common questions about Obrive, its technologies, services and products.",
        href: "/faq",
        category: "resources",
        searchKeywords:
          "faq /faq answers to common questions about obrive, its technologies, services and products. resources",
      },
    ],
  },
  {
    id: "company",
    title: "Company",
    description: "Learn about Obrive and connect with the team.",
    entries: [
      {
        num: "01",
        title: "About Obrive",
        description:
          "Our mission, vision, technology capabilities and approach.",
        href: "/about",
        category: "company",
        searchKeywords:
          "about obrive /about our mission, vision, technology capabilities and approach. company",
      },
      {
        num: "02",
        title: "Clients",
        description: "Technology, strategic and implementation clients.",
        href: "/clients",
        category: "company",
        searchKeywords:
          "clients /clients technology, strategic and implementation clients. company",
      },
      {
        num: "03",
        title: "Careers / Join the Otters",
        description:
          "Explore opportunities to build the future of immersive technology.",
        href: "/career",
        category: "company",
        searchKeywords:
          "careers / join the otters /career explore opportunities to build the future of immersive technology. company",
      },
      {
        num: "04",
        title: "Service Charges",
        description:
          "Explore our fixed-price service streams, scopes and packages.",
        href: "/servicecharges",
        category: "company",
        searchKeywords:
          "service charges /servicecharges explore our fixed-price service streams, scopes and packages. company",
      },
      {
        num: "05",
        title: "Contact",
        description:
          "Get in touch to discuss your next project, scope and requirements.",
        href: "/contact",
        category: "company",
        searchKeywords:
          "contact /contact get in touch to discuss your next project, scope and requirements. company",
      },
    ],
  },
  {
    id: "support-and-legal",
    title: "Support & Legal",
    description: "Help, documentation, trust and legal information.",
    entries: [
      {
        num: "01",
        title: "Help Desk",
        description: "Product and platform assistance.",
        href: "/support/help-center",
        category: "support-and-legal",
        searchKeywords:
          "help desk /support/help-center product and platform assistance. support & legal",
      },
      {
        num: "02",
        title: "Community Forum",
        description: "Discuss immersive technology, products and use cases.",
        href: "/community-forum",
        category: "support-and-legal",
        searchKeywords:
          "community forum /community-forum discuss immersive technology, products and use cases. support & legal",
      },
      {
        num: "03",
        title: "Documentation",
        description: "Technical documentation and implementation resources.",
        href: "/docs",
        category: "support-and-legal",
        searchKeywords:
          "documentation /docs technical documentation and implementation resources. support & legal",
      },
      {
        num: "04",
        title: "Privacy Policy",
        description: "How Obrive handles personal information.",
        href: "/privacy-policy",
        category: "support-and-legal",
        searchKeywords:
          "privacy policy /privacy-policy how obrive handles personal information. support & legal",
      },
      {
        num: "05",
        title: "Terms & Accessibility",
        description: "Terms of use and accessibility information.",
        href: "/terms-accessibility",
        category: "support-and-legal",
        searchKeywords:
          "terms & accessibility /terms-accessibility terms of use and accessibility information. support & legal",
      },
      {
        num: "06",
        title: "Legal Notice",
        description: "Legal and corporate information.",
        href: "/legal",
        category: "support-and-legal",
        searchKeywords:
          "legal notice /legal legal and corporate information. support & legal",
      },
    ],
  },
];

export function getDirectoryData(): DirectoryCategory[] {
  return DIRECTORY_DATA;
}
