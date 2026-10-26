"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError(response.status === 429 ? "Demasiados intentos. Intenta de nuevo en 15 minutos." : "Credenciales inválidas");
        return;
      }

      router.replace("/admin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="editorial-surface mx-auto max-w-md p-7 sm:p-9">
      <p className="eyebrow">Área privada</p>
      <h1 className="mt-2 font-display text-4xl text-olive">Ingreso administrador</h1>
      <p className="mt-3 text-sm leading-6 text-ink/60">Gestiona cotizaciones, galería y reseñas desde un solo lugar.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="field-label mb-1 block">Correo</label>
          <input
            type="email"
            autoComplete="username"
            required
            className="input-luxury"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label className="field-label mb-1 block">Contraseña</label>
          <input
            type="password"
            autoComplete="current-password"
            required
            className="input-luxury"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="editorial-button w-full" type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </section>
  );
}
