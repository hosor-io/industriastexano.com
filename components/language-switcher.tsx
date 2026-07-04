"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({
  locale,
  label,
  className = "",
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const other: Locale = locale === "es" ? "en" : "es";
  const rest = pathname.split("/").slice(2).join("/");
  const target = `/${other}${rest ? `/${rest}` : ""}`;

  return (
    <Link
      href={target}
      hrefLang={other}
      className={`font-label-tech text-label-tech uppercase border border-current px-3 py-1 transition-colors hover:bg-gold hover:text-on-gold hover:border-gold ${className}`}
    >
      {label}
    </Link>
  );
}
