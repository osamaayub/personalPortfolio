type ContactEmail = { name: string; email: string; message: string };

// Visitor input goes into HTML, so every value is escaped.
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function contactEmailHtml({ name, email, message }: ContactEmail) {
  const from = escapeHtml(name || "Someone");
  const safeEmail = escapeHtml(email);
  const body = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
      <div style="padding:20px 28px;background:linear-gradient(135deg,#4f46e5,#c026d3);color:#ffffff;">
        <p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.85;">Portfolio contact form</p>
        <h1 style="margin:6px 0 0;font-size:20px;">New message from ${from}</h1>
      </div>
      <div style="padding:28px;">
        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;">${body}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 16px;" />
        <p style="margin:0;font-size:14px;color:#4b5563;">Reply to <a href="mailto:${safeEmail}" style="color:#4f46e5;">${safeEmail}</a></p>
      </div>
    </div>
  </body>
</html>`;
}

export const contactEmailText = ({ name, email, message }: ContactEmail) =>
  `New message from ${name || "someone"} (${email})\n\n${message}`;
