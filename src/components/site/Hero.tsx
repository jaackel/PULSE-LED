export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-screen w-full overflow-hidden bg-black supports-[height:100svh]:min-h-[100svh]"
    >
      {/* Background Video (CapCut HD, Muted, Loop, Plays Inline) */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="/hero-bg.mp4"
        />
      </div>
    </section>
  );
}
