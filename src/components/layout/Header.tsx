"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Scissors,
  Layers,
  Shirt,
  Gem,
  SunMedium,
  Palette,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

const servicesList = [
  {
    title: "Clipping Path",
    href: "/services/clipping-path",
    desc: "100% hand-drawn vector paths with razor-sharp edges.",
    icon: Scissors,
  },
  {
    title: "Product Photo Retouching",
    href: "/services/product-photo-retouching",
    desc: "Dust, scratch removal, surface smoothing & texture preservation.",
    icon: Sparkles,
  },
  {
    title: "Ghost Mannequin & Neck Joint",
    href: "/services/ghost-mannequin",
    desc: "3D hollow effect for apparel, inner neck joint & symmetry.",
    icon: Shirt,
  },
  {
    title: "Jewelry Retouching",
    href: "/services/jewelry-retouching",
    desc: "Luxury stone sparkle, metal polish, reflection balancing.",
    icon: Gem,
  },
  {
    title: "Background Removal",
    href: "/services/background-removal",
    desc: "Pure white Amazon/Shopify background, transparent PNG.",
    icon: Layers,
  },
  {
    title: "Shadow & Reflection Creation",
    href: "/services/shadow-reflection",
    desc: "Natural drop shadows, floating reflections & soft casting.",
    icon: SunMedium,
  },
  {
    title: "Color Correction & Recolor",
    href: "/services/color-correction",
    desc: "Precise pantone color matching, multi-color SKUs.",
    icon: Palette,
  },
  {
    title: "Image Masking",
    href: "/services/image-masking",
    desc: "Alpha channel & hair/fur extraction for complex edges.",
    icon: Scissors,
  },
];

