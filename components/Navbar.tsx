"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1E1E1E]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-[family-name:var(--font-outfit)] font-semibold text-lg tracking-tight text-white"
          >
            rara<span className="text-[#888]">projects</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-[#888] hover:text-white transition-colors duration-200 font-[family-name:var(--font-outfit)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-2 rounded-full hover:bg-[#e0e0e0] transition-colors duration-200 font-[family-name:var(--font-outfit)]"
          >
            Get in touch
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#888] hover:text-white p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect y="3" width="20" height="2" rx="1" />
              <rect y="9" width="20" height="2" rx="1" />
              <rect y="15" width="20" height="2" rx="1" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-white flex flex-col"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#e0e0e0]">
            <span className="font-[family-name:var(--font-outfit)] font-semibold text-lg tracking-tight text-black">
              rara<span className="text-[#888]">projects</span>
            </span>
            <button
              onClick={closeMenu}
              className="p-1 text-black"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="3" y="3" width="14" height="2" rx="1" transform="rotate(45 3 3)" />
                <rect x="3" y="3" width="14" height="2" rx="1" transform="rotate(-45 17 3)" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="font-[family-name:var(--font-syne)] font-bold text-4xl text-black hover:text-[#555] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-flex items-center justify-center bg-black text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#333] transition-colors font-[family-name:var(--font-outfit)] mt-4 w-fit"
            >
              Get in touch
            </a>
          </div>

          {/* Footer */}
          <div className="px-8 py-8 border-t border-[#e0e0e0]">
            <p className="font-[family-name:var(--font-outfit)] text-xs text-[#999]">
              rara@raraprojects.com
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}