import React, { useEffect, useRef } from "react";

interface DotfieldProps {
  color?: string;
  dotSize?: number;
  spacing?: number;
  glowColor?: string;
  className?: string;
}

export function Dotfield({
  color = "#2563eb",
  dotSize = 1.8,
  spacing = 28,
  glowColor = "#60a5fa",
  className = "",
}: DotfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * spacing;
          const baseY = j * spacing;

          // Distance from mouse
          const dx = mouseX - baseX;
          const dy = mouseY - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          // Wave pulse effect
          const wave = Math.sin(time + (baseX * 0.01) + (baseY * 0.01)) * 0.5 + 0.5;

          let size = dotSize + wave * 0.8;
          let alpha = 0.2 + wave * 0.25;
          let offsetX = 0;
          let offsetY = 0;

          if (dist < maxDist) {
            const factor = (1 - dist / maxDist);
            size += factor * 3.5;
            alpha += factor * 0.65;
            offsetX = - (dx / dist) * factor * 14;
            offsetY = - (dy / dist) * factor * 14;
          }

          ctx.fillStyle = dist < maxDist ? glowColor : color;
          ctx.globalAlpha = Math.min(1, alpha);
          ctx.beginPath();
          ctx.arc(baseX + offsetX, baseY + offsetY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, dotSize, spacing, glowColor]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <canvas id="dotfield" ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
