import Link from "next/link";

import { BrandLogo } from "@/components/brand";
import { Container } from "@/components/shared";

export function PublicFooter() {
  return (
    <footer className="border-t bg-white py-10">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <BrandLogo />
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              A focused client portal for studios and small agencies.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link href="/features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-foreground">
              Sign in
            </Link>
            <Link href="/register" className="hover:text-foreground">
              Register
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ClientPortal. All rights reserved.</p>
          <p>Built for better client collaboration.</p>
        </div>
      </Container>
    </footer>
  );
}