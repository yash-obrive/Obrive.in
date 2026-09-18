// Server-side source of truth for pricing packages.
// Ensures that prices cannot be manipulated by the client.

const PRICING_PACKAGES = [
  // Immersive & Spatial
  { id: "ar", name: "AR Experience", priceINR: 150000, category: "Immersive" },
  { id: "vr", name: "VR Experience", priceINR: 250000, category: "Immersive" },
  { id: "mr", name: "MR Experience", priceINR: 350000, category: "Enterprise" },
  { id: "3d", name: "3D Visualization", priceINR: 100000, category: "3D" },
  { id: "spatial", name: "Spatial Computing", priceINR: 500000, category: "Spatial" },

  // Digital Product Design
  { id: "website-design", name: "Website Design", priceINR: 100000, category: "Web" },
  { id: "mobile-design", name: "Mobile App Design", priceINR: 150000, category: "Mobile" },
  { id: "product-design", name: "Product UX/UI System", priceINR: 250000, category: "Product" },

  // Software Engineering
  { id: "website-development", name: "Website Development", priceINR: 250000, category: "Engineering" },
  { id: "mobile-development", name: "Mobile App Development", priceINR: 450000, category: "Mobile Engineering" },
  { id: "saas", name: "Web App / SaaS MVP", priceINR: 500000, category: "SaaS / MVP" },
  { id: "platform", name: "Custom Digital Platform", priceINR: 700000, category: "Enterprise" },

  // Note: Monthly retainers (Growth Launch, Growth Engine, Digital Growth Partner) 
  // are NOT handled by this one-time payment integration per user instructions.
];

const getPackageDetails = (packageId) => {
  return PRICING_PACKAGES.find((pkg) => pkg.id === packageId);
};

module.exports = {
  PRICING_PACKAGES,
  getPackageDetails,
};
