import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

type AppPagePlaceholderProps = {
  title: string;
  description: string;
  actionLabel?: string;
  icon: LucideIcon;
};

export function AppPagePlaceholder({
  title,
  description,
  actionLabel,
  icon: Icon,
}: AppPagePlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-[1500px]">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.045em]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {actionLabel && (
          <Button>
            <Plus />
            {actionLabel}
          </Button>
        )}
      </header>

      <Card className="mt-7 border-dashed bg-white/70 shadow-none">
        <CardContent className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border bg-secondary text-primary">
            <Icon className="size-6" />
          </div>

          <h2 className="mt-5 text-lg font-semibold">
            {title} workspace
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            This interface shell is ready. Data and business operations will
            be connected during the corresponding implementation stage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}