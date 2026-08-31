import { Sparkles, RefreshCw, Cpu, Brain } from "lucide-react";
import { Reveal } from "./Reveal";

const benefits = [
  {
    icon: Sparkles,
    title: "Alto impacto visual",
    description: "Sua comunicação ganha destaque e chama mais atenção.",
  },
  {
    icon: RefreshCw,
    title: "Conteúdo dinâmico",
    description: "Atualize campanhas e informações de maneira rápida.",
  },
  {
    icon: Cpu,
    title: "Tecnologia moderna",
    description: "Soluções desenvolvidas para ambientes que exigem qualidade visual.",
  },
  {
    icon: Brain,
    title: "Comunicação inteligente",
    description: "Conteúdo digital que pode acompanhar as necessidades do seu negócio.",
  },
];

export function Benefits() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Por que investir em <span className="text-gradient">comunicação digital?</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal as="li" key={benefit.title} delay={index * 80}>
              <div className="group h-full rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:[box-shadow:var(--glow-sm)]">
                <benefit.icon className="h-6 w-6 text-primary-glow transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 text-base font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
