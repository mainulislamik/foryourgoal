import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/admin-auth";
import {
  getSiteContent,
  saveSiteContent,
  updateSiteContentSection,
  getDefaultSiteContent,
  SiteContent,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section") as keyof SiteContent | null;

    const content = await getSiteContent();

    if (section && content[section] !== undefined) {
      return NextResponse.json({
        success: true,
        section,
        data: content[section],
      });
    }

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch site content" },
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
    const body = await req.json();

    // Reset action
    if (body.action === "reset") {
      const defaults = getDefaultSiteContent();
      await saveSiteContent(defaults);
      return NextResponse.json({
        success: true,
        message: "Content reset to defaults",
        content: defaults,
      });
    }

    // Partial section update
    if (body.section && body.data !== undefined) {
      const section = body.section as keyof SiteContent;
      const updated = await updateSiteContentSection(section, body.data);
      return NextResponse.json({
        success: true,
        message: `Section ${section} updated successfully`,
        section,
        content: updated,
      });
    }

    // Full content replacement
    if (body.content) {
      const updated = await saveSiteContent(body.content);
      return NextResponse.json({
        success: true,
        message: "Full site content updated successfully",
        content: updated,
      });
    }

    return NextResponse.json(
      { error: "Invalid request payload. Expected 'section' + 'data' or 'content'." },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("Error saving site content:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to update site content" },
      { status: 500 }
    );
  }
}
