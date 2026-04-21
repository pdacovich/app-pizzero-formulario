import Link from "next/link";

import { filterFieldLabels, getFilterOptions } from "@/features/survey/questions";
import type { SurveyFilters } from "@/lib/domain/types";

interface FiltersFormProps {
  filters: SurveyFilters;
}

export function FiltersForm({ filters }: FiltersFormProps) {
  const filterFields = Object.keys(filterFieldLabels) as Array<keyof typeof filterFieldLabels>;

  return (
    <section className="admin-card">
      <div className="admin-header-row">
        <div>
          <h2>Filtros</h2>
          <p className="meta-copy">Filtrá por perfil, etapa, dolor o nivel de interés.</p>
        </div>
        <Link href="/admin/responses" className="ghost-button">
          Limpiar filtros
        </Link>
      </div>

      <form method="get">
        <div className="filter-grid">
          <div className="field-shell">
            <label htmlFor="search">Búsqueda</label>
            <input
              id="search"
              name="search"
              defaultValue={filters.search ?? ""}
              className="text-field"
              placeholder="Nombre, mail o WhatsApp"
            />
          </div>

          {filterFields.map((field) => (
            <div key={field} className="field-shell">
              <label htmlFor={field}>{filterFieldLabels[field]}</label>
              <select id={field} name={field} defaultValue={filters[field] ?? ""} className="select-field">
                <option value="">Todos</option>
                {getFilterOptions(field).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="form-actions" style={{ marginTop: "1rem" }}>
          <button type="submit" className="primary-button">
            Aplicar filtros
          </button>
        </div>
      </form>
    </section>
  );
}
