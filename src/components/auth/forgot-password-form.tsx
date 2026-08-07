"use client";

import { useActionState } from "react";

import { forgotPasswordAction } from "@/app/(auth)/actions";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { FieldError } from "@/components/auth/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAuthActionState } from "@/lib/auth/types";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    initialAuthActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <AuthFormMessage state={state} />

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@studio.com"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        <FieldError errors={state.fieldErrors?.email} />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}