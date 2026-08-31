import { useEffect, useRef } from "react";

interface ThinkingDotsProps {
  /** Cor dos pontos de fundo (baixa densidade). */
  color?: string;
  /** Cor do núcleo da nuvem (alta densidade). */
  accentColor?: string;
  /** Cor de fundo do canvas. "transparent" deixa a seção aparecer. */
  background?: string;
  /** Multiplicador global de tempo. */
  speed?: number;
  /** Quantos lóbulos formam a nuvem de densidade. */
  lobes?: number;
  /** Passo da grade, como fração da menor dimensão. */
  spacing?: number;
  /**
   * Teto do passo da grade, em px. `spacing` é relativo à menor dimensão, o que
   * funciona no formato de banner da doc mas engorda demais os pontos numa
   * seção alta. O teto mantém a granulação parecida em qualquer proporção.
   */
  maxDotPitch?: number;
  /** Raio base do ponto, em frações do passo da grade. */
  dotSize?: number;
  /** Quanto o raio cresce com a densidade. */
  dotGain?: number;
  /** 0 = borda dura, 1 = ponto todo esfumaçado. */
  dotSoftness?: number;
  /** Deslocamento aleatório fixo por ponto, em frações do passo. */
  jitter?: number;
  /** Amplitude da respiração. */
  pulse?: number;
  /** Frequência da respiração, em Hz. */
  pulseRate?: number;
  /** Quanto a respiração também acende o halo. */
  pulseGlow?: number;
  /** Velocidade de deriva da nuvem. */
  drift?: number;
  /** Tamanho da nuvem. */
  cloudScale?: number;
  /** Quanto o ruído deforma a nuvem. */
  turbulence?: number;
  /** Frequência do ruído de turbulência. */
  turbulenceScale?: number;
  /** Brilho mínimo dos pontos fora da nuvem. */
  ambient?: number;
  /** Brilho dos pontos dentro da nuvem. */
  intensity?: number;
  /** Densidade em que a cor de destaque começa a entrar. */
  accentStart?: number;
  /** Densidade em que a cor de destaque satura. */
  accentEnd?: number;
  /** Intensidade do halo nos pontos acesos. */
  glow?: number;
  /** Quanto mais alto, mais concentrado o halo. */
  glowFalloff?: number;
  /** Variação aleatória de brilho por ponto. */
  grain?: number;
  /** Escurecimento nas bordas. */
  vignette?: number;
  /** Se o cursor adensa a nuvem. */
  cursorInteraction?: boolean;
  /** Força do cursor sobre a densidade. */
  cursorInfluence?: number;
  /** Raio de alcance do cursor, como fração da menor dimensão. */
  cursorRadius?: number;
  /** Opacidade global do canvas. */
  opacity?: number;
  paused?: boolean;
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

const mixRgb = (a: Rgb, b: Rgb, t: number): Rgb => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0 || 1e-6)));
  return t * t * (3 - 2 * t);
};

/** Ruído de valor 2D com interpolação suave — base da turbulência da nuvem. */
const hash = (x: number, y: number, seed: number) => {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1274126177);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
};

const noise2 = (x: number, y: number, seed: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, seed);
  const b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed);
  const d = hash(xi + 1, yi + 1, seed);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
};

const fbm = (x: number, y: number) =>
  noise2(x, y, 1) * 0.6 + noise2(x * 2.1, y * 2.1, 7) * 0.3 + noise2(x * 4.3, y * 4.3, 17) * 0.1;

/** Quantidade de sprites pré-renderizados na rampa de cor. */
const RAMP_STEPS = 16;
const SPRITE_PX = 64;

