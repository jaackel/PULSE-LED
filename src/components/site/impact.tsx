import impactImage from "@/assets/impact-facade.jpg";
import { Reveal } from "./Reveal";

export function Impact() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-border">
          <img
            src={impactImage}
            alt="Fachada comercial noturna coberta por grandes painéis de LED com iluminação azul"
            loading="lazy"
            width={1600}
            height={912}
            className="h-[26rem] w-full object-cover md:h-[34rem] lg:h-[40rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(60%_100%_at_50%_100%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)]"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
            <div className="glass-panel max-w-2xl rounded-2xl p-6 md:p-8">
              <div className="relative">
                <span className="glass-chip">
                  <span className="led-dot" />
                  Impacto
                </span>
                <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                  Sua mensagem. <span className="text-gradient">Em grande escala.</span>
                </h2>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">
                  Transformamos tecnologia em visibilidade para sua marca.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
