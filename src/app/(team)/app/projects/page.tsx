import { FolderKanban } from "lucide-react";

import { AppPagePlaceholder } from "@/components/layout/app-page-placeholder";

export default function ProjectsPage() {
  return (
    <AppPagePlaceholder
      title="Projects"
      description="Track project progress, stages, deadlines, and participants."
      actionLabel="New project"
      icon={FolderKanban}
    />
  );
}