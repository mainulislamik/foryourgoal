import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className = "h-8", showTagline = false }: LogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none" aria-label="Foryourgoal Home">
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#745CFF] to-[#D6FF70] p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-[#745CFF]/20">
        <div className="w-full h-full bg-[#101321] rounded-[10px] flex items-center justify-center">
          {/* Custom Stylized Geometric Icon: Aperture / Pen tool crosshair */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-[#D6FF70] transition-colors"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#745CFF" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="5" stroke="#D6FF70" strokeWidth="2" />
            <path d="m4.93 4.93 2.83 2.83M16.24 16.24l2.83 2.83" stroke="#D6FF70" strokeWidth="1.5" />
            <path d="m19.07 4.93-2.83 2.83M7.76 16.24l-2.83 2.83" stroke="#745CFF" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight text-white font-sans flex items-center">
          Foryour<span className="text-[#D6FF70] font-black">goal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#745CFF] ml-1 mb-2 inline-block"></span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400">
            Image Editing Studio
          </span>
        )}
      </div>
    </Link>
  );
}
