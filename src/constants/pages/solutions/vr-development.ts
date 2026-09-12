import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

export const VR_DEVELOPMENT_HERO = {
  title: "Virtual Reality Development Services Across Industries.",
  description:
    "Obrive Industries delivers immersive Virtual Reality (VR) solutions designed to transform how industries train, collaborate, and operate. By creating interactive 3D environments, we help organizations replace costly manual methods with engaging, efficient simulations.",
  description2:
    "From healthcare training to manufacturing workflows, our VR platforms provide realistic, step-by-step guidance that enhances accuracy, reduces risks, and improves decision-making. With scalable solutions, we enable enterprises to accelerate adoption and achieve measurable results.",
  ctaButtons: {
    primary: "Explore VR Solutions",
    secondary: "SCHEDULE A DEMO",
  },
};

export const VR_DEVELOPMENT_KEY_BENEFITS = [
  {
    title: "Overview",
    description:
      "We don't simply build VR applications. We deliver complete Virtual Reality solutions around your business objectives, your technology ecosystem and measurable results.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Business-First VR Development",
    description:
      "Technology alone does not create value. We begin with your business challenge, identify where VR can make an impact and design the experience around your users and objectives.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Built for Real-World Environments",
    description:
      "Our VR solutions are designed to work seamlessly within your existing infrastructure—not just controlled demonstrations. We consider device compatibility, spatial tracking, usability, performance and scalability from the beginning.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Immersive Experiences That Convert",
    description:
      "From process simulation to employee training, we create interactive experiences designed to capture attention, simplify complex processes and encourage meaningful interactions.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export const VR_DEVELOPMENT_SIDEBAR_LINKS = [
  { id: "vr-training-simulation", label: "VR Training & Simulation" },
  { id: "enterprise-vr-solutions", label: "Enterprise VR Solutions" },
  { id: "industrial-vr", label: "Industrial VR Applications" },
  { id: "vr-product-visualization", label: "VR Product Visualization" },
  { id: "vr-healthcare", label: "VR Healthcare Solutions" },
  { id: "vr-architecture", label: "VR Architectural Walkthroughs" },
  { id: "vr-education", label: "VR Education & E-Learning" },
  { id: "multi-user-vr", label: "Multi-User VR Collaboration" },
] as const;

export const VR_DEVELOPMENT_SERVICE_SECTIONS = [
  {
    id: "vr-training-simulation",
    title: "VR Training & Simulation",
    subtitle: "Train Smarter, Faster and More Effectively in Virtual Environments",
    description:
      "Traditional training methods can be slow, expensive, and disconnected from real work environments. Virtual Reality transforms training by immersing users in highly realistic, risk-free simulations of physical workspaces and equipment. Our VR training solutions accelerate onboarding, improve skill retention, and drastically reduce training costs across high-risk industries.",
    label: "We build VR training experiences for",
    items: [
      "Safety training simulations",
      "Equipment operation training",
      "Hazard identification",
      "Emergency response training",
      "Soft skills & HR training",
      "Aviation & automotive simulators",
      "Complex assembly training",
      "Medical procedure simulation",
      "Onboarding experiences",
    ],
    footer:
      "Our VR training solutions incorporate realistic physics, interactive instructions, performance analytics, and immersive environments to create highly engaging learning scenarios.",
  },
  {
    id: "enterprise-vr-solutions",
    title: "Enterprise VR Solutions",
    subtitle: "Transform Enterprise Operations with Virtual Reality",
    description:
      "Enterprise environments demand VR solutions that are reliable, scalable, secure, and deeply integrated into existing workflows. We develop enterprise VR platforms and tools for manufacturing, logistics, engineering, and corporate environments. Our enterprise VR solutions connect to your business systems, maintain data security, and are designed to deliver measurable operational results.",
    label: "Organizations can use VR for",
    items: [
      "Virtual command centers",
      "Remote team collaboration",
      "Supply chain visualization",
      "Enterprise VR dashboards",
      "Data visualization in 3D",
      "Digital twin interaction",
      "VR-integrated ERP systems",
      "Spatial knowledge transfer",
      "Corporate communications",
    ],
    footer:
      "We architect enterprise VR platforms with scalability, security, integration, and long-term maintainability in mind to scale globally with your workforce.",
  },
  {
    id: "industrial-vr",
    title: "Industrial VR Applications",
    subtitle: "Bring Precision Intelligence to Complex Industrial Processes",
    description:
      "Industrial environments require VR solutions built for complex workflows, massive spatial data, and strict engineering standards. We develop VR applications for manufacturing, engineering, energy, construction, and utilities that allow teams to review, simulate, and optimize industrial processes before physical implementation.",
    label: "Our industrial VR solutions support",
    items: [
      "Factory layout planning",
      "Machine operation simulation",
      "Industrial prototyping",
      "Energy & utilities VR",
      "Construction site planning",
      "VR-assisted engineering",
      "Predictive maintenance VR",
      "Ergonomics assessment",
      "Process optimization",
    ],
    footer:
      "Our industrial VR solutions integrate with your existing CAD systems, BIM data, and manufacturing platforms to create intelligent, data-driven VR experiences.",
  },
  {
    id: "vr-product-visualization",
    title: "VR Product Visualization",
    subtitle: "Let Customers Explore Products Before They Are Built",
    description:
      "VR product visualization allows customers and stakeholders to see, interact with, and evaluate products in a fully immersive 1:1 scale environment. We develop VR product visualizers for automotive, heavy machinery, consumer goods, and custom manufacturing. Our VR visualization solutions reduce prototyping costs, increase stakeholder buy-in, and create memorable brand experiences.",
    label: "Our VR product experiences enable",
    items: [
      "1:1 scale product viewing",
      "Virtual showrooms",
      "Automotive VR configurators",
      "Heavy machinery exploration",
      "Interactive product demonstrations",
      "Pre-production design reviews",
      "Material & finish customization",
      "Cross-sectional viewing",
      "Component interaction",
    ],
    footer:
      "By combining high-fidelity 3D modeling and VR technology, we help businesses create product experiences that are more engaging, informative, and impactful.",
  },
  {
    id: "vr-healthcare",
    title: "VR Healthcare Solutions",
    subtitle: "Advancing Medical Training and Patient Care",
    description:
      "Virtual Reality is revolutionizing the healthcare industry by providing safe, repeatable environments for surgical training, patient therapy, and medical education. Obrive develops specialized VR solutions that allow medical professionals to practice complex procedures, students to explore human anatomy in 3D, and patients to undergo immersive therapeutic experiences.",
    label: "VR Healthcare Applications",
    items: [
      "Surgical simulations",
      "Anatomy exploration",
      "Medical device training",
      "Physical therapy VR",
      "Pain management experiences",
      "Mental health & exposure therapy",
      "Patient education",
      "Hospital layout planning",
      "First responder training",
    ],
    footer:
      "We design healthcare VR applications with a strict focus on medical accuracy, user comfort, and seamless integration into existing medical education frameworks.",
  },
  {
    id: "vr-architecture",
    title: "VR Architectural Walkthroughs",
    subtitle: "Step Inside Your Vision Before Construction Begins",
    description:
      "Traditional 2D blueprints and static renders leave too much to the imagination. Our VR architectural walkthroughs allow clients, investors, and design teams to step inside unbuilt spaces, understand spatial relationships, and make confident design decisions. We transform CAD and BIM data into fully navigable, photorealistic virtual environments.",
    label: "We build architectural VR for",
    items: [
      "Real estate marketing",
      "Commercial property tours",
      "Interior design visualization",
      "Urban planning simulations",
      "Lighting & material testing",
      "Stakeholder presentations",
      "Facility management",
      "BIM integration",
      "Acoustic simulations",
    ],
    footer:
      "Our architectural VR solutions bridge the gap between design and reality, helping you secure approvals faster and sell properties before ground is even broken.",
  },
  {
    id: "vr-education",
    title: "VR Education & E-Learning",
    subtitle: "Make Learning an Immersive Journey",
    description:
      "VR transforms passive learning into active exploration. We develop educational VR experiences for schools, universities, and corporate training programs that transport learners to historical events, microscopic worlds, or distant planets. By engaging multiple senses, VR education significantly improves knowledge retention and student engagement.",
    label: "Educational VR experiences",
    items: [
      "Virtual field trips",
      "Historical recreations",
      "STEM education labs",
      "Language immersion",
      "Interactive science simulations",
      "Museum VR exhibits",
      "Accessibility focused learning",
      "Vocational training",
      "Gamified learning environments",
    ],
    footer:
      "Obrive builds scalable educational VR content designed for classroom deployment, focusing on intuitive controls, curriculum alignment, and measurable learning outcomes.",
  },
  {
    id: "multi-user-vr",
    title: "Multi-User VR Collaboration",
    subtitle: "Bring Global Teams Together in Shared Virtual Spaces",
    description:
      "Distance is no longer a barrier to effective teamwork. Our multi-user VR collaboration platforms allow teams from around the world to meet, brainstorm, design, and review projects in a shared, interactive 3D space. Users can manipulate objects, draw in 3D, and communicate with spatial audio, creating a sense of presence that video calls cannot match.",
    label: "VR Collaboration features",
    items: [
      "Virtual meeting rooms",
      "Collaborative design reviews",
      "3D whiteboard & annotation",
      "Spatial audio communication",
      "Custom avatar integration",
      "Cross-platform accessibility",
      "Secure enterprise hosting",
      "Live presentation tools",
      "Session recording & playback",
    ],
    footer:
      "We build robust, low-latency networking architectures that ensure smooth, synchronized multi-user experiences across different geographies and VR hardware platforms.",
  },
];

export const VR_DEVELOPMENT_PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover & Strategize",
    description:
      "We start by understanding your business, users, environment and objectives. We identify the right Virtual Reality use case, define the experience and establish a clear technical roadmap for your VR solution.",
  },
  {
    step: "02",
    title: "Design & Experience",
    description:
      "Our team transforms the strategy into intuitive UX/UI, 3D experiences and spatial interactions. Every element is designed around usability, engagement, performance and the way users interact with the virtual world.",
  },
  {
    step: "03",
    title: "Build & Integrate",
    description:
      "We develop your enterprise VR platform, training simulator, or custom Virtual Reality solution. Where required, we integrate 3D, AI, APIs, cloud platforms and existing business systems.",
  },
  {
    step: "04",
    title: "Launch & Scale",
    description:
      "After rigorous testing across headsets and enterprise environments, we deploy your solution and continuously optimize it using performance insights and user feedback. Our architecture is built to evolve as your business grows.",
  },
] as const;

export const VR_DEVELOPMENT_WORKFLOW_STEPS_SIDEBAR = [
  "Step 1: Design VR Workflows",
  "Step 2: Launch & Train",
  "Step 3: Collaborate & Review Securely",
  "Step 4: Analyze & Optimize Training Adoption",
];

export const VR_DEVELOPMENT_HOW_IT_WORKS = [
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
