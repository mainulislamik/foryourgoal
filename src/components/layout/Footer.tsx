import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ShieldCheck, Lock, Clock, CheckCircle2, Mail, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Top Feature Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-12 border-b border-slate-200">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">6 to 24h Turnaround</div>
              <div className="text-xs text-slate-500">Strict SLA delivery guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">100% Hand-Crafted</div>
              <div className="text-xs text-slate-500">Pixel-perfect pen paths</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Strict NDA & Privacy</div>
              <div className="text-xs text-slate-500">Your images are never shared</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">5,000+ Daily Capacity</div>
              <div className="text-xs text-slate-500">Enterprise volume scalability</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showTagline={true} />
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Foryourgoal is an international B2B image editing and high-end photo retouching studio. We partner with e-commerce retailers, global brands, product photographers, and creative agencies to deliver flawless visual assets with guaranteed turnaround.
            </p>
            <div className="flex flex-col space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                <a href="mailto:support@foryourgoal.com" className="hover:text-indigo-600 transition-colors font-medium">
                  support@foryourgoal.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Global Production Hub & 24/7 Virtual Operations</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Core Services</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/clipping-path" className="hover:text-indigo-600 transition-colors">
                  Clipping Path
                </Link>
              </li>
              <li>
                <Link href="/services/background-removal" className="hover:text-indigo-600 transition-colors">
                  Background Removal
                </Link>
              </li>
              <li>
                <Link href="/services/product-photo-retouching" className="hover:text-indigo-600 transition-colors">
                  Product Photo Retouching
                </Link>
              </li>
              <li>
                <Link href="/services/ghost-mannequin" className="hover:text-indigo-600 transition-colors">
                  Ghost Mannequin
                </Link>
              </li>
              <li>
                <Link href="/services/jewelry-retouching" className="hover:text-indigo-600 transition-colors">
                  Jewelry Retouching
                </Link>
              </li>
              <li>
                <Link href="/services/shadow-reflection" className="hover:text-indigo-600 transition-colors">
                  Shadows & Reflections
                </Link>
              </li>
              <li>
                <Link href="/services/color-correction" className="hover:text-indigo-600 transition-colors">
                  Color Correction
                </Link>
              </li>
              <li>
                <Link href="/services/image-masking" className="hover:text-indigo-600 transition-colors">
                  Image Masking
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Industries</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/industries/ecommerce-marketplaces" className="hover:text-indigo-600 transition-colors">
                  E-Commerce Marketplaces
                </Link>
              </li>
              <li>
                <Link href="/industries/fashion-apparel" className="hover:text-indigo-600 transition-colors">
                  Fashion & Apparel
                </Link>
              </li>
              <li>
                <Link href="/industries/jewelry-luxury" className="hover:text-indigo-600 transition-colors">
                  Jewelry & Luxury Goods
                </Link>
              </li>
              <li>
                <Link href="/industries/photographers-studios" className="hover:text-indigo-600 transition-colors">
                  Photographers & Studios
                </Link>
              </li>
              <li>
                <Link href="/industries/advertising-agencies" className="hover:text-indigo-600 transition-colors">
                  Advertising Agencies
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-indigo-600 transition-colors font-medium">
                  Client Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">Studio & Trust</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="hover:text-indigo-600 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
                  Pricing Matrix
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-indigo-600 transition-colors">
                  Insights & Guides
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-indigo-600 transition-colors">
                  Careers & Hiring
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-indigo-600 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">
                  Privacy Policy & NDA
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                  Terms of Service & SLA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Foryourgoal. All rights reserved. Professional Image Editing & Retouching Outsourcing.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-700 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/request-a-quote" className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
              Request a Quote <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
