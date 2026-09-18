import {
  ICONS,
  ICONS_META,
  IMAGES,
  IMAGES_META,
  OBMOVE_IMAGES,
  OBMOVE_IMAGES_META,
  OBNAVI_IMAGES,
  OBNAVI_IMAGES_META,
  OBNEST_IMAGES,
  OBNEST_IMAGES_META,
} from "@/assets/images";

import {
  THREE_D_PRODUCT_CONFIGURATION_HERO,
  THREE_D_PRODUCT_CONFIGURATION_KEY_BENEFITS,
  THREE_D_PRODUCT_CONFIGURATION_HOW_IT_WORKS,
  THREE_D_PRODUCT_CONFIGURATION_WORKFLOW_STEPS_SIDEBAR,
  THREE_D_PRODUCT_CONFIGURATION_SERVICE_SECTIONS,
  THREE_D_PRODUCT_CONFIGURATION_SIDEBAR_LINKS,
} from "./3d-product-configuration";
import {
  DIGITAL_TWINS_HERO,
  DIGITAL_TWINS_KEY_BENEFITS,
  DIGITAL_TWINS_HOW_IT_WORKS,
  DIGITAL_TWINS_WORKFLOW_STEPS_SIDEBAR,
  DIGITAL_TWINS_SERVICE_SECTIONS,
  DIGITAL_TWINS_SIDEBAR_LINKS,
} from "./digital-twins";
import {
  REMOTE_ASSISTANCE_HERO,
  REMOTE_ASSISTANCE_KEY_BENEFITS,
  REMOTE_ASSISTANCE_HOW_IT_WORKS,
  REMOTE_ASSISTANCE_WORKFLOW_STEPS_SIDEBAR,
  REMOTE_ASSISTANCE_SERVICE_SECTIONS,
  REMOTE_ASSISTANCE_SIDEBAR_LINKS,
} from "./remote-assistance";

const PLACEHOLDER_WORKFLOW = [
  "Step 1: Identify Use Case",
  "Step 2: Prototype Solution",
  "Step 3: Deploy & Test",
  "Step 4: Scale Operations",
] as const;

const PLACEHOLDER_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Placeholder Use Case Step",
    description:
      "This is a placeholder description for how this use case is implemented.",
    src: IMAGES.AUGMENTED_FIRST_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FIRST_IMAGE,
  },
] as const;

const PLACEHOLDER_KEY_BENEFITS = [
  {
    title: "Placeholder Benefit",
    description: "Placeholder description for key benefit in this use case.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const OBNEST_WORKFLOW = [
  "Step 1: Upload Property Data",
  "Step 2: Virtual Staging & Customization",
  "Step 3: Activate Listings",
  "Step 4: Enable Collaboration",
  "Step 5: Gain Insights",
  "Step 6: Analytics Dashboard",
] as const;

const OBNEST_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Upload Property Data",
    description:
      "Share your floorplans, 3D models, or architectural drawings. Our platform transforms them into immersive MR/VR-ready environments.",
    src: OBNEST_IMAGES.OBNEST_STEP_1,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_1,
  },
  {
    step: "02",
    title: "2. Virtual Staging & Customization",
    description:
      "Digitally stage interiors with furniture, lighting, and finishes—or allow buyers to customize designs in real time.",
    src: OBNEST_IMAGES.OBNEST_STEP_2,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_2,
  },
  {
    step: "03",
    title: "3. Activate Listings",
    description:
      "Publish your properties directly to the marketplace, where users can explore through VR headsets, MR devices, or smartphones.",
    src: OBNEST_IMAGES.OBNEST_STEP_3,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_3,
  },
  {
    step: "04",
    title: "4. Enable Collaboration",
    description:
      "Invite clients, architects, and stakeholders into the same property tour—annotate, adjust, and finalize design decisions together.",
    src: OBNEST_IMAGES.OBNEST_STEP_4,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_4,
  },
  {
    step: "05",
    title: "5. Gain Insights",
    description:
      "Track tour engagement, popular layouts, and buyer preferences through your analytics dashboard, helping you refine offerings.",
    src: OBNEST_IMAGES.OBNEST_STEP_5,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_5,
  },
  {
    step: "06",
    title: "6. Analytics Dashboard",
    description:
      "Gain access to a real-time dashboard with insights on space utilization, occupancy trends, customer behaviors, and revenue opportunities.",
    src: OBNEST_IMAGES.OBNEST_STEP_6,
    srcMeta: OBNEST_IMAGES_META.OBNEST_STEP_6,
  },
] as const;

