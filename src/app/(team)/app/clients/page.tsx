import { UsersRound } from "lucide-react";

import { AppPagePlaceholder } from "@/components/layout/app-page-placeholder";

export default function ClientsPage() {
  return (
    <AppPagePlaceholder
      title="Clients"
      description="Manage client companies, contacts, and active projects."
      actionLabel="Add client"
      icon={UsersRound}
    />
  );
}