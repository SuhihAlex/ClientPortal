"use server";

import { revalidatePath } from "next/cache";

import { createInvitationSchema } from "@/lib/auth/schemas";
import type { AuthActionState } from "@/lib/auth/types";
import {
  createAuthError,
  createAuthSuccess,
} from "@/lib/auth/types";
import { getSiteUrl } from "@/lib/auth/site-url";
import { createClient } from "@/lib/supabase/server";

export type InvitationActionState = AuthActionState & {
  invitationUrl?: string;
};

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function createInvitationAction(
  _previousState: InvitationActionState,
  formData: FormData,
): Promise<InvitationActionState> {
  const result = createInvitationSchema.safeParse({
    email: getFormString(formData, "email"),
    role: getFormString(formData, "role"),
  });

  if (!result.success) {
    return createAuthError(
      "Check the invitation details.",
      result.error.flatten().fieldErrors,
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "create_workspace_invitation",
    {
      invited_email: result.data.email,
      invited_role: result.data.role,
      invitation_ttl_hours: 168,
    },
  );

  if (error) {
    console.error("Invitation creation failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    if (error.code === "23505") {
      return createAuthError(
        "This user is already a workspace member.",
      );
    }

    if (error.code === "42501") {
      return createAuthError(
        "Only the workspace owner can create invitations.",
      );
    }

    return createAuthError(
      "The invitation could not be created.",
    );
  }

  const invitation = Array.isArray(data) ? data[0] : data;

  if (!invitation?.invitation_token) {
    return createAuthError(
      "The invitation was created without a usable token.",
    );
  }

  revalidatePath("/app/team");

  return {
    ...createAuthSuccess(
      "Invitation created. Copy the secure link below.",
    ),
    invitationUrl:
      `${getSiteUrl()}/invite/${invitation.invitation_token}`,
  };
}