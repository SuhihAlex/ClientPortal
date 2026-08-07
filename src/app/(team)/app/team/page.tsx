import { UserPlus, Users } from "lucide-react";

import { CreateInvitationForm } from "@/components/auth/create-invitation-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TeamPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px]">
      <header>
        <h1 className="text-3xl font-semibold tracking-[-0.045em]">
          Team
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Invite team members and clients to Northline Studio.
        </p>
      </header>

      <div className="mt-7 grid gap-4 xl:grid-cols-[1fr_420px]">
        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b">
            <CardTitle>Workspace members</CardTitle>
            <CardDescription>
              Active members will appear here after accepting an invitation.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl border bg-secondary text-primary">
              <Users className="size-6" />
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Member list is ready
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              The live member list will be connected after the invitation
              acceptance flow is verified.
            </p>
          </CardContent>
        </Card>

        <Card className="h-fit bg-white shadow-sm">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <UserPlus className="size-5" />
              </div>

              <div>
                <CardTitle>Create invitation</CardTitle>
                <CardDescription className="mt-1">
                  The link expires after seven days.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <CreateInvitationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}