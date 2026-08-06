import {
  Bell,
  Command,
  Plus,
  Search,
} from "lucide-react";

import { StudioMobileSidebar } from "@/components/layout/studio-mobile-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StudioTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <StudioMobileSidebar />

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search clients, projects, or files..."
            className="h-10 bg-white pl-9 pr-16 shadow-none"
          />

          <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
            <Command className="size-3" />K
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button className="hidden sm:inline-flex">
            <Plus />
            New project
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="relative bg-white"
            aria-label="Notifications"
          >
            <Bell />

            <Badge className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full p-0 text-[9px]">
              3
            </Badge>
          </Button>

          <Avatar className="lg:hidden">
            <AvatarFallback>OB</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}