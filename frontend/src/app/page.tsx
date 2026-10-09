import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-bold text-graphite-mutedOlive">R&J Catering House</h1>
      <p className="text-lg text-graphite-grayBlue">
        Plataforma integral para eventos: catálogo, cotizador y gestión administrativa.
      </p>
      <div className="flex gap-3">
        <Link className="rounded bg-graphite-mutedOlive px-4 py-2 text-white" href="/catalogo">
          Ver catálogo
        </Link>
        <Link className="rounded bg-graphite-grayBlue px-4 py-2 text-white" href="/cotizador">
          Ir al cotizador
        </Link>
      </div>
    </section>
  );
}
