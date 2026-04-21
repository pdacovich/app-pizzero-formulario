import type { Metadata } from "next";

import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://formulario.metododacovich.com";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "APP Pizzeros | Investigacion de producto",
  description:
    "Formulario de validacion para una futura herramienta pensada para Pizzeros y duenos de Pizzeria.",
  openGraph: {
    title: "APP Pizzeros | Investigacion de producto",
    description:
      "Ayudanos a validar una futura herramienta para Pizzeros y duenos de Pizzeria. Responder lleva 2 a 3 minutos.",
    url: appUrl,
    siteName: "Metodo Dacovich",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "APP Pizzeros - Investigacion de producto"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "APP Pizzeros | Investigacion de producto",
    description:
      "Ayudanos a validar una futura herramienta para Pizzeros y duenos de Pizzeria.",
    images: ["/twitter-image"]
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
