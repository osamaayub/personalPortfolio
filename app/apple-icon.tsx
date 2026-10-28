import { brandIcon } from "@/lib/brand-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const revalidate = 3600;

// iOS applies its own corner mask, so the tile is full-bleed.
export default function AppleIcon() {
  return brandIcon(size.width, 0);
}
