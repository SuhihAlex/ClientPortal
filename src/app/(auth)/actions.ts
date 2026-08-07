"use server";

import { redirect } from "next/navigation";

import {
  createWorkspaceSlug,
  forgotPasswordSchema,
  getSafeRedirectPath,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/auth/schemas";
import { getCurrentMembership, getRoleDestination } from "@/lib/auth/membership";
import { getSiteUrl } from "@/lib/auth/site-url";
import {
  createAuthError,
  createAuthSuccess,
  type AuthActionState,
} from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = loginSchema.safeParse({
    email: getFormString(formData, "email"),
    password: getFormString(formData, "password"),
  });
  const requestedNext = getSafeRedirectPath(
    getFormString(formData, "next"),
  );

  if (!result.success) {
    return createAuthError(
      "Check the highlighted fields.",
      result.error.flatten().fieldErrors,
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error || !data.user) {
    return createAuthError("Invalid email or password.");
  }

  let destination = "/app";

  try {
    const membership = await getCurrentMembership(
      supabase,
      data.user.id,
    );

    if (membership) {
      destination = getRoleDestination(membership.role);
    }

    if (
      requestedNext &&
      membership &&
      (
        (
          membership.role === "client" &&
          requestedNext.startsWith("/portal")
        ) ||
        (
          membership.role !== "client" &&
          requestedNext.startsWith("/app")
        )
      )
    ) {
      redirect(requestedNext);
    }
  } catch {
    return createAuthError(
      "Signed in, but the workspace could not be loaded.",
    );
  }

  redirect(destination);
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = registerSchema.safeParse({
    fullName: getFormString(formData, "fullName"),
    workspaceName: getFormString(formData, "workspaceName"),
    email: getFormString(formData, "email"),
    password: getFormString(formData, "password"),
  });

  if (!result.success) {
    return createAuthError(
      "Check the highlighted fields.",
      result.error.flatten().fieldErrors,
    );
  }

  const supabase = await createClient();
  const baseSlug = createWorkspaceSlug(result.data.workspaceName);
  const uniqueSuffix = crypto.randomUUID().slice(0, 8);
  const workspaceSlug = `${baseSlug}-${uniqueSuffix}`;

  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback`,
      data: {
        full_name: result.data.fullName,
        pending_workspace_name: result.data.workspaceName,
        pending_workspace_slug: workspaceSlug,
      },
    },
  });

  if (error) {
    return createAuthError(
      error.message.toLowerCase().includes("already")
        ? "An account with this email already exists."
        : "The account could not be created. Try again.",
    );
  }

  if (!data.user) {
    return createAuthError("The account could not be created.");
  }

  // When email confirmation is disabled, Supabase returns a session
  // immediately and the workspace can be created now.
  if (data.session) {
    const { error: workspaceError } = await supabase.rpc(
      "create_workspace_for_current_user",
      {
        workspace_name: result.data.workspaceName,
        workspace_slug: workspaceSlug,
      },
    );

    if (workspaceError) {
      await supabase.auth.signOut();

      return createAuthError(
        "Your account was created, but the workspace could not be initialized.",
      );
    }

    redirect("/app");
  }

  return createAuthSuccess(
    "Check your email to confirm the account and finish creating your workspace.",
  );
}

export async function forgotPasswordAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = forgotPasswordSchema.safeParse({
    email: getFormString(formData, "email"),
  });

  if (!result.success) {
    return createAuthError(
      "Enter a valid email address.",
      result.error.flatten().fieldErrors,
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    result.data.email,
    {
      redirectTo: `${getSiteUrl()}/auth/callback?next=/reset-password`,
    },
  );

  if (error) {
    return createAuthError(
      "The reset email could not be sent. Try again later.",
    );
  }

  // Do not reveal whether the email exists.
  return createAuthSuccess(
    "If an account exists for this email, a reset link has been sent.",
  );
}

export async function resetPasswordAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const result = resetPasswordSchema.safeParse({
    password: getFormString(formData, "password"),
    confirmPassword: getFormString(formData, "confirmPassword"),
  });

  if (!result.success) {
    return createAuthError(
      "Check the highlighted fields.",
      result.error.flatten().fieldErrors,
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: result.data.password,
  });

  if (error) {
    return createAuthError(
      "The password could not be updated. Request a new reset link.",
    );
  }

  return createAuthSuccess(
    "Your password was updated. You can now sign in.",
  );
}

export async function signOutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/");
}