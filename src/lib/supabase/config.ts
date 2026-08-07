const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

export function assertSupabaseConfig() {
  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL in the environment.",
    );
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(supabaseUrl);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL must be a valid HTTP or HTTPS URL.",
    );
  }

  if (
    parsedUrl.protocol !== "https:" &&
    parsedUrl.protocol !== "http:"
  ) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL must use HTTP or HTTPS.",
    );
  }

  if (!supabasePublishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in the environment.",
    );
  }

  return {
    url: parsedUrl.toString().replace(/\/$/, ""),
    publishableKey: supabasePublishableKey,
  };
}