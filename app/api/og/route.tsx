import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "ADido";
  const eyebrow = searchParams.get("eyebrow") ?? "Hair & Make Up · Seoul";
  const subtitle = searchParams.get("subtitle") ?? "les grands trans-parents";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 88,
          background: "#0A0A0A",
          color: "#FAFAF7",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(250,250,247,0.65)",
          }}
        >
          <span>ADido</span>
          <span>{eyebrow}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#C9A97A",
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              fontSize: 110,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#FAFAF7",
              maxWidth: 1080,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "rgba(250,250,247,0.55)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>421 Dosan-daero · Gangnam · Seoul</span>
          <span>adido.kr</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
