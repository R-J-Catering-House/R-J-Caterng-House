export const revalidate = 3600;

async function getCatalog() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
  const response = await fetch(`${baseUrl}/api/v1/catalog`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return { packages: [] as Array<{ id: number; name: string; description: string; price_per_person: number }> };
  }

  return response.json();
}

export default async function CatalogPage() {
  const data = await getCatalog();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Catálogo</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data.packages.map((pkg: { id: number; name: string; description: string; price_per_person: number }) => (
          <article key={pkg.id} className="rounded-lg border border-graphite-lightGray bg-white p-4">
            <h2 className="text-xl font-semibold">{pkg.name}</h2>
            <p className="text-sm text-graphite-grayBlue">{pkg.description}</p>
            <p className="mt-3 font-medium">₡{pkg.price_per_person.toLocaleString("es-CR")} por persona</p>
          </article>
        ))}
      </div>
    </section>
  );
}
