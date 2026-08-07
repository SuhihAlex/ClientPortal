import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import {
  getSafeRedirectPath,
  isInvitationRedirectPath,
} from "@/lib/auth/schemas";

type RegisterPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const params = await searchParams;

  const nextPath = params.next
    ? getSafeRedirectPath(params.next)
    : null;

  const invitationRegistration =
    isInvitationRedirectPath(nextPath);

  return (
    <AuthCard
      title={
        invitationRegistration
          ? "Create your account"
          : "Create your workspace"
      }
      description={
        invitationRegistration
          ? "Create an account to accept your ClientPortal invitation."
          : "Start with a free ClientPortal account for your studio."
      }
      footer={
        <>
          Already have an account?{" "}
          <Link
            href={
              nextPath
                ? `/login?next=${encodeURIComponent(nextPath)}`
                : "/login"
            }
            className="font-medium text-primary"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm
        nextPath={nextPath ?? undefined}
        invitationRegistration={
          invitationRegistration
        }
      />
    </AuthCard>
  );
}