import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  LogOut,
  Sparkles,
} from "lucide-react";

import { BrandLogo } from "@/components/brand";
import { StudioNavigation } from "@/components/navigation/studio-navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function StudioSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[268px] overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_20%_0%,rgba(112,145,219,0.14),transparent_65%)]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex h-20 shrink-0 items-center border-b border-sidebar-border px-5">
        <BrandLogo
          href="/app"
          className="[&_span:last-child]:text-white"
        />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col px-4 py-5">
        <WorkspaceSwitcher />

        <div className="sidebar-scroll mt-6 min-h-0 flex-1 overflow-y-auto pr-1">
          <StudioNavigation />
        </div>

        <div className="shrink-0 border-t border-sidebar-border pt-4">
          <PlanUsage />
        </div>
      </div>

      <SidebarAccount />
    </aside>
  );
}

function WorkspaceSwitcher() {
  return (
    <button
      type="button"
      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px hover:border-white/[0.12] hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-sidebar-ring"
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_45%)]"
        aria-hidden="true"
      />

      <Avatar className="relative z-10 size-10 rounded-xl">
        <AvatarFallback className="rounded-xl bg-white text-xs font-semibold text-sidebar shadow-sm">
          NS
        </AvatarFallback>
      </Avatar>

      <span className="relative z-10 min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-white">
          Northline Studio
        </span>

        <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-sidebar-foreground/40">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Studio workspace
        </span>
      </span>

      <span className="relative z-10 flex size-7 items-center justify-center rounded-lg text-sidebar-foreground/35 transition-colors group-hover:bg-white/[0.06] group-hover:text-white">
        <ChevronDown className="size-4" />
      </span>
    </button>
  );
}

function PlanUsage() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <div
        className="pointer-events-none absolute -right-10 -top-12 size-28 rounded-full bg-sidebar-primary/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-sidebar-primary/15 text-sidebar-primary">
              <Sparkles className="size-3.5" />
            </span>

            <div>
              <p className="text-xs font-semibold text-white">
                Studio plan
              </p>
              <p className="mt-0.5 text-[10px] text-sidebar-foreground/35">
                Active subscription
              </p>
            </div>
          </div>
        </div>

        <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-sidebar-foreground/45">
          8 / 15
        </span>
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between text-[10px] text-sidebar-foreground/40">
          <span>Active projects</span>
          <span>53%</span>
        </div>

        <Progress
          value={53}
          className="mt-2 h-1.5 bg-white/[0.08]"
        />
      </div>

      <div className="relative mt-4 space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-sidebar-foreground/45">
          <Check className="size-3.5 text-emerald-400" />
          30 client accounts
        </div>

        <div className="flex items-center gap-2 text-[11px] text-sidebar-foreground/45">
          <Check className="size-3.5 text-emerald-400" />
          20 GB file storage
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="relative mt-4 w-full justify-between rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 text-xs text-sidebar-foreground/65 hover:bg-white/[0.08] hover:text-white"
      >
        Manage plan
        <ArrowUpRight className="size-3.5" />
      </Button>
    </div>
  );
}

function SidebarAccount() {
  return (
    <div className="relative shrink-0 border-t border-sidebar-border bg-black/[0.06] p-4">
      <div className="group flex items-center gap-3 rounded-2xl border border-transparent p-2.5 transition-colors hover:border-white/[0.06] hover:bg-white/[0.035]">
        <Avatar className="size-10 rounded-xl">
          <AvatarFallback className="rounded-xl bg-sidebar-accent text-xs font-semibold text-white">
            OB
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            Olivia Bennett
          </p>

          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <p className="truncate text-[11px] text-sidebar-foreground/40">
              Workspace owner
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-lg text-sidebar-foreground/35 hover:bg-white/[0.06] hover:text-white"
          aria-label="Open account menu"
        >
          <ChevronDown />
        </Button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start rounded-xl text-xs text-sidebar-foreground/40 hover:bg-white/[0.05] hover:text-white"
        >
          <CircleHelp />
          Help
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="justify-start rounded-xl text-xs text-sidebar-foreground/40 hover:bg-white/[0.05] hover:text-white"
        >
          <LogOut />
          Sign out
        </Button>
      </div>
    </div>
  );
}