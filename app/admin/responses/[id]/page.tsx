import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ResponseDetailEditor } from "@/components/admin/response-detail-editor";
import { getOptionLabel, surveyFieldLabels } from "@/features/survey/questions";
import { fetchSurveyResponseById } from "@/features/admin/data";
import { AdminAccessError, verifyAdminAccess } from "@/lib/domain/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SurveyFieldName, SurveyResponseRecord } from "@/lib/domain/types";

const detailFields: Array<Extract<keyof SurveyResponseRecord, SurveyFieldName>> = [
  "role_type",
  "business_stage",
  "pizza_style_main",
  "team_size_range",
  "production_volume_range",
  "main_pain_point",
  "main_time_loss",
  "main_money_loss",
  "current_tools_used",
  "most_used_feature_expected",
  "one_minute_mobile_need",
  "usage_moment",
  "device_preference",
  "core_value_expected",
  "first_feature_priority",
  "expected_usage_frequency",
  "custom_data_interest",
  "pricing_model_preference",
  "product_positioning_preference",
  "open_request_single_need",
  "beta_interest",
  "contact_permission",
  "full_name",
  "email",
  "whatsapp",
  "location_text"
];

interface ResponseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResponseDetailPage({ params }: ResponseDetailPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  try {
    await verifyAdminAccess(supabase);
  } catch (error) {
    if (error instanceof AdminAccessError && error.code === "UNAUTHENTICATED") {
      redirect("/admin/login");
    }

    redirect("/admin/login");
  }

  let response;

  try {
    response = await fetchSurveyResponseById(supabase, id);
  } catch {
    notFound();
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <p className="public-eyebrow">Detalle de respuesta</p>
        <div className="admin-header-row">
          <div>
            <h1>{response.full_name}</h1>
            <p className="public-lead">
              Enviada el {new Date(response.created_at).toLocaleString("es-AR")}.
            </p>
          </div>
          <Link href="/admin/responses" className="ghost-button">
            Volver al listado
          </Link>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-panel">
          <h2>Respuesta completa</h2>
          <dl className="detail-list">
            {detailFields.map((field) => {
              const rawValue = response[field];
              const value =
                typeof rawValue === "string" || Array.isArray(rawValue)
                  ? getOptionLabel(field, rawValue)
                  : rawValue;

              return (
                <div key={field} className="detail-item">
                  <dt>{surveyFieldLabels[field]}</dt>
                  <dd>{value || "Sin dato"}</dd>
                </div>
              );
            })}
          </dl>

          <div className="meta-row" style={{ marginTop: "1.5rem" }}>
            <div className="detail-panel">
              <h2>Tracking</h2>
              <p className="meta-copy">Canal detectado: {response.source_channel ?? "Sin canal"}</p>
              <div className="tag-list">
                {[
                  response.source,
                  response.utm_source,
                  response.utm_medium,
                  response.utm_campaign,
                  response.utm_content,
                  response.ref
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <span key={item} className="tag-pill">
                      {item}
                    </span>
                  ))}
              </div>
            </div>

            <div className="detail-panel">
              <h2>Tags actuales</h2>
              <div className="tag-list">
                {response.tags.length > 0 ? (
                  response.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="meta-copy">Sin tags cargados.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <ResponseDetailEditor response={response} />
      </section>
    </main>
  );
}
