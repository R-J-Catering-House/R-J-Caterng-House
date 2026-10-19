import AgendaAccordion from "@/components/marketing/AgendaAccordion";
import SiteHeader from "@/components/marketing/SiteHeader";

export default function AgendaPage() {
  return (
    <div className="space-y-0 bg-[#FAF7F2]">
      <section className="relative -mx-4 sm:-mx-8 lg:-mx-12">
        <img
          src="/images/salon-tecal.png"
          alt="Espacio de banquete R&J con luz natural"
          className="h-[380px] w-full rounded-b-3xl object-cover shadow-sm md:h-[450px]"
        />
        <div className="absolute inset-x-4 top-4 sm:inset-x-8 lg:inset-x-12">
          <SiteHeader sticky={false} />
        </div>
      </section>
      <section className="pb-20 pt-10">
        <h1 className="my-6 text-center font-display text-4xl font-bold text-gray-900 md:text-5xl">Agenda 2026-2027</h1>
        <p className="mb-10 text-center text-sm text-gray-600">Consulta nuestras fechas abiertas para eventos privados, bodas y banquetes corporativos.</p>
        <div className="mx-auto mb-20 grid max-w-5xl grid-cols-1 gap-x-16 gap-y-2 px-6 md:grid-cols-2">
          <AgendaAccordion />
        </div>
      </section>
    </div>
  );
}
