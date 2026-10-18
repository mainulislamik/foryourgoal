import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-white">
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 max-w-lg w-full shadow-sm">
        <span className="text-6xl font-extrabold font-mono text-indigo-600">404</span>
        <h1 className="text-2xl font-bold text-slate-900 mt-4">Page Not Found</h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          The requested page could not be located or may have been relocated.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-slate-700 text-xs border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all text-center font-medium"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
