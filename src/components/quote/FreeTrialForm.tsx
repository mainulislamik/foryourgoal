"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Link as LinkIcon,
  Loader2,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
} from "lucide-react";

export default function FreeTrialForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [driveLink, setDriveLink] = useState("");

  // 5 slots matching Stencil exactly
  const [files, setFiles] = useState<(File | null)[]>([null, null, null, null, null]);
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 3.5 * 1024 * 1024) {
      alert(`File "${selected.name}" exceeds the 3 MB limit. Please use the public Google Drive / Dropbox link below for larger files.`);
      if (fileInputRefs[index].current) {
        fileInputRefs[index].current.value = "";
      }
      return;
    }

    setFiles((prev) => {
      const next = [...prev];
      next[index] = selected;
      return next;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("driveLink", driveLink);
      formData.append("website", honeypot);

      // Attach any non-null files
      files.forEach((file, idx) => {
        if (file) {
          formData.append(`file_${idx + 1}`, file);
        }
      });

      const res = await fetch("/api/request-trial", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit trial request");
      }

      setReferenceId(json.referenceId || "FYG-" + Math.floor(100000 + Math.random() * 900000));
      setSubmissionSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-full mb-3">
          REF: {referenceId}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Free Trial Request Submitted!
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed mb-6 text-sm sm:text-base">
          Thank you, <strong className="text-slate-900">{name}</strong>. Your trial assets and specifications have been delivered directly to our senior production lead at <strong className="text-slate-900">imon.khan@foryourgoal.com</strong>.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-lg mx-auto text-left mb-8 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm mb-1">
            <Clock className="w-4 h-4 text-blue-600" />
            What happens next?
          </div>
          <div>• Our lead retoucher reviews your images and editing instructions.</div>
          <div>• Sample calibrated edits and custom quotation returned within <strong>6–12 hours</strong>.</div>
          <div>• Confirmation sent to: <span className="font-mono text-slate-900 font-semibold">{email}</span>.</div>
        </div>

        <button
          onClick={() => {
            setSubmissionSuccess(false);
            setName("");
            setEmail("");
            setMessage("");
            setDriveLink("");
            setFiles([null, null, null, null, null]);
          }}
          className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-sm font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition"
        >
          Submit Another Request
        </button>
        <a
          href={`https://wa.me/8801772866884?text=${encodeURIComponent(
            `Hello For Your Goal Team, I just submitted free trial request. My name is ${name} and my email is ${email}. Please check my submission.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
        >
          <MessageSquare className="w-4 h-4" />
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  const slotLabels = ["First File", "Second File", "Third File", "Fourth File", "Fifth File"];

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
      {/* Bot Honeypot (Hidden) */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
          <div>{errorMessage}</div>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="form-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="form-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Email <span className="text-rose-500">*</span>
        </label>
        <input
          id="form-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="form-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Message
        </label>
        <textarea
          id="form-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-y"
        />
      </div>

      {/* Instructions callout notice exactly like Stencil */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-600 leading-relaxed">
        <p className="font-medium text-slate-700">
          You can upload maximum 5 photos via this form. Each photo maximum size limit is 3 MB. If you have more photos with higher sizes please share the public google drive/dropbox/WeTransfer link.
        </p>
      </div>

      {/* 5 File Upload Inputs */}
      <div className="space-y-4">
        {slotLabels.map((label, idx) => (
          <div key={idx} className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {label}
            </label>

            {files[idx] ? (
              <div className="flex items-center justify-between p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-xs">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-slate-800 truncate">{files[idx]?.name}</span>
                  <span className="text-slate-500 font-mono">
                    ({((files[idx]?.size || 0) / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  ref={fileInputRefs[idx]}
                  type="file"
                  accept="image/*,.psd,.tiff,.tif,.raw,.cr2,.nef"
                  onChange={(e) => handleFileChange(idx, e)}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer border border-slate-300 rounded-lg bg-white focus:outline-none"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Public Drive Link */}
      <div>
        <label htmlFor="form-drive-link" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Please provide public Google Drive / Dropbox / WeTransfer Link
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <LinkIcon className="w-4 h-4" />
          </div>
          <input
            id="form-drive-link"
            type="url"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            placeholder="Link"
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Free Trial Request...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Request Free Trial
            </>
          )}
        </button>
      </div>

      {/* Confidentiality & SLA footer */}
      <div className="flex items-center justify-center gap-6 pt-3 text-[11px] text-slate-500 border-t border-slate-100">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Strict Enterprise NDA
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          ~6–12 Hours Turnaround
        </span>
      </div>
    </form>
  );
}
