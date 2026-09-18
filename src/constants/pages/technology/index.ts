import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

const PLACEHOLDER_WORKFLOW = [
  "Step 1: Evaluate Technology",
  "Step 2: Design Architecture",
  "Step 3: Develop & Integrate",
  "Step 4: Deploy & Scale"
] as const;

const PLACEHOLDER_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Placeholder Technology Step",
    description: "This is a placeholder description for how this technology works.",
    src: IMAGES.AUGMENTED_FIRST_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FIRST_IMAGE,
  },
] as const;

const PLACEHOLDER_KEY_BENEFITS = [
  {
    title: "Placeholder Benefit",
    description: "Placeholder description for key benefit of this technology.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

const AR_WORKFLOW = [
  "Step 1: Precise Visualization",
  "Step 2: Guided Support",
  "Step 3: Visual Collaboration",
  "Step 4: Monitor Approvals"
] as const;

const AR_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Precise Visualization",
    description: "Overlay contextual 3D models or step-by-step instructions directly onto physical workspaces—eliminating guesswork and improving accuracy.",
    src: IMAGES.AUGMENTED_FIRST_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Guided Support",
    description: "Enable field technicians, trainees, or remote collaborators to receive live AR annotations, voice prompts, and interactive cues in real time.",
    src: IMAGES.AUGMENTED_SECOND_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Visual Collaboration",
    description: "Utilize a branded AR portal for secure sharing of AR projects—allowing clients and team members to view, interact, and provide feedback.",
    src: IMAGES.AUGMENTED_THIRD_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Monitor Approvals",
    description: "Embed digital sign-off options and usage tracking within AR experiences, ensuring accountability, compliance, and seamless handoffs.",
    src: IMAGES.AUGMENTED_FOURTH_IMAGE,
    srcMeta: IMAGES_META.AUGMENTED_FOURTH_IMAGE,
  },
] as const;

const AR_KEY_BENEFITS = [
  {
    title: "Speed & Efficiency",
    description: "Slash training and onboarding time with immersive, in‑situ AR guidance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Enhanced Accuracy",
    description: "Real‑time overlays reduce human errors and support compliance.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Scalability",
    description: "Deploy across facilities or client sites with minimal setup and cost.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Stronger Engagement",
    description: "Interactive visuals foster deeper understanding and retention.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Unified Workflow",
    description: "Integrate with core business systems for seamless data‑driven AR delivery.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  }
] as const;

const VR_WORKFLOW = [
  "Step 1: Build VR Workflows",
  "Step 2: Launch & Train",
  "Step 3: Secure Collaboration",
  "Step 4: Track & Improve"
] as const;

const VR_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Build VR Workflows",
    description: "Build immersive simulations tailored to your operational environment—whether it's factory line training, equipment handling, or virtual inspections.",
    src: IMAGES.VIRTUAL_FIRST_IMAGE,
    srcMeta: IMAGES_META.VIRTUAL_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Launch & Train",
    description: "Deploy VR experiences to teams, with interactive guidance, prompts, and embedded AI-driven assistance that adapts to user performance.",
    src: IMAGES.VIRTUAL_SECOND_IMAGE,
    srcMeta: IMAGES_META.VIRTUAL_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Secure Collaboration",
    description: "Use a branded client portal to invite stakeholders, review recorded sessions, share feedback, and track progress in a modern VR interface.",
    src: IMAGES.VIRTUAL_THIRD_IMAGE,
    srcMeta: IMAGES_META.VIRTUAL_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Track & Improve",
    description: "Automatically capture performance metrics and user feedback directly from VR sessions, supporting analytics, certification, and continuous improvement.",
    src: IMAGES.VIRTUAL_FOURTH_IMAGE,
    srcMeta: IMAGES_META.VIRTUAL_FOURTH_IMAGE,
  },
] as const;

