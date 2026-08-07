import { NextResponse, type NextRequest } from "next/server";

import { getCurrentMembership, getRoleDestination } from "@/lib/auth/membership";
import { createClient } from "@/lib/supabase/server";

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  return value;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const requestedNext = getSafeNextPath(
    requestUrl.searchParams.get("next"),
  );

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_callback", requestUrl.origin),
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_callback", requestUrl.origin),
    );
  }

  if (requestedNext) {
    return NextResponse.redirect(
      new URL(requestedNext, requestUrl.origin),
    );
  }

  let membership;

  try {
    membership = await getCurrentMembership(supabase, data.user.id);
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=workspace_lookup_failed", requestUrl.origin),
    );
  }

  if (membership) {
    return NextResponse.redirect(
      new URL(getRoleDestination(membership.role), requestUrl.origin),
    );
  }

  const metadata = data.user.user_metadata;
  const workspaceName =
    typeof metadata.pending_workspace_name === "string"
      ? metadata.pending_workspace_name
      : null;
  const workspaceSlug =
    typeof metadata.pending_workspace_slug === "string"
      ? metadata.pending_workspace_slug
      : null;

  if (!workspaceName || !workspaceSlug) {
    return NextResponse.redirect(
      new URL("/login?error=workspace_metadata_missing", requestUrl.origin),
    );
  }

  const { error: workspaceError } = await supabase.rpc(
    "create_workspace_for_current_user",
    {
      workspace_name: workspaceName,
      workspace_slug: workspaceSlug,
    },
  );

  if (workspaceError) {
    return NextResponse.redirect(
      new URL("/login?error=workspace_creation_failed", requestUrl.origin),
    );
  }

  return NextResponse.redirect(new URL("/app", requestUrl.origin));
}