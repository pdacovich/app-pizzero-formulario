import type { Metadata } from "next";

import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://formulario.metododacovich.com";
const ogImageUrl = `${appUrl.replace(/\/$/, "")}/opengraph-image`;
const twitterImageUrl = `${appUrl.replace(/\/$/, "")}/twitter-image`;

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Formulario para Pizzeros | Metodo Dacovich",
  description:
    "Ayudanos a validar una futura herramienta para Pizzeros y duenos de Pizzeria. Responder lleva 2 a 3 minutos.",
  openGraph: {
    title: "Formulario para Pizzeros | Metodo Dacovich",
    description:
      "Queremos entender dolores reales, tiempos perdidos y necesidades concretas del dia a dia pizzero.",
    url: appUrl,
    siteName: "Metodo Dacovich",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Formulario para Pizzeros - Metodo Dacovich"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Formulario para Pizzeros | Metodo Dacovich",
    description:
      "Ayudanos a validar una futura herramienta para Pizzeros y duenos de Pizzeria.",
    images: [twitterImageUrl]
  },
  alternates: {
    canonical: appUrl
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
