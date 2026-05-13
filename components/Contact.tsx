"use client";

import { useState, useEffect, useRef } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAAB8jgvpN8NGUuycc";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", business: "", message: "" });
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.head.appendChild(script);

    const interval = setInterval(() => {
      if ((window as any).turnstile && turnstileRef.current && !widgetIdRef.current) {
        clearInterval(interval);
        widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          callback: (token: string) => {
            (window as any).turnstileToken = token;
          },
        }) as string;
      }
    }, 200);

    return () => {
      clearInterval(interval);
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const turnstileToken = (window as any).turnstileToken || "";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", business: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 py-24 border-t border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <p className="font-[family-name:var(--font-outfit)] text-sm text-[#666] uppercase tracking-widest mb-3">
              Let&apos;s work together
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-bold text-5xl text-white mb-6 leading-tight">
              Get in touch
            </h2>
            <p className="font-[family-name:var(--font-outfit)] text-[#666] leading-relaxed mb-10 max-w-md">
              Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="space-y-4">
              <a href="https://wa.me/905354800478" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#111] border border-[#1E1E1E] flex items-center justify-center group-hover:border-[#333] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#888]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-outfit)] text-white text-sm">WhatsApp</div>
                  <div className="font-[family-name:var(--font-outfit)] text-[#555] text-xs">+90 535 480 0478</div>
                </div>
              </a>

              <a href="mailto:rara@raraprojects.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#111] border border-[#1E1E1E] flex items-center justify-center group-hover:border-[#333] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#888]">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-outfit)] text-white text-sm">Email</div>
                  <div className="font-[family-name:var(--font-outfit)] text-[#555] text-xs">rara@raraprojects.com</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          {status === "success" ? (
            <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-400">
                  <path d="M2 7l7 7L22 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl text-white mb-2">Message sent!</h3>
              <p className="font-[family-name:var(--font-outfit)] text-[#666] text-sm">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-[family-name:var(--font-outfit)] text-xs text-[#555] mb-2 block">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] font-[family-name:var(--font-outfit)] focus:outline-none focus:border-[#444] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-[family-name:var(--font-outfit)] text-xs text-[#555] mb-2 block">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="05xx xxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] font-[family-name:var(--font-outfit)] focus:outline-none focus:border-[#444] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-[family-name:var(--font-outfit)] text-xs text-[#555] mb-2 block">Business name</label>
                <input
                  type="text"
                  placeholder="Your business"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] font-[family-name:var(--font-outfit)] focus:outline-none focus:border-[#444] transition-colors"
                />
              </div>

              <div>
                <label className="font-[family-name:var(--font-outfit)] text-xs text-[#555] mb-2 block">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#111] border border-[#1E1E1E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] font-[family-name:var(--font-outfit)] focus:outline-none focus:border-[#444] transition-colors resize-none"
                />
              </div>

              <div ref={turnstileRef} />

              {status === "error" && (
                <p className="font-[family-name:var(--font-outfit)] text-red-400 text-xs">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !formData.name.trim() || !formData.message.trim()}
                className="w-full bg-white text-black font-[family-name:var(--font-outfit)] font-medium py-3 rounded-full hover:bg-[#e0e0e0] transition-colors text-sm disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}