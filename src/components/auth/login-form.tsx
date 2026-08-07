"use client";

import { useActionState } from "react";

import { loginAction } from "@/app/(auth)/actions";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { FieldError } from "@/components/auth/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAuthActionState } from "@/lib/auth/types";

export function LoginForm({
  nextPath,
}: {
  nextPath?: string;
}) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialAuthActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {nextPath && (
        <input type="hidden" name="next" value={nextPath} />
      )}

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

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(
            state.fieldErrors?.password,
          )}
        />

        <FieldError errors={state.fieldErrors?.password} />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={pending}
      >
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}