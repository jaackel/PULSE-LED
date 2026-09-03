import { smsLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export function SmsFloat() {
  const { t } = useI18n();

  return (
    <a
      href={smsLink(t.contact.defaultMessage)}
      aria-label={t.float.smsAria}
      className="group fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 md:bottom-6 md:left-6"
    >
      <span className="relative grid h-13 w-13 place-items-center rounded-full border border-whatsapp/45 bg-surface/70 backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:[box-shadow:var(--glow-sm)]">
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/12" />
        <img
          src="/sms-icon.png"
          alt=""
          aria-hidden
          className="relative h-7 w-7 rounded-[7px] object-contain"
        />
      </span>
      <span className="pointer-events-none hidden rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs text-foreground opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 md:inline-block">
        {t.float.smsLabel}
      </span>
    </a>
  );
}
