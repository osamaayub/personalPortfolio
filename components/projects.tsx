"use client";

import React from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/hooks/hooks";
import { m, useReducedMotion } from "framer-motion";
import type { PublicProject } from "@/lib/types";
import type { SectionsContent } from "@/lib/content-schema";

export default function Projects({
  projects,
  copy,
}: {
  projects: PublicProject[];
  copy: SectionsContent["projects"];
}) {
  const { ref } = useSectionInView("Projects", 0.5);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="projects"
      className="mb-32 w-full max-w-6xl scroll-mt-28 rounded-[2rem] border border-brand/10 bg-brand-soft/35 p-5 sm:mb-40 sm:p-8 lg:p-10 dark:border-transparent dark:bg-transparent dark:p-0"
    >
      <m.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading eyebrow={copy.eyebrow} subtitle={copy.subtitle}>
          {copy.title}
        </SectionHeading>
      </m.div>

      <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Project key={project.id} {...project} index={index} />
        ))}
      </div>
    </section>
  );
}
