import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Choose a new password"
      description="Enter and confirm your new account password."
    >
      <form className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <Input id="confirm-password" type="password" />
        </div>

        <Button className="w-full">Update password</Button>
      </form>
    </AuthCard>
  );
}