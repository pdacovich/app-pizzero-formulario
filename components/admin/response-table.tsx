import Link from "next/link";

import { getOptionLabel } from "@/features/survey/questions";
import type { PaginatedSurveyResponses, SurveyFilters } from "@/lib/domain/types";

interface ResponseTableProps {
  responses: PaginatedSurveyResponses;
  filters: SurveyFilters;
}

function buildPageHref(filters: SurveyFilters, page: number) {
  const params = new URLSearchParams();
  params.set("page", String(page));

  Object.entries(filters).forEach(([key, value]) => {
    if (!value || key === "page" || key === "pageSize") {
      return;
    }

    params.set(key, String(value));
  });

  return `/admin/responses?${params.toString()}`;
}

export function ResponseTable({ responses, filters }: ResponseTableProps) {
  const totalPages = Math.max(1, Math.ceil(responses.count / responses.pageSize));

  return (
    <section className="admin-card">
      <div className="admin-header-row">
        <div>
          <h2>Respuestas</h2>
          <p className="meta-copy">
            {responses.count} respuesta{responses.count === 1 ? "" : "s"} encontradas.
          </p>
        </div>
        <Link
          href={`/api/admin/responses/export?${new URLSearchParams(
            Object.entries(filters)
              .filter(([, value]) => value)
              .map(([key, value]) => [key, String(value)])
          ).toString()}`}
          className="ghost-button"
        >
          Exportar CSV
        </Link>
      </div>

      {responses.data.length === 0 ? (
        <div className="empty-state">Todavía no hay respuestas para este filtro.</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="responses-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Etapa</th>
                  <th>Dolor principal</th>
                  <th>Beta</th>
                  <th>Tags</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {responses.data.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.created_at).toLocaleDateString("es-AR")}</td>
                    <td>
                      <strong>{item.full_name}</strong>
                      <br />
                      <span className="meta-copy">{item.email || item.whatsapp || "Sin contacto"}</span>
                    </td>
                    <td>{getOptionLabel("role_type", item.role_type)}</td>
                    <td>{getOptionLabel("business_stage", item.business_stage)}</td>
                    <td>{getOptionLabel("main_pain_point", item.main_pain_point)}</td>
                    <td>{getOptionLabel("beta_interest", item.beta_interest)}</td>
                    <td>
                      <div className="tag-list">
                        {item.tags.length > 0 ? (
                          item.tags.map((tag) => (
                            <span key={tag} className="tag-pill">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="meta-copy">Sin tags</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <Link href={`/admin/responses/${item.id}`} className="row-link">
                        Ver detalle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-row">
            <p className="meta-copy">
              Página {responses.page} de {totalPages}
            </p>
            <div className="pagination-links">
              {responses.page > 1 ? (
                <Link href={buildPageHref(filters, responses.page - 1)} className="ghost-button">
                  Anterior
                </Link>
              ) : null}
              {responses.page < totalPages ? (
                <Link href={buildPageHref(filters, responses.page + 1)} className="ghost-button">
                  Siguiente
                </Link>
              ) : null}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
