const fs = require("node:fs");
const file = "src/constants/pages/resources/blog-card.ts";
let content = fs.readFileSync(file, "utf8");

// 1. Add import for getAllBlogs
if (!content.includes("import { getAllBlogs }")) {
  content = content.replace(
    'import type { StaticImageData } from "next/image";',
    'import type { StaticImageData } from "next/image";\nimport { getAllBlogs } from "@/lib/blogs";',
  );
}

// 2. Change `export const BlogCardContent = [` to `const hardcodedContent = [`
content = content.replace(
  "export const BlogCardContent = [",
  "const hardcodedContent = [",
);

// 3. Remove `] as const;` and append the combined array
content = content.replace(
  /\] as const;/g,
  `];

const jsonBlogs = getAllBlogs().map((blog) => ({
  src: "/images/blogs/blog-fallback.png",
  alt: blog.title,
  date: blog.date || "25.07.2025",
  title: blog.title,
  slug: blog.slug,
  description: (blog.sections?.[0]?.content?.[0] || "").slice(0, 150) + "...",
}));

export const BlogCardContent: BlogCardContentType[] = [
  ...hardcodedContent,
  ...jsonBlogs,
];`,
);

// 4. Update the type
content = content.replace(
  "src: StaticImageData;",
  "src: StaticImageData | string;",
);

fs.writeFileSync(file, content);
console.log("Fixed blog-card.ts");
