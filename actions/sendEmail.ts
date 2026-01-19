"use client";

const handleSubmit = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail") as string;
  const message = formData.get("message") as string;

  const res = await fetch("api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderEmail, message }),
  });

  const data = await res.json();
  return data;
};
