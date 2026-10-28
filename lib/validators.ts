import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email("Enter a valid email").max(320),
  message: z.string().trim().min(10, "Message is too short").max(5000),
  // Honeypot: real users never fill this in.
  website: z.string().max(0).optional(),
});

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\//i.test(v) || v.startsWith("/"), "Must be an http(s) URL or a /path")
  .default("");

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(1200),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  image: optionalUrl,
  url: optionalUrl,
  github: optionalUrl,
  featured: z.boolean().default(false),
  order: z.number().int().min(0).max(9999).default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
