"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";

import { acceptInvitationAction } from "@/app/(auth)/invite/[token]/actions";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { Button } from "@/components/ui/button";
import { initialAuthActionState } from "@/lib/auth/types";

export function AcceptInvitationForm({
  token,
}: {
  token: string;
}) {
  const [state, formAction, pending] = useActionState(
    acceptInvitationAction,
    initialAuthActionState,
  );

  return (
    <form action={formAction} className="mt-5 space-y-4">
      <input type="hidden" name="token" value={token} />

      <AuthFormMessage state={state} />

      <Button
        type="submit"
        className="w-full"
        disabled={pending}
      >
        {pending ? "Accepting invitation..." : "Accept invitation"}
        <ArrowRight />
      </Button>
    </form>
  );
}