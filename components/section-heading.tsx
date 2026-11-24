"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionHeading({ children, subtitle, eyebrow }: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <m.div
      className="mb-8 sm:mb-10"
      initial={initial}
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
    >
      {eyebrow ? (
        <m.p
          variants={reveal}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand"
        >
          <m.span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand"
            variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
          <m.span
            aria-hidden="true"
            className="animate-gradient h-px w-8 bg-gradient-to-r from-brand/70 via-brand to-transparent"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
          />
          {eyebrow}
        </m.p>
      ) : (
        <m.span
          aria-hidden="true"
          className="mb-4 block h-1 w-10 rounded-full bg-brand"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      )}
      <m.h2
        variants={reveal}
        transition={{ type: "spring", stiffness: 110, damping: 20 }}
        className="text-3xl font-semibold tracking-[-0.035em] sm:text-[2.6rem]"
      >
        {children}
      </m.h2>
      {subtitle ? (
        <m.p
          variants={reveal}
          transition={{ type: "spring", stiffness: 110, damping: 20 }}
          className="mt-3 max-w-[40rem] text-base leading-relaxed text-ink-muted"
        >
          {subtitle}
        </m.p>
      ) : null}
    </m.div>
  );
}
