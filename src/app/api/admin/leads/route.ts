import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/admin-auth";
import {
  getLeads,
  updateLeadStatus,
  deleteLead,
  addLead,
  getLeadsSummary,
} from "@/lib/leads-store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;

  const leads = await getLeads({ status, search });
  const summary = await getLeadsSummary();

  return NextResponse.json({
    success: true,
    leads,
    summary,
  });
}

export async function PATCH(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Lead ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await updateLeadStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update lead" },
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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const deleted = await deleteLead(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to delete lead" },
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
    const newLead = await addLead(body);
    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to add lead" },
      { status: 500 }
    );
  }
}
