import { CreditCard } from "lucide-react";

import { AppPagePlaceholder } from "@/components/layout/app-page-placeholder";

export default function BillingPage() {
  return (
    <AppPagePlaceholder
      title="Billing"
      description="Review your current plan, limits, and subscription."
      icon={CreditCard}
    />
  );
}