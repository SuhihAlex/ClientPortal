"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { clientNavigation } from "@/config/client-navigation";
import { cn } from "@/lib/utils";

type ClientNavigationProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function ClientNavigation({
  mobile = false,
  onNavigate,
}: ClientNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        mobile
          ? "flex flex-col gap-1"
          : "hidden items-center gap-1 lg:flex",
      )}
      aria-label="Client portal navigation"
    >
      {clientNavigation.map((item) => {
        const isOverview = item.href === "/portal";

        const active = isOverview
          ? pathname === item.href
          : pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "size-4",
                active
                  ? "text-primary-foreground"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
            />

            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}