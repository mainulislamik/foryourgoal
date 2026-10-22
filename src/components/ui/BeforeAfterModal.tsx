"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  Sparkles,
  MoveHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sliders,
  CheckCircle2,
} from "lucide-react";

export interface BeforeAfterModalProps {
  isOpen: boolean;
  onClose: () => void;
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  category?: string;
  naturalAspectRatio?: number | null;
  imageFit?: "contain" | "cover";
}

export function BeforeAfterModal({
  isOpen,
  onClose,
  beforeImage,
  afterImage,
  beforeAlt = "Original raw image before editing",
  afterAlt = "Professionally retouched image after editing",
  beforeLabel = "Original / Raw",
  afterLabel = "Retouched / QA Passed",
  title = "Before & After Quality Inspection",
  category = "Commercial Photo Post-Production",
  naturalAspectRatio = null,
  imageFit = "contain",
}: BeforeAfterModalProps) {
  const [mounted, setMounted] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [detectedRatio, setDetectedRatio] = useState<number | null>(naturalAspectRatio);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (naturalAspectRatio) {
      setDetectedRatio(naturalAspectRatio);
      return;
    }
    const targetSrc = beforeImage || afterImage;
    if (!targetSrc) return;
    const img = new window.Image();
    img.src = targetSrc;
    const updateRatio = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setDetectedRatio(img.naturalWidth / img.naturalHeight);
      }
    };
    if (img.complete && img.naturalWidth > 0) {
      updateRatio();
    } else {
      img.onload = updateRatio;
    }
  }, [beforeImage, afterImage, naturalAspectRatio]);

  // Lock background scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

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

  // Global keydown handler: Esc to close, Left/Right arrow to slide
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setSliderPosition((prev) => Math.max(0, prev - 5));
      } else if (e.key === "ArrowRight") {
        setSliderPosition((prev) => Math.min(100, prev + 5));
      } else if (e.key === "Home") {
        setSliderPosition(0);
      } else if (e.key === "End") {
        setSliderPosition(100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} Fullscreen Comparison`}
      className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200 select-none overflow-hidden"
    >
      {/* 1. TOP HEADER BAR */}
      <header className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              {title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-indigo-400 font-semibold">{category}</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Pixel-Perfect QA Proof
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Zoom Toggle */}
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
            aria-label={isZoomed ? "Reset Zoom" : "Zoom in 1.4x"}
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isZoomed ? "Reset Zoom" : "Zoom 1.4x"}</span>
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/15 hover:bg-rose-600/90 text-white border border-white/10 hover:border-rose-500 transition-all shadow-md group"
            aria-label="Close fullscreen view"
          >
            <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span className="hidden sm:inline">Close</span>
            <kbd className="hidden md:inline ml-1 text-[10px] font-mono text-white/60 bg-white/10 px-1.5 py-0.5 rounded">
              Esc
            </kbd>
          </button>
        </div>
      </header>

      {/* 2. CENTRAL COMPARISON CANVAS */}
      <main
        className="flex-1 w-full flex items-center justify-center p-2 sm:p-6 overflow-hidden relative cursor-default"
        onClick={(e) => {
          // If clicked outside container, close
          if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            onClose();
          }
        }}
      >
        <div
          ref={containerRef}
          style={
            detectedRatio
              ? { aspectRatio: `${detectedRatio}`, maxHeight: "min(82vh, 850px)" }
              : { maxHeight: "78vh" }
          }
          className={`relative w-full max-w-6xl ${
            detectedRatio ? "" : "aspect-[16/10]"
          } rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl cursor-ew-resize select-none touch-none ${
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
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Blurred Backdrop: eliminates dead black bars while foreground image stays 100% complete */}
          {afterImage && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
              <Image
                src={afterImage}
                alt=""
                fill
                sizes="100vw"
                quality={30}
                unoptimized
                className="object-cover blur-3xl scale-125 opacity-35 pointer-events-none select-none"
              />
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
            </div>
          )}

          {/* Layer 0: AFTER IMAGE (Background - Full width) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={afterImage}
              alt={afterAlt}
              fill
              sizes="100vw"
              quality={95}
              unoptimized
              className="object-contain pointer-events-none select-none"
              priority
            />
            {/* After Label Badge */}
            {afterLabel && (
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 shadow-lg pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
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
              sizes="100vw"
              quality={95}
              unoptimized
              className="object-contain pointer-events-none select-none"
              priority
            />
            {/* Before Label Badge */}
            {beforeLabel && (
              <div
                className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/80 backdrop-blur-md text-slate-200 border border-white/20 shadow-lg pointer-events-none transition-opacity duration-150"
                style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
              >
                <span>{beforeLabel}</span>
              </div>
            )}
          </div>

          {/* Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-white cursor-ew-resize will-change-[left] shadow-[0_0_15px_rgba(255,255,255,0.7)]"
            style={{ left: `${sliderPosition}%` }}
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            aria-label="Fullscreen comparison slider"
          >
            {/* Center Circular Grip Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border-2 border-indigo-600 shadow-2xl flex items-center justify-center text-indigo-600 pointer-events-none">
              <MoveHorizontal className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </div>
      </main>

      {/* 3. BOTTOM CONTROL & PRESET BAR */}
      <footer className="w-full px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 backdrop-blur-md shrink-0 text-xs">
        {/* Quick Position Presets */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium hidden sm:inline">Presets:</span>
          <button
            type="button"
            onClick={() => setSliderPosition(0)}
            className={`px-3 py-1 rounded-md font-medium border transition-colors ${
              sliderPosition === 0
                ? "bg-white text-slate-900 border-white"
                : "bg-white/10 text-slate-300 border-white/10 hover:bg-white/20"
            }`}
          >
            Original RAW (0%)
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-3 py-1 rounded-md font-medium border transition-colors ${
              Math.round(sliderPosition) === 50
                ? "bg-indigo-600 text-white border-indigo-500"
                : "bg-white/10 text-slate-300 border-white/10 hover:bg-white/20"
            }`}
          >
            50 / 50 Split
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(100)}
            className={`px-3 py-1 rounded-md font-medium border transition-colors ${
              sliderPosition === 100
                ? "bg-white text-slate-900 border-white"
                : "bg-white/10 text-slate-300 border-white/10 hover:bg-white/20"
            }`}
          >
            Retouched (100%)
          </button>
        </div>

        {/* Interaction Guidance */}
        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
          <span className="hidden md:inline">
            Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-200">←</kbd> /{" "}
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-200">→</kbd> to slide
          </span>
          <span>•</span>
          <span>Drag handle to inspect at 100% scale</span>
        </div>
      </footer>
    </div>,
    document.body
  );
}
