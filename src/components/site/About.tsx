import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useI18n();

  return (
    <section id="sobre" className="relative isolate overflow-hidden py-20 md:py-28 scroll-mt-20 md:scroll-mt-24">
      <div
        aria-hidden
        className="absolute top-1/3 left-[-10%] h-96 w-96 rounded-full bg-primary/8 blur-[130px]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <span className="glass-chip">
            <span className="led-dot" />
            {t.about.chip}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            {t.about.titleLead} <span className="text-gradient">{t.about.titleAccent}</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{t.about.paragraph1}</p>
          <p>{t.about.paragraph2}</p>
          <div className="glass-panel rounded-2xl p-5">
            <p className="relative text-sm tracking-[0.24em] text-silver uppercase">
              {t.about.tagline}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
