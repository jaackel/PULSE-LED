import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="group fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 md:right-6 md:bottom-6"
    >
      <span className="pointer-events-none hidden rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs text-foreground opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 md:inline-block">
        Fale conosco
      </span>
      <span className="relative grid h-13 w-13 place-items-center rounded-full border border-whatsapp/45 bg-surface/70 backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:[box-shadow:var(--glow-sm)]">
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/12" />
        <svg viewBox="0 0 24 24" className="relative h-6 w-6 fill-whatsapp" aria-hidden>
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2zm0 18.02c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.05-.19-.31a7.94 7.94 0 01-1.22-4.25c0-4.42 3.6-8.02 8.02-8.02s8.01 3.6 8.01 8.02-3.59 8.02-8.01 8.02zm4.4-6.01c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </span>
    </a>
  );
}

