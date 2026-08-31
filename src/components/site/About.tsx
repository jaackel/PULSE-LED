import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="sobre" className="relative isolate overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="absolute top-1/3 left-[-10%] h-96 w-96 rounded-full bg-primary/8 blur-[130px]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <span className="glass-chip">
            <span className="led-dot" />
            Sobre
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Tecnologia, inovação e <span className="text-gradient">visibilidade.</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            A Pulse LED Display oferece soluções em comunicação visual digital desenvolvidas para
            empresas, instituições e espaços que precisam comunicar com impacto.
          </p>
          <p>
            Unimos tecnologia, qualidade e criatividade para entregar experiências visuais modernas e
            eficientes.
          </p>
          <div className="glass-panel rounded-2xl p-5">
            <p className="relative text-sm tracking-[0.24em] text-silver uppercase">
              Innovation • Impact • Visibility
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
