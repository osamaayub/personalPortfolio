import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

export const alt = "Portfolio preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 3600;

export default async function OpengraphImage() {
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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#f1f5f9",
          background: "linear-gradient(135deg, #0b0d14 0%, #1e1b4b 60%, #4c1d95 100%)",
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
            fontWeight: 700,
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
          }}
        >
          {initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ marginTop: 12, fontSize: 38, color: "#c7d2fe" }}>{profile.title}</div>
          <div style={{ marginTop: 24, fontSize: 26, color: "#94a3b8" }}>{profile.roles.join("  ·  ")}</div>
        </div>
      </div>
    ),
    size,
  );
}
