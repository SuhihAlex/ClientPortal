import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue to your ClientPortal workspace."
      footer={
        <>
          New to ClientPortal?{" "}
          <Link href="/register" className="font-medium text-primary">
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@studio.com" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary"
            >
              Forgot password?
            </Link>
          </div>

          <Input id="password" type="password" />
        </div>

        <Button className="w-full">Sign in</Button>
      </form>
    </AuthCard>
  );
}