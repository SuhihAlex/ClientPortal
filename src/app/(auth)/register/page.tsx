import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your workspace"
      description="Start with a free ClientPortal account for your studio."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Olivia Bennett" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workspace">Studio name</Label>
          <Input id="workspace" placeholder="Northline Studio" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" placeholder="you@studio.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>

        <Button className="w-full">Create account</Button>
      </form>
    </AuthCard>
  );
}