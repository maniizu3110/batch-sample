"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    displayName: "John Doe",
    email: "john@example.com",
    language: "en",
    timezone: "Asia/Tokyo",
    notifications: true,
    darkMode: false,
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleToggle = (field: string) => () => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-6">
        <Card title="Profile Settings">
          <Input label="Display Name" value={settings.displayName} onChange={handleInputChange("displayName")} />
          <Input label="Email" type="email" value={settings.email} onChange={handleInputChange("email")} />
        </Card>

        <Card title="Preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email notifications for updates</p>
              </div>
              <button
                onClick={handleToggle("notifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Use dark theme for the interface</p>
              </div>
              <button
                onClick={handleToggle("darkMode")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        <Card title="Danger Zone">
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="danger">Delete Account</Button>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