const OBNEST_KEY_BENEFITS = [
  {
    title: "Accelerated Sales Cycles",
    description:
      "Virtual tours and immersive walkthroughs help buyers decide faster, reducing the need for repeated site visits.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Cost Savings on Staging & Marketing",
    description:
      "Skip expensive physical staging—digitally stage, update, and showcase properties instantly.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Global Reach & Remote Accessibility",
    description:
      "Attract international investors and remote buyers with MR/VR tours available anytime, anywhere.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Deeper Client Engagement",
    description:
      "Immersive, interactive experiences build stronger emotional connections and trust in the property.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Data-Driven Insights",
    description:
      "Understand buyer preferences with analytics on engagement, popular layouts, and time spent in spaces.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Competitive Advantage",
    description:
      "Differentiate your business as innovative and future-ready, standing out in crowded real estate markets.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const OBMOVE_WORKFLOW = [
  "Step 1: Enter Virtual Showroom",
  "Step 2: Explore in 3D",
  "Step 3: Customize Instantly",
  "Step 4: Visualize in Your World",
  "Step 5: Compare & Decide",
  "Step 6: Analytics & Insights",
] as const;

const OBMOVE_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Enter Virtual Showroom",
    description:
      "From home, mobile, VR headset, or digital kiosk—customers instantly step into a life-sized 3D showroom.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_1,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_1,
  },
  {
    step: "02",
    title: "2. Explore in 3D",
    description:
      "Walk around models, examine details from every angle—as if the product were physically there.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_2,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_2,
  },
  {
    step: "03",
    title: "3. Customize Instantly",
    description:
      "Change trims, colors, and accessories in real time. Every choice updates the model instantly.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_3,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_3,
  },
  {
    step: "04",
    title: "4. Visualize in Your World",
    description:
      "Use AR mode to place the object in your environment—helping buyers imagine ownership.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_4,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_4,
  },
  {
    step: "05",
    title: "5. Compare & Decide",
    description:
      "Switch between models, view features side by side, and explore upgrades to make an informed choice.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_5,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_5,
  },
  {
    step: "06",
    title: "6. Analytics & Insights",
    description:
      "Track which models customers explore most. Measure customization trends, time spent, and AR interactions.",
    src: OBMOVE_IMAGES.OBMOVE_STEP_6,
    srcMeta: OBMOVE_IMAGES_META.OBMOVE_STEP_6,
  },
] as const;

