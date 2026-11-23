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

  const radius = px * radiusRatio;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius,
          background: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 40%, #7c3aed 70%, #a21caf 100%)",
          position: "relative",
        }}
      >
        {/* Top sheen */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "55%",
            borderRadius: radius ? `${radius}px ${radius}px 40% 40%` : 0,
            background: "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0))",
          }}
        />
        {/* Inner ring + monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "74%",
            height: "74%",
            borderRadius: "24%",
            border: `${Math.max(2, px * 0.012)}px solid rgba(255,255,255,0.35)`,
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: px * 0.36,
            fontWeight: 800,
            letterSpacing: -px * 0.02,
          }}
        >
          {initials}
        </div>
      </div>
    ),
    { width: px, height: px },
  );
}
