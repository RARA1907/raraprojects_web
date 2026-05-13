"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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

        {/* Links */}
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

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-2 rounded-full hover:bg-[#e0e0e0] transition-colors duration-200 font-[family-name:var(--font-outfit)]"
        >
          Get in touch
        </a>

        {/* Mobile menu placeholder */}
        <button className="md:hidden text-[#888] hover:text-white">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect y="3" width="20" height="2" rx="1" />
            <rect y="9" width="20" height="2" rx="1" />
            <rect y="15" width="20" height="2" rx="1" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
