import Image from "next/image";

import { SurveyFlow } from "@/features/survey/survey-flow";
import metodoDacovichLogo from "@/images/Logo Metodo Dacovich - Gris.png";

interface HomePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function parseSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  return (
    <main className="public-page">
      <section className="public-header">
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

      <SurveyFlow
        tracking={{
          source: parseSearchParam(params.source),
          utm_source: parseSearchParam(params.utm_source),
          utm_medium: parseSearchParam(params.utm_medium),
          utm_campaign: parseSearchParam(params.utm_campaign),
          utm_content: parseSearchParam(params.utm_content),
          ref: parseSearchParam(params.ref)
        }}
      />
    </main>
  );
}