const OBMOVE_KEY_BENEFITS = [
  {
    title: "Immersive 3D Exploration",
    description:
      "Walk around life-sized objects, step inside, and experience interiors in detail.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Personalized Customization",
    description:
      "Instantly change trims, colors, and features to design your ideal configurations.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AR Visualization at Home",
    description:
      "Place items in your physical space for a realistic ownership preview.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Smarter Decisions",
    description:
      "Compare models side by side and explore upgrades with full clarity.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Convenient Access Anywhere",
    description:
      "Experience the catalog from home, mobile, VR headsets, or physical kiosks.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const OBNAVI_WORKFLOW = [
  "Step 1: Enter the Store",
  "Step 2: Search & Discover",
  "Step 3: Navigate with AR Guidance",
  "Step 4: Interact with Products",
  "Step 5: Checkout & Beyond",
  "Step 6: Voice & Gesture Assistance",
] as const;

const OBNAVI_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Enter the Space",
    description:
      "Users open the app or connect via supported AR glasses. The system detects their location within the indoor space using indoor positioning technology.",
    src: OBNAVI_IMAGES.OBNAVI_STEP_1,
    srcMeta: OBNAVI_IMAGES_META.OBNAVI_STEP_1,
  },
  {
    step: "02",
    title: "2. Search & Discover",
    description:
      "Users search for an item or location. The system instantly maps the shortest, most efficient route. Personalized recommendations appear in AR along the way.",
    src: OBNAVI_IMAGES.OBNAVI_STEP_2,
    srcMeta: OBNAVI_IMAGES_META.OBNAVI_STEP_2,
  },
  {
    step: "03",
    title: "3. Navigate with AR Guidance",
    description:
      "Dynamic AR arrows, overlays, and visual cues guide users through aisles and corridors, making navigation intuitive and frictionless.",
    src: OBNAVI_IMAGES.OBNAVI_STEP_3,
    srcMeta: OBNAVI_IMAGES_META.OBNAVI_STEP_3,
  },
  {
    step: "04",
    title: "4. Interact Contextually",
    description:
      "By pointing their device at a physical location, users unlock immersive details, reviews, availability, and suggestions, right in their view.",
    src: OBNAVI_IMAGES.OBNAVI_STEP_4,
    srcMeta: OBNAVI_IMAGES_META.OBNAVI_STEP_4,
  },
  {
    step: "05",
    title: "5. Digital Actions",
    description:
      "Users can save items, connect directly with loyalty programs, and digital checkout. Businesses gain valuable insights through the analytics dashboard.",
    src: OBNAVI_IMAGES.OBNAVI_STEP_5,
    srcMeta: OBNAVI_IMAGES_META.OBNAVI_STEP_5,
  },
  {
    step: "06",
    title: "6. Voice & Gesture Assistance",
    description:
      "Hands-free navigation with voice-guided assistants. Gesture-based interaction with AR prompts for convenience and accessibility.",
    src: OBNAVI_IMAGES.OBNAVI_STEP_6,
    srcMeta: OBNAVI_IMAGES_META.OBNAVI_STEP_6,
  },
] as const;

