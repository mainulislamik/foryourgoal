import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Before & After Portfolio | Image Editing Work",
  description:
    "Explore our commercial photo editing portfolio. Inspect 100% manual hand-drawn clipping paths, high-end product retouching, ghost mannequin, and jewelry editing.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Commercial Before & After Portfolio | Foryourgoal Studio",
    description:
      "Explore high-end before/after image retouching samples. 100% hand-crafted clipping paths and color correction.",
    url: "https://foryourgoal.com/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
