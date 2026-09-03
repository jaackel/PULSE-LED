import { Link } from "react-router-dom";
import facade from "@/assets/service-led-panel-outdoor.jpg";
import { solutions } from "@/lib/solutions";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const solutionCover = (id: (typeof solutions)[number]["id"]) =>
  solutions.find((solution) => solution.id === id)!.cover;

const solutionSlug = (id: (typeof solutions)[number]["id"]) =>
  solutions.find((solution) => solution.id === id)!.slug;

const projects = [
  {
    id: "facade" as const,
    image: facade,
    slug: null,
    className: "sm:col-span-2 lg:row-span-2 lg:col-span-2",
    height: "h-72 sm:h-80 lg:h-full",
  },
  { id: "videoWall" as const, image: solutionCover("videoWall"), slug: solutionSlug("videoWall"), className: "", height: "h-64" },
  { id: "pool" as const, image: solutionCover("pool"), slug: solutionSlug("pool"), className: "", height: "h-64" },
  { id: "menuBoard" as const, image: solutionCover("menuBoard"), slug: solutionSlug("menuBoard"), className: "", height: "h-64" },
  { id: "ledPanel" as const, image: solutionCover("ledPanel"), slug: solutionSlug("ledPanel"), className: "", height: "h-64" },
  { id: "software" as const, image: solutionCover("software"), slug: solutionSlug("software"), className: "sm:col-span-2", height: "h-64" },
];

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projetos" className="relative isolate overflow-hidden py-20 md:py-28 scroll-mt-20 md:scroll-mt-24">
      <div
        aria-hidden
        className="absolute right-[-8%] bottom-0 h-96 w-96 rounded-full bg-primary/8 blur-[130px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="glass-chip">
            <span className="led-dot" />
            {t.projects.chip}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            {t.projects.titleLead} <span className="text-gradient">{t.projects.titleAccent}</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid auto-rows-max gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => {
            const copy = t.projects.items[project.id];
            const figure = (
              <figure
                className={`group relative overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-primary/45 hover:[box-shadow:var(--glow-md)] ${project.height}`}
              >
                <img
                  src={project.image}
                  alt={`${copy.title} — ${copy.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-107"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-[0.6rem] tracking-[0.24em] text-primary-glow uppercase">
                    {copy.category}
                  </span>
                  <p className="mt-1.5 text-base font-bold text-foreground">{copy.title}</p>
                </figcaption>
              </figure>
            );
            return (
            <Reveal
              as="li"
              key={project.id}
              delay={index * 70}
              className={project.className}
            >
              {project.slug ? <Link to={`/solucoes/${project.slug}`}>{figure}</Link> : figure}
            </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
