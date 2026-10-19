"use client";

import React, { useState, useEffect, useRef } from "react";
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

  const servicesRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

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

  // Click outside listener to reliably close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setServicesOpen(false);
      }
      if (industriesRef.current && !industriesRef.current.contains(target)) {
        setIndustriesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setIndustriesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3"
          : "bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo showTagline={!isScrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-indigo-600 font-semibold bg-indigo-50/60"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setServicesOpen((prev) => !prev);
                  setIndustriesOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  servicesOpen || pathname.startsWith("/services")
                    ? "text-indigo-600 font-semibold bg-indigo-50/60"
                    : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-indigo-600" : "text-slate-400"
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              {servicesOpen && (
                <div className="absolute top-full left-0 w-[620px] pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl ring-1 ring-black/5">
                    <div className="grid grid-cols-2 gap-2">
                      {servicesList.map((svc) => (
                        <Link
                          key={svc.href}
                          href={svc.href}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-indigo-50/50 border border-transparent hover:border-indigo-100 transition-all group"
                        >
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-700 transition-colors shrink-0">
                            <svc.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                              {svc.title}
                            </div>
                            <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{svc.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2 bg-slate-50/60 -mx-4 -mb-4 p-3 rounded-b-2xl">
                      <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                        <Zap className="w-3.5 h-3.5" /> 24/7 Global Turnaround Guaranteed
                      </span>
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-bold group"
                      >
                        <span>View All 8 Services</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              ref={industriesRef}
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setIndustriesOpen((prev) => !prev);
                  setServicesOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  industriesOpen || pathname.startsWith("/industries")
                    ? "text-indigo-600 font-semibold bg-indigo-50/60"
                    : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
                }`}
                aria-expanded={industriesOpen}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    industriesOpen ? "rotate-180 text-indigo-600" : "text-slate-400"
                  }`}
                />
              </button>

              {industriesOpen && (
                <div className="absolute top-full left-0 w-84 pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xl ring-1 ring-black/5 space-y-1">
                    {industriesList.map((ind) => (
                      <Link
                        key={ind.href}
                        href={ind.href}
                        onClick={() => setIndustriesOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/50 border border-transparent hover:border-indigo-100 transition-all group"
                      >
                        <span className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {ind.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          {ind.tag}
                        </span>
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-slate-100 px-2 mt-2">
                      <Link
                        href="/industries"
                        onClick={() => setIndustriesOpen(false)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-semibold group"
                      >
                        <span>Explore All Industries</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/how-it-works"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/how-it-works" ? "text-indigo-600 font-semibold" : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              How It Works
            </Link>

            <Link
              href="/portfolio"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/portfolio") ? "text-indigo-600 font-semibold" : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Portfolio
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-indigo-600 font-semibold" : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              About
            </Link>

            <Link
              href="/blog"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/blog") ? "text-indigo-600 font-semibold" : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-indigo-600 font-semibold" : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/request-a-quote?type=sample"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all shadow-sm"
            >
              Free Trial
            </Link>
            <Link
              href="/request-a-quote"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/request-a-quote"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-300"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white border-t border-slate-200 p-6 overflow-y-auto z-40 shadow-xl">
          <div className="flex flex-col space-y-4">
            <div className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Services</div>
            <div className="grid grid-cols-1 gap-2 pl-2">
              {servicesList.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm text-slate-800 hover:text-indigo-600 py-1.5"
                >
                  <svc.icon className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{svc.title}</span>
                </Link>
              ))}
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-indigo-600 font-bold py-1 flex items-center gap-1"
              >
                <span>View all services</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-2">Navigation</div>
              <div className="flex flex-col space-y-3 pl-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/" ? "text-indigo-600 font-semibold" : "text-slate-700 hover:text-indigo-600"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/industries"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  Industries
                </Link>
                <Link
                  href="/how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  How It Works
                </Link>
                <Link
                  href="/portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  Portfolio Gallery
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  About Our Studio
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  Blog & Guides
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <Link
                href="/request-a-quote?type=sample"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl text-sm font-semibold bg-slate-50 border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Free 2-Image Sample Trial
              </Link>
              <Link
                href="/request-a-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800"
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
