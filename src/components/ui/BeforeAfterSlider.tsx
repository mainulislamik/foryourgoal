"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal, ZoomIn, ZoomOut } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
  title?: string;
  category?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Original raw image before editing",
  afterAlt = "Professionally retouched and clipped image after editing",
  beforeLabel = "Original / Raw",
  afterLabel = "Retouched / QA Passed",
  className = "",
  aspectRatio = "aspect-[4/3]",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      setSliderPosition(0);
    } else if (e.key === "End") {
      setSliderPosition(100);
    }
  };

  return (
    <div className={`relative select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl ${className}`}>
      {/* Visual Controls Header */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-indigo-500 shadow-sm transition-colors"
          aria-label={isZoomed ? "Reset Zoom" : "Zoom in 1.5x"}
        >
          {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isZoomed ? "100%" : "Zoom 1.5x"}</span>
        </button>
      </div>

      {/* Main Comparison Canvas */}
      <div
        ref={containerRef}
        className={`relative w-full ${aspectRatio} cursor-ew-resize overflow-hidden ${
          isZoomed ? "scale-125 transition-transform duration-300" : ""
        }`}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Layer 2: AFTER IMAGE (Background - Full width) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="object-cover"
            priority
          />
          {/* After Label Badge */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-emerald-700 border border-emerald-300 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* Layer 1: BEFORE IMAGE (Foreground - Clipped with width %) */}
        <div
          className="absolute inset-0 h-full overflow-hidden will-change-[width]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full min-w-[320px]" style={{ width: containerRef.current?.offsetWidth || "100%" }}>
            <Image
              src={beforeImage}
              alt={beforeAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
              priority
            />
          </div>
          {/* Before Label Badge */}
          <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-medium bg-white/95 backdrop-blur-md text-slate-700 border border-slate-300 shadow-md">
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize will-change-[left] shadow-[0_0_10px_rgba(0,0,0,0.4)]"
          style={{ left: `${sliderPosition}%` }}
          role="slider"
          tabIndex={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          aria-label="Before and after image comparison slider"
          onKeyDown={handleKeyDown}
        >
          {/* Center Circular Grip Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-indigo-600 shadow-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
            <MoveHorizontal className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Instructional Footer */}
      <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Drag slider or use arrow keys to inspect retouching quality
        </span>
        <span className="font-mono text-slate-500 font-medium">100% Hand-Crafted Paths</span>
      </div>
    </div>
  );
}
