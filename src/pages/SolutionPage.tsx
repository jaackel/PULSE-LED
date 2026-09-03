import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getSolutionBySlug, solutions } from "@/lib/solutions";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { GlassButton } from "@/components/site/GlassButton";

export function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();
  const solution = getSolutionBySlug(slug);
  const copy = solution ? t.solutions.items[solution.id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    document.title = copy
      ? `${copy.title} — Pulse LED Display`
      : `${t.solutionPage.notFoundTitle} — Pulse LED Display`;
  }, [copy, t.solutionPage.notFoundTitle]);

  if (!solution || !copy) {
    return (
      <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5 pt-32 pb-20">
        <Reveal className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{t.solutionPage.notFoundTitle}</h1>
          <p className="mt-4 text-base text-muted-foreground">{t.solutionPage.notFoundDescription}</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-glow transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.solutionPage.backHome}
          </Link>
        </Reveal>
      </section>
    );
  }

  const otherSolutions = solutions.filter((item) => item.id !== solution.id);

  return (
    <section className="relative isolate overflow-hidden px-4 pt-32 pb-20 sm:px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent)]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <Link
            to="/#solucoes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.solutionPage.back}
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <span className="inline-grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-surface-2/70 backdrop-blur-md">
              <solution.icon className="h-6 w-6 text-primary-glow" />
            </span>
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">{copy.title}</h1>
          </div>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.description}
          </p>

          <div className="mt-8">
            <GlassButton href={whatsappLink(t.solutions.inquiry(copy.title))} external size="lg">
              <MessageCircle className="h-5 w-5 text-primary-glow" />
              {t.solutionPage.ctaButton}
            </GlassButton>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {t.solutionPage.galleryTitle}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solution.gallery.map((photo, index) => (
              <div
                key={photo + index}
                className="aspect-16/10 overflow-hidden rounded-2xl border border-border"
              >
                <img
                  src={photo}
                  alt={`${copy.title} ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-16 border-t border-border pt-10">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {t.solutionPage.otherSolutions}
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherSolutions.map((item) => {
              const itemCopy = t.solutions.items[item.id];
              return (
                <li key={item.id}>
                  <Link
                    to={`/solucoes/${item.slug}`}
                    className="glass-panel group flex items-center gap-3 rounded-2xl p-4 transition-all duration-300 hover:border-primary/45 hover:[box-shadow:var(--glow-sm)]"
                  >
                    <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/30 bg-surface-2/70">
                      <item.icon className="h-5 w-5 text-primary-glow" />
                    </span>
                    <span className="text-sm font-semibold text-foreground">{itemCopy.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
