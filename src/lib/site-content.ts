import fs from "fs";
import path from "path";

export interface GlobalConfig {
  brandName: string;
  tagline: string;
  supportEmail: string;
  contactPhone: string;
  address: string;
  companyBio: string;
  turnaroundBadge: string;
  turnaroundSub: string;
  craftBadge: string;
  craftSub: string;
  ndaBadge: string;
  ndaSub: string;
  capacityBadge: string;
  capacitySub: string;
}

export interface HeroSection {
  badgeText: string;
  headingPrefix: string;
  headingGradient: string;
  subheading: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  trustPill1Title: string;
  trustPill1Sub: string;
  trustPill2Title: string;
  trustPill2Sub: string;
  trustPill3Title: string;
  trustPill3Sub: string;
  featuredBeforeImage: string;
  featuredAfterImage: string;
  featuredTitle: string;
  featuredBadge: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
}

export interface SecuritySection {
  badge: string;
  heading: string;
  description: string;
  bulletPoints: string[];
  cardTitle: string;
  cardSubtitle: string;
  cardMetrics: { label: string; value: string }[];
}

export interface CtaBanner {
  heading: string;
  description: string;
  quoteBtnText: string;
  trialBtnText: string;
}

export interface ServiceSampleItem {
  id: string;
  categoryTitle: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  beforeImage: string;
  afterImage: string;
  turnaroundHours: number;
  startingPrice?: string;
  features: string[];
  deliverables?: string[];
  idealFor?: string[];
  faqs?: { q: string; a: string }[];
  metaTitle: string;
  metaDesc: string;
  samples?: ServiceSampleItem[];
  technicalWorkflow?: { step: number; title: string; desc: string }[];
  industryUseCases?: string[];
  qualityAssuranceChecklist?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  serviceSlug: string;
  industrySlug: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  technique: string;
  volume: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface IndustryItem {
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  heroImage: string;
  challenges: { problem: string; solution: string }[];
  keyBenefits: string[];
  complianceStandards?: string[];
  recommendedServices: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface MediaItem {
  url: string;
  name: string;
  size: string;
  uploadedAt: string;
}

export interface SiteContent {
  global: GlobalConfig;
  hero: HeroSection;
  stats: StatItem[];
  servicesSection: {
    badge: string;
    heading: string;
    description: string;
    services: ServiceItem[];
  };
  portfolioSection: {
    badge: string;
    heading: string;
    description: string;
    items: PortfolioItem[];
  };
  industriesSection: {
    badge: string;
    heading: string;
    description: string;
    industries: IndustryItem[];
  };
  howItWorks: {
    badge: string;
    heading: string;
    description: string;
    steps: HowItWorksStep[];
  };
  securitySection: SecuritySection;
  ctaBanner: CtaBanner;
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  mediaGallery: MediaItem[];
}

const DATA_DIR = path.resolve(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const BACKUP_FILE = path.join(DATA_DIR, "site-content.backup.json");

/**
 * Read site content from persistent storage with fallback
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.hero && parsed.global) {
        return parsed as SiteContent;
      }
    }
  } catch (err) {
    console.error("Error reading site content store:", err);
  }

  // Fallback defaults in case file is absent or corrupted
  return getDefaultSiteContent();
}

/**
 * Save updated site content to persistent storage atomically with backup
 */
export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Create backup if main exists
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      fs.copyFileSync(CONTENT_FILE, BACKUP_FILE);
    }
  } catch (backupErr) {
    console.warn("Could not create content backup:", backupErr);
  }

