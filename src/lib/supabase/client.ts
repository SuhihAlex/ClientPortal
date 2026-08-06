import { createBrowserClient } from "@supabase/ssr";

import { assertSupabaseConfig } from "@/lib/supabase/config";

export function createClient() {
  const { url, publishableKey } = assertSupabaseConfig();

  return createBrowserClient(url, publishableKey);
}