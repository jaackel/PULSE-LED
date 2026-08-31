import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-pulse-led.png";
import logoBase from "@/assets/logo-pulse-led-base.png";
import logoLine from "@/assets/logo-pulse-led-line.png";

interface LogoMarkProps {
  /** Acende a linha azul (traço cardíaco + linha sob o PULSE) em ritmo de batida. */
  pulse?: boolean;
  className?: string;
}

const ALT = "Pulse LED Display — Innovation, Impact, Visibility";

/**
 * Logo oficial. Os PNGs já carregam transparência própria: o preto do arquivo
 * original virou alfa e a cor foi desmultiplicada. Não há `mix-blend-mode` aqui,
 * porque blend depende do contexto de empilhamento em volta e quebra em silêncio
 * quando algum ancestral tem `isolate`, `z-index` ou `transform`.
 *
 * Sem pulsação é um arquivo só, a arte inteira. Com pulsação são duas camadas —
 * a arte sem a linha e, por cima, só a linha —, e a batida vem de um
 * `filter: brightness` que parte da cor original e só acrescenta brilho.
 */
export function LogoMark({ pulse = true, className }: LogoMarkProps) {
  if (!pulse) {
    return (
      <img
        src={logoFull}
        alt={ALT}
        width={1427}
        height={340}
        className={cn("block h-auto w-full select-none", className)}
      />
    );
  }

  return (
    <div className={cn("relative select-none", className)}>
      <img src={logoBase} alt={ALT} width={1427} height={340} className="block h-auto w-full" />
      <img
        src={logoLine}
        alt=""
        aria-hidden
        className="animate-logo-beat pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
