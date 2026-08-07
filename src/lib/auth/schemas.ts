import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters."),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must contain at least 2 characters.")
    .max(100, "Full name is too long."),

  workspaceName: z
    .string()
    .trim()
    .min(2, "Studio name must contain at least 2 characters.")
    .max(100, "Studio name is too long."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(72, "Password must contain at most 72 characters."),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((value) => value.toLowerCase()),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .max(72, "Password must contain at most 72 characters."),

    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword }) =>
      password === confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

export function createWorkspaceSlug(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "workspace";
}

export function getSafeRedirectPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  return value;
}