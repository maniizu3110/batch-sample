import React from "react";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Card({ title, description, children, footer }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        {children}
      </div>
      {footer && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}
