"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteContent, ServiceItem, PortfolioItem, FaqItem, MediaItem } from "@/lib/site-content";
import { ImageUploadField } from "./ImageUploadField";
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  Home,
  Layers,
  Image as ImageIcon,
  HelpCircle,
  FolderOpen,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Upload,
  Eye,
  X,
  Search,
  RefreshCw,
  ZoomIn,
} from "lucide-react";

interface CmsContentManagerProps {
  initialSubTab?: "global" | "homepage" | "services" | "portfolio" | "faqs" | "media";
}

export function CmsContentManager({ initialSubTab = "homepage" }: CmsContentManagerProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    "global" | "homepage" | "services" | "portfolio" | "faqs" | "media"
  >(initialSubTab);

  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Services accordion state
  const [expandedService, setExpandedService] = useState<string | null>("clipping-path");
  // Portfolio accordion state
  const [expandedPortfolio, setExpandedPortfolio] = useState<string | null>("port-1");
  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Copy notification for media URLs
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Direct Gallery Upload State
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadError, setGalleryUploadError] = useState("");
  const galleryFileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Lightbox Preview Modal State
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);
  const [previewModalTitle, setPreviewModalTitle] = useState<string>("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/content");
      if (!res.ok) throw new Error("Failed to load site content");
      const data = await res.json();
      setContent(data.content);
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    if (!content) return;
    setSaving(true);
    setSaveSuccess(false);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save content");
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err?.message || "Error saving content");
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (
      !confirm(
        "Are you sure you want to reset all site content to original defaults? Any custom edits will be archived in the backup file."
      )
    ) {
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContent(data.content);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to reset");
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setGalleryUploading(true);
    setGalleryUploadError("");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", "gallery");
        formData.append("title", file.name.replace(/\.[^/.]+$/, ""));

        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || `Failed to upload ${file.name}`);
        }
      }

      // Refresh content to update media gallery
      await fetchContent();
    } catch (err: any) {
      setGalleryUploadError(err?.message || "Failed to upload image");
    } finally {
      setGalleryUploading(false);
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteMedia = async (url: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await fetchContent();
      } else {
        alert(data.error || "Failed to delete media");
      }
    } catch (err: any) {
      alert(err?.message || "Error deleting media");
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-semibold text-slate-700">Loading CMS Store...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800">
        <div className="flex items-center gap-2 font-bold mb-2">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <span>Error Loading Content</span>
        </div>
        <p className="text-sm">{errorMessage || "Unable to retrieve site content from data store."}</p>
        <button
          onClick={fetchContent}
          className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top CMS Header & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Visual CMS & Live Content Controller</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Live Connected
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Edit all texts, before/after image pairs, services, pricing and FAQs. Changes publish directly to the live site.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleResetDefaults}
            disabled={saving}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 border border-slate-200 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            title="Roll back all sections to original defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Live Site...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Publish Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Toasts */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>All changes published successfully! Live website cache updated.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Sub Tabs Pill Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/70 rounded-2xl w-full border border-slate-300/60">
        <button
          onClick={() => setActiveSubTab("homepage")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "homepage"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home & Hero</span>
        </button>

        <button
          onClick={() => setActiveSubTab("services")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "services"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Services ({content.servicesSection?.services?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("portfolio")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "portfolio"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Portfolio ({content.portfolioSection?.items?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("faqs")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "faqs"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQs ({content.faqs?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("global")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "global"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Global & Brand</span>
        </button>

        <button
          onClick={() => setActiveSubTab("media")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "media"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Media Gallery ({content.mediaGallery?.length || 0})</span>
        </button>
      </div>

      {/* TAB CONTENT PANELS */}

      {/* 1. HOMEPAGE TAB */}
      {activeSubTab === "homepage" && (
        <div className="space-y-6">
          {/* Hero Section Card */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Hero Section Content</h3>
              <p className="text-xs text-slate-500">Above the fold headline, badges, and comparison preview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Top Badge Text</label>
                <input
                  type="text"
                  value={content.hero.badgeText}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, badgeText: e.target.value } })
                  }
                  className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Heading Prefix</label>
                <input
                  type="text"
                  value={content.hero.headingPrefix}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, headingPrefix: e.target.value } })
                  }
                  className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Heading Gradient Text</label>
                <input
                  type="text"
                  value={content.hero.headingGradient}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, headingGradient: e.target.value } })
                  }
                  className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Featured Badge Label</label>
                <input
                  type="text"
                  value={content.hero.featuredBadge}
                  onChange={(e) =>
                    setContent({ ...content, hero: { ...content.hero, featuredBadge: e.target.value } })
                  }
                  className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Subheading Description</label>
              <textarea
                rows={3}
                value={content.hero.subheading}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, subheading: e.target.value } })
                }
                className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm leading-relaxed"
              />
            </div>

            {/* Hero Images Pair */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <ImageUploadField
                label="Hero Before Image"
                value={content.hero.featuredBeforeImage}
                onChange={(url) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, featuredBeforeImage: url },
                  })
                }
                category="hero"
              />
              <ImageUploadField
                label="Hero After Image"
                value={content.hero.featuredAfterImage}
                onChange={(url) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, featuredAfterImage: url },
                  })
                }
                category="hero"
              />
            </div>

            {/* Trust Pills */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Hero 3 Trust Badges
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={content.hero.trustPill1Title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, trustPill1Title: e.target.value },
                      })
                    }
                    className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                    placeholder="Pill 1 Title"
                  />
                  <input
                    type="text"
                    value={content.hero.trustPill1Sub}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, trustPill1Sub: e.target.value },
                      })
                    }
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-500"
                    placeholder="Pill 1 Subtitle"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={content.hero.trustPill2Title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, trustPill2Title: e.target.value },
                      })
                    }
                    className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                    placeholder="Pill 2 Title"
                  />
                  <input
                    type="text"
                    value={content.hero.trustPill2Sub}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, trustPill2Sub: e.target.value },
                      })
                    }
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-500"
                    placeholder="Pill 2 Subtitle"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={content.hero.trustPill3Title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, trustPill3Title: e.target.value },
                      })
                    }
                    className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                    placeholder="Pill 3 Title"
                  />
                  <input
                    type="text"
                    value={content.hero.trustPill3Sub}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, trustPill3Sub: e.target.value },
                      })
                    }
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-500"
                    placeholder="Pill 3 Subtitle"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Performance Counter Stats (4 Blocks)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.stats.map((stat, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const next = [...content.stats];
                      next[idx].value = e.target.value;
                      setContent({ ...content, stats: next });
                    }}
                    className="w-full text-sm font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-indigo-700"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const next = [...content.stats];
                      next[idx].label = e.target.value;
                      setContent({ ...content, stats: next });
                    }}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Security & SLA Banner */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Security SLA & Quality Guarantee Section
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Section Heading</label>
                <input
                  type="text"
                  value={content.securitySection.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      securitySection: { ...content.securitySection, heading: e.target.value },
                    })
                  }
                  className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Badge Label</label>
                <input
                  type="text"
                  value={content.securitySection.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      securitySection: { ...content.securitySection, badge: e.target.value },
                    })
                  }
                  className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Section Description</label>
              <textarea
                rows={2}
                value={content.securitySection.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    securitySection: { ...content.securitySection, description: e.target.value },
                  })
                }
                className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Bottom Call-to-Action (CTA) Banner
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">CTA Heading</label>
                <input
                  type="text"
                  value={content.ctaBanner.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, heading: e.target.value },
                    })
                  }
                  className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">CTA Description</label>
                <input
                  type="text"
                  value={content.ctaBanner.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, description: e.target.value },
                    })
                  }
                  className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Quote Button Label</label>
                <input
                  type="text"
                  value={content.ctaBanner.quoteBtnText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, quoteBtnText: e.target.value },
                    })
                  }
                  className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Free Trial Button Label</label>
                <input
                  type="text"
                  value={content.ctaBanner.trialBtnText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, trialBtnText: e.target.value },
                    })
                  }
                  className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SERVICES TAB */}
      {activeSubTab === "services" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Total {content.servicesSection?.services?.length || 0} Core Services Active
            </span>
            <span className="text-xs text-slate-400">Click any service to expand and customize its copy & images</span>
          </div>

          <div className="space-y-3">
            {content.servicesSection?.services?.map((service, index) => {
              const isExpanded = expandedService === service.slug;
              return (
                <div
                  key={service.slug}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <div
                    onClick={() => setExpandedService(isExpanded ? null : service.slug)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-8 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.afterImage}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{service.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                          <span className="font-mono text-indigo-600">/{service.slug}</span>
                          <span>•</span>
                          <span>{service.turnaroundHours}h Turnaround</span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-700">{service.startingPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/services/${service.slug}`}
                        target="_blank"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-xs font-bold text-slate-700 uppercase">Service Title</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => {
                              const next = [...content.servicesSection.services];
                              next[index].title = e.target.value;
                              setContent({
                                ...content,
                                servicesSection: { ...content.servicesSection, services: next },
                              });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 uppercase">Starting Price</label>
                          <input
                            type="text"
                            value={service.startingPrice}
                            onChange={(e) => {
                              const next = [...content.servicesSection.services];
                              next[index].startingPrice = e.target.value;
                              setContent({
                                ...content,
                                servicesSection: { ...content.servicesSection, services: next },
                              });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-emerald-700 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase">Short Description (Cards)</label>
                        <input
                          type="text"
                          value={service.shortDesc}
                          onChange={(e) => {
                            const next = [...content.servicesSection.services];
                            next[index].shortDesc = e.target.value;
                            setContent({
                              ...content,
                              servicesSection: { ...content.servicesSection, services: next },
                            });
                          }}
                          className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase">Full Description (Detail Page)</label>
                        <textarea
                          rows={3}
                          value={service.fullDesc}
                          onChange={(e) => {
                            const next = [...content.servicesSection.services];
                            next[index].fullDesc = e.target.value;
                            setContent({
                              ...content,
                              servicesSection: { ...content.servicesSection, services: next },
                            });
                          }}
                          className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm leading-relaxed bg-white"
                        />
                      </div>

                      {/* Before / After Images for this service */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-xl border border-slate-200">
                        <ImageUploadField
                          label="Before Image (Original)"
                          value={service.beforeImage}
                          onChange={(url) => {
                            const next = [...content.servicesSection.services];
                            next[index].beforeImage = url;
                            setContent({
                              ...content,
                              servicesSection: { ...content.servicesSection, services: next },
                            });
                          }}
                          category="services"
                        />
                        <ImageUploadField
                          label="After Image (Retouched)"
                          value={service.afterImage}
                          onChange={(url) => {
                            const next = [...content.servicesSection.services];
                            next[index].afterImage = url;
                            setContent({
                              ...content,
                              servicesSection: { ...content.servicesSection, services: next },
                            });
                          }}
                          category="services"
                        />
                      </div>

                      {/* SEO Meta */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 uppercase">SEO Meta Title</label>
                          <input
                            type="text"
                            value={service.metaTitle || ""}
                            onChange={(e) => {
                              const next = [...content.servicesSection.services];
                              next[index].metaTitle = e.target.value;
                              setContent({
                                ...content,
                                servicesSection: { ...content.servicesSection, services: next },
                              });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 uppercase">SEO Meta Description</label>
                          <input
                            type="text"
                            value={service.metaDesc || ""}
                            onChange={(e) => {
                              const next = [...content.servicesSection.services];
                              next[index].metaDesc = e.target.value;
                              setContent({
                                ...content,
                                servicesSection: { ...content.servicesSection, services: next },
                              });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. PORTFOLIO TAB */}
      {activeSubTab === "portfolio" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Total {content.portfolioSection?.items?.length || 0} Case Studies & Comparisons
            </span>
            <button
              type="button"
              onClick={() => {
                const newItem: PortfolioItem = {
                  id: `port-${Date.now()}`,
                  title: "New Retouching Case Study",
                  serviceSlug: "clipping-path",
                  industrySlug: "fashion-apparel",
                  category: "Clipping Path",
                  beforeImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
                  afterImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80&sat=-100",
                  description: "High precision pen tool clipping and background isolation.",
                  technique: "Vector Pen Tool",
                  volume: "500 images/batch",
                };
                const next = [newItem, ...(content.portfolioSection?.items || [])];
                setContent({
                  ...content,
                  portfolioSection: { ...content.portfolioSection, items: next },
                });
                setExpandedPortfolio(newItem.id);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Case Study</span>
            </button>
          </div>

          <div className="space-y-3">
            {content.portfolioSection?.items?.map((item, index) => {
              const isExpanded = expandedPortfolio === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
                >
                  <div
                    onClick={() => setExpandedPortfolio(isExpanded ? null : item.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-8 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.afterImage}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                          <span className="font-semibold text-indigo-600">{item.category}</span>
                          <span>•</span>
                          <span>{item.technique}</span>
                          <span>•</span>
                          <span>{item.volume}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete portfolio item "${item.title}"?`)) {
                            const next = content.portfolioSection.items.filter((p) => p.id !== item.id);
                            setContent({
                              ...content,
                              portfolioSection: { ...content.portfolioSection, items: next },
                            });
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-xs font-bold text-slate-700 uppercase">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const next = [...content.portfolioSection.items];
                              next[index].title = e.target.value;
                              setContent({
                                ...content,
                                portfolioSection: { ...content.portfolioSection, items: next },
                              });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 uppercase">Category Tag</label>
                          <input
                            type="text"
                            value={item.category}
                            onChange={(e) => {
                              const next = [...content.portfolioSection.items];
                              next[index].category = e.target.value;
                              setContent({
                                ...content,
                                portfolioSection: { ...content.portfolioSection, items: next },
                              });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 uppercase">Technique Used</label>
                          <input
                            type="text"
                            value={item.technique}
                            onChange={(e) => {
                              const next = [...content.portfolioSection.items];
                              next[index].technique = e.target.value;
                              setContent({
                                ...content,
                                portfolioSection: { ...content.portfolioSection, items: next },
                              });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 uppercase">Volume Metric</label>
                          <input
                            type="text"
                            value={item.volume}
                            onChange={(e) => {
                              const next = [...content.portfolioSection.items];
                              next[index].volume = e.target.value;
                              setContent({
                                ...content,
                                portfolioSection: { ...content.portfolioSection, items: next },
                              });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase">Description</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const next = [...content.portfolioSection.items];
                            next[index].description = e.target.value;
                            setContent({
                              ...content,
                              portfolioSection: { ...content.portfolioSection, items: next },
                            });
                          }}
                          className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white leading-relaxed"
                        />
                      </div>

                      {/* Before / After Pair for Portfolio */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-xl border border-slate-200">
                        <ImageUploadField
                          label="Original RAW/Input Image"
                          value={item.beforeImage}
                          onChange={(url) => {
                            const next = [...content.portfolioSection.items];
                            next[index].beforeImage = url;
                            setContent({
                              ...content,
                              portfolioSection: { ...content.portfolioSection, items: next },
                            });
                          }}
                          category="portfolio"
                        />
                        <ImageUploadField
                          label="Finished Retouched Image"
                          value={item.afterImage}
                          onChange={(url) => {
                            const next = [...content.portfolioSection.items];
                            next[index].afterImage = url;
                            setContent({
                              ...content,
                              portfolioSection: { ...content.portfolioSection, items: next },
                            });
                          }}
                          category="portfolio"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. FAQS TAB */}
      {activeSubTab === "faqs" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Total {content.faqs?.length || 0} FAQs Configured
            </span>
            <button
              type="button"
              onClick={() => {
                const newFaq: FaqItem = {
                  id: `faq-${Date.now()}`,
                  question: "What is your typical turnaround time for high volume orders?",
                  answer: "Standard turnaround is 12-24 hours for batches up to 2,000 images. Urgent rush deliveries can be delivered in as little as 6 hours.",
                  category: "General & Production",
                };
                setContent({ ...content, faqs: [newFaq, ...content.faqs] });
                setExpandedFaq(newFaq.id);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {content.faqs?.map((faq, index) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
                >
                  <div
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                      <div className="text-xs text-indigo-600 font-semibold mt-0.5">{faq.category}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Delete this question?")) {
                            setContent({
                              ...content,
                              faqs: content.faqs.filter((f) => f.id !== faq.id),
                            });
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-xs font-bold text-slate-700 uppercase">Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const next = [...content.faqs];
                              next[index].question = e.target.value;
                              setContent({ ...content, faqs: next });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 uppercase">Category Tag</label>
                          <input
                            type="text"
                            value={faq.category}
                            onChange={(e) => {
                              const next = [...content.faqs];
                              next[index].category = e.target.value;
                              setContent({ ...content, faqs: next });
                            }}
                            className="w-full mt-1.5 px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase">Answer Body</label>
                        <textarea
                          rows={4}
                          value={faq.answer}
                          onChange={(e) => {
                            const next = [...content.faqs];
                            next[index].answer = e.target.value;
                            setContent({ ...content, faqs: next });
                          }}
                          className="w-full mt-1.5 px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm leading-relaxed bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. GLOBAL & BRAND TAB */}
      {activeSubTab === "global" && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Brand Identity & Contact Metadata</h3>
            <p className="text-xs text-slate-500">Global site title, contact emails, phone, and addresses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Site Brand Name</label>
              <input
                type="text"
                value={content.global.brandName}
                onChange={(e) =>
                  setContent({
                    ...content,
                    global: { ...content.global, brandName: e.target.value },
                  })
                }
                className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Brand Tagline</label>
              <input
                type="text"
                value={content.global.tagline}
                onChange={(e) =>
                  setContent({
                    ...content,
                    global: { ...content.global, tagline: e.target.value },
                  })
                }
                className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Customer Support Email</label>
              <input
                type="email"
                value={content.global.supportEmail}
                onChange={(e) =>
                  setContent({
                    ...content,
                    global: { ...content.global, supportEmail: e.target.value },
                  })
                }
                className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono text-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Contact Phone</label>
              <input
                type="text"
                value={content.global.contactPhone}
                onChange={(e) =>
                  setContent({
                    ...content,
                    global: { ...content.global, contactPhone: e.target.value },
                  })
                }
                className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Turnaround Badge</label>
              <input
                type="text"
                value={content.global.turnaroundBadge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    global: { ...content.global, turnaroundBadge: e.target.value },
                  })
                }
                className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Craft Guarantee Badge</label>
              <input
                type="text"
                value={content.global.craftBadge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    global: { ...content.global, craftBadge: e.target.value },
                  })
                }
                className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase">Production Hub Address</label>
            <input
              type="text"
              value={content.global.address}
              onChange={(e) =>
                setContent({
                  ...content,
                  global: { ...content.global, address: e.target.value },
                })
              }
              className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase">Footer Short Bio</label>
            <textarea
              rows={3}
              value={content.global.companyBio}
              onChange={(e) =>
                setContent({
                  ...content,
                  global: { ...content.global, companyBio: e.target.value },
                })
              }
              className="w-full mt-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-sm leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* 6. MEDIA GALLERY TAB */}
      {activeSubTab === "media" && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-indigo-600" />
                CMS Asset Storage & Media Gallery
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload new photos directly to server storage (<code className="text-indigo-600 font-mono">/public/uploads/cms/</code>) or copy URLs to paste into any Service/Portfolio field.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 bg-slate-100 rounded-xl text-slate-700 border border-slate-200">
                {content.mediaGallery?.length || 0} Assets Stored
              </span>
              
              <input
                type="file"
                ref={galleryFileInputRef}
                onChange={handleGalleryUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button
                type="button"
                disabled={galleryUploading}
                onClick={() => galleryFileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {galleryUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading Image...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Image</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {galleryUploadError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{galleryUploadError}</span>
            </div>
          )}

          {copiedUrl && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Copied image URL to clipboard: {copiedUrl}</span>
            </div>
          )}

          {/* Direct Drag & Drop or Click Upload Banner */}
          <div
            onClick={() => galleryFileInputRef.current?.click()}
            className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50/80 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold text-slate-800">
              Click or drag images here to upload
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Supports JPEG, PNG, WEBP, SVG up to 25MB. Images are saved instantly and get an ultra-fast CDN URL.
            </p>
          </div>

          {(!content.mediaGallery || content.mediaGallery.length === 0) ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
              <FolderOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No Custom Uploads Stored Yet</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Use the upload button above to add images directly to the media gallery.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {content.mediaGallery.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.name || "asset"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white">
                        {item.size || "Image"}
                      </span>
                    </div>

                    {/* Quick View Button on Hover */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewModalUrl(item.url);
                          setPreviewModalTitle(item.name || "Preview");
                        }}
                        className="p-2 bg-white/90 hover:bg-white text-slate-800 rounded-lg shadow transition-colors"
                        title="View Full Preview"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(item.url);
                        }}
                        className="p-2 bg-white/90 hover:bg-white text-indigo-600 rounded-lg shadow transition-colors"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 space-y-1.5 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-900 truncate" title={item.name}>
                      {item.name}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : ""}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.url)}
                          className="p-1 text-slate-500 hover:text-indigo-600 rounded hover:bg-slate-100 flex items-center gap-1 transition-colors"
                          title="Copy Relative URL"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteMedia(item.url)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                          title="Delete from Media Library"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Full Screen Image Preview Modal */}
          {previewModalUrl && (
            <div
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
              onClick={() => setPreviewModalUrl(null)}
            >
              <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-bold text-slate-900 truncate">{previewModalTitle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(previewModalUrl)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </button>
                    <a
                      href={previewModalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setPreviewModalUrl(null)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-slate-950 flex items-center justify-center overflow-auto max-h-[75vh]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewModalUrl}
                    alt={previewModalTitle}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                  />
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>URL: {previewModalUrl}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
