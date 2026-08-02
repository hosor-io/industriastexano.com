"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/contact-form";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Reads ?email= client-side so the page itself can stay statically
// rendered instead of opting into per-request dynamic rendering just to
// read a prop most visitors never pass.
export default function ContactFormWithEmailParam({ form }: { form: Dictionary["contact"]["form"] }) {
  const searchParams = useSearchParams();
  return <ContactForm form={form} defaultEmail={searchParams.get("email") ?? ""} />;
}
