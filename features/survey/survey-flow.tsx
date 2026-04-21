"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { QuestionCard } from "@/components/survey/question-card";
import { ProgressBar } from "@/components/survey/progress-bar";
import { createEmptySurveyFormData } from "@/features/survey/questions";
import { validateSurveyStep } from "@/features/survey/schema";
import { getVisibleSurveySteps, normalizeTrackingValues } from "@/features/survey/utils";
import type { SurveyFieldName, SurveyFormData } from "@/lib/domain/types";

interface SurveyFlowProps {
  tracking: Partial<SurveyFormData>;
  started: boolean;
  onStart: () => void;
}

export function SurveyFlow({ tracking, started, onStart }: SurveyFlowProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<SurveyFormData>(() =>
    normalizeTrackingValues(createEmptySurveyFormData(), tracking)
  );
  const [fieldError, setFieldError] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visibleSteps = useMemo(() => getVisibleSurveySteps(formData), [formData]);
  const currentStep = visibleSteps[currentStepIndex];

  function updateField(field: SurveyFieldName, value: string | string[]) {
    setFieldError("");
    setSubmitError("");

    setFormData((previous) => {
      const nextValue = {
        ...previous,
        [field]: value
      } as SurveyFormData;

      if (field === "contact_permission" && typeof value === "string") {
        if (value !== "email" && value !== "both") {
          nextValue.email = "";
        }

        if (value !== "whatsapp" && value !== "both") {
          nextValue.whatsapp = "";
        }
      }

      if (field === "country_name") {
        nextValue.city_name = "";
        nextValue.locality_name = "";
      }

      if (field === "city_name") {
        nextValue.locality_name = "";
      }

      return nextValue;
    });
  }

  function goToNextStep() {
    if (!currentStep) {
      return;
    }

    const validationResult = validateSurveyStep(currentStep, formData);

    if (!validationResult.success) {
      setFieldError(validationResult.error.issues[0]?.message ?? "Revisa este campo.");
      return;
    }

    setFieldError("");

    if (currentStepIndex < visibleSteps.length - 1) {
      setCurrentStepIndex((value) => value + 1);
    }
  }

  function goToPreviousStep() {
    setFieldError("");
    setSubmitError("");
    setCurrentStepIndex((value) => Math.max(0, value - 1));
  }

  async function handleSubmit() {
    if (!currentStep) {
      return;
    }

    const validationResult = validateSurveyStep(currentStep, formData);

    if (!validationResult.success) {
      setFieldError(validationResult.error.issues[0]?.message ?? "Revisa este campo.");
      return;
    }

    setFieldError("");
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/survey/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "No pudimos guardar tu respuesta.");
      }

      const params = new URLSearchParams({
        name: formData.first_name.trim() || "Pizzero"
      });
      router.push(`/gracias?${params.toString()}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "No pudimos enviar el formulario. Intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!started) {
    return (
      <section className="hero-card">
        <p className="hero-kicker">Validacion de producto</p>
        <h1>Estamos disenando una herramienta pensada para el mundo pizzero</h1>
        <p className="hero-copy">
          Queremos construir una app web realmente util para Pizzeros y duenos de Pizzeria.
          Necesitamos entender problemas reales, tiempos perdidos y necesidades concretas del dia a dia.
        </p>
        <div className="hero-badges">
          <span>2 a 3 minutos</span>
          <span>Una pregunta por pantalla</span>
          <span>Optimizado para celular</span>
        </div>
        <button type="button" className="primary-button" onClick={onStart}>
          Comenzar
        </button>
      </section>
    );
  }

  if (!currentStep) {
    return null;
  }

  return (
    <section className="flow-shell">
      <ProgressBar currentStep={currentStepIndex + 1} totalSteps={visibleSteps.length} />

      <QuestionCard
        step={currentStep}
        values={formData}
        error={fieldError}
        onFieldChange={updateField}
      />

      {submitError ? <p className="submit-error">{submitError}</p> : null}

      <div className="flow-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0 || isSubmitting}
        >
          Anterior
        </button>

        {currentStepIndex === visibleSteps.length - 1 ? (
          <button type="button" className="primary-button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar respuestas"}
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={goToNextStep}>
            Continuar
          </button>
        )}
      </div>
    </section>
  );
}
