import { NextRequest, NextResponse } from "next/server";
import { guard, validId } from "@/lib/admin-api";
import { MessageModel } from "@/models/message";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const body = await req.json().catch(() => null);
  if (typeof body?.read !== "boolean") {
    return NextResponse.json({ error: "read must be a boolean" }, { status: 400 });
  }
  const doc = await MessageModel.findByIdAndUpdate(id, { read: body.read });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const doc = await MessageModel.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
