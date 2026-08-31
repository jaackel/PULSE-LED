import { ArrowRight, MessageCircle, Activity, Gauge, Radio } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { GlassButton } from "./GlassButton";
import { LogoMark } from "./LogoMark";
import { RisingLines } from "./RisingLines";

const indicators = [
  { label: "LED Display", icon: Activity },
  { label: "Digital Signage", icon: Radio },
  { label: "Video Wall", icon: Gauge },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-background pb-24 pt-24 supports-[height:100svh]:min-h-[100svh] sm:pb-28 sm:pt-32 md:pb-36 md:pt-36 lg:pb-40 lg:pt-40"
    >
      {/* Rising Lines: feixes de laser vibrantes, alta densidade e neon azul elétrico */}
      <RisingLines
        color="#0052ff"
        glowColor="#00d8ff"
        lineCount={240}
        particleCount={80}
        speed={1.25}
        centerBias={0.65}
        bloom={0.6}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <span className="glass-chip inline-flex items-center gap-2">
          <span className="led-dot" />
          Comunicação visual digital
        </span>

        <LogoMark className="mt-8 w-full max-w-md sm:max-w-lg lg:max-w-2xl" />

        <h1 className="mt-8 text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-5xl xl:text-6xl">
          <span className="text-gradient">Tecnologia que transforma</span>
          <br />
          <span className="text-foreground">espaços em experiências.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Soluções profissionais em LED, sinalização digital e comunicação visual para empresas que
          querem ser vistas.
        </p>

        <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto">
          <GlassButton href={whatsappLink()} external size="lg" className="w-full sm:w-auto">
            <MessageCircle className="h-4.5 w-4.5 text-primary-glow" />
            Solicitar orçamento
          </GlassButton>
          <GlassButton href="#solucoes" variant="ghost" size="lg" className="w-full sm:w-auto">
            Conheça nossas soluções
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </GlassButton>
        </div>

        {/* glass indicator capsules */}
        <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {indicators.map(({ label, icon: Icon }) => (
            <li key={label} className="glass-chip glass-sheen">
              <Icon className="h-3.5 w-3.5 text-primary-glow" />
              {label}
            </li>
          ))}
          <li className="glass-chip glass-sheen">
            <span className="led-dot" />
            Tecnologia
          </li>
        </ul>
      </div>
    </section>
  );
}
