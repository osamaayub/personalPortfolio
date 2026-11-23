"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";
import { HiStar } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeading from "./section-heading";
import type { TestimonialsContent } from "@/lib/content-schema";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials({ items }: { items: TestimonialsContent }) {
  const reduceMotion = useReducedMotion();
  const list = items.filter((t) => t.quote && t.quote.trim().length > 0);

  if (list.length === 0) return null;

  return (
    <section className="mb-28 w-full max-w-6xl scroll-mt-28 sm:mb-40">
      <SectionHeading eyebrow="Kind words">What clients say</SectionHeading>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t, i) => (
          <m.figure
            key={`${t.name}-${i}`}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 20,
              delay: (i % 3) * 0.08,
            }}
            className="card-interactive relative flex flex-col p-6"
          >
            <FaQuoteLeft
              aria-hidden="true"
              className="text-2xl text-brand/30"
            />
            <div className="mt-3 flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, s) => (
                <HiStar key={s} className="text-amber-400" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-[15px] leading-7 text-ink-muted">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-xs font-bold text-white"
              >
                {initials(t.name) || "?"}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">
                  {t.name}
                </span>
                {(t.role || t.company) && (
                  <span className="block truncate text-xs text-ink-subtle">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </span>
                )}
              </span>
            </figcaption>
          </m.figure>
        ))}
      </div>
    </section>
  );
}
