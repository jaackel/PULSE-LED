export function Logo({ className }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2.5 " + (className ?? "")}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-primary/40 bg-surface/70 backdrop-blur-md [box-shadow:var(--glow-sm)]">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/25 to-transparent" />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" aria-hidden>
          <path
            d="M2 13h4l2.5-7 3.5 14 3-9 2 2h5"
            stroke="currentColor"
            className="text-primary-glow"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-extrabold tracking-tight text-foreground">
          PULSE <span className="text-primary-glow">LED</span>
        </span>
        <span className="text-[0.55rem] tracking-[0.32em] text-muted-foreground">DISPLAY</span>
      </span>
    </span>
  );
}
