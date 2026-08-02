import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const alt = "Industrias Texano — Fabricación de jeans y uniformes industriales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  const [logo, montserratBold] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/logo-gold.png")),
    readFile(join(process.cwd(), "assets/fonts/Montserrat-Bold.ttf")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#252d30",
          padding: 80,
        }}
      >
        <img src={logoSrc} width={520} height={197} alt="" />
        <div style={{ width: 140, height: 5, background: "#ecb84b", marginTop: 44, marginBottom: 44 }} />
        <div
          style={{
            display: "flex",
            fontSize: 38,
            lineHeight: 1.4,
            color: "#f5f2ec",
            textAlign: "center",
            maxWidth: 920,
          }}
        >
          {dict.meta.description}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Montserrat", data: montserratBold, weight: 700, style: "normal" }],
    }
  );
}
