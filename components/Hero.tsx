export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-16 relative overflow-hidden">

      {/* Subtle radial glow behind heading */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(245,240,232,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto w-full relative">

        {/* Heading — editorial scale */}
        <h1 className="fade-up fade-up-2 font-[family-name:var(--font-syne)] font-extrabold leading-[0.95] tracking-tight text-[#EBEBEB] mb-8"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
          Portfolio
        </h1>

        {/* CTAs row */}
        <div className="fade-up fade-up-3 flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mb-0">
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-[#F5F0E8] text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white transition-colors font-[family-name:var(--font-outfit)]"
            >
              See our work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#1C1C1C] text-[#606060] text-sm font-medium px-6 py-3 rounded-full hover:border-[#444] hover:text-[#EBEBEB] transition-colors font-[family-name:var(--font-outfit)]"
            >
              Talk to us
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="fade-up fade-up-4 flex flex-wrap gap-10 mt-16 pt-8 border-t border-[#1C1C1C]">
          {[
            { value: "35+", label: "Websites launched" },
            { value: "25 yrs", label: "Experience" },
            { value: "60s", label: "Demo in seconds" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-[family-name:var(--font-syne)] font-bold text-[2.2rem] text-[#EBEBEB] leading-none">
                {s.value}
              </div>
              <div className="font-[family-name:var(--font-outfit)] text-xs text-[#3a3a3a] mt-2 uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
