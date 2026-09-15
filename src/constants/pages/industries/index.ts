import {
  ICONS,
  ICONS_META,
  IMAGES,
  IMAGES_META,
  OBMOVE_IMAGES,
  OBMOVE_IMAGES_META,
  OBNEST_IMAGES,
  OBNEST_IMAGES_META,
} from "@/assets/images";

const PLACEHOLDER_WORKFLOW = [
  "Step 1: Discover",
  "Step 2: Implement",
  "Step 3: Integrate",
  "Step 4: Scale",
] as const;

const PLACEHOLDER_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Placeholder Step",
    description: "This is a placeholder description for how it works.",
    src: IMAGES.AUGMENTED_FIRST_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FIRST_IMAGE,
  },
] as const;

const PLACEHOLDER_KEY_BENEFITS = [
  {
    title: "Placeholder Benefit",
    description: "Placeholder description for key benefit.",
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
  "Step 2: Explore Vehicles in 3D",
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
      "Walk around life-sized cars, step inside, and experience interiors in detail.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Personalized Customization",
    description:
      "Instantly change trims, colors, wheels, and features to design your ideal configurations.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AR Visualization at Home",
    description:
      "Place items in your driveway, garage, or street for a realistic ownership preview.",
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
      "Experience the catalog from home, mobile, VR headsets, or physical digital kiosks.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export const REAL_ESTATE_INDUSTRY = {
  hero: {
    title: "Real Estate Industry Solutions",
    description:
      "Transform property exploration with immersive MR/VR experiences.",
    description2:
      "Every buyer has faced the same challenge: endless site visits, flat photos, and uncertainty. We use MR and VR to deliver immersive, true-to-life property experiences that inspire confidence and accelerate decisions.",
    ctaButtons: {
      primary: "Explore Real Estate",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: OBNEST_WORKFLOW,
  howItWorks: OBNEST_HOW_IT_WORKS,
  keyBenefits: OBNEST_KEY_BENEFITS,
};

export const AUTOMOTIVE_INDUSTRY = {
  hero: {
    title: "Automotive Industry Solutions",
    description:
      "Redefine vehicle showrooms and discovery with immersive technology.",
    description2:
      "Automotive buying deserves more than brochures and spec sheets. We provide a next-generation MR/VR virtual showroom platform that transforms the way customers explore, customize, and purchase vehicles.",
    ctaButtons: {
      primary: "Explore Automotive",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: OBMOVE_WORKFLOW,
  howItWorks: OBMOVE_HOW_IT_WORKS,
  keyBenefits: OBMOVE_KEY_BENEFITS,
};

export const RETAIL_INDUSTRY = {
  hero: {
    title: "Retail Industry Solutions",
    description:
      "Reimagine in-store navigation and personalized shopping experiences.",
    description2: "A placeholder secondary description for retail solutions.",
    ctaButtons: {
      primary: "Explore Retail",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};

export const HEALTHCARE_INDUSTRY = {
  hero: {
    title: "Healthcare Industry Solutions",
    description:
      "Enhance training and operational efficiency with AR/VR tools.",
    description2:
      "A placeholder secondary description for healthcare solutions.",
    ctaButtons: {
      primary: "Explore Healthcare",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};

export const MANUFACTURING_INDUSTRY = {
  hero: {
    title: "Manufacturing Industry Solutions",
    description:
      "Boost operational accuracy and remote assistance with spatial computing.",
    description2:
      "A placeholder secondary description for manufacturing solutions.",
    ctaButtons: {
      primary: "Explore Manufacturing",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};

export const ARCHITECTURE_ENGINEERING_INDUSTRY = {
  hero: {
    title: "Architecture & Engineering Solutions",
    description:
      "Enable precise 3D visualization and digital twins for complex projects.",
    description2:
      "A placeholder secondary description for architecture and engineering solutions.",
    ctaButtons: {
      primary: "Explore A&E",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};

export const EDUCATION_INDUSTRY = {
  hero: {
    title: "Education Industry Solutions",
    description:
      "Accelerate learning and adoption through immersive interactive training.",
    description2:
      "A placeholder secondary description for education solutions.",
    ctaButtons: {
      primary: "Explore Education",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};

export const ENTERPRISE_INDUSTRY = {
  hero: {
    title: "Enterprise Industry Solutions",
    description:
      "Custom spatial computing solutions tailored for large-scale enterprise needs.",
    description2:
      "A placeholder secondary description for enterprise solutions.",
    ctaButtons: {
      primary: "Explore Enterprise",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};
