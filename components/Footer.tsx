export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div>
          <div className="font-[family-name:var(--font-outfit)] font-semibold text-white mb-1">
            rara<span className="text-[#444]">projects</span>
          </div>
          <div className="font-[family-name:var(--font-outfit)] text-xs text-[#444]">
            by Ragıp Balcı — Istanbul, Turkey
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="mailto:rara@raraprojects.com"
            className="font-[family-name:var(--font-outfit)] text-xs text-[#555] hover:text-white transition-colors"
          >
            rara@raraprojects.com
          </a>
          <a
            href="https://wa.me/905354800478"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-outfit)] text-xs text-[#555] hover:text-white transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <div className="font-[family-name:var(--font-outfit)] text-xs text-[#333]">
          © {year} raraprojects
        </div>
      </div>
    </footer>
  );
}
