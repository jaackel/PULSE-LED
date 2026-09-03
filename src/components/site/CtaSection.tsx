import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { GlassButton } from "./GlassButton";
import { Reveal } from "./Reveal";

export function CtaSection() {
  const { t } = useI18n();

  return (
    <section id="contato" className="relative isolate overflow-hidden py-24 md:py-32 scroll-mt-20 md:scroll-mt-24">
      <div aria-hidden className="liquid-bg" />
      <div
        aria-hidden
        className="absolute bottom-[-20%] left-1/2 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-primary/14 blur-[150px]"
      />
      <div aria-hidden className="pixel-grid animate-pixel-pulse" />

      <Reveal className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          {t.cta.titleLead} <span className="text-gradient">{t.cta.titleAccent}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          {t.cta.description}
        </p>
        <div className="mt-9 flex justify-center">
          <GlassButton href={whatsappLink(t.contact.defaultMessage)} external size="lg">
            <MessageCircle className="h-5 w-5 text-primary-glow" />
            {t.cta.button}
          </GlassButton>
        </div>
      </Reveal>
    </section>
  );
}
