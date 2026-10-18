# FORYOURGOAL — Security & Threat Modeling Specification

## 1. Threat Modeling & Attack Surface Analysis

As a B2B platform accepting high-volume client image uploads and business-critical inquiries, Foryourgoal implements enterprise-grade security across the entire stack.

| Attack Vector | Potential Impact | Defensive Architecture |
|---|---|---|
| **Malicious File Uploads** | Remote Code Execution (RCE), Web Shells, XSS via SVG | Strict file signature (magic byte) verification, extension whitelist, non-executable storage, filename hashing |
| **Denial of Service / Upload Exhaustion** | VPS disk saturation, memory exhaustion | Strict 100MB body limit in Caddy & Next.js, per-IP rate limiting, isolated volume mounts |
| **Spam / Bot Submissions** | Form stuffing, notification flooding | Turnstile / reCAPTCHA challenge readiness, honeypot fields, IP velocity limits |
| **Data Leakage & Client Confidentiality** | Competitor access to unreleased product shots | Private non-public file storage, signed expiring URLs (max 15 min), automated retention purge |
| **Cross-Site Scripting (XSS)** | Admin session hijack, data exfiltration | React DOM auto-escaping, strict Content Security Policy (CSP), sanitize-html on rich text |
| **SQL / ORM Injection** | Database tampering, customer data theft | Parameterized queries via Drizzle / Prisma / Payload ORM, strict Zod schema validation |

---

## 2. Secure File Upload Pipeline

```
[Client File Selected]
       |
       v
[Client-Side Verification]
   - File size <= 50MB per file (max 100MB batch)
   - Extension check (.jpg, .jpeg, .png, .psd, .tiff, .raw, .cr2, .nef, .arw, .zip)
       |
       v
[Encrypted TLS 1.3 Upload to Next.js API]
       |
       v
[Server-Side Deep Inspection]
   1. Rate Limit Verification (max 5 upload batches per hour per IP)
   2. Size verification against chunk buffer
   3. File Signature (Magic Bytes) inspection:
      - JPEG: FF D8 FF
      - PNG: 89 50 4E 47 0D 0A 1A 0A
      - TIFF: 49 49 2A 00 (Little Endian) or 4D 4D 00 2A (Big Endian)
      - PSD: 38 42 50 53 ('8BPS')
      - ZIP: 50 4B 03 04 ('PK..')
   4. SVG & Executables explicitly rejected
   5. Filename Sanitization:
      - Strip path traversal (`../`, `..\`)
      - Generate cryptographically secure UUID (`${crypto.randomUUID()}.${safeExt}`)
       |
       v
[Isolated Storage Tier]
   - Stored in non-public directory with `0600` permissions or private S3 bucket
   - Served exclusively via HMAC-signed, time-limited tokens (TTL 15 minutes)
       |
       v
[Retention & Purge Protocol]
   - Unprocessed sample files purged automatically after 30 days
   - Completed orders moved to secure encrypted archive with client consent
```

---

## 3. Server-Side Validation & Zod Schema Enforcement

All user inputs across contact, quotation, and careers endpoints are parsed through strict Zod schemas:
- Stripping unknown keys (`strip()`).
- Sanitizing string inputs against control characters and HTML entities.
- Validating business email formats with disposable email provider checks.
- Enforcing bounded integer lengths for volume, phone numbers, and message bodies.

---

## 4. HTTP Security Headers Specification

Configured at both the Next.js framework layer and Caddy reverse proxy:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com;
```

---

## 5. Secrets & Environment Isolation
- No hardcoded secrets, database URLs, or API keys in git history.
- `.env.example` provided with structured keys and comments.
- Production `.env` injected via protected Docker environment variables.
- Git repository configured with `.gitignore` blocking `.env`, `node_modules`, `storage`, and build artifacts.
