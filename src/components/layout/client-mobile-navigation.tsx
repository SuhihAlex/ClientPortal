"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { BrandLogo } from "@/components/brand";
import { ClientNavigation } from "@/components/navigation/client-navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function ClientMobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Open client navigation"
          />
        }
      >
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="w-[292px] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Client portal navigation</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col bg-white">
          <div className="flex h-20 items-center border-b px-5">
            <BrandLogo href="/portal" />
          </div>

          <div className="border-b px-5 py-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Client workspace
            </p>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border bg-secondary/40 p-3">
              <Avatar className="size-10 rounded-xl">
                <AvatarFallback className="rounded-xl bg-primary text-xs text-primary-foreground">
                  AS
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  Alder &amp; Stone
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  Client portal
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            <ClientNavigation
              mobile
              onNavigate={() => setOpen(false)}
            />
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-3 rounded-xl p-2">
              <Avatar>
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  Sophia Miller
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Client member
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}