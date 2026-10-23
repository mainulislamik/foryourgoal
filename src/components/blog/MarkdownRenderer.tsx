import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="markdown-body space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={idx}
                id={slugify(block.text)}
                className="mt-12 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white"
              >
                {renderInline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={idx}
                id={slugify(block.text)}
                className="mt-8 mb-3 scroll-mt-24 text-xl font-bold tracking-tight text-slate-900 md:text-2xl dark:text-white"
              >
                {renderInline(block.text)}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={idx}
                className="mt-6 mb-2 text-lg font-bold text-slate-900 dark:text-white"
              >
                {renderInline(block.text)}
              </h4>
            );
          case "paragraph":
            return (
              <p key={idx} className="leading-relaxed">
                {renderInline(block.text)}
              </p>
            );
          case "image":
            return (
              <figure key={idx} className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={block.url}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 850px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                {block.alt && (
                  <figcaption className="px-4 py-3 text-center text-xs italic text-slate-500 dark:text-slate-400">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
          case "blockquote":
            return (
              <blockquote
                key={idx}
                className="my-6 border-l-4 border-indigo-600 bg-indigo-50/50 py-3 pr-4 pl-5 italic text-slate-700 rounded-r-xl dark:border-indigo-400 dark:bg-indigo-950/20 dark:text-slate-300"
              >
                {renderInline(block.text)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={idx} className="my-4 space-y-2 pl-6 list-disc marker:text-indigo-600">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx} className="my-4 space-y-2 pl-6 list-decimal marker:font-bold marker:text-indigo-600">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={idx} className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm dark:border-slate-800">
                <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-100/80 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:bg-slate-800 dark:text-white">
                    <tr>
                      {block.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                          {renderInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 align-top">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "hr":
            return (
              <hr key={idx} className="my-10 border-t border-slate-200 dark:border-slate-800" />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// Block parser
type MarkdownBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; alt: string; url: string }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "hr" };

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i++;
      continue;
    }

    // Horizontal Rule
    if (/^(\*\*\*|---|___)$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Markdown Image: ![alt](url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      blocks.push({
        type: "image",
        alt: imgMatch[1],
        url: imgMatch[2].trim(),
      });
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("#### ")) {
      blocks.push({ type: "h4", text: line.slice(5).trim() });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    // Markdown Table
    if (line.startsWith("|") && line.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headers = tableLines[0]
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        const contentRows = tableLines.slice(2); // Skip separator row (|:---|:---|)
        const rows = contentRows.map((r) =>
          r
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim())
        );
        blocks.push({ type: "table", headers, rows });
        continue;
      }
    }

    // Unordered List: * or -
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered List: 1.
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Regular Paragraph (gather consecutive lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("!") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("|") &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^(\*\*\*|---|___)$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return blocks;
}

// Inline parser for **bold**, *italic*, `code`, and [link](url)
function renderInline(text: string): React.ReactNode {
  // Simple token regex for links, bold, italic, code
  const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [anchor](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const isInternal = linkMatch[2].startsWith("/") || linkMatch[2].startsWith("#");
      if (isInternal) {
        return (
          <Link
            key={index}
            href={linkMatch[2]}
            className="font-medium text-indigo-600 hover:text-indigo-800 underline underline-offset-2 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {renderInline(linkMatch[1])}
          </Link>
        );
      }
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 hover:text-indigo-800 underline underline-offset-2 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {renderInline(linkMatch[1])}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-slate-900 dark:text-white">
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={index} className="italic text-slate-800 dark:text-slate-200">
          {renderInline(part.slice(1, -1))}
        </em>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-indigo-600 dark:bg-slate-800 dark:text-indigo-400"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}
