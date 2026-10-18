import net from "node:net";

export interface MailOptions {
  from?: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Lightweight, zero-dependency SMTP client using node:net
 * Connects directly to the host/local Postfix SMTP server (port 25)
 */
export async function sendEmail({
  from = "noreply@foryourgoal.com",
  to,
  subject,
  html,
  text,
}: MailOptions): Promise<boolean> {
  const host = process.env.SMTP_HOST || "172.17.0.1";
  const port = parseInt(process.env.SMTP_PORT || "25", 10);

  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port }, () => {
      let step = 0;
      let buffer = "";

      socket.on("data", (chunk) => {
        buffer += chunk.toString();
        const lines = buffer.trim().split("\n");
        const lastLine = lines[lines.length - 1];

        // Wait for terminal 3-digit reply code (e.g. "250 ...")
        if (!lastLine || !lastLine.match(/^\d{3} /)) return;

        try {
          if (step === 0 && lastLine.startsWith("220")) {
            step++;
            socket.write("EHLO foryourgoal.com\r\n");
          } else if (step === 1 && lastLine.startsWith("250")) {
            step++;
            socket.write(`MAIL FROM:<${from}>\r\n`);
          } else if (step === 2 && lastLine.startsWith("250")) {
            step++;
            socket.write(`RCPT TO:<${to}>\r\n`);
          } else if (step === 3 && lastLine.startsWith("250")) {
            step++;
            socket.write("DATA\r\n");
          } else if (step === 4 && lastLine.startsWith("354")) {
            step++;
            const date = new Date().toUTCString();
            const emailBody = [
              `From: "ForYourGoal System" <${from}>`,
              `To: <${to}>`,
              `Subject: ${subject}`,
              `Date: ${date}`,
              `MIME-Version: 1.0`,
              `Content-Type: text/html; charset=UTF-8`,
              "",
              html,
              "",
              ".\r\n",
            ].join("\r\n");
            socket.write(emailBody);
          } else if (step === 5 && lastLine.startsWith("250")) {
            step++;
            socket.write("QUIT\r\n");
            resolve(true);
          } else {
            // Unexpected status, close cleanly
            socket.end();
            resolve(false);
          }
        } catch (err) {
          console.error("[Mailer] SMTP error:", err);
          socket.destroy();
          resolve(false);
        }
      });
    });

    socket.setTimeout(8000, () => {
      console.warn("[Mailer] SMTP connection timed out after 8s");
      socket.destroy();
      resolve(false);
    });

    socket.on("error", (err) => {
      console.error("[Mailer] Socket error:", err);
      resolve(false);
    });
  });
}
