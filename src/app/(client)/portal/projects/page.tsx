import { FolderKanban } from "lucide-react";

import { ClientPagePlaceholder } from "@/components/portal/client-page-placeholder";

export default function ClientProjectsPage() {
  return (
    <ClientPagePlaceholder
      title="Projects"
      description="View your active and completed projects."
      icon={FolderKanban}
    />
  );
}