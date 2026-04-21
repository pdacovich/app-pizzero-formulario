import Link from "next/link";
import { redirect } from "next/navigation";

import { FiltersForm } from "@/components/admin/filters-form";
import { ResponseTable } from "@/components/admin/response-table";
import { fetchSurveyResponses, parseSurveyFilters } from "@/features/admin/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminAccessError, verifyAdminAccess } from "@/lib/domain/admin";

interface ResponsesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminResponsesPage({ searchParams }: ResponsesPageProps) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createSupabaseServerClient();

  try {
    await verifyAdminAccess(supabase);
  } catch (error) {
    if (error instanceof AdminAccessError && error.code === "UNAUTHENTICATED") {
      redirect("/admin/login");
    }

    redirect("/admin/login");
  }

  const filters = parseSurveyFilters(resolvedSearchParams);
  const responses = await fetchSurveyResponses(supabase, filters);
  const exportParams = new URLSearchParams(
    Object.entries(filters)
      .filter(([key, value]) => Boolean(value) && key !== "pageSize")
      .map(([key, value]) => [key, String(value)])
  );

  return (
    <main className="admin-page">
      <section className="admin-header">
        <p className="public-eyebrow">APP Pizzeros</p>
        <div className="admin-header-row">
          <div>
            <h1>Panel de respuestas</h1>
            <p className="public-lead">
              Visualizá respuestas, segmentá perfiles y marcá oportunidades para la beta.
            </p>
          </div>
          <div className="admin-toolbar">
            <Link href={`/api/admin/responses/export?${exportParams.toString()}`} className="ghost-button">
              Exportar CSV
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="meta-copy">Respuestas totales</span>
          <strong>{responses.count}</strong>
        </article>
        <article className="stat-card">
          <span className="meta-copy">Beta interesada</span>
          <strong>{responses.data.filter((item) => item.is_beta_candidate).length}</strong>
        </article>
        <article className="stat-card">
          <span className="meta-copy">Con contacto</span>
          <strong>
            {
              responses.data.filter((item) => item.contact_via_email || item.contact_via_whatsapp).length
            }
          </strong>
        </article>
        <article className="stat-card">
          <span className="meta-copy">Página actual</span>
          <strong>{responses.page}</strong>
        </article>
      </section>

      <div className="admin-shell">
        <div className="detail-grid">
          <FiltersForm filters={filters} />
          <ResponseTable responses={responses} filters={filters} />
        </div>
      </div>
    </main>
  );
}
