import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { guard, validId } from "@/lib/admin-api";
import { projectSchema } from "@/lib/validators";
import { ProjectModel } from "@/models/project";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const parsed = projectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const doc = await ProjectModel.findByIdAndUpdate(id, parsed.data, { new: true }).lean();
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  return NextResponse.json({ project: { ...doc, _id: String(doc._id) } });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const doc = await ProjectModel.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
