const plans = [
  {
    name: "Starter",
    price: "$70",
    period: "one-time",
    description: "Perfect for small businesses that need a clean online presence fast.",
    features: [
      "Up to 5 pages",
      "Mobile responsive",
      "Contact form",
      "1 month of edits included",
      "Cloudflare hosting setup",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$120",
    period: "one-time",
    description: "For businesses that want a standout site with more content and features.",
    features: [
      "Up to 12 pages",
      "Custom animations",
      "SEO optimization",
      "Google Analytics setup",
      "3 months of edits included",
      "Priority support",
    ],
    cta: "Most popular",
    highlight: true,
  },
  {
    name: "Care Plan",
    price: "$15",
    period: "/ month",
    description: "Ongoing maintenance so your site stays fast, updated, and online.",
    features: [
      "Content updates (2x/month)",
      "Speed monitoring",
      "Uptime alerts",
      "Monthly report",
      "WhatsApp support",
    ],
    cta: "Subscribe",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <p className="font-[family-name:var(--font-outfit)] text-sm text-[#666] uppercase tracking-widest mb-3">
            Transparent pricing
          </p>
          <h2 className="font-[family-name:var(--font-syne)] font-bold text-5xl text-white">
            Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                p.highlight
                  ? "bg-white text-black border-white"
                  : "bg-[#111] border-[#1E1E1E] text-white"
              }`}
            >
              <div className="mb-6">
                <div className="font-[family-name:var(--font-outfit)] text-sm mb-4 opacity-60">
                  {p.name}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-syne)] font-bold text-4xl">
                    {p.price}
                  </span>
                  <span className="font-[family-name:var(--font-outfit)] text-sm opacity-50">
                    {p.period}
                  </span>
                </div>
              </div>

              <p
                className={`font-[family-name:var(--font-outfit)] text-sm leading-relaxed mb-8 ${
                  p.highlight ? "text-black/60" : "text-[#666]"
                }`}
              >
                {p.description}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 font-[family-name:var(--font-outfit)] text-sm"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className={p.highlight ? "text-black" : "text-[#555]"}
                    >
                      <path
                        d="M2 7l3.5 3.5L12 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={p.highlight ? "text-black/80" : "text-[#aaa]"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full text-center font-[family-name:var(--font-outfit)] font-medium py-3 rounded-full text-sm transition-colors ${
                  p.highlight
                    ? "bg-black text-white hover:bg-[#222]"
                    : "bg-[#1a1a1a] border border-[#333] text-white hover:border-[#555]"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="font-[family-name:var(--font-outfit)] text-center text-[#555] text-sm mt-8">
          Custom project? <a href="#contact" className="text-[#888] hover:text-white underline underline-offset-2 transition-colors">Let&apos;s talk.</a>
        </p>
      </div>
    </section>
  );
}
