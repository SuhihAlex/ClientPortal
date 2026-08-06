import { Files } from "lucide-react";

import { AppPagePlaceholder } from "@/components/layout/app-page-placeholder";

export default function FilesPage() {
  return (
    <AppPagePlaceholder
      title="Files"
      description="Browse files across projects and control client visibility."
      actionLabel="Upload file"
      icon={Files}
    />
  );
}