"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

type SalonId = "tecal" | "asador" | "corteza";
type Food = { id: number; name: string; description: string; price: number; image: string };
type Addon = { id: string; name: string; price: number; image: string };

const salons: Record<SalonId, { name: string; place: string; package: string; packagePrice: number; description: string; maxGuests: number; image: string }> = {
  tecal: { name: "El Tecal", place: "Uvita", package: "Esmeralda VIP", packagePrice: 2400000, description: "Experiencia tropical con villa, piscina y atención VIP.", maxGuests: 800, image: "/images/salon-tecal.png" },
  asador: { name: "El Asador", place: "General Viejo", package: "Dorado", packagePrice: 0, description: "La casa de R&J para celebrar con sabor y servicio cercano.", maxGuests: 150, image: "/images/salon-asador.png" },
  corteza: { name: "La Corteza", place: "Palmares · Pérez Zeledón", package: "Plata", packagePrice: 0, description: "Un entorno íntimo y elegante para reuniones especiales.", maxGuests: 150, image: "/images/salon-corteza.png" },
};

const foods: Food[] = [
  { id: 1, name: "Mano de piedra", description: "Salsa demiglace y hongos.", price: 11000, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Pechuga a la parrilla", description: "Salsa Alfredo de hongos.", price: 12500, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Cordon Bleu", description: "Salsa Alfredo de hongos.", price: 14000, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Costilla de cerdo", description: "BBQ de manzana.", price: 12000, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "NY Steak", description: "300 g importado con chimichurri argentino.", price: 16500, image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85" },
];

