import fs from "node:fs";
import path from "node:path";

export interface InquiryRecord {
  id: string;
  timestamp: string;
  fullName: string;
  email: string;
  company: string;
  website?: string;
  phone?: string;
  services: string[];
  volume: string;
  deadline: string;
  exportFormat?: string;
  brief: string;
  ndaAgreed: boolean;
  isSampleTrial: boolean;
  fileUploads?: string[];
  ip: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

export function saveInquiry(record: InquiryRecord): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let list: InquiryRecord[] = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      try {
        const raw = fs.readFileSync(INQUIRIES_FILE, "utf-8");
        list = JSON.parse(raw);
        if (!Array.isArray(list)) list = [];
      } catch {
        list = [];
      }
    }

    list.unshift(record); // Prepend newest first
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[InquiryStore] Failed to save record:", err);
    return false;
  }
}
