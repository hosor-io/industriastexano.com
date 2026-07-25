import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/i18n/config";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
  website: string; // honeypot — real users never see or fill this field
  renderedAt: number; // client timestamp when the form mounted
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Best-effort in-memory rate limit. Resets on cold start and isn't shared
// across concurrent serverless instances, but combined with the honeypot
// and time-trap below it raises the bar well past what a naive spam script
// clears, without needing an external store on the Hobby plan.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

// Humans take at least a few seconds to fill this form; bots that submit
// immediately after loading the page almost never do.
const MIN_FILL_TIME_MS = 3000;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { name, company, email, phone, product, quantity, message, website, renderedAt } = body;

  // Bot signals: honeypot filled, or submitted implausibly fast. Respond
  // with a fake success so the bot doesn't learn to adapt, but skip sending.
  const tooFast = typeof renderedAt === "number" && Date.now() - renderedAt < MIN_FILL_TIME_MS;
  if (isNonEmptyString(website) || tooFast) {
    console.warn(`[contact] blocked likely bot submission from ${ip} (honeypot=${isNonEmptyString(website)}, tooFast=${tooFast})`);
    return NextResponse.json({ ok: true, simulated: true });
  }

  if (!isNonEmptyString(name) || !isNonEmptyString(company) || !isNonEmptyString(message)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!isNonEmptyString(email) && !isNonEmptyString(phone)) {
    return NextResponse.json({ ok: false, error: "missing_contact_method" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.CONTACT_TO_EMAIL || siteConfig.email)
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  const summary = [
    `Empresa: ${company}`,
    `Nombre: ${name}`,
    email ? `Correo: ${email}` : null,
    phone ? `Teléfono: ${phone}` : null,
    product ? `Producto de interés: ${product}` : null,
    quantity ? `Cantidad estimada: ${quantity}` : null,
    `Mensaje: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    // No Resend credentials configured yet — log so the request isn't lost,
    // without breaking the contact form UX in local/dev environments.
    console.warn("[contact] RESEND_API_KEY not set, logging submission instead of emailing:\n" + summary);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Industrias Texano <info@industriastexano.com>",
      to,
      replyTo: isNonEmptyString(email) ? email : undefined,
      subject: `Nueva solicitud de cotización — ${company}`,
      text: summary,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
