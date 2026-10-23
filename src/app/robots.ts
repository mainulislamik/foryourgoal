import { MetadataRoute } from "next";

/**
 * Robots.txt configuration for Foryourgoal Commercial Studio
 * AI Context Documentation:
 * - https://foryourgoal.com/llms.txt
 * - https://foryourgoal.com/llms-full.txt
 */
export default function robots(): MetadataRoute.Robots {
  const protectedRoutes = ["/api/", "/imon", "/imon/*", "/admin/"];

  const searchAndAiAgents = [
    "Googlebot",
    "Bingbot",
    "GPTBot",
    "OAI-SearchBot",
    "PerplexityBot",
    "ClaudeBot",
    "Applebot",
    "meta-externalagent",
    "anthropic-ai",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: protectedRoutes,
      },
      ...searchAndAiAgents.map((agent) => ({
        userAgent: agent,
        allow: "/",
        disallow: protectedRoutes,
      })),
      {
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: "https://foryourgoal.com/sitemap.xml",
  };
}