const VR_KEY_BENEFITS = [
  {
    title: "Immersive Engagement",
    description: "Interactive 3D environments foster deeper understanding and retention over manual methods.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Risk-Free Simulation",
    description: "Provide safe, realistic, step-by-step guidance that enhances accuracy and reduces risks.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Scalability",
    description: "Enable enterprises to accelerate adoption and achieve measurable results across teams.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AI-Guided Feedback",
    description: "Automatically analyse user actions and deliver contextual guidance and recommendations.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Automated Triggers",
    description: "Automatically launch VR simulations when milestones or project phase transitions are reached.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  }
] as const;

const SC_WORKFLOW = [
  "Step 1: Structure Your Spatial App Workflow",
  "Step 2: Share Interactive Previews",
  "Step 3: Automate Iteration & Launch",
  "Step 4: Approve & Integrate"
] as const;

const SC_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Spatial Workflow",
    description: "Organize your development pipeline—concept, prototype, review, beta, deployment—with automated stage tracking and timeline visibility.",
    src: IMAGES.SPATIAL_FIRST_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Interactive Previews",
    description: "Clients and stakeholders access immersive demos through a branded portal, interacting with the app and giving visual feedback in real-time.",
    src: IMAGES.SPATIAL_SECOND_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Automated Launch",
    description: "Post-feedback, updates and testing environments are triggered automatically—pushing your project forward without manual coordination.",
    src: IMAGES.SPATIAL_THIRD_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Approve & Integrate",
    description: "Collect final approvals within the portal, archive versions, and push deliverables into your asset libraries or customer environments effortlessly.",
    src: IMAGES.SPATIAL_FOURTH_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_FOURTH_IMAGE,
  },
] as const;

const SC_KEY_BENEFITS = [
  {
    title: "Immersive Pipeline Management",
    description: "Track every stage of your spatial computing project—from concept and prototyping to deployment.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Intelligent Progress Forecasting",
    description: "Leverage real-time analytics that forecast delivery timelines, highlight bottlenecks, and ensure smooth rollout.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AI-Driven Insight & Guidance",
    description: "Automatically analyze interactions, detect engagement drops, and adjustments to optimize VR/AR experiences.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Auto-Triggered Deployments",
    description: "Automatically launch user tests, beta previews, or live deployments as soon as milestones are reached.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Instant Interactive Demos",
    description: "Share links to immersive app previews—no installs, no delays—enabling clients to explore and collaborate.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  }
] as const;

const THREE_D_WORKFLOW = [
  "Step 1: Centralize Your Design Workflow",
  "Step 2: Review & Revise with Precision",
  "Step 3: Iterate Automatically",
  "Step 4: Approve, Integrate & Deliver"
] as const;

const THREE_D_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Unified Workflow",
    description: "Set up a connected pipeline that tracks each 3D asset from wireframe to final render—automating status updates, task assignments, and visibility.",
    src: IMAGES.THREE_D_FIRST_IMAGE,
    srcMeta: IMAGES_META.THREE_D_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Accurate Review",
    description: "Clients and team members comment directly on 3D previews through a sleek portal. AI-powered suggestions surface improvements or flag errors in real-time.",
    src: IMAGES.THREE_D_SECOND_IMAGE,
    srcMeta: IMAGES_META.THREE_D_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Smart Iteration",
    description: "Once revisions are approved, the next version is rendered and shared automatically—keeping delivery moving without manual intervention.",
    src: IMAGES.THREE_D_THIRD_IMAGE,
    srcMeta: IMAGES_META.THREE_D_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Approve & Deliver",
    description: "Capture client approval, log version history, and push final assets to downstream systems—smoothing handoffs and archiving for compliance.",
    src: IMAGES.THREE_D_FOURTH_IMAGE,
    srcMeta: IMAGES_META.THREE_D_FOURTH_IMAGE,
  },
] as const;

