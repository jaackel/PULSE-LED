import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, whatsappLink } from "@/lib/site";
import { GlassButton } from "./GlassButton";
import { LogoMark } from "./LogoMark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-nav" : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:h-20 lg:px-8">
        <a href="#inicio" aria-label="Pulse LED Display — início" className="shrink-0">
          <LogoMark pulse={false} className="w-36 md:w-44" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="glass-sheen relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <GlassButton href={whatsappLink()} external>
            <MessageCircle className="h-4 w-4 text-primary-glow" />
            Solicitar orçamento
          </GlassButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface/60 text-foreground backdrop-blur-md lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-panel mx-4 mb-4 rounded-2xl p-4 lg:hidden">
          <ul className="relative flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-surface-2/60 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="relative mt-3">
            <GlassButton href={whatsappLink()} external className="w-full" size="lg">
              <MessageCircle className="h-4 w-4 text-primary-glow" />
              Solicitar orçamento
            </GlassButton>
          </div>
        </div>
      )}
    </header>
  );
}
