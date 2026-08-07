"use client";

import { useActionState } from "react";
import { Copy, UserPlus } from "lucide-react";

import {
  createInvitationAction,
  type InvitationActionState,
} from "@/app/(team)/app/team/actions";
import { AuthFormMessage } from "@/components/auth/auth-form-message";
import { FieldError } from "@/components/auth/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialAuthActionState } from "@/lib/auth/types";

const initialState: InvitationActionState = {
  ...initialAuthActionState,
};

export function CreateInvitationForm() {
  const [state, formAction, pending] = useActionState(
    createInvitationAction,
    initialState,
  );

  async function copyInvitationUrl() {
    if (!state.invitationUrl) {
      return;
    }

    await navigator.clipboard.writeText(state.invitationUrl);
  }

  return (
    <form action={formAction} className="space-y-5">
      <AuthFormMessage state={state} />

      <div className="space-y-2">
        <Label htmlFor="invitation-email">
          Email address
        </Label>

        <Input
          id="invitation-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="client@company.com"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />

        <FieldError errors={state.fieldErrors?.email} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="invitation-role">Role</Label>

        <Select name="role" defaultValue="client">
          <SelectTrigger id="invitation-role" className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="client">
              Client
            </SelectItem>

            <SelectItem value="team_member">
              Team Member
            </SelectItem>
          </SelectContent>
        </Select>

        <FieldError errors={state.fieldErrors?.role} />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={pending}
      >
        <UserPlus />
        {pending ? "Creating invitation..." : "Create invitation"}
      </Button>

      {state.invitationUrl && (
        <div className="rounded-xl border bg-secondary/30 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Secure invitation link
          </p>

          <p className="mt-2 break-all text-sm">
            {state.invitationUrl}
          </p>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={copyInvitationUrl}
          >
            <Copy />
            Copy link
          </Button>
        </div>
      )}
    </form>
  );
}