"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, CheckCircle2, Image as ImageIcon, Loader2, ExternalLink, X } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  category?: string;
  onUploaded?: (item: any) => void;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  description,
  category = "general",
  onUploaded,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImgError(false);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("title", file.name);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      const uploadedUrl = data.url || data.mediaItem?.url;
      if (!uploadedUrl) {
        throw new Error("No URL returned from server");
      }

      setImgError(false);
      onChange(uploadedUrl);
      if (onUploaded && data.mediaItem) {
        onUploaded(data.mediaItem);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to upload file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        {description && (
          <span className="text-xs text-slate-400">{description}</span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Preview thumbnail */}
        <div className="w-20 h-16 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden relative shrink-0 flex items-center justify-center shadow-inner group">
          {value && !imgError ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                onError={() => setImgError(true)}
              />
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                title="Open image preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <ImageIcon className="w-5 h-5 text-slate-400" />
              {imgError && (
                <span className="text-[9px] text-rose-500 font-bold mt-0.5">404</span>
              )}
            </div>
          )}
        </div>

        {/* Input & Upload Button */}
        <div className="flex-1 w-full space-y-1.5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g. /images/... or https://..."
                className="w-full px-3 py-2 pr-7 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono shadow-sm"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded"
                  title="Clear input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5 transition-colors shrink-0 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </>
              )}
            </button>
          </div>
          {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
}
