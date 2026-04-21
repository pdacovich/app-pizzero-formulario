import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "APP Pizzeros | Investigación de producto",
  description:
    "Formulario de validación para una futura herramienta pensada para Pizzeros y dueños de Pizzería."
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
