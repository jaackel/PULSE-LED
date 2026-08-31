import ledPanel from "@/assets/service-led-panel.jpg";
import videoWall from "@/assets/service-videowall.jpg";
import menuBoard from "@/assets/service-menuboard.jpg";
import church from "@/assets/service-church.jpg";
import facade from "@/assets/impact-facade.jpg";
import software from "@/assets/service-software.jpg";
import { Reveal } from "./Reveal";

const projects = [
  {
    image: facade,
    category: "Fachada comercial",
    title: "Painel de LED externo",
    className: "sm:col-span-2 lg:row-span-2 lg:col-span-2",
    height: "h-72 sm:h-80 lg:h-full",
  },
  {
    image: videoWall,
    category: "Corporativo",
    title: "Video Wall",
    className: "",
    height: "h-64",
  },
  {
    image: church,
    category: "Igreja",
    title: "Painel de LED para culto",
    className: "",
    height: "h-64",
  },
  {
    image: menuBoard,
    category: "Alimentação",
    title: "Menu Board Digital",
    className: "",
    height: "h-64",
  },
  {
    image: ledPanel,
    category: "Display",
    title: "Módulo de LED profissional",
    className: "",
    height: "h-64",
  },
  {
    image: software,
    category: "Gerenciamento",
    title: "Sinalização digital remota",
    className: "sm:col-span-2",
    height: "h-64",
  },
];

export function Projects() {
  return (
    <section id="projetos" className="relative isolate overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="absolute right-[-8%] bottom-0 h-96 w-96 rounded-full bg-primary/8 blur-[130px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="glass-chip">
            <span className="led-dot" />
            Projetos
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Projetos que <span className="text-gradient">chamam atenção.</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid auto-rows-max gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <Reveal
              as="li"
              key={project.title}
              delay={index * 70}
              className={project.className}
            >
              <figure
                className={`group relative overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-primary/45 hover:[box-shadow:var(--glow-md)] ${project.height}`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-107"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-[0.6rem] tracking-[0.24em] text-primary-glow uppercase">
                    {project.category}
                  </span>
                  <p className="mt-1.5 text-base font-bold text-foreground">{project.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
