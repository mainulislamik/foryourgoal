import { MetadataRoute } from "next";
import { getDynamicServices, getDynamicPortfolio, getDynamicFaqs } from "@/lib/site-content";
import { servicesData } from "@/data/services";
import { industriesData } from "@/data/industries";
import { portfolioData } from "@/data/portfolio";
import { blogPostsData } from "@/data/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://foryourgoal.com";

  // Core static routes with optimized changeFrequency & priority
  const staticRoutes = [
    { route: "", priority: 1.0, freq: "weekly" as const },
    { route: "/services", priority: 0.95, freq: "weekly" as const },
    { route: "/portfolio", priority: 0.9, freq: "weekly" as const },
    { route: "/industries", priority: 0.85, freq: "monthly" as const },
    { route: "/how-it-works", priority: 0.8, freq: "monthly" as const },
    { route: "/request-a-quote", priority: 0.95, freq: "monthly" as const },
    { route: "/request-free-trial", priority: 0.95, freq: "monthly" as const },
    { route: "/about", priority: 0.75, freq: "monthly" as const },
    { route: "/contact", priority: 0.8, freq: "monthly" as const },
    { route: "/faq", priority: 0.85, freq: "weekly" as const },
    { route: "/blog", priority: 0.85, freq: "daily" as const },
    { route: "/careers", priority: 0.6, freq: "monthly" as const },
    { route: "/privacy-policy", priority: 0.5, freq: "yearly" as const },
    { route: "/terms", priority: 0.5, freq: "yearly" as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: item.freq,
    priority: item.priority,
  }));

  // Fetch dynamic content from CMS store and merge with static definitions
  const dynamicServices = await getDynamicServices().catch(() => []);
  const cmsSlugs = new Set(dynamicServices.map((s) => s.slug));
  const missingServices = servicesData.filter((s) => !cmsSlugs.has(s.slug));
  const services = [...dynamicServices, ...missingServices];

  const dynamicPortfolio = await getDynamicPortfolio().catch(() => []);
  const portfolio = dynamicPortfolio.length > 0 ? dynamicPortfolio : portfolioData;

  // Dynamic service routes (High Priority B2B targets)
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic industry routes
  const industryRoutes = industriesData.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Dynamic portfolio routes
  const portfolioRoutes = portfolioData.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPostsData.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.publishedAt ? new Date(b.publishedAt).toISOString() : new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
