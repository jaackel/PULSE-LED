import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
  size?: "md" | "lg";
};

/**
 * Liquid-glass button: translucent body, blurred backdrop, inner highlight
 * and a blue LED glow that intensifies on hover.
 */
export function GlassButton({
  children,
  href,
  variant = "primary",
  external = false,
  className,
  size = "md",
}: Props) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "glass-sheen group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight",
        "backdrop-blur-xl transition-all duration-500 will-change-transform",
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        size === "lg" ? "px-7 py-3.5 text-[0.95rem]" : "px-5 py-2.5 text-sm",
        variant === "primary"
          ? "border border-primary/45 text-foreground [background:linear-gradient(145deg,color-mix(in_oklab,var(--primary)_38%,transparent),color-mix(in_oklab,var(--primary)_12%,transparent))] [box-shadow:var(--glow-sm)] hover:border-primary/70 hover:[box-shadow:var(--glow-md)]"
          : "border border-border text-silver [background:linear-gradient(145deg,oklch(1_0_0_/_0.06),oklch(1_0_0_/_0.015))] hover:border-primary/40 hover:text-foreground",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-primary-glow/70 to-transparent"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}
