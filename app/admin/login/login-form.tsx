"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        throw signInError;
      }

      router.push("/admin/responses");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "No pudimos iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <div className="field-shell">
        <label htmlFor="email">Mail</label>
        <input
          id="email"
          className="text-field"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="field-shell">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          className="text-field"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      {error ? <p className="inline-error">{error}</p> : null}

      <button type="submit" className="primary-button" disabled={isLoading}>
        {isLoading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
