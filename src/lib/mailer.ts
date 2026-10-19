import nodemailer from "nodemailer";

export interface MailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export interface SendEmailOptions {
  from?: string;
  to?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: MailAttachment[];
}

/**
 * Robust SMTP client using Nodemailer
 * Connects to the host docker-mailserver (port 25)
 */
export async function sendEmail({
  from = '"Foryourgoal Studio" <noreply@foryourgoal.com>',
  to = process.env.TRIAL_NOTIFICATION_EMAIL || "imon.khan@foryourgoal.com",
  replyTo,
  subject,
  html,
  text,
  attachments = [],
}: SendEmailOptions): Promise<boolean> {
  const host = process.env.SMTP_HOST || "172.17.0.1";
  const port = parseInt(process.env.SMTP_PORT || "25", 10);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // port 25 standard plaintext/STARTTLS relay
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo,
      subject,
      html,
      text,
      attachments: attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
        contentType: att.contentType,
      })),
    });
    return true;
  } catch (error) {
    console.error("Failed to send email via SMTP:", error);
    return false;
  }
}
