import type { ReactNode } from "react";

import { StudioSidebar } from "@/components/layout/studio-sidebar";
import { StudioTopbar } from "@/components/layout/studio-topbar";

export default function StudioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <StudioSidebar />

      <div className="min-h-screen lg:pl-[268px]">
        <StudioTopbar />

        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}