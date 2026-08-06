import { Files } from "lucide-react";

import { ClientPagePlaceholder } from "@/components/portal/client-page-placeholder";

export default function ClientFilesPage() {
  return (
    <ClientPagePlaceholder
      title="Files"
      description="Access and download the files shared with you."
      icon={Files}
    />
  );
}