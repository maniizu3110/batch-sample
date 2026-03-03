import BlogPostCard from "@/components/features/BlogPostCard";

const posts = [
  {
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and build your first application with App Router and server components.",
    author: "Alice",
    date: "2026-03-01",
    category: "Tutorial",
    readTime: "5 min read",
  },
  {
    title: "Understanding React Server Components",
    excerpt: "Deep dive into React Server Components and how they change the way we build web applications.",
    author: "Bob",
    date: "2026-02-28",
    category: "Technical",
    readTime: "8 min read",
  },
  {
    title: "Tailwind CSS Best Practices",
    excerpt: "Tips and tricks for writing clean, maintainable Tailwind CSS in your React applications.",
    author: "Charlie",
    date: "2026-02-25",
    category: "Design",
    readTime: "4 min read",
  },
  {
    title: "TypeScript Tips for Next.js",
    excerpt: "Essential TypeScript patterns and configurations for productive Next.js development.",
    author: "Diana",
    date: "2026-02-20",
    category: "Technical",
    readTime: "6 min read",
  },
  {
    title: "Building Accessible Components",
    excerpt: "How to create reusable UI components that are accessible to everyone.",
    author: "Alice",
    date: "2026-02-15",
    category: "Accessibility",
    readTime: "7 min read",
  },
  {
    title: "Deploying Next.js to Vercel",
    excerpt: "Step-by-step guide to deploying your Next.js application to Vercel with custom domains.",
    author: "Bob",
    date: "2026-02-10",
    category: "DevOps",
    readTime: "3 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
}
