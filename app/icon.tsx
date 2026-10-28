import { brandIcon } from "@/lib/brand-icon";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";
export const revalidate = 3600;

export default function Icon() {
  return brandIcon(size.width, 0.22);
}
