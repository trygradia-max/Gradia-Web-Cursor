import { ImageResponse } from "next/og";
import { SITE_CATEGORY, SITE_HEADLINE, siteBase } from "@/lib/site-config";

export const runtime = "edge";

export const alt = `${SITE_HEADLINE} — ${SITE_CATEGORY}`;

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
  const fontFamily = hasInter ? "Inter" : "ui-sans-serif, system-ui, sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1a1a1a",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 36,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Gradia
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              color: "white",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            {SITE_HEADLINE}
          </span>
          <span
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.65)",
              fontWeight: 400,
              maxWidth: 920,
            }}
          >
            {SITE_CATEGORY}
          </span>
        </div>

        <span
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            fontWeight: 500,
          }}
        >
          {siteBase().replace(/^https?:\/\//, "")}
        </span>
      </div>
    ),
    {
      ...size,
      ...(fonts.length > 0 ? { fonts } : {}),
    },
  );
}
