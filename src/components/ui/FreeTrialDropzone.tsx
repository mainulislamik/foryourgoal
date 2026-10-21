"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  CheckCircle2,
  FileImage,
  X,
  AlertCircle,
  Loader2,
  Sparkles,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
  Link as LinkIcon,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "Clipping Path (Hand Pen Tool)",
  "Commercial Product Retouching",
  "Ghost Mannequin & Neck Joint",
  "Luxury Jewelry & Gemstones",
  "Pure White Background (#FFFFFF)",
  "Shadow & Reflection Creation",
  "Color Correction & Recolor",
  "Complex Hair & Alpha Masking",
];

export interface FreeTrialDropzoneProps {
  defaultService?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function FreeTrialDropzone({
  defaultService,
  className = "",
  title = "Test Our Quality With 5 Free Images",
  subtitle = "Upload up to 5 original RAW or high-res product photos. Our senior Photoshop retouchers will process them with 100% hand-drawn paths and return QA-passed deliverables within ~6 hours.",
}: FreeTrialDropzoneProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    defaultService ? [defaultService] : ["Commercial Product Retouching"]
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instructions, setInstructions] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<{ name: string; size: string; url: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ referenceId: string; email: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleFiles = (newFiles: FileList | File[]) => {
    setError(null);
    const validFiles: File[] = [];
    const validPreviews: { name: string; size: string; url: string }[] = [];

    const totalAllowed = 5;
    const currentCount = files.length;
    const remainingSlots = totalAllowed - currentCount;

    if (remainingSlots <= 0) {
      setError("You can upload a maximum of 5 sample images for the free trial.");
      return;
    }

    const filesArray = Array.from(newFiles).slice(0, remainingSlots);

    for (const file of filesArray) {
      if (file.size > 3.5 * 1024 * 1024) {
        setError(`"${file.name}" exceeds 3.5MB. Please upload smaller files or paste a Google Drive/Dropbox link.`);
        continue;
      }
      validFiles.push(file);
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      const url = URL.createObjectURL(file);
      validPreviews.push({ name: file.name, size: sizeStr, url });
    }

    setFiles((prev) => [...prev, ...validFiles]);
    setFilePreviews((prev) => [...prev, ...validPreviews]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please provide your business email or contact info.");
      return;
    }

    if (files.length === 0 && !driveLink.trim()) {
      setError("Please either drop at least 1 image file or paste a Google Drive / Dropbox link.");
      return;
    }

    if (selectedServices.length === 0) {
      setError("Please select at least one retouching service needed.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim() || "Free Trial Client");
      formData.append("email", email.trim());
      formData.append(
        "message",
        `SERVICES REQUESTED: ${selectedServices.join(", ")}\n\nINSTRUCTIONS: ${instructions.trim() || "Standard high-end QA"}`
      );
      formData.append("driveLink", driveLink.trim());
      formData.append("website", honeypot.trim()); // Honeypot field

      // Append files as file_1 and file_2
      files.forEach((file, idx) => {
        formData.append(`file_${idx + 1}`, file);
      });

      const res = await fetch("/api/request-trial", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit trial request. Please try again.");
      }

      setSuccessData({
        referenceId: data.referenceId || "FYG-TRIAL-" + Math.floor(100000 + Math.random() * 900000),
        email: email.trim(),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to submit request.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    filePreviews.forEach((p) => URL.revokeObjectURL(p.url));
    setFiles([]);
    setFilePreviews([]);
    setName("");
    setEmail("");
    setInstructions("");
    setDriveLink("");
    setSuccessData(null);
    setError(null);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Glow ambient backgrounds */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {successData ? (
          /* =========================================================================
             SUCCESS STATE WITH TRACKING TICKET & WHATSAPP SHORTCUT
             ========================================================================= */
          <div className="relative z-10 py-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>6-Hour SLA Clock Active</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Free Trial Files Ingested!
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto">
                We have assigned your sample to our senior retouching team. You will receive the retouched deliverables and PSD layer files directly at{" "}
                <span className="font-semibold text-emerald-400">{successData.email}</span>.
              </p>
            </div>

            {/* Tracking Reference Ticket Box */}
            <div className="p-4 sm:p-6 bg-slate-950/80 border border-slate-700 rounded-2xl max-w-md mx-auto space-y-3">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Assigned Production Ticket ID
              </div>
              <div className="font-mono text-2xl font-black text-indigo-400 tracking-wider">
                {successData.referenceId}
              </div>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Hand Pen Tool</span>
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Zero Charge / Free Sample</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/8801772866884?text=${encodeURIComponent(
                  `Hello For Your Goal Team, I just submitted free trial order ${successData.referenceId}. Please check my files.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all"
              >
                Submit Another Trial Order
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             ACTIVE UPLOAD FORM
             ========================================================================= */
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            {/* Header */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Instant Enterprise Trial • No Credit Card Required</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {title}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>

            {/* Service Multi-Select Pills */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Select Services Required for Your Free Sample:
              </label>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((srv) => {
                  const isSelected = selectedServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`pill-spring px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-indigo-600 text-white border border-indigo-400 shadow-md shadow-indigo-600/30 scale-[1.02]"
                          : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-500"}`}
                      />
                      <span>{srv}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Upload up to 5 Test Photos (Tap to browse or drop files):
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files) {
                    handleFiles(e.dataTransfer.files);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center ${
                  isDragging
                    ? "border-indigo-400 bg-indigo-950/60 scale-[1.01] shadow-[0_0_25px_rgba(99,102,241,0.3)] ring-2 ring-indigo-400/30"
                    : "border-slate-700 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-slate-950/80 hover:shadow-lg"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/tiff,.psd,.raw,.cr2,.nef"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFiles(e.target.files);
                    }
                  }}
                  className="hidden"
                />

                <div className={`w-14 h-14 rounded-full bg-slate-800/80 border border-slate-700 text-indigo-400 flex items-center justify-center mb-3 shadow-inner transition-transform duration-300 ${
                  isDragging ? "animate-bounce text-indigo-300 scale-110" : "hover:scale-110"
                }`}>
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-white">
                  Tap to select photos, or drop files here
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  JPG, PNG, WebP, TIFF, or PSD (Max 5 files, up to 3.5MB each)
                </div>
              </div>

              {/* Uploaded File Previews */}
              {filePreviews.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {filePreviews.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3 shadow-md"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 relative">
                          <Image
                            src={f.url}
                            alt={f.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{f.name}</div>
                          <div className="text-[11px] text-slate-400">{f.size}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Alternative Drive Link Input */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Alternatively, paste a Google Drive, Dropbox, or WeTransfer link:</span>
                </div>
                <input
                  type="url"
                  placeholder="Paste Google Drive, Dropbox, or WeTransfer link"
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Client Information & Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name / Studio Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Henderson (Nordic Studio)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Business Email or WhatsApp (Required):
                </label>
                <input
                  type="text"
                  required
                  placeholder="alex@brand.com or +1 555 019..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Specific Retouching Instructions (Optional):
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Pure white #FFFFFF background, 85% frame fit, remove scratches on metallic parts, keep original shadow."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Bot Honeypot */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="p-4 bg-rose-950/70 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button & Trust Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>~6h Turnaround</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>100% Confidential NDA</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Upload &amp; Ticket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit 5 Free Test Images</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
