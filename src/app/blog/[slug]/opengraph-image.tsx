import { ImageResponse } from "next/og";
import { getBlogPostBySlug, blogPostsData } from "@/data/blogs";

export const runtime = "nodejs";

export const alt = "Foryourgoal Article OpenGraph Card";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const title = post?.title || "Professional Image Editing & Commercial Retouching";
  const category = post?.category || "Studio Guide";
  const excerpt =
    post?.excerpt && post.excerpt.length > 135
      ? `${post.excerpt.slice(0, 132)}...`
      : post?.excerpt ||
        "Expert hand-drawn clipping paths, high-end product retouching, and enterprise e-commerce image editing.";
  const authorName = post?.author?.name || "Foryourgoal Production Team";
  const authorRole = post?.author?.role || "Commercial Retouching Studio";
  const readingTime = post?.readingTime || "5 min read";

  const titleFontSize = title.length > 80 ? 38 : title.length > 55 ? 42 : 48;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070b14",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, #131d36 0%, #070b14 70%)",
          padding: "36px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0d1527",
            border: "2px solid #1e293b",
            borderRadius: "24px",
            padding: "44px 50px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {/* Top Row: Brand & Category Badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left: Brand & Studio indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              {/* Studio Logo Icon */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#4f46e5",
                  border: "1px solid #6366f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: 900,
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                }}
              >
                F
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                  }}
                >
                  Foryourgoal
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#06b6d4",
                  }}
                >
                  Commercial Studio Guide
                </div>
              </div>
            </div>

            {/* Right: Category Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                border: "1px solid rgba(129, 140, 248, 0.4)",
                color: "#c7d2fe",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </div>
          </div>

          {/* Center: Post Title & Excerpt */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "1020px",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                fontSize: `${titleFontSize}px`,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                lineHeight: 1.18,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "19px",
                fontWeight: 400,
                color: "#94a3b8",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
              }}
            >
              {excerpt}
            </div>
          </div>

          {/* Bottom Row: Author info, Reading Time & Domain */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingTop: "20px",
              borderTop: "1px solid rgba(148, 163, 184, 0.16)",
            }}
          >
            {/* Left: Author + Reading Time */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: "#312e81",
                  border: "1.5px solid #6366f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                {authorName.charAt(0)}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#f8fafc",
                  }}
                >
                  {authorName}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#64748b",
                  }}
                >
                  {authorRole}
                </div>
              </div>

              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#475569",
                  marginLeft: "4px",
                  marginRight: "4px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#94a3b8",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <span>⏱</span>
                <span>{readingTime}</span>
              </div>
            </div>

            {/* Right: Domain and Live Indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                }}
              />
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "#38bdf8",
                  textTransform: "uppercase",
                }}
              >
                foryourgoal.com
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
