"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  form,
  defaultEmail = "",
}: {
  form: Dictionary["contact"]["form"];
  defaultEmail?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    // Capture the form element now — React nulls out event.currentTarget
    // once the handler yields on the await below.
    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    const payload = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      product: String(data.get("product") || ""),
      quantity: String(data.get("quantity") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border-2 border-ink bg-white px-3 py-2 font-body-md text-ink outline-none placeholder:opacity-60 focus:border-gold";
  const labelClass = "font-label-tech text-xs font-semibold uppercase text-ink";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="company" className={labelClass}>
          {form.company}
        </label>
        <input id="company" name="company" type="text" required placeholder={form.companyPlaceholder} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className={labelClass}>
            {form.name}
          </label>
          <input id="name" name="name" type="text" required placeholder={form.namePlaceholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className={labelClass}>
            {form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={defaultEmail}
            placeholder={form.emailPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className={labelClass}>
            {form.phone}
          </label>
          <input id="phone" name="phone" type="tel" placeholder={form.phonePlaceholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="product" className={labelClass}>
            {form.product}
          </label>
          <select id="product" name="product" className={`${inputClass} appearance-none`}>
            {form.productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="quantity" className={labelClass}>
          {form.quantity}
        </label>
        <input id="quantity" name="quantity" type="text" placeholder={form.quantityPlaceholder} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className={labelClass}>
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder={form.messagePlaceholder}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 w-full bg-gold py-4 font-headline-md uppercase text-on-gold transition-all duration-150 hover:bg-navy hover:text-white disabled:opacity-60"
      >
        {status === "submitting" ? form.submitting : form.submit}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && <p className="font-label-tech text-sm text-ink">{form.success}</p>}
        {status === "error" && <p className="font-label-tech text-sm text-ink">{form.error}</p>}
      </div>
    </form>
  );
}
