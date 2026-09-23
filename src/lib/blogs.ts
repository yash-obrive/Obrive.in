import blogsData from "@/data/blogs.json";

export interface BlogSection {
  title: string;
  content: string[];
}

export interface Blog {
  slug: string;
  title: string;
  read_time: string;
  author: string;
  category: string;
  cta: string;
  sections: BlogSection[];
}

export function getAllBlogs(): Blog[] {
  return blogsData as Blog[];
}

export function getBlogBySlug(slug: string): Blog | undefined {
  const blogs = getAllBlogs();
  return blogs.find((blog) => blog.slug === slug);
}

export function getBlogsByCategory(category: string): Blog[] {
  const blogs = getAllBlogs();
  return blogs.filter((blog) => blog.category === category);
}

export function getAllCategories(): string[] {
  const blogs = getAllBlogs();
  const categories = new Set(blogs.map((b) => b.category));
  return Array.from(categories).filter(Boolean).sort();
}
