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
    <header className="fixed inset-x-0 top-0 z-50 p-4 transition-all duration-500 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto mx-auto flex items-center justify-between rounded-full transition-all duration-500 ease-out",
          scrolled
            ? "max-w-5xl bg-background/80 backdrop-blur-xl border border-white/10 px-6 py-2.5 shadow-2xl shadow-black/50"
            : "max-w-7xl bg-transparent border border-transparent px-8 py-4"
        )}
      >
        <a href="#inicio" aria-label="Pulse LED Display — início" className="shrink-0">
          <LogoMark pulse={false} className={cn("transition-all duration-500", scrolled ? "w-32 md:w-36" : "w-36 md:w-44")} />
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <GlassButton href={whatsappLink()} external size={scrolled ? "sm" : "default"}>
            <MessageCircle className="h-4 w-4 text-primary-glow" />
            Solicitar orçamento
          </GlassButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 text-foreground backdrop-blur-md lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="pointer-events-auto glass-panel mx-auto mt-2 max-w-lg rounded-2xl p-4 lg:hidden">
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
