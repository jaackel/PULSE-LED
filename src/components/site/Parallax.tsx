import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import parallaxImage from "@/assets/hero-led-wall.jpg";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Parallax() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // A imagem é 180% da altura da seção e começa deslocada -40% pra cima; o scroll
  // move ela ±20% da própria altura (efeito bem perceptível), e mesmo no extremo do
  // range ela ainda cobre a seção inteira (sem faixa vazia aparecendo nas bordas).
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[50vh] overflow-hidden md:h-[60vh]"
    >
      <motion.img
        src={parallaxImage}
        alt={t.parallax.imageAlt}
        loading="lazy"
        style={{ y }}
        className="absolute inset-x-0 -top-[40%] h-[180%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(60%_100%_at_50%_100%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)]"
      />

      <div className="relative flex h-full items-center">
        <Reveal className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <span className="glass-chip">
            <span className="led-dot" />
            {t.parallax.chip}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            {t.parallax.titleLead} <span className="text-gradient">{t.parallax.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            {t.parallax.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