const industriesList = [
  { title: "E-Commerce & Marketplaces", href: "/industries/ecommerce-marketplaces", tag: "Amazon / Shopify" },
  { title: "Fashion & Apparel", href: "/industries/fashion-apparel", tag: "Lookbooks & Catalogs" },
  { title: "Jewelry & Luxury Goods", href: "/industries/jewelry-luxury", tag: "High-End Macro" },
  { title: "Photographers & Studios", href: "/industries/photographers-studios", tag: "Batch Outsourcing" },
  { title: "Advertising Agencies", href: "/industries/advertising-agencies", tag: "Campaign Assets" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#101321]/90 backdrop-blur-md border-b border-[#2A3150]/80 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo showTagline={!isScrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/services") ? "text-[#D6FF70]" : "text-slate-200 hover:text-white"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 w-[580px] -mt-1 pt-2 z-50">
                  <div className="p-4 rounded-2xl bg-[#141829] border border-[#2A3150] shadow-2xl grid grid-cols-2 gap-2 backdrop-blur-xl">
                    {servicesList.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#1E243D] transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-[#101321] border border-[#2A3150] group-hover:border-[#745CFF] group-hover:text-[#D6FF70] text-[#745CFF] transition-colors shrink-0">
                          <svc.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#D6FF70] transition-colors flex items-center gap-1">
                            {svc.title}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">{svc.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 mt-2 pt-2 border-t border-[#2A3150] flex items-center justify-between text-xs text-slate-400 px-2">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <Zap className="w-3.5 h-3.5" /> 24/7 Global Turnaround Guaranteed
                      </span>
                      <Link href="/services" className="text-[#D6FF70] hover:underline flex items-center gap-1 font-semibold">
                        View All Services <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/industries") ? "text-[#D6FF70]" : "text-slate-200 hover:text-white"
                }`}
                aria-expanded={industriesOpen}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`} />
              </button>

              {industriesOpen && (
                <div className="absolute top-full left-0 w-80 -mt-1 pt-2 z-50">
                  <div className="p-3 rounded-2xl bg-[#141829] border border-[#2A3150] shadow-2xl space-y-1 backdrop-blur-xl">
                    {industriesList.map((ind) => (
                      <Link
                        key={ind.href}
                        href={ind.href}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1E243D] transition-colors group"
                      >
                        <span className="text-sm font-medium text-slate-200 group-hover:text-[#D6FF70] transition-colors">
                          {ind.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#101321] text-slate-400 border border-[#2A3150]">
                          {ind.tag}
                        </span>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-[#2A3150] px-2">
                      <Link href="/industries" className="text-xs text-[#D6FF70] hover:underline flex items-center gap-1 font-semibold">
                        Explore All Industries <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/how-it-works"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/how-it-works" ? "text-[#D6FF70]" : "text-slate-200 hover:text-white"
              }`}
            >
              How It Works
            </Link>

            <Link
              href="/portfolio"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/portfolio") ? "text-[#D6FF70]" : "text-slate-200 hover:text-white"
              }`}
            >
              Portfolio
            </Link>

            <Link
              href="/pricing"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/pricing" ? "text-[#D6FF70]" : "text-slate-200 hover:text-white"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-[#D6FF70]" : "text-slate-200 hover:text-white"
              }`}
            >
              About
            </Link>

            <Link
              href="/blog"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/blog") ? "text-[#D6FF70]" : "text-slate-200 hover:text-white"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-[#D6FF70]" : "text-slate-200 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/request-a-quote?type=sample"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-[#181C2E] border border-[#2A3150] hover:border-[#745CFF] transition-all"
            >
              Free Trial
            </Link>
            <Link
              href="/request-a-quote"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#101321] bg-gradient-to-r from-[#D6FF70] to-[#bbf738] hover:shadow-[0_0_25px_rgba(214,255,112,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/request-a-quote"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#101321] bg-[#D6FF70]"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 hover:text-white bg-[#181C2E] border border-[#2A3150]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#101321] border-t border-[#2A3150] p-6 overflow-y-auto z-40">
          <div className="flex flex-col space-y-4">
            <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider">Services</div>
            <div className="grid grid-cols-1 gap-2 pl-2">
              {servicesList.slice(0, 6).map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="flex items-center gap-2 text-sm text-slate-200 hover:text-[#D6FF70] py-1.5"
                >
                  <svc.icon className="w-4 h-4 text-[#745CFF]" />
                  <span>{svc.title}</span>
                </Link>
              ))}
              <Link href="/services" className="text-xs text-[#D6FF70] font-semibold py-1">
                + View all 10+ services
              </Link>
            </div>

            <div className="pt-2 border-t border-[#2A3150]">
              <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">Navigation</div>
              <div className="flex flex-col space-y-3 pl-2">
                <Link href="/industries" className="text-sm font-medium text-slate-200 hover:text-white">
                  Industries
                </Link>
                <Link href="/how-it-works" className="text-sm font-medium text-slate-200 hover:text-white">
                  How It Works
                </Link>
                <Link href="/portfolio" className="text-sm font-medium text-slate-200 hover:text-white">
                  Portfolio Gallery
                </Link>
                <Link href="/pricing" className="text-sm font-medium text-slate-200 hover:text-white">
                  Pricing & Volume Calculator
                </Link>
                <Link href="/about" className="text-sm font-medium text-slate-200 hover:text-white">
                  About Our Studio
                </Link>
                <Link href="/blog" className="text-sm font-medium text-slate-200 hover:text-white">
                  Blog & Guides
                </Link>
                <Link href="/faq" className="text-sm font-medium text-slate-200 hover:text-white">
                  FAQ
                </Link>
                <Link href="/contact" className="text-sm font-medium text-slate-200 hover:text-white">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A3150] flex flex-col gap-3">
              <Link
                href="/request-a-quote?type=sample"
                className="w-full text-center py-3 rounded-xl text-sm font-semibold bg-[#181C2E] border border-[#2A3150] text-slate-200"
              >
                Free 2-Image Sample Trial
              </Link>
              <Link
                href="/request-a-quote"
                className="w-full text-center py-3 rounded-xl text-sm font-bold bg-[#D6FF70] text-[#101321]"
              >
                Request an Instant Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
