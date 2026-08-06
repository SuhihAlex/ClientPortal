import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type ClientPagePlaceholderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ClientPagePlaceholder({
  title,
  description,
  icon: Icon,
}: ClientPagePlaceholderProps) {
  return (
    <div>
      <header>
        <h1 className="text-3xl font-semibold tracking-[-0.045em]">
          {title}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </header>

      <Card className="mt-7 border-dashed bg-white/70 shadow-none">
        <CardContent className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border bg-secondary text-primary">
            <Icon className="size-6" />
          </div>

          <h2 className="mt-5 text-lg font-semibold">
            {title}
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            This client-facing interface is prepared for the data integration
            stage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}