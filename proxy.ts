import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const isWww = host.startsWith("www.");

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!isWww && hasLocale) return NextResponse.next();

  // Collapse the www→apex host canonicalization and the default-locale
  // redirect into a single permanent hop, instead of two separate 307s
  // (industriastexano.com and www.industriastexano.com were otherwise
  // living as independent, un-redirected duplicate hosts).
  const url = request.nextUrl.clone();
  if (isWww) url.host = host.slice(4);
  if (!hasLocale) url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
