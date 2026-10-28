"use client";

import React from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { useSectionInView } from "@/hooks/hooks";
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

  return (
    <section ref={ref} id="projects" className="mb-28 w-full max-w-6xl scroll-mt-28">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">
        {copy.eyebrow}
      </p>
      <SectionHeading>{copy.title}</SectionHeading>
      <p className="mx-auto -mt-5 mb-12 max-w-xl text-center leading-relaxed text-gray-600 dark:text-gray-400">
        {copy.subtitle}
      </p>

      <div className="grid gap-7 md:grid-cols-2">
        {projects.map((project) => (
          <Project key={project.id} {...project} wide={project.featured} />
        ))}
      </div>
    </section>
  );
}
