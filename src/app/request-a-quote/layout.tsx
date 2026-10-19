import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote & Free 2-Image Trial | Fast Turnaround",
  description:
    "Request custom enterprise project proposals and submit your 2-image free sample trial. 45-minute guaranteed SLA quotation for global brands and studios.",
  alternates: {
    canonical: "/request-a-quote",
  },
  openGraph: {
    title: "Request a Quote & Free 2-Image Trial | Foryourgoal Studio",
    description:
      "Get guaranteed project estimates and a free 2-image pilot with non-disclosure protection.",
    url: "https://foryourgoal.com/request-a-quote",
  },
};

export default function RequestQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
