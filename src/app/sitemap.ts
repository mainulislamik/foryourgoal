import { MetadataRoute } from "next";
import { getDynamicServices } from "@/lib/site-content";
import { servicesData } from "@/data/services";
import { industriesData } from "@/data/industries";
import { portfolioData } from "@/data/portfolio";
import { blogPostsData } from "@/data/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://foryourgoal.com";

  const toAbsoluteUrl = (img?: string): string | null => {
    if (!img) return null;
    return img.startsWith("http")
      ? img
      : `${baseUrl}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  // Core static routes with optimized changeFrequency & priority
  const staticRoutes = [
    {
      route: "",
      priority: 1.0,
      freq: "weekly" as const,
      images: [`${baseUrl}/images/og-image.jpg`],
    },
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
    { route: "/nda", priority: 0.7, freq: "monthly" as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: item.freq,
    priority: item.priority,
    ...(item.images ? { images: item.images } : {}),
  }));

  // Fetch dynamic content from CMS store and merge with static definitions
  const dynamicServices = await getDynamicServices().catch(() => []);
  const cmsSlugs = new Set(dynamicServices.map((s) => s.slug));
  const missingServices = servicesData.filter((s) => !cmsSlugs.has(s.slug));
  const services = [...dynamicServices, ...missingServices];

  // Dynamic service routes (High Priority B2B targets)
  const serviceRoutes = services.map((s) => {
    const images: string[] = [];
    const before = toAbsoluteUrl(s.beforeImage);
    const after = toAbsoluteUrl(s.afterImage);
    if (before) images.push(before);
    if (after) images.push(after);

    return {
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      ...(images.length > 0 ? { images } : {}),
    };
  });

  // Dynamic industry routes
  const industryRoutes = industriesData.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Dynamic portfolio routes
  const portfolioRoutes = portfolioData.map((item) => {
    const images: string[] = [];
    const before = toAbsoluteUrl(item.beforeImage);
    const after = toAbsoluteUrl(item.afterImage);
    if (before) images.push(before);
    if (after) images.push(after);

    return {
      url: `${baseUrl}/portfolio/${item.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(images.length > 0 ? { images } : {}),
    };
  });

  // Dynamic blog routes (All in-depth technical guides)
  const blogRoutes = blogPostsData.map((b) => {
    const images: string[] = [];
    const cover = toAbsoluteUrl(b.coverImage);
    if (cover) images.push(cover);

    return {
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.publishedAt ? new Date(b.publishedAt).toISOString() : new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      ...(images.length > 0 ? { images } : {}),
    };
  });

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
