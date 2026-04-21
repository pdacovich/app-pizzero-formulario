import Link from "next/link";

import { LoginForm } from "@/app/admin/login/login-form";

export default function AdminLoginPage() {
  return (
    <main className="admin-page">
      <section className="hero-card auth-card">
        <p className="hero-kicker">Panel interno</p>
        <h1>Ingresá al panel admin</h1>
        <p className="hero-copy">
          Este acceso es solo para usuarios dados de alta manualmente en Supabase Auth y
          habilitados en la tabla interna <code>admin_users</code>.
        </p>
        <LoginForm />
        <Link href="/" className="text-link" style={{ marginTop: "1rem", display: "inline-flex" }}>
          Volver al formulario público
        </Link>
      </section>
    </main>
  );
}
