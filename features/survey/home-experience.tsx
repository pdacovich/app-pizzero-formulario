"use client";

import { useState } from "react";
import Image from "next/image";

import { SurveyFlow } from "@/features/survey/survey-flow";
import type { SurveyFormData } from "@/lib/domain/types";
import metodoDacovichLogo from "@/images/Logo Metodo Dacovich - Gris.png";

interface HomeExperienceProps {
  tracking: Partial<SurveyFormData>;
}

export function HomeExperience({ tracking }: HomeExperienceProps) {
  const [started, setStarted] = useState(false);

  return (
    <main className={`public-page${started ? " has-mobile-fixed-header" : ""}`}>
      {started ? (
        <div className="mobile-fixed-brand" aria-label="Metodo Dacovich">
          <Image
            src={metodoDacovichLogo}
            alt="Metodo Dacovich"
            className="mobile-fixed-brand-logo"
            priority
          />
        </div>
      ) : null}

      <section className={`public-header${started ? " is-collapsed-on-mobile" : ""}`}>
        <div className="brand-lockup">
          <Image
            src={metodoDacovichLogo}
            alt="Metodo Dacovich"
            className="brand-logo"
            priority
          />
          <p className="public-eyebrow">Investigacion de producto</p>
        </div>
        <p className="public-lead">
          Estamos investigando como deberia verse una herramienta de bolsillo util de verdad para
          el trabajo diario en una Pizzeria.
        </p>
      </section>

      <SurveyFlow tracking={tracking} started={started} onStart={() => setStarted(true)} />
    </main>
  );
}
