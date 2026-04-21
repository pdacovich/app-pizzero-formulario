import Link from "next/link";

interface ThanksPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function parseSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const params = await searchParams;
  const firstName = parseSearchParam(params.name) || "Gracias";

  return (
    <main className="public-page">
      <section className="thanks-card thanks-card-enhanced">
        <div className="thanks-badge">Respuesta enviada</div>
        <p className="hero-kicker">Investigacion completada</p>
        <h1>{firstName}, gracias por sumarte</h1>
        <p className="hero-copy">
          Tu respuesta ya quedo registrada y nos ayuda a construir una herramienta pensada para
          resolver problemas reales del mundo pizzero.
        </p>
        <p className="hero-copy">
          Si dejaste tus datos y aceptaste que te contactemos, te vamos a tener en cuenta para
          futuras novedades y para una posible beta.
        </p>
        <div className="thanks-actions">
          <Link href="/" className="primary-button link-button">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
