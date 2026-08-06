import { FileCheck2 } from "lucide-react";

import { AppPagePlaceholder } from "@/components/layout/app-page-placeholder";

export default function ApprovalsPage() {
  return (
    <AppPagePlaceholder
      title="Approvals"
      description="Review materials waiting for client feedback or approval."
      icon={FileCheck2}
    />
  );
}