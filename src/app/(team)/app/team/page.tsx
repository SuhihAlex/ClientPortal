import { Users } from "lucide-react";

import { AppPagePlaceholder } from "@/components/layout/app-page-placeholder";

export default function TeamPage() {
  return (
    <AppPagePlaceholder
      title="Team"
      description="Manage workspace members, invitations, and fixed roles."
      actionLabel="Invite member"
      icon={Users}
    />
  );
}