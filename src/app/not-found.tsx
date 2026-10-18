import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-brand-navy-card border border-brand-border max-w-lg w-full">
        <span className="text-6xl font-extrabold font-mono text-brand-lime">404</span>
        <h1 className="text-2xl font-bold text-brand-ivory mt-4">Page Not Found</h1>
        <p className="mt-2 text-xs sm:text-sm text-brand-ivory/70 leading-relaxed">
          The requested page could not be located or may have been relocated.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-violet text-white text-xs font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy text-brand-ivory text-xs border border-brand-border hover:border-brand-ivory/30 transition-all text-center"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
