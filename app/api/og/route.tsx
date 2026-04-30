import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const eyebrow = searchParams.get("eyebrow") ?? "Hair & Make Up · Seoul";

  // Load the brand mark from /public so the OG card shows the actual logo
  // instead of rendered text. ImageResponse runs on the edge, so the file
  // must be fetched via an absolute URL (relative paths don't resolve there).
  const logoBytes = await fetch(new URL("/images/logo-mark.jpg", origin)).then((r) =>
    r.arrayBuffer()
  );
  const logoSrc = `data:image/jpeg;base64,${Buffer.from(logoBytes).toString("base64")}`;

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
            justifyContent: "flex-end",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(250,250,247,0.65)",
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="ADido"
            width={520}
            height={520}
            style={{ objectFit: "contain" }}
          />
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
