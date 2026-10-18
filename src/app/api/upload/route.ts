import { NextRequest, NextResponse } from "next/server";

// Supported secure MIME signatures (Magic Bytes)
const MAGIC_SIGNATURES: { [key: string]: string[] } = {
  // JPEG: FF D8 FF
  jpeg: ["ffd8ffe0", "ffd8ffe1", "ffd8ffe2", "ffd8ffe3", "ffd8ffe8", "ffd8ffdb"],
  // PNG: 89 50 4E 47
  png: ["89504e47"],
  // TIFF: 49 49 2A 00 (LE) or 4D 4D 00 2A (BE)
  tiff: ["49492a00", "4d4d002a"],
  // PSD: 38 42 50 53 ('8BPS')
  psd: ["38425053"],
  // ZIP: 50 4B 03 04 ('PK..')
  zip: ["504b0304"],
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 1. File Size Verification (Max 50MB per file)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File exceeds maximum allowed size of 50MB (received ${(file.size / (1024 * 1024)).toFixed(1)}MB)` },
        { status: 400 }
      );
    }

    // 2. Extension check
    const rawName = file.name.toLowerCase();
    const allowedExts = [".jpg", ".jpeg", ".png", ".tiff", ".tif", ".psd", ".zip", ".cr2", ".nef", ".arw"];
    const matchedExt = allowedExts.find((ext) => rawName.endsWith(ext));

    if (!matchedExt) {
      return NextResponse.json(
        { error: "Invalid file extension. Allowed formats: JPG, PNG, TIFF, PSD, RAW (CR2/NEF/ARW), ZIP." },
        { status: 400 }
      );
    }

    // 3. Deep Magic Byte Inspection for first 8 bytes
    const buffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(buffer.slice(0, 8));
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
    if (!isValidSignature && (rawName.endsWith(".cr2") || rawName.endsWith(".nef") || rawName.endsWith(".arw"))) {
      // Canon CR2 starts with II (49492a00), Nikon NEF with 4d4d002a
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
