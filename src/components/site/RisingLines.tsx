import { useEffect, useRef } from "react";

interface RisingLinesProps {
  /** Cor base dos feixes (token: --primary). */
  color?: string;
  /** Cor do brilho do horizonte (token: --primary-glow). */
  glowColor?: string;
  /** Quantidade de feixes verticais. */
  lineCount?: number;
  /** Quantidade de partículas ascendentes. */
  particleCount?: number;
  /** Multiplicador de velocidade da animação. */
  speed?: number;
  /** 0 = feixes distribuídos por igual, 1 = concentrados no centro. */
  centerBias?: number;
  /** Altura do bloom do horizonte, como fração da altura do canvas. */
  bloom?: number;
  className?: string;
}

type Rgb = [number, number, number];

const hexToRgb = (hex: string): Rgb => {
  const raw = hex.replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r}, ${g}, ${b}, ${a})`;

interface Beam {
  /** Posição horizontal normalizada (0..1) para sobreviver a resizes. */
  nx: number;
  len: number;
  maxLen: number;
  speed: number;
  width: number;
  alpha: number;
  /** Feixes "bright" são os riscos azuis vivos; o resto é o carpete difuso. */
  bright: boolean;
  /** Segmentos soltos que sobem em vez de nascer colados no horizonte. */
  detached: boolean;
  offset: number;
  fade: number;
}

interface Particle {
  nx: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  pulse: number;
}

export function RisingLines({
  color = "#2563eb",
  glowColor = "#60a5fa",
  lineCount = 300,
  particleCount = 55,
  speed = 1,
  centerBias = 0.55,
  bloom = 0.45,
  className = "",
}: RisingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const primary = hexToRgb(color);
    const glow = hexToRgb(glowColor);
    const hot: Rgb = [191, 219, 254];
    const dim: Rgb = [100, 116, 139];

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let last = performance.now();

    let beams: Beam[] = [];
    let particles: Particle[] = [];

    /** Sorteia um x com viés para o centro, mantendo a irregularidade da referência. */
    const biasedX = () => {
      const r = Math.random();
      const centered = (r + Math.random()) / 2;
      return r * (1 - centerBias) + centered * centerBias;
    };

    const spawnBeam = (): Beam => {
      const bright = Math.random() < 0.32;
      // A maioria dos feixes é curta (o carpete do horizonte); poucos sobem alto.
      const reach = Math.pow(Math.random(), 2.4);
      return {
        nx: biasedX(),
        len: 0,
        maxLen: (0.04 + reach * 0.78) * height,
        speed: (28 + Math.random() * 120) * speed,
        width: bright && Math.random() < 0.4 ? 1.6 : 1,
        alpha: bright ? 0.5 + Math.random() * 0.5 : 0.12 + Math.random() * 0.22,
        bright,
        detached: Math.random() < 0.18,
        offset: 0,
        fade: 1,
      };
    };

    const spawnParticle = (): Particle => ({
      nx: biasedX(),
      y: height - Math.random() * height * 0.75,
      radius: 0.8 + Math.random() * 2,
      speedY: (12 + Math.random() * 45) * speed,
      speedX: (Math.random() - 0.5) * 10 * speed,
      alpha: 0.35 + Math.random() * 0.65,
      pulse: Math.random() * Math.PI * 2,
    });

    const initElements = () => {
      beams = Array.from({ length: lineCount }, () => {
        const b = spawnBeam();
        // Comprimentos já sorteados, para não haver um "nascimento" coletivo.
        b.len = Math.random() * b.maxLen;
        return b;
      });
      particles = Array.from({ length: particleCount }, spawnParticle);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initElements();
    };

    /** Feixes das bordas são mais apagados, como na referência. */
    const edgeFalloff = (nx: number) => {
      const d = 1 - Math.abs(nx * 2 - 1);
      return 0.2 + 0.8 * Math.pow(d, 1.4);
    };

    const drawHorizon = () => {
      // Bloom largo e elíptico saindo da base.
      const bloomH = Math.max(40, height * bloom);
      const radius = width * 0.5;
      ctx.save();
      ctx.translate(width / 2, height);
      ctx.scale(1, bloomH / radius);
      const wide = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      wide.addColorStop(0, rgba(glow, 0.5));
      wide.addColorStop(0.22, rgba(primary, 0.26));
      wide.addColorStop(0.55, rgba(primary, 0.08));
      wide.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = wide;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Núcleo quente, bem mais concentrado.
      const coreH = Math.max(14, height * 0.075);
      const coreR = width * 0.3;
      ctx.save();
      ctx.translate(width / 2, height);
      ctx.scale(1, coreH / coreR);
      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR);
      core.addColorStop(0, rgba(glow, 0.9));
      core.addColorStop(0.35, rgba(primary, 0.5));
      core.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(0, 0, coreR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Filete de laser na borda inferior.
      const line = ctx.createLinearGradient(0, 0, width, 0);
      line.addColorStop(0, "rgba(0, 0, 0, 0)");
      line.addColorStop(0.2, rgba(primary, 0.35));
      line.addColorStop(0.5, rgba(glow, 0.95));
      line.addColorStop(0.8, rgba(primary, 0.35));
      line.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = line;
      ctx.fillRect(0, height - 1.5, width, 1.5);
    };

    const drawBeams = (dt: number) => {
      beams.forEach((b, i) => {
        b.len += b.speed * dt;
        if (b.detached) b.offset += b.speed * dt * 0.6;

        if (b.len > b.maxLen) b.fade -= dt * 1.6;
        if (b.fade <= 0 || b.offset > height) {
          beams[i] = spawnBeam();
          return;
        }

        const x = Math.round(b.nx * width) + 0.5;
        const bottom = height - b.offset;
        const top = bottom - Math.min(b.len, b.maxLen);
        if (bottom - top < 1) return;

        const a = b.alpha * b.fade * edgeFalloff(b.nx);
        const base = b.bright ? primary : dim;
        const grad = ctx.createLinearGradient(x, bottom, x, top);
        grad.addColorStop(0, rgba(b.bright ? glow : base, a));
        grad.addColorStop(0.35, rgba(base, a * 0.75));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = b.width;
        ctx.beginPath();
        ctx.moveTo(x, bottom);
        ctx.lineTo(x, top);
        ctx.stroke();

        // Ponta acesa só nos feixes vivos, como os pontos brilhantes da referência.
        if (b.bright && b.width > 1) {
          ctx.fillStyle = rgba(hot, a * 0.9);
          ctx.beginPath();
          ctx.arc(x, top, b.width * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawParticles = (dt: number) => {
      particles.forEach((p, i) => {
        p.y -= p.speedY * dt;
        p.nx += (p.speedX * dt) / Math.max(width, 1);
        p.pulse += dt * 2.2;

        if (p.y < height * 0.12 || p.nx < 0 || p.nx > 1) {
          particles[i] = spawnParticle();
          return;
        }

        const x = p.nx * width;
        const heightFade = Math.min(1, (p.y / height) * 1.15);
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.pulse)) * heightFade * edgeFalloff(p.nx);
        if (a <= 0.03) return;

        const halo = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.radius * 4);
        halo.addColorStop(0, rgba(glow, a));
        halo.addColorStop(0.45, rgba(primary, a * 0.35));
        halo.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = rgba(hot, Math.min(1, a * 1.4));
        ctx.beginPath();
        ctx.arc(x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      // Blending aditivo: é o que faz os feixes somarem no bloom do horizonte.
      ctx.globalCompositeOperation = "lighter";
      drawHorizon();
      drawBeams(dt);
      drawParticles(dt);
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      // dt limitado para a animação não "saltar" ao voltar de uma aba inativa.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt);
      frameId = requestAnimationFrame(loop);
    };

    resize();

    if (reduceMotion) {
      draw(0);
    } else {
      frameId = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    observer.observe(host);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [color, glowColor, lineCount, particleCount, speed, centerBias, bloom]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
