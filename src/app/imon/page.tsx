"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  ShieldCheck,
  ExternalLink,
  LogOut,
  Search,
  Filter,
  RefreshCw,
  Download,
  Plus,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderOpen,
  Lock,
  User,
  KeyRound,
  Eye,
  Trash2,
  X,
  Server,
  Cpu,
  ChevronRight,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

interface Lead {
  id: string;
  referenceId: string;
  type: "trial" | "quote" | "contact";
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  serviceType: string;
  turnaround?: string;
  instructions: string;
  driveLink?: string;
  fileCount: number;
  fileNames?: string[];
  clientIp?: string;
  status: "Pending" | "Contacted" | "In Production" | "Completed" | "Archived";
  createdAt: string;
  notes?: string;
}

interface Summary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  totalFiles: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "blogs" | "security" | "shortcuts">("overview");

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [summary, setSummary] = useState<Summary>({ total: 0, pending: 0, inProgress: 0, completed: 0, totalFiles: 0 });
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
          fetchLeads();
          return;
        }
      }
      setIsAuthenticated(false);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Login failed. Please check credentials.");
        setLoginLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setUser(data.user);
      fetchLeads();
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setPassword("");
    }
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const query = new URLSearchParams();
      if (statusFilter !== "All") query.set("status", statusFilter);
      if (searchTerm) query.set("search", searchTerm);

      const res = await fetch(`/api/admin/leads?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        if (data.summary) setSummary(data.summary);
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [statusFilter, searchTerm, isAuthenticated]);

  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(data.lead);
        }
        // Update summary
        setSummary((prev) => {
          const oldStatus = selectedLead?.status || "Pending";
          let pending = prev.pending;
          let completed = prev.completed;
          let inProgress = prev.inProgress;

          if (oldStatus === "Pending") pending--;
          if (oldStatus === "Completed") completed--;
          if (oldStatus === "In Production" || oldStatus === "Contacted") inProgress--;

          if (newStatus === "Pending") pending++;
          if (newStatus === "Completed") completed++;
          if (newStatus === "In Production" || newStatus === "Contacted") inProgress++;

          return { ...prev, pending, completed, inProgress };
        });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const exportCSV = () => {
    const headers = [
      "Reference ID",
      "Type",
      "Date",
      "Client Name",
      "Email",
      "Company",
      "Phone",
      "Service",
      "Files Count",
      "Drive Link",
      "Status",
      "Instructions",
      "Client IP",
    ];

    const rows = leads.map((l) => [
      `"${l.referenceId}"`,
      `"${l.type}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${(l.company || "—").replace(/"/g, '""')}"`,
      `"${l.phone || "—"}"`,
      `"${l.serviceType}"`,
      l.fileCount,
      `"${l.driveLink || "—"}"`,
      `"${l.status}"`,
      `"${(l.instructions || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${l.clientIp || "—"}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `foryourgoal_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loading splash while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-300">
          <RefreshCw className="w-8 h-8 animate-spin text-indigo-400" />
          <span className="text-sm font-semibold tracking-wider uppercase">Loading Admin Console...</span>
        </div>
      </div>
    );
  }

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-indigo-600 selection:text-white">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-8 relative">
            <div className="mb-4 p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 shadow-inner">
              <Logo />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 text-xs font-semibold mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Enterprise Admin Portal</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Foryourgoal Admin</h1>
            <p className="text-sm text-slate-400 mt-1">Authorized personnel authentication console</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                User ID / Administrator
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="imon.khan@foryourgoal.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Access Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>End-to-End Encrypted Session • SHA-256 Auth</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD (Edge-to-Edge with Side Nav)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-indigo-600 selection:text-white">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 text-slate-300">
        {/* Brand / Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-2 rounded-xl">
              <Logo />
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-tight">Foryourgoal</div>
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Admin v2.4</div>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "leads"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              <span>Inquiries (CRM)</span>
            </div>
            {summary.pending > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                {summary.pending}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "blogs"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles (CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "security"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Health</span>
          </button>

          <button
            onClick={() => setActiveTab("shortcuts")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "shortcuts"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Shortcuts & Mail</span>
          </button>
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-sm">
              IK
            </div>
            <div className="overflow-hidden">
              <div className="text-white text-xs font-bold truncate">Imon Khan</div>
              <div className="text-[11px] text-slate-400 truncate">imon.khan@foryourgoal.com</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-400 hover:bg-rose-900/80 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "leads" && "CRM Inquiries & Sample Submissions"}
              {activeTab === "blogs" && "Content Management (Blogs & Articles)"}
              {activeTab === "security" && "System Infrastructure & Security Logs"}
              {activeTab === "shortcuts" && "Quick Shortcuts & Services"}
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System Healthy
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchLeads()}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-xs font-bold flex items-center gap-1.5"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={exportCSV}
              className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-all text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === "overview" && (
          <div className="p-6 sm:p-8 space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Inquiries</div>
                  <div className="text-3xl font-black text-slate-900 mt-1">{summary.total}</div>
                  <div className="text-xs text-indigo-600 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Free Trial & Quotes</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600">
                  <Inbox className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Review</div>
                  <div className="text-3xl font-black text-amber-600 mt-1">{summary.pending}</div>
                  <div className="text-xs text-amber-600 font-semibold mt-1">Requires Assignment</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">In Production</div>
                  <div className="text-3xl font-black text-blue-600 mt-1">{summary.inProgress}</div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">Quality Checking</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
                  <FolderOpen className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed & Delivered</div>
                  <div className="text-3xl font-black text-emerald-600 mt-1">{summary.completed}</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">100% Quality Pass</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Leads Table */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Customer Inquiries</h3>
                  <p className="text-xs text-slate-500">Latest Free Trial and Quote submissions from web visitors</p>
                </div>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>View All Inquiries</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Files</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-3 px-4 font-mono font-bold text-xs text-indigo-600">{l.referenceId}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{l.fullName}</div>
                          <div className="text-xs text-slate-500">{l.email}</div>
                        </td>
                        <td className="py-3 px-4 text-xs font-medium text-slate-700">{l.serviceType}</td>
                        <td className="py-3 px-4 text-xs font-bold text-slate-900">
                          {l.fileCount > 0 ? `${l.fileCount} files` : l.driveLink ? "Drive Link" : "—"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              l.status === "Pending"
                                ? "bg-amber-100 text-amber-800"
                                : l.status === "In Production" || l.status === "Contacted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {l.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedLead(l)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 font-bold text-xs"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CRM & LEADS INQUIRIES */}
        {activeTab === "leads" && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Search and Filters Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search client, email, ref ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {["All", "Pending", "Contacted", "In Production", "Completed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      statusFilter === s
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Reference</th>
                      <th className="py-3.5 px-4">Client Details</th>
                      <th className="py-3.5 px-4">Service</th>
                      <th className="py-3.5 px-4">Files & Links</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                          No leads or inquiries match the selected criteria.
                        </td>
                      </tr>
                    ) : (
                      leads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/80 transition-all">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-xs text-indigo-600 block">{l.referenceId}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {l.type === "trial" ? "Free Trial" : "Quote"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{l.fullName}</div>
                            <div className="text-xs text-slate-500">{l.email}</div>
                            {l.phone && l.phone !== "—" && (
                              <div className="text-xs text-slate-400">{l.phone}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-xs font-bold text-slate-800">{l.serviceType}</div>
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">{l.instructions}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              {l.fileCount > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
                                  {l.fileCount} files
                                </span>
                              )}
                              {l.driveLink && l.driveLink !== "—" && (
                                <a
                                  href={l.driveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1"
                                  title="Open Drive Link"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(l.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                l.status === "Pending"
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : l.status === "In Production"
                                  ? "bg-indigo-100 text-indigo-800 border border-indigo-300"
                                  : l.status === "Contacted"
                                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                                  : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              }`}
                            >
                              {l.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedLead(l)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <a
                                href={`mailto:${l.email}?subject=Regarding Your Foryourgoal Request (${l.referenceId})`}
                                className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600"
                                title="Email Client"
                              >
                                <Mail className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => handleDeleteLead(l.id)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BLOGS & ARTICLES CMS */}
        {activeTab === "blogs" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Articles & E-Commerce Guides</h3>
                <p className="text-xs text-slate-500">Live published guides driving SEO and client education</p>
              </div>
              <Link
                href="/blog"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Blog</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Amazon Product Image Requirements 2026: Avoiding Suppression",
                  slug: "amazon-product-image-requirements-2026",
                  category: "E-Commerce Strategy",
                  readTime: "5 min read",
                  author: "Tariqul Islam",
                },
                {
                  title: "Automated AI vs Hand-Drawn Clipping Paths: The Truth",
                  slug: "automated-ai-vs-hand-drawn-clipping-paths",
                  category: "Industry Analysis",
                  readTime: "6 min read",
                  author: "Elena Rostova",
                },
                {
                  title: "Ghost Mannequin Guide for High-Volume Fashion Brands",
                  slug: "ghost-mannequin-guide-fashion-brands",
                  category: "Apparel Photography",
                  readTime: "7 min read",
                  author: "Imon Khan",
                },
                {
                  title: "High-End Jewelry Retouching: Sparkle and Reflection Physics",
                  slug: "high-end-jewelry-retouching-secrets",
                  category: "Luxury E-Commerce",
                  readTime: "6 min read",
                  author: "Marcus Vance",
                },
              ].map((blog) => (
                <div key={blog.slug} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 inline-block mb-3">
                      {blog.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base leading-snug">{blog.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-3">
                      <span>By {blog.author}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]">/blog/{blog.slug}</span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Live</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & HEALTH */}
        {activeTab === "security" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="p-3 w-fit rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">Application Firewall (WAF)</h4>
                <p className="text-xs text-slate-500 mt-1">Sliding-window rate limiter & IP throttler active.</p>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>5 req/min strict threshold</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="p-3 w-fit rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                  <Server className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">Local SMTP Mail Relay</h4>
                <p className="text-xs text-slate-500 mt-1">Direct Docker bridge 172.17.0.1:25 active.</p>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-indigo-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Delivers to imon.khan@foryourgoal.com</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600 mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">Magic Byte Inspection</h4>
                <p className="text-xs text-slate-500 mt-1">File header validation rejects disguised malware.</p>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-purple-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>JPEG, PNG, TIFF, PSD verified</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Server Security Headers (Live Verified)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-700 block">Content-Security-Policy</span>
                  <span className="text-slate-500">default-src 'self' (Strict script/style policies)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-700 block">Strict-Transport-Security (HSTS)</span>
                  <span className="text-slate-500">max-age=63072000; includeSubDomains; preload</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-700 block">X-Frame-Options</span>
                  <span className="text-slate-500">SAMEORIGIN (Anti-Clickjacking)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-700 block">X-Content-Type-Options</span>
                  <span className="text-slate-500">nosniff (Anti-MIME Sniffing)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: QUICK SHORTCUTS */}
        {activeTab === "shortcuts" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <a
                href="https://mail.foryourgoal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 w-fit mb-4 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Webmail Console</h4>
                  <p className="text-xs text-slate-500 mt-1">Direct access to imon.khan@foryourgoal.com inbox.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-indigo-600 flex items-center gap-1">
                  <span>Open Webmail</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href="/request-free-trial"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit mb-4 group-hover:scale-105 transition-transform">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Free Trial Form</h4>
                  <p className="text-xs text-slate-500 mt-1">5-slot multi-upload Stencil-parity client page.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <span>Open Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href="/request-a-quote"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 rounded-xl bg-purple-50 text-purple-600 w-fit mb-4 group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Commercial Quote Page</h4>
                  <p className="text-xs text-slate-500 mt-1">Custom B2B quotation request portal.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-purple-600 flex items-center gap-1">
                  <span>Open Quote Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600">{selectedLead.referenceId}</span>
                <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">{selectedLead.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-indigo-600 font-bold hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block">Company</span>
                  <span className="font-semibold text-slate-800">{selectedLead.company || "—"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block">Phone / WhatsApp</span>
                  <span className="font-semibold text-slate-800">{selectedLead.phone || "—"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block">Service Requested</span>
                  <span className="font-bold text-slate-900">{selectedLead.serviceType}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Instructions / Notes</span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 whitespace-pre-line leading-relaxed">
                  {selectedLead.instructions || "No specific instructions provided."}
                </div>
              </div>

              {selectedLead.driveLink && selectedLead.driveLink !== "—" && (
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Drive / Download Link</span>
                  <a
                    href={selectedLead.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-between hover:bg-indigo-100 transition-all"
                  >
                    <span className="truncate">{selectedLead.driveLink}</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              )}

              {selectedLead.fileNames && selectedLead.fileNames.length > 0 && (
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">
                    Uploaded Files ({selectedLead.fileNames.length})
                  </span>
                  <ul className="space-y-1">
                    {selectedLead.fileNames.map((fn, idx) => (
                      <li key={idx} className="p-2 rounded-lg bg-slate-100 font-mono text-xs text-slate-700">
                        {fn}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Status Update Control */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-500">Update Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as any)}
                    disabled={updatingStatus}
                    className="py-1.5 px-3 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Production">In Production</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href={`mailto:${selectedLead.email}?subject=Foryourgoal: Order Update (${selectedLead.referenceId})`}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Client</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
