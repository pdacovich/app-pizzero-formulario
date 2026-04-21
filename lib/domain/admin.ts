import type { SupabaseClient, User } from "@supabase/supabase-js";

export class AdminAccessError extends Error {
  code: "UNAUTHENTICATED" | "FORBIDDEN";

  constructor(code: "UNAUTHENTICATED" | "FORBIDDEN", message: string) {
    super(message);
    this.code = code;
  }
}

export interface VerifiedAdmin {
  user: User;
  adminUser: {
    id: string;
    role: string;
    is_active: boolean;
  };
}

export async function verifyAdminAccess(supabase: SupabaseClient): Promise<VerifiedAdmin> {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) {
    throw new AdminAccessError("UNAUTHENTICATED", "No se pudo validar la sesión.");
  }

  if (!user) {
    throw new AdminAccessError("UNAUTHENTICATED", "Necesitás iniciar sesión.");
  }

  const { data: adminUser, error: adminUserError } = await supabase
    .from("admin_users")
    .select("id, role, is_active")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (adminUserError) {
    throw new AdminAccessError("FORBIDDEN", "No se pudo verificar tu acceso.");
  }

  if (!adminUser) {
    throw new AdminAccessError("FORBIDDEN", "Tu usuario no tiene acceso al panel admin.");
  }

  return { user, adminUser };
}