const THREE_D_KEY_BENEFITS = [
  {
    title: "Structured Project Pipeline",
    description: "Monitor every design stage—concept, prototyping, review, revision—with clarity and precision.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Auto-Launch Iterations",
    description: "Trigger revised renders or next-stage assets automatically when a project moves into approved-for-production status.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Instant Collaborative Reviews",
    description: "Share interactive previews via unique links—no downloads, no setup—enabling clients to comment and collaborate instantly.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Intelligent Progress Forecasting",
    description: "Leverage data signals (feedback speed, approval delays, revision cycles) to anticipate project status and spot bottlenecks early.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "AI-Driven Design Feedback",
    description: "Detect inconsistencies, recommend optimizations, and flag issues (e.g., geometry errors, lighting anomalies) through automated analysis.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  }
] as const;

export const AUGMENTED_REALITY = {
  hero: {
    title: "Augmented Reality",
    description: "Overlay digital information onto the physical world for enhanced experiences.",
    description2: "Bring manuals, instructions, and collaboration directly into physical workspaces to eliminate guesswork, speed up training, and improve operational accuracy.",
    ctaButtons: {
      primary: "Explore AR",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: AR_WORKFLOW,
  howItWorks: AR_HOW_IT_WORKS,
  keyBenefits: AR_KEY_BENEFITS,
};

export const VIRTUAL_REALITY = {
  hero: {
    title: "Virtual Reality",
    description: "Immerse users in entirely digital, fully interactive 3D environments.",
    description2: "Transform how industries train, collaborate, and operate. Create interactive 3D environments to replace costly manual methods with engaging, efficient simulations.",
    ctaButtons: {
      primary: "Explore VR",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: VR_WORKFLOW,
  howItWorks: VR_HOW_IT_WORKS,
  keyBenefits: VR_KEY_BENEFITS,
};

export const MIXED_REALITY = {
  hero: {
    title: "Mixed Reality",
    description: "Blend physical and digital worlds to create complex interactive environments.",
    description2: "Placeholder secondary description for Mixed Reality technology.",
    ctaButtons: {
      primary: "Explore MR",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};

export const EXTENDED_REALITY = {
  hero: {
    title: "Extended Reality",
    description: "The overarching umbrella bridging AR, VR, and MR into cohesive spatial systems.",
    description2: "Placeholder secondary description for Extended Reality technology.",
    ctaButtons: {
      primary: "Explore XR",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};

export const SPATIAL_COMPUTING = {
  hero: {
    title: "Spatial Computing",
    description: "Seamlessly map and interact with digital elements in 3D physical space.",
    description2: "Simplify end-to-end Spatial Computing development to accelerate delivery, strengthen collaboration, and elevate immersive experiences across sectors.",
    ctaButtons: {
      primary: "Explore Spatial Computing",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: SC_WORKFLOW,
  howItWorks: SC_HOW_IT_WORKS,
  keyBenefits: SC_KEY_BENEFITS,
};

export const DIGITAL_TWINS = {
  hero: {
    title: "Digital Twins",
    description: "Real-time, interactive virtual replicas for monitoring and simulating physical assets.",
    description2: "Placeholder secondary description for Digital Twins technology.",
    ctaButtons: {
      primary: "Explore Digital Twins",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};

export const THREE_D_VISUALIZATION = {
  hero: {
    title: "3D Visualization",
    description: "High-fidelity rendering and interactive modeling for products and spaces.",
    description2: "Redefine traditional 3D workflows with a unified platform that streamlines stages, accelerates collaboration, and improves quality across your entire design pipeline.",
    ctaButtons: {
      primary: "Explore 3D Visualization",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: THREE_D_WORKFLOW,
  howItWorks: THREE_D_HOW_IT_WORKS,
  keyBenefits: THREE_D_KEY_BENEFITS,
};

export const AI_IMMERSIVE_TECHNOLOGY = {
  hero: {
    title: "AI + Immersive Technology",
    description: "Integrating Artificial Intelligence into AR/VR for smarter, adaptive interactions.",
    description2: "Placeholder secondary description for AI + Immersive Technology.",
    ctaButtons: {
      primary: "Explore AI + Immersive Tech",
      secondary: "SCHEDULE A CONSULTATION",
    },
  },
  workflowStepsSidebar: PLACEHOLDER_WORKFLOW,
  howItWorks: PLACEHOLDER_HOW_IT_WORKS,
  keyBenefits: PLACEHOLDER_KEY_BENEFITS,
};
