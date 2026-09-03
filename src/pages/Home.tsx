import { Hero } from "@/components/site/Hero";
import { Solutions } from "@/components/site/Solutions";
import { Parallax } from "@/components/site/Parallax";
import { Projects } from "@/components/site/Projects";
import { About } from "@/components/site/About";
import { Benefits } from "@/components/site/Benefts";
import { Impact } from "@/components/site/impact";
import { CtaSection } from "@/components/site/CtaSection";

export function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Parallax />
      <Projects />
      <About />
      <Benefits />
      <Impact />
      <CtaSection />
    </>
  );
}
