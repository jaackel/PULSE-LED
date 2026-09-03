import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { solutions } from "@/lib/solutions";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { ThinkingDots } from "./ThinkingDots";
import VariableProximity from "./VariableProximity";

export function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  return (
    <section id="solucoes" className="relative isolate overflow-hidden py-20 md:py-28 scroll-mt-20 md:scroll-mt-24">
      {/* Thinking Dots ocupando a seção inteira, nos valores da doc: cores
          #3a3fff / #0071ff, fundo #0a0a0a e opacidade cheia. */}
      <ThinkingDots background="#0a0a0a" />

      {/* O fundo do efeito (#0a0a0a) é neutro e o do site (#090d16) puxa para o
          azul; essas duas faixas dissolvem a emenda com as seções vizinhas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent"
      />

      <div ref={containerRef} className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <span className="glass-chip">
            <span className="led-dot" />
            {t.solutions.chip}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            <VariableProximity
              label={t.solutions.title}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 800, 'opsz' 40"
              containerRef={containerRef}
              radius={150}
              falloff="gaussian"
              className="text-foreground"
            />
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.solutions.description}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => {
            const copy = t.solutions.items[solution.id];
            return (
            <Reveal as="li" key={solution.id} delay={index * 70} className="h-full">
              <article className="glass-panel glass-sheen group h-full rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/45 hover:[box-shadow:var(--glow-md)]">
                <Link to={`/solucoes/${solution.slug}`} className="relative block aspect-16/10 overflow-hidden">
                  <img
                    src={solution.cover}
                    alt={copy.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
                  <span className="absolute top-3 right-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </Link>

                <div className="relative p-6">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-surface-2/70 backdrop-blur-md transition-all duration-500 group-hover:border-primary/60 group-hover:[box-shadow:var(--glow-sm)]">
                    <solution.icon className="h-5 w-5 text-primary-glow transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{copy.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {copy.description}
                  </p>
                  <Link
                    to={`/solucoes/${solution.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-glow transition-colors hover:text-foreground"
                  >
                    {t.solutions.learnMore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
