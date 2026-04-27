import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Gradia — The Vertical Company";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const inter400Url =
  "https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7Wxc.woff2";
const inter700Url =
  "https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7SUc.woff2";

async function loadFont(url: string): Promise<ArrayBuffer | undefined> {
  try {
    const res = await fetch(url);
    if (res.ok) return await res.arrayBuffer();
  } catch {
    /* ignore */
  }
  return undefined;
}

export default async function OpenGraphImage() {
  const [inter400, inter700] = await Promise.all([
    loadFont(inter400Url),
    loadFont(inter700Url),
  ]);

  const fonts = [];
  if (inter400) {
    fonts.push({
      name: "Inter",
      data: inter400,
      style: "normal" as const,
      weight: 400 as const,
    });
  }
  if (inter700) {
    fonts.push({
      name: "Inter",
      data: inter700,
      style: "normal" as const,
      weight: 700 as const,
    });
  }

  const hasInter = Boolean(inter400 && inter700);

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
              fontFamily: hasInter ? "Inter" : "ui-sans-serif, system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Gradia
          </span>
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 0,
              background: "#3b6ef5",
              marginTop: 14,
            }}
          />
        </div>
        <p
          style={{
            fontSize: 32,
            color: "#f8fafc",
            fontFamily: hasInter ? "Inter" : "ui-sans-serif, system-ui, sans-serif",
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
            background: "#3b6ef5",
            opacity: 0.9,
            borderRadius: 0,
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