export function ThinkingDots({
  color = "#3a3fff",
  accentColor = "#0071ff",
  background = "transparent",
  speed = 3.7,
  lobes = 2,
  spacing = 0.03,
  maxDotPitch = 20,
  dotSize = 0.156,
  dotGain = 0.164,
  dotSoftness = 0.48,
  jitter = 0.01,
  pulse = 0.02,
  pulseRate = 1.6,
  pulseGlow = 0,
  drift = 0.5,
  cloudScale = 0.8,
  turbulence = 0.22,
  turbulenceScale = 1.8,
  ambient = 0.16,
  intensity = 0.86,
  accentStart = 0.16,
  accentEnd = 0.9,
  glow = 0.035,
  glowFalloff = 3.3,
  grain = 0.03,
  vignette = 0.1,
  cursorInteraction = true,
  cursorInfluence = 1.5,
  cursorRadius = 0.07,
  opacity = 1,
  paused = false,
  className = "",
}: ThinkingDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    // O canvas fica `absolute inset-0`, então o pai dele é a área que o efeito
    // cobre. Escutar o ponteiro ali (e não no próprio div) faz o cursor
    // continuar valendo por trás de cards, textos e links, já que pointermove
    // borbulha desses elementos até este ancestral comum.
    const surface: HTMLElement = host.parentElement ?? host;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const base = hexToRgb(color);
    const accent = hexToRgb(accentColor);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Rampa de cor pré-renderizada: evita criar um gradiente por ponto a cada frame.
    const sprites = Array.from({ length: RAMP_STEPS }, (_, i) => {
      const [r, g, b] = mixRgb(base, accent, i / (RAMP_STEPS - 1));
      const c = document.createElement("canvas");
      c.width = c.height = SPRITE_PX;
      const g2 = c.getContext("2d");
      if (!g2) return c;
      const mid = SPRITE_PX / 2;
      const grad = g2.createRadialGradient(mid, mid, 0, mid, mid, mid);
      const core = Math.max(0.02, (1 - dotSoftness) * 0.85);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
      grad.addColorStop(core, `rgba(${r}, ${g}, ${b}, 0.92)`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      g2.fillStyle = grad;
      g2.fillRect(0, 0, SPRITE_PX, SPRITE_PX);
      return c;
    });

    let width = 0;
    let height = 0;
    let pitch = 0;
    let cols = 0;
    let rows = 0;
    /** Ruído fixo por ponto: jitter x, jitter y e o grão de brilho. */
    let seeds = new Float32Array(0);

    let frameId = 0;
    let elapsed = 0;
    let last = performance.now();
    let visible = true;

    const pointer = { x: 0.5, y: 0.5, active: false };

    const buildGrid = () => {
      pitch = Math.min(maxDotPitch, Math.max(6, Math.min(width, height) * spacing));
      cols = Math.ceil(width / pitch) + 1;
      rows = Math.ceil(height / pitch) + 1;
      seeds = new Float32Array(cols * rows * 3);
      for (let i = 0; i < cols * rows; i++) {
        seeds[i * 3] = Math.random() - 0.5;
        seeds[i * 3 + 1] = Math.random() - 0.5;
        seeds[i * 3 + 2] = Math.random();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    /** Densidade da nuvem em coordenadas normalizadas. */
    const cloudAt = (nx: number, ny: number, t: number) => {
      let d = 0;
      for (let i = 0; i < lobes; i++) {
        const cx = 0.5 + Math.cos(t * drift * 0.31 + i * 2.4) * 0.2;
        const cy = 0.45 + Math.sin(t * drift * 0.23 + i * 1.7) * 0.17;
        const r = Math.max(0.05, cloudScale * (0.3 + 0.07 * Math.sin(t * 0.4 + i)));
        const dx = (nx - cx) / r;
        const dy = (ny - cy) / r;
        d += Math.exp(-(dx * dx + dy * dy) * 2.2);
      }
      if (turbulence > 0) {
        const n = fbm(nx * turbulenceScale * 3 + t * 0.08, ny * turbulenceScale * 3 - t * 0.05);
        d *= 1 + turbulence * (n * 2 - 1);
      }
      return Math.min(1.4, Math.max(0, d));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = "lighter";
      const breath = 1 + pulse * Math.sin(t * pulseRate * Math.PI * 2);
      const aspect = width / height;
      // Alcance do cursor em pixels: circular na tela e alinhado ao ponteiro,
      // independente da proporção da seção.
      const cursorOn = cursorInteraction && pointer.active;
      const cpx = pointer.x * width;
      const cpy = pointer.y * height;
      const cr = Math.max(24, cursorRadius * Math.min(width, height));

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const idx = gy * cols + gx;
          const jx = seeds[idx * 3] * jitter * pitch;
          const jy = seeds[idx * 3 + 1] * jitter * pitch;
          const px = gx * pitch + jx;
          const py = gy * pitch + jy;

          const nx = px / width;
          const ny = py / height;
          // Corrige o aspecto para a nuvem não achatar em seções largas.
          let d = cloudAt((nx - 0.5) * Math.min(aspect, 1.6) + 0.5, ny, t);
          if (cursorOn) {
            const cdx = (px - cpx) / cr;
            const cdy = (py - cpy) / cr;
            d = Math.min(1.4, d + cursorInfluence * 0.3 * Math.exp(-(cdx * cdx + cdy * cdy)));
          }

          let level = (ambient + intensity * d) * breath;
          if (grain > 0) level *= 1 - grain + grain * 2 * seeds[idx * 3 + 2];
          if (vignette > 0) {
            const ex = Math.abs(nx - 0.5) * 2;
            const ey = Math.abs(ny - 0.5) * 2;
            level *= 1 - vignette * Math.min(1, Math.max(ex, ey) ** 2);
          }
          if (level <= 0.012) continue;

          const shade = smoothstep(accentStart, accentEnd, d);
          const sprite = sprites[Math.min(RAMP_STEPS - 1, Math.round(shade * (RAMP_STEPS - 1)))];
          const radius = pitch * (dotSize + dotGain * d);

          if (glow > 0 && d > accentStart) {
            const halo = radius * (1 + glowFalloff * 0.6);
            ctx.globalAlpha = Math.min(1, level * glow * (1 + pulseGlow * (breath - 1) * 40) * 12);
            ctx.drawImage(sprite, px - halo, py - halo, halo * 2, halo * 2);
          }

          ctx.globalAlpha = Math.min(1, level);
          ctx.drawImage(sprite, px - radius, py - radius, radius * 2, radius * 2);
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible && !pausedRef.current) {
        elapsed += dt * speed * 0.06;
        draw(elapsed);
      }
      frameId = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();

    if (reduceMotion) {
      draw(0);
    } else {
      frameId = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    resizeObserver.observe(host);

    // Não gasta frames enquanto a seção está fora da tela.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    visibilityObserver.observe(host);

    if (cursorInteraction) {
      surface.addEventListener("pointermove", onPointerMove);
      surface.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [
    color,
    accentColor,
    background,
    speed,
    lobes,
    spacing,
    maxDotPitch,
    dotSize,
    dotGain,
    dotSoftness,
    jitter,
    pulse,
    pulseRate,
    pulseGlow,
    drift,
    cloudScale,
    turbulence,
    turbulenceScale,
    ambient,
    intensity,
    accentStart,
    accentEnd,
    glow,
    glowFalloff,
    grain,
    vignette,
    cursorInteraction,
    cursorInfluence,
    cursorRadius,
  ]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
