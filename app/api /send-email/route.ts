import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { senderEmail, message } = await req.json();

    if (!validateString(senderEmail, 500)) {
      return NextResponse.json({ error: "Invalid sender email" }, { status: 400 });
    }

    if (!validateString(message, 5000)) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "ayubosama416@gmail.com",
      subject: "Message from contact form",
      react: React.createElement(ContactFormEmail, { senderEmail, message }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
