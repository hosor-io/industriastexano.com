"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import LanguageSwitcher from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  const navItems = [
    { href: `/${locale}`, label: dict.nav.inicio, icon: "home" },
    { href: `/${locale}/nosotros`, label: dict.nav.nosotros, icon: "history_edu" },
    { href: `/${locale}/productos`, label: dict.nav.productos, icon: "architecture" },
    { href: `/${locale}/servicios`, label: dict.nav.servicios, icon: "precision_manufacturing" },
    { href: `/${locale}/marcas`, label: dict.nav.marcas, icon: "style" },
    { href: `/${locale}/contacto`, label: dict.nav.contacto, icon: "mail" },
  ];

  const isActive = (href: string) => (href === `/${locale}` ? pathname === href : pathname.startsWith(href));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b-2 border-dashed border-outline-variant bg-surface px-margin-edge">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(true)}
            className="material-symbols-outlined text-ink lg:hidden"
          >
            menu
          </button>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo tone="ink" className="h-11" />
          </Link>
        </div>

        <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-label-tech text-label-tech uppercase px-3 py-2 transition-colors ${
                isActive(item.href) ? "bg-navy text-white" : "text-ink hover:bg-surface-container-highest"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher locale={locale} label={dict.nav.langSwitch} className="text-ink" />
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label={dict.nav.menuClose}
          className="absolute inset-0 bg-ink/50"
          onClick={() => setOpen(false)}
        />
        <nav
          id="mobile-drawer"
          aria-label="Principal"
          className={`absolute inset-y-0 left-0 flex h-full w-80 max-w-[85vw] flex-col border-r-4 border-navy bg-surface-container transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b-2 border-dashed border-outline-variant p-margin-edge">
            <span className="font-label-tech text-headline-md font-bold uppercase tracking-tighter">
              {dict.nav.menuOpen}
            </span>
            <button
              type="button"
              aria-label={dict.nav.menuClose}
              className="material-symbols-outlined"
              onClick={() => setOpen(false)}
            >
              close
            </button>
          </div>
          <div className="flex-grow overflow-y-auto py-gutter">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 px-margin-edge py-4 font-label-tech uppercase transition-all ${
                  isActive(item.href)
                    ? "bg-gold text-on-gold font-bold"
                    : "text-on-surface hover:bg-surface-container-highest"
                }`}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
