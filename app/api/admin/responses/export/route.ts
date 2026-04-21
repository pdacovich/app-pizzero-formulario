import { NextResponse } from "next/server";

import { fetchAllSurveyResponsesForExport, parseSurveyFilters } from "@/features/admin/data";
import { verifyAdminAccess } from "@/lib/domain/admin";
import { buildSurveyResponsesCsv } from "@/lib/domain/csv";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    await verifyAdminAccess(supabase);

    const url = new URL(request.url);
    const filters = parseSurveyFilters(url.searchParams);
    const responses = await fetchAllSurveyResponsesForExport(supabase, filters);
    const csv = buildSurveyResponsesCsv(responses);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="survey-responses-${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  } catch (error) {
    console.error("[admin-export]", error);

    return NextResponse.json(
      {
        error: "No pudimos exportar el CSV."
      },
      { status: 500 }
    );
  }
}
