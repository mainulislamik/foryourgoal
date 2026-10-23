import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Foryourgoal — Enterprise Image Post-Production Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const badges = [
    "10,000+ Daily Capacity",
    "6-24h SLA",
    "5 Free Test Images",
    "Hand-Crafted Photoshop Precision",
  ];

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
          backgroundColor: "#090d16",
          padding: "40px",
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
            alignItems: "center",
            backgroundColor: "#0d1322",
            border: "2px solid #06b6d4",
            borderRadius: "24px",
            padding: "48px 56px",
            boxSizing: "border-box",
          }}
        >
          {/* Top Studio Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#10b981",
              }}
            >
              Enterprise Post-Production Studio
            </div>
          </div>

          {/* Center Brand & Subtitle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "16px",
              maxWidth: "960px",
            }}
          >
            <div
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Foryourgoal
            </div>
            <div
              style={{
                fontSize: "26px",
                fontWeight: 500,
                color: "#94a3b8",
                letterSpacing: "-0.01em",
                lineHeight: 1.35,
                textAlign: "center",
              }}
            >
              Enterprise Image Post-Production & Commercial Retouching Studio
            </div>
          </div>

          {/* 4 Pill Badges */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px",
              width: "100%",
            }}
          >
            {badges.map((badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  backgroundColor: "#131d31",
                  border: "1px solid #10b981",
                  color: "#e2e8f0",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {badge}
              </div>
            ))}
          </div>

          {/* Footer Domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#06b6d4",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            foryourgoal.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
