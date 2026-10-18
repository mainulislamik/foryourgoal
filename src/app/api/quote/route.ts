import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/mailer";
import { saveInquiry } from "@/lib/inquiryStore";

// Flexible server-side schema supporting both frontend and backend naming conventions
const quoteSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Valid email required").optional(),
  businessEmail: z.string().email("Valid email required").optional(),
  company: z.string().min(1, "Company name is required").optional(),
  companyName: z.string().min(1, "Company name is required").optional(),
  website: z.string().optional(),
  websiteUrl: z.string().optional(),
  phone: z.string().max(30).optional(),
  service: z.string().optional(),
  services: z.array(z.string()).optional(),
  volume: z.string().optional(),
  volumeTier: z.string().optional(),
  deadline: z.string().optional(),
  turnaround: z.string().optional(),
  exportFormat: z.string().optional(),
  fileFormats: z.array(z.string()).optional(),
  colorProfile: z.string().optional(),
  backgroundChoice: z.string().optional(),
  brief: z.string().optional(),
  briefNotes: z.string().optional(),
  projectBrief: z.string().optional(),
  ndaAgreed: z.boolean().optional(),
  ndaRequired: z.boolean().optional(),
  isSampleTrial: z.boolean().optional(),
  fileUploads: z.array(z.any()).optional(),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

// Simple in-memory rate limiting map for DoS / spam protection
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 3600000 }); // 1 hour window
    return true;
  }
  if (entry.count >= 25) {
    return false; // Max 25 submissions per hour per IP
  }
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions from this address. Please wait an hour or contact support@foryourgoal.com directly." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot spam check
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true, referenceId: "FYG-FILTERED" });
    }

    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const d = parsed.data;

    // Normalize field variations
    const clientEmail = d.businessEmail || d.email;
    if (!clientEmail) {
      return NextResponse.json(
        { error: "Validation failed", details: { email: ["Valid email is required"] } },
        { status: 400 }
      );
    }

    const company = d.companyName || d.company || "Independent Studio / Brand";
    const servicesList = d.services && d.services.length > 0 
      ? d.services 
      : (d.service ? [d.service] : ["Hand-Drawn Clipping Path & Commercial Retouching"]);
    const volume = d.volume || d.volumeTier || "50-250 images/mo";
    const turnaround = d.deadline || d.turnaround || "24 Hours";
    const brief = d.projectBrief || d.briefNotes || d.brief || "Standard Commercial Specifications";
    const nda = d.ndaAgreed ?? d.ndaRequired ?? true;
    const isTrial = d.isSampleTrial ?? false;

    const referenceId = `FYG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Persist to local JSON storage
    saveInquiry({
      id: referenceId,
      timestamp: new Date().toISOString(),
      fullName: d.fullName,
      email: clientEmail,
      company,
      website: d.websiteUrl || d.website,
      phone: d.phone,
      services: servicesList,
      volume,
      deadline: turnaround,
      exportFormat: d.exportFormat,
      brief,
      ndaAgreed: nda,
      isSampleTrial: isTrial,
      fileUploads: d.fileUploads,
      ip,
    });

    // 2. Dispatch internal alert email to production desk
    const alertHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
        <div style="background: #0f172a; padding: 24px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 700;">🎯 New B2B ${isTrial ? "Pilot Sample Trial" : "Quotation Request"}</h2>
          <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px; font-family: monospace;">Ref: ${referenceId} | ${new Date().toUTCString()}</p>
        </div>
        <div style="padding: 24px; color: #334155; line-height: 1.6; font-size: 14px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 140px;">Client Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${d.fullName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">Company / Brand:</td><td style="padding: 8px 0; color: #0f172a;">${company}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">Business Email:</td><td style="padding: 8px 0;"><a href="mailto:${clientEmail}" style="color: #247bff; text-decoration: none; font-weight: 600;">${clientEmail}</a></td></tr>
            ${d.website ? `<tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">Website:</td><td style="padding: 8px 0;"><a href="${d.website}" style="color: #247bff;">${d.website}</a></td></tr>` : ""}
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">Services:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${servicesList.join(", ")}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">Expected Volume:</td><td style="padding: 8px 0; color: #0f172a;">${volume}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">Turnaround SLA:</td><td style="padding: 8px 0; color: #0f172a;">${turnaround}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">Export Format:</td><td style="padding: 8px 0; color: #0f172a;">${d.exportFormat || "Default"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">NDA Protection:</td><td style="padding: 8px 0; color: #16a34a; font-weight: 600;">${nda ? "✓ Strictly Enforced" : "Standard"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; color: #64748b;">Uploaded Files:</td><td style="padding: 8px 0; color: #0f172a;">${d.fileUploads?.length || 0} file(s)</td></tr>
          </table>
          <div style="margin-top: 18px; padding: 14px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #247bff;">
            <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Project Brief & Notes:</strong>
            <p style="margin: 0; color: #475569; white-space: pre-wrap;">${brief}</p>
          </div>
        </div>
      </div>
    `;

    // Send async email notification (will not block the HTTP response if SMTP has lag)
    sendEmail({
      to: "imon.khan@foryourgoal.com",
      subject: `[New Inquiry] ${isTrial ? "Pilot Sample Trial" : "Quote Request"} from ${d.fullName} (${company}) [${referenceId}]`,
      html: alertHtml,
    }).catch((e) => console.error("[Quote API] Alert email failed:", e));

    return NextResponse.json({
      success: true,
      referenceId,
      message: isTrial
        ? "Your free 2-image sample pilot request has been registered. An account supervisor will contact you with secure upload credentials within 30 minutes."
        : "Your quotation request has been received. Our operations team is reviewing your project brief and will return a formal estimate within 45 minutes.",
    });
  } catch (error: any) {
    console.error("Quote API Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again or email support@foryourgoal.com." },
      { status: 500 }
    );
  }
}
