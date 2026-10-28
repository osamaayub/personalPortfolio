"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { m, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/hooks/hooks";
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
      className="mb-28 max-w-[48rem] scroll-mt-28 card px-6 py-10 text-center leading-8 sm:mb-40 sm:px-10"
      initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      id="about"
    >
      <SectionHeading eyebrow={copy.eyebrow}>{copy.title}</SectionHeading>

      {about.paragraphs.map((text, i) => (
        <p key={i} className="mb-3 last:mb-8">
          {withBold(text)}
        </p>
      ))}

      {about.highlights.length > 0 && (
        <ul className="grid gap-3 text-left sm:grid-cols-3">
          {about.highlights.map((h, i) => {
            const Icon = highlightIcons[i % highlightIcons.length];
            return (
              <li
                key={h.title}
                className="spotlight relative rounded-2xl border border-line bg-surface-2/60 p-4 leading-6"
              >
                <Icon className="mb-2 text-xl text-brand" aria-hidden="true" />
                <p className="text-sm font-semibold">{h.title}</p>
                <p className="text-sm text-ink-muted">{h.text}</p>
              </li>
            );
          })}
        </ul>
      )}
    </m.section>
  );
};

export default About;
