import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { SmsFloat } from "@/components/site/SmsFloat";
import { SocialFloat } from "@/components/site/SocialFloat";
import { Home } from "@/pages/Home";
import { SolutionPage } from "@/pages/SolutionPage";

/** Ao trocar de rota: sem hash, volta pro topo; com hash (ex: /#solucoes vindo de
    outra página), espera o DOM da rota nova pintar e rola suave até a âncora. */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = location.hash.slice(1);
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <ScrollManager />
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-glow">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solucoes/:slug" element={<SolutionPage />} />
            </Routes>
          </main>
          <Footer />
          <SmsFloat />
          <WhatsAppFloat />
          <SocialFloat />
        </div>
      </BrowserRouter>
    </I18nProvider>
  );
}
