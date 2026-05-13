import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const TURNSTILE_SITE_KEY = "0x4AAAAAAB8jgvpN8NGUuycc";

export const metadata: Metadata = {
  metadataBase: new URL("https://raraprojects.com"),
  title: {
    default: "raraprojects — Web & Digital Agency",
    template: "%s | raraprojects",
  },
  description:
    "Küçük işletmeler için hızlı, modern web siteleri. Cloudflare Pages, Next.js ve AI destekli tasarım. 35+ proje, hızlı teslimat.",
  keywords: ["web design", "web development", "Next.js", "Cloudflare", "Türkiye", "Istanbul", "small business website", "kurumsal web", "e-ticaret"],
  authors: [{ name: "Ragıp Balcı" }],
  creator: "Ragıp Balcı — raraprojects",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://raraprojects.com",
    siteName: "raraprojects",
    title: "raraprojects — Web & Digital Agency",
    description: "Fast, modern websites for small businesses. Cloudflare Pages, Next.js and AI-powered design.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "raraprojects — Web & Digital Agency",
    description: "Fast, modern websites for small businesses.",
    creator: "@raraprojects",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${syne.variable} ${outfit.variable} h-full`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "raraprojects",
              description: "Fast, modern websites for small businesses. Cloudflare Pages, Next.js and AI-powered design.",
              url: "https://raraprojects.com",
              telephone: "+90-535-480-0478",
              email: "rara@raraprojects.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Istanbul",
                addressCountry: "TR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "41.0082",
                longitude: "28.9784",
              },
              areaServed: "Türkiye",
              priceRange: "$$",
              serviceType: ["Web Design", "Web Development", "Hosting", "SEO"],
              sameAs: ["https://github.com/RARA1907"],
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-rp-bg text-rp-text antialiased">
        {children}
      </body>
    </html>
  );
}