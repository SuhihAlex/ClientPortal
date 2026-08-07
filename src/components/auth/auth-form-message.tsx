import { CircleAlert, CircleCheck } from "lucide-react";

import type { AuthActionState } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

export function AuthFormMessage({
  state,
}: {
  state: AuthActionState;
}) {
  if (state.status === "idle" || !state.message) {
    return null;
  }

  const success = state.status === "success";
  const Icon = success ? CircleCheck : CircleAlert;

  return (
    <div
      role={success ? "status" : "alert"}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-3.5 text-sm leading-5",
        success
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-red-200 bg-red-50 text-red-800",
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <span>{state.message}</span>
    </div>
  );
}