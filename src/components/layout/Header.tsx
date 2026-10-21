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
  Mail,
  MessageSquare,
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const pathname = usePathname();

  const servicesRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  if (pathname?.startsWith("/imon")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Inner navbar — backdrop-blur lives here so it doesn't create a containing block for the drawer */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3"
            : "bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100"
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
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group hover:scale-[1.03] ${
                  pathname === "/"
                    ? "text-blue-600 font-semibold bg-blue-50/60"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                Home
                <span className={`absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-indigo-600 transition-transform duration-200 origin-left ${ pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100" }`} />
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
                      ? "text-blue-600 font-semibold bg-blue-50/60"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                <div className={`absolute top-full left-0 w-[620px] pt-2 z-50 transition-all duration-200 ease-out transform ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl ring-1 ring-black/5">
                      <div className="grid grid-cols-2 gap-2">
                        {servicesList.map((svc) => (
                          <Link
                            key={svc.href}
                            href={svc.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
                          >
                            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-700 transition-colors shrink-0">
                              <svc.icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
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
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-bold group"
                        >
                          <span>View All 8 Services</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
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
                      ? "text-blue-600 font-semibold bg-blue-50/60"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                  aria-expanded={industriesOpen}
                  aria-haspopup="true"
                >
                  <span>Industries</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      industriesOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                <div className={`absolute top-full left-0 w-84 pt-2 z-50 transition-all duration-200 ease-out transform ${industriesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xl ring-1 ring-black/5 space-y-1">
                      {industriesList.map((ind) => (
                        <Link
                          key={ind.href}
                          href={ind.href}
                          onClick={() => setIndustriesOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
                        >
                          <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                            {ind.title}
                          </span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            {ind.tag}
                          </span>
                        </Link>
                      ))}
                      <div className="pt-2 border-t border-slate-100 px-2 mt-2">
                        <Link
                          href="/industries"
                          onClick={() => setIndustriesOpen(false)}
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold group"
                        >
                          <span>Explore All Industries</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
              </div>

              <Link
                href="/how-it-works"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group hover:scale-[1.03] ${
                  pathname === "/how-it-works" ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                How It Works
                <span className={`absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-indigo-600 transition-transform duration-200 origin-left ${ pathname === "/how-it-works" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100" }`} />
              </Link>

              <Link
                href="/portfolio"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group hover:scale-[1.03] ${
                  pathname.startsWith("/portfolio") ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                Portfolio
                <span className={`absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-indigo-600 transition-transform duration-200 origin-left ${ pathname.startsWith("/portfolio") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100" }`} />
              </Link>

              <Link
                href="/about"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group hover:scale-[1.03] ${
                  pathname === "/about" ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                About
                <span className={`absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-indigo-600 transition-transform duration-200 origin-left ${ pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100" }`} />
              </Link>

              <Link
                href="/blog"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group hover:scale-[1.03] ${
                  pathname.startsWith("/blog") ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                Blog
                <span className={`absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-indigo-600 transition-transform duration-200 origin-left ${ pathname.startsWith("/blog") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100" }`} />
              </Link>

              <Link
                href="/contact"
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group hover:scale-[1.03] ${
                  pathname === "/contact" ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                Contact
                <span className={`absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-indigo-600 transition-transform duration-200 origin-left ${ pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100" }`} />
              </Link>
            </nav>

            {/* Desktop CTA Action Button */}
            <div className="hidden lg:flex items-center">
              {pathname === "/request-a-quote" || pathname === "/request-free-trial" ? (
                <Link
                  href="/contact"
                  className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all duration-200"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>
              ) : (
                <Link
                  href="/request-a-quote?type=sample"
                  className="btn-shimmer relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/35 transition-all transform hover:scale-105 active:scale-95 duration-200"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <span>Request Free Trial</span>
                  <ArrowRight className="w-4 h-4 text-white/90" />
                </Link>
              )}
            </div>

            {/* Mobile Header Actions */}
            <div className="lg:hidden flex items-center gap-2">
              {!mobileMenuOpen && (
                pathname === "/request-a-quote" || pathname === "/request-free-trial" ? (
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 text-xs rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-sm"
                  >
                    Contact
                  </Link>
                ) : (
                  <Link
                    href="/request-a-quote?type=sample"
                    className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-xs rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm"
                  >
                    Free Trial
                  </Link>
                )
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-300"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer — fixed to viewport, outside backdrop-blur container */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] bottom-0 bg-white border-t border-slate-200 z-50 shadow-2xl flex flex-col">
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6">

            {/* Services Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-2"
                aria-expanded={mobileServicesOpen}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Services</span>
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">8 Services</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="pt-2 pb-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {servicesList.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-800 hover:text-blue-700 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0">
                          <svc.icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium leading-tight">{svc.title}</span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-blue-600 font-bold mt-3 flex items-center gap-1 hover:text-blue-700"
                  >
                    <span>View all services</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>

            {/* Industries Accordion */}
            <div className="border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setMobileIndustriesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-2"
                aria-expanded={mobileIndustriesOpen}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Industries</span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">5 Industries</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileIndustriesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileIndustriesOpen && (
                <div className="flex flex-col gap-1.5 pt-2 pb-2">
                  {industriesList.map((ind) => (
                    <Link
                      key={ind.href}
                      href={ind.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-800 hover:text-blue-700 transition-all"
                    >
                      <span className="text-sm font-medium">{ind.title}</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 shrink-0 ml-2">
                        {ind.tag}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-blue-600 font-bold mt-1 flex items-center gap-1 hover:text-blue-700"
                  >
                    <span>Explore all industries</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Navigation */}
            <div className="border-t border-slate-200 pt-3 pb-8">
              <div className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-3">Quick Navigation</div>
              <div className="flex flex-col gap-1">
                {[
                  { href: "/", label: "Home", active: pathname === "/" },
                  { href: "/how-it-works", label: "How It Works", active: pathname === "/how-it-works" },
                  { href: "/portfolio", label: "Portfolio Gallery", active: pathname.startsWith("/portfolio") },
                  { href: "/about", label: "About Our Studio", active: pathname === "/about" },
                  { href: "/blog", label: "Blog & Guides", active: pathname.startsWith("/blog") },
                  { href: "/faq", label: "FAQ", active: pathname === "/faq" },
                  { href: "/contact", label: "Contact Us", active: pathname === "/contact" },
                ].map(({ href, label, active }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />}
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky bottom CTA & contact */}
          <div className="shrink-0 p-4 border-t border-slate-200 bg-white/95 backdrop-blur-sm shadow-[0_-4px_12px_rgba(0,0,0,0.05)] space-y-2.5">
            <Link
              href="/request-a-quote?type=sample"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-shimmer w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl text-center shadow-md shadow-red-600/25 transition-all"
            >
              <span>Request a Free Trial (5 Free Images)</span>
              <ArrowRight className="w-4 h-4 text-white/90 shrink-0" />
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="mailto:info@foryourgoal.com"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Email Us</span>
              </a>
              <a
                href="https://wa.me/8801711000000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
