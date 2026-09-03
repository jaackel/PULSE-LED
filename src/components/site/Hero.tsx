import { useEffect, useState } from "react";

/** Abaixo de md o vídeo vertical entra no lugar da versão 4K deitada. */
const MOBILE_QUERY = "(max-width: 767px)";

function useIsMobileHero() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

export function Hero() {
  const isMobile = useIsMobileHero();
  const src = isMobile ? "/hero-bg-mobile.mp4" : "/hero-bg.mp4";

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen min-h-dvh items-center justify-center overflow-hidden bg-background"
    >
      {/* key força o remount: trocar o src do <source> sozinho não recarrega o vídeo.
          O vídeo vertical (9:16) é mais "quadrado" que a tela do celular (~9:19,5):
          object-cover cortava 11% de cada lado e raspava o logo; object-contain puro
          deixava ~150px de faixa vazia. O meio-termo é contain ancorado no topo com
          115% de zoom: corta só 7,5% de cada lado (o logo tem 13% de margem, não encosta)
          e a faixa cai pra ~47px, que o degradê de baixo cobre. */}
      <video
        key={src}
        autoPlay
        muted
        loop
        playsInline
        className={
          isMobile
            ? "absolute inset-0 h-full w-full origin-top scale-[1.15] object-contain object-top"
            : "absolute inset-0 h-full w-full object-cover"
        }
      >
        <source src={src} type="video/mp4" />
      </video>
      {isMobile && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
        />
      )}
    </section>
  );
}
