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
    <section className="space-y-6">
      {pathname !== "/admin/login" && (
        <nav className="flex items-center justify-between rounded bg-white p-4 shadow">
          <p className="font-semibold">Panel de administración</p>
          <div className="flex gap-3">
            <Link href="/admin">Dashboard</Link>
            <button
              type="button"
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
