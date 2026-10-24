"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: "inline" | "floating" | "bottom";
}

export function SocialShare({
  url,
  title,
  description = "",
  className = "",
  variant = "inline",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
      label: "LinkedIn",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.55a1.62 1.62 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black",
      label: "X",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      label: "Facebook",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
      label: "WhatsApp",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.9 2.41 1.02 2.58.13.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
        </svg>
      ),
    },
  ];

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  // Floating Variant (Desktop Vertical Sticky Strip)
  if (variant === "floating") {
    return (
      <div className={`hidden xl:flex flex-col items-center gap-2.5 p-2 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg backdrop-blur-md ${className}`}>
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest py-1 border-b border-slate-100 dark:border-slate-800">
          Share
        </div>

        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${item.name}`}
            aria-label={`Share on ${item.name}`}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 bg-slate-50 border border-slate-200 shadow-2xs transition-all duration-200 hover:scale-110 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 ${item.color}`}
          >
            {item.icon}
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopyLink}
          title={copied ? "Link Copied!" : "Copy Guide Link"}
          aria-label="Copy Guide Link"
          className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-2xs transition-all duration-200 hover:scale-110 ${
            copied
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
          }`}
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  // Bottom Variant (Large Full-Width Box)
  if (variant === "bottom") {
    return (
      <div className={`p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-900/60 dark:border-slate-800 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-400 flex items-center justify-center shadow-xs">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Share this guide</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Found this helpful? Share with your e-commerce & photo production network.</div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {shareLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Share on ${item.name}`}
                aria-label={`Share on ${item.name}`}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 ${item.color}`}
              >
                {item.icon}
                <span className="hidden xs:inline">{item.label}</span>
              </a>
            ))}

            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy guide link"
              aria-label="Copy guide link"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border shadow-2xs transition-all duration-200 hover:-translate-y-0.5 ${
                copied
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default: Inline (Top/Header Area)
  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5 text-slate-400" />
        <span>Share:</span>
      </span>

      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${item.name}`}
          aria-label={`Share on ${item.name}`}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 bg-white border border-slate-200 shadow-2xs transition-all duration-200 hover:scale-110 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 ${item.color}`}
        >
          {item.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopyLink}
        title={copied ? "Link Copied!" : "Copy Link"}
        aria-label="Copy Link"
        className={`h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold border shadow-2xs transition-all duration-200 hover:scale-105 ${
          copied
            ? "bg-emerald-600 text-white border-emerald-600"
            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-white" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
