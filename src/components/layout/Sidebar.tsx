import React from "react";
import Link from "next/link";

interface SidebarItem {
  href: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeHref?: string;
}

export default function Sidebar({ items, activeHref }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              activeHref === item.href
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
