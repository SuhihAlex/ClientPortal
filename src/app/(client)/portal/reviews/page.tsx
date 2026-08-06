import { FileCheck2 } from "lucide-react";

import { ClientPagePlaceholder } from "@/components/portal/client-page-placeholder";

export default function ClientReviewsPage() {
  return (
    <ClientPagePlaceholder
      title="Reviews"
      description="Review materials, request changes, or approve completed work."
      icon={FileCheck2}
    />
  );
}