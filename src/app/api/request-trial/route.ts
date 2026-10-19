import { NextRequest, NextResponse } from "next/server";
import { sendEmail, MailAttachment } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let name = "";
    let email = "";
    let message = "";
    let driveLink = "";
    const attachments: MailAttachment[] = [];
    const fileSummaries: { name: string; size: string }[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = (formData.get("name") || "").toString().trim();
      email = (formData.get("email") || "").toString().trim();
      message = (formData.get("message") || "").toString().trim();
      driveLink = (formData.get("driveLink") || "").toString().trim();

      // Collect up to 5 files
      const fileKeys = ["file_1", "file_2", "file_3", "file_4", "file_5"];
      for (let i = 0; i < fileKeys.length; i++) {
        const file = formData.get(fileKeys[i]);
        if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
          // Check 3MB limit (3 * 1024 * 1024 = 3,145,728 bytes)
          if (file.size > 3.5 * 1024 * 1024) {
            return NextResponse.json(
              { error: `File "${file.name}" exceeds the 3MB size limit. Please use a cloud drive link.` },
              { status: 400 }
            );
          }

          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
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
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!name) {
      name = "Prospective Client";
    }

    const referenceId = "FYG-TRIAL-" + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "Unknown IP";

    // Format HTML email for imon.khan@foryourgoal.com
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
    .field-value { font-size: 15px; color: #0f172a; line-height: 1.5; }
    .client-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px; }
    .instructions-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 4px; font-size: 14px; white-space: pre-wrap; line-height: 1.6; color: #334155; }
    .drive-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 18px; margin: 20px 0; }
    .drive-btn { display: inline-block; background: #2563eb; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 10px; }
    .files-table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
    .files-table th { text-align: left; padding: 8px 12px; background: #f1f5f9; color: #475569; font-weight: 600; border-bottom: 1px solid #e2e8f0; }
    .files-table td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b; }
    .footer { background: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Direct Studio Inquiry</div>
      <h1>New Free Trial & Quote Request</h1>
      <p>Reference: <strong>${referenceId}</strong> • Received: ${timestamp}</p>
    </div>

    <div class="content">
      <div class="client-card">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <div>
            <div class="field-label">Client Name</div>
            <div class="field-value" style="font-weight: 700; font-size: 16px;">${name}</div>
          </div>
          <div>
            <div class="field-label">Sender Email</div>
            <div class="field-value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a></div>
          </div>
        </div>
        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #64748b;">
          Client IP: <code>${clientIp}</code> • Quick Action: Hit <strong>Reply</strong> to directly message this client.
        </div>
      </div>

      <div class="field-group">
        <div class="field-label">Message / Editing Instructions</div>
        <div class="instructions-box">${message ? message : "(No special instructions provided)"}</div>
      </div>

      ${
        driveLink
          ? `
      <div class="drive-box">
        <div style="font-size: 13px; font-weight: 700; color: #1e40af; text-transform: uppercase;">Public Cloud Drive Link Provided</div>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #3b82f6; word-break: break-all;">
          <a href="${driveLink}" target="_blank" rel="noopener noreferrer" style="color: #1d4ed8; font-weight: 600;">${driveLink}</a>
        </p>
        <a href="${driveLink}" target="_blank" rel="noopener noreferrer" class="drive-btn">Open Cloud Drive Link →</a>
      </div>
      `
          : ""
      }

      <div class="field-group" style="margin-top: 24px;">
        <div class="field-label">Uploaded Sample Files (${attachments.length} attached)</div>
        ${
          attachments.length > 0
            ? `
          <table class="files-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${fileSummaries
                .map(
                  (f) => `
                <tr>
                  <td><strong>${f.name}</strong></td>
                  <td>${f.size}</td>
                  <td><span style="color: #16a34a; font-weight: 600;">Attached to this Email</span></td>
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
      replyTo: name ? `"${name}" <${email}>` : email,
      subject: `[Free Trial Request] ${name} (${email}) - ${referenceId}`,
      html: emailHtml,
      text: `New Free Trial Request from ${name} (${email})\n\nReference: ${referenceId}\nDrive Link: ${driveLink}\nMessage: ${message}\nAttached Files: ${attachments.length}`,
      attachments,
    });

    if (!sent) {
      console.warn("SMTP send returned false. Notification might have failed.");
    }

    // 2. Optionally send confirmation email to client
    try {
      await sendEmail({
        from: '"Foryourgoal Studio" <noreply@foryourgoal.com>',
        to: email,
        replyTo: "support@foryourgoal.com",
        subject: `We've received your Free Trial request! (Ref: ${referenceId}) | Foryourgoal`,
        html: `
<div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0f172a;">
  <h2 style="color: #0f172a; margin-top: 0;">Thank you for requesting a Free Trial with Foryourgoal, ${name}!</h2>
  <p style="font-size: 14px; line-height: 1.6; color: #334155;">
    Our senior production team has received your submission and trial assets (Reference: <strong>${referenceId}</strong>).
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
