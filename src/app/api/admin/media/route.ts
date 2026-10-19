import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/admin-auth";
import {
  getSiteContent,
  saveSiteContent,
  registerMediaItem,
  MediaItem,
} from "@/lib/site-content";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const CMS_UPLOAD_DIR = path.resolve(process.cwd(), "public/uploads/cms");

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const content = await getSiteContent();
    const media = content.mediaGallery || [];

    return NextResponse.json({
      success: true,
      media,
      count: media.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to load media" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    if (!fs.existsSync(CMS_UPLOAD_DIR)) {
      fs.mkdirSync(CMS_UPLOAD_DIR, { recursive: true });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const customTitle = formData.get("title") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Size limit: 25MB
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 25MB maximum limit" },
        { status: 400 }
      );
    }

    // Extension check
    const originalName = file.name || "upload.jpg";
    const ext = path.extname(originalName).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif", ".tiff", ".tif"];

    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json(
        { error: `File type not allowed. Allowed: ${allowedExtensions.join(", ")}` },
        { status: 400 }
      );
    }

    // Clean filename
    const baseName = path
      .basename(originalName, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);
    const uniqueFileName = `${Date.now()}-${baseName}${ext}`;
    const destinationPath = path.join(CMS_UPLOAD_DIR, uniqueFileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(destinationPath, buffer);

    const webUrl = `/uploads/cms/${uniqueFileName}`;
    const mediaItem: MediaItem = {
      url: webUrl,
      name: customTitle?.trim() || originalName,
      size: formatFileSize(file.size),
      uploadedAt: new Date().toISOString(),
    };

    await registerMediaItem(mediaItem);

    return NextResponse.json({
      success: true,
      message: "Media uploaded successfully",
      mediaItem,
    });
  } catch (err: any) {
    console.error("Error uploading media:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to upload media" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const content = await getSiteContent();
    content.mediaGallery = (content.mediaGallery || []).filter((m) => m.url !== url);
    await saveSiteContent(content);

    // If file is in public/uploads/cms, delete it
    if (url.startsWith("/uploads/cms/")) {
      const fileName = path.basename(url);
      const filePath = path.join(CMS_UPLOAD_DIR, fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.warn("Could not delete physical file:", unlinkErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to delete media" },
      { status: 500 }
    );
  }
}
