// In-memory sliding-window rate limiter
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale records every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    const valid = record.timestamps.filter((t) => now - t < 600000);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      record.timestamps = valid;
    }
  }
}, 600000);

export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  let record = rateLimitMap.get(ip);

  if (!record) {
    record = { timestamps: [] };
    rateLimitMap.set(ip, record);
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.timestamps.push(now);
  return { allowed: true, remaining: maxRequests - record.timestamps.length };
}

// Escape HTML special characters to prevent HTML/XSS injection in emails or DOM
export function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Sanitize email header values to prevent CRLF Email Header Injection
export function sanitizeHeader(str: string): string {
  if (!str) return "";
  return str.replace(/[\r\n\t\0]/g, " ").trim();
}

// Validate safe external link schemes (strict http and https only)
export function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// Allowed extensions for photography, design, and graphics files
const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "tif",
  "tiff",
  "psd",
  "raw",
  "cr2",
  "cr3",
  "nef",
  "arw",
  "dng",
  "svg",
  "bmp",
  "gif",
  "zip",
  "rar",
  "7z",
]);

// Magic byte signatures for security validation
const MAGIC_SIGNATURES: { ext: string[]; check: (buf: Buffer) => boolean }[] = [
  {
    ext: ["jpg", "jpeg"],
    check: (b) => b.length > 2 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    ext: ["png"],
    check: (b) =>
      b.length > 8 &&
      b[0] === 0x89 &&
      b[1] === 0x50 &&
      b[2] === 0x4e &&
      b[3] === 0x47 &&
      b[4] === 0x0d &&
      b[5] === 0x0a &&
      b[6] === 0x1a &&
      b[7] === 0x0a,
  },
  {
    ext: ["webp"],
    check: (b) =>
      b.length > 12 &&
      b.toString("ascii", 0, 4) === "RIFF" &&
      b.toString("ascii", 8, 12) === "WEBP",
  },
  {
    ext: ["tif", "tiff"],
    check: (b) =>
      b.length > 4 &&
      ((b[0] === 0x49 && b[1] === 0x49 && b[2] === 0x2a && b[3] === 0x00) ||
        (b[0] === 0x4d && b[1] === 0x4d && b[2] === 0x00 && b[3] === 0x2a)),
  },
  {
    ext: ["psd"],
    check: (b) => b.length > 4 && b.toString("ascii", 0, 4) === "8BPS",
  },
  {
    ext: ["zip"],
    check: (b) => b.length > 4 && b[0] === 0x50 && b[1] === 0x4b,
  },
];

export function validateUploadedFile(
  filename: string,
  buffer: Buffer
): { valid: boolean; reason?: string } {
  // Sanitize filename to prevent directory traversal
  const cleanName = filename.replace(/^.*[\\\/]/, "").trim();
  const parts = cleanName.split(".");
  if (parts.length < 2) {
    return { valid: false, reason: "File must have a valid extension." };
  }

  const ext = parts.pop()?.toLowerCase() || "";
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      reason: `Unsupported file type (.${ext}). Only standard image or archive files are permitted.`,
    };
  }

  // Double extension check (e.g., evil.php.jpg)
  const dangerousSubExts = ["php", "exe", "sh", "bat", "py", "js", "html", "htm", "jsp", "asp"];
  if (parts.some((p) => dangerousSubExts.includes(p.toLowerCase()))) {
    return {
      valid: false,
      reason: "Potential malicious multi-extension file detected.",
    };
  }

  // Check magic signatures if matched
  const matcher = MAGIC_SIGNATURES.find((m) => m.ext.includes(ext));
  if (matcher) {
    if (!matcher.check(buffer)) {
      return {
        valid: false,
        reason: `File content does not match the expected image signature for .${ext}.`,
      };
    }
  }

  return { valid: true };
}
