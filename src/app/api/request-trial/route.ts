import { NextRequest, NextResponse } from "next/server";
import { sendEmail, MailAttachment } from "@/lib/mailer";
import {
  checkRateLimit,
  escapeHtml,
  sanitizeHeader,
  isSafeUrl,
  validateUploadedFile,
} from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (5 requests per 1 minute per IP)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip")?.trim() ||
      "127.0.0.1";

    const rate = checkRateLimit(clientIp, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    let name = "";
    let email = "";
    let message = "";
    let driveLink = "";
    let honeypot = "";
    const attachments: MailAttachment[] = [];
    const fileSummaries: { name: string; size: string }[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = (formData.get("name") || "").toString().trim();
      email = (formData.get("email") || "").toString().trim();
      message = (formData.get("message") || "").toString().trim();
      driveLink = (formData.get("driveLink") || "").toString().trim();
      honeypot = (formData.get("website") || "").toString().trim();

      // Bot honeypot check: If the hidden honeypot field has a value, silently drop the submission
      if (honeypot) {
        return NextResponse.json({
          success: true,
          referenceId: "FYG-TRIAL-" + Math.floor(100000 + Math.random() * 900000),
          message: "Free trial request submitted successfully.",
        });
      }

      // Collect up to 5 files with security checks
      const fileKeys = ["file_1", "file_2", "file_3", "file_4", "file_5"];
      for (let i = 0; i < fileKeys.length; i++) {
        const file = formData.get(fileKeys[i]);
        if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
          // Check 3MB limit (3.5MB boundary)
          if (file.size > 3.5 * 1024 * 1024) {
            return NextResponse.json(
              { error: `File "${file.name}" exceeds the 3MB size limit. Please use a cloud drive link.` },
              { status: 400 }
            );
          }

          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // Deep file security validation (extension check, double-extension, magic byte check)
          const fileCheck = validateUploadedFile(file.name, buffer);
          if (!fileCheck.valid) {
            return NextResponse.json(
              { error: `Security check failed for "${file.name}": ${fileCheck.reason}` },
              { status: 400 }
            );
          }

          const sizeKb = (file.size / 1024).toFixed(1) + " KB";

          attachments.push({
            filename: file.name || `sample_${i + 1}.jpg`,
            content: buffer,
            contentType: file.type || "application/octet-stream",
          });

          fileSummaries.push({
            name: file.name || `File ${i + 1}`,
            size: sizeKb,
          });
        }
      }
    } else {
      // JSON payload fallback
      const json = await req.json();
      name = (json.name || "").toString().trim();
      email = (json.email || "").toString().trim();
      message = (json.message || "").toString().trim();
      driveLink = (json.driveLink || "").toString().trim();
      honeypot = (json.website || "").toString().trim();

      if (honeypot) {
        return NextResponse.json({
          success: true,
          referenceId: "FYG-TRIAL-" + Math.floor(100000 + Math.random() * 900000),
          message: "Free trial request submitted successfully.",
        });
      }
    }

    // Email format validation (strict regex)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!name) {
      name = "Prospective Client";
    }

    // Validate drive link if provided
    if (driveLink && !isSafeUrl(driveLink)) {
      return NextResponse.json(
        { error: "Drive link must be a valid public HTTP or HTTPS web link." },
        { status: 400 }
      );
    }

    const referenceId = "FYG-TRIAL-" + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // Sanitized inputs for safe HTML email rendering
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const safeDriveLink = escapeHtml(driveLink);
    const safeHeaderName = sanitizeHeader(name);
    const safeHeaderEmail = sanitizeHeader(email);

    // Format secure HTML email for imon.khan@foryourgoal.com
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #0f172a; padding: 24px 32px; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .header p { margin: 0; font-size: 13px; color: #94a3b8; }
    .badge { display: inline-block; background: #2563eb; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 8px; }
    .content { padding: 32px; }
    .field-group { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px; letter-spacing: 0.5px; }
    .field-value { font-size: 15px; color: #0f172a; }
    .instructions-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .drive-link-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 16px; margin-top: 6px; }
    .files-table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
    .files-table th { background: #f8fafc; text-align: left; padding: 10px; border: 1px solid #e2e8f0; color: #475569; font-weight: 600; }
    .files-table td { padding: 10px; border: 1px solid #e2e8f0; color: #1e293b; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 32px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">New Lead Notification</div>
      <h1>Free Trial Request Received</h1>
      <p>Ref: <strong>${escapeHtml(referenceId)}</strong> • Submitted on ${escapeHtml(timestamp)}</p>
    </div>

    <div class="content">
      <div class="field-group">
        <div class="field-label">Client Name</div>
        <div class="field-value" style="font-weight: 700; font-size: 16px;">${safeName}</div>
      </div>

      <div class="field-group">
        <div class="field-label">Client Business Email</div>
        <div class="field-value">
          <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${safeEmail}</a>
          <span style="font-size: 12px; color: #64748b; margin-left: 8px;">(Reply directly to this email to reach client)</span>
        </div>
      </div>

      <div class="field-group">
        <div class="field-label">Client IP Address</div>
        <div class="field-value" style="font-family: monospace; font-size: 13px; color: #64748b;">${escapeHtml(clientIp)}</div>
      </div>

      <div class="field-group">
        <div class="field-label">Editing Instructions & Specifications</div>
        <div class="instructions-box">${safeMessage ? safeMessage : "<em>(No special instructions provided)</em>"}</div>
      </div>

      ${
        driveLink
          ? `
      <div class="field-group">
        <div class="field-label">Public Cloud Drive / Dropbox Link</div>
        <div class="drive-link-box">
          <a href="${safeDriveLink}" target="_blank" rel="noopener noreferrer" style="color: #1d4ed8; font-weight: 600; word-break: break-all;">
            ${safeDriveLink}
          </a>
        </div>
      </div>
      `
          : ""
      }

      <div class="field-group">
        <div class="field-label">Uploaded Sample Files (${attachments.length} files)</div>
        ${
          attachments.length > 0
            ? `
          <table class="files-table">
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>File Size</th>
              </tr>
            </thead>
            <tbody>
              ${fileSummaries
                .map(
                  (f, idx) => `
                <tr>
                  <td style="width: 32px; text-align: center; color: #64748b;">${idx + 1}</td>
                  <td style="font-weight: 500;">${escapeHtml(f.name)}</td>
                  <td style="color: #64748b; width: 90px;">${escapeHtml(f.size)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <p style="font-size: 12px; color: #64748b; margin-top: 8px;">
            📎 The uploaded sample images are directly attached to this email. You can download or open them in Photoshop immediately.
          </p>
        `
            : `
          <p style="font-size: 13px; color: #64748b; font-style: italic; margin-top: 6px;">
            No direct files uploaded via the form (client provided drive link or requested scoping consultation).
          </p>
        `
        }
      </div>
    </div>

    <div class="footer">
      This is an automated production alert dispatched by <strong>Foryourgoal Studio</strong> directly to <strong>imon.khan@foryourgoal.com</strong>.
    </div>
  </div>
</body>
</html>
`;

    // 1. Send direct notification email to imon.khan@foryourgoal.com
    const sent = await sendEmail({
      from: '"Foryourgoal Free Trial" <noreply@foryourgoal.com>',
      to: process.env.TRIAL_NOTIFICATION_EMAIL || "imon.khan@foryourgoal.com",
      replyTo: safeHeaderName ? `"${safeHeaderName}" <${safeHeaderEmail}>` : safeHeaderEmail,
      subject: `[Free Trial Request] ${safeHeaderName} (${safeHeaderEmail}) - ${referenceId}`,
      html: emailHtml,
      text: `New Free Trial Request from ${name} (${email})\n\nReference: ${referenceId}\nDrive Link: ${driveLink}\nMessage: ${message}\nAttached Files: ${attachments.length}`,
      attachments,
    });

    if (!sent) {
      console.warn("SMTP send returned false. Notification might have failed.");
    }

    // 2. Send confirmation auto-responder to client
    try {
      await sendEmail({
        from: '"Foryourgoal Studio" <noreply@foryourgoal.com>',
        to: email,
        replyTo: "support@foryourgoal.com",
        subject: `We've received your Free Trial request! (Ref: ${referenceId}) | Foryourgoal`,
        html: `
<div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0f172a;">
  <h2 style="color: #0f172a; margin-top: 0;">Thank you for requesting a Free Trial with Foryourgoal, ${safeName}!</h2>
  <p style="font-size: 14px; line-height: 1.6; color: #334155;">
    Our senior production team has received your submission and trial assets (Reference: <strong>${escapeHtml(referenceId)}</strong>).
  </p>
  <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 14px; margin: 18px 0; font-size: 13px; color: #475569;">
    <strong>Next Steps & SLA:</strong><br>
    • Senior Retouching Lead is assigned to calibrate your sample specifications.<br>
    • Your edited sample files and fixed commercial proposal will be returned within <strong>6–12 hours</strong>.<br>
    • All files remain strictly confidential under our standard Enterprise Non-Disclosure Agreement (NDA).
  </div>
  <p style="font-size: 13px; color: #64748b;">
    If you need to provide additional reference images or have urgent questions, simply reply directly to this email or reach us at <a href="mailto:support@foryourgoal.com" style="color: #2563eb;">support@foryourgoal.com</a>.
  </p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
  <p style="font-size: 11px; color: #94a3b8;">
    Foryourgoal Studio • Commercial Post-Production & Dedicated Retouching Services • https://foryourgoal.com
  </p>
</div>
`,
        text: `Thank you for requesting a Free Trial with Foryourgoal, ${name}!\n\nReference: ${referenceId}\nOur production team is reviewing your sample files and will deliver calibrated edits within 6-12 hours.\n\nForyourgoal Studio`,
      });
    } catch (clientErr) {
      console.warn("Client confirmation email failed:", clientErr);
    }

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Free trial request submitted successfully.",
    });
  } catch (error: any) {
    console.error("Error in /api/request-trial:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process free trial request" },
      { status: 500 }
    );
  }
}
