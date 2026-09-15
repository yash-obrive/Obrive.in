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
};

export const DIGITAL_TWINS = {
  hero: {
    title: "Digital Twins",
    description:
      "Create exact virtual replicas of physical assets, systems, or environments.",
    description2: "Placeholder secondary description for digital twins.",
    ctaButtons: {
      primary: "Explore Digital Twins",
      secondary: "SCHEDULE A DEMO",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
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
};

export const THREE_D_PRODUCT_CONFIGURATION = {
  hero: {
    title: "3D Product Configurators",
    description:
      "Allow customers to customize and interact with 3D product models in real-time.",
    description2:
      "Placeholder secondary description for 3D product configurators.",
    ctaButtons: {
      primary: "Explore Configurators",
      secondary: "SCHEDULE A DEMO",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
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
};

export const REMOTE_ASSISTANCE = {
  hero: {
    title: "Remote Assistance",
    description:
      "AR-guided visual support and collaboration for field technicians and experts.",
    description2: "Placeholder secondary description for remote assistance.",
    ctaButtons: {
      primary: "Explore Remote Assistance",
      secondary: "SCHEDULE A DEMO",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};
