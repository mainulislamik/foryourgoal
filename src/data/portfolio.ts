export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  industry: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  turnaroundTime: string;
  turnaroundHours?: number;
  techniquesUsed: string[];
  specs?: string[];
  volume: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "port-1",
    slug: "luxury-chronograph-watch-retouch",
    title: "Luxury Chronograph Watch Macro Retouching",
    category: "product-photo-retouching",
    industry: "jewelry-luxury",
    beforeImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80&contrast=1.15&brightness=1.05",
    description: "High-end horology retouching removing fine micro-dust particles from sapphire crystal, evening dial reflections, and accentuating brushed steel bezel contrast.",
    turnaroundTime: "12 Hours",
    techniquesUsed: ["Micro-Dust Removal", "Bezel Metal Polish", "Hand-Drawn Clipping Path", "Dial Reflection Neutralization"],
    volume: "24 SKUs",
  },
  {
    id: "port-2",
    slug: "designer-sneaker-clipping-shadow",
    title: "Designer Athletic Sneaker Clipping & Cast Shadow",
    category: "clipping-path",
    industry: "ecommerce-marketplaces",
    beforeImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80&sat=-100",
    description: "Complex multi-layer pen path extraction around textured knit mesh, lacing system, and tread with natural drop shadow for Amazon A+ catalog.",
    turnaroundTime: "6 Hours",
    techniquesUsed: ["Vector Pen Tool Path", "Knit Mesh Edge Refinement", "Custom Organic Drop Shadow", "Pure White Background (#FFFFFF)"],
    volume: "150 Images",
  },
  {
    id: "port-3",
    slug: "cashmere-overcoat-ghost-mannequin",
    title: "Cashmere Overcoat 3D Ghost Mannequin",
    category: "ghost-mannequin",
    industry: "fashion-apparel",
    beforeImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80&sat=120",
    description: "Combined exterior jacket photo with separate inner satin lining and neck brand label to yield an organic 3D floating lookbook asset.",
    turnaroundTime: "12 Hours",
    techniquesUsed: ["Inner Neck Joint Alignment", "Symmetry Balancing", "Wrinkle & Crease Softening", "Fabric Depth Shading"],
    volume: "80 SKUs",
  },
  {
    id: "port-4",
    slug: "solitaire-diamond-ring-enhancement",
    title: "Solitaire Diamond Ring Facet Brilliance",
    category: "jewelry-retouching",
    industry: "jewelry-luxury",
    beforeImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80&contrast=1.2",
    description: "Eliminated camera reflection on white gold band, polished platinum prongs, and boosted diamond fire dispersion for luxury e-commerce carousel.",
    turnaroundTime: "24 Hours",
    techniquesUsed: ["Prong Polish", "Diamond Facet Scintillation Tuning", "Reflection Cleanout", "Focus Stacking Composite"],
    volume: "15 Pieces",
  },
  {
    id: "port-5",
    slug: "cosmetics-perfume-bottle-reflections",
    title: "Artisan Perfume Bottle Glass & Liquid Retouch",
    category: "product-photo-retouching",
    industry: "advertising-agencies",
    beforeImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80&contrast=1.1&brightness=1.05",
    description: "Preserved glass transparency, aligned embossed foil typography, corrected liquid color density, and created a sleek mirror reflection.",
    turnaroundTime: "12 Hours",
    techniquesUsed: ["Glass Transparency Masking", "Gold Foil Texture Realignment", "Mirror Surface Reflection", "Color Grading"],
    volume: "35 Assets",
  },
  {
    id: "port-6",
    slug: "winter-parka-fur-hood-masking",
    title: "Winter Parka Faux Fur Hood Masking",
    category: "image-masking",
    industry: "fashion-apparel",
    beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80&sat=-100",
    description: "Extracted intricate individual strands of faux fur around parka hood using channel separation masking without fringing or color bleeding.",
    turnaroundTime: "12 Hours",
    techniquesUsed: ["Luminosity Channel Masking", "Fine Hair Strand Recovery", "Color Decontamination", "Edge Density Tuning"],
    volume: "45 SKUs",
  },
];

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return portfolioData.find((p) => p.slug === slug);
}
