import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Gradia — an AI office for auto detailers: two agents, one brain";

const CAPABILITIES = [
  "Answers every call 24/7",
  "Books over the phone",
  "Follows up by text + email",
  "Revives old leads",
  "You approve everything",
];

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

  const fontFamily = hasInter
    ? "Inter"
    : "ui-sans-serif, system-ui, sans-serif";

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
          background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
          fontFamily,
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 40,
              color: "white",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Gradia
          </span>
          <span
            style={{
              width: 12,
              height: 12,
              background: "rgba(255,255,255,0.9)",
              marginTop: 12,
            }}
          />
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              color: "white",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            Your entire front office. Two AI agents, one brain.
          </span>
          <span
            style={{
              fontSize: 36,
              color: "rgba(255,255,255,0.85)",
              fontWeight: 400,
              marginTop: 16,
            }}
          >
            Never miss another call. You approve everything. Built for auto
            detailers — $20/mo.
          </span>
        </div>

        {/* Capability chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {CAPABILITIES.map((name) => (
            <span
              key={name}
              style={{
                display: "flex",
                fontSize: 24,
                color: "white",
                fontWeight: 500,
                padding: "10px 20px",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      // Only override the built-in font when our Inter fetch succeeded —
      // passing an empty `fonts` array makes ImageResponse throw
      // "No fonts are loaded" (e.g. if fonts.gstatic.com is unreachable).
      ...(fonts.length > 0 ? { fonts } : {}),
    },
  );
}
