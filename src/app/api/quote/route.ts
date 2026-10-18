import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Server-side Zod Schema
const quoteSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  businessEmail: z.string().email("Valid business email is required"),
  companyName: z.string().min(1, "Company name is required").max(100),
  websiteUrl: z.string().url("Valid URL or leave empty").or(z.literal("")).optional(),
  phone: z.string().max(30).optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  volume: z.string().min(1, "Please select expected volume"),
  deadline: z.string().min(1, "Please select deadline preference"),
  fileFormats: z.array(z.string()).default(["JPEG"]),
  colorProfile: z.string().default("sRGB"),
  backgroundChoice: z.string().default("pure-white"),
  projectBrief: z.string().max(2000).optional(),
  ndaAgreed: z.boolean().refine((val) => val === true, "You must accept the confidentiality agreement"),
  isSampleTrial: z.boolean().default(false),
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
  if (entry.count >= 15) {
    return false; // Max 15 submissions per hour per IP
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
      return NextResponse.json({ success: true, referenceId: "FYG-SPAM-FILTERED" });
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

    const data = parsed.data;
    const referenceId = `FYG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Log the validated inquiry (in real production, persisted to PostgreSQL and sent via SMTP)
    console.log(`[Quote Submission] New inquiry received: ${referenceId}`, {
      email: data.businessEmail,
      company: data.companyName,
      services: data.services,
      volume: data.volume,
      deadline: data.deadline,
      isTrial: data.isSampleTrial,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      referenceId,
      message: data.isSampleTrial
        ? "Your free sample trial request has been registered. An account specialist will contact you with secure upload credentials within 30 minutes."
        : "Your quotation request has been received. Our operations team is reviewing your project brief and will return a formal estimate within 1 hour.",
    });
  } catch (error: any) {
    console.error("Quote API Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again or email support@foryourgoal.com." },
      { status: 500 }
    );
  }
}
