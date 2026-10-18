"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime client error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-brand-navy-card border border-brand-border max-w-lg w-full">
        <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-brand-ivory">Something went wrong</h1>
        <p className="mt-2 text-xs sm:text-sm text-brand-ivory/70 leading-relaxed">
          An unexpected error occurred while rendering this view.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-violet text-white text-xs font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy text-brand-ivory text-xs border border-brand-border hover:border-brand-ivory/30 transition-all text-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
