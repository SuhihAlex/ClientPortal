import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  compact?: boolean;
  className?: string;
};

export function BrandLogo({
  href = "/",
  compact = false,
  className,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label="ClientPortal home"
    >
      <span
        className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-primary text-primary-foreground shadow-sm"
        aria-hidden="true"
      >
        <span className="absolute left-[7px] top-[7px] size-[9px] rounded-[3px] border border-current" />
        <span className="absolute bottom-[7px] right-[7px] size-[9px] rounded-[3px] bg-current opacity-70" />
      </span>

      {!compact && (
        <span className="text-[17px] font-semibold tracking-[-0.04em] text-foreground">
          ClientPortal
        </span>
      )}
    </Link>
  );
}