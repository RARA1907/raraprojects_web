import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-outfit", // Syne → body (geometric, karakterli)
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-syne", // Outfit → headings (güzel "a", bold'da parlıyor)
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "raraprojects — Web & Digital",
  description:
    "Küçük işletmeler için hızlı, modern web siteleri. Fast, modern websites for small businesses.",
  openGraph: {
    title: "raraprojects",
    description: "Web design & development by Ragıp Balcı",
    url: "https://raraprojects.com",
    siteName: "raraprojects",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${syne.variable} ${outfit.variable} h-full`}
    >
      <body className="min-h-full bg-rp-bg text-rp-text antialiased">
        {children}
      </body>
    </html>
  );
}
