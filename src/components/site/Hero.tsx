import { Dotfield } from "./Dotfield";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-screen w-full overflow-hidden bg-background supports-[height:100svh]:min-h-[100svh]"
    >
      {/* Dotfield interactive canvas background grid */}
      <Dotfield color="#2563eb" glowColor="#60a5fa" spacing={28} dotSize={2} />
    </section>
  );
}
