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