"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function BottomNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() || "/";

  const items = [
    { href: `/${locale}`, label: dict.nav.inicio, icon: "home" },
    { href: `/${locale}/productos`, label: dict.nav.productos, icon: "architecture" },
    { href: `/${locale}/servicios`, label: dict.nav.servicios, icon: "precision_manufacturing" },
    { href: `/${locale}/marcas`, label: dict.nav.marcas, icon: "style" },
    { href: `/${locale}/contacto`, label: dict.nav.contacto, icon: "mail" },
  ];

  const isActive = (href: string) => (href === `/${locale}` ? pathname === href : pathname.startsWith(href));

  return (
    <nav
      aria-label="Principal"
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t-2 border-navy bg-surface-container lg:hidden"
    >
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex h-full flex-1 flex-col items-center justify-center gap-1 ${
              active ? "text-gold font-bold" : "text-on-surface-variant"
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              aria-hidden="true"
              style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-label-tech text-[9px] uppercase">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
