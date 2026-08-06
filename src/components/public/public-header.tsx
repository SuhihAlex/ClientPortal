import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BrandLogo } from "@/components/brand";
import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <BrandLogo />

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/features" className="hover:text-foreground">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#workflow" className="hover:text-foreground">
            Workflow
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Sign in
          </Button>

          <Button
            nativeButton={false}
            render={<Link href="/register" />}
          >
            Start free
            <ArrowRight />
          </Button>
        </div>
      </Container>
    </header>
  );
}