import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Как да превърнеш AI в реален доход",
  description: "Научи се да печелиш с AI. Пълният наръчник за Prompt Engineering и бизнес стратегии на български език",
  metadataBase: new URL("https://www.bgpromptbook.shop"),
  openGraph: {
    title: "Как да превърнеш AI в реален доход",
    description: "Пълният наръчник за Prompt Engineering и бизнес стратегии на български език. Практически стратегии за реален доход с AI.",
    url: "https://www.bgpromptbook.shop",
    siteName: "BG Prompt Book",
    images: [
      {
        url: "/ebook-cover.png",
        width: 600,
        height: 900,
        alt: "Как да превърнеш AI в реален доход - Електронна книга",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Как да превърнеш AI в реален доход",
    description: "Пълният наръчник за Prompt Engineering и бизнес стратегии на български език.",
    images: ["/ebook-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
