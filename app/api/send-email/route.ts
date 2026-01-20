// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactFormEmail from "@/email/contact-form-email";
import React from "react";

// Use Node.js runtime (required for Resend)
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { senderEmail, message } = await req.json();

    // --- Validation ---
    if (!senderEmail || typeof senderEmail !== "string" || senderEmail.length > 500) {
      return NextResponse.json(
        { error: "Invalid sender email" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.length > 5000) {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    // --- API Key check ---
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Resend API key not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // --- Send email ---
    const data = await resend.emails.send({
      // ✅ Local/test: plain onboarding@resend.dev
      // ✅ Production: "Acme <no-reply@yourdomain.com>" (must be verified)
      from: "onboarding@resend.dev",
      to: "ayubosama416@gmail.com",
      subject: "Message from contact form",
      react: React.createElement(ContactFormEmail, { senderEmail, message }),
    });

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
