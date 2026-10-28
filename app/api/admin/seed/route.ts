import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { projectsData } from "@/data/data";
import { guard } from "@/lib/admin-api";
import { ProjectModel } from "@/models/project";

export const runtime = "nodejs";

// Copies the bundled projects into MongoDB so they can be edited from /admin.
// Bundled images are module imports, so seeded rows point at their /public paths.
const imagePaths: Record<string, string> = {
  DevFlow: "/devflow.png",
  "Hair Transplant Management System": "/HLMS.png",
  EQUIGENIX: "/Equigenix.png",
  Portfolio: "/3dportfolio.png",
  "AI Powered Interviewer": "/PrepWise.png",
};

export async function POST() {
  const denied = await guard();
  if (denied) return denied;
  if ((await ProjectModel.estimatedDocumentCount()) > 0) {
    return NextResponse.json({ error: "Projects already exist" }, { status: 409 });
  }
  await ProjectModel.insertMany(
    projectsData.map((p, i) => ({
      title: p.title,
      description: p.description,
      tags: [...p.tags],
      image: imagePaths[p.title] ?? "",
      url: p.url,
      github: p.github,
      featured: i === 0,
      order: i,
    })),
  );
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
