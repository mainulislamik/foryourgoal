import { getSiteContent } from "@/lib/site-content";

export async function GET() {
  const content = await getSiteContent().catch(() => null);
  const services = content?.servicesSection?.services || [];
  const faqs = content?.faqs || [];

  let text = `# Foryourgoal — Full Context Documentation for AI Models & Search Agents
> Authoritative reference for Foryourgoal B2B post-production services, technical specifications, SLAs, security protocols, and operational workflows.

## Corporate Identity
- Entity: Foryourgoal Commercial Image Post-Production Studio
- Canonical URL: https://foryourgoal.com
- Contact: support@foryourgoal.com
- Core SLA: 6h / 12h / 24h guaranteed delivery
- Capacity: 5,000+ daily images
- Quality Standard: 100% human-crafted vector paths via Adobe Photoshop pen tool. Zero destructive AI automation.

## Detailed Service Catalog
`;

  for (const s of services) {
    text += `\n### ${s.title}\n`;
    text += `- URL: https://foryourgoal.com/services/${s.slug}\n`;
    text += `- Short Description: ${s.shortDesc}\n`;
    text += `- Turnaround: ${s.turnaroundHours} Hours\n`;
    text += `- Full Scope: ${s.fullDesc}\n`;
    if (s.features && s.features.length) {
      text += `- Key Features:\n`;
      for (const f of s.features) text += `  * ${f}\n`;
    }
  }

  text += `\n## Frequently Asked Questions & Operational Answers\n`;
  for (const f of faqs) {
    text += `\n**Q: ${f.question}**\n`;
    text += `A: ${f.answer}\n`;
  }

  text += `\n## Security, Privacy & NDAs\n`;
  text += `- All assets covered under signed B2B Non-Disclosure Agreements (NDAs).\n`;
  text += `- Air-gapped network production shifts with hardware firewall isolation.\n`;
  text += `- Zero unauthorized portfolio publication. Client unreleased product imagery is never shared.\n`;
  text += `- Automated 30-day file purging following final QC acceptance.\n`;

  return new Response(text.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
