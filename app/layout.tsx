import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Xaurum Academy – Shape Your Future With Excellence",
    template: "%s | Xaurum Academy",
  },
  description:
    "Xaurum Academy is a premier coaching center for JEE, NEET, WBJEE, and Board Exams (Class 9-12). Join India's most trusted coaching institute with expert IIT & AIIMS alumni faculty.",
  keywords: [
    "JEE coaching", "NEET coaching", "WBJEE coaching",
    "class 11 coaching", "class 12 coaching", "board exam preparation",
    "Xaurum Academy", "top coaching center", "IIT JEE preparation",
  ],
  authors: [{ name: "Xaurum Academy" }],
  creator: "Xaurum Academy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://xaurumacademy.com",
    siteName: "Xaurum Academy",
    title: "Xaurum Academy – Shape Your Future With Excellence",
    description: "Premier coaching center for JEE, NEET, WBJEE, and Board Exams. Expert faculty, proven results.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Xaurum Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xaurum Academy – Shape Your Future With Excellence",
    description: "Premier coaching for JEE, NEET, WBJEE, and Board Exams.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563EB" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Xaurum Academy",
              url: "https://xaurumacademy.com",
              description: "Premier coaching center for JEE, NEET, WBJEE, and Board Exams",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kolkata",
                addressRegion: "West Bengal",
                addressCountry: "IN",
              },
              contactPoint: { "@type": "ContactPoint", telephone: "+91-9800000000", contactType: "customer service" },
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
