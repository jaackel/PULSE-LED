import { ArrowRight, Monitor, LayoutGrid, UtensilsCrossed, Church, Film, Settings2 } from "lucide-react";
import ledPanel from "@/assets/service-led-panel.jpg";
import videoWall from "@/assets/service-videowall.jpg";
import menuBoard from "@/assets/service-menuboard.jpg";
import church from "@/assets/service-church.jpg";
import videoAds from "@/assets/service-video-ads.jpg";
import software from "@/assets/service-software.jpg";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";
import { ThinkingDots } from "./ThinkingDots";

const services = [
  {
    icon: Monitor,
    title: "Painéis de LED Digital",
    description:
      "Painéis de LED de alta qualidade para comunicação visual, publicidade, eventos e ambientes corporativos.",
    image: ledPanel,
    alt: "Módulo de painel de LED profissional com pixels azuis em close-up",
  },
  {
    icon: LayoutGrid,
    title: "Video Wall",
    description:
      "Soluções de Video Wall para criar grandes experiências visuais em ambientes corporativos, comerciais e institucionais.",
    image: videoWall,
    alt: "Video wall corporativo formado por várias telas exibindo uma composição azul",
  },
  {
    icon: UtensilsCrossed,
    title: "Menu Board Digital",
    description:
      "Menus digitais modernos para restaurantes, lanchonetes, cafeterias e estabelecimentos que desejam uma comunicação mais dinâmica.",
    image: menuBoard,
    alt: "Telas de menu digital acima do balcão de um restaurante moderno",
  },
  {
    icon: Church,
    title: "Painéis de LED para Igrejas",
    description:
      "Tecnologia visual para igrejas, proporcionando maior impacto durante cultos, eventos e apresentações.",
    image: church,
    alt: "Grande painel de LED instalado em auditório de igreja moderna",
  },
  {
    icon: Film,
    title: "Criação de Anúncios em Vídeo",
    description:
      "Produção de conteúdos em vídeo para painéis de LED e sinalização digital, criando anúncios mais atrativos e envolventes.",
    image: videoAds,
    alt: "Tela de LED exibindo conteúdo publicitário em movimento",
  },
  {
    icon: Settings2,
    title: "Software de Gerenciamento Remoto",
    description:
      "Gerencie conteúdos e informações das suas telas de forma prática, flexível e remota.",
    image: software,
    alt: "Dashboard de gerenciamento remoto de telas em um monitor",
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="relative isolate overflow-hidden py-20 md:py-28">
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

      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <span className="glass-chip">
            <span className="led-dot" />
            Soluções
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Soluções que dão vida à sua comunicação
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Do impacto de um grande painel de LED à praticidade do gerenciamento remoto, criamos
            soluções completas para transformar a forma como sua empresa se comunica.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal as="li" key={service.title} delay={index * 70} className="h-full">
              <article className="glass-panel glass-sheen group h-full rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/45 hover:[box-shadow:var(--glow-md)]">
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
                  <span className="absolute top-3 right-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                <div className="relative p-6">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-surface-2/70 backdrop-blur-md transition-all duration-500 group-hover:border-primary/60 group-hover:[box-shadow:var(--glow-sm)]">
                    <service.icon className="h-5 w-5 text-primary-glow transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <a
                    href={whatsappLink(`Olá! Gostaria de saber mais sobre ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-glow transition-colors hover:text-foreground"
                  >
                    Saiba mais
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
