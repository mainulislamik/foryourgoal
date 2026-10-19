import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { checkRateLimit } from "@/lib/security";

// Allowed MIME types and corresponding extensions for production B2B imaging
const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "tif",
  "tiff",
  "psd",
  "raw",
  "cr2",
  "nef",
  "arw",
  "dng",
]);

// Magic number signatures (first bytes in hex) for deep file inspection
const MAGIC_SIGNATURES: Record<string, string[]> = {
  jpeg: ["ffd8ffe0", "ffd8ffe1", "ffd8ffe2", "ffd8ffdb", "ffd8ffee"],
  png: ["89504e47"],
  webp: ["52494646"], // RIFF header for WebP
  tiff: ["49492a00", "4d4d002a"], // Little-endian II and Big-endian MM
  psd: ["38425053"], // 8BPS Photoshop
};

const UPLOADS_DIR = path.join(process.cwd(), "data", "uploads");

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get("cf-connecting-ip")?.trim() ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip")?.trim() ||
      "127.0.0.1";

    const rate = checkRateLimit(`upload_${clientIp}`, 10, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Upload rate limit exceeded. Please wait a moment." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 50MB per file ceiling
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 50MB limit. For larger batches, please provide a WeTransfer or Google Drive link in project notes." },
        { status: 400 }
      );
    }

    const rawName = file.name.toLowerCase();
    const ext = rawName.split(".").pop();

    if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: "Unsupported format. Allowed: JPG, PNG, PSD, TIFF, RAW, CR2, NEF, ARW, DNG" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uint8 = new Uint8Array(bytes.slice(0, 16));
    const hexHeader = Array.from(uint8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    let isValidSignature = false;

    // Check if header matches known safe magic signatures
    for (const type of Object.keys(MAGIC_SIGNATURES)) {
      if (MAGIC_SIGNATURES[type].some((sig) => hexHeader.startsWith(sig))) {
        isValidSignature = true;
        break;
      }
    }

    // Handle RAW camera files where signatures vary
    if (!isValidSignature && (rawName.endsWith(".cr2") || rawName.endsWith(".nef") || rawName.endsWith(".arw") || rawName.endsWith(".dng"))) {
      if (hexHeader.startsWith("4949") || hexHeader.startsWith("4d4d")) {
        isValidSignature = true;
      }
    }

    if (!isValidSignature) {
      return NextResponse.json(
        { error: "Security Alert: File signature does not match declared image format." },
        { status: 400 }
      );
    }

    // Safe sanitized file reference
    const safeId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

    // Ensure staging directory exists and write file
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    const targetPath = path.join(UPLOADS_DIR, `${safeId}_${sanitizedName}`);
    fs.writeFileSync(targetPath, buffer);

    return NextResponse.json({
      success: true,
      fileId: safeId,
      originalName: sanitizedName,
      sizeBytes: file.size,
      message: "File verified and accepted into secure staging.",
    });
  } catch (error: any) {
    console.error("Upload validation error:", error);
    return NextResponse.json(
      { error: "Failed to process upload. Please try again." },
      { status: 500 }
    );
  }
}
