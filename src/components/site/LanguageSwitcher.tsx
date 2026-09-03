import { languages, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.languageAria}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-surface/60 p-0.5 backdrop-blur-md",
        className,
      )}
    >
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => setLang(language.code)}
          aria-label={language.label}
          aria-pressed={lang === language.code}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            lang === language.code
              ? "border border-primary/45 bg-surface-2/80 text-foreground [box-shadow:var(--glow-sm)]"
              : "border border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {language.short}
        </button>
      ))}
    </div>
  );
}
