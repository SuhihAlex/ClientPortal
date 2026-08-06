import type { ReactNode } from "react";

import { ClientHeader } from "@/components/layout/client-header";

export default function ClientPortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <ClientHeader />

      <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {children}
      </main>
    </div>
  );
}