  // Atomic write via temp file
  const tempPath = `${CONTENT_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, JSON.stringify(content, null, 2), "utf-8");
  fs.renameSync(tempPath, CONTENT_FILE);

  return content;
}

/**
 * Patch partial section in site content
 */
export async function updateSiteContentSection<K extends keyof SiteContent>(
  section: K,
  data: SiteContent[K]
): Promise<SiteContent> {
  const current = await getSiteContent();
  current[section] = data;
  return saveSiteContent(current);
}

/**
 * Add or update an image to the media gallery
 */
export async function registerMediaItem(item: MediaItem): Promise<SiteContent> {
  const current = await getSiteContent();
  if (!current.mediaGallery) {
    current.mediaGallery = [];
  }
  // Check if url already exists
  const existingIndex = current.mediaGallery.findIndex((m) => m.url === item.url);
  if (existingIndex >= 0) {
    current.mediaGallery[existingIndex] = item;
  } else {
    current.mediaGallery.unshift(item);
  }
  return saveSiteContent(current);
}

/**
 * Quick helper getters for individual sections
 */
export async function getDynamicServices(): Promise<ServiceItem[]> {
  const content = await getSiteContent();
  return content.servicesSection?.services || [];
}

export async function getDynamicServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
  const services = await getDynamicServices();
  return services.find((s) => s.slug === slug);
}

export async function getDynamicPortfolio(): Promise<PortfolioItem[]> {
  const content = await getSiteContent();
  return content.portfolioSection?.items || [];
}

export async function getDynamicFaqs(): Promise<FaqItem[]> {
  const content = await getSiteContent();
  return content.faqs || [];
}

export async function getDynamicIndustries(): Promise<IndustryItem[]> {
  const content = await getSiteContent();
  return content.industriesSection?.industries || [];
}

export async function getDynamicGlobal(): Promise<GlobalConfig> {
  const content = await getSiteContent();
  return content.global;
}

export function getDefaultSiteContent(): SiteContent {
  return {
    global: {
      brandName: "Foryourgoal",
      tagline: "Enterprise Image Post-Production & B2B Creative Studio",
      supportEmail: "support@foryourgoal.com",
      contactPhone: "+1 (555) 019-2834",
      address: "Global Production Hub & 24/7 Virtual Operations",
      companyBio: "Foryourgoal is an international B2B image editing and high-end photo retouching studio. We partner with e-commerce retailers, global brands, product photographers, and creative agencies to deliver flawless visual assets with guaranteed turnaround.",
      turnaroundBadge: "6 to 24h Turnaround",
      turnaroundSub: "Strict SLA delivery guarantee",
      craftBadge: "100% Hand-Crafted",
      craftSub: "Pixel-perfect pen paths",
      ndaBadge: "Strict NDA & Privacy",
      ndaSub: "Your images are never shared",
      capacityBadge: "5,000+ Daily Capacity",
      capacitySub: "Enterprise volume scalability",
    },
    hero: {
      badgeText: "Enterprise Grade Image Post-Production",
      headingPrefix: "Professional Image Editing for",
      headingGradient: "E-commerce, Brands & Photographers",
      subheading: "From pixel-precise clipping paths to high-end beauty and product retouching, Foryourgoal helps international studios and e-commerce leaders deliver consistent, catalog-ready visuals at enterprise scale.",
      primaryCtaText: "Request a Free Trial",
      primaryCtaLink: "/request-free-trial",
      secondaryCtaText: "Explore Client Work",
      secondaryCtaLink: "/portfolio",
      trustPill1Title: "4-Hour / 24-Hour",
      trustPill1Sub: "Rapid Turnaround",
      trustPill2Title: "Strict NDA",
      trustPill2Sub: "100% Confidential",
      trustPill3Title: "3-Tier QC",
      trustPill3Sub: "Zero Defect Policy",
      featuredBeforeImage: "/images/portfolio/jewelry-retouch-before.jpg",
      featuredAfterImage: "/images/portfolio/jewelry-retouch-after.jpg",
      featuredTitle: "Jewelry Glare Removal & Stone Enhancement",
      featuredBadge: "100% Handcrafted",
    },
    stats: [
      { value: "5,000+", label: "Daily Processing Capacity" },
      { value: "99.8%", label: "First-Pass Acceptance Rate" },
      { value: "< 4 Hours", label: "Express Turnaround Available" },
      { value: "100%", label: "Hand-Crafted Vector Precision" },
    ],
    servicesSection: {
      badge: "Specialized Capabilities",
      heading: "Commercial Image Editing Services",
      description: "Engineered for high-volume retailers, e-commerce managers, and commercial studios needing consistent studio-grade precision.",
      services: [],
    },
    portfolioSection: {
      badge: "Verified Client Work",
      heading: "Before & After Transformation Gallery",
      description: "Drag the slider on each showcase to inspect our pixel-level precision, hand-drawn vector paths, and micro-texture preservation.",
      items: [],
    },
    industriesSection: {
      badge: "B2B Market Sectors",
      heading: "Built for High-Growth Industries",
      description: "Each vertical has unique marketplace guidelines, lighting physics, and compliance requirements.",
      industries: [],
    },
    howItWorks: {
      badge: "Seamless Outsourcing",
      heading: "How The Foryourgoal Pipeline Works",
      description: "A frictionless, predictable workflow designed to scale with your seasonal surges.",
      steps: [
        {
          step: "01",
          title: "Upload & Quote",
          desc: "Send your test batch or request a volume quotation. Receive transparent pricing within 45 minutes.",
        },
        {
          step: "02",
          title: "Free Trial Sample",
          desc: "We process 2 of your complex images free of charge so you can benchmark our craft and delivery velocity.",
        },
        {
          step: "03",
          title: "Volume Production",
          desc: "Your dedicated production line isolates paths, balances shadows, and color-grades to exact brand specs.",
        },
        {
          step: "04",
          title: "3-Tier QC & Delivery",
          desc: "Senior art directors inspect 100% of outputs against strict tolerances before batch delivery via secure FTP.",
        },
      ],
    },
    securitySection: {
      badge: "Data Protection & Compliance",
      heading: "Your Unreleased Product Visuals Stay 100% Secure",
      description: "We work with unreleased fashion collections, patent-pending consumer hardware, and embargoed campaign imagery. Your IP security is built into our operational contracts.",
      bulletPoints: [
        "Custom Non-Disclosure Agreements (NDAs) signed before file transfer",
        "Air-gapped production servers and restricted USB/external drive access",
        "End-to-end TLS 1.3 encrypted file transfers and biometric facility access",
        "Strict data purge policy: files deleted 30 days after project approval",
      ],
      cardTitle: "Enterprise Security SLA",
      cardSubtitle: "ISO 27001 Aligned Workflows",
      cardMetrics: [
        { label: "IP Protection", value: "Strict NDA" },
        { label: "File Retention", value: "30-Day Auto Purge" },
        { label: "Encryption", value: "AES-256 at Rest" },
        { label: "Uptime SLA", value: "99.9% Uptime" },
      ],
    },
    ctaBanner: {
      heading: "Ready to Streamline Your Post-Production Workflow?",
      description: "Get started with 2 free sample images or an instant enterprise volume quotation. No minimum commitments, 100% confidential.",
      quoteBtnText: "Instant Enterprise Quote",
      trialBtnText: "Request Free Trial (2 Images)",
    },
    faqs: [],
    testimonials: [
      {
        id: "test-1",
        name: "Marcus Vance",
        role: "Head of Creative Ops",
        company: "LuxGroup Europe",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        content: "Foryourgoal cut our product catalog production time by 60%. Their clipping path accuracy on jewelry and eyewear is unmatched.",
        rating: 5,
      },
      {
        id: "test-2",
        name: "Elena Rostova",
        role: "E-Commerce Director",
        company: "Nordic Apparel",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        content: "During Q4 peak, we handed them 3,000 apparel SKUs weekly. Flawless ghost mannequin execution with zero re-shoots or missed SLAs.",
        rating: 5,
      },
      {
        id: "test-3",
        name: "David Chen",
        role: "Senior Art Producer",
        company: "Horizon Studios",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        content: "Their strict NDA enforcement and dedicated secure FTP made onboarding effortless for our client's unreleased fashion collection.",
        rating: 5,
      },
    ],
    mediaGallery: [],
  };
}
