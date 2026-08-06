import { Building2, UserRound } from "lucide-react";

import { AuthCard } from "@/components/auth/auth-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function InvitationPage() {
  return (
    <AuthCard
      title="You have been invited"
      description="Accept your invitation to access the client portal."
    >
      <div className="rounded-2xl border bg-secondary/30 p-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-11 rounded-xl">
            <AvatarFallback className="rounded-xl bg-primary text-primary-foreground">
              NS
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">Northline Studio</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Client workspace invitation
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="size-4 text-muted-foreground" />
            Alder &amp; Stone Interiors
          </div>

          <div className="flex items-center gap-3 text-sm">
            <UserRound className="size-4 text-muted-foreground" />
            Client access
          </div>
        </div>

        <Badge variant="outline" className="mt-5">
          Expires in 7 days
        </Badge>
      </div>

      <Button className="mt-5 w-full">Accept invitation</Button>
    </AuthCard>
  );
}