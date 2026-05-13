"use client";

import { useState } from "react";

type Project = {
  name: string;
  client: string;
  url: string;
  pageType: string;
  industry: string;
  tech: string;
  services: string[];
  year: string;
};

const projects: Project[] = [
  // CF Pages
  { name: "AR-TES", client: "AR-TES", url: "ar-tes.com.tr", pageType: "Kurumsal", industry: "Endüstriyel", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design", "SEO"], year: "2024" },
  { name: "Nuh'un Gemisi Vet", client: "Nuh'un Gemisi", url: "nuhungemisi-vet.com.tr", pageType: "Kurumsal", industry: "Veteriner", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2024" },
  { name: "Top Camp USA", client: "Top Camp USA", url: "topcampusa.com", pageType: "Kurumsal", industry: "Spor", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Tursa Holding", client: "Tursa Holding", url: "tursamholding.com", pageType: "Kurumsal", industry: "Holding", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Indigo Lounge", client: "Indigo Lounge", url: "indigolounge.co", pageType: "Kurumsal", industry: "Hospitality", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Hair Pigmentations", client: "Hair Pigmentations", url: "hairpigmentations.com", pageType: "Kurumsal", industry: "Sağlık", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Corpfit", client: "Corpfit", url: "corpfit.org", pageType: "Kurumsal", industry: "Fitness", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Dağ Prefabrik", client: "Dağ Prefabrik", url: "dagprefabrik.com", pageType: "Kurumsal", industry: "İnşaat", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Kuzeyli İnşaat", client: "Kuzeyli İnşaat", url: "kuzeyliinsaat.com", pageType: "Kurumsal", industry: "İnşaat", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Escon Construction", client: "Escon", url: "esconconstruction.com", pageType: "Kurumsal", industry: "İnşaat", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "KMS Eskişehir", client: "KMS", url: "kmseskisehir.com.tr", pageType: "Kurumsal", industry: "B2B", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "EFC Partners", client: "EFC Partners", url: "efcpartners.com", pageType: "Kurumsal", industry: "Danışmanlık", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Ethos Associates", client: "Ethos Associates", url: "ethosassoc.com", pageType: "Kurumsal", industry: "Danışmanlık", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "ESDO", client: "ESDO", url: "esdo.org.tr", pageType: "Kurumsal", industry: "STK", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Fatih Serdaroğlu", client: "Fatih Serdaroğlu", url: "fatihserdaroglu.com", pageType: "Kişisel", industry: "Avukat", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  { name: "Made by Yaso", client: "Yaso", url: "madebyyaso.com", pageType: "E-commerce, Kişisel", industry: "Kreatif", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design", "E-commerce"], year: "2024" },
  { name: "Co Mimarlık", client: "Co Mimarlık", url: "comimarlik.com", pageType: "Kurumsal", industry: "Mimarlık", tech: "Next.js · Tailwind · CF Pages", services: ["Web Design"], year: "2023" },
  // WordPress E-commerce
  { name: "Cinnamomo", client: "Cinnamomo", url: "cinnamomo.com", pageType: "Blog, Kişisel", industry: "Gıda", tech: "WordPress", services: ["Web Design", "Blog"], year: "2023" },
  { name: "Efo Ağaç", client: "Efo Ağaç", url: "efoagac.com.tr", pageType: "Kurumsal", industry: "Mobilya", tech: "WordPress", services: ["Web Design"], year: "2023" },
  { name: "Minory Baby", client: "Minory Baby", url: "minorybaby.com", pageType: "E-commerce", industry: "E-ticaret", tech: "WordPress", services: ["Web Design", "E-commerce"], year: "2023" },
  { name: "Muzipo", client: "Muzipo", url: "muzipo.com", pageType: "E-commerce", industry: "E-ticaret", tech: "WordPress", services: ["Web Design", "E-commerce"], year: "2023" },
  { name: "Kormas", client: "Kormas", url: "kormas.com", pageType: "E-commerce", industry: "Endüstriyel", tech: "WordPress", services: ["Web Design", "E-commerce"], year: "2023" },
  { name: "MasterFresh", client: "MasterFresh", url: "masterfresh.com.tr", pageType: "E-commerce", industry: "Gıda", tech: "WordPress", services: ["Web Design", "E-commerce"], year: "2023" },
  { name: "645 Dükkan", client: "645 Dükkan", url: "645dukkan.com", pageType: "E-commerce", industry: "E-ticaret", tech: "WordPress", services: ["Web Design", "E-commerce"], year: "2022" },
  { name: "Nite Nite", client: "Nite Nite", url: "nitenite.com.tr", pageType: "E-commerce", industry: "E-ticaret", tech: "WordPress", services: ["Web Design", "E-commerce"], year: "2022" },
  { name: "Billas", client: "Billas", url: "billas.com.tr", pageType: "E-commerce", industry: "Otomotiv", tech: "WordPress", services: ["Web Design", "E-commerce"], year: "2022" },
  // WordPress Kurumsal
  { name: "Cey Ajans", client: "Cey Ajans", url: "ceyajans.com", pageType: "Kurumsal", industry: "Reklam Ajansı", tech: "WordPress", services: ["Web Design"], year: "2023" },
  { name: "Kappa", client: "Kappa", url: "kappa.net.tr", pageType: "Kurumsal", industry: "İnşaat", tech: "WordPress", services: ["Web Design"], year: "2022" },
  { name: "Ovakent", client: "Ovakent", url: "ovakent.com.tr", pageType: "Kurumsal", industry: "Otomotiv", tech: "WordPress", services: ["Web Design"], year: "2022" },
  { name: "Olimpa", client: "Olimpa", url: "olimpa.com.tr", pageType: "Kurumsal", industry: "Spor", tech: "WordPress", services: ["Web Design"], year: "2022" },
  { name: "Başak Traktör", client: "Başak Traktör", url: "basaktraktor.com.tr", pageType: "Kurumsal", industry: "Tarım", tech: "WordPress", services: ["Web Design"], year: "2022" },
  { name: "645KK", client: "645KK", url: "645kk.com", pageType: "Kurumsal", industry: "Hospitality", tech: "WordPress", services: ["Web Design"], year: "2022" },
];

const allTypes = ["Tümü", ...Array.from(new Set(projects.flatMap((p) => p.pageType.split(", "))))];
const allTechs = ["Tümü", ...Array.from(new Set(projects.map((p) => p.tech)))];

const screenshotPath = (url: string) =>
  `/screenshots/${url.replace(/\./g, "-")}.jpg`;

export default function Work() {
  const [selectedType, setSelectedType] = useState("Tümü");
  const [selectedTech, setSelectedTech] = useState("Tümü");

  const filtered = projects.filter((p) => {
    const typeMatch = selectedType === "Tümü" || p.pageType.split(", ").includes(selectedType);
    const techMatch = selectedTech === "Tümü" || p.tech === selectedTech;
    return typeMatch && techMatch;
  });

  return (
    <section id="work" className="px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-[family-name:var(--font-outfit)] text-sm text-[#666] uppercase tracking-widest mb-3">
              Portfolio
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-bold text-5xl text-white">
              Selected Work
            </h2>
          </div>
          <span className="hidden md:block font-[family-name:var(--font-outfit)] text-[#666] text-sm">
            {filtered.length} / {projects.length} projects
          </span>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-10">
          {/* Page Type filter */}
          <div className="flex flex-wrap gap-2">
            {allTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`font-[family-name:var(--font-outfit)] text-xs px-4 py-1.5 rounded-full border transition-colors ${
                  selectedType === type
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-[#666] border-[#1C1C1C] hover:border-[#444] hover:text-[#EBEBEB]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Tech filter */}
          <div className="flex flex-wrap gap-2">
            {allTechs.filter(t => t !== "Tümü").map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(selectedTech === tech ? "Tümü" : tech)}
                className={`font-[family-name:var(--font-outfit)] text-[11px] px-3 py-1 rounded-full border transition-colors ${
                  selectedTech === tech
                    ? "bg-[#1a1a1a] text-white border-[#444]"
                    : "bg-transparent text-[#444] border-[#1C1C1C] hover:border-[#333] hover:text-[#888]"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((p, i) => (
              <div
                key={p.url}
                className="group relative bg-[#0F0F0F] border border-[#1C1C1C] rounded-xl overflow-hidden aspect-[4/3] hover:border-[#2a2a2a] transition-all duration-500"
              >
                {/* Card number */}
                <span className="absolute top-4 left-4 font-[family-name:var(--font-syne)] text-xs font-bold text-[#333] z-10 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Page type badge */}
                <span className="absolute top-4 right-4 font-[family-name:var(--font-outfit)] text-[10px] text-[#444] uppercase tracking-widest z-10">
                  {p.pageType}
                </span>

                {/* Screenshot */}
                <img
                  src={screenshotPath(p.url)}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />

                {/* Fallback grid pattern */}
                <div
                  className="absolute inset-0 -z-0"
                  style={{
                    backgroundImage: "linear-gradient(#161616 1px, transparent 1px), linear-gradient(90deg, #161616 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Hover reveal — light card */}
                <div className="absolute inset-0 bg-white/[0.92] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-outfit)] text-[10px] text-[#333] uppercase tracking-[0.15em]">
                        {p.industry}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                      <span className="font-[family-name:var(--font-outfit)] text-[10px] text-[#333] uppercase tracking-[0.15em]">
                        {p.year}
                      </span>
                    </div>
                    <div className="font-[family-name:var(--font-syne)] font-bold text-black text-base leading-tight">
                      {p.name}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tech.split(" · ").map((t) => (
                      <span
                        key={t}
                        className="font-[family-name:var(--font-outfit)] text-[9px] text-white bg-black rounded-full px-2 py-0.5"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mb-3">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="font-[family-name:var(--font-outfit)] text-[9px] text-[#555]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between gap-2 mt-2 pt-2 border-t border-[#e0e0e0]">
                    <span className="font-[family-name:var(--font-outfit)] text-[10px] text-[#666]">
                      {p.url}
                    </span>
                    <a
                      href={`https://${p.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 bg-black rounded-full hover:bg-[#333] transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="text-white">
                        <path d="M4 14L14 4M14 4H7M14 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 border border-[#1C1C1C] rounded-xl">
            <p className="font-[family-name:var(--font-outfit)] text-[#444] text-sm">
              Bu filtrede proje bulunamadı
            </p>
          </div>
        )}
      </div>
    </section>
  );
}