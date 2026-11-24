"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { m, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/hooks/hooks";
import Tilt from "./tilt";
import { FaBolt, FaLayerGroup, FaShieldAlt } from "react-icons/fa";
import type { AboutContent, SectionsContent } from "@/lib/content-schema";

const highlightIcons = [FaBolt, FaShieldAlt, FaLayerGroup];

/** Renders **bold** markers from the admin editor as <span> elements. */
const withBold = (text: string) =>
  text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-medium">
        {part}
      </span>
    ) : (
      part
    ),
  );

const About = ({ about, copy }: { about: AboutContent; copy: SectionsContent["about"] }) => {
  const { ref } = useSectionInView("About");
  const reduceMotion = useReducedMotion();

  return (
    <m.section
      ref={ref}
      className="card relative mb-32 max-w-5xl scroll-mt-28 overflow-hidden px-6 py-8 leading-8 sm:mb-40 sm:px-10 sm:py-10"
      initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      id="about"
    >
      <div aria-hidden="true" className="animate-float pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand/15 blur-3xl" />
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute -bottom-28 -left-16 h-60 w-60 rounded-full bg-fuchsia-400/10 blur-3xl"
        style={{ animationDelay: "1.8s" }}
      />
      <div className="relative">
      <SectionHeading eyebrow={copy.eyebrow}>{copy.title}</SectionHeading>

      {about.paragraphs.map((text, i) => (
        <p key={i} className="mb-3 last:mb-8">
          {withBold(text)}
        </p>
      ))}

      {about.highlights.length > 0 && (
        <m.ul
          className="grid gap-3 text-left sm:grid-cols-3"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {about.highlights.map((h, i) => {
            const Icon = highlightIcons[i % highlightIcons.length];
            return (
              <Tilt key={h.title} className="h-full">
              <m.li
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="group relative rounded-2xl border border-line bg-surface-2/60 p-5 leading-6 transition-colors duration-300 hover:border-brand/40 hover:bg-surface"
              >
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="text-lg" aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold">{h.title}</p>
                <p className="text-sm text-ink-muted">{h.text}</p>
              </m.li>
              </Tilt>
            );
          })}
        </m.ul>
      )}
      </div>
    </m.section>
  );
};

export default About;
