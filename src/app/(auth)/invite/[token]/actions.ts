"use server";

import { redirect } from "next/navigation";

import {
  invitationTokenSchema,
} from "@/lib/auth/schemas";
import {
  createAuthError,
  type AuthActionState,
} from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function acceptInvitationAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = invitationTokenSchema.safeParse(
    getFormString(formData, "token"),
  );

  if (!result.success) {
    return createAuthError("The invitation link is invalid.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?next=${encodeURIComponent(
        `/invite/${result.data}`,
      )}`,
    );
  }

  const { data, error } = await supabase.rpc(
    "accept_workspace_invitation",
    {
      invitation_token: result.data,
    },
  );

  if (error) {
    console.error("Invitation acceptance failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    if (error.code === "42501") {
      return createAuthError(
        "This invitation belongs to a different email address.",
      );
    }

    if (
      error.message.toLowerCase().includes("expired")
    ) {
      return createAuthError(
        "This invitation has expired.",
      );
    }

    if (
      error.message.toLowerCase().includes("no longer active")
    ) {
      return createAuthError(
        "This invitation has already been used or revoked.",
      );
    }

    return createAuthError(
      "The invitation could not be accepted.",
    );
  }

  const accepted = Array.isArray(data) ? data[0] : data;

  redirect(
    accepted?.accepted_role === "client"
      ? "/portal"
      : "/app",
  );
}