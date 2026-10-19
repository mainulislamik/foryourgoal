import { MetadataRoute } from "next";
import { servicesData } from "@/data/services";
import { industriesData } from "@/data/industries";
import { portfolioData } from "@/data/portfolio";
import { blogPostsData } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://foryourgoal.com";

  // Core static routes
  const staticRoutes = [
    "",
    "/services",
    "/industries",
    "/portfolio",
    "/how-it-works",
    "/request-a-quote",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/careers",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic service routes
  const serviceRoutes = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Dynamic industry routes
  const industryRoutes = industriesData.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic portfolio routes
  const portfolioRoutes = portfolioData.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPostsData.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.publishedAt ? new Date(b.publishedAt).toISOString() : new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
