"use client";

import { useActionState } from "react";

import { registerAction } from "@/app/(auth)/actions";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { FieldError } from "@/components/auth/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAuthActionState } from "@/lib/auth/types";

type RegisterFormProps = {
  nextPath?: string;
  invitationRegistration?: boolean;
};

export function RegisterForm({
  nextPath,
  invitationRegistration = false,
}: RegisterFormProps) {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialAuthActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {nextPath && (
        <input
          type="hidden"
          name="next"
          value={nextPath}
        />
      )}

      <AuthFormMessage state={state} />

      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>

        <Input
          id="fullName"
          name="fullName"
          autoComplete="name"
          placeholder="Sophia Miller"
          required
          aria-invalid={Boolean(
            state.fieldErrors?.fullName,
          )}
        />

        <FieldError
          errors={state.fieldErrors?.fullName}
        />
      </div>

      {!invitationRegistration && (
        <div className="space-y-2">
          <Label htmlFor="workspaceName">
            Studio name
          </Label>

          <Input
            id="workspaceName"
            name="workspaceName"
            autoComplete="organization"
            placeholder="Northline Studio"
            required
            aria-invalid={Boolean(
              state.fieldErrors?.workspaceName,
            )}
          />

          <FieldError
            errors={state.fieldErrors?.workspaceName}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">
          {invitationRegistration
            ? "Email"
            : "Work email"}
        </Label>

        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          aria-invalid={Boolean(
            state.fieldErrors?.email,
          )}
        />

        <FieldError
          errors={state.fieldErrors?.email}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          aria-invalid={Boolean(
            state.fieldErrors?.password,
          )}
        />

        <FieldError
          errors={state.fieldErrors?.password}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={pending}
      >
        {pending
          ? "Creating account..."
          : invitationRegistration
            ? "Create account and continue"
            : "Create workspace"}
      </Button>
    </form>
  );
}