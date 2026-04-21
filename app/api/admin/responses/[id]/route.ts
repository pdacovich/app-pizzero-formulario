import { NextResponse } from "next/server";
import { z } from "zod";

import { verifyAdminAccess } from "@/lib/domain/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const notesSchema = z.object({
  admin_notes: z.string().trim().max(5000, "Las notas son demasiado largas.")
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const payload = await request.json();
    const parsedPayload = notesSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return NextResponse.json(
        {
          error: parsedPayload.error.issues[0]?.message ?? "Payload inválido."
        },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();
    await verifyAdminAccess(supabase);

    const { error } = await supabase
      .from("survey_responses")
      .update({
        admin_notes: parsedPayload.data.admin_notes
      })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error("[admin-update-notes]", error);

    return NextResponse.json(
      {
        error: "No pudimos guardar las notas internas."
      },
      { status: 500 }
    );
  }
}
