import { NextResponse } from "next/server";
import { z } from "zod";

import { sanitizeTags } from "@/features/survey/utils";
import { verifyAdminAccess } from "@/lib/domain/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const tagsSchema = z.object({
  tags: z.array(z.string())
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const payload = await request.json();
    const parsedPayload = tagsSchema.safeParse(payload);

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

    const tags = sanitizeTags(parsedPayload.data.tags);
    const { error } = await supabase
      .from("survey_responses")
      .update({
        tags
      })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      tags
    });
  } catch (error) {
    console.error("[admin-update-tags]", error);

    return NextResponse.json(
      {
        error: "No pudimos guardar los tags."
      },
      { status: 500 }
    );
  }
}
