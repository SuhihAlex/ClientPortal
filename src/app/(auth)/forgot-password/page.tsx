import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and we will send you a password reset link."
      footer={
        <Link href="/login" className="font-medium text-primary">
          Back to sign in
        </Link>
      }
    >
      <form className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@studio.com" />
        </div>

        <Button className="w-full">Send reset link</Button>
      </form>
    </AuthCard>
  );
}