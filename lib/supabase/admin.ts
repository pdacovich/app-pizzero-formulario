import { createClient } from "@supabase/supabase-js";

import { getSupabaseServiceEnv } from "@/lib/supabase/env";

let adminClient: any = null;

export function createSupabaseAdminClient() {
  if (!adminClient) {
    const { url, serviceRoleKey } = getSupabaseServiceEnv();
    adminClient = createClient<any>(url, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }

  return adminClient!;
}
