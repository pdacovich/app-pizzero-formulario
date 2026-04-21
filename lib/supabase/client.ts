"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicEnv } from "@/lib/supabase/env";

let browserClient: any = null;

export function createSupabaseBrowserClient() {
  if (!browserClient) {
    const { url, anonKey } = getSupabasePublicEnv();
    browserClient = createBrowserClient<any>(url, anonKey);
  }

  return browserClient!;
}
