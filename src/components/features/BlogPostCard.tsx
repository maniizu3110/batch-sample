import React from "react";
import Badge from "../ui/Badge";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export default function BlogPostCard({
  title,
  excerpt,
  author,
  date,
  category,
  readTime,
}: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge color="blue">{category}</Badge>
          <span className="text-sm text-gray-500">{readTime}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{author}</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
}
