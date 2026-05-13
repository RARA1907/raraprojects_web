const services = [
  {
    number: "01",
    title: "Web Design",
    description:
      "Custom-designed websites built for speed, clarity, and conversions. Mobile-first, always.",
    tags: ["Next.js", "Tailwind", "Figma"],
  },
  {
    number: "02",
    title: "AI-Powered Sites",
    description:
      "We feed your business info to AI and generate a ready-to-launch site in under 60 seconds.",
    tags: ["Claude AI", "Auto-deploy", "CF Pages"],
  },
  {
    number: "03",
    title: "Hosting Transfer",
    description:
      "Move your WordPress site to Cloudflare Pages. Faster, cheaper, no more plugin headaches.",
    tags: ["WordPress → Next.js", "Cloudflare", "SEO-safe"],
  },
  {
    number: "04",
    title: "Monthly Care",
    description:
      "Content updates, speed optimization, uptime monitoring — we keep your site healthy.",
    tags: ["Updates", "Analytics", "Support"],
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 py-24 border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <p className="font-[family-name:var(--font-outfit)] text-sm text-[#666] uppercase tracking-widest mb-3">
            What we do
          </p>
          <h2 className="font-[family-name:var(--font-syne)] font-bold text-5xl text-white">
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1E1E1E]">
          {services.map((s) => (
            <div
              key={s.number}
              className="bg-[#0A0A0A] p-8 hover:bg-[#0f0f0f] transition-colors duration-200 group"
            >
              <span className="font-[family-name:var(--font-outfit)] text-xs text-[#444] mb-6 block">
                {s.number}
              </span>
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-2xl text-white mb-4 group-hover:text-white transition-colors">
                {s.title}
              </h3>
              <p className="font-[family-name:var(--font-outfit)] text-[#666] leading-relaxed mb-6">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-[family-name:var(--font-outfit)] text-xs text-[#555] border border-[#222] rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
