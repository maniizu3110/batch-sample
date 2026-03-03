import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface UserProfileProps {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export default function UserProfile({ name, email, role, avatarUrl }: UserProfileProps) {
  return (
    <Card title={name} description={email}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full rounded-full" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <Badge color="blue">{role}</Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm">Edit Profile</Button>
        <Button variant="secondary" size="sm">Message</Button>
      </div>
    </Card>
  );
}
