import Link from "next/link";
import Logo from "@/components/logo";
import { siteConfig, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="flex w-full flex-col items-center gap-6 border-t-2 border-dashed border-gold bg-navy px-margin-edge py-12 text-white md:flex-row md:justify-between">
      <div className="flex flex-col items-center gap-2 md:items-start">
        <Logo tone="gold" className="h-11" />
        <span className="font-label-tech text-[10px] uppercase tracking-widest opacity-80">
          {dict.footer.tagline} — {dict.footer.address}
        </span>
      </div>
      <nav aria-label="Legal" className="flex gap-6">
        <Link href={`/${locale}/contacto`} className="font-label-tech text-[10px] uppercase tracking-widest opacity-90 hover:text-gold hover:opacity-100">
          {dict.footer.privacy}
        </Link>
        <Link href={`/${locale}/contacto`} className="font-label-tech text-[10px] uppercase tracking-widest opacity-90 hover:text-gold hover:opacity-100">
          {dict.footer.terms}
        </Link>
        <Link href={`/${locale}/contacto`} className="font-label-tech text-[10px] uppercase tracking-widest opacity-90 hover:text-gold hover:opacity-100">
          {dict.footer.compliance}
        </Link>
      </nav>
      <span className="font-label-tech text-[10px] uppercase tracking-widest opacity-80">
        © {year} {siteConfig.name} — {dict.footer.rights}
      </span>
    </footer>
  );
}
