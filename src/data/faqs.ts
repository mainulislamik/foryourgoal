export interface FAQItem {
  id: string;
  category: "general" | "services" | "pricing" | "security";
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "general",
    question: "What is Foryourgoal's typical turnaround time?",
    answer:
      "Our standard turnaround is 24 hours for regular batches. We also provide dedicated Rush SLAs of 6 hours and 12 hours for urgent campaigns and fast-paced e-commerce product launches.",
  },
  {
    id: "faq-2",
    category: "general",
    question: "How do you guarantee quality consistency across thousands of images?",
    answer:
      "Every batch goes through a strict 3-tier Quality Assurance (QA) protocol: 1) Initial retouching by a specialized technician, 2) Senior QA lead inspection at 200% zoom checking paths and margins, and 3) Final compliance verification against your specific studio style guide.",
  },
  {
    id: "faq-3",
    category: "services",
    question: "Do you use automated AI background removers or human editors?",
    answer:
      "All vector clipping paths and high-end retouches are 100% hand-crafted by professional Adobe Photoshop pen-tool specialists. We never rely on automated AI cutouts that introduce ragged edges, destroyed highlights, or halos.",
  },
  {
    id: "faq-4",
    category: "services",
    question: "What file formats can you accept and deliver?",
    answer:
      "We accept all common formats including RAW (.CR2, .NEF, .ARW, .DNG), TIFF, PSD, JPEG, PNG, and PSB. Deliverables can be provided as layered PSDs with active vector paths, transparent PNGs, 100% white JPEGs, or optimized WebP files.",
  },
  {
    id: "faq-5",
    category: "pricing",
    question: "How does your volume pricing and discount structure work?",
    answer:
      "Pricing scales with monthly image volume. Clipping path starts from $0.49/image, with tier discounts starting at 50+ images, 500+ images, and enterprise rates for 2,000+ monthly photos. Custom monthly retainers are also available.",
  },
  {
    id: "faq-6",
    category: "pricing",
    question: "Can we test your quality before committing to an order?",
    answer:
      "Yes! We offer a completely free, no-obligation 2-image sample trial so you can inspect our path precision, edge quality, and turnaround speed before placing a paid order.",
  },
  {
    id: "faq-7",
    category: "security",
    question: "How do you protect client image confidentiality and intellectual property?",
    answer:
      "We operate under strict Non-Disclosure Agreements (NDAs). Your unreleased product photographs and creative files are transferred via encrypted TLS, stored in private access-controlled environments, and permanently purged according to your approved data retention schedule.",
  },
  {
    id: "faq-8",
    category: "security",
    question: "Do you ever publish or display client images in your public portfolio?",
    answer:
      "Never without explicit, written client consent. Client confidentiality is sacred in commercial production, especially for pre-release fashion lookbooks and patented tech prototypes.",
  },
];
