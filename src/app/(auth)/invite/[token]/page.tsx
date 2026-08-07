import { Building2, Clock3, UserRound } from "lucide-react";

import { AcceptInvitationForm } from "@/components/auth/accept-invitation-form";
import { AuthCard } from "@/components/auth/auth-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { invitationTokenSchema } from "@/lib/auth/schemas";
import { createClient } from "@/lib/supabase/server";

type InvitationPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { token } = await params;
  const tokenResult = invitationTokenSchema.safeParse(token);

  if (!tokenResult.success) {
    return (
      <AuthCard
        title="Invalid invitation"
        description="This invitation link is malformed or incomplete."
      >
        <InvitationError>
          Ask the workspace owner to create a new invitation.
        </InvitationError>
      </AuthCard>
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "get_invitation_preview",
    {
      invitation_token: tokenResult.data,
    },
  );

  const invitation = Array.isArray(data) ? data[0] : data;

  if (error || !invitation) {
    return (
      <AuthCard
        title="Invitation not found"
        description="This invitation link is unavailable."
      >
        <InvitationError>
          It may have been revoked or entered incorrectly.
        </InvitationError>
      </AuthCard>
    );
  }

  const active =
    invitation.invitation_status === "pending" &&
    new Date(invitation.invitation_expires_at) > new Date();

  return (
    <AuthCard
      title={
        active
          ? "You have been invited"
          : "Invitation unavailable"
      }
      description={
        active
          ? "Accept the invitation to join this ClientPortal workspace."
          : "This invitation can no longer be accepted."
      }
    >
      <div className="rounded-2xl border bg-secondary/30 p-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-11 rounded-xl">
            <AvatarFallback className="rounded-xl bg-primary text-primary-foreground">
              {invitation.workspace_name
                .split(/\s+/)
                .map((part: string) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">
              {invitation.workspace_name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Workspace invitation
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="size-4 text-muted-foreground" />
            {invitation.invited_email}
          </div>

          <div className="flex items-center gap-3 text-sm">
            <UserRound className="size-4 text-muted-foreground" />
            {invitation.invited_role === "client"
              ? "Client access"
              : "Team member access"}
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock3 className="size-4 text-muted-foreground" />
            Expires{" "}
            {new Intl.DateTimeFormat("en", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(
              new Date(invitation.invitation_expires_at),
            )}
          </div>
        </div>

        <Badge variant="outline" className="mt-5">
          {invitation.invitation_status}
        </Badge>
      </div>

      {active ? (
        <AcceptInvitationForm token={tokenResult.data} />
      ) : (
        <InvitationError>
          Ask the workspace owner to send a new invitation.
        </InvitationError>
      )}
    </AuthCard>
  );
}

function InvitationError({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      role="alert"
      className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800"
    >
      {children}
    </div>
  );
}