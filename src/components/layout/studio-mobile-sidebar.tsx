"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { BrandLogo } from "@/components/brand";
import { StudioNavigation } from "@/components/navigation/studio-navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function StudioMobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
          />
        }
      >
        <Menu />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[292px] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Studio navigation</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center border-b border-sidebar-border px-5">
            <BrandLogo
              href="/app"
              className="[&_span:last-child]:text-white"
            />
          </div>

          <div className="px-4 py-5">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <Avatar className="size-10 rounded-xl">
                <AvatarFallback className="rounded-xl bg-white text-xs font-semibold text-sidebar">
                  NS
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  Northline Studio
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400" />

                  <p className="text-[11px] text-sidebar-foreground/40">
                    Studio workspace
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-scroll flex-1 overflow-y-auto px-4 pb-5">
            <StudioNavigation onNavigate={() => setOpen(false)} />
          </div>

          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-xl p-2">
              <Avatar>
                <AvatarFallback className="bg-sidebar-accent text-white">
                  OB
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium text-white">
                  Olivia Bennett
                </p>
                <p className="text-xs text-sidebar-foreground/40">
                  Workspace owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}