import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:px-12">
        <BrandLogo />

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2026 ClientPortal
        </p>
      </div>

      <aside className="relative hidden overflow-hidden bg-[#111827] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,130,200,0.24),transparent_45%)]" />

        <div className="relative">
          <p className="text-sm font-medium text-slate-300">
            Built for client-facing teams
          </p>

          <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.045em]">
            Turn every client interaction into a clearer, more professional experience.
          </h2>
        </div>

        <div className="relative grid gap-3">
          {[
            "Projects and deadlines in one view",
            "Files and approvals with context",
            "Separate studio and client access",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}