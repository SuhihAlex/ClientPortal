"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  studioManagementNavigation,
  studioNavigation,
} from "@/config/studio-navigation";
import { cn } from "@/lib/utils";

type StudioNavigationProps = {
  onNavigate?: () => void;
};

export function StudioNavigation({
  onNavigate,
}: StudioNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col pb-4">
      <div className="space-y-1">
        {studioNavigation.map((item) => (
          <NavigationItem
            key={item.href}
            {...item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-3 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/30">
            Workspace
          </p>

          <span className="h-px flex-1 bg-sidebar-border" />
        </div>

        <div className="mt-3 space-y-1">
          {studioManagementNavigation.map((item) => (
            <NavigationItem
              key={item.href}
              {...item}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

type NavigationItemProps = {
  label: string;
  href: string;
  icon: typeof studioNavigation[number]["icon"];
  pathname: string;
  onNavigate?: () => void;
};

function NavigationItem({
  label,
  href,
  icon: Icon,
  pathname,
  onNavigate,
}: NavigationItemProps) {
  const isDashboard = href === "/app";

  const active = isDashboard
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group relative flex min-h-11 items-center gap-3 overflow-hidden rounded-xl px-3.5 text-sm font-medium outline-none transition-[background-color,color,transform,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        active
          ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.12)]"
          : "text-sidebar-foreground/55 hover:translate-x-0.5 hover:bg-white/[0.055] hover:text-white",
      )}
    >
      {active && (
        <>
          <span
            className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-sidebar-primary shadow-[0_0_14px_rgba(125,170,255,0.55)]"
            aria-hidden="true"
          />

          <span
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,164,255,0.09),transparent_65%)]"
            aria-hidden="true"
          />
        </>
      )}

      <span
        className={cn(
          "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
          active
            ? "bg-sidebar-primary/15 text-sidebar-primary"
            : "text-sidebar-foreground/40 group-hover:bg-white/[0.05] group-hover:text-white",
        )}
      >
        <Icon className="size-[17px]" />
      </span>

      <span className="relative z-10">{label}</span>
    </Link>
  );
}