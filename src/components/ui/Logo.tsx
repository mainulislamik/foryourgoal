import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "mark" | "stacked";
  theme?: "light" | "dark";
  showTagline?: boolean;
}

export function Logo({
  className = "h-9 w-auto",
  variant = "horizontal",
  theme = "light",
  showTagline = false,
}: LogoProps) {
  const isDark = theme === "dark";

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 group focus:outline-none transition-transform duration-200 hover:opacity-95 shrink-0"
      aria-label="FOR YOUR GOAL - Home"
    >
      {/* Official Vector Logo Lockup from Brand Kit */}
      <div className="relative flex items-center">
        <svg
          viewBox="20 30 1180 250"
          className={`${className} overflow-visible`}
          role="img"
          aria-hidden="true"
        >
          <g transform="translate(28 35) scale(0.80)">
            <defs>
              <linearGradient id={`fygBlue-${theme}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3547F5" />
                <stop offset="100%" stopColor="#06A6FF" />
              </linearGradient>
              <linearGradient id={`fygArrow-${theme}`} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#174CFF" />
                <stop offset="100%" stopColor="#00BDF2" />
              </linearGradient>
            </defs>
            {/* Geometric F */}
            <path
              d="M48 286 L96 72 C103 42 123 26 155 26 H300 L271 80 H169 C154 80 146 88 142 103 L133 140 H246 L218 193 H121 L105 264 C100 286 81 296 48 286 Z"
              fill={`url(#fygBlue-${theme})`}
            />
            {/* G-shaped open circular form */}
            <path
              d="M397 121 A79 79 0 1 0 399 225 L399 184 L357 184"
              fill="none"
              stroke={isDark ? "#F5F7FB" : "#202631"}
              strokeWidth="32"
              strokeLinecap="butt"
              strokeLinejoin="round"
            />
            {/* Rising arrow: clear direction of progress */}
            <path
              d="M187 263 L398 101 L384 92 L459 51 L439 128 L422 110 L203 278 Z"
              fill={`url(#fygArrow-${theme})`}
            />
          </g>
          <text
            x="445"
            y="190"
            textAnchor="start"
            fontFamily="var(--font-geist-sans), DejaVu Sans, Arial, Helvetica, sans-serif"
            fontSize="74"
            fontWeight="800"
            letterSpacing="1.2"
            fill={isDark ? "#F5F7FB" : "#202631"}
          >
            <tspan>FOR YOUR </tspan>
            <tspan fill="#247BFF">GOAL</tspan>
          </text>
        </svg>
      </div>
      {showTagline && (
        <span className="hidden sm:inline-block text-[10px] font-semibold tracking-widest uppercase text-slate-500 border-l border-slate-300 pl-2.5 ml-1">
          Studio
        </span>
      )}
    </Link>
  );
}
