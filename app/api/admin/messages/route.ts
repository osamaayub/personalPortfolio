import { NextResponse } from "next/server";
import { guard } from "@/lib/admin-api";
import { MessageModel } from "@/models/message";

export const runtime = "nodejs";

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  const docs = await MessageModel.find().sort({ createdAt: -1 }).limit(200).select("-ipHash").lean();
  return NextResponse.json({ messages: docs.map((d) => ({ ...d, _id: String(d._id) })) });
}
