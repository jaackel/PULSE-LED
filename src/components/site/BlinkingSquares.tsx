import React, { useEffect, useRef } from "react";

interface BlinkingSquaresProps {
  direction?: "bottom" | "top" | "left" | "right";
  color?: string;
  squareSize?: number;
  gridSize?: number;
  falloff?: number;
  fadeStart?: number;
  fadeEnd?: number;
  twinkleSpeed?: number;
  twinkleStrength?: number;
  minBrightness?: number;
  className?: string;
}

export function BlinkingSquares({
  direction = "bottom",
  color = "#5153ff",
  squareSize = 4,
  gridSize = 82,
  falloff = 3.4,
  fadeStart = 0.29,
  fadeEnd = 1.0,
  twinkleSpeed = 1.4,
  twinkleStrength = 0.94,
  minBrightness = 0.15,
  className = "",
}: BlinkingSquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initSquares();
    };
    window.addEventListener("resize", handleResize);

    interface SquareCell {
      x: number;
      y: number;
      normY: number;
      phase: number;
      speed: number;
      baseOpacity: number;
      active: boolean;
    }

    let squares: SquareCell[] = [];

    const initSquares = () => {
      squares = [];
      const colWidth = width / gridSize;
      const stepX = colWidth;
      const stepY = colWidth; // keep square grid aspect ratio
      const rows = Math.ceil(height / stepY);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < gridSize; c++) {
          const normY = r / rows; // 0 (top) to 1 (bottom)
          
          // Density / Falloff probability calculation
          let probability = Math.pow(normY, falloff);
          if (direction === "top") probability = Math.pow(1 - normY, falloff);

          // Apply fadeStart & fadeEnd cutoffs
          if (normY < fadeStart && direction === "bottom") {
            probability *= Math.pow(normY / fadeStart, 2);
          }

          if (Math.random() < probability * 0.85) {
            squares.push({
              x: c * stepX + (stepX - squareSize) / 2,
              y: r * stepY + (stepY - squareSize) / 2,
              normY,
              phase: Math.random() * Math.PI * 2,
              speed: (0.02 + Math.random() * 0.04) * twinkleSpeed,
              baseOpacity: probability,
              active: true,
            });
          }
        }
      }
    };

    initSquares();

    const hexToRgb = (hex: string) => {
      let c = hex.replace("#", "");
      if (c.length === 3) c = c.split("").map((x) => x + x).join("");
      const num = parseInt(c, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    };

    const rgb = hexToRgb(color);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];
        sq.phase += sq.speed;

        // Calculate twinkling brightness wave
        const wave = (Math.sin(sq.phase) + 1) / 2; // 0 to 1
        const opacity =
          (minBrightness + wave * (twinkleStrength - minBrightness)) * sq.baseOpacity;

        if (opacity > 0.02) {
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
          ctx.fillRect(sq.x, sq.y, squareSize, squareSize);

          // Slight glow halo for brighter twinkling squares
          if (wave > 0.8 && opacity > 0.4) {
            ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 0.4})`;
            ctx.fillRect(sq.x - 1, sq.y - 1, squareSize + 2, squareSize + 2);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    color,
    squareSize,
    gridSize,
    falloff,
    fadeStart,
    fadeEnd,
    twinkleSpeed,
    twinkleStrength,
    minBrightness,
    direction,
  ]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
