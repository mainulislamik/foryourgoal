import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Foryourgoal — Commercial Image Post-Production Studio",
    short_name: "Foryourgoal",
    description:
      "High-volume hand-crafted clipping path, photo retouching, ghost mannequin, and commercial jewelry post-production studio.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#0284c7",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
