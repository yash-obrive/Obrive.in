import { IMAGES, IMAGES_META, ICONS, ICONS_META } from "@/assets/images";

export const SPATIAL_COMPUTING_HERO = {
  title: "Spatial Computing App Development Services.",
  description:
    "Developing spatial computing apps—AR, VR, MR, or XR—can often feel fragmented, slow, and complex. Obrive Industries simplifies this with end-to-end Spatial Computing development that accelerates delivery, strengthens collaboration, and elevates immersive experiences.",
  description2:
    "This streamlined approach minimizes manual friction, improves engagement, and speeds innovation across industries—from real estate and education to retail, healthcare, and beyond. We build solutions that seamlessly blend the digital and physical worlds.",
  ctaButtons: {
    primary: "Explore Spatial Apps",
    secondary: "BOOK CONSULTATION",
  },
};

export const SPATIAL_COMPUTING_KEY_BENEFITS = [
  {
    title: "Overview",
    description:
      "We provide end-to-end Spatial Computing development that bridges physical and digital spaces, transforming how users interact with data, products, and environments.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Immersive Pipeline Management",
    description:
      "Track every stage of your spatial computing project—from concept and prototyping to deployment—in a sleek, structured workflow designed for XR development.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Instant Interactive Demos",
    description:
      "Share links to immersive app previews—no installs, no delays—enabling clients and stakeholders to explore, collaborate, and provide feedback instantly.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
  {
    title: "Auto-Triggered Deployments",
    description:
      "Automatically launch user tests, beta previews, or live deployments to headsets and devices as soon as critical project milestones are reached.",
    src: ICONS.BOX_CHECK_ICON,
    srcMeta: ICONS_META.BOX_CHECK_ICON,
  },
] as const;

export const SPATIAL_COMPUTING_SIDEBAR_LINKS = [
  { id: "mixed-reality-apps", label: "Mixed Reality (MR) Applications" },
  { id: "spatial-web-webxr", label: "Spatial Web & WebXR" },
  { id: "wearable-tech", label: "Wearable Tech Integration" },
  { id: "spatial-ui-ux", label: "Spatial UI/UX Design" },
  { id: "location-based-xr", label: "Location-Based XR" },
  { id: "metaverse-development", label: "Metaverse Development" },
  { id: "volumetric-video", label: "Volumetric Video & Holograms" },
  { id: "spatial-audio", label: "Spatial Audio Engineering" },
] as const;

export const SPATIAL_COMPUTING_SERVICE_SECTIONS = [
  {
    id: "mixed-reality-apps",
    title: "Mixed Reality (MR) Applications",
    subtitle: "Blend Physical and Digital Realities Seamlessly",
    description:
      "Mixed Reality (MR) anchors digital objects to the real world, allowing them to interact with physical environments. We develop advanced MR applications for headsets like Apple Vision Pro and Meta Quest, creating experiences where digital content is aware of physical geometry.",
    label: "We build MR applications for",
    items: [
      "Apple Vision Pro development",
      "Meta Quest MR apps",
      "HoloLens enterprise solutions",
      "Interactive room mapping",
      "Physical-digital workflows",
      "MR remote collaboration",
      "Medical MR visualization",
      "Industrial MR maintenance",
      "Spatial data visualization",
    ],
    footer:
      "Our MR solutions utilize spatial anchors, plane detection, and scene understanding to create truly immersive computing experiences.",
  },
  {
    id: "spatial-web-webxr",
    title: "Spatial Web & WebXR",
    subtitle: "Immersive Experiences Directly in the Browser",
    description:
      "The Spatial Web brings 3D, AR, and VR directly into the web browser without requiring users to download apps. We develop WebXR solutions that allow users to access spatial content instantly across desktop, mobile, and XR headsets from a single web link.",
    label: "Our WebXR capabilities include",
    items: [
      "Browser-based AR/VR",
      "Cross-device spatial sites",
      "Web-based 3D configurators",
      "XR e-commerce integration",
      "WebXR virtual tours",
      "Interactive 3D landing pages",
      "Spatial storytelling",
      "Web-based multiplayer XR",
      "Performance-optimized WebGL",
    ],
    footer:
      "By leveraging WebXR, we drastically reduce friction and increase user adoption for spatial computing campaigns and tools.",
  },
  {
    id: "wearable-tech",
    title: "Wearable Tech Integration",
    subtitle: "Connect Spatial Apps to the Internet of Things",
    description:
      "Spatial computing is most powerful when connected to real-world data. We integrate spatial applications with wearable technology, IoT sensors, and haptic feedback devices to create a cohesive ecosystem where digital environments react to physical inputs.",
    label: "Wearable & IoT integrations",
    items: [
      "Smartwatch spatial controls",
      "Haptic glove integration",
      "Biometric data visualization",
      "IoT sensor overlays",
      "Spatial fitness applications",
      "Real-time machine telemetry",
      "BLE beacon tracking",
      "Smart glasses applications",
      "Connected health XR",
    ],
    footer:
      "We bridge the gap between hardware sensors and immersive software, creating responsive, data-driven spatial experiences.",
  },
  {
    id: "spatial-ui-ux",
    title: "Spatial UI/UX Design",
    subtitle: "Design Intuitive Interfaces for 3D Environments",
    description:
      "Designing for spatial computing requires abandoning 2D screen paradigms. We design spatial user interfaces (UI) and user experiences (UX) that leverage depth, gaze tracking, hand gestures, and voice commands. Our designs prioritize ergonomics, legibility, and intuitive interaction.",
    label: "Spatial design expertise",
    items: [
      "Eye-tracking interfaces",
      "Hand gesture controls",
      "Spatial typography",
      "Ergonomic 3D menus",
      "Voice-activated UI",
      "Haptic feedback design",
      "Spatial wireframing",
      "Accessibility in XR",
      "Diegetic interface design",
    ],
    footer:
      "Our UI/UX team ensures that your spatial applications are not just visually impressive, but comfortable and easy to use for extended periods.",
  },
  {
    id: "location-based-xr",
    title: "Location-Based XR",
    subtitle: "Transform Physical Locations with Digital Layers",
    description:
      "Location-Based XR anchors spatial content to specific geographic coordinates or physical venues. We develop experiences for stadiums, museums, cities, and retail stores where users can discover digital content that is persistently tied to their real-world location.",
    label: "Location-Based XR solutions",
    items: [
      "City-scale AR experiences",
      "Museum spatial tours",
      "Stadium XR activations",
      "Geospatial AR (VPS)",
      "Theme park MR attractions",
      "Interactive retail spaces",
      "Historical site overlays",
      "Campus navigation apps",
      "Persistent spatial anchors",
    ],
    footer:
      "Using Visual Positioning Systems (VPS) and advanced GPS, we ensure digital content is millimeter-accurate to the physical world.",
  },
  {
    id: "metaverse-development",
    title: "Metaverse Development",
    subtitle: "Build Your Presence in Virtual Worlds",
    description:
      "The Metaverse represents the next evolution of social and corporate interaction. We build persistent, multi-user virtual environments where brands, communities, and enterprises can host events, sell digital goods, and collaborate in shared 3D spaces.",
    label: "Metaverse services",
    items: [
      "Custom virtual worlds",
      "Metaverse event hosting",
      "Digital twin offices",
      "Avatar creation & rigging",
      "Blockchain/Web3 integration",
      "Virtual commerce storefronts",
      "Cross-platform social XR",
      "Brand activations in XR",
      "Persistent digital economies",
    ],
    footer:
      "We help brands navigate the complexities of virtual worlds, building scalable environments that foster genuine digital communities.",
  },
  {
    id: "volumetric-video",
    title: "Volumetric Video & Holograms",
    subtitle: "Capture Reality in True 3D",
    description:
      "Volumetric video captures real people and performances in 3D, allowing them to be viewed from any angle in spatial computing environments. We integrate volumetric captures and holographic performances into AR and VR applications for unparalleled realism.",
    label: "Volumetric applications",
    items: [
      "Holographic performances",
      "Volumetric sports replays",
      "Lifelike virtual guides",
      "Immersive documentaries",
      "XR music videos",
      "Volumetric training actors",
      "Holographic telepresence",
      "Digital human integration",
      "Point cloud visualization",
    ],
    footer:
      "We work with leading volumetric capture studios to compress and optimize heavy holographic data for smooth playback on mobile and XR headsets.",
  },
  {
    id: "spatial-audio",
    title: "Spatial Audio Engineering",
    subtitle: "Design Sound That Lives in the Environment",
    description:
      "In spatial computing, audio is just as important as visuals for creating presence. We design and implement spatial audio that reacts to head tracking and environment geometry, ensuring that sound comes from the correct 3D location and bounces realistically off virtual walls.",
    label: "Spatial audio services",
    items: [
      "Ambisonic sound design",
      "Head-tracked audio",
      "Acoustic ray tracing",
      "Interactive soundscapes",
      "HRTF implementation",
      "Voice chat spatialization",
      "Audio-driven haptics",
      "Virtual acoustic environments",
      "XR mixing & mastering",
    ],
    footer:
      "Our audio engineers use advanced spatialization tools to create soundscapes that guide user attention and deepen immersion.",
  },
];

export const SPATIAL_COMPUTING_PROCESS_STEPS = [
  {
    step: "01",
    title: "Spatial Workflow Strategy",
    description:
      "Organize your development pipeline—concept, prototype, review, beta, deployment—with a clear roadmap tailored to spatial computing constraints and hardware targets.",
  },
  {
    step: "02",
    title: "Design & Interactive Previews",
    description:
      "Our team designs spatial UI/UX and 3D assets. Clients access immersive demos through a branded portal, interacting with the app and giving visual feedback in real-time.",
  },
  {
    step: "03",
    title: "Develop & Automate",
    description:
      "We build the spatial application using industry-leading engines. Post-feedback, updates and testing environments are triggered automatically—pushing your project forward.",
  },
  {
    step: "04",
    title: "Approve & Integrate",
    description:
      "Collect final approvals, archive versions, and push deliverables into your asset libraries, app stores, or enterprise MDM solutions for seamless deployment.",
  },
] as const;

export const SPATIAL_COMPUTING_WORKFLOW_STEPS_SIDEBAR = [
  "Step 1: Structure Your Spatial App Workflow",
  "Step 2: Share Interactive Previews",
  "Step 3: Automate Iteration & Launch",
  "Step 4: Approve & Integrate",
];

export const SPATIAL_COMPUTING_HOW_IT_WORKS = [
  {
    step: "01",
    title: "1. Spatial Workflow",
    description:
      "Organize your development pipeline—concept, prototype, review, beta, deployment—with automated stage tracking and timeline visibility.",
    src: IMAGES.SPATIAL_FIRST_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_FIRST_IMAGE,
  },
  {
    step: "02",
    title: "2. Interactive Previews",
    description:
      "Clients and stakeholders access immersive demos through a branded portal, interacting with the app and giving visual feedback in real-time.",
    src: IMAGES.SPATIAL_SECOND_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_SECOND_IMAGE,
  },
  {
    step: "03",
    title: "3. Automated Launch",
    description:
      "Post-feedback, updates and testing environments are triggered automatically—pushing your project forward without manual coordination.",
    src: IMAGES.SPATIAL_THIRD_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_THIRD_IMAGE,
  },
  {
    step: "04",
    title: "4. Approve & Integrate",
    description:
      "Collect final approvals within the portal, archive versions, and push deliverables into your asset libraries or customer environments effortlessly.",
    src: IMAGES.SPATIAL_FOURTH_IMAGE,
    srcMeta: IMAGES_META.SPATIAL_FOURTH_IMAGE,
  },
] as const;
