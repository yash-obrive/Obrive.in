export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export const AR_DEVELOPMENT_FAQS_META = {
  title: "Augmented Reality Development Services FAQs",
};

export const AR_DEVELOPMENT_FAQS: FAQCategory[] = [
  {
    title: "General AR Questions",
    items: [
      {
        question: "What is Augmented Reality development?",
        answer:
          "Augmented Reality development is the process of designing and building digital experiences that overlay or integrate digital content with the physical world. AR can combine 3D models, animations, instructions, spatial information, computer vision, AI and interactive interfaces across smartphones, tablets, browsers, smart glasses and other compatible devices.",
      },
      {
        question: "What does an Augmented Reality development company do?",
        answer:
          "An AR development company designs, develops, tests, integrates and deploys AR applications and experiences. This can include WebAR, mobile AR, enterprise AR, industrial AR, AR commerce, virtual try-on, AR training, remote assistance, spatial AR, digital twins, 3D visualization and AI-powered AR.",
      },
      {
        question: "Why should a business invest in Augmented Reality?",
        answer:
          "AR can help businesses make products easier to understand, improve customer engagement, support training, guide operational tasks, visualize equipment and spaces, strengthen field service and create immersive marketing experiences. The strongest AR programs start with a measurable business objective rather than technology alone.",
      },
      {
        question: "What types of AR solutions does Obrive develop?",
        answer:
          '<p>Obrive develops:</p><ul class="list-disc list-outside pl-5 mt-2 space-y-1"><li>WebAR</li><li>Mobile AR</li><li>Enterprise AR</li><li>Industrial AR</li><li>AR product visualization</li><li>AR commerce</li><li>Virtual try-on</li><li>AR training and simulation</li><li>AR remote assistance</li><li>Location-based AR</li><li>Spatial AR</li><li>AI-powered AR</li><li>Computer-vision AR</li><li>3D and spatial content</li><li>Digital twins</li><li>AR portals</li><li>Interactive installations</li><li>AR for events and experiences</li></ul>',
      },
      {
        question: "Can Obrive develop a completely custom AR solution?",
        answer:
          "Yes. AR experiences can be designed around your business model, users, physical environment, devices, integrations, data, security requirements and workflows.",
      },
      {
        question:
          "Can Obrive help define the right AR use case before development?",
        answer:
          "Yes. Discovery can evaluate the user journey, environment, device requirements, technical feasibility, integration needs and expected business outcome before a production architecture is selected.",
      },
    ],
  },
  {
    title: "AR Application Development",
    items: [
      {
        question: "Can you develop AR apps for iOS and Android?",
        answer:
          "Yes. Obrive can design and develop mobile AR applications for supported iOS and Android devices. Platform capabilities, device compatibility and project requirements are assessed during technical discovery.",
      },
      {
        question: "Can you develop browser-based AR without an app?",
        answer:
          "Yes. WebAR can provide an AR experience through a compatible browser without requiring a traditional app installation. This can be useful for campaigns, packaging, retail, product discovery, events and fast-access experiences.",
      },
      {
        question: "What is WebAR?",
        answer:
          "WebAR is Augmented Reality delivered through the web. Depending on device and browser capabilities, experiences can be launched from a URL, QR code, campaign, product page or digital interaction.",
      },
      {
        question: "What is the difference between WebAR and mobile AR?",
        answer:
          "WebAR prioritizes accessibility and low-friction entry through the browser. A dedicated mobile AR application can provide more controlled product functionality, deeper device integration, persistent application experiences and specialized workflows.",
      },
      {
        question: "Can you build location-based AR?",
        answer:
          "Yes. Location-based AR can connect digital content to geographic locations and can support tourism, navigation, events, education, destination marketing, cultural experiences and location-aware customer journeys.",
      },
      {
        question: "Can you build AR for tablets and rugged enterprise devices?",
        answer:
          "Yes. Device selection can be based on field conditions, screen size, camera capabilities, mobility, connectivity, operating system, security and the requirements of the operational environment.",
      },
      {
        question:
          "Can you develop AR for smart glasses and spatial computing devices?",
        answer:
          "Yes, where the target hardware and development framework support the required capabilities. Spatial experiences can be designed around hands-free interaction, spatial awareness, hand tracking, object or image recognition and real-world context.",
      },
    ],
  },
  {
    title: "Enterprise & Industrial AR",
    items: [
      {
        question: "What is enterprise Augmented Reality?",
        answer:
          "Enterprise AR uses Augmented Reality inside business processes such as training, maintenance, inspection, field service, manufacturing, technical support, quality control and operational guidance.",
      },
      {
        question: "Can AR integrate with ERP and CRM systems?",
        answer:
          "Yes, where appropriate. AR applications can integrate with APIs, databases, ERP, CRM, IoT platforms, cloud services, identity systems and other enterprise applications.",
      },
      {
        question: "Can you build AR solutions for manufacturing?",
        answer:
          "Yes. Manufacturing AR applications can include assembly guidance, digital work instructions, equipment visualization, inspection, quality control, maintenance, safety, workforce training and production support.",
      },
      {
        question: "Can AR be used for maintenance and field service?",
        answer:
          "Yes. AR can provide technicians with contextual equipment information, step-by-step procedures, visual annotations, component information, digital work instructions and remote expert assistance.",
      },
      {
        question: "Can AR support remote assistance?",
        answer:
          "Yes. AR remote assistance can allow field employees to share visual context with remote experts and receive annotations, instructions or guidance while working with equipment or physical environments.",
      },
      {
        question: "Can AR work with digital twins?",
        answer:
          "Yes. Digital twin information can be visualized through AR to connect digital models, operational data and physical equipment or environments. The exact architecture depends on the available twin data and enterprise systems.",
      },
      {
        question: "Can AR support quality inspection?",
        answer:
          "Yes. Computer vision, image recognition, spatial tracking and guided workflows can be incorporated into suitable inspection applications. The appropriate approach depends on the inspection criteria, environment, lighting, equipment and accuracy requirements.",
      },
      {
        question: "Can AR support safety and compliance workflows?",
        answer:
          "AR can present contextual procedures, warnings, checklists, visual guidance and training content. Safety-critical implementations should be validated against the organization's operational and regulatory requirements.",
      },
    ],
  },
  {
    title: "AR Across Industries Worldwide",
    items: [
      {
        question: "Which industries can benefit from Augmented Reality?",
        answer:
          "AR can be designed for a wide range of industries where physical products, environments, equipment, procedures or customer experiences benefit from digital context.",
      },
      {
        question: "Can Obrive develop AR for automotive and mobility?",
        answer:
          "Yes. Automotive and mobility use cases can include vehicle visualization, configuration, dealership experiences, remote assistance, technician training, maintenance guidance, factory workflows, product launches and interactive ownership experiences.",
      },
      {
        question: "Can Obrive develop AR for aerospace and aviation?",
        answer:
          "Yes. Potential use cases include engineering visualization, maintenance guidance, inspection, assembly support, technical training, remote assistance, aircraft component visualization and workforce enablement.",
      },
      {
        question:
          "Can Obrive develop AR for healthcare and medical organizations?",
        answer:
          "Yes. AR can support medical education, equipment training, visualization, procedural guidance, patient education and healthcare facility experiences. Healthcare implementations should be designed around applicable privacy, safety and clinical requirements.",
      },
      {
        question:
          "Can Obrive develop AR for pharmaceuticals and life sciences?",
        answer:
          "Yes. AR can support laboratory and equipment training, product education, facility visualization, maintenance guidance, sales enablement and interactive scientific communication.",
      },
      {
        question: "Can Obrive develop AR for retail and ecommerce?",
        answer:
          "Yes. Retail and ecommerce AR can include product placement, 3D product visualization, virtual try-on, interactive packaging, product configuration, digital showrooms and immersive campaigns.",
      },
      {
        question:
          "Can Obrive develop AR for consumer products and FMCG brands?",
        answer:
          "Yes. AR can turn packaging, advertising and product experiences into interactive touchpoints using QR-triggered experiences, image recognition, 3D content, games, product education and brand storytelling.",
      },
      {
        question: "Can Obrive develop AR for real estate and property?",
        answer:
          "Yes. AR can help customers visualize furniture, interiors, developments, floor plans, building concepts, property information and future spaces in context.",
      },
      {
        question:
          "Can Obrive develop AR for architecture, engineering and construction?",
        answer:
          "Yes. AR can support design visualization, site coordination, equipment identification, installation guidance, construction training, project communication and visualization of proposed structures in physical environments.",
      },
      {
        question: "Can Obrive develop AR for energy and utilities?",
        answer:
          "Yes. Potential applications include asset visualization, field maintenance, inspection, training, remote assistance, work instructions and infrastructure information.",
      },
      {
        question: "Can Obrive develop AR for oil and gas?",
        answer:
          "Yes. AR can support equipment identification, maintenance procedures, training, inspection, remote expert assistance and visualization of complex industrial assets. Operational and safety requirements should guide the solution architecture.",
      },
      {
        question: "Can Obrive develop AR for mining and heavy industry?",
        answer:
          "Yes. AR can support equipment training, maintenance, inspection, remote assistance, visualization and workforce enablement in demanding operational environments.",
      },
      {
        question: "Can Obrive develop AR for logistics and supply chain?",
        answer:
          "Yes. Potential use cases include warehouse guidance, picking workflows, asset identification, package information, training, route support and operational instructions.",
      },
      {
        question: "Can Obrive develop AR for travel and tourism?",
        answer:
          "Yes. AR can create destination guides, location-based storytelling, cultural experiences, navigation, attraction information, interactive tours and immersive destination marketing.",
      },
      {
        question: "Can Obrive develop AR for education and universities?",
        answer:
          "Yes. AR can turn lessons, laboratories, technical subjects, museums, campuses and learning materials into interactive experiences using 3D models, spatial visualization and guided learning.",
      },
      {
        question: "Can Obrive develop AR for media, entertainment and events?",
        answer:
          "Yes. AR can be used for interactive installations, live-event experiences, branded activations, digital storytelling, audience participation, immersive campaigns and spatial entertainment.",
      },
      {
        question: "Can Obrive develop AR for sports and fitness?",
        answer:
          "Yes. AR can support interactive fan experiences, equipment visualization, training overlays, venue experiences, coaching concepts and branded sports activations.",
      },
      {
        question:
          "Can Obrive develop AR for banking, financial services and insurance?",
        answer:
          "Yes. AR can support customer education, property and asset visualization, branch experiences, training and selected field workflows. Sensitive financial data should be handled through appropriate security and privacy architecture.",
      },
      {
        question: "Can Obrive develop AR for telecommunications?",
        answer:
          "Yes. AR can support network visualization, field installation, equipment identification, technician guidance, customer education and remote assistance.",
      },
      {
        question: "Can Obrive develop AR for agriculture?",
        answer:
          "Yes. Potential use cases include equipment guidance, field education, crop or asset visualization, training and remote support, depending on connectivity, hardware and environmental conditions.",
      },
      {
        question:
          "Can Obrive develop AR for government and public-sector organizations?",
        answer:
          "Yes. AR can support public education, infrastructure visualization, training, tourism, museums, field operations and citizen-facing experiences. Deployment requirements should be defined around the relevant public-sector security and accessibility standards.",
      },
    ],
  },
  {
    title: "AR for Retail, Ecommerce & Commerce",
    items: [
      {
        question: "Can you build AR product visualization for ecommerce?",
        answer:
          "Yes. We can create experiences that allow customers to place and explore 3D representations of products in their physical environments.",
      },
      {
        question: "Can you build virtual try-on solutions?",
        answer:
          "Yes. Virtual try-on can be developed for suitable product categories such as fashion, eyewear, cosmetics, jewelry, accessories and other products where camera-based visualization is technically appropriate.",
      },
      {
        question: "Can AR integrate with ecommerce platforms?",
        answer:
          "AR experiences can be connected with product catalogs, ecommerce platforms, product databases, CMS systems and purchasing workflows through appropriate integrations.",
      },
      {
        question: "Can AR reduce product uncertainty?",
        answer:
          "AR product visualization can help customers understand product scale, appearance, configuration and placement before purchase. Actual commercial outcomes depend on product, audience, implementation quality and the broader customer journey.",
      },
      {
        question: "Can AR be used on product packaging?",
        answer:
          "Yes. Image recognition or QR-triggered experiences can connect packaging with product education, instructions, storytelling, promotions, games, loyalty experiences or post-purchase support.",
      },
    ],
  },
  {
    title: "AR Training, Simulation & Workforce Enablement",
    items: [
      {
        question: "Can Augmented Reality be used for employee training?",
        answer:
          "Yes. AR training can provide interactive instructions, 3D models, simulations and contextual learning experiences within or around real environments.",
      },
      {
        question: "What industries use AR training?",
        answer:
          "AR training can be applied across manufacturing, healthcare, automotive, aerospace, construction, energy, education, retail, logistics, engineering, field service and other operational environments.",
      },
      {
        question: "Can AR training include voice instructions?",
        answer:
          "Yes. Depending on the solution, AR training can incorporate voice guidance, animations, interactive instructions, hands-free workflows and AI-powered assistance.",
      },
      {
        question: "Can AR support onboarding?",
        answer:
          "Yes. AR can introduce employees to equipment, facilities, procedures and workflows through contextual visual guidance and interactive learning.",
      },
      {
        question: "Can AR support maintenance training?",
        answer:
          "Yes. Maintenance training can combine 3D equipment models, component identification, step-by-step procedures, animations, inspection guidance and simulated tasks.",
      },
    ],
  },
  {
    title: "AI + AR & Computer Vision",
    items: [
      {
        question: "Can Artificial Intelligence be integrated into AR?",
        answer:
          "Yes. AI can be combined with AR through computer vision, object recognition, intelligent assistants, voice interfaces, contextual information, machine learning and generative AI.",
      },
      {
        question: "What is AI-powered Augmented Reality?",
        answer:
          "AI-powered AR combines AR with artificial intelligence so an experience can interpret information, recognize objects or environments and provide context-aware assistance where the underlying data and models support it.",
      },
      {
        question: "Can AR recognize objects?",
        answer:
          "Object recognition can be incorporated into suitable AR applications to identify products, equipment, components or other visual elements.",
      },
      {
        question: "Can users interact with AR using voice?",
        answer:
          "Yes. Voice interfaces can be incorporated into appropriate AR applications to support hands-free interactions, instructions, search and conversational assistance.",
      },
      {
        question: "Can generative AI be used inside AR?",
        answer:
          "Yes. Generative AI can support conversational assistants, content generation, contextual explanations, product information, guided workflows and other interactions. Production use should include appropriate controls for accuracy, privacy and data security.",
      },
      {
        question: "Can computer vision be used for industrial AR?",
        answer:
          "Yes. Computer vision can support image recognition, object identification, visual inspection and context-aware workflows. Performance depends on camera quality, lighting, object characteristics, environment and model design.",
      },
    ],
  },
  {
    title: "3d, Digital Twins & Spatial Computing",
    items: [
      {
        question: "Do you create 3D models for AR?",
        answer:
          "Yes. Obrive can create and optimize 3D models and other digital assets for AR experiences, including product models, equipment, environments, animations and interactive assets.",
      },
      {
        question: "Can existing CAD or 3D models be used?",
        answer:
          "Potentially, depending on the source format, complexity and performance requirements. Existing assets can often be optimized for real-time AR use.",
      },
      {
        question: "What is spatial computing?",
        answer:
          "Spatial computing combines digital information with physical environments, allowing software and digital content to understand and interact with physical space.",
      },
      {
        question: "Can you develop spatial AR experiences?",
        answer:
          "Yes. Spatial AR can be used for retail, exhibitions, museums, tourism, education, real estate, entertainment, events and enterprise environments.",
      },
      {
        question: "Can digital twins be connected to AR?",
        answer:
          "Yes. AR can act as a visualization layer for digital-twin data, helping users relate digital models and information to physical equipment or locations.",
      },
      {
        question: "Can you build AR portals and immersive spaces?",
        answer:
          "Yes. AR portals can transform physical locations into gateways to interactive digital environments, stories, destinations, products and branded experiences.",
      },
    ],
  },
  {
    title: "Development Process, Timeline & Delivery",
    items: [
      {
        question: "How does Obrive start an AR project?",
        answer:
          "We begin with discovery and strategy to understand the business problem, users, environment, required experience, target devices, content, integrations and technical requirements.",
      },
      {
        question: "Do you provide AR prototypes?",
        answer:
          "Yes. Prototyping can help stakeholders understand the proposed experience, interaction model and technical direction before full development.",
      },
      {
        question: "How long does AR development take?",
        answer:
          "The timeline depends on the complexity of the AR experience, number of platforms, 3D assets, integrations, AI requirements, computer vision, testing and deployment requirements. A focused WebAR campaign can require significantly less development than a complex enterprise AR platform.",
      },
      {
        question: "Can you work with an existing AR application?",
        answer:
          "Yes. Depending on the project, we can evaluate an existing application and work on improvements, integrations, optimization, modernization or new functionality.",
      },
      {
        question: "Do you provide post-launch support?",
        answer:
          "Yes. AR solutions may require ongoing optimization, maintenance, updates, device compatibility testing, analytics, content updates and feature development.",
      },
      {
        question: "Can an AR project start as an MVP?",
        answer:
          "Yes. An AR MVP can focus on the most important user journey and business objective, allowing the organization to validate the concept before expanding into a larger production platform.",
      },
      {
        question: "Can Obrive support a pilot-to-enterprise rollout?",
        answer:
          "Yes. A practical roadmap can move from discovery and prototype to MVP, pilot, production deployment and broader rollout, with architecture decisions made to support the intended scale.",
      },
    ],
  },
  {
    title: "Technology, Platforms & Integrations",
    items: [
      {
        question: "Which AR technologies can be used for development?",
        answer:
          "The technology stack depends on the use case. Potential technologies include ARKit and RealityKit for Apple platforms, ARCore for Android and compatible experiences, WebXR for browser-based immersive experiences, Unity or Unreal Engine for real-time 3D applications, computer vision frameworks, cloud services and custom backend systems.",
      },
      {
        question: "Can you build with ARKit and RealityKit?",
        answer:
          "Yes. Apple provides ARKit and RealityKit for building AR experiences across supported Apple platforms. The exact framework and architecture depend on the target experience and device capabilities.",
      },
      {
        question: "Can you build with ARCore?",
        answer:
          "Yes. Google provides ARCore development paths for Android and also documentation for Unity, Unreal Engine, iOS and WebXR-related workflows.",
      },
      {
        question: "Can you build cross-platform AR?",
        answer:
          "Yes. Cross-platform architecture can be considered when the experience needs to reach both iOS and Android. Framework selection should balance shared development with platform-specific capabilities and performance.",
      },
      {
        question: "Can you build WebXR experiences?",
        answer:
          "Yes. WebXR provides web APIs for accessing supported AR and VR capabilities from the browser. Browser, device and feature support should be validated for the intended audience.",
      },
      {
        question: "Can AR integrate with APIs and cloud platforms?",
        answer:
          "Yes. AR applications can connect to APIs, databases, cloud services, CMS platforms, product catalogs, IoT systems, analytics platforms and enterprise software when appropriate interfaces are available.",
      },
      {
        question: "Can AR integrate with IoT?",
        answer:
          "Yes. AR can be used as a visualization and interaction layer for IoT information, such as equipment status, sensor data and operational information. The architecture depends on data latency, connectivity, security and the target workflow.",
      },
    ],
  },
  {
    title: "Security, Privacy, Accessibility & Global Deployment",
    items: [
      {
        question: "Can enterprise AR applications be secure?",
        answer:
          "Security requirements should be considered from the architecture stage. Depending on the application, this may include authentication, authorization, secure APIs, encryption, data protection, cloud security, device controls and role-based access.",
      },
      {
        question: "Can AR applications work with private enterprise data?",
        answer:
          "Yes, where the required infrastructure and integrations support it. Enterprise AR applications can be designed to interact with controlled databases, APIs and business systems.",
      },
      {
        question: "Does AR collect camera or spatial data?",
        answer:
          "An AR application may need camera, motion, spatial or location data depending on its functionality. Data collection should be limited to what is required, communicated clearly to users and handled according to the applicable privacy and security requirements.",
      },
      {
        question: "Can AR be deployed globally?",
        answer:
          "Yes. AR platforms can be architected for multi-location and distributed deployments depending on infrastructure, devices, connectivity, content localization, support requirements and operational constraints.",
      },
      {
        question: "Can AR experiences be localized for different countries?",
        answer:
          "Yes. AR content can be adapted for language, currency, product catalogs, cultural context, regional campaigns, device availability and local operational requirements.",
      },
      {
        question: "Can AR support offline or low-connectivity environments?",
        answer:
          "Potentially. Some AR workflows can be designed with locally available assets and data, while other experiences require cloud connectivity. Offline requirements should be identified early because they affect architecture, synchronization and content delivery.",
      },
      {
        question: "Can AR be designed for accessibility?",
        answer:
          "Yes. Accessibility can be considered through interaction alternatives, readable content, audio guidance, clear instructions, motion considerations and fallback experiences. The appropriate approach depends on the target platform and audience.",
      },
    ],
  },
  {
    title: "Cost, Commercial Model & Business Outcomes",
    items: [
      {
        question: "How much does AR development cost?",
        answer:
          "AR development costs vary significantly based on scope. Factors include platform, number of devices, 3D complexity, number of users, AI requirements, computer vision, backend systems, API integrations, enterprise requirements, security, analytics, content production, testing and support.",
      },
      {
        question: "What affects the cost of an AR project the most?",
        answer:
          "The largest cost drivers are typically experience complexity, 3D content requirements, platform coverage, computer vision or AI, backend integrations, device requirements, enterprise security, testing and the amount of custom interaction required.",
      },
      {
        question: "Can you build an AR MVP?",
        answer:
          "Yes. An AR MVP can be designed around the most important user journey and business objective, allowing organizations to validate the concept before expanding into a larger platform.",
      },
      {
        question: "Can startups work with Obrive?",
        answer:
          "Yes. AR projects can be structured around different stages, from concept validation and prototypes to MVP development and larger production deployments.",
      },
      {
        question: "How should a company measure AR success?",
        answer:
          "Success metrics should be tied to the use case. Examples include engagement, product interaction, conversion, content completion, training performance, task time, service resolution, adoption, workflow accuracy and operational efficiency. The right metrics should be agreed before development.",
      },
    ],
  },
  {
    title: "Why Obrive for Augmented Reality",
    items: [
      {
        question: "Why choose Obrive for AR development?",
        answer:
          "Obrive approaches AR as a combination of business strategy, spatial UX, 3D content, software engineering, computer vision, AI and enterprise integration. The objective is to create useful AR products and workflows rather than isolated technology demonstrations.",
      },
      {
        question: "Can Obrive handle strategy, design and development?",
        answer:
          "Yes. An AR program can include discovery, experience strategy, spatial UX, 3D production, prototyping, engineering, integration, testing, deployment and post-launch support.",
      },
      {
        question: "Can Obrive build both customer-facing and enterprise AR?",
        answer:
          "Yes. The same AR capability can be applied to customer experiences, commerce, marketing, training, industrial workflows, field service, enterprise visualization and spatial applications.",
      },
      {
        question: "Can Obrive support global organizations?",
        answer:
          "Yes. Solutions can be designed for distributed teams, multiple regions, localized content, different device environments and phased deployment. Global delivery requirements should be defined during discovery.",
      },
      {
        question: "What makes an AR project successful?",
        answer:
          "Successful AR projects generally start with a clear user problem, a suitable environment, realistic device assumptions, high-quality 3D or visual content, intuitive spatial interaction, reliable technical performance and a measurable business outcome.",
      },
    ],
  },
  {
    title: "AR Project Discovery Questions",
    items: [
      {
        question: "What should we provide before starting an AR project?",
        answer:
          "Useful inputs include the business objective, target audience, existing product or equipment information, 3D or CAD assets if available, target devices, required integrations, geographic scope, content requirements and expected success metrics.",
      },
      {
        question: "Do we need 3D models before starting?",
        answer:
          "No. Existing 3D assets can be evaluated, optimized or new assets can be created as part of the project. The required level of detail depends on the AR experience and target hardware.",
      },
      {
        question:
          "Can Obrive help us decide between WebAR, mobile AR and enterprise AR?",
        answer:
          "Yes. The decision can be based on audience, distribution, interaction depth, device capabilities, connectivity, security, integrations, maintenance requirements and business objectives.",
      },
      {
        question: "Can Obrive turn an existing concept into an AR prototype?",
        answer:
          "Yes. Existing product concepts, campaign ideas, training concepts, CAD models or workflow requirements can be evaluated and translated into an AR prototype where technically appropriate.",
      },
      {
        question: "What is the next step if we want to build an AR solution?",
        answer:
          "The recommended starting point is a discovery conversation covering the business objective, users, environment, target devices, integrations and desired outcome. From there, the project can be scoped into a concept, prototype, MVP or production roadmap.",
      },
    ],
  },
];
