import { Navbar } from "@/components/site/NavBar";
import { Hero } from "@/components/site/Hero";
import { Solutions } from "@/components/site/Solutions";
import { Projects } from "@/components/site/Projects";
import { About } from "@/components/site/About";
import { Benefits } from "@/components/site/Benefts";
import { Impact } from "@/components/site/impact";
import { CtaSection } from "@/components/site/CtaSection";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-glow">
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <Projects />
        <About />
        <Benefits />
        <Impact />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
