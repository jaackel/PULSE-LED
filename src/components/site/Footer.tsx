import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { GlassButton } from "./GlassButton";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 text-sm tracking-[0.24em] text-silver uppercase">
            {t.footer.tagline}
          </p>
        </div>

        <nav aria-label={t.footer.navAria}>
          <h2 className="text-xs tracking-[0.24em] text-muted-foreground uppercase">{t.footer.navHeading}</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={`/${link.href}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs tracking-[0.24em] text-muted-foreground uppercase">{t.footer.contactHeading}</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            {t.footer.contactText}
          </p>
          <div className="mt-5">
            <GlassButton href={whatsappLink(t.contact.defaultMessage)} external>
              <MessageCircle className="h-4 w-4 text-primary-glow" />
              {t.nav.quote}
            </GlassButton>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-7xl px-5 py-6 text-xs text-muted-foreground lg:px-8">
          {t.footer.rights(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}
