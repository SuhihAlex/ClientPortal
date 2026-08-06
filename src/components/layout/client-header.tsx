import {
  Bell,
  ChevronDown,
  CircleHelp,
} from "lucide-react";

import { BrandLogo } from "@/components/brand";
import { ClientMobileNavigation } from "@/components/layout/client-mobile-navigation";
import { ClientNavigation } from "@/components/navigation/client-navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ClientHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <ClientMobileNavigation />

        <BrandLogo
          href="/portal"
          className="max-sm:[&_span:last-child]:hidden"
        />

        <Separator
          orientation="vertical"
          className="hidden h-7 lg:block"
        />

        <ClientNavigation />

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden xl:inline-flex"
            aria-label="Help"
          >
            <CircleHelp />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="relative bg-white"
            aria-label="Notifications"
          >
            <Bell />

            <Badge className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full p-0 text-[9px]">
              2
            </Badge>
          </Button>

          <button
            type="button"
            className="ml-1 hidden items-center gap-2 rounded-xl p-1.5 outline-none transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring md:flex"
          >
            <Avatar>
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>

            <div className="hidden text-left xl:block">
              <p className="text-sm font-medium">Sophia Miller</p>
              <p className="text-xs text-muted-foreground">
                Alder &amp; Stone
              </p>
            </div>

            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}