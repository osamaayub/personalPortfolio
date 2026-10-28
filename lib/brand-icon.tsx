import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

/** Monogram tile shared by the favicon and the Apple touch icon. */
export async function brandIcon(px: number, radiusRatio: number) {
  const { profile } = await getContent();
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: px * 0.46,
          fontWeight: 700,
          letterSpacing: -px * 0.02,
          borderRadius: px * radiusRatio,
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #c026d3 100%)",
        }}
      >
        {initials}
      </div>
    ),
    { width: px, height: px },
  );
}
