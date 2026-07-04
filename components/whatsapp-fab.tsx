import { siteConfig } from "@/lib/i18n/config";

export default function WhatsappFab({ message, label }: { message: string; label: string }) {
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center bg-gold text-on-gold hard-shadow transition-transform active:translate-y-0.5 md:hidden"
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        chat_bubble
      </span>
    </a>
  );
}
