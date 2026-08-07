"use client";

import Link from "next/link";
import { useActionState } from "react";

import { resetPasswordAction } from "@/app/(auth)/actions";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { FieldError } from "@/components/auth/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAuthActionState } from "@/lib/auth/types";

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    initialAuthActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <AuthFormMessage state={state} />

      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          aria-invalid={Boolean(state.fieldErrors?.password)}
        />
        <FieldError errors={state.fieldErrors?.password} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          aria-invalid={Boolean(
            state.fieldErrors?.confirmPassword,
          )}
        />
        <FieldError errors={state.fieldErrors?.confirmPassword} />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Updating..." : "Update password"}
      </Button>

      {state.status === "success" && (
        <Button
          variant="outline"
          className="w-full"
          nativeButton={false}
          render={<Link href="/login" />}
        >
          Return to sign in
        </Button>
      )}
    </form>
  );
}