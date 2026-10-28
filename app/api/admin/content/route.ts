import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { guard } from "@/lib/admin-api";
import { getSavedSections } from "@/lib/content";
import { contentSchemas, defaultContent, sectionKeys, type SectionKey } from "@/lib/content-schema";
import { ContentModel } from "@/models/content";

export const runtime = "nodejs";

const isSection = (v: unknown): v is SectionKey => typeof v === "string" && sectionKeys.includes(v as SectionKey);

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  const saved = await getSavedSections();
  return NextResponse.json({
    content: { ...defaultContent, ...saved },
    customized: Object.keys(saved),
  });
}

export async function PUT(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const body = await req.json().catch(() => null);
  const section: unknown = body?.section;
  if (!isSection(section)) return NextResponse.json({ error: "Unknown section" }, { status: 400 });

  const parsed = contentSchemas[section].safeParse(body.data);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: `${issue?.path.join(".") || section}: ${issue?.message ?? "invalid"}` },
      { status: 400 },
    );
  }
  await ContentModel.findByIdAndUpdate(section, { data: parsed.data }, { upsert: true });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}

/** Reset a section to the built-in defaults. */
export async function DELETE(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const section = req.nextUrl.searchParams.get("section");
  if (!isSection(section)) return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  await ContentModel.findByIdAndDelete(section);
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
