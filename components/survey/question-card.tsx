import { getCitiesByCountry, getLocalitiesByCountryAndCity, locationTree } from "@/features/survey/location-data";
import type { SurveyFieldName, SurveyFormData, SurveyStepConfig } from "@/lib/domain/types";

interface QuestionCardProps {
  step: SurveyStepConfig;
  values: SurveyFormData;
  error?: string;
  onFieldChange: (field: SurveyFieldName, value: string | string[]) => void;
}

function isSelected(value: string | string[], option: string) {
  return Array.isArray(value) ? value.includes(option) : value === option;
}

export function QuestionCard({ step, values, error, onFieldChange }: QuestionCardProps) {
  const inputId = `field-${step.field}`;
  const currentValue = values[step.field];
  const selectedCount = Array.isArray(currentValue) ? currentValue.length : 0;
  const cities = getCitiesByCountry(values.country_name);
  const localities = getLocalitiesByCountryAndCity(values.country_name, values.city_name);

  return (
    <section className="question-card">
      <header className="question-header">
        <p className="question-kicker">Investigacion para la futura app</p>
        <h2>{step.title}</h2>
        {step.helper ? <p className="question-helper">{step.helper}</p> : null}
        {step.type === "multiple" && step.maxSelections ? (
          <p className="selection-counter">
            {selectedCount} de {step.maxSelections} seleccionadas
          </p>
        ) : null}
      </header>

      {step.type === "single" && step.options ? (
        <div className="choice-grid">
          {step.options.map((option) => {
            const active = isSelected(currentValue, option.value);

            return (
              <button
                key={option.value}
                type="button"
                className={`choice-button${active ? " is-active" : ""}`}
                onClick={() => onFieldChange(step.field, option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {step.type === "multiple" && step.options ? (
        <div className="choice-grid">
          {step.options.map((option) => {
            const current = Array.isArray(currentValue) ? currentValue : [];
            const active = current.includes(option.value);
            const maxReached = Boolean(step.maxSelections && current.length >= step.maxSelections && !active);

            return (
              <button
                key={option.value}
                type="button"
                className={`choice-button${active ? " is-active" : ""}${maxReached ? " is-disabled" : ""}`}
                onClick={() => {
                  const nextValue = active
                    ? current.filter((item) => item !== option.value)
                    : [...current, option.value];
                  onFieldChange(step.field, nextValue);
                }}
                disabled={maxReached}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {step.type === "nameGroup" ? (
        <div className="inline-fields two-columns">
          <div className="field-shell">
            <label htmlFor="first_name">Nombre</label>
            <input
              id="first_name"
              className="text-field"
              value={values.first_name}
              placeholder="Tu nombre"
              onChange={(event) => onFieldChange("first_name", event.target.value)}
            />
          </div>
          <div className="field-shell">
            <label htmlFor="last_name">Apellido</label>
            <input
              id="last_name"
              className="text-field"
              value={values.last_name}
              placeholder="Tu apellido"
              onChange={(event) => onFieldChange("last_name", event.target.value)}
            />
          </div>
        </div>
      ) : null}

      {step.type === "locationGroup" ? (
        <div className="inline-fields">
          <div className="field-shell">
            <label htmlFor="country_name">Pais</label>
            <select
              id="country_name"
              className="select-field"
              value={values.country_name}
              onChange={(event) => onFieldChange("country_name", event.target.value)}
            >
              <option value="">Selecciona un pais</option>
              {locationTree.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>

          <div className="field-shell">
            <label htmlFor="city_name">Ciudad</label>
            <select
              id="city_name"
              className="select-field"
              value={values.city_name}
              onChange={(event) => onFieldChange("city_name", event.target.value)}
              disabled={!values.country_name}
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city) => (
                <option key={city.city} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          <div className="field-shell">
            <label htmlFor="locality_name">Localidad</label>
            <select
              id="locality_name"
              className="select-field"
              value={values.locality_name}
              onChange={(event) => onFieldChange("locality_name", event.target.value)}
              disabled={!values.city_name}
            >
              <option value="">Selecciona una localidad</option>
              {localities.map((locality) => (
                <option key={locality} value={locality}>
                  {locality}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      {step.type === "text" || step.type === "email" || step.type === "tel" ? (
        <div className="text-field-shell">
          {step.type === "text" ? (
            <textarea
              id={inputId}
              className="text-field textarea-field"
              value={typeof currentValue === "string" ? currentValue : ""}
              placeholder={step.placeholder}
              onChange={(event) => onFieldChange(step.field, event.target.value)}
              rows={4}
            />
          ) : (
            <input
              id={inputId}
              className="text-field"
              value={typeof currentValue === "string" ? currentValue : ""}
              type={step.type}
              placeholder={step.placeholder}
              onChange={(event) => onFieldChange(step.field, event.target.value)}
            />
          )}
        </div>
      ) : null}

      {error ? <p className="field-error">{error}</p> : null}
    </section>
  );
}
