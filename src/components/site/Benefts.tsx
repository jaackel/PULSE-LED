import { Sparkles, RefreshCw, Cpu, Brain } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const benefits = [
  { id: "impact", icon: Sparkles },
  { id: "dynamic", icon: RefreshCw },
  { id: "technology", icon: Cpu },
  { id: "smart", icon: Brain },
] as const;

export function Benefits() {
  const { t } = useI18n();

  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            {t.benefits.titleLead} <span className="text-gradient">{t.benefits.titleAccent}</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const copy = t.benefits.items[benefit.id];
            return (
            <Reveal as="li" key={benefit.id} delay={index * 80}>
              <div className="group h-full rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:[box-shadow:var(--glow-sm)]">
                <benefit.icon className="h-6 w-6 text-primary-glow transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 text-base font-bold text-foreground">{copy.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {copy.description}
                </p>
              </div>
            </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
