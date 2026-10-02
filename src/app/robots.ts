import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
      {
        // Allow responsible AI search agents to index our canonical public AI endpoints
        userAgent: ["OAI-SearchBot", "GPTBot", "Google-Extended"],
        allow: ["/llms.txt", "/llms-full.txt", "/ai/knowledge.json"],
      }
    ],
    sitemap: "https://obrive.com/sitemap.xml",
  };
}
