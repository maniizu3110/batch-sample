"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <Input label="Name" placeholder="Your name" value={formData.name} onChange={handleChange("name")} required />
      <Input label="Email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange("email")} required />
      <Input label="Subject" placeholder="Subject" value={formData.subject} onChange={handleChange("subject")} required />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange("message")}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <Button variant="primary" size="lg">Send Message</Button>
    </form>
  );
}
