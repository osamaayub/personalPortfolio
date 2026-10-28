import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { guard } from "@/lib/admin-api";
import { projectSchema } from "@/lib/validators";
import { ProjectModel } from "@/models/project";

export const runtime = "nodejs";

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  const docs = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json({ projects: docs.map((d) => ({ ...d, _id: String(d._id) })) });
}

export async function POST(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const parsed = projectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const doc = await ProjectModel.create(parsed.data);
  revalidatePath("/");
  return NextResponse.json({ project: { ...doc.toObject(), _id: String(doc._id) } }, { status: 201 });
}
