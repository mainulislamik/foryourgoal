import fs from "fs/promises";
import path from "path";

export interface Lead {
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

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead_trial_314820",
    referenceId: "FYG-TRIAL-314820",
    type: "trial",
    fullName: "Nordic E-com Studio",
    email: "test.client@foryourgoal.com",
    company: "Nordic Commerce ApS",
    phone: "+45 20 12 34 56",
    serviceType: "Clipping Path & Background Removal",
    turnaround: "12h Rush",
    instructions: "Please clip the apparel items on pure white #FFFFFF background with natural soft drop shadow.",
    driveLink: "https://drive.google.com/drive/folders/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs",
    fileCount: 5,
    fileNames: ["dress_front.jpg", "dress_back.jpg", "jacket_detail.jpg", "shoes_pair.jpg", "accessories.png"],
    clientIp: "103.145.118.22",
    status: "Completed",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    notes: "Verified test submission delivered to imon.khan@foryourgoal.com",
  },
  {
    id: "lead_quote_892140",
    referenceId: "FYG-QUOTE-892140",
    type: "quote",
    fullName: "Alexander Wright",
    email: "alexander.wright@luxurybrand.co.uk",
    company: "Wright & Co. London",
    phone: "+44 7700 900077",
    serviceType: "Jewelry Photo Retouching",
    turnaround: "24h Standard",
    instructions: "High-end diamond ring and necklace retouching. Require sparkle enhancement, metal smoothing, and reflection removal.",
    driveLink: "https://www.dropbox.com/sh/luxury_jewelry_batch_q2",
    fileCount: 4,
    fileNames: ["ring_solitaire_01.tif", "ring_solitaire_02.tif", "necklace_gold.tif", "earrings_emerald.tif"],
    clientIp: "185.122.40.15",
    status: "Contacted",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    notes: "Sent sample evaluation and commercial rate sheet.",
  },
  {
    id: "lead_trial_550211",
    referenceId: "FYG-TRIAL-550211",
    type: "trial",
    fullName: "Elena Rostova",
    email: "elena@modeberlin.de",
    company: "Mode Berlin GmbH",
    phone: "+49 30 1234567",
    serviceType: "Ghost Mannequin & Neck Joint",
    turnaround: "6h Urgent",
    instructions: "Need 3D ghost mannequin effect with collar neck joint for winter jacket collection.",
    driveLink: "https://wetransfer.com/downloads/mode_berlin_samples",
    fileCount: 3,
    fileNames: ["parka_front.jpg", "parka_inner_collar.jpg", "hoodie_joint.jpg"],
    clientIp: "88.198.54.2",
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    notes: "Awaiting designer team assignment.",
  },
];

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(LEADS_FILE);
    } catch {
      await fs.writeFile(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Error ensuring leads data file:", err);
  }
}

export async function getLeads(options?: { status?: string; search?: string }): Promise<Lead[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    let data: Lead[] = JSON.parse(raw);

    if (options?.status && options.status !== "All") {
      data = data.filter((l) => l.status.toLowerCase() === options.status?.toLowerCase());
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      data = data.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.referenceId.toLowerCase().includes(q) ||
          (l.company && l.company.toLowerCase().includes(q)) ||
          l.serviceType.toLowerCase().includes(q)
      );
    }

    return data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.error("Failed to read leads:", err);
    return INITIAL_LEADS;
  }
}

export async function getLeadsSummary() {
  const leads = await getLeads();
  const total = leads.length;
  const pending = leads.filter((l) => l.status === "Pending").length;
  const inProgress = leads.filter((l) => l.status === "In Production" || l.status === "Contacted").length;
  const completed = leads.filter((l) => l.status === "Completed").length;
  const totalFiles = leads.reduce((acc, curr) => acc + (curr.fileCount || 0), 0);

  return {
    total,
    pending,
    inProgress,
    completed,
    totalFiles,
  };
}

export async function addLead(lead: Omit<Lead, "id" | "createdAt" | "status"> & { status?: Lead["status"] }): Promise<Lead> {
  await ensureDataFile();
  const leads = await getLeads();
  const newLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: lead.status || "Pending",
  };
  leads.unshift(newLead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead["status"], notes?: string): Promise<Lead | null> {
  await ensureDataFile();
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id || l.referenceId === id);
  if (index === -1) return null;
  leads[index].status = status;
  if (notes !== undefined) {
    leads[index].notes = notes;
  }
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
  return leads[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  await ensureDataFile();
  const leads = await getLeads();
  const filtered = leads.filter((l) => l.id !== id && l.referenceId !== id);
  if (filtered.length === leads.length) return false;
  await fs.writeFile(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}
