"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  MoveHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Layers,
  Search,
} from "lucide-react";
import { BeforeAfterModal } from "./BeforeAfterModal";

export type ComparisonMode = "slider" | "hold" | "loupe";

export interface BeforeAfterSliderProps {
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
  showControls?: boolean;
  showFooter?: boolean;
  allowFullscreen?: boolean;
  initialMode?: ComparisonMode;
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
  title = "Before & After Quality Inspection",
  category = "Commercial Photo Post-Production",
  showControls,
  showFooter,
  allowFullscreen = true,
  initialMode = "slider",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<ComparisonMode>(initialMode);
  const [isHeld, setIsHeld] = useState(false);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number; show: boolean; pctX: number; pctY: number }>({
    x: 0,
    y: 0,
    show: false,
    pctX: 50,
    pctY: 50,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Check if component is placed in a parent container meant to fill height or aspect
  const isFillParent =
    className.includes("h-full") ||
    className.includes("aspect-") ||
    aspectRatio === "custom" ||
    aspectRatio === "full";

  // Resolve canvas aspect ratio class safely
  const resolvedAspectClass = (() => {
    if (!aspectRatio || aspectRatio === "custom" || aspectRatio === "full") {
      return "w-full h-full min-h-0 flex-1";
    }
    if (aspectRatio === "square" || aspectRatio === "1/1") {
      return "w-full aspect-square";
    }
    if (aspectRatio === "4/3") {
      return "w-full aspect-[4/3]";
    }
    if (aspectRatio === "16/9") {
      return "w-full aspect-video";
    }
    if (aspectRatio === "16/10") {
      return "w-full aspect-[16/10]";
    }
    if (aspectRatio.startsWith("aspect-")) {
      return `w-full ${aspectRatio}`;
    }
    return `w-full aspect-[${aspectRatio}]`;
  })();

  const effectiveShowFooter = showFooter !== undefined ? showFooter : !isFillParent;
  const effectiveShowControls = showControls !== undefined ? showControls : !isFillParent;

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (activeMode !== "slider" || !isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [activeMode, isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (activeMode !== "slider" || !isDragging) return;
      handleMove(e.clientX);
    },
    [activeMode, isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Loupe pointer tracking
  const handleLoupePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeMode !== "loupe" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setLoupePos({ x, y, show: true, pctX, pctY });
  };

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

  const baseContainerStyle = isFillParent
    ? "relative w-full h-full flex flex-col select-none overflow-hidden"
    : "relative w-full flex flex-col select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl";

  return (
    <div className={`${baseContainerStyle} ${className}`}>
      {/* Top Interactive Mode Navigation Toolbar */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-1 p-0.5 sm:gap-1.5 sm:p-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-lg text-[10px] sm:text-[11px] font-semibold text-white">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveMode("slider");
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
            activeMode === "slider"
              ? "bg-indigo-600 text-white shadow-sm font-bold"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
          title="Split Slider Comparison"
        >
          <MoveHorizontal className="w-3 h-3" />
          <span>Slider</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveMode("hold");
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
            activeMode === "hold"
              ? "bg-indigo-600 text-white shadow-sm font-bold"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
          title="Press & Hold to Compare Original vs Retouched"
        >
          <Eye className="w-3 h-3" />
          <span className="sm:hidden">Hold</span>
          <span className="hidden sm:inline">Hold View</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveMode("loupe");
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
            activeMode === "loupe"
              ? "bg-indigo-600 text-white shadow-sm font-bold"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
          title="300% Zoom Micro Inspection Loupe"
        >
          <Search className="w-3 h-3" />
          <span className="hidden sm:inline">300% Loupe</span>
        </button>
      </div>

      {/* Visual Controls Header (Zoom & Fullscreen) */}
      {(effectiveShowControls || allowFullscreen) && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          {effectiveShowControls && activeMode === "slider" && (
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-indigo-500 shadow-sm transition-colors"
              aria-label={isZoomed ? "Reset Zoom" : "Zoom in 1.5x"}
            >
              {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isZoomed ? "100%" : "Zoom 1.5x"}</span>
            </button>
          )}

          {allowFullscreen && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsFullscreenOpen(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md border border-slate-300 text-slate-700 hover:text-indigo-600 hover:border-indigo-500 shadow-md transition-all active:scale-95 group/fs"
              aria-label="View Fullscreen Comparison"
              title="View Fullscreen Comparison"
            >
              <Maximize2 className="w-3.5 h-3.5 text-slate-600 group-hover/fs:text-indigo-600 transition-colors" />
              <span className="text-[11px] font-bold hidden sm:inline">Full Screen</span>
            </button>
          )}
        </div>
      )}

      {/* Main Comparison Canvas */}
      <div
        ref={containerRef}
        className={`relative ${resolvedAspectClass} overflow-hidden touch-none select-none ${
          activeMode === "slider" ? "cursor-ew-resize" : activeMode === "hold" ? "cursor-pointer" : "cursor-crosshair"
        } ${isZoomed && activeMode === "slider" ? "scale-125 transition-transform duration-300" : ""}`}
        onMouseDown={(e) => {
          if (activeMode === "slider") {
            setIsDragging(true);
            handleMove(e.clientX);
          } else if (activeMode === "hold") {
            setIsHeld(true);
          }
        }}
        onMouseUp={() => {
          if (activeMode === "hold") {
            setIsHeld(false);
          }
        }}
        onMouseLeave={() => {
          if (activeMode === "hold") {
            setIsHeld(false);
          }
          if (activeMode === "loupe") {
            setLoupePos((p) => ({ ...p, show: false }));
          }
        }}
        onMouseMove={handleLoupePointerMove}
        onTouchStart={(e) => {
          if (activeMode === "slider") {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          } else if (activeMode === "hold") {
            setIsHeld(true);
          }
        }}
        onTouchEnd={() => {
          if (activeMode === "hold") {
            setIsHeld(false);
          }
        }}
      >
        {/* =========================================================================
            MODE 1: SLIDER COMPARISON
           ========================================================================= */}
        {activeMode === "slider" && (
          <>
            {/* Layer 0: AFTER IMAGE (Background - Full width) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={afterImage}
                alt={afterAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover pointer-events-none select-none"
                priority
              />
              {afterLabel && (
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-emerald-700 border border-emerald-300 shadow-sm pointer-events-none">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{afterLabel}</span>
                </div>
              )}
            </div>

            {/* Layer 1: BEFORE IMAGE (Foreground - Clipped with CSS clip-path) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path] pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={beforeImage}
                alt={beforeAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover pointer-events-none select-none"
                priority
              />
              {beforeLabel && (
                <div
                  className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/95 backdrop-blur-md text-slate-700 border border-slate-300 shadow-sm pointer-events-none transition-opacity duration-150"
                  style={{ opacity: sliderPosition > 12 ? 1 : 0 }}
                >
                  <span>{beforeLabel}</span>
                </div>
              )}
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-white cursor-ew-resize will-change-[left] shadow-[0_0_10px_rgba(0,0,0,0.5)] before:absolute before:inset-y-0 before:-left-3 before:-right-3 before:content-['']"
              style={{ left: `${sliderPosition}%` }}
              role="slider"
              tabIndex={0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              aria-label="Before and after image comparison slider"
              onKeyDown={handleKeyDown}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-indigo-600 shadow-xl flex items-center justify-center text-indigo-600 pointer-events-none group-hover:scale-110 transition-transform duration-200">
                <span className="absolute -inset-1 rounded-full bg-indigo-500/20 animate-ping -z-10" />
                <MoveHorizontal className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            MODE 2: HOLD TO COMPARE (The KOW Company Style)
           ========================================================================= */}
        {activeMode === "hold" && (
          <div className="absolute inset-0 w-full h-full">
            {/* Base Image is Retouched */}
            <Image
              src={afterImage}
              alt={afterAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover pointer-events-none select-none"
              priority
            />

            {/* Overlay Image is RAW (revealed on hold) */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-150 ${
                isHeld ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={beforeImage}
                alt={beforeAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover pointer-events-none select-none"
                priority
              />
            </div>

            {/* Central Floating Instruction Callout */}
            <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center pointer-events-none">
              <div
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase shadow-2xl backdrop-blur-md transition-all duration-200 border flex items-center gap-2 ${
                  isHeld
                    ? "bg-amber-500 text-slate-950 border-amber-300 scale-105 shadow-amber-500/20"
                    : "bg-slate-900/90 text-white border-white/20 scale-100"
                }`}
              >
                <Eye className="w-4 h-4 shrink-0" />
                <span>{isHeld ? "Showing: Original RAW Capture" : "Press & Hold Mouse to Reveal RAW"}</span>
              </div>
            </div>

            {/* Status indicator badge */}
            <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-indigo-700 border border-indigo-300 shadow-sm pointer-events-none">
              <span>{isHeld ? "RAW Mode Active" : "Final Retouched"}</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODE 3: 300% ZOOM LOUPE INSPECTION
           ========================================================================= */}
        {activeMode === "loupe" && (
          <div className="absolute inset-0 w-full h-full">
            {/* Base Retouched Image */}
            <Image
              src={afterImage}
              alt={afterAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover pointer-events-none select-none"
              priority
            />

            {/* Interactive 300% Magnifier Circle */}
            {loupePos.show && (
              <div
                className="absolute pointer-events-none rounded-full border-4 border-indigo-500 shadow-[0_0_30px_rgba(0,0,0,0.6)] overflow-hidden z-30 ring-2 ring-white"
                style={{
                  width: 160,
                  height: 160,
                  left: loupePos.x - 80,
                  top: loupePos.y - 80,
                  backgroundColor: "#000",
                }}
              >
                <div
                  className="absolute w-[300%] h-[300%] pointer-events-none"
                  style={{
                    left: `-${loupePos.pctX * 3 - 50}%`,
                    top: `-${loupePos.pctY * 3 - 50}%`,
                  }}
                >
                  <Image
                    src={afterImage}
                    alt={afterAlt}
                    fill
                    className="object-cover"
                    sizes="1200px"
                  />
                </div>
                {/* Crosshair indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-4 h-0.5 bg-white"></div>
                  <div className="h-4 w-0.5 bg-white absolute"></div>
                </div>
                <div className="absolute bottom-1 inset-x-0 text-center text-[9px] font-bold text-white uppercase tracking-wider drop-shadow-md">
                  300% Zoom
                </div>
              </div>
            )}

            {/* Hint Badge */}
            <div className="absolute bottom-3 left-3 z-10 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 backdrop-blur-md text-white border border-white/20 shadow-md pointer-events-none flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span>Hover anywhere to inspect sub-pixel edge quality</span>
            </div>
          </div>
        )}
      </div>

      {/* Instructional Footer */}
      {effectiveShowFooter && (
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 shrink-0 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {activeMode === "slider" && (
              <span>Drag slider or swipe to inspect retouching quality</span>
            )}
            {activeMode === "hold" && (
              <span>Tap and hold on image to view raw file; release to see retouched</span>
            )}
            {activeMode === "loupe" && (
              <span>Move cursor over subject to view 300% microscopic texture and vector path</span>
            )}
          </div>
          <span className="font-mono text-slate-500 font-medium">100% Hand-Crafted Paths • Zero Halos</span>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {allowFullscreen && (
        <BeforeAfterModal
          isOpen={isFullscreenOpen}
          onClose={() => setIsFullscreenOpen(false)}
          beforeImage={beforeImage}
          afterImage={afterImage}
          beforeAlt={beforeAlt}
          afterAlt={afterAlt}
          beforeLabel={beforeLabel}
          afterLabel={afterLabel}
          title={title}
          category={category}
        />
      )}
    </div>
  );
}
