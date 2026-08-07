export type AuthActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export const initialAuthActionState: AuthActionState = {
  status: "idle",
};

export function createAuthError(
  message: string,
  fieldErrors?: Record<string, string[] | undefined>,
): AuthActionState {
  return {
    status: "error",
    message,
    fieldErrors,
  };
}

export function createAuthSuccess(message: string): AuthActionState {
  return {
    status: "success",
    message,
  };
}