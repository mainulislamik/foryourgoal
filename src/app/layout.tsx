import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { GlobalJsonLd } from "@/components/seo/GlobalJsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://foryourgoal.com"),
  title: {
    default: "Professional Image Editing & Photo Retouching | Foryourgoal",
    template: "%s | Foryourgoal",
  },
  description:
    "Expert hand-drawn clipping paths, high-end product retouching, ghost mannequin, and jewelry photo editing for global e-commerce brands and studios.",
  category: "Photo Editing & Commercial Retouching Studio",
  classification: "Commercial Photography & E-Commerce Post-Production",
  keywords: [
    "clipping path service",
    "photo retouching services",
    "product image editing",
    "ghost mannequin service",
    "background removal service",
    "jewelry retouching",
    "ecommerce photo editing outsourcing",
    "bulk image editing",
  ],
  authors: [{ name: "Foryourgoal Studio", url: "https://foryourgoal.com" }],
  creator: "Foryourgoal",
  publisher: "Foryourgoal",
  alternates: {
    canonical: "https://foryourgoal.com",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foryourgoal.com",
    siteName: "Foryourgoal",
    title: "Professional Image Editing & Photo Retouching Services | Foryourgoal",
    description:
      "Hand-crafted clipping paths, high-end product retouching, and enterprise e-commerce image editing. 6–24 hour guaranteed turnaround.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Foryourgoal Professional Image Editing Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Image Editing & Photo Retouching Services | Foryourgoal",
    description:
      "Hand-crafted clipping paths, high-end product retouching, and enterprise e-commerce image editing. 6–24 hour guaranteed turnaround.",
    images: ["/images/og-image.jpg"],
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
    google: "IzAXG90BGF5JUWVjCc0Yrijov3qHU3wsKYFIOXBjcRo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <GlobalJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-800 font-sans selection:bg-indigo-600 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-slate-900 text-white font-bold rounded-lg shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <MainWrapper>
          {children}
        </MainWrapper>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
