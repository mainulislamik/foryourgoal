import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SLAs, Quality Control & Security",
  description:
    "Find answers to common questions about Foryourgoal image editing services, turnaround SLAs, NDA security protocols, batch billing, and file format deliveries.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Foryourgoal Studio",
    description:
      "Everything you need to know about turnaround speeds, quality assurance, pricing, and confidentiality.",
    url: "https://foryourgoal.com/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
