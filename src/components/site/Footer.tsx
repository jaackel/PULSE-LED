import { MessageCircle } from "lucide-react";
import { navLinks, whatsappLink } from "@/lib/site";
import { GlassButton } from "./GlassButton";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 text-sm tracking-[0.24em] text-silver uppercase">
            Innovation • Impact • Visibility
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-xs tracking-[0.24em] text-muted-foreground uppercase">Navegação</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs tracking-[0.24em] text-muted-foreground uppercase">Contato</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Fale com nossa equipe e receba uma proposta para o seu projeto.
          </p>
          <div className="mt-5">
            <GlassButton href={whatsappLink()} external>
              <MessageCircle className="h-4 w-4 text-primary-glow" />
              Solicitar orçamento
            </GlassButton>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-7xl px-5 py-6 text-xs text-muted-foreground lg:px-8">
          © {new Date().getFullYear()} Pulse LED Display. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
