import type { SupabaseClient } from "@supabase/supabase-js";

export type WorkspaceRole = "owner" | "team_member" | "client";

export type CurrentMembership = {
  workspaceId: string;
  role: WorkspaceRole;
};

export async function getCurrentMembership(
  supabase: SupabaseClient,
  userId: string,
): Promise<CurrentMembership | null> {
  const { data, error } = await supabase
    .from("workspace_members")
    .select("workspace_id, role")
    .eq("user_id", userId)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Workspace membership query failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error("Unable to load workspace membership.");
  }

  if (!data) {
    return null;
  }

  return {
    workspaceId: data.workspace_id,
    role: data.role as WorkspaceRole,
  };
}

export function getRoleDestination(role: WorkspaceRole) {
  return role === "client" ? "/portal" : "/app";
}

export async function getPendingInvitationPath(
  supabase: SupabaseClient,
  email: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("invitations")
    .select("token_hash, status, expires_at")
    .eq("email", email.toLowerCase())
    .eq("status", "pending")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Pending invitation lookup failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    return null;
  }

  if (!data) {
    return null;
  }

  return null;
}