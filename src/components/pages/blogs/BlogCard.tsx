import Image from "next/image";
import Link from "next/link";
import FONTS from "@/assets/fonts";
import { Blog } from "@/lib/blogs";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  // Extract a short preview text from the first section
  const getPreview = () => {
    if (blog.sections && blog.sections.length > 0 && blog.sections[0].content.length > 0) {
      return blog.sections[0].content[0];
    }
    return "";
  };

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block h-full"
      aria-label={`Read blog: ${blog.title}`}
    >
      <div className="group bg-card rounded-2xl p-6 max-w-sm transition-colors duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg group-hover:bg-accent h-full flex flex-col mx-auto w-full">
        
        {/* Blog Image */}
        <div className="relative rounded-xl overflow-hidden mb-6 flex-shrink-0 w-full aspect-video flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-gray-100">
           <Image
             src="/images/blogs/blog-fallback.png"
             alt={blog.title}
             fill
             className="object-cover"
           />
           
          {/* overlay that appears on hover / focus */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 translate-y-2 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-300 pointer-events-none">
            <span className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-black/60">
              Read Blog
            </span>
          </div>
        </div>

        <div className="flex text-[10px] sm:text-xs items-center justify-between px-1 mb-4 text-muted-foreground flex-shrink-0">
          <span className="uppercase tracking-wide line-clamp-1 mr-2 font-medium">{blog.category}</span>
          <span className="flex-shrink-0 text-accent-foreground font-medium">{blog.read_time}</span>
        </div>

        <div className="space-y-3 flex-grow px-1">
          <h3
            className={`${FONTS.microgrammaBold.className} text-lg font-bold text-foreground leading-tight transition-colors duration-200 group-hover:text-accent-foreground line-clamp-3`}
          >
            {blog.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-accent-foreground/90 line-clamp-3">
            {getPreview()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
