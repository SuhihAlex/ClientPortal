import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  invalid_callback:
    "The authentication link is invalid or has expired.",

  workspace_lookup_failed:
    "Your account was authenticated, but the workspace could not be loaded.",

  workspace_metadata_missing:
    "Workspace setup data is missing. Contact support.",

  workspace_creation_failed:
    "Your account was confirmed, but the workspace could not be created.",

  workspace_missing:
    "Your account does not currently belong to an active workspace.",
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  const errorMessage = params.error
    ? errorMessages[params.error]
    : undefined;

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue to your ClientPortal workspace."
      footer={
        <>
          New to ClientPortal?{" "}
          <Link
            href="/register"
            className="font-medium text-primary"
          >
            Create an account
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        {errorMessage && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-800"
          >
            {errorMessage}
          </div>
        )}

        <LoginForm nextPath={params.next} />

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}