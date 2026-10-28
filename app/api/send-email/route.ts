import { NextRequest, NextResponse } from "next/server";
import { contactEmailHtml, contactEmailText } from "@/lib/contact-email";
import { connectDb, isDbConfigured } from "@/lib/db";
import { clientIp, hashIp, memoryRateLimit } from "@/lib/request";
import { contactSchema } from "@/lib/validators";
import { MessageModel } from "@/models/message";

export const runtime = "nodejs";

const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot gets a silent success so bots learn nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { name, email, message } = parsed.data;

  const ipHash = hashIp(clientIp(req));
  const resendKey = process.env.RESEND_API_KEY;
  if (!isDbConfigured && !resendKey) {
    return NextResponse.json({ error: "Contact form is not configured" }, { status: 503 });
  }

  let saved: InstanceType<typeof MessageModel> | null = null;
  if (isDbConfigured) {
    try {
      await connectDb();
      const recent = await MessageModel.countDocuments({
        ipHash,
        createdAt: { $gt: new Date(Date.now() - WINDOW_MS) },
      });
      if (recent >= LIMIT) {
        return NextResponse.json(
          { error: "Too many messages. Please try again later." },
          { status: 429 },
        );
      }
      saved = await MessageModel.create({ name, email, message, ipHash });
    } catch (err) {
      console.error("Saving contact message failed:", err);
    }
  } else if (!memoryRateLimit(ipHash, LIMIT, WINDOW_MS)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  let emailed = false;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: process.env.CONTACT_TO_EMAIL ?? "ayubosama416@gmail.com",
          reply_to: email,
          subject: `Portfolio message from ${name || email}`,
          html: contactEmailHtml({ name, email, message }),
          text: contactEmailText({ name, email, message }),
        }),
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(detail.message ?? `Resend responded ${res.status}`);
      }
      emailed = true;
      if (saved) await MessageModel.updateOne({ _id: saved._id }, { emailed: true });
    } catch (err) {
      console.error("Sending contact email failed:", err);
    }
  }

  // Success if the message landed anywhere durable.
  if (!saved && !emailed) {
    return NextResponse.json(
      { error: "Could not deliver your message. Please email me directly." },
      { status: 502 },
    );
  }
  return NextResponse.json({ success: true });
}
