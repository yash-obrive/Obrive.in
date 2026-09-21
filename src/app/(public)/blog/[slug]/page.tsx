import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import BlogDetail from "@/components/pages/blogs/BlogDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params; const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${blog.title} | Obrive Blog`,
    description: blog.sections[0]?.content[0] || "Read more about this topic.",
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params; const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-white">
      <BlogDetail blog={blog} />
    </main>
  );
}
