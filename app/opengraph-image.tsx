import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Gradia — The Vertical Company";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const dmSerifUrl =
    "https://fonts.gstatic.com/s/dmserifdisplay/v15/-nFnOHM81r4j6k0gmKW0Wd9D3TMyKWPK.woff2";

  let fontData: ArrayBuffer | undefined;
  try {
    const res = await fetch(dmSerifUrl);
    if (res.ok) fontData = await res.arrayBuffer();
  } catch {
    fontData = undefined;
  }

  const fonts = fontData
    ? [
        {
          name: "DM Serif Display",
          data: fontData,
          style: "normal" as const,
          weight: 400 as const,
        },
      ]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontSize: 96,
              color: "white",
              fontFamily: fontData
                ? "DM Serif Display"
                : "Georgia, 'Times New Roman', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Gradia
          </span>
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 1,
              background: "#1e40af",
              marginTop: 14,
            }}
          />
        </div>
        <p
          style={{
            fontSize: 32,
            color: "#f8fafc",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontWeight: 400,
            margin: 0,
            marginBottom: 36,
          }}
        >
          The Vertical Company
        </p>
        <div
          style={{
            width: 360,
            height: 3,
            background: "#1e40af",
            opacity: 0.9,
            borderRadius: 2,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
