import { Settings } from "lucide-react";

import { AppPagePlaceholder } from "@/components/layout/app-page-placeholder";

export default function SettingsPage() {
  return (
    <AppPagePlaceholder
      title="Settings"
      description="Update workspace identity and your personal profile."
      icon={Settings}
    />
  );
}