"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { servicesData } from "@/data/services";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Lock,
  Clock,
  Sparkles,
  FileCheck,
} from "lucide-react";

export default function RequestQuotePage() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "clipping-path";

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    website: "",
    service: preselectedService,
    volumeTier: "50-250",
    turnaround: "24h",
    exportFormat: "PSD + PNG (Transparent)",
    briefNotes: "",
    ndaRequired: true,
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; size: number }[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    setErrorMessage("");

    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "File upload failed");
      }

      setUploadedFiles((prev) => [
        ...prev,
        { id: json.fileId, name: json.originalName, size: json.size },
      ]);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitQuote = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        ...formData,
        fileUploads: uploadedFiles.map((f) => f.id),
      };

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit quote request");
      }

      setReferenceId(json.referenceId || "FYG-" + Math.floor(100000 + Math.random() * 900000));
      setSubmissionSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong submitting your quote");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full text-center">
        <div className="p-10 rounded-3xl bg-brand-navy-card border border-brand-border shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-brand-ivory">
            Quote Request Received!
          </h1>
          <p className="text-sm text-brand-ivory/70 leading-relaxed">
            Thank you, <strong className="text-brand-ivory">{formData.fullName}</strong>. Your project brief has been assigned to our senior production supervisor.
          </p>

          <div className="p-4 rounded-xl bg-brand-navy border border-brand-border font-mono text-xs text-brand-ivory/80">
            Reference Tracking ID: <span className="text-brand-lime font-bold">{referenceId}</span>
          </div>

          <div className="text-xs text-brand-ivory/60 space-y-1">
            <div>Expected Guaranteed Response Time: <strong>Within 45 Minutes</strong></div>
            <div>Confirmation Email Sent To: <strong>{formData.email}</strong></div>
          </div>

          <div className="pt-4">
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-violet text-white font-semibold text-sm hover:shadow-lg transition-all"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-lime bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/20">
          Guaranteed 45-Minute Response
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-ivory mt-3">
          Request a Custom B2B Quotation
        </h1>
        <p className="mt-2 text-sm text-brand-ivory/70">
          Submit your requirements or 2 sample images for an immediate pilot test. No credit card required.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between max-w-xl mx-auto mb-10 text-xs font-mono">
        {[
          { num: 1, label: "Contact Details" },
          { num: 2, label: "Services & Scope" },
          { num: 3, label: "Specs & Upload" },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step >= s.num
                  ? "bg-brand-violet text-white"
                  : "bg-brand-navy-card text-brand-ivory/40 border border-brand-border"
              }`}
            >
              {s.num}
            </div>
            <span className={step >= s.num ? "text-brand-ivory" : "text-brand-ivory/40"}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="p-8 sm:p-10 rounded-2xl bg-brand-navy-card border border-brand-border shadow-xl">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: CONTACT */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-brand-ivory border-b border-brand-border pb-3">
              Step 1: Your Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah@fashionbrand.com"
                  className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Lumina Apparel"
                  className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                  Website / Store URL
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="e.g. https://lumina.com"
                  className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!formData.fullName || !formData.email) {
                    setErrorMessage("Please enter both your name and a valid email address.");
                    return;
                  }
                  setErrorMessage("");
                  setStep(2);
                }}
                className="px-6 py-3 rounded-xl bg-brand-violet text-white font-semibold text-sm hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <span>Continue to Service Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SERVICES & VOLUME */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-brand-ivory border-b border-brand-border pb-3">
              Step 2: Editing Scope & Volume
            </h2>

            <div>
              <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                Primary Required Service
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
              >
                {servicesData.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                  Estimated Monthly Volume
                </label>
                <select
                  value={formData.volumeTier}
                  onChange={(e) => setFormData({ ...formData, volumeTier: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
                >
                  <option value="1-50">1 - 50 images (Occasional)</option>
                  <option value="50-250">50 - 250 images / month (Regular)</option>
                  <option value="250-1000">250 - 1,000 images / month (Scale)</option>
                  <option value="1000+">1,000+ images / month (Enterprise Retainer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                  Target Turnaround Time
                </label>
                <select
                  value={formData.turnaround}
                  onChange={(e) => setFormData({ ...formData, turnaround: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
                >
                  <option value="4h">Express Rush (4-6 Hours)</option>
                  <option value="12h">Overnight Express (12 Hours)</option>
                  <option value="24h">Standard Business (24 Hours)</option>
                  <option value="48h">Flexible SLA (48 Hours)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl bg-brand-navy text-brand-ivory text-sm border border-brand-border hover:bg-brand-navy-light inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-brand-violet text-white font-semibold text-sm hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <span>Continue to Specs & Upload</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SPECS & SAMPLES */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-brand-ivory border-b border-brand-border pb-3">
              Step 3: Specifications, Sample Upload & NDA
            </h2>

            <div>
              <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                Preferred Export Format & Color Profile
              </label>
              <input
                type="text"
                value={formData.exportFormat}
                onChange={(e) => setFormData({ ...formData, exportFormat: e.target.value })}
                placeholder="e.g. Layered PSD + sRGB JPEG 2000x2000 white background"
                className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
              >
              </input>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                Project Instructions & Style Guidelines
              </label>
              <textarea
                rows={3}
                value={formData.briefNotes}
                onChange={(e) => setFormData({ ...formData, briefNotes: e.target.value })}
                placeholder="Describe your shadow preferences, clipping margin (e.g. 2px inside edge), model skin retouching levels, or special requests..."
                className="w-full px-4 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory text-sm focus:outline-none focus:border-brand-violet"
              />
            </div>

            {/* File Upload Box */}
            <div>
              <label className="block text-xs font-semibold text-brand-ivory/80 uppercase tracking-wider mb-2">
                Optional: Upload 1-2 Sample Raw Images (Max 25MB each)
              </label>
              <div className="border-2 border-dashed border-brand-border hover:border-brand-violet/50 rounded-2xl p-6 text-center bg-brand-navy/60 transition-colors">
                <input
                  type="file"
                  id="sample-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".jpg,.jpeg,.png,.webp,.psd,.tiff"
                  disabled={isUploading}
                />
                <label
                  htmlFor="sample-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <Upload className="w-8 h-8 text-brand-lime" />
                  <span className="text-sm font-semibold text-brand-ivory">
                    {isUploading ? "Uploading & Verifying Magic Bytes..." : "Click to select sample images"}
                  </span>
                  <span className="text-xs text-brand-ivory/50">
                    Supports JPEG, PNG, WebP, TIFF, PSD up to 25MB
                  </span>
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-1.5 text-left border-t border-brand-border/60 pt-3">
                    <div className="text-xs font-mono text-brand-lime">Uploaded Sample Files:</div>
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="text-xs text-brand-ivory/80 flex items-center gap-2">
                        <FileCheck className="w-3.5 h-3.5 text-brand-lime" />
                        <span>{f.name} ({(f.size / (1024 * 1024)).toFixed(2)} MB)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* NDA Checkbox */}
            <div className="p-4 rounded-xl bg-brand-navy border border-brand-border/60 flex items-start gap-3">
              <input
                type="checkbox"
                id="nda"
                checked={formData.ndaRequired}
                onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                className="mt-1 rounded border-brand-border text-brand-violet focus:ring-0"
              />
              <label htmlFor="nda" className="text-xs text-brand-ivory/80 cursor-pointer">
                <strong>Strict Confidentiality & NDA:</strong> I understand that Foryourgoal operates under a strict Non-Disclosure Agreement. Uploaded files remain confidential and are never shared publicly or used without written authorization.
              </label>
            </div>

            {/* Actions */}
            <div className="pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-brand-navy text-brand-ivory text-sm border border-brand-border hover:bg-brand-navy-light inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitQuote}
                className="px-8 py-3.5 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-lime-400 transition-all inline-flex items-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Quote & Sample Request"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
