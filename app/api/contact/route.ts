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
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { name, company, email, phone, product, quantity, message } = body;

  if (!isNonEmptyString(name) || !isNonEmptyString(company) || !isNonEmptyString(message)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!isNonEmptyString(email) && !isNonEmptyString(phone)) {
    return NextResponse.json({ ok: false, error: "missing_contact_method" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;

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
      from: `Industrias Texano <cotizaciones@${new URL(siteConfig.domain).hostname}>`,
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
