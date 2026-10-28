"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import SectionHeading from "./section-heading";
import SubmitBtn from "./submit-btn";
import { useSectionInView } from "@/hooks/hooks";
import { HiCheckCircle, HiMail, HiLocationMarker, HiClock } from "react-icons/hi";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const MAX_MESSAGE = 5000;

const inputClass =
  "rounded-xl border border-black/10 bg-white px-4 transition-all focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:bg-white/90 dark:text-gray-950";

const info = [
  { icon: HiMail, label: "Email", value: "osama.ayubwebdev@gmail.com", href: "mailto:osama.ayubwebdev@gmail.com" },
  { icon: HiLocationMarker, label: "Based in", value: "Lahore, Pakistan" },
  { icon: HiClock, label: "Response time", value: "Usually within a day or two" },
] as const;

const Contact = () => {
  const { ref } = useSectionInView("Contact");
  const reduceMotion = useReducedMotion();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [length, setLength] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          website: data.website,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Something went wrong");

      toast.success("Message sent. I'll get back to you soon!");
      form.reset();
      setLength(0);
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="mb-20 w-full max-w-5xl scroll-mt-28 sm:mb-28">
      <SectionHeading
        eyebrow="Get in touch"
        subtitle="Have a project, an idea, or a role in mind? Send a message and let's talk."
      >
        Let&apos;s work together
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-5">
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white shadow-xl shadow-indigo-500/20 lg:col-span-2"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <h3 className="relative text-2xl font-semibold">Contact information</h3>
          <p className="relative mt-2 text-white/80">Prefer email? I read every message.</p>

          <ul className="relative mt-8 space-y-5">
            {info.map((item) => (
              <li key={item.label} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <item.icon className="text-xl" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-white/70">{item.label}</p>
                  {"href" in item ? (
                    <a href={item.href} className="break-all font-medium underline-offset-4 hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="relative mt-8 flex gap-3">
            <a
              href="https://www.linkedin.com/in/osama-ayub8889993755979/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:-translate-y-1 hover:bg-white/25"
            >
              <BsLinkedin />
            </a>
            <a
              href="https://github.com/osamaayub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:-translate-y-1 hover:bg-white/25"
            >
              <FaGithub />
            </a>
          </div>
        </motion.aside>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8 lg:col-span-3 dark:border-white/10 dark:bg-slate-900/80"
        >
          {sent ? (
            <div role="status" className="flex h-full flex-col items-center justify-center py-10 text-center">
              <motion.div
                initial={reduceMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
              >
                <HiCheckCircle className="text-6xl text-emerald-500" />
              </motion.div>
              <p className="mt-3 text-xl font-semibold">Thanks, your message is in.</p>
              <p className="mt-1 text-gray-600 dark:text-white/70">I usually reply within a day or two.</p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-medium text-indigo-600 underline dark:text-indigo-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Name <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Jane Doe"
                    disabled={submitting}
                    className={`h-12 ${inputClass}`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={320}
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={submitting}
                    className={`h-12 ${inputClass}`}
                  />
                </div>
              </div>

              {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={MAX_MESSAGE}
                  placeholder="Tell me about your project…"
                  disabled={submitting}
                  onChange={(e) => setLength(e.target.value.length)}
                  className={`h-44 resize-none p-4 ${inputClass}`}
                />
                <span className="self-end text-xs text-gray-500" aria-live="polite">
                  {length}/{MAX_MESSAGE}
                </span>
              </div>

              <SubmitBtn disabled={submitting} />
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