const OBNAVI_KEY_BENEFITS = [
  {
    title: "Seamless Indoor Navigation",
    description:
      "Find products and locations quickly with real-time AR/MR guidance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Unique Journey",
    description:
      "Get tailored recommendations and exclusive context-aware offers.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Instant Information",
    description:
      "Access reviews, features, stock availability, and promotions with a simple scan.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Time-Saving & Stress-Free",
    description:
      "Spend less time searching and wandering, and more time achieving your goal.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Immersive & Engaging",
    description:
      "Turn navigation into an interactive experience that feels futuristic yet intuitive.",
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

const DEFAULT_SIDEBAR_LINKS = [
  { id: "industries", label: "Industries & Applications" },
  { id: "why-choose", label: "Why Choose Obrive" },
  { id: "scope", label: "Use-Case Scope" },
] as const;

export const AR_PRODUCT_VISUALIZATION = {
  hero: {
    title: "AR Product Visualization",
    description:
      "Bring products to life by visualizing them in real-world environments before purchase.",
    description2:
      "Project 3D models, annotations, and contextual overlays directly onto physical environments to eliminate guesswork and improve spatial understanding.",
    ctaButtons: {
      primary: "Explore Use Case",
      secondary: "SCHEDULE A DEMO",
    },
  },
  workflowStepsSidebar: AR_WORKFLOW,
  howItWorks: AR_HOW_IT_WORKS,
  keyBenefits: AR_KEY_BENEFITS,
  sidebarLinks: DEFAULT_SIDEBAR_LINKS,
  serviceSections: [
    {
      id: "industries",
      title: "Industries & Applications",
      subtitle: "",
      description: "AR visualization applications across different sectors.",
      label: "Industries",
      items: [],
      footer: "",
      subSections: [
        { title: "Manufacturing", description: "Visualize industrial equipment and machinery in physical workspaces." },
        { title: "Retail & E-commerce", description: "Enable customers to preview products in their homes before buying." },
        { title: "Architecture & Design", description: "Project architectural models and interior designs into real-world spaces." },
        { title: "Education & Training", description: "Overlay educational diagrams and interactive 3D models for students." },
        { title: "Logistics", description: "Optimize warehouse layouts and spatial planning using AR overlays." }
      ]
    },
    {
      id: "why-choose",
      title: "Why Choose Obrive",
      subtitle: "",
      description: "Enhance spatial understanding with real-time AR overlays.",
      label: "Why Choose Obrive",
      items: [],
      footer: "",
      subSections: AR_KEY_BENEFITS.map(b => ({ title: b.title, description: b.description }))
    },
    {
      id: "scope",
      title: "Use-Case Scope",
      subtitle: "",
      description: "Explore the different scopes of AR product visualization.",
      label: "Use-Case Scope",
      items: [],
      footer: "",
      subSections: [
        { title: "At-Home Try-Ons", description: "Visualize furniture, appliances, or apparel in personal spaces." },
        { title: "Industrial Equipment", description: "Preview large machinery installations on the factory floor." },
        { title: "Interior Design", description: "Experiment with room layouts and decor in real-time." },
        { title: "Maintenance Assistance", description: "Overlay service manuals and diagnostics onto physical equipment." }
      ]
    }
  ]
};

export const VIRTUAL_TRAINING = {
  hero: {
    title: "Virtual Training & Simulation",
    description:
      "Immersive, risk-free training environments for complex scenarios and equipment.",
    description2:
      "Replace costly manual methods with engaging, efficient simulations. From healthcare training to manufacturing workflows, our VR platforms provide realistic guidance.",
    ctaButtons: {
      primary: "Explore Training",
      secondary: "SCHEDULE A DEMO",
    },
  },
  workflowStepsSidebar: VR_WORKFLOW,
  howItWorks: VR_HOW_IT_WORKS,
  keyBenefits: VR_KEY_BENEFITS,
  sidebarLinks: DEFAULT_SIDEBAR_LINKS,
  serviceSections: [
    {
      id: "industries",
      title: "Industries & Applications",
      subtitle: "",
      description: "Virtual training applications across high-stakes sectors.",
      label: "Industries",
      items: [],
      footer: "",
      subSections: [
        { title: "Manufacturing", description: "Train operators on complex machinery and assembly line procedures." },
        { title: "Healthcare & Surgery", description: "Simulate surgical procedures and medical equipment handling." },
        { title: "Energy & Utilities", description: "Prepare workers for hazardous environments and emergency protocols." },
        { title: "Aviation & Aerospace", description: "Provide immersive flight simulation and maintenance training." },
        { title: "Emergency Services", description: "Recreate disaster response scenarios for safe, repeatable practice." }
      ]
    },
    {
      id: "why-choose",
      title: "Why Choose Obrive",
      subtitle: "",
      description: "Accelerate learning and reduce risks with immersive VR simulations.",
      label: "Why Choose Obrive",
      items: [],
      footer: "",
      subSections: VR_KEY_BENEFITS.map(b => ({ title: b.title, description: b.description }))
    },
    {
      id: "scope",
      title: "Use-Case Scope",
      subtitle: "",
      description: "Explore the different scopes of virtual training.",
      label: "Use-Case Scope",
      items: [],
      footer: "",
      subSections: [
        { title: "Equipment Operation", description: "Master heavy machinery and specialized tools in a safe virtual space." },
        { title: "Safety & Compliance", description: "Interactive modules for OSHA and workplace safety standards." },
        { title: "Soft Skills Training", description: "Simulate customer service, leadership, and conflict resolution scenarios." },
        { title: "Maintenance Procedures", description: "Step-by-step repair and diagnostic simulations." },
        { title: "Surgical Simulation", description: "High-fidelity anatomical models for surgical practice." }
      ]
    }
  ]
};

export const DIGITAL_TWINS = {
  hero: DIGITAL_TWINS_HERO,
  keyBenefits: DIGITAL_TWINS_KEY_BENEFITS,
  howItWorks: DIGITAL_TWINS_HOW_IT_WORKS,
  workflowStepsSidebar: DIGITAL_TWINS_WORKFLOW_STEPS_SIDEBAR,
  sidebarLinks: DIGITAL_TWINS_SIDEBAR_LINKS,
  serviceSections: DIGITAL_TWINS_SERVICE_SECTIONS,
};

export const VIRTUAL_SHOWROOMS = {
  hero: {
    title: "Virtual Showrooms",
    description:
      "Interactive, 3D retail spaces allowing customers to explore products remotely.",
    description2:
      "Redefining sales with an MR/VR showroom that delivers immersive, personalized experiences—building buyer confidence and transforming the buying journey.",
    ctaButtons: {
      primary: "Explore Showrooms",
      secondary: "SCHEDULE A DEMO",
    },
  },
  workflowStepsSidebar: OBMOVE_WORKFLOW,
  howItWorks: OBMOVE_HOW_IT_WORKS,
  keyBenefits: OBMOVE_KEY_BENEFITS,
  sidebarLinks: DEFAULT_SIDEBAR_LINKS,
  serviceSections: [
    {
      id: "industries",
      title: "Industries & Applications",
      subtitle: "",
      description: "Virtual showroom applications across retail sectors.",
      label: "Industries",
      items: [],
      footer: "",
      subSections: [
        { title: "Retail & E-commerce", description: "Interactive 3D storefronts for consumer goods and electronics." },
        { title: "Automotive", description: "Virtual car dealerships with 3D configuration and exterior walkarounds." },
        { title: "Furniture & Home Decor", description: "Immersive showrooms to explore home furnishings in realistic settings." },
        { title: "Fashion & Apparel", description: "Virtual boutiques featuring 3D garments and accessories." },
        { title: "Consumer Electronics", description: "Detailed 3D exploration of gadgets and appliances." }
      ]
    },
    {
      id: "why-choose",
      title: "Why Choose Obrive",
      subtitle: "",
      description: "Transform the buying journey with immersive, personalized showrooms.",
      label: "Why Choose Obrive",
      items: [],
      footer: "",
      subSections: OBMOVE_KEY_BENEFITS.map(b => ({ title: b.title, description: b.description }))
    },
    {
      id: "scope",
      title: "Use-Case Scope",
      subtitle: "",
      description: "Explore the different scopes of virtual showrooms.",
      label: "Use-Case Scope",
      items: [],
      footer: "",
      subSections: [
        { title: "B2C E-commerce", description: "Direct-to-consumer interactive product catalogs." },
        { title: "B2B Wholesale Showrooms", description: "Virtual exhibition spaces for bulk buyers and distributors." },
        { title: "Virtual Pop-up Stores", description: "Temporary immersive brand activations and campaigns." },
        { title: "Product Configurators", description: "Real-time customization of colors, materials, and trims." }
      ]
    }
  ]
};

export const INDOOR_NAVIGATION = {
  hero: {
    title: "Indoor Navigation",
    description:
      "AR-powered wayfinding solutions for large complex indoor environments.",
    description2:
      "Transform navigation—replacing confusing layouts with immersive AR/MR navigation, personalized discovery, and seamless assistance, so users always find what they need.",
    ctaButtons: {
      primary: "Explore Navigation",
      secondary: "SCHEDULE A DEMO",
    },
  },
  workflowStepsSidebar: OBNAVI_WORKFLOW,
  howItWorks: OBNAVI_HOW_IT_WORKS,
  keyBenefits: OBNAVI_KEY_BENEFITS,
  sidebarLinks: DEFAULT_SIDEBAR_LINKS,
  serviceSections: [
    {
      id: "industries",
      title: "Industries & Applications",
      subtitle: "",
      description: "Indoor navigation applications across complex facilities.",
      label: "Industries",
      items: [],
      footer: "",
      subSections: [
        { title: "Retail & Malls", description: "Guide shoppers to specific stores, products, and promotions." },
        { title: "Healthcare & Hospitals", description: "Help patients and visitors navigate complex hospital corridors." },
        { title: "Airports & Transit Hubs", description: "Direct travelers to gates, lounges, and baggage claim areas." },
        { title: "Corporate Campuses", description: "Assist employees and guests in finding meeting rooms and amenities." },
        { title: "Museums & Events", description: "Provide interactive, location-aware guides for exhibits and expos." }
      ]
    },
    {
      id: "why-choose",
      title: "Why Choose Obrive",
      subtitle: "",
      description: "Deliver seamless, frustration-free wayfinding with AR overlays.",
      label: "Why Choose Obrive",
      items: [],
      footer: "",
      subSections: OBNAVI_KEY_BENEFITS.map(b => ({ title: b.title, description: b.description }))
    },
    {
      id: "scope",
      title: "Use-Case Scope",
      subtitle: "",
      description: "Explore the different scopes of indoor navigation.",
      label: "Use-Case Scope",
      items: [],
      footer: "",
      subSections: [
        { title: "Retail Wayfinding", description: "Turn-by-turn directions to specific aisles and products." },
        { title: "Hospital Navigation", description: "Stress-free routing to departments and clinics." },
        { title: "Event & Expo Guides", description: "Dynamic routing to booths and speaker sessions." },
        { title: "Smart Office Navigation", description: "Integration with meeting room booking systems." },
        { title: "Facility Management", description: "Guide maintenance staff directly to service tickets." }
      ]
    }
  ]
};

export const THREE_D_PRODUCT_CONFIGURATION = {
  hero: THREE_D_PRODUCT_CONFIGURATION_HERO,
  keyBenefits: THREE_D_PRODUCT_CONFIGURATION_KEY_BENEFITS,
  howItWorks: THREE_D_PRODUCT_CONFIGURATION_HOW_IT_WORKS,
  workflowStepsSidebar: THREE_D_PRODUCT_CONFIGURATION_WORKFLOW_STEPS_SIDEBAR,
  sidebarLinks: THREE_D_PRODUCT_CONFIGURATION_SIDEBAR_LINKS,
  serviceSections: THREE_D_PRODUCT_CONFIGURATION_SERVICE_SECTIONS,
};

export const VIRTUAL_PROPERTY_TOURS = {
  hero: {
    title: "Virtual Property Tours",
    description:
      "Immersive walkthroughs of real estate properties and architectural designs.",
    description2:
      "Using MR and VR to deliver immersive, true-to-life property experiences that inspire confidence and accelerate decisions.",
    ctaButtons: {
      primary: "Explore Property Tours",
      secondary: "SCHEDULE A DEMO",
    },
  },
  workflowStepsSidebar: OBNEST_WORKFLOW,
  howItWorks: OBNEST_HOW_IT_WORKS,
  keyBenefits: OBNEST_KEY_BENEFITS,
  sidebarLinks: DEFAULT_SIDEBAR_LINKS,
  serviceSections: [
    {
      id: "industries",
      title: "Industries & Applications",
      subtitle: "",
      description: "Virtual property tour applications across real estate.",
      label: "Industries",
      items: [],
      footer: "",
      subSections: [
        { title: "Real Estate", description: "Immersive walkthroughs for residential and commercial listings." },
        { title: "Architecture & Design", description: "Pre-visualization of unbuilt spaces for client approval." },
        { title: "Hospitality & Resorts", description: "Virtual previews of hotel suites, event spaces, and amenities." },
        { title: "Commercial Property", description: "Remote office space tours for prospective tenants." },
        { title: "Construction", description: "Progress tracking and stakeholder updates via 3D models." }
      ]
    },
    {
      id: "why-choose",
      title: "Why Choose Obrive",
      subtitle: "",
      description: "Accelerate sales cycles with immersive property walkthroughs.",
      label: "Why Choose Obrive",
      items: [],
      footer: "",
      subSections: OBNEST_KEY_BENEFITS.map(b => ({ title: b.title, description: b.description }))
    },
    {
      id: "scope",
      title: "Use-Case Scope",
      subtitle: "",
      description: "Explore the different scopes of virtual property tours.",
      label: "Use-Case Scope",
      items: [],
      footer: "",
      subSections: [
        { title: "Residential Sales", description: "High-fidelity tours of homes and apartments for buyers." },
        { title: "Commercial Leasing", description: "Interactive exploration of office and retail spaces." },
        { title: "Off-Plan Development", description: "Visualize properties before construction is completed." },
        { title: "Hotel Bookings", description: "Premium virtual experiences to drive hospitality reservations." },
        { title: "Renovation Visualization", description: "Before-and-after spatial previews for remodel projects." }
      ]
    }
  ]
};

export const REMOTE_ASSISTANCE = {
  hero: REMOTE_ASSISTANCE_HERO,
  keyBenefits: REMOTE_ASSISTANCE_KEY_BENEFITS,
  howItWorks: REMOTE_ASSISTANCE_HOW_IT_WORKS,
  workflowStepsSidebar: REMOTE_ASSISTANCE_WORKFLOW_STEPS_SIDEBAR,
  sidebarLinks: REMOTE_ASSISTANCE_SIDEBAR_LINKS,
  serviceSections: REMOTE_ASSISTANCE_SERVICE_SECTIONS,
};
