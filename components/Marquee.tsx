const items = [
  "RARAPROJECTS",
  "WEB DESIGN",
  "ISTANBUL",
  "35+ PROJECTS",
  "SINCE 2021",
  "CLOUDFLARE PAGES",
  "AI-POWERED",
  "NEXT.JS",
];

export default function Marquee() {
  const track = [...items, ...items]; // doubled for seamless loop

  return (
    <div className="overflow-hidden border-y border-[#1C1C1C] py-4 select-none">
      <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            <span className="font-[family-name:var(--font-syne)] text-xs font-semibold tracking-[0.2em] text-[#2a2a2a] uppercase">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#2a2a2a] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