const starters: Addon[] = [
  { id: "sopa", name: "Sopa Azteca", price: 2000, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=85" },
  { id: "ayote", name: "Crema de ayote y crotones", price: 2000, image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=700&q=85" },
  { id: "salmon", name: "Ensalada verde y salmón", price: 2000, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85" },
  { id: "burger", name: "Mini hamburguesa", price: 2000, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85" },
];

const desserts: Addon[] = [
  { id: "cheesecake", name: "Torta de queso con moras", price: 0, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85" },
  { id: "flan", name: "Flan horneado", price: 0, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85" },
  { id: "tiramisu", name: "Tiramisú", price: 0, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=85" },
];

const sides = ["Puré de papas", "Papas rostizadas", "Arroz con almendras", "Ensalada verde", "Vegetales a la parrilla"];
const cocktails = [
  { id: "margarita", name: "Margarita", price: 3000 },
  { id: "gin", name: "Gin Tonic", price: 2000 },
  { id: "primavera", name: "Primavera sin alcohol", price: 1500 },
];
const optionalServices = [
  { id: "dj", name: "DJ · 4 horas", price: 200000 },
  { id: "ceremonias", name: "Maestro de ceremonias · 4 horas", price: 190000 },
  { id: "fotografo", name: "Fotógrafo profesional", price: 220000 },
  { id: "fotocabina", name: "Fotocabina abierta", price: 85000 },
  { id: "espejo", name: "Espejo mágico", price: 120000 },
  { id: "video360", name: "Plataforma video 360°", price: 110000 },
];
const crc = (value: number) => `₡${Math.round(value).toLocaleString("es-CR")}`;

export default function CotizadorPage() {
  const [salonId, setSalonId] = useState<SalonId>("asador");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("16:00");
  const [end, setEnd] = useState("22:00");
  const [guests, setGuests] = useState(60);
  const [foodId, setFoodId] = useState(1);
  const [foodQty, setFoodQty] = useState(60);
  const [sideChoices, setSideChoices] = useState<string[]>(sides.slice(0, 2));
  const [starterId, setStarterId] = useState("");
  const [starterQty, setStarterQty] = useState(0);
  const [wantsDessert, setWantsDessert] = useState(false);
  const [dessertId, setDessertId] = useState("");
  const [dessertQty, setDessertQty] = useState(0);
  const [cocktailId, setCocktailId] = useState("");
  const [cocktailQty, setCocktailQty] = useState(0);
  const [wantsBar, setWantsBar] = useState(false);
  const [decoration, setDecoration] = useState("Rústico Chic");
  const [centerpiece, setCenterpiece] = useState("Sin centro de mesa");
  const [cakeReference, setCakeReference] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", location: "" });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("salon") as SalonId | null;
    if (requested && requested in salons) setSalonId(requested);
  }, []);

  const salon = salons[salonId];
  const food = foods.find((item) => item.id === foodId) ?? foods[0];
  const starter = starters.find((item) => item.id === starterId);
  const dessert = desserts.find((item) => item.id === dessertId);
  const cocktail = cocktails.find((item) => item.id === cocktailId);
  const vipIncluded = salonId === "tecal";
  const cocktailTotal = cocktail && !vipIncluded ? cocktail.price * cocktailQty : 0;
  const dessertTotal = wantsDessert ? 85000 : 0;
  const servicesTotal = optionalServices.filter((item) => selectedServices.includes(item.id)).reduce((sum, item) => sum + item.price, 0);
  const cakeTotal = cakeReference ? 30000 : 0;
  const total = useMemo(() => salon.packagePrice + food.price * foodQty + (starter ? starter.price * starterQty : 0) + dessertTotal + cocktailTotal + servicesTotal + cakeTotal, [cakeTotal, cocktailTotal, dessertTotal, food.price, foodQty, salon.packagePrice, servicesTotal, starter, starterQty]);
  const summary = [
    `Paquete ${salon.package} · ${salon.name}`,
    `Fecha: ${date || "por confirmar"} · ${guests} invitados · ${start}-${end}`,
    `Platillo: ${food.name} x ${foodQty} ${crc(food.price * foodQty)}`,
    starter ? `Entrada: ${starter.name} x ${starterQty} ${crc(starter.price * starterQty)}` : "Sin entrada",
    wantsDessert ? `Mesa de postres: ${dessert?.name ?? "selección pendiente"} x ${dessertQty} ${crc(dessertTotal)}` : "Sin mesa de postres",
    cocktail ? `Cóctel: ${cocktail.name} x ${cocktailQty} ${vipIncluded ? "incluido" : crc(cocktailTotal)}` : "Sin cóctel de bienvenida",
    `Barra de bebidas: ${wantsBar ? "solicitar cotización" : "no"}`,
    `Decoración: ${decoration} · Centro de mesa: ${centerpiece}`,
    `Servicios adicionales: ${selectedServices.length ? optionalServices.filter((item) => selectedServices.includes(item.id)).map((item) => `${item.name} ${crc(item.price)}`).join(", ") : "ninguno"}`,
    `Pastel: ${cakeReference ? `referencia adjunta ${crc(cakeTotal)}` : "no solicitado"}`,
    `Total estimado: ${crc(total)}`,
  ];

  function updateGuests(value: number) {
    const next = Math.max(60, Math.min(salon.maxGuests, value || 60));
    setGuests(next);
    setFoodQty(next);
  }

  function chooseSalon(id: SalonId) {
    setSalonId(id);
    setGuests((value) => Math.min(value, salons[id].maxGuests));
    setFoodQty((value) => Math.min(value, salons[id].maxGuests));
  }

  function toggleSide(value: string) {
    setSideChoices((current) => current.includes(value) ? current.filter((item) => item !== value) : current.length < 2 ? [...current, value] : current);
  }

  function handleCake(event: ChangeEvent<HTMLInputElement>) {
    setCakeReference(event.target.files?.[0]?.name ?? "");
  }

  function toggleService(id: string) {
    setSelectedServices((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  async function saveQuote() {
    if (!customer.name || !customer.email || !customer.phone || !customer.location) {
      setNotice("Completa nombre, correo, teléfono y ubicación para guardar la cotización.");
      return;
    }
    setLoading(true);
    setNotice("");
    const api = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
    try {
      const payload = { customer_name: customer.name, customer_email: customer.email, guests, package_id: food.id, event_date: date || null, addons: { entradas: Boolean(starter), postres: wantsDessert, dj: false, fotocabina: false } };
      const response = await fetch(`${api}/api/v1/quotes/calculate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("No se pudo guardar la cotización.");
      await fetch(`${api}/api/v1/quotes/send-pdf`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setNotice("La cotización quedó guardada. Estamos para servirle.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No se pudo guardar la cotización.");
    } finally {
      setLoading(false);
    }
  }

  function contactPlanner() {
    if (!customer.name || !customer.email || !customer.phone || !customer.location) {
      setNotice("Completa nombre, correo, teléfono y ubicación antes de contactar a la Wedding Planner.");
      return;
    }
    const phone = process.env.NEXT_PUBLIC_WEDDING_PLANNER_PHONE ?? "50662916883";
    const text = encodeURIComponent(`Hola, soy ${customer.name}. Deseo reservar con R&J Catering House.\n${summary.join("\n")}\nContacto: ${customer.email} · ${customer.phone} · ${customer.location}\nQuedo en contacto con la Wedding Planner para confirmar disponibilidad y detalles.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col gap-4 border-b border-gold/30 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">R&J Catering House</p><h1 className="mt-3 font-display text-5xl leading-none text-emerald sm:text-7xl">Diseña tu <span className="text-gold">celebración.</span></h1><p className="mt-4 max-w-xl text-sm leading-7 text-ink/60">Elige el salón que corresponde a tu paquete, personaliza el menú y recibe un resumen completo.</p></div><Link href="/" className="text-sm font-bold text-emerald hover:text-gold">Volver al inicio</Link></header>
      <nav className="grid grid-cols-3 gap-2" aria-label="Pasos de cotización">{["Salón y fecha", "Menú y extras", "Registro y resumen"].map((label, index) => <button key={label} type="button" onClick={() => setStep(index + 1)} className={`rounded-xl p-3 text-left text-xs font-bold ${step === index + 1 ? "bg-emerald text-white" : "bg-white text-ink/45 shadow-sm"}`}><span className="block text-[10px] text-gold">0{index + 1}</span>{label}</button>)}</nav>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px]">
        <main className="space-y-6">
          {step === 1 && <section className="space-y-7 rounded-2xl bg-white p-6 shadow-md sm:p-8"><div><p className="eyebrow">Paso 1 · Paquete ligado al salón</p><h2 className="section-title">Elige dónde sucede</h2></div><div className="grid gap-4 md:grid-cols-3">{(Object.entries(salons) as [SalonId, typeof salons[SalonId]][]).map(([id, item]) => <button type="button" key={id} onClick={() => chooseSalon(id)} className={`overflow-hidden rounded-2xl bg-cream text-left shadow-sm transition ${salonId === id ? "ring-2 ring-gold" : "hover:-translate-y-1"}`}><img src={item.image} alt={item.name} className="h-32 w-full object-cover" /><div className="p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-gold">Paquete {item.package}</p><h3 className="font-display text-2xl text-emerald">{item.name}</h3><p className="text-xs text-ink/55">{item.place} · hasta {item.maxGuests} personas</p><p className="mt-3 text-sm font-bold text-emerald">{item.packagePrice ? `${crc(item.packagePrice)} base` : "Precio según menú"}</p></div></button>)}</div><div className="grid gap-4 sm:grid-cols-3"><label className="field-label">Fecha<input className="input-luxury" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label className="field-label">Hora inicio<input className="input-luxury" type="time" value={start} onChange={(event) => setStart(event.target.value)} /></label><label className="field-label">Hora fin<input className="input-luxury" type="time" value={end} onChange={(event) => setEnd(event.target.value)} /></label></div><label className="field-label block max-w-xs">Número de invitados<input className="input-luxury" type="number" min={60} max={salon.maxGuests} value={guests} onChange={(event) => updateGuests(Number(event.target.value))} /></label><div className="flex justify-end"><button type="button" onClick={() => setStep(2)} className="rounded-xl bg-emerald px-6 py-3 text-sm font-bold text-white">Continuar</button></div></section>}
          {step === 2 && <section className="space-y-8 rounded-2xl bg-white p-6 shadow-md sm:p-8"><div><p className="eyebrow">Paso 2 · Menú y servicios</p><h2 className="section-title">Elige exactamente lo que necesitas</h2></div><div><div className="flex items-end justify-between"><div><h3 className="font-display text-3xl text-emerald">Platillo principal</h3><p className="mt-1 text-xs text-ink/50">Una opción de menú y la cantidad de platillos que deseas servir.</p></div><label className="field-label w-32">Cantidad<input className="input-luxury" type="number" min={1} max={salon.maxGuests} value={foodQty} onChange={(event) => setFoodQty(Math.max(1, Math.min(salon.maxGuests, Number(event.target.value) || 1)))} /></label></div><div className="mt-4 grid gap-4 sm:grid-cols-2">{foods.map((item) => <button key={item.id} type="button" onClick={() => setFoodId(item.id)} className={`overflow-hidden rounded-2xl bg-cream text-left shadow-sm ${foodId === item.id ? "ring-2 ring-gold" : ""}`}><img src={item.image} alt={item.name} className="h-40 w-full object-cover" /><div className="p-4"><div className="flex justify-between gap-3"><h4 className="font-display text-xl text-emerald">{item.name}</h4><b className="text-sm text-gold">{crc(item.price)}</b></div><p className="mt-1 text-xs text-ink/55">{item.description} · por platillo</p></div></button>)}</div></div><div><h3 className="font-display text-3xl text-emerald">Acompañamientos</h3><p className="mt-1 text-xs text-ink/50">Selecciona hasta 2 incluidos en el paquete.</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{sides.map((item) => <button key={item} type="button" onClick={() => toggleSide(item)} className={`rounded-xl border p-3 text-left text-sm ${sideChoices.includes(item) ? "border-emerald bg-emerald/5 text-emerald" : "border-ink/10"}`}>{sideChoices.includes(item) ? "✓ " : ""}{item}</button>)}</div></div><div><div className="flex items-center justify-between"><div><h3 className="font-display text-3xl text-emerald">Entrada</h3><p className="mt-1 text-xs text-ink/50">Solo puedes elegir una entrada · {crc(2000)} por persona.</p></div>{starter && <label className="field-label w-32">Cantidad<input className="input-luxury" type="number" min={1} max={guests} value={starterQty} onChange={(event) => setStarterQty(Math.max(1, Math.min(guests, Number(event.target.value) || 1)))} /></label>}</div><div className="mt-4 grid gap-3 sm:grid-cols-2">{starters.map((item) => <button key={item.id} type="button" onClick={() => { setStarterId(starterId === item.id ? "" : item.id); setStarterQty(starterId === item.id ? 0 : guests); }} className={`flex items-center gap-3 rounded-xl border p-3 text-left ${starterId === item.id ? "border-gold bg-gold/10" : "border-ink/10"}`}><img src={item.image} alt="" className="h-16 w-16 rounded-lg object-cover" /><span className="text-sm font-bold text-emerald">{item.name}</span></button>)}</div></div><div className="rounded-2xl bg-cream p-5"><div className="flex items-center justify-between"><div><h3 className="font-display text-3xl text-emerald">Mesa de postres</h3><p className="mt-1 text-xs text-ink/55">Adicional · {crc(85000)} · puedes dejarla fuera.</p></div><button type="button" role="switch" aria-checked={wantsDessert} onClick={() => setWantsDessert(!wantsDessert)} className={`toggle ${wantsDessert ? "active" : ""}`}><span /></button></div>{wantsDessert && <div className="mt-4 grid gap-3 sm:grid-cols-3">{desserts.map((item) => <button key={item.id} type="button" onClick={() => { setDessertId(item.id); setDessertQty(guests); }} className={`overflow-hidden rounded-xl bg-white text-left ${dessertId === item.id ? "ring-2 ring-gold" : ""}`}><img src={item.image} alt={item.name} className="h-24 w-full object-cover" /><span className="block p-3 text-xs font-bold text-emerald">{item.name}</span></button>)}</div>}{wantsDessert && dessert && <label className="field-label mt-4 block max-w-xs">Cantidad de postres<input className="input-luxury bg-white" type="number" min={1} value={dessertQty} onChange={(event) => setDessertQty(Math.max(1, Number(event.target.value) || 1))} /></label>}</div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-ink/10 p-5"><div className="flex items-center justify-between gap-3"><div><h3 className="font-display text-2xl text-emerald">Cóctel de bienvenida</h3><p className="mt-1 text-xs text-ink/50">{vipIncluded ? "Incluido en Esmeralda VIP" : "Adicional por persona"}</p></div><select className="input-luxury mt-0 w-40" value={cocktailId} onChange={(event) => { setCocktailId(event.target.value); setCocktailQty(event.target.value ? guests : 0); }}><option value="">Sin cóctel</option>{cocktails.map((item) => <option key={item.id} value={item.id}>{item.name} · {vipIncluded ? "₡0" : crc(item.price)}</option>)}</select></div>{cocktail && <label className="field-label mt-4 block">Cantidad de bebidas<input className="input-luxury" type="number" min={1} value={cocktailQty} onChange={(event) => setCocktailQty(Math.max(1, Number(event.target.value) || 1))} /></label>}</div><div className="rounded-2xl border border-ink/10 p-5"><div className="flex items-center justify-between gap-3"><div><h3 className="font-display text-2xl text-emerald">Barra de bebidas</h3><p className="mt-1 text-xs text-ink/50">Servicio adicional · precio por cotizar</p></div><button type="button" role="switch" aria-checked={wantsBar} onClick={() => setWantsBar(!wantsBar)} className={`toggle ${wantsBar ? "active" : ""}`}><span /></button></div></div></div><div className="flex justify-between"><button type="button" onClick={() => setStep(1)} className="rounded-xl border border-ink/10 px-5 py-3 text-sm font-bold text-emerald">Atrás</button><button type="button" onClick={() => setStep(3)} className="rounded-xl bg-emerald px-6 py-3 text-sm font-bold text-white">Continuar</button></div></section>}
          {step === 3 && <section className="space-y-7 rounded-2xl bg-white p-6 shadow-md sm:p-8"><div><p className="eyebrow">Paso 3 · Registro y resumen</p><h2 className="section-title">Déjanos tus datos</h2><p className="mt-2 text-sm text-ink/55">Necesitamos esta información para atender la reserva y mantenernos en contacto.</p></div><div className="grid gap-4 sm:grid-cols-2"><label className="field-label">Nombre completo<input className="input-luxury" value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} /></label><label className="field-label">Correo electrónico<input className="input-luxury" type="email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} /></label><label className="field-label">Número de teléfono<input className="input-luxury" type="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} /></label><label className="field-label">Ubicación del evento<input className="input-luxury" value={customer.location} onChange={(event) => setCustomer({ ...customer, location: event.target.value })} /></label></div><div className="grid gap-4 sm:grid-cols-2"><label className="field-label">Decoración<select className="input-luxury" value={decoration} onChange={(event) => setDecoration(event.target.value)}><option>Rústico Chic</option><option>Romántico Elegante</option><option>Minimalista Dorado</option><option>Tropical VIP</option></select></label><label className="field-label">Centro de mesa<select className="input-luxury" value={centerpiece} onChange={(event) => setCenterpiece(event.target.value)}><option>Sin centro de mesa</option><option>Arreglos florales naturales</option><option>Bases altas</option><option>Iluminación con velas</option></select></label></div><label className="field-label block rounded-xl bg-cream p-5">Referencia del pastel · {crc(30000)}<input className="input-luxury bg-white" type="file" accept="image/*" onChange={handleCake} /><small className="mt-2 block normal-case tracking-normal text-ink/45">Esta referencia pertenece al pastel, separado de la decoración.{cakeReference && ` Archivo: ${cakeReference}`}</small></label><div className="rounded-2xl bg-cream p-5"><h3 className="font-display text-3xl text-emerald">Resumen de tu selección</h3><ul className="mt-4 space-y-2 text-sm text-ink/65">{summary.map((item) => <li key={item} className="border-b border-ink/10 pb-2">{item}</li>)}</ul></div>{notice && <p className="rounded-xl bg-gold/15 p-4 text-sm font-bold text-emerald">{notice}</p>}<div className="flex flex-wrap justify-between gap-3"><button type="button" onClick={() => setStep(2)} className="rounded-xl border border-ink/10 px-5 py-3 text-sm font-bold text-emerald">Atrás</button><div className="flex flex-wrap gap-3"><button type="button" disabled={loading} onClick={saveQuote} className="rounded-xl border border-emerald px-5 py-3 text-sm font-bold text-emerald disabled:opacity-40">{loading ? "Guardando..." : "Dejar cotización en espera"}</button><button type="button" onClick={contactPlanner} className="rounded-xl bg-gold px-5 py-3 text-sm font-bold text-white">Enviar resumen por WhatsApp</button></div></div></section>}
        </main>
        {step === 3 && <section className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2"><h2 className="font-display text-3xl text-emerald">Servicios adicionales</h2><p className="mt-1 text-xs text-ink/50">Son opcionales y se agregan aparte del paquete.</p><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{optionalServices.map((item) => <button key={item.id} type="button" onClick={() => toggleService(item.id)} className={`flex items-center justify-between rounded-xl border p-3 text-left text-sm ${selectedServices.includes(item.id) ? "border-gold bg-gold/10 text-emerald" : "border-ink/10"}`}><span>{selectedServices.includes(item.id) ? "✓ " : ""}{item.name}</span><b>{crc(item.price)}</b></button>)}</div></section>}
        <aside className="lg:sticky lg:top-6"><div className="overflow-hidden rounded-3xl bg-white shadow-lg"><div className="bg-emerald p-6 text-white"><p className="text-xs font-bold uppercase tracking-widest text-gold">Resumen en vivo</p><h2 className="mt-2 font-display text-3xl">{salon.package}</h2><p className="mt-2 text-sm text-white/70">{salon.name} · {guests} personas</p></div><div className="space-y-4 p-6 text-sm"><div className="flex justify-between gap-3"><span className="text-ink/55">Base del paquete</span><b className="text-emerald">{salon.packagePrice ? crc(salon.packagePrice) : "Según menú"}</b></div><div className="flex justify-between gap-3"><span className="text-ink/55">Platillos · {foodQty}</span><b className="text-emerald">{crc(food.price * foodQty)}</b></div>{starter && <div className="flex justify-between gap-3"><span className="text-ink/55">Entrada · {starterQty}</span><b className="text-emerald">{crc(starter.price * starterQty)}</b></div>}{wantsDessert && <div className="flex justify-between gap-3"><span className="text-ink/55">Mesa de postres</span><b className="text-emerald">{crc(dessertTotal)}</b></div>}{cocktail && <div className="flex justify-between gap-3"><span className="text-ink/55">Cóctel · {cocktailQty}</span><b className="text-emerald">{vipIncluded ? "Incluido" : crc(cocktailTotal)}</b></div>}{wantsBar && <div className="flex justify-between gap-3"><span className="text-ink/55">Barra de bebidas</span><b className="text-gold">Por cotizar</b></div>}<div className="border-t border-ink/10 pt-4"><span className="text-xs uppercase tracking-wider text-ink/45">Total estimado</span><strong className="mt-1 block font-display text-4xl text-gold">{crc(total)}</strong><p className="mt-1 text-xs text-ink/45">La barra de bebidas se confirma por separado.</p></div></div></div></aside>
      </div>
    </div>
  );
}