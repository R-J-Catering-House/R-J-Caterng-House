"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin/login") {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) return null;

  return (
    <section className="space-y-8">
      {pathname !== "/admin/login" && (
        <nav className="editorial-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="eyebrow">R&J Catering House</p>
            <p className="font-display text-2xl text-olive">Panel de administración</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-olive">
            <Link href="/">Ver sitio</Link>
            <Link href="/admin">Dashboard</Link>
            <button
              type="button"
              className="rounded-full border border-terracotta/40 px-4 py-2 text-terracotta transition hover:bg-terracotta hover:text-white"
              onClick={() => {
                localStorage.removeItem("admin_token");
                router.push("/admin/login");
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      )}
      {children}
    </section>
  );
}